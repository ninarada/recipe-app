import React from 'react';
import { Box, Typography, TextField, useTheme } from "@mui/material";
import PrimaryButton from '../buttons/primaryButton';
import SecondaryButton from '../buttons/secondaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle, setDescription } from '../../redux/slices/recipeCreateSlice';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const RecipeCreateTitle = ({ onNext, onPrev }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const recipeTitle = useSelector((state) => state.recipeCreate.title);
    const recipeDescription = useSelector((state) => state.recipeCreate.description);

    const handleTitleChange = (e) => {
        dispatch(setTitle(e.target.value));
    };
    
    const handleDescriptionChange = (e) => {
        dispatch(setDescription(e.target.value));
    };

    return (
        <Box             
            component="form" 
            onSubmit={(e) => {
                e.preventDefault();
                onNext();
            }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px 40px',
                width: '100%',
                minHeight: '80vh'
            }}
        >
            <Typography sx={{
                color: theme.palette.primary.dark,
                fontSize: '30px',
                fontWeight: '800',
                textAlign: 'center',
            }}>
                Let's Name Your Recipe
            </Typography>
            <Box sx={{padding: '20px 50px', backgroundColor: '#FFFDFA', borderRadius: '10px'}}>
                <Typography sx={{
                    fontSize: '20px',
                    color: theme.palette.grey[800],
                    paddingBottom: '20px',
                }}>
                    Add a short, catchy title that captures the essence of your dish.
                </Typography>
                <Textarea 
                    aria-label="empty textarea" 
                    placeholder='Title'
                    value={recipeTitle}
                    onChange={handleTitleChange} 
                    required
                />
                {/* <TextField 
                    id="standard-basic" 
                    label="title" 
                    variant="standard" 
                    value={recipeTitle}
                    onChange={handleTitleChange}
                    required
                    style={{width: '100%'}}
                /> */}
            </Box>
            <Box sx={{padding: '20px 50px', backgroundColor: '#FFFDFA', borderRadius: '10px'}}>           
                <Typography sx={{
                    fontSize: '20px',
                    color: theme.palette.grey[800],
                    paddingBottom: '20px',
                }}>
                    Describe your recipe in a few sentences. Let others know what makes it special and any unique flavors to expect.
                </Typography>
                <Textarea 
                    aria-label="empty textarea" 
                    placeholder='Description'
                    value={recipeDescription}
                    onChange={handleDescriptionChange} 
                    required
                />
                {/* <TextField
                    id="standard-basic"
                    label="description"
                    variant="standard"
                    value={recipeDescription}
                    onChange={handleDescriptionChange}
                    required
                    multiline 
                    rows={3} 
                    style={{ width: '100%' }} 
                /> */}
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                <SecondaryButton text={'Back'} onClick={onPrev} fontsize={'18'}/>
                <PrimaryButton text={'Next'} type='submit' fontsize={'18'}/>
            </Box>
            
      </Box>
    );
};

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
        box-sizing: border-box;
        width: 100%;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px 12px 0 12px;
        color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
        background: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]};

        &:hover {
        border-color: ${theme.palette.orange[400]};
        }

        &:focus {
        outline: 0;
        border-color: ${theme.palette.orange[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? theme.palette.orange[600] : theme.palette.orange[200]};
        }

        // firefox
        &:focus-visible {
        outline: 0;
        }
    `,
);

export default RecipeCreateTitle;