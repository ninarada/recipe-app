import { Box, Card, useTheme } from "@mui/material";
import RecipeCreateCard from "../components/recipeCreateCard/RecipeCreateCard";
import { motion } from "framer-motion";

const CreateRecipePage = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            background: theme.gradients.linear,
            minHeight: '91.9vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '50px 0px',
        }}>
            {/* <motion.div
                initial={{ opacity: 0 }} // Start fully transparent
                animate={{ opacity: 1 }} // Animate to fully opaque
                transition={{ duration: 0.5 }} // Duration of the fade-in
            > */}
                <RecipeCreateCard />
            {/* </motion.div> */}
            
        </Box>
    )
}

export default CreateRecipePage;