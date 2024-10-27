import { Box, useTheme } from '@mui/material';
import React from 'react';

const CircleSVG = () => {
  const theme = useTheme(); 

  return (
    <Box 
      sx={{ 
        display: { 
          xs: 'none',  
          md: 'block'   
        },
        position: 'absolute', 
        top: '10%',
        left: '0%',
        zIndex: 1, 
      }} 
    >
      <svg height="100vh" width="50vw" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gradient-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme.palette.primary.main} />
            <stop offset="100%" stopColor="white" />
          </radialGradient>
        </defs>

        <ellipse 
          rx="60vh" 
          ry="50vh" 
          cx="20" 
          cy="50%" 
          fill="url(#gradient-fill)"
        />
      </svg>
    </Box>
  );
};

export default CircleSVG;
