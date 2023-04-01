import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SQLite from "expo-sqlite";
import { useCallback, useEffect } from "react";
import { ToastAndroid } from "react-native";

import { CustomDrawer } from "@components/CustomDrawer";
import { HomeScreenRoot } from "@screens/HomeScreen";
import { RootDrawerNavigationProps } from "@types";

const RootDrawer = createDrawerNavigator<RootDrawerNavigationProps>();

export const AppRoot = () => {
  const handleInitialDatabase = useCallback(async () => {
    const db = SQLite.openDatabase("catalog.db");

    db.transaction(
      (tx) => {
        // tx.executeSql("DROP TABLE items");

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS items (id TEXT UNIQUE NOT NULL PRIMARY KEY, code TEXT NOT NULL, color TEXT, size TEXT, location TEXT NOT NULL)"
        );

        tx.executeSql("SELECT * FROM items", [], (_, { rows: { _array } }) => {
          console.log(_array);
        });
      },
      (err) => {
        console.log(err);

        ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      }
    );
  }, []);

  const handleInitialLoad = useCallback(async () => {
    await handleInitialDatabase();

    // console.log("doing the initial load");

    // console.log("Will need to get the splashy");
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
