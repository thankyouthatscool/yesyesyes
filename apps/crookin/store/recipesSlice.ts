import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RecipesState } from "@types";

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
    setSelectedRecipe: (state, { payload }: PayloadAction<string | null>) => {
      state.selectedRecipe = payload;
    },
  },
});

export const { setSelectedRecipe } = recipesSlice.actions;
