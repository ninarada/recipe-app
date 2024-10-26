import { Box } from "@mui/material";
import SearchBar from "../components/searchBar/SearchBar";
import RecipeCard from "../components/recipeCard/RecipeCard";
import { useEffect, useState } from "react";
import { getAllRecipes } from "../service/recipeService";

const BrowsePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getAllRecipes();
                setRecipes(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchRecipes();
    }, []);

    const handleSearch = (searchTerm) => {
        // Implement search functionality here
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box sx={{backgroundColor:"white"}}>
            <SearchBar onSearch={handleSearch} />
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
               padding: '30px 0px',
               background: (theme) => `linear-gradient(180deg, white 0%, ${theme.palette.primary.light} 100%)`,
            }}>
                {recipes.map(recipe => (
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
        </Box>
    );
}

export default BrowsePage;
