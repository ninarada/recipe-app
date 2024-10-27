import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./slices/recipeSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    user: userReducer,
  },
});
