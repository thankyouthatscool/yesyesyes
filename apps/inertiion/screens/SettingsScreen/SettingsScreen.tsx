import flattenDeep from "lodash.flattendeep";
import { ToastAndroid, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { useAppSelector } from "@hooks";
import { databaseItems, sqlStatement } from "@utils";

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
                tx.executeSql(
                  "CREATE TABLE IF NOT EXISTS items (id TEXT UNIQUE NOT NULL PRIMARY KEY, code TEXT NOT NULL, color TEXT, size TEXT, location TEXT NOT NULL, storage TEXT)"
                );

                tx.executeSql(
                  sqlStatement,
                  flattenDeep(databaseItems),
                  (_, { rows, rowsAffected }) => {
                    console.log(rows);
                    console.log(rowsAffected);
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
