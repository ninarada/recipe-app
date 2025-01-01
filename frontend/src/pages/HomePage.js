import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Box, Typography, useTheme } from "@mui/material";
import PrimaryButton from "../components/buttons/primaryButton";
import SecondaryButton from "../components/buttons/secondaryButton";
import CircleSVG from "../assets/shapes/CircleSVG";
import mainSVG from "../assets/images/Ramen-amico.svg";
import HomepagePopularRecipes from "../components/homepagePopularRecipes/HomepagePopularRecipes";
import HomepageExploreByType from "../components/homepageExploreByType/HomepageExploreByType";
import HomepageUserTestimonials from "../components/homepageUserTestimonials/HomepageUserTestimonials";

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const isAuthenticated = Boolean(userInfo);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0.001);

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

      <HomepagePopularRecipes />

      <HomepageExploreByType />

      <HomepageUserTestimonials />

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