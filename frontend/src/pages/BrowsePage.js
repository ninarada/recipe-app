import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeTag, setAllTags, setFilteredRecipes, setRecipes } from "../redux/slices/browseSlice";
import { getAllRecipes, getTags } from "../service/recipeService";
import BrowseFilter from "../components/browseFilter/BrowseFilter";
import BrowseSort from "../components/browseSort/BrowseSort";
import SearchBar from "../components/searchBar/SearchBar";
import RecipeCard from "../components/recipeCard/RecipeCard";
import CancelIcon from '@mui/icons-material/Cancel';

const BrowsePage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const recipes = useSelector((state) => state.browse.recipes); 
    const selectedTags = useSelector((state) => state.browse.selectedTags); 
    const filteredRecipes = useSelector((state) => state.browse.filteredRecipes);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getAllRecipes();
                dispatch(setRecipes(data));  
                dispatch(setFilteredRecipes(data));
                const dataTags = await getTags();
                dispatch(setAllTags(dataTags));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchRecipes();
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = recipes.filter(recipe => {
            const matchesSearchTerm = 
                recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                recipe.author.username.toLowerCase().includes(searchTerm.toLowerCase());
    
            const matchesTags = selectedTags.every(tag =>
                recipe.tags.some(recipeTag =>
                    recipeTag.toLowerCase() === tag.toLowerCase()
                )
            );
    
            return matchesSearchTerm && matchesTags;
        });
    
        dispatch(setFilteredRecipes(filtered));
    };
    
    const handleDeleteTag = (tag) => {
        dispatch(removeTag(tag));
    
        const updatedTags = selectedTags.filter(selectedTag => selectedTag !== tag);
    
        const filtered = recipes.filter(recipe =>
            updatedTags.every(tag =>
                recipe.tags.some(recipeTag =>
                    recipeTag.toLowerCase() === tag.toLowerCase()
                )
            )
        );
    
        dispatch(setFilteredRecipes(filtered));
    };    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box>
            <Box sx={{padding:'50px 0px'}}>
                <SearchBar onSearch={handleSearch} widthMD={40} placeholder={"Search recipes or users..."}/>
            </Box>

            <Box sx={{
                padding: '0px 80px 10px 80px',
                display:'flex',
                justifyContent:'space-between'
            }}>
                <BrowseFilter />
                <BrowseSort />
            </Box>

            { selectedTags.length > 0 &&
                <Box sx={{
                    padding: '0px 80px 10px 80px',
                }}>
                    <Typography sx={{fontSize:'17px', color: theme.palette.grey[600], padding:'10px 5px'}}>your selections:</Typography>
                    <Box sx={{display:'flex', gap:'10px'}}>
                        {selectedTags.map((tag, index) => (
                            <Box key={index} sx={{
                                backgroundColor: theme.palette.grey[300],
                                color: theme.palette.grey[800],
                                borderRadius: "20px",
                                padding: "5px 10px", 
                                display:'flex',
                                justifyContent:'center',
                                width:'fit-content'
                            }}>
                                <Typography sx={{width:'fit-content'}}>
                                    {tag}
                                </Typography>
                                <CancelIcon 
                                    onClick={() => handleDeleteTag(tag)}
                                    sx={{color: theme.palette.grey[700], cursor:'pointer'}}
                                />
                            </Box>
                        ))}  
                    </Box>
                </Box>
            } 

            <Box sx={{
                minHeight:'70vh',
                background: (theme) => `linear-gradient(180deg, white 0%, ${theme.palette.primary.light} 100%)`,
            }}>
                {filteredRecipes.length < 1 ? 
                    <Typography sx={{textAlign:'center', color: theme.palette.brown[300]}}>
                        No recipes. Try searching something else.
                    </Typography> 
                    : 
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: "repeat(1, 1fr)",
                            sm: "repeat(1, 1fr)",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(3, 1fr)",
                            xl: "repeat(4, 1fr)",
                        },
                        rowGap: "20px",
                        columnGap: "10px",
                        alignItems: "center",
                        justifyItems: "center",
                        padding: '0px 0px 100px 0px',
                    }}>
                        {filteredRecipes.map(recipe => (
                            <RecipeCard 
                                key={recipe._id} 
                                id={recipe._id} 
                                title={recipe.title} 
                                description={recipe.description} 
                                author={recipe.author} 
                                photo={recipe.photo}
                                bookmark={recipe.bookmark_counter}
                                like={recipe.like_counter}
                            />
                        ))}
                    </Box>
                }
            </Box>
        </Box>
    );
}

export default BrowsePage;