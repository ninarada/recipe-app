import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Box, Typography, useTheme, useMediaQuery, Card } from "@mui/material";
import { getPopularRecipes } from "../service/recipeService";
import RecipeCard from "../components/recipeCard/RecipeCard";
import PrimaryButton from "../components/buttons/primaryButton";
import SecondaryButton from "../components/buttons/secondaryButton";
import CircleSVG from "../assets/shapes/CircleSVG";
import mainSVG from "../assets/images/Ramen-amico.svg";
import RibbonHeader from "../components/ribbonHeader/RibbonHeader";
import BakeryDiningRoundedIcon from '@mui/icons-material/BakeryDiningRounded';
import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';
import DinnerDiningRoundedIcon from '@mui/icons-material/DinnerDiningRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [error, setError] = useState(null); 
  const userInfo = useSelector((state) => state.user.userInfo);
  const isAuthenticated = Boolean(userInfo);
  const cardsRef = useRef([]);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const exploreCategoryItems = [
    { icon: <BakeryDiningRoundedIcon sx={{ fontSize: 70, color: theme.palette.brown[800] }} />, label: "breakfast" },
    { icon: <LunchDiningRoundedIcon sx={{ fontSize: 60, color: theme.palette.brown[800] }} />, label: "lunch" },
    { icon: <DinnerDiningRoundedIcon sx={{ fontSize: 60, color: theme.palette.brown[800] }} />, label: "dinner" },
    { icon: <CakeRoundedIcon sx={{ fontSize: 60, color: theme.palette.brown[800] }} />, label: "sweets" },
  ];

  const userReviews = ["Amazing recipes!", "User-friendly and fun!", "Great community!"];
  const userTestimonials = [
    {
      review: "I never thought cooking at home could be this exciting! The recipes here are not just easy to follow but also absolutely delicious. This platform has completely transformed my relationship with food.",
      name: 'Daniel',
      job: 'Home Chef',
    },
    {
      review: "This community is a goldmine for anyone who loves experimenting in the kitchen. The variety of recipes and creative ideas inspire me to try something new every week!",
      name: 'Priya',
      job: 'Culinary Student',
    },
    {
      review: "Cooking for a family of five can be overwhelming, but this platform has saved me countless hours. The recipes are a hit with my kids and even picky eaters in the family!",
      name: 'Laura',
      job: 'Mom of Three',
    },
    {
      review: "What I love most is the sense of community. Sharing my own recipes and seeing others try and enjoy them is so rewarding. This platform is more than a recipe site—it’s a family!",
      name: 'Carlos',
      job: 'Recipe Contributor',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0.001);

    const fetchRecipes = async () => {
      try {
          const data = await getPopularRecipes(3);
          setPopularRecipes(data);
      } catch (error) {
          setError(error.message);
      }
    }

    fetchRecipes();
    return () => clearTimeout(timer);
  }, []);

  const handleBrowseButton  = () => {
    if (!isAuthenticated) {
      navigate('/signin');
    } else {
      navigate('/recipes');
    }
  }

  const handleCreateButton  = () => {
    if (!isAuthenticated) {
      navigate('/signin');
    } else {
      navigate('/create');
    }
  }

  const handleShowMoreButton  = () => {
    if (!isAuthenticated) {
      navigate('/signin');
    } else {
      navigate('/recipes');
    }
  }

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
            <PrimaryButton text="Browse" fontsize="20" onClick={handleBrowseButton}/>
            <SecondaryButton text="Create" fontsize="20" onClick={handleCreateButton}/>
          </Box>
        </Box>
      </Box>

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

      <Box 
        className="explore-categories-box"
        sx={{
          backgroundColor: theme.palette.beige[0],
          display:'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          padding: '80px 20px',
        }}
      >
        <Typography 
            sx={{
              fontSize: { xs: '30px', md: '32px' },
              color: theme.palette.primary.dark,
              fontWeight: 600,
              textTransform: 'uppercase',
              textShadow: '-1px 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            Explore by Type
          </Typography>

          <motion.div
              initial={{ opacity: 0, translateY: 100 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ amount: 0.2 }}
          >
            <Box sx={{
              display:'grid',
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
              },
              rowGap: 3,
              columnGap: 10,
              alignItems: "center",
              justifyItems: "center",
              py: 4,
            }}>
              {exploreCategoryItems.map((item,index) => (
                <Box>
                  <Box key={index} sx={{
                    backgroundColor: theme.palette.deepOrange[50],
                    borderRadius: '50%',
                    height: '150px',
                    width: '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 'inset 0px 2px 6px rgba(71, 71, 71, 0.2)',
                  }}>
                    {item.icon}
                  </Box>
                  <Typography sx={{
                    color: theme.palette.brown[200],
                    textTransform: 'lowercase',
                    fontSize: '24px',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    textAlign: 'center',
                    paddingTop: '10px',
                  }}>
                    {item.label
                  }</Typography>            
                </Box>
              ))}
            </Box>
          </motion.div>

      </Box>

      <Box 
        sx={{
          display:'flex',
          flexDirection: 'column',
          justifyContent:'center',
          backgroundColor: theme.palette.primary.light,
          textAlign: 'center',
          padding:'100px 100px 150px 100px',
        }}
      >
        <Typography 
          sx={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            marginBottom: 6, 
            color: theme.palette.primary.dark,
            textShadow: '-1px 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          What Our Users Say 
        </Typography>
        <motion.div
          initial={{ opacity: 0, translateY: 100 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.2 }}
        >
          <Box 
            sx={{
              display: 'grid',
              display: 'grid',
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                },
              rowGap: 3,
              columnGap: 4,
            }}
          >
            {userTestimonials.map((item, index) => (
              <Card key={index} sx={{ padding: 3, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                <Typography 
                  sx={{ fontSize: '20px', color: theme.palette.grey[800] }}
                >
                  "{item.review}"
                </Typography>
                <Typography 
                  sx={{ fontSize: '16px', color: theme.palette.grey[500], marginTop: 2 }}
                >
                  - {item.name}, {item.job}
                </Typography>
              </Card>
            ))}
          </Box> 
        </motion.div>
      </Box>


      <Box sx={{ padding: 10, backgroundColor: theme.palette.background.beige }}>
        <motion.div
          initial={{ opacity: 0, translateY: 100 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.2 }}
          style={{placeItems: 'center'}}
        >
          <Typography sx={{ 
            color: theme.palette.primary.main,
            fontSize: '40px', 
            fontWeight: 600,
            paddingBottom: '25px',
            textAlign:'center',
          }}>
            Join Our Cooking Community
          </Typography>
          <Typography sx={{ 
            color: theme.palette.grey[500],
            fontSize: '22px', 
            fontWeight: 400,
            paddingBottom: '30px',
            textAlign:'center',
          }}>
            Create an account to access exclusive recipes, cooking tips, and a community that shares your passion!
          </Typography>
          <PrimaryButton text="Sign Up Now" fontsize={20} onClick={handleBrowseButton}/>
        </motion.div>
      </Box>
    </Box>
  );
}

export default HomePage;
