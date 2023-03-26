import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { ToastAndroid } from "react-native";

import { useAppDispatch } from "@hooks";
import { HomeScreen } from "@screens/HomeScreen";
import { setAvailableTags, setRecipes } from "@store";
import { lsGetRecipes, lsGetTags } from "@utils";

import { AppRootWrapper } from "./Styled";

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
      <HomeScreen />
    </AppRootWrapper>
  );
};
