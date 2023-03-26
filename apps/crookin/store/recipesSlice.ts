import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Recipe, RecipesState } from "@types";

const initialState: RecipesState = {
  activeStep: null,
  recipes: [],
  selectedRecipe: null,
  selectedTags: [],
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, { payload }: PayloadAction<Recipe[]>) => {
      state.recipes = payload;
    },
    setSelectedRecipe: (state, { payload }: PayloadAction<string | null>) => {
      state.selectedRecipe = payload;
    },
  },
});

export const { setRecipes, setSelectedRecipe } = recipesSlice.actions;
