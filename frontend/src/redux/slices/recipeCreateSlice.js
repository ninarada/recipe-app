import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: '',
  description: '',
  ingredients: [],
  instructions: [],
  photo: null,
  time_consuming: { value: null, unit: '' },
  difficulty: '',
  tags: []
};

const recipeCreateSlice = createSlice({
  name: 'recipeCreate',
  initialState,
  reducers: {
      setTitle: (state, action) => { 
        state.title = action.payload 
      },
      setDescription: (state, action) => { 
        state.description = action.payload 
      },
      addIngredient: (state, action) => {
        state.ingredients.push(action.payload);
      },
      updateIngredient: (state, action) => {
        const { index, ingredient } = action.payload;
        state.ingredients[index] = ingredient;
      },
      removeIngredient: (state, action) => {
        const index = action.payload;
        state.ingredients.splice(index, 1);
      },
      addInstruction: (state, action) => {
        state.instructions.push(action.payload);
      },
      updateInstruction: (state, action) => {
        const { index, instruction } = action.payload;
        state.instructions[index] = instruction; 
      },
      removeInstruction: (state, action) => {
        const index = action.payload;
        state.instructions.splice(index, 1);
      },
      setPhoto: (state, action) => { 
        state.photo = action.payload 
      },
      setTimeConsumingValue: (state, action) => { 
        state.time_consuming.value = action.payload 
      },
      setTimeConsumingUnit: (state, action) => { 
        state.time_consuming.unit = action.payload 
      },
      setDifficulty: (state, action) => { 
        state.difficulty = action.payload 
      },
      addTag: (state, action) => {
        state.tags.push(action.payload);
      },
      removeTag: (state, action) => {
        const index = action.payload;
        state.tags.splice(index, 1);
      },
      resetRecipe: () => initialState 
  }
});

export const {
  setTitle,
  setDescription,
  addIngredient,
  updateIngredient,
  removeIngredient,
  addInstruction,
  updateInstruction,
  removeInstruction,
  setPhoto,
  setTimeConsumingValue,
  setTimeConsumingUnit,
  setDifficulty,
  addTag,
  removeTag,
  resetRecipe
} = recipeCreateSlice.actions;

export default recipeCreateSlice.reducer;