import React, { useEffect, useState } from 'react';
import PrimaryButton from '../buttons/primaryButton';
import SecondaryButton from '../buttons/secondaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { resetRecipe } from '../../redux/slices/recipeCreateSlice';
import { 
    Box, 
    Divider, 
    Typography, 
    useTheme, 
    List, ListItem, ListItemIcon, ListItemText,
    Stack, Chip,
} from "@mui/material";
import CircleIcon from '@mui/icons-material/FiberManualRecord';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { createRecipe } from '../../service/recipeService';

const RecipeCreateReview= ({ onNext, onPrev }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const title = useSelector((state) => state.recipeCreate.title);
    const description = useSelector((state) => state.recipeCreate.description);
    const ingredients = useSelector((state) => state.recipeCreate.ingredients);
    const steps = useSelector((state) => state.recipeCreate.instructions);
    const time = useSelector((state)=> state.recipeCreate.time_consuming);
    const difficulty = useSelector((state)=> state.recipeCreate.difficulty);
    const photo = useSelector((state)=> state.recipeCreate.photo);
    const tags = useSelector((state)=> state.recipeCreate.tags);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const recipeData = {
                title,
                description,
                ingredients,
                instructions: steps,
                time_consuming: time,
                difficulty,
                photo,
                tags,
            };

            const response = await createRecipe(
                recipeData.title,
                recipeData.description,
                recipeData.ingredients,
                recipeData.instructions,
                recipeData.time_consuming,
                recipeData.difficulty,
                recipeData.photo,
                recipeData.tags
            );

            console.log('Recipe created successfully:', response);
            dispatch(resetRecipe());
            onNext();  
        } catch (error) {
            console.error('Error creating recipe:', error.message);
        }
    };

    return(
        <Box component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "20px 40px",
                width: "100%",
                minHeight: '80vh',
                gap: '20px',
            }}       
        >
            <Typography sx={{
                color: theme.palette.primary.dark,
                fontSize: '30px',
                fontWeight: '800',
                textAlign: 'center',
                 paddingBottom: '20px'
            }}>
                Recipe Preview
            </Typography>

            <Divider />

            <Box>
                {photo && (
                    <Box sx={{display: 'flex', justifyContent: 'center', paddingTop:'20px', padding: '20px 50px'}}>
                        <img
                            src={photo}
                            alt={"img.jpg"}
                            loading="lazy"
                            style={{
                                height: '200px',
                                width: '100%',
                                objectFit: 'cover', 
                            }}
                        />
                    </Box>
                )}
                <Typography sx={{
                    color: theme.palette.beige[800],
                    fontSize: '32px',
                    fontWeight: '800',
                    textAlign: 'center',
                    paddingBottom: '20px'
                }}>
                    {title}
                </Typography>
                <Typography sx={{
                    color: theme.palette.brown[300],
                    fontSize: '26px',
                    fontWeight: '600',
                    textAlign: 'center',
                    paddingBottom: '20px'
                }}>
                    {description}
                </Typography>

                <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:'30px', marginBottom:'50px'}}>
                    {time && (
                        <Box sx={{display:'flex', alignItems:'center'}}>
                            <HourglassBottomIcon sx={{ color: theme.palette.grey[500] }}/>
                            <Typography sx={{marginLeft:'10px', fontSize:'18px', textTransform:'lowercase', color: theme.palette.grey[600]}}>
                                {time.value} {time.unit}
                            </Typography>
                        </Box>
                    )}
                    {difficulty && (
                       <Box sx={{display:'flex', alignItems:'center'}}>
                            <RestaurantIcon sx={{ color: theme.palette.grey[500] }}/>
                            <Typography sx={{marginLeft:'10px', fontSize:'20px', textTransform:'lowercase', color: theme.palette.grey[600]}}>
                                {difficulty}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Box sx={{marginBottom:'30px', padding:'0px 70px'}}>
                    <Typography 
                        sx={{ fontWeight: '600', fontSize: '18px', color: theme.palette.brown[600]}}
                    >
                        Ingredients:
                    </Typography>
                    <List>
                        {ingredients.map((ingredient, index)=> (
                            <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', gap: '10px', width:'fit-content' }}>
                                <ListItemIcon sx={{ minWidth: '20px' }}>
                                    <CircleIcon sx={{ fontSize: '8px', color: 'primary.main' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={`${ingredient.quantity}${ingredient.unit ? ` ${ingredient.unit}` : ''} ${ingredient.name}`} 
                                    sx={{ fontWeight: '500' }} 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>


                <Box sx={{marginBottom:'30px', padding:'0px 70px'}}>
                    <Typography 
                        sx={{ fontWeight: '600', fontSize: '18px', color: theme.palette.brown[600]}}
                    >
                        Steps
                    </Typography>
                    <List>
                    {steps.map((step, index) => (
                        <ListItem key={index}>
                            <ListItemText 
                                primary={
                                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography 
                                            sx={{ 
                                                fontWeight: 'bold', 
                                                color: theme.palette.beige[800], 
                                                marginRight: '10px' 
                                            }}
                                        >
                                            {index + 1}.
                                        </Typography>
                                        {step}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                    </List>
                </Box>
            </Box>

            {tags && (
                <Box>
                    <Typography sx={{
                        textAlign:'center', 
                        color:theme.palette.grey[500], 
                        fontWeight:'600', 
                        fontStyle:'italic',
                        marginBottom:'10px'
                    }}>
                        tags
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent='center'>
                        {tags.map((tag, index)=> (
                        <Chip
                                key={index}
                                label={tag}
                                color="primary"
                                sx={{fontSize:'16px'}}
                            />
                        ))}
                    </Stack>
                </Box>
            )}
          

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <SecondaryButton text={'Back'} onClick={onPrev} fontsize={'18'}/>
                <PrimaryButton text={"Create"} type="submit" fontsize={'18'}/>
            </Box>
        </Box>
    )
};

export default RecipeCreateReview;
