import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import type { ImagePickerAsset } from "expo-image-picker";

export type RootDrawerNavigationProps = {
  Home: undefined;
  NewRecipe: undefined;
};

export type HomeScreenNavigationProps = DrawerScreenProps<
  RootDrawerNavigationProps,
  "Home"
>;

export type NewRecipeScreenNavigationProps = DrawerScreenProps<
  RootDrawerNavigationProps,
  "NewRecipe"
>;

export type RecipeStep = {
  description: string;
  duration?: number;
  durationUnit?: "s" | "m" | "h";
  id: string;
  pictures: ImagePickerAsset[];
  type?: "prep" | "cook";
};

export type RecipeTag = { id: string; name: string };

export type Recipe = {
  id: string;
  description?: string;
  name: string;
  coverPhoto?: string;
  steps: RecipeStep[];
  reactions: string[];
  tags: RecipeTag[];
};

export type RecipesState = {
  activeStep: string | null;
  recipes: Recipe[];
  selectedRecipe: string | null;

  // Tags
  availableTags: RecipeTag[];
  selectedTags: string[];
};
