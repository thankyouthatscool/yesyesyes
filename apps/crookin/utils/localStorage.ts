import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Recipe, RecipeTag } from "@types";

// Recipes
export const lsGetRecipes = async () => {
  // await AsyncStorage.multiRemove(["recipes", "tags"]);

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
export const lsAddTags = async (newTags: string[]) => {
  const resString = await AsyncStorage.getItem("tags");
  const uniqueNewTags = Array.from(new Set(newTags));

  try {
    if (!!resString) {
      const tags = JSON.parse(resString) as RecipeTag[];

      const tagsToAdd = uniqueNewTags.filter(
        (newTag) => !tags.map((tag) => tag.name).includes(newTag)
      );

      const allTags = Array.from(
        new Set([
          ...tags,
          ...tagsToAdd.map((tag) => ({
            id: Crypto.randomUUID() as string,
            name: tag,
          })),
        ])
      );

      await AsyncStorage.setItem("tags", JSON.stringify(allTags));

      return { status: 200, tags: allTags };
    } else {
      const allTags = Array.from(
        new Set([
          ...uniqueNewTags.map((tag) => ({
            id: Crypto.randomUUID() as string,
            name: tag,
          })),
        ])
      );

      await AsyncStorage.setItem("tags", JSON.stringify(allTags));

      return { status: 200, tags: allTags };
    }
  } catch {
    return { status: 500, tags: [] };
  }
};

export const lsGetTags = async () => {
  const resString = await AsyncStorage.getItem("tags");

  if (!!resString) {
    const tags = JSON.parse(resString) as RecipeTag[];

    return { status: 200, tags };
  } else {
    return { status: 400, tags: [] };
  }
};
