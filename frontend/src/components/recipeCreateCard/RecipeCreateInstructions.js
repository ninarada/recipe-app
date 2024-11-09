import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInstruction, updateInstruction, removeInstruction } from '../../redux/slices/recipeCreateSlice';
import PrimaryButton from '../buttons/primaryButton';
import SecondaryButton from '../buttons/secondaryButton';
import { styled } from '@mui/system';
import { Box, Typography, useTheme, Tooltip, IconButton } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Snackbar from '@mui/material/Snackbar';
import AddIcon from '@mui/icons-material/Add'; 
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const RecipeCreateInstructions = ({ onNext, onPrev }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const steps = useSelector((state) => state.recipeCreate.instructions);
    const [snack, setSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState(''); 
    const [tooltipOpen, setTooltipOpen] = useState(false);
    
    useEffect(() => {
        if(steps.length === 0) {
            dispatch(addInstruction(''));
        }
    }, [dispatch, steps.length]);

    const handleChange = (index, value) => {
        if (value !== undefined) {
            dispatch(updateInstruction({ index, instruction: value }));
        }
    };

    const handleAddStep = () => {
        const isAnyStepEmpty = steps.some((step) => step === '');
        if(!isAnyStepEmpty){
            dispatch(addInstruction(''));
        } else {
            setSnackMessage('Please fill out all steps before adding a new one');
            setSnack(true);
        }
    };

    const handleDeleteStep = (index) => {
        if(steps.length > 1) {
            dispatch(removeInstruction(index));
        }
    };

    const moveStepUp = (index) => {
        if(index > 0) {
            const tempSteps = [...steps];
            [tempSteps[index], tempSteps[index - 1]] = [tempSteps[index - 1], tempSteps[index]];
            dispatch(updateInstruction({ index: index - 1, instruction: tempSteps[index - 1] }));
            dispatch(updateInstruction({ index, instruction: tempSteps[index] }));
        } else {
            setSnackMessage('This step is already at the top and cannot be moved up.');
            setSnack(true);
        }
    }

    const moveStepDown = (index) => {
        if (index < steps.length - 1) {
            const tempSteps = [...steps];
            [tempSteps[index], tempSteps[index + 1]] = [tempSteps[index + 1], tempSteps[index]];
            dispatch(updateInstruction({ index: index + 1, instruction: tempSteps[index + 1] }));
            dispatch(updateInstruction({ index, instruction: tempSteps[index] }));
        } else {
            setSnackMessage('This step is already at the bottom and cannot be moved down.');
            setSnack(true);
        }
    };

    const handleSubmit =(e) => {
        e.preventDefault();
        const lastStep = steps[steps.length - 1];
        if(!lastStep) {
            setTooltipOpen(true);
            return;
        }

        const isValid = steps.some((step) => step);

        if(isValid){
            onNext();
        } else {
            alert("Please enter at least one step before proceeding.");
        }
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
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snack}
                onClose={() => setSnack(false)}
                message={snackMessage}
                autoHideDuration={2000}
                sx={{ paddingTop: '50px',}}
            />

            <Typography sx={{
                color: theme.palette.primary.dark,
                fontSize: '30px',
                fontWeight: '800',
                textAlign: 'center',
            }}>
                Now Add Instructions 
            </Typography>

            <Typography sx={{
                color: theme.palette.grey[600],
                fontSize: '20px',
                fontWeight: '500',
                textAlign: 'center',
            }}>
                Step by step, add instructions for preparing your recipe. Start with a simple action for each step, like ‘Chop the onions’ or ‘Preheat the oven to 350°F...
            </Typography>

            {steps.map((step, index) => (
                <Box 
                    key={index}
                    sx={{
                        display:'flex',
                        gap: '20px',
                        alignItems: 'center',
                        padding: '20px 50px', 
                        backgroundColor: '#FFFDFA', 
                        borderRadius: '10px'
                    }}
                >
                    <Typography>{index + 1}.</Typography>
                    <Textarea 
                        aria-label="empty textarea" 
                        placeholder='Describe this step...'
                        value={step}
                        onChange={(e) => handleChange(index, e.target.value)} 
                    />
                    <IconButton onClick={() => handleDeleteStep(index)} color={theme.palette.grey[700]}>
                        <DeleteIcon />
                    </IconButton>

                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <IconButton onClick={() => moveStepUp(index)}>
                            <KeyboardArrowUpIcon />
                           
                        </IconButton>
                        <IconButton onClick={() => moveStepDown(index)}>
                             <KeyboardArrowDownIcon />
                        </IconButton>
                    </Box>
                </Box>
            ))}

            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Tooltip 
                    title="Add next step"
                    arrow
                    sx={{
                        color: theme.palette.primary.light,
                        backgroundColor: theme.palette.beige[100],
                    }}
                >
                    <IconButton onClick={handleAddStep} color="primary" sx={{ marginTop: '20px' }}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <SecondaryButton text={'Back'} onClick={onPrev} fontsize={'18'}/>
                <Tooltip
                    title="Please fill out the last step before proceeding"
                    open={tooltipOpen}
                    onClose={() => setTooltipOpen(false)}
                    arrow
                >
                    <span>
                        <PrimaryButton text={"Next"} type="submit" fontsize={'18'}/>
                    </span>
                </Tooltip>
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

export default RecipeCreateInstructions;