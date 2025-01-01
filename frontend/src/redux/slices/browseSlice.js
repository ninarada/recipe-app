import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes: [],
    filteredRecipes: [],
    pagination: { currentPage: 1, itemsPerPage: 4 },
    allTags: [],
    selectedTags: [],
};

const browseSlice = createSlice({
    name: 'browse',
    initialState,
    reducers:{
        setRecipes: (state, action) => {
            state.recipes = action.payload;
        },
        setFilteredRecipes: (state, action) => {
            state.filteredRecipes = action.payload;
        },
        setPage: (state, action) => {
            state.pagination.currentPage = action.payload;
        },
        setItemsPerPage: (state, action) => {
            state.pagination.itemsPerPage = action.payload;
        },
        setAllTags: (state, action) => {
            state.allTags = action.payload;
        },
        addTag: (state, action) => {
            state.selectedTags.push(action.payload);
        },
        removeTag: (state, action) => {
            const index = action.payload;
            state.selectedTags.splice(index, 1);
        },
        removeAllTags: (state) => {
            state.selectedTags = [];
        },
    }
});

export const {
    setRecipes,
    setFilteredRecipes,
    setPage,
    setItemsPerPage,
    setAllTags,
    addTag,
    removeTag,
    removeAllTags
} = browseSlice.actions;

export default browseSlice.reducer;