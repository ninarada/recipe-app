import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRecipes } from '../../service/recipeService';

const initialState = {
    recipes: [],
    loading: false,
    error: null,
};

export const fetchRecipes = createAsyncThunk('recipes/fetchAll', async (_, thunkAPI) => {
    try {
      return await getAllRecipes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchRecipes.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchRecipes.fulfilled, (state, action) => {
          state.loading = false;
          state.recipes = action.payload;
        })
        .addCase(fetchRecipes.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default recipeSlice.reducer;
  