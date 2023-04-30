import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CatalogItemScreen } from "@screens/CatalogItemScreen";
import { ItemQueueScreen } from "@screens/ItemQueueScreen";
import { LogsScreen } from "@screens/LogsScreen";
import { MoveNoteScreen } from "@screens/MoveNoteScreen";
import { NewCatalogItemScreen } from "@screens/NewCatalogItemScreen";
import { NewStorageLocationScreen } from "@screens/NewStorageLocationScreen";
import { RecentStorage } from "@screens/RecentStorage";
import { StorageScreen } from "@screens/StorageScreen";
import { StorageLocationScreen } from "@screens/StorageLocationScreen";
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
      <HomeScreenNavStack.Screen
        component={CatalogItemScreen}
        name="CatalogItemScreen"
      />
      <HomeScreenNavStack.Screen
        component={StorageScreen}
        name="StorageScreen"
      />
      <HomeScreenNavStack.Screen
        component={StorageLocationScreen}
        name="StorageLocationScreen"
      />
      <HomeScreenNavStack.Screen
        component={NewStorageLocationScreen}
        name="NewStorageLocationScreen"
      />
      <HomeScreenNavStack.Screen
        component={MoveNoteScreen}
        name="MoveNoteScreen"
      />
      <HomeScreenNavStack.Screen
        component={RecentStorage}
        name="RecentStorage"
      />
      <HomeScreenNavStack.Screen component={LogsScreen} name="LogsScreen" />
    </HomeScreenNavStack.Navigator>
  );
};
