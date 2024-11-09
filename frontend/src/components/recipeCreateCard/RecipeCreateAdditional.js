import React, { useEffect, useState } from 'react';
import { 
    Box, 
    Typography, 
    Checkbox, 
    TextField, 
    useTheme, 
    FormControlLabel,
    ToggleButton, 
    ToggleButtonGroup, 
    Chip, 
    Stack, 
    IconButton, 
    Button
} from "@mui/material";
import PrimaryButton from '../buttons/primaryButton';
import SecondaryButton from '../buttons/secondaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeConsumingValue, setTimeConsumingUnit, setDifficulty, setPhoto, addTag, removeTag } from '../../redux/slices/recipeCreateSlice';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close'; 

const RecipeCreateAdditional= ({ onNext, onPrev }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const recipeTime = useSelector((state)=> state.recipeCreate.time_consuming);
    const recipeDifficulty = useSelector((state)=> state.recipeCreate.difficulty);
    const recipePhoto = useSelector((state)=> state.recipeCreate.photo);
    const recipeTags = useSelector((state)=> state.recipeCreate.tags);
    const [inputValue, setInputValue] = useState('');

    const handleValueChange = (e) => {
        const value = e.target.value ? parseInt(e.target.value) : '';
        dispatch(setTimeConsumingValue(value));
        if (value === '') {
            dispatch(setTimeConsumingUnit(''));
        }
    };
    
    const handleUnitChange = (e, newUnit) => {
        if (recipeTime.unit === newUnit) {
            dispatch(setTimeConsumingUnit(''));
        } else {
            dispatch(setTimeConsumingUnit(newUnit));
        }
    };
    const handleChangeDifficulty = (e) => {
        if (e.target.value === recipeDifficulty) {
            dispatch(setDifficulty(''));
        } else {
            dispatch(setDifficulty(e.target.value));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            dispatch(setPhoto(reader.result));
          };
          reader.readAsDataURL(file); 
        }
    };

    const handleRemoveImage = () => {
        dispatch(setPhoto(null));
    };

    const handleAddTag = () => {
        if (inputValue && !recipeTags.includes(inputValue)) {
          dispatch(addTag(inputValue));
          setInputValue('');
        }
      };
    
    const handleDeleteTag = (index) => {
        dispatch(removeTag(index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // Prevent form submission
            handleAddTag();
        }
    };

    const handleSubmit =(e) => {
        e.preventDefault();
        onNext();
    };
    
    return (
        <Box 
            component="form"
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
                Additional Info
            </Typography>

            <Box sx={{
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                gap: '20px', 
                marginBottom: '10px',
                padding: '20px 50px',
                backgroundColor: '#FFFDFA', 
                borderRadius: '10px'
            }}>
                <Typography sx={{
                    color: theme.palette.grey[600],
                    fontSize: '20px',
                    fontWeight: '500',
                    textAlign: 'center',
                }}>
                    How long will it take to prepare your recipe?
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px'}}>
                    <TextField 
                        label='time'
                        type='number'
                        variant='standard'
                        value={recipeTime.value ? recipeTime.value : ''}
                        onChange={handleValueChange}
                        sx={{ width: '150px' }}
                    />
                    <ToggleButtonGroup
                        value={recipeTime.unit}
                        exclusive
                        onChange={handleUnitChange}
                        aria-label="time unit"
                        disabled={!recipeTime.value}
                    >
                        <ToggleButton value="minutes" aria-label="minutes" sx={{'&.Mui-selected': {backgroundColor:theme.palette.primary.main}}}>
                            Minutes
                        </ToggleButton>
                        <ToggleButton value="hours" aria-label="hours" sx={{'&.Mui-selected': {backgroundColor:theme.palette.primary.main}}}>
                            Hours
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>


            <Box sx={{
                display: 'flex', 
                flexDirection:'column', 
                alignItems: 'center', 
                gap:'20px', 
                marginBottom: '10px',
                backgroundColor: '#FFFDFA', 
                borderRadius: '10px',
                padding: '20px 50px',
            }}>
                <Typography sx={{
                    color: theme.palette.grey[600],
                    fontSize: '20px',
                    fontWeight: '500',
                    textAlign: 'center',
                }}>
                    Choose the difficulty level of your recipe:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
                    <FormControlLabel label="Easy" control={
                            <Checkbox 
                                checked={recipeDifficulty === 'Easy'}
                                onChange={handleChangeDifficulty}
                                value="Easy"
                                sx={{ color: '#4CAF50' }} 
                            />
                        }  
                    />
                    <FormControlLabel label="Intermediate" 
                        control={
                            <Checkbox 
                                checked={recipeDifficulty === 'Intermediate'}
                                onChange={handleChangeDifficulty}
                                value="Intermediate"
                                sx={{ color: '#FF9800' }} 
                            />
                        } 
                        
                    />
                    <FormControlLabel label="Advanced" 
                        control={
                            <Checkbox 
                                checked={recipeDifficulty === 'Advanced'}
                                onChange={handleChangeDifficulty}
                                value="Advanced"
                                sx={{ color: '#F44336' }} 
                            />
                        } 
                    />
                </Box>
            </Box>


            <Box sx={{ 
                marginBottom: '10px', 
                display:'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#FFFDFA', 
                borderRadius: '10px',
                padding: '20px 50px',
            }}>
                <Typography sx={{
                    color: theme.palette.grey[600],
                    fontSize: '20px',
                    fontWeight: '500',
                    textAlign: 'center',
                    paddingBottom: '20px',
                }}>
                    Upload a photo of your recipe:
                </Typography>
                {recipePhoto ? (
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', position: 'relative', width: 'fit-content'}}>
                        <img src={recipePhoto} alt="preview" style={{ height: '200px', objectFit: 'cover' }} />
                        <IconButton
                            onClick={handleRemoveImage}
                            sx={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: '50%',
                                color: 'white',
                                zIndex: 1,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                        />
                    </Button>
                )}
            </Box>


            <Box sx={{ 
                marginBottom: '20px',
                backgroundColor: '#FFFDFA', 
                borderRadius: '10px',
                padding: '20px 50px',
            }}>
                <Typography sx={{
                    color: theme.palette.grey[600],
                    fontSize: '20px',
                    fontWeight: '500',
                    textAlign: 'center',
                }}>
                    Add tags to your recipe:
                </Typography>
                <Stack direction="row" spacing={1} justifyContent='center' sx={{ mt: 2, mb: 2}}>
                    <TextField
                        label="Add new tag"
                        variant="outlined"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown} 
                    />
                    <IconButton onClick={handleAddTag} color="primary">
                        <AddIcon />
                    </IconButton>
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent='center'>
                    {recipeTags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            onDelete={() => handleDeleteTag(index)}
                            color="primary"
                            sx={{fontSize:'16px'}}
                        />
                    ))}
                </Stack>
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

export default RecipeCreateAdditional;