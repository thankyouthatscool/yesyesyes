import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { ToastAndroid } from "react-native";

import { useAppDispatch } from "@hooks";
import { HomeScreen } from "@screens/HomeScreen";
import { setRecipes } from "@store";
import { lsGetRecipes } from "@utils";

import { AppRootWrapper } from "./Styled";

export const AppRoot = () => {
  const dispatch = useAppDispatch();

  const handleInitialLoad = useCallback(async () => {
    const { recipes, status } = await lsGetRecipes();

    ToastAndroid.show(
      status === 200
        ? `${recipes.length} recipes retrieved.`
        : status === 400
        ? "No recipes found."
        : "Something went wrong! Please try again later!",
      ToastAndroid.SHORT
    );

    dispatch(setRecipes(recipes));

    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <AppRootWrapper>
      <HomeScreen />
    </AppRootWrapper>
  );
};
