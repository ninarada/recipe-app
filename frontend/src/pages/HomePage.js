import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import CircleSVG from "../assets/shapes/CircleSVG";
import mainSVG from "../assets/images/Ramen-amico.svg";
import PrimaryButton from "../components/buttons/primaryButton";
import SecondaryButton from "../components/buttons/secondaryButton";
import { useEffect, useState, useRef } from "react";
import { getAllRecipes } from "../service/recipeService";
import RecipeCard from "../components/recipeCard/RecipeCard";
import { motion } from "framer-motion";

const HomePage = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [error, setError] = useState(null); 
  const cardsRef = useRef([]);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

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
      <Box sx={{ position: 'relative' }}>
        <CircleSVG />
      </Box>

      <Box 
        className="landing-hero-box" 
        sx={{
          minHeight: '100vh',
          position: { md: 'relative' },
          display: 'grid',
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          justifyItems: "center",
          alignItems: "center",
          backgroundColor:"white",
          paddingTop:{ xs: "20px", md: "0px" },
        }}
      >
        <Box
          component="img"
          src={mainSVG}
          alt="Ramen Illustration"
          sx={{
            width: { xs: '50vw', md: '30vw' },
            height: { xs: '50vw', md: '30vw' },
            zIndex: 1,
            transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.8s ease-out',
          }}  
        />
        <Box 
          className="text-box"
          sx={{
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            maxWidth: '80%',
            gap: 2,
            pb: 2,
            opacity: isVisible ? 1 : 0,
            transition: "opacity 2s ease",
          }}
        >
          <Typography 
            sx={{
              fontSize: { xs: '40px', md: '46px' },
              color: theme.palette.primary.dark,
              fontWeight: 600,
            }}
          >
            Discover Delicious Recipes
          </Typography>
          <Typography 
            sx={{
              fontSize: { xs: '24px', md: '30px' },
              color: theme.palette.grey[500],
              fontStyle: 'italic',
            }}
          >
            Your Culinary Adventure Begins Here
          </Typography>
          <Typography 
            sx={{
              fontSize: '20px',
              color: theme.palette.secondary.contrastText,
            }}
          >
            Find, create, and share recipes with ease. Whether you’re a novice cook or a gourmet chef, we’ve got something for everyone!
          </Typography>
          <Box 
            className='button-box'
            sx={{
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2,
              pt: 2,
            }}
          >
            <PrimaryButton text="Browse" fontsize="20"/>
            <SecondaryButton text="Create" fontsize="20"/>
          </Box>
        </Box>
      </Box>

      <Box 
        className="popular-recipes"
        sx={{
          minHeight: '100vh',
          background: theme.gradients.linear,
          p: { xs: 7, md: 5 },
        }}
      >
        <Typography 
          sx={{
            fontSize: '30px',
            fontWeight: 700,
            color: theme.palette.brown[300],
          }}
        >
          Popular Recipes
        </Typography>
        <Box 
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            rowGap: 3,
            columnGap: 2,
            alignItems: "center",
            justifyItems: "center",
            py: 4,
          }}
        >
          {popularRecipes.map((recipe) => (
            <motion.div
              key={recipe._id}
              initial={{ opacity: 0, translateY: 100 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ amount: 0.2 }}
            >
              <RecipeCard 
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
        <Typography 
          sx={{
            textAlign: 'center', 
            color: theme.palette.secondary.light, 
            fontWeight: 600,
          }}
        >
          Show more
        </Typography>
      </Box>

      <Box 
        className="icons-box"
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.primary.main,
        }}
      />

      <Box 
        className="idk-box"
        sx={{
          minHeight: '100vh',
          background: theme.gradients.linear2,
        }}
      />
    </Box>
  );
}

export default HomePage;
