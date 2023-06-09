import { createDrawerNavigator } from "@react-navigation/drawer";
import { useCallback, useEffect } from "react";
import { Dimensions } from "react-native";

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
    console.log("doing the initial load");
    console.log("Will need to get the splashy");

    await Promise.all(
      [handleInitialItemQueue].map((functionName) => functionName())
    );
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
      <RootDrawer.Screen component={HomeScreenRoot} name="Home" />
      <RootDrawer.Screen component={UserScreen} name="User" />
      <RootDrawer.Screen component={SettingsScreen} name="Settings" />
    </RootDrawer.Navigator>
  );
};
