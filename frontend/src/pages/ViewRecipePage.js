import { Box, useTheme } from "@mui/material";
import RecipeView from "../components/recipeView/recipeView";
import { useParams } from 'react-router-dom';
import { getRecipeById } from "../service/recipeService";
import { useEffect, useState } from "react";

const ViewRecipePage = () => {
    const theme = useTheme();
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeById = async () => {
            try {
                const data = await getRecipeById(id);
                setRecipe(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchRecipeById();
    }, [id]);

    if (error) return <div>Error: {error}</div>;

    return (
        <Box sx={{
            background: theme.gradients.linear,
            minHeight: '91.9vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '50px 0px',
        }}>
            <RecipeView recipe={recipe}/>
        </Box>
    )
}

export default ViewRecipePage;