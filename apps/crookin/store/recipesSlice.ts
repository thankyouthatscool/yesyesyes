import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Recipe, RecipesState, RecipeTag } from "@types";

const initialState: RecipesState = {
  // Recipes
  recipes: [],
  selectedRecipe: null,

  // Steps
  activeStep: null,

  // Tags
  availableTags: [],
  selectedTags: [],
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    // Recipes
    setRecipes: (state, { payload }: PayloadAction<Recipe[]>) => {
      state.recipes = payload;
    },
    setSelectedRecipe: (state, { payload }: PayloadAction<string | null>) => {
      state.selectedRecipe = payload;
    },

    // Tags
    setAvailableTags: (state, { payload }: PayloadAction<RecipeTag[]>) => {
      state.availableTags = payload;
    },
    setSelectedTags: (state, { payload }: PayloadAction<string[]>) => {
      state.selectedTags = payload;
    },
  },
});

export const {
  // Recipes
  setRecipes,
  setSelectedRecipe,

  // Steps

  // Tags
  setAvailableTags,
  setSelectedTags,
} = recipesSlice.actions;
