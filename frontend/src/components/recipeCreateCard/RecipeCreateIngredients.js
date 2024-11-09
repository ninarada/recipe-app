import {
  Box,
  useTheme,
  Typography,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  Tooltip
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, updateIngredient, removeIngredient } from "../../redux/slices/recipeCreateSlice";
import PrimaryButton from "../buttons/primaryButton";
import SecondaryButton from "../buttons/secondaryButton";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'; 

const RecipeCreateIngredients = ({ onNext, onPrev }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.recipeCreate.ingredients);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [snack, setSnack] = useState(false);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(addIngredient({ name: "", quantity: "", unit: "" }));
    }
  }, [dispatch, ingredients.length]);

  const handleChange = (index, field, value) => {
    const updatedIngredient = { ...ingredients[index], [field]: value };
    dispatch(updateIngredient({ index, ingredient: updatedIngredient }));
  };

  const handleAddRow = () => {
    const lastIngredient = ingredients[ingredients.length - 1];
    if (lastIngredient.name !== '' && lastIngredient.quantity !== '') {
      dispatch(addIngredient({ name: '', quantity: '', unit: '' }));
    } else {
        setSnack(true);
    }
  };

  const handleDeleteRow = (index) => {
    if (ingredients.length > 1) {
      dispatch(removeIngredient(index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lastIngredient = ingredients[ingredients.length - 1];

    if (!lastIngredient.name || !lastIngredient.quantity ) {
      setTooltipOpen(true); 
      return;
    }

    const isValid = ingredients.some(
      (ingredient) =>
        ingredient.name && ingredient.quantity && ingredient.unit
    );

    if (isValid) {
      onNext(); 
    } else {
      alert("Please enter at least one complete ingredient before proceeding.");
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
      }}
    >
      <Typography
        sx={{
          color: theme.palette.primary.dark,
          fontSize: "30px",
          fontWeight: "800",
          textAlign: "center",
        }}
      >
        Next, List Your Ingredients
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '10%' }} align="center">#</TableCell>
            <TableCell align="center">Name (*)</TableCell>
            <TableCell align="center">Amount (*)</TableCell>
            <TableCell align="center">Unit of Measurement</TableCell>
            <TableCell sx={{ width: '10%' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.map((ingredient, index) => (
            <TableRow key={index} sx={{ borderBottom: 'none' }}> 
                <TableCell align="center" sx={{ borderBottom: 'none' }}>{index + 1}.</TableCell> 
              <TableCell sx={{ borderBottom: 'none' }}>
                <TextField
                  value={ingredient.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  variant="outlined"
                  fullWidth
                  placeholder="e.g., Sugar"
                />
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                <TextField
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleChange(index, "quantity", e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                  placeholder="e.g., 1"
                  type="number"
                />
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                <TextField
                  value={ingredient.unit}
                  onChange={(e) => handleChange(index, "unit", e.target.value)}
                  variant="outlined"
                  fullWidth
                  placeholder="e.g., cups"
                />
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                <IconButton onClick={() => handleDeleteRow(index)} color={theme.palette.grey[700]}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snack}
          onClose={() => setSnack(false)}
          message="Please fill out the last ingredient before adding new"
          autoHideDuration={2000}
          sx={{ paddingTop: '50px',}}
        />
        <Tooltip 
          title="Add Ingredient" 
          arrow 
          sx={{
            color: theme.palette.primary.light,
            backgroundColor: theme.palette.beige[100],
          }}
        >
            <IconButton onClick={handleAddRow} color="primary" sx={{ marginTop: '20px' }}>
            <AddIcon />
            </IconButton>
        </Tooltip>
      </Box>
      

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <SecondaryButton text={"Back"} onClick={onPrev} fontsize={'18'}/>
        <Tooltip
          title="Please fill out the last ingredient before proceeding"
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

export default RecipeCreateIngredients;
