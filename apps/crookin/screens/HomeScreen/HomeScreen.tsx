import { FC, useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import { Card, FAB, IconButton, Text as RNPText } from "react-native-paper";

import { TagSelectorComponent } from "@components/TagSelectorComponent";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setSelectedRecipe } from "@store";
import { defaultAppPaddingSize } from "@theme";
import { Recipe, HomeScreenNavigationProps } from "@types";

import {
  HomeScreenWrapper,
  HomeScreenColumnWrapper,
  HomeScreenScrollWrapper,
  NoRecipesWrapper,
} from "./Styled";

export const HomeScreen: FC<HomeScreenNavigationProps> = ({ navigation }) => {
  const { recipes, selectedTags } = useAppSelector(({ recipes }) => recipes);

  useEffect(() => console.log(selectedTags), [selectedTags]);

  return (
    <HomeScreenWrapper>
      <TagSelectorComponent />
      {!recipes.length ? (
        <NoRecipesWrapper>
          <IconButton
            iconColor="purple"
            icon="plus"
            mode="contained"
            onPress={() => {
              navigation.navigate("NewRecipe");
            }}
            size={50}
          />
          <RNPText variant="titleLarge">Add Recipes</RNPText>
          <RNPText variant="bodySmall">No recipes found on the device.</RNPText>
        </NoRecipesWrapper>
      ) : (
        <RecipeColumns
          columnsNum={2}
          recipes={recipes.filter((rec) =>
            selectedTags.every((tag) =>
              rec.tags.map((tag) => tag.id).includes(tag)
            )
          )}
        />
      )}
      <FAB
        icon="plus"
        onPress={() => {
          navigation.navigate("NewRecipe");
        }}
        style={{
          alignSelf: "flex-start",
          bottom: defaultAppPaddingSize * 3,
          position: "absolute",
          right: defaultAppPaddingSize * 3,
        }}
      />
    </HomeScreenWrapper>
  );
};

export const RecipeColumns: FC<{ columnsNum?: number; recipes: Recipe[] }> = ({
  columnsNum,
  recipes,
}) => {
  const dispatch = useAppDispatch();

  const numberOfColumns = useMemo(() => columnsNum || 2, [columnsNum]);

  return (
    <HomeScreenScrollWrapper>
      {Array.from({ length: numberOfColumns }).map((_, outerIdx) => (
        <HomeScreenColumnWrapper key={outerIdx}>
          {recipes
            .filter((_, idx) => idx % numberOfColumns === outerIdx)
            .map((recipe) => (
              <Card
                key={recipe.id}
                onPress={() => {
                  dispatch(setSelectedRecipe(recipe.id));
                }}
                style={{
                  marginLeft:
                    outerIdx === 0
                      ? defaultAppPaddingSize
                      : defaultAppPaddingSize / 2,
                  marginRight:
                    outerIdx === numberOfColumns - 1
                      ? defaultAppPaddingSize
                      : defaultAppPaddingSize / 2,
                  marginBottom: 8,
                }}
              >
                <Card.Content>
                  <Text>{recipe.name}</Text>
                  {recipe.tags.map((tag) => (
                    <Text key={tag.id}>{tag.name}</Text>
                  ))}
                </Card.Content>
              </Card>
            ))}
        </HomeScreenColumnWrapper>
      ))}
    </HomeScreenScrollWrapper>
  );
};
