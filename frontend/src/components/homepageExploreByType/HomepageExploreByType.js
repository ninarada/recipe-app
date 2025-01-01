import { motion } from "framer-motion";
import { Box, Typography, useTheme } from "@mui/material";
import BakeryDiningRoundedIcon from '@mui/icons-material/BakeryDiningRounded';
import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';
import DinnerDiningRoundedIcon from '@mui/icons-material/DinnerDiningRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';

const HomepageExploreByType = () => {
    const theme = useTheme();

    const exploreCategoryItems = [
      { icon: <BakeryDiningRoundedIcon sx={{ fontSize: 70, color: theme.palette.brown[800] }} />, label: "breakfast" },
      { icon: <LunchDiningRoundedIcon sx={{ fontSize: 60, color: theme.palette.brown[800] }} />, label: "lunch" },
      { icon: <DinnerDiningRoundedIcon sx={{ fontSize: 60, color: theme.palette.brown[800] }} />, label: "dinner" },
      { icon: <CakeRoundedIcon sx={{ fontSize: 60, color: theme.palette.brown[800] }} />, label: "dessert" },
    ];

    return (
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
    );
}

export default HomepageExploreByType;