import flattenDeep from "lodash.flattendeep";
import { ToastAndroid, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@hooks";
import { clearItemQueue, clearSearchResult, clearSearchTerm } from "@store";
import {
  databaseItems,
  sqlStatementCreateItemsTable,
  sqlStatementCreateStorageTable,
  sqlStatementSeedItemsTable,
} from "@utils";

import { SettingsScreenWrapper } from "./Styled";

export const SettingsScreen = () => {
  const dispatch = useAppDispatch();

  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  return (
    <SettingsScreenWrapper>
      <Text>Settings</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          buttonColor="red"
          mode="contained"
          onPress={() => {
            db.transaction(
              (tx) => {
                tx.executeSql(
                  "DROP TABLE items",
                  [],
                  (_, { rows, rowsAffected }) => {
                    console.log(rows);
                    console.log(rowsAffected);

                    console.log("Items table dropped");

                    ToastAndroid.show(
                      "Items table dropped!",
                      ToastAndroid.LONG
                    );
                  }
                );

                tx.executeSql("DROP TABLE storage", [], (_, { rows }) => {
                  console.log(rows);

                  console.log("Storage table dropped");

                  ToastAndroid.show(
                    "Storage table dropped!",
                    ToastAndroid.LONG
                  );
                });
              },

              (err) => console.log(err)
            );

            dispatch(clearItemQueue());
            dispatch(clearSearchResult());
            dispatch(clearSearchTerm());
          }}
        >
          Drop Database
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            db.transaction(
              (tx) => {
                tx.executeSql(sqlStatementCreateItemsTable);
                tx.executeSql(sqlStatementCreateStorageTable);

                tx.executeSql(
                  sqlStatementSeedItemsTable,
                  flattenDeep(databaseItems),
                  (_, { rows }) => {
                    console.log(rows);
                  }
                );
              },
              (err) => {
                console.log(err);
              }
            );
          }}
        >
          Seed Database
        </Button>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          db.transaction(
            (tx) => {
              tx.executeSql(
                "SELECT * FROM items",
                [],
                (_, { rows: { _array } }) => {
                  console.log(_array);
                }
              );
            },
            (err) => console.log(err)
          );
        }}
      >
        Export
      </Button>
    </SettingsScreenWrapper>
  );
};
