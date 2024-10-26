import { Box, useTheme } from '@mui/material';
import React from 'react';

const CircleSVG = () => {
  const theme = useTheme(); // Move useTheme inside the functional component

  return (
    <Box 
      sx={{ 
        display: { 
          xs: 'none',  // Hide on small screens
          md: 'block'   // Show on medium and larger screens
        },
        position: 'absolute', // Make it absolute so it can be layered behind
        top: '10%', // Adjust these values to control its position
        left: '0%',
        zIndex: -1, // Place it behind the image
      }} 
    >
      <svg height="100vh" width="50vw" xmlns="http://www.w3.org/2000/svg">
        <ellipse 
          rx="60vh" 
          ry="50vh" 
          cx="20" 
          cy="50%" 
          fill={theme.palette.primary.main} // Change to use primary main color
        />
      </svg>
    </Box>
  );
};

export default CircleSVG;
