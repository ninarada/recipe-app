import { createSlice } from "@reduxjs/toolkit";

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (
    { title, description, ingredients, instructions },
    { rejectWithValue }
  ) => {
    try {
      const response = await createRecipe(
        title,
        description,
        ingredients,
        instructions
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  recipe: null,
  error: null,
};

const recipeCreateSlice = createSlice({
  name: "recipeCreate",
  initialState,
  reducers: {
    resetRecipeState: (state) => {
      state.loading = false;
      state.recipe = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRecipeState } = recipeCreateSlice.actions;
export default recipeCreateSlice.reducer;