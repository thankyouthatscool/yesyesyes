import { useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import flattenDeep from "lodash.flattendeep";
import { useState } from "react";
import { ToastAndroid, View } from "react-native";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@hooks";
import { clearItemQueue, clearSearchResult, clearSearchTerm } from "@store";
import {
  databaseItems,
  databaseStorageItems,
  sqlStatementCreateItemsTable,
  sqlStatementCreateStorageTable,
  sqlStatementSeedItemsTable,
  sqlStatementSeedStorageTable,
} from "@utils";

import { SettingsScreenWrapper } from "./Styled";
import { defaultAppPadding } from "@theme";

const API_URL = Constants.expoConfig?.extra?.API_URL!;

export const SettingsScreen = () => {
  const dispatch = useAppDispatch();

  const { isSignedIn } = useAuth();

  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <SettingsScreenWrapper>
      <Card>
        <Card.Title
          left={(props) => <Avatar.Icon {...props} icon="database" />}
          title="Database Management"
          titleVariant="titleLarge"
        />
        <Card.Title
          title="Items Table"
          titleStyle={{ color: "red" }}
          titleVariant="labelLarge"
        />
        <Card.Content>
          <Button
            buttonColor="red"
            icon="delete"
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
            style={{ alignSelf: "flex-start" }}
          >
            Drop Items Table
          </Button>
          <Button
            disabled={!isSignedIn}
            icon="seed"
            mode="contained"
            // onPress={async () => {
            //   db.transaction(
            //     (tx) => {
            //       tx.executeSql(sqlStatementCreateItemsTable);

            //       tx.executeSql(
            //         sqlStatementSeedItemsTable,
            //         flattenDeep(databaseItems),
            //         (_, { rows }) => {
            //           console.log(rows);
            //         }
            //       );
            //     },
            //     (err) => {
            //       console.log(err);
            //     }
            //   );
            // }}

            onPress={async () => {
              try {
                const res = await fetch(`${API_URL}/seedCatalog`, {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  method: "GET",
                });

                console.log(res);
              } catch (err) {
                console.log(err);
              }
            }}
            style={{
              alignSelf: "flex-start",
              marginTop: defaultAppPadding,
            }}
          >
            Seed Items Table{!isSignedIn && " - Need to Sign In!"}
          </Button>
        </Card.Content>
        <Card.Title
          title="Storage Table"
          titleStyle={{ color: "red" }}
          titleVariant="labelLarge"
        />
        <Card.Content>
          <Button
            buttonColor="red"
            icon="delete"
            mode="contained"
            onPress={() => {
              db.transaction(
                (tx) => {
                  tx.executeSql("DROP TABLE storage");
                },
                (err) => {
                  console.log(err);

                  ToastAndroid.show(err.message, ToastAndroid.LONG);
                }
              );
            }}
            style={{ alignSelf: "flex-start" }}
          >
            Drop Storage Table
          </Button>
          <Button
            disabled={!isSignedIn}
            icon="seed"
            mode="contained"
            onPress={() => {
              db.transaction(
                (tx) => {
                  tx.executeSql(sqlStatementCreateStorageTable);

                  tx.executeSql(
                    sqlStatementSeedStorageTable,
                    flattenDeep([databaseStorageItems]),
                    (_, { rows: { _array } }) => {
                      console.log(_array.length);
                    }
                  );
                },
                (err) => {
                  console.log(err);

                  ToastAndroid.show(err.message, ToastAndroid.LONG);
                }
              );
            }}
            style={{ alignSelf: "flex-start", marginTop: defaultAppPadding }}
          >
            Seed Storage Table{!isSignedIn && " - Need to Sign In!"}
          </Button>
        </Card.Content>
      </Card>
      <Card style={{ marginTop: defaultAppPadding }}>
        <Card.Title
          left={(props) => <Avatar.Icon {...props} icon="api" />}
          subtitle="Backend"
          subtitleVariant="labelLarge"
          title="API"
          titleVariant="titleLarge"
        />
        <Card.Content>
          <Button
            icon="connection"
            mode="contained"
            onPress={async () => {
              try {
                const { status } = await fetch(API_URL);

                if (status === 200) {
                  return ToastAndroid.show(`Status OK!`, ToastAndroid.LONG);
                }

                throw new Error();
              } catch {
                ToastAndroid.show(
                  "Could not connect! Please try again later.",
                  ToastAndroid.LONG
                );
              }
            }}
            style={{ alignSelf: "flex-start" }}
          >
            Test Connection
          </Button>
        </Card.Content>
      </Card>
      <Card style={{ marginTop: defaultAppPadding }}>
        <Card.Title
          left={(props) => <Avatar.Icon {...props} icon="cloud-upload" />}
          title="Backup"
          titleVariant="titleLarge"
        />
        <Card.Title title="Backup Catalog Data" titleVariant="labelLarge" />
        <Card.Content>
          <Button
            disabled={isLoading || !isSignedIn}
            icon="cloud-upload"
            loading={isLoading}
            mode="contained"
            onPress={() => {
              setIsLoading(() => true);

              db.transaction(
                (tx) => {
                  tx.executeSql(
                    "SELECT * FROM items",
                    [],
                    async (_, { rows: { _array } }) => {
                      console.log(_array);

                      try {
                        const { status } = await fetch(
                          `${API_URL}/backupCatalog`,
                          {
                            body: JSON.stringify(_array),
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                            method: "POST",
                          }
                        );

                        if (status === 200) {
                          return ToastAndroid.show(
                            "Backup OK!",
                            ToastAndroid.LONG
                          );
                        }

                        throw new Error();
                      } catch (err) {
                        console.log(err);

                        ToastAndroid.show(
                          "Something went wrong",
                          ToastAndroid.LONG
                        );
                      }
                    }
                  );
                },
                (err) => {
                  console.log(err);

                  ToastAndroid.show("Something went wrong.", ToastAndroid.LONG);
                }
              );

              setIsLoading(() => false);
            }}
            style={{ alignSelf: "flex-start" }}
          >
            Upload Catalog Data{!isSignedIn && " - Need to Sign In!"}
          </Button>
        </Card.Content>
        <Card.Title title="Backup Storage Data" titleVariant="labelLarge" />
        <Card.Content>
          <Button
            disabled={isLoading || !isSignedIn}
            icon="cloud-upload"
            mode="contained"
            onPress={() => {
              db.transaction(
                (tx) => {
                  tx.executeSql(
                    `
                    SELECT *
                    FROM storage
                    `,
                    [],
                    async (_, { rows: { _array } }) => {
                      try {
                        const { status } = await fetch(
                          `${API_URL}/backupStorage`,
                          {
                            body: JSON.stringify(_array),
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                            method: "POST",
                          }
                        );

                        if (status === 200) {
                          return ToastAndroid.show("OK", ToastAndroid.LONG);
                        }

                        throw new Error();
                      } catch (err) {
                        console.log(err);
                      }
                    }
                  );
                },
                (err) => {
                  console.log(err);

                  ToastAndroid.show("Something went wrong!", ToastAndroid.LONG);
                }
              );
            }}
            style={{ alignSelf: "flex-start" }}
          >
            Upload Storage Data{!isSignedIn && " - Need to Sign In!"}
          </Button>
        </Card.Content>
      </Card>
    </SettingsScreenWrapper>
  );
};
