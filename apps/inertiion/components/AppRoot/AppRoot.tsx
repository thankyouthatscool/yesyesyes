import { createDrawerNavigator } from "@react-navigation/drawer";
import Constants from "expo-constants";
import * as Updates from "expo-updates";
import { useCallback, useEffect } from "react";
import { Dimensions, ToastAndroid } from "react-native";

import { CustomDrawer } from "@components/CustomDrawer";
import { useAppDispatch } from "@hooks";
import { HomeScreenRoot } from "@screens/HomeScreen";
import { SettingsScreen } from "@screens/SettingsScreen";
import { UserScreen } from "@screens/UserScreen";
import { setItemQueue } from "@store";
import { AsyncStorageReturnStatus, RootDrawerNavigationProps } from "@types";
import { localStorageGetItemQueue } from "@utils";

const RootDrawer = createDrawerNavigator<RootDrawerNavigationProps>();

const { width } = Dimensions.get("screen");

export const AppRoot = () => {
  const dispatch = useAppDispatch();

  const handleInitialItemQueue = useCallback(async () => {
    const { itemQueue, status } = await localStorageGetItemQueue();

    if (status === AsyncStorageReturnStatus.OK) {
      dispatch(setItemQueue(itemQueue));
    }
  }, []);

  const handleInitialLoad = useCallback(async () => {
    if (
      Constants.expoConfig?.extra?.ENV === "development" ||
      Constants.expoConfig?.extra?.ENV === "development:win"
    ) {
      console.log("doing the initial load");
      console.log("Will need to get the splashy");

      await Promise.all(
        [handleInitialItemQueue].map((functionName) => functionName())
      );
    } else {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          ToastAndroid.show(
            "Update is available, and will be downloaded right now.",
            ToastAndroid.LONG
          );

          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        } else {
          console.log("doing the initial load");
          console.log("Will need to get the splashy");

          await Promise.all(
            [handleInitialItemQueue].map((functionName) => functionName())
          );
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("Something went wrong.");
        }
      }
    }
  }, []);

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <RootDrawer.Navigator
      drawerContent={CustomDrawer}
      initialRouteName="Home"
      screenOptions={{ headerShown: false, swipeEdgeWidth: width / 2 }}
    >
      <RootDrawer.Screen
        component={UserScreen}
        name="User"
        options={{ title: "Admin" }}
      />
      <RootDrawer.Screen component={HomeScreenRoot} name="Home" />
      <RootDrawer.Screen component={SettingsScreen} name="Settings" />
    </RootDrawer.Navigator>
  );
};
