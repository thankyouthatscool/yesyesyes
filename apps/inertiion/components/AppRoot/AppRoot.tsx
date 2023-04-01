import { createDrawerNavigator } from "@react-navigation/drawer";
import { useCallback, useEffect } from "react";

import { CustomDrawer } from "@components/CustomDrawer";
import { HomeScreen, HomeScreenRoot } from "@screens/HomeScreen";
import { RootDrawerNavigationProps } from "@types";

const RootDrawer = createDrawerNavigator<RootDrawerNavigationProps>();

export const AppRoot = () => {
  const handleInitialLoad = useCallback(() => {
    console.log("doing the initial load");

    console.log("Will need to get the splashy");
  }, []);

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <RootDrawer.Navigator
      drawerContent={CustomDrawer}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <RootDrawer.Screen component={HomeScreenRoot} name="Home" />
    </RootDrawer.Navigator>
  );
};
