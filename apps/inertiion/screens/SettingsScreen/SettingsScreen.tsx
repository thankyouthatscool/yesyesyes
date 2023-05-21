import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import Constants from "expo-constants";
import flattenDeep from "lodash.flattendeep";
import { useState } from "react";
import { ScrollView, ToastAndroid } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@hooks";
import { defaultAppPadding } from "@theme";
import { DatabaseItemInputWithId } from "@types";
import {
  sqlStatementCreateImagesTable,
  sqlStatementCreateItemsTable,
  sqlStatementCreateLogsTable,
  sqlStatementCreateNotesTable,
  sqlStatementCreateStorageTable,
} from "@utils";
import type { DatabaseStorageItem } from "@utils";

import { SettingsScreenWrapper } from "./Styled";

const ENV = Constants.expoConfig?.extra?.ENV;

const API_URL =
  ENV === "development:win"
    ? "http://192.168.0.8:5000"
    : Constants.expoConfig?.extra?.API_URL!;

export const SettingsScreen = () => {
  const dispatch = useAppDispatch();

  const { isSignedIn, userId } = useAuth();

  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <SettingsScreenWrapper>
      <Card style={{ marginVertical: defaultAppPadding }}>
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
            disabled={!!isLoading}
            icon="delete"
            mode="contained"
            onPress={() => {
              setIsLoading(() => true);

              db.transaction(
                (tx) => {
                  ["images", "storage", "items", "logs", "notes"].forEach(
                    (table) => {
                      tx.executeSql(`DROP TABLE ${table}`, [], () => {
                        ToastAndroid.show(
                          `${table} table dropped!`,
                          ToastAndroid.SHORT
                        );
                      });
                    }
                  );
                },
                (err) => {
                  console.log(err.message);

                  ToastAndroid.show(err.message, ToastAndroid.SHORT);
                }
              );

              setIsLoading(() => false);
            }}
            style={{ marginBottom: defaultAppPadding }}
            textColor="white"
          >
            DROP ALL
          </Button>
          <ScrollView horizontal={true}>
            <Button
              buttonColor="red"
              disabled={!!isLoading}
              icon="delete"
              mode="contained"
              onPress={() => {
                setIsLoading(() => true);

                db.transaction(
                  (tx) => {
                    tx.executeSql("DROP TABLE items", [], () => {
                      ToastAndroid.show(
                        "Catalog table dropped",
                        ToastAndroid.SHORT
                      );
                    });
                  },
                  (err) => {
                    console.log(err.message);

                    ToastAndroid.show(err.message, ToastAndroid.SHORT);
                  }
                );

                setIsLoading(() => false);
              }}
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Catalog
            </Button>
            <Button
              buttonColor="red"
              disabled={isLoading}
              icon="delete"
              mode="contained"
              onPress={() => {
                setIsLoading(() => true);

                db.transaction(
                  (tx) => {
                    tx.executeSql("DROP TABLE storage", [], () => {
                      ToastAndroid.show(
                        "Storage table dropped!",
                        ToastAndroid.SHORT
                      );
                    });
                  },
                  (err) => {
                    console.log(err);

                    ToastAndroid.show(err.message, ToastAndroid.SHORT);
                  }
                );

                setIsLoading(() => false);
              }}
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Storage
            </Button>
            <Button
              buttonColor="red"
              disabled={!!isLoading}
              icon="delete"
              mode="contained"
              onPress={() => {
                setIsLoading(() => true);

                db.transaction(
                  (tx) => {
                    tx.executeSql("DROP TABLE logs", [], () => {
                      ToastAndroid.show(
                        "Logs table dropped!",
                        ToastAndroid.SHORT
                      );
                    });
                  },
                  (err) => {
                    console.log(err.message);

                    ToastAndroid.show(err.message, ToastAndroid.SHORT);
                  }
                );

                setIsLoading(() => false);
              }}
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Logs
            </Button>
            <Button
              buttonColor="red"
              disabled={!!isLoading}
              icon="delete"
              mode="contained"
              onPress={() => {
                setIsLoading(() => true);

                db.transaction(
                  (tx) => {
                    tx.executeSql("DROP TABLE notes", [], () => {
                      ToastAndroid.show(
                        "Notes table dropped!",
                        ToastAndroid.SHORT
                      );
                    });
                  },
                  (err) => {
                    console.log(err.message);

                    ToastAndroid.show(err.message, ToastAndroid.SHORT);
                  }
                );

                setIsLoading(() => false);
              }}
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
      <Card style={{ marginVertical: defaultAppPadding }}>
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
            disabled={!isSignedIn || !!isLoading}
            buttonColor="green"
            icon="seed"
            loading={!!isLoading}
            onPress={async () => {
              setIsLoading(() => true);

              db.transaction(
                (tx) => {
                  [
                    sqlStatementCreateImagesTable,
                    sqlStatementCreateItemsTable,
                    sqlStatementCreateStorageTable,
                    sqlStatementCreateLogsTable,
                    sqlStatementCreateNotesTable,
                  ].forEach((tableCreateStatement) => {
                    tx.executeSql(tableCreateStatement);
                  });
                },
                (err) => {
                  console.log(err.message);

                  ToastAndroid.show(err.message, ToastAndroid.SHORT);
                }
              );

              try {
                const [
                  {
                    data: { data: catalogData },
                  },
                  {
                    data: { data: storageData },
                  },
                ]: { data: { data: any[] } }[] = await Promise.all(
                  ["seedCatalog", "seedStorage"].map(async (route) => {
                    return await axios.get(`${API_URL}/${route}`);
                  })
                );

                db.transaction(
                  (tx) => {
                    tx.executeSql(sqlStatementCreateItemsTable);
                    tx.executeSql(sqlStatementCreateStorageTable);

                    tx.executeSql(
                      `
                        INSERT INTO items (id, code, color, size, description, location) 
                        VALUES ${catalogData
                          .map(() => `(?, ?, ?, ?, ?, ?)`)
                          .join(", ")}`,
                      flattenDeep(catalogData),
                      () => {
                        ToastAndroid.show(
                          "Catalog table created!",
                          ToastAndroid.SHORT
                        );
                      }
                    );

                    tx.executeSql(
                      `
                          INSERT INTO storage (storageId, storageLocation, itemId, cartons, pieces, dateModified)
                          VALUES ${storageData
                            .map(() => `(?, ?, ?, ?, ?, ?)`)
                            .join(", ")}`,
                      flattenDeep(storageData),
                      () => {
                        ToastAndroid.show(
                          "Storage table created!",
                          ToastAndroid.SHORT
                        );
                      }
                    );
                  },
                  (err) => {
                    console.log(err.message);

                    ToastAndroid.show(err.message, ToastAndroid.SHORT);
                  }
                );
              } catch (err) {
                if (err instanceof Error) {
                  console.log(err.message);

                  ToastAndroid.show(err.message, ToastAndroid.SHORT);
                } else {
                  console.log("Something went wrong");

                  ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
                }
              }

              ToastAndroid.show("All tables created!", ToastAndroid.SHORT);

              setIsLoading(() => false);
            }}
            style={{ marginBottom: defaultAppPadding }}
            textColor="white"
          >
            SEED ALL
          </Button>
          <ScrollView horizontal={true}>
            <Button
              disabled={!isSignedIn || !!isLoading}
              icon="seed"
              buttonColor="green"
              loading={!!isLoading}
              mode="contained"
              onPress={async () => {
                setIsLoading(() => true);

                try {
                  const {
                    data: { data: catalogData },
                  }: { data: { data: DatabaseItemInputWithId[] } } =
                    await axios.get(`${API_URL}/seedCatalog`);

                  db.transaction(
                    (tx) => {
                      tx.executeSql(sqlStatementCreateItemsTable);

                      tx.executeSql(
                        `
                          INSERT INTO items (id, code, color, size, description, location) 
                          VALUES ${catalogData
                            .map(() => `(?, ?, ?, ?, ?, ?)`)
                            .join(", ")}`,
                        flattenDeep(catalogData),
                        () => {
                          ToastAndroid.show(
                            "Catalog table created!",
                            ToastAndroid.SHORT
                          );
                        }
                      );
                    },
                    (err) => {
                      console.log(err.message);

                      ToastAndroid.show(err.message, ToastAndroid.SHORT);
                    }
                  );
                } catch (err) {
                  if (err instanceof Error) {
                    console.log(err.message);

                    ToastAndroid.show(err.message, ToastAndroid.SHORT);
                  } else {
                    console.log("Something went wrong!");

                    ToastAndroid.show(
                      "Something went wrong!",
                      ToastAndroid.SHORT
                    );
                  }
                }

                setIsLoading(() => false);
              }}
              textColor="white"
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Catalog
            </Button>
            <Button
              buttonColor="green"
              disabled={!isSignedIn || !!isLoading}
              icon="seed"
              loading={!!isLoading}
              mode="contained"
              onPress={async () => {
                setIsLoading(() => true);

                try {
                  const {
                    data: { data: storageData },
                  }: { data: { data: DatabaseStorageItem[] } } =
                    await axios.get(`${API_URL}/seedStorage`);

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
                        () => {
                          ToastAndroid.show(
                            "Storage table created!",
                            ToastAndroid.SHORT
                          );
                        }
                      );
                    },
                    (err) => {
                      console.log(err.message);

                      ToastAndroid.show(err.message, ToastAndroid.SHORT);
                    }
                  );
                } catch (err) {
                  if (err instanceof Error) {
                    console.log(err);

                    ToastAndroid.show(err.message, ToastAndroid.SHORT);
                  } else {
                    console.log("Something went wrong.");

                    ToastAndroid.show(
                      "Something went wrong.",
                      ToastAndroid.SHORT
                    );
                  }
                }

                setIsLoading(() => false);
              }}
              textColor="white"
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Storage
            </Button>
            <Button
              buttonColor="green"
              disabled={!isSignedIn || !!isLoading}
              icon="seed"
              loading={!!isLoading}
              mode="contained"
              onPress={() => {
                db.transaction(
                  (tx) => {
                    tx.executeSql(sqlStatementCreateLogsTable, [], () => {
                      ToastAndroid.show(
                        "Logs table created.",
                        ToastAndroid.SHORT
                      );
                    });
                  },
                  (err) => {
                    console.log(err);

                    ToastAndroid.show(err.message, ToastAndroid.SHORT);
                  }
                );
              }}
              textColor="white"
              style={{
                alignSelf: "flex-start",
                marginRight: defaultAppPadding,
              }}
            >
              Logs
            </Button>
            <Button
              buttonColor="green"
              disabled={!isSignedIn || !!isLoading}
              icon="seed"
              loading={isLoading}
              mode="contained"
              onPress={() => {
                setIsLoading(() => true);

                db.transaction(
                  (tx) => {
                    tx.executeSql(sqlStatementCreateNotesTable, [], () => {
                      ToastAndroid.show(
                        "Notes table created!",
                        ToastAndroid.SHORT
                      );
                    });
                  },
                  (err) => {
                    console.log(err);

                    ToastAndroid.show(err.message, ToastAndroid.SHORT);
                  }
                );

                setIsLoading(() => false);
              }}
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
      <Card style={{ marginVertical: defaultAppPadding }}>
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
      <Card style={{ marginVertical: defaultAppPadding }}>
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
                      try {
                        const { status } = await fetch(
                          `${API_URL}/backupCatalog`,
                          {
                            body: JSON.stringify({
                              data: _array,
                              user: userId,
                            }),
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
            Backup Catalog Data{!isSignedIn && " - Need to Sign In!"}
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
                            body: JSON.stringify({
                              data: _array,
                              user: userId,
                            }),
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
            Backup Storage Data{!isSignedIn && " - Need to Sign In!"}
          </Button>
        </Card.Content>
      </Card>
    </SettingsScreenWrapper>
  );
};
