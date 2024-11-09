import React, { useState } from 'react';
import { Box, Card, Typography, useTheme } from "@mui/material";
import PrimaryButton from '../buttons/primaryButton';

const RecipeCreateGreeting = ({ onNext }) => {
    const theme= useTheme();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            textAlign: 'center',
            padding: '0px 50px',
        }}>
            <Typography sx={{
                color: theme.palette.primary.dark,
                fontSize: '30px',
                fontWeight: '800',
            }}>
                Let's Get Cooking!
            </Typography>
            <Typography sx={{
                color: theme.palette.grey[600],
                fontSize: '20px',
                fontWeight: '500',
            }}>
                Ready to share your culinary masterpiece? Fill in the details below to
                create a recipe that others will love!
            </Typography>
            <Box sx={{
                marginTop: '16px',
            }}>
                <PrimaryButton text={'Create Your Recipe'} onClick={onNext} fontsize={'18'}/>
            </Box>
            
      </Box>
    );
}

export default RecipeCreateGreeting;