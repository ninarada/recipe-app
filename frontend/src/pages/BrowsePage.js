import { Box } from "@mui/material";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { getAllRecipes } from "../service/recipeService";
import { Link } from "react-router-dom";

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
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box>
            <SearchBar onSearch={handleSearch}/>
            <Box className="all-recipes-box" sx={{
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
               background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, var(--primary-light-color) 100%)',
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
    )
}

export default BrowsePage;