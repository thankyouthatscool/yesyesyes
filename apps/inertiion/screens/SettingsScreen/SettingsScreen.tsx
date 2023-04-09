import flattenDeep from "lodash.flattendeep";
import { ToastAndroid, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { useAppSelector } from "@hooks";
import {
  databaseItems,
  sqlStatementCreateItemsTable,
  sqlStatementSeedItemsTable,
} from "@utils";

import { SettingsScreenWrapper } from "./Styled";

export const SettingsScreen = () => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  return (
    <SettingsScreenWrapper>
      <Text>Settings</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          buttonColor="red"
          mode="contained"
          onPress={() => {
            db.transaction((tx) => {
              tx.executeSql(
                "DROP TABLE items",
                [],
                (_, { rows, rowsAffected }) => {
                  console.log(rows);
                  console.log(rowsAffected);

                  ToastAndroid.show(
                    "Local catalog.db dropped",
                    ToastAndroid.LONG
                  );
                }
              );
            });
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
    </SettingsScreenWrapper>
  );
};
