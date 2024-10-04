import { Box } from '@mui/material';
import React from 'react';

const CircleSVG = () => (
  <Box sx={{ 
    display: { 
      xs: 'none',  // Hide on small screens
      md: 'block'  // Show on medium and larger screens
    },
    position: 'absolute', // Make it absolute so it can be layered behind
    top: '10%', // Adjust these values to control its position
    left: '0%',
   
    zIndex: -1, // Place it behind the image
  }} >
  <svg height="100vh" width="50vw" xmlns="http://www.w3.org/2000/svg">
  <ellipse rx="60vh" ry="50vh" cx="20" cy="50%" fill="var(--primary-main2-color)"/>
</svg></Box>
);

export default CircleSVG;
