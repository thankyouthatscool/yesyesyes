import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import Constants from "expo-constants";
import flattenDeep from "lodash.flattendeep";
import { useState } from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@hooks";
import { clearItemQueue, clearSearchResult, clearSearchTerm } from "@store";
import { defaultAppPadding } from "@theme";
import { DatabaseItemInputWithId } from "@types";
import {
  sqlStatementCreateItemsTable,
  sqlStatementCreateLogsTable,
  sqlStatementCreateStorageTable,
} from "@utils";
import type { DatabaseStorageItem } from "@utils";

import { SettingsScreenWrapper } from "./Styled";

const ENV = Constants.expoConfig?.extra?.ENV;

const API_URL =
  ENV === "development:win"
    ? "http://192.168.0.5:5000"
    : Constants.expoConfig?.extra?.API_URL!;

export const SettingsScreen = () => {
  const dispatch = useAppDispatch();

  const { isSignedIn } = useAuth();

  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // TODO: Create all tables at the same time.
  // FIXME: Right now the Notes table does not exist.

  return (
    <SettingsScreenWrapper>
      {/* <Card>
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
                  tx.executeSql("DROP TABLE items", [], () => {
                    console.log("Items table dropped");

                    ToastAndroid.show(
                      "Items table dropped!",
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
            onPress={async () => {
              try {
                const {
                  data: { data },
                }: { data: { data: DatabaseItemInputWithId[] } } =
                  await axios.get(`${API_URL}/seedCatalog`, {
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  });

                db.transaction(
                  (tx) => {
                    tx.executeSql(sqlStatementCreateItemsTable);

                    tx.executeSql(
                      `
                        INSERT INTO items (id, code, color, size, description, location) 
                        VALUES ${data
                          .map(() => `(?, ?, ?, ?, ?, ?)`)
                          .join(", ")}`,
                      flattenDeep(data),
                      (_, { rows }) => {
                        console.log(rows);
                      }
                    );
                  },
                  (err) => {
                    console.log(err);
                  }
                );
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
                  tx.executeSql("DROP TABLE storage", [], () => {
                    console.log("Storage Table dropped!");

                    ToastAndroid.show(
                      "Storage Table dropped!",
                      ToastAndroid.SHORT
                    );
                  });
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
            onPress={async () => {
              try {
                const {
                  data: { data: storageData },
                }: { data: { data: DatabaseStorageItem[] } } = await axios.get(
                  `${API_URL}/seedStorage`,
                  {
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  }
                );

                db.transaction(
                  (tx) => {
                    tx.executeSql(sqlStatementCreateStorageTable);

                    tx.executeSql(
                      `
                        INSERT INTO storage (storageId, storageLocation, itemId, cartons, pieces, dateModified)
                        VALUES ${storageData
                          .map(() => `(?, ?, ?, ?, ?, ?)`)
                          .join(", ")}`,
                      flattenDeep(storageData),
                      (_, { rows }) => {
                        console.log(rows);
                      }
                    );
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              } catch (err) {
                console.error(err);
              }
            }}
            style={{ alignSelf: "flex-start", marginTop: defaultAppPadding }}
          >
            Seed Storage Table{!isSignedIn && " - Need to Sign In!"}
          </Button>
        </Card.Content>
        <Card.Title
          title="Logs"
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
                  tx.executeSql("DROP TABLE logs", [], () => {
                    console.log("Logs table dropped");

                    ToastAndroid.show("Logs table dropped", ToastAndroid.SHORT);
                  });
                },
                (err) => {
                  console.log(err);

                  ToastAndroid.show(err.message, ToastAndroid.SHORT);
                }
              );
            }}
            textColor="white"
            style={{ alignSelf: "flex-start", marginBottom: defaultAppPadding }}
          >
            Drop Logs Table
          </Button>
          <Button
            icon="table"
            mode="contained"
            onPress={() => {
              db.transaction(
                (tx) => {
                  tx.executeSql(sqlStatementCreateLogsTable, [], () => {
                    console.log("Logs table created!");

                    ToastAndroid.show("Logs table created", ToastAndroid.SHORT);
                  });
                },
                (err) => {
                  console.log(err);
                }
              );
            }}
            style={{ alignSelf: "flex-start" }}
          >
            Create Logs Table
          </Button>
          <Button
            onPress={async () => {
              const res = await axios.post(`${API_URL}/auth`, {
                mookie: "yes",
              });
            }}
          >
            Test Auth
          </Button>
        </Card.Content>
      </Card> */}
      <Card>
        <Card.Title
          left={(props) => <Avatar.Icon {...props} icon="database" />}
          subtitle="Drop Tables"
          subtitleStyle={{ color: "red" }}
          subtitleVariant="titleMedium"
          title="Database Management"
          titleVariant="titleLarge"
        />
        <Card.Content>
          <Button
            buttonColor="red"
            icon="delete"
            mode="contained"
            style={{ marginBottom: defaultAppPadding }}
            textColor="white"
          >
            DROP ALL
          </Button>
          <ScrollView horizontal={true}>
            <Button
              buttonColor="red"
              icon="delete"
              mode="contained"
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Catalog
            </Button>
            <Button
              buttonColor="red"
              icon="delete"
              mode="contained"
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Storage
            </Button>
            <Button
              buttonColor="red"
              icon="delete"
              mode="contained"
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Logs
            </Button>
            <Button
              buttonColor="red"
              icon="delete"
              mode="contained"
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Notes
            </Button>
          </ScrollView>
        </Card.Content>
      </Card>
      <Card style={{ marginTop: defaultAppPadding }}>
        <Card.Title
          left={(props) => <Avatar.Icon {...props} icon="database" />}
          subtitle="Seed Tables"
          subtitleStyle={{ color: "green" }}
          subtitleVariant="titleMedium"
          title="Database Management"
          titleVariant="titleLarge"
        />
        <Card.Content>
          <Button
            buttonColor="green"
            icon="seed"
            style={{ marginBottom: defaultAppPadding }}
            textColor="white"
          >
            SEED ALL
          </Button>
          <ScrollView horizontal={true}>
            <Button
              disabled={!isSignedIn}
              icon="seed"
              buttonColor="green"
              mode="contained"
              textColor="white"
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Catalog
            </Button>
            <Button
              disabled={!isSignedIn}
              icon="seed"
              buttonColor="green"
              mode="contained"
              textColor="white"
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Storage
            </Button>
            <Button
              disabled={!isSignedIn}
              icon="seed"
              buttonColor="green"
              mode="contained"
              textColor="white"
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Logs
            </Button>
            <Button
              disabled={!isSignedIn}
              icon="seed"
              buttonColor="green"
              mode="contained"
              textColor="white"
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Notes
            </Button>
          </ScrollView>
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
              } catch (err) {
                console.log(err);

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
