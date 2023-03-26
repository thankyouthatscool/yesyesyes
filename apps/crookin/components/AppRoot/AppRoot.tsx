import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SplashScreen from "expo-splash-screen";
import { FC, useCallback, useEffect, useState } from "react";
import { Modal, ScrollView, ToastAndroid, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";

import { useAppDispatch } from "@hooks";
import { HomeScreen } from "@screens/HomeScreen";
import { NewRecipeScreen } from "@screens/NewRecipeScreen";
import { setAvailableTags, setRecipes } from "@store";
import {
  NewRecipeScreenNavigationProps,
  RootDrawerNavigationProps,
} from "@types";
import { lsGetRecipes, lsGetTags } from "@utils";

import { AppRootWrapper } from "./Styled";

const RootDrawer = createDrawerNavigator<RootDrawerNavigationProps>();

export const AppRoot = () => {
  const dispatch = useAppDispatch();

  const handleInitialLoad = useCallback(async () => {
    const { recipes, status } = await lsGetRecipes();
    const { tags } = await lsGetTags();

    ToastAndroid.show(
      status === 200
        ? `${recipes.length} recipes retrieved.`
        : status === 400
        ? "No recipes found."
        : "Something went wrong! Please try again later!",
      ToastAndroid.SHORT
    );

    dispatch(setAvailableTags(tags));
    dispatch(setRecipes(recipes));

    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <AppRootWrapper>
      <RootDrawer.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <RootDrawer.Screen component={HomeScreen} name="Home" />
        <RootDrawer.Screen
          component={NewRecipeScreen}
          name="NewRecipe"
          options={{ drawerItemStyle: { display: "none" } }}
        />
      </RootDrawer.Navigator>
    </AppRootWrapper>
  );
};
