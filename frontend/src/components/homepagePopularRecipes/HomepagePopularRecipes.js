import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Box, useTheme, } from "@mui/material";
import RecipeCard from "../recipeCard/RecipeCard";
import RibbonHeader from "../ribbonHeader/RibbonHeader";
import PrimaryButton from "../buttons/primaryButton";
import { getPopularRecipes } from "../../service/recipeService";


const HomepagePopularRecipes = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [popularRecipes, setPopularRecipes] = useState([]);
    const [error, setError] = useState(null); 
    const userInfo = useSelector((state) => state.user.userInfo);
    const isAuthenticated = Boolean(userInfo);

    useEffect(() => {
        const fetchRecipes = async () => {
          try {
              const data = await getPopularRecipes(3);
              setPopularRecipes(data);
          } catch (error) {
              setError(error.message);
          }
        }
        fetchRecipes();
      }, []);

    const handleShowMoreButton  = () => {
        if (!isAuthenticated) {
          navigate('/signin');
        } else {
          navigate('/recipes');
        }
    }    

    if (error) return <div>Error: {error}</div>;

    return(
        <Box 
        className="popular-recipes"
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.primary.light,
          p: { xs: 7, md: 5 },
          display: 'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
          gap:'20px',
        }}
      >
        <RibbonHeader text={"popular recipes"} />
        
        <motion.div
              initial={{ opacity: 0, translateY: 100 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ amount: 0.2 }}
        >

          <Box 
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              rowGap: 3,
              columnGap: 2,
              alignItems: "center",
              justifyItems: "center",
              py: 4,
            }}
          >
            {popularRecipes.map((recipe) => (
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

        </motion.div>

        <PrimaryButton text={'show more'} onClick={handleShowMoreButton} fontsize={18}/>

      </Box>
    );
}

export default HomepagePopularRecipes;