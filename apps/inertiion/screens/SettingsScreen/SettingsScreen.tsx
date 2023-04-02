import * as Crypto from "expo-crypto";
import { ToastAndroid, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { useAppSelector } from "@hooks";

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
                  "INSERT INTO items (id, code, color, size, location, storage) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)",
                  [
                    // Item 1
                    Crypto.randomUUID(),
                    "AH230",
                    "BLACK",
                    null,
                    "21B12",
                    null,
                    // Item 2
                    Crypto.randomUUID(),
                    "AH230",
                    "NAVY",
                    null,
                    "21B11",
                    null,
                    // Item 3
                    Crypto.randomUUID(),
                    "AH317",
                    "MARBLE",
                    null,
                    "21D31",
                    null,
                    // Item 4
                    Crypto.randomUUID(),
                    "AH695",
                    "GREY, BLACK",
                    "S/M",
                    "21M11",
                    null,
                  ],
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
