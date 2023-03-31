import { createDrawerNavigator } from "@react-navigation/drawer";

import { CustomDrawer } from "@components/CustomDrawer";
import { HomeScreen } from "@screens/HomeScreen";
import { RootDrawerNavigationProps } from "@types";

const RootDrawer = createDrawerNavigator<RootDrawerNavigationProps>();

export const AppRoot = () => {
  return (
    <RootDrawer.Navigator
      drawerContent={CustomDrawer}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <RootDrawer.Screen component={HomeScreen} name="Home" />
    </RootDrawer.Navigator>
  );
};
