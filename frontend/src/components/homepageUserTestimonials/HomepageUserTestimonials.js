import { motion } from "framer-motion";
import { Box, Typography, useTheme, Card } from "@mui/material"

const HomepageUserTestimonials = () => {
    const theme = useTheme();

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
    
    return (
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

    );
}

export default HomepageUserTestimonials;