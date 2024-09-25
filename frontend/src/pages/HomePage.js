import { Box, Typography } from "@mui/material";
import CircleSVG from "../assets/shapes/CircleSVG";
import mainSVG from "../assets/images/Ramen-amico.svg";
import PrimaryButton from "../components/buttons/primaryButton";
import SecondaryButton from "../components/buttons/secondaryButton";
import { useEffect, useState, useRef } from "react";
import { getAllRecipes } from "../service/recipeService";
import RecipeCard from "../components/RecipeCard";
import { motion } from "framer-motion";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [error, setError] = useState(null); 
  const [visibleCards, setVisibleCards] = useState([]); 
  const cardsRef = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0.001);
    const fetchRecipes = async () => {
      try {
          const data = await getAllRecipes(3);
          setPopularRecipes(data);
      } catch (error) {
          setError(error.message);
      }
    }

    fetchRecipes();
    return () => clearTimeout(timer);
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <Box className="landing-hero-box" sx={{
        height:'100vh',
        backgroundColor: 'white',
        position: 'relative',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'space-between',
      }}>
        <CircleSVG />
        <img
            src={mainSVG}
            alt="img"
            style={{
              width: '70vh',
              height: '70vh',
              position: 'absolute',
              top: '10%', 
              left: isVisible ? "13%" : "-100%", // Start outside the screen and move to 13%
              transition: "left 0.8s ease-out", // Smooth slide-in effect
            }}  
        />
        <Box className="text-box" sx={{
            zIndex: '1',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            maxWidth: '46%',
            paddingRight: '40px',
            gap: '12px',
            paddingBottom: '20px',
            opacity: isVisible ? 1 : 0, // Fade-in effect
            transition: "opacity 2s ease", // Smooth transition for opacity
          }}>
            <Typography sx={{fontSize: '46px', color: 'var(--primary-dark-color)'}}>
              Discover Delicious Recipes
            </Typography>
            <Typography sx={{fontSize: '28px', color: 'var(--grey-medium-color)'}}>
              Your Culinary Adventure Begins Here
            </Typography>
            <Typography sx={{fontSize: '20px', color: 'var(--secondary-contrast-color)'}}>
              Find, create, and share recipes with ease. Whether you’re a novice cook or a gourmet chef, we’ve got something for everyone!
            </Typography>
            <Box className='button-box' sx={{
              display: 'flex', 
              justifyContent:'center', 
              gap:'20px',
            }}>
              <PrimaryButton text={'Browse'}/>
              <SecondaryButton text={'Create'} />
            </Box>
          </Box>
        </Box>

        <Box className="popular-recipes" sx={{
          height:'100vh', 
          background:'var(--linear-g)',
          padding: '100px 50px',
          height: 'fit-content',
        }}>
          <Typography sx={{
            fontSize: '30px',
            fontWeight: '700',
            color: 'var(--secondary-darker-color)',
          }}>
            Popular recipes
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            },
            rowGap: "25px",
            columnGap: "20px",
            alignItems: "center",
            justifyItems: "center",
            padding: '30px 0px',
          }}>
            {popularRecipes.map((recipe, index) => (
              <motion.div
               key={recipe._id}
               initial={{ opacity: 0, translateY: 100 }} 
               whileInView={{ opacity: 1, translateY: 0 }} 
               transition={{ duration: 0.8, ease: "easeOut" }} 
               viewport={{ amount: 0.2 }} // Trigger when 20% of card is in view
             >
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
              </motion.div>
            ))}
          </Box>
          <Typography sx={{
            textAlign: 'center', 
            color: 'var(--secondary-light-color)', 
            fontWeight: '600',
          }}>
            show more
          </Typography>
        </Box>
      </Box>
    );
}

export default HomePage;