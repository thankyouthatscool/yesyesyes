import AsyncStorage from "@react-native-async-storage/async-storage";

import { Recipe, RecipeTag } from "@types";

// Recipes
export const lsGetRecipes = async () => {
  const resString = await AsyncStorage.getItem("recipes");

  try {
    if (!!resString) {
      const recipes = JSON.parse(resString) as Recipe[];

      return { recipes, status: 200 };
    } else {
      return { recipes: [], status: 400 };
    }
  } catch {
    return { recipes: [], status: 500 };
  }
};

export const lsAddRecipe = async (newRecipe: Recipe) => {
  const resString = await AsyncStorage.getItem("recipes");

  try {
    if (!!resString) {
      const existingRecipes = JSON.parse(resString) as Recipe[];

      await AsyncStorage.setItem(
        "recipes",
        JSON.stringify([...existingRecipes, newRecipe])
      );
    } else {
      await AsyncStorage.setItem("recipes", JSON.stringify([newRecipe]));
    }

    return { status: 200 };
  } catch {
    return { status: 500 };
  }
};

// Tags
export const lsGetTags = async () => {
  const resString = await AsyncStorage.getItem("tags");

  if (!!resString) {
    const tags = JSON.parse(resString) as RecipeTag[];

    return { status: 200, tags };
  } else {
    return { status: 400, tags: [] };
  }
};
