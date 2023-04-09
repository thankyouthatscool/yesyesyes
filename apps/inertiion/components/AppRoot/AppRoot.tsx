import { createDrawerNavigator } from "@react-navigation/drawer";
import { useCallback, useEffect } from "react";
import { ToastAndroid } from "react-native";

import { CustomDrawer } from "@components/CustomDrawer";
import { useAppDispatch, useAppSelector } from "@hooks";
import { HomeScreenRoot } from "@screens/HomeScreen";
import { SettingsScreen } from "@screens/SettingsScreen";
import { setItemQueue } from "@store";
import { AsyncStorageReturnStatus, RootDrawerNavigationProps } from "@types";
import { localStorageGetItemQueue, sqlStatementCreateItemsTable } from "@utils";

const RootDrawer = createDrawerNavigator<RootDrawerNavigationProps>();

export const AppRoot = () => {
  const dispatch = useAppDispatch();

  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const handleInitialDatabase = useCallback(async () => {
    db.transaction(
      (tx) => {
        tx.executeSql(sqlStatementCreateItemsTable, [], () => {
          ToastAndroid.show("Database OK", ToastAndroid.SHORT);
        });

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
      [handleInitialDatabase, handleInitialItemQueue].map((functionName) =>
        functionName()
      )
    );
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
      <RootDrawer.Screen component={SettingsScreen} name="Settings" />
    </RootDrawer.Navigator>
  );
};
