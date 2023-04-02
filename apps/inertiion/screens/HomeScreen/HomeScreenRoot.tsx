import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NewCatalogItemScreen } from "@screens/NewCatalogItemScreen";
import { ItemQueueScreen } from "@screens/ItemQueueScreen";
import { HomeScreenNavStackProps } from "@types";

import { HomeScreen } from "./HomeScreen";

const HomeScreenNavStack =
  createNativeStackNavigator<HomeScreenNavStackProps>();

export const HomeScreenRoot = () => {
  return (
    <HomeScreenNavStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ animation: "slide_from_right", headerShown: false }}
    >
      <HomeScreenNavStack.Screen component={HomeScreen} name="HomeScreen" />
      <HomeScreenNavStack.Screen
        component={ItemQueueScreen}
        name="ItemQueueScreen"
      />
      <HomeScreenNavStack.Screen
        component={NewCatalogItemScreen}
        name="NewCatalogItemScreen"
      />
    </HomeScreenNavStack.Navigator>
  );
};
