import { configureStore } from "@reduxjs/toolkit";
// import recipeReducer from "./slices/recipeSlice";
import userReducer from "./slices/userSlice";
import recipeCreateReducer from './slices/recipeCreateSlice';


const store = configureStore({
  reducer: {
    // recipe: recipeReducer,
    user: userReducer,
    recipeCreate: recipeCreateReducer,
  },
});

export default store;