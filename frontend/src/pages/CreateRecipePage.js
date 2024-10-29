import { Box, Card, useTheme } from "@mui/material";
import RecipeCreateCard from "../components/recipeCreateCard/recipeCreateCard";

const CreateRecipePage = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            background: theme.gradients.linear,
            height: '91.9vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <RecipeCreateCard />
        </Box>
    )
}

export default CreateRecipePage;