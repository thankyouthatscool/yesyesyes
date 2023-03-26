export type RecipeStep = {
  description: string;
  duration?: number;
  id: string;
  type?: "prep" | "cook";
};

export type Recipe = {
  id: string;
  description?: string;
  name: string;
  steps: RecipeStep[];
  reactions: string[];
  tags: string[];
};

export type RecipesState = {
  activeStep: string | null;
  recipes: Recipe[];
  selectedRecipe: string | null;
  selectedTags: string[];
};
