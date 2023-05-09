import { useAuth, useSignIn } from "@clerk/clerk-expo";
import axios, { AxiosError } from "axios";
import Constants from "expo-constants";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import { Button, IconButton, Menu, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { defaultAppPadding } from "@theme";
import { useAppSelector } from "@hooks";

const ENV = Constants.expoConfig?.extra?.ENV;

const API_URL =
  ENV === "development:win"
    ? "http://192.168.0.7:5000"
    : Constants.expoConfig?.extra?.API_URL!;

export const UserScreen = () => {
  const { isSignedIn, userId } = useAuth();
  const { setSession, signIn } = useSignIn();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [userData, setUserData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleSignIn = useCallback(async () => {
    setIsLoading(() => true);

    if (!!userData.username && !!userData.password) {
      try {
        const completeSignIn = await signIn?.create({
          identifier: userData.username,
          password: userData.password,
        })!;

        await setSession!(completeSignIn.createdSessionId)!;
      } catch (err) {
        console.log(err);
      }
    }

    setIsLoading(() => false);
  }, [userData]);

  return (
    <SafeAreaView>
      <ScrollView>
        {!isSignedIn ? (
          <View>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              label="Email/Username"
              mode="outlined"
              onChangeText={(userUsername) => {
                setUserData((userData) => ({
                  ...userData,
                  username: userUsername,
                }));
              }}
              placeholder="Email/Username"
              style={{ marginHorizontal: defaultAppPadding }}
              value={userData.username}
            />
            <TextInput
              label="password"
              mode="outlined"
              onChangeText={(userPassword) => {
                setUserData((userData) => ({
                  ...userData,
                  password: userPassword,
                }));
              }}
              placeholder="Password"
              secureTextEntry
              style={{ marginHorizontal: defaultAppPadding }}
              value={userData.password}
            />
            <Button
              disabled={!userData.username || !userData.password || isLoading}
              loading={isLoading}
              mode="contained"
              onPress={handleSignIn}
              style={{
                alignSelf: "flex-end",
                marginVertical: defaultAppPadding,
                marginHorizontal: defaultAppPadding,
              }}
            >
              Sign In
            </Button>
          </View>
        ) : (
          <AdminScreen />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const AdminScreen = () => {
  const { signOut, userId } = useAuth();

  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [backupData, setBackupData] = useState<{
    latestCatalogBackup: string | undefined;
    latestStorageBackup: string | undefined;
    numberOfBackups: {
      catalog: number | undefined;
      storage: number | undefined;
    };
  }>({
    latestCatalogBackup: undefined,
    latestStorageBackup: undefined,
    numberOfBackups: { catalog: undefined, storage: undefined },
  });

  const handleCheckBackups = useCallback(async () => {
    try {
      const {
        data,
      }: {
        data: {
          latestCatalogBackup: string | undefined;
          latestStorageBackup: string | undefined;
          numberOfBackups: { catalog: number; storage: number };
        };
      } = await axios.post(`${API_URL}/checkBackups`, { userId });

      setBackupData(() => data);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.message);

        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      } else {
        console.log("Something went wrong!");

        ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      }
    }
  }, []);

  useEffect(() => {
    setIsLoading(() => false);
  }, []);

  useEffect(() => {
    handleCheckBackups();
  }, []);

  return (
    <View style={{ margin: defaultAppPadding }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text variant="headlineLarge">Admin Screen</Text>
        <Menu
          anchor={
            <IconButton
              icon="dots-vertical"
              mode="contained"
              onPress={() => {
                setIsMenuOpen(() => true);
              }}
            />
          }
          onDismiss={() => {
            setIsMenuOpen(() => false);
          }}
          visible={isMenuOpen}
        >
          <Menu.Item
            leadingIcon="logout"
            onPress={() => {
              setIsMenuOpen(() => false);
              setIsLoading(() => true);

              signOut();
            }}
            title="Sign Out"
          />
        </Menu>
      </View>
      <Text variant="titleLarge">Latest Backups:</Text>
      <Button
        disabled={isLoading}
        icon="delete"
        buttonColor="red"
        loading={isLoading}
        mode="contained"
        onPress={async () => {
          const {
            data,
          }: {
            data: {
              latestCatalogBackup: string | undefined;
              latestStorageBackup: string | undefined;
              numberOfBackups: { catalog: number; storage: number };
            };
          } = await axios.post(`${API_URL}/pruneOldBackups`, { userId });

          setBackupData(() => data);
        }}
        style={{ marginVertical: defaultAppPadding }}
      >
        PRUNE ALL OLD BACKUPS
      </Button>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: defaultAppPadding,
        }}
      >
        <Text>
          <Text variant="titleMedium">
            Catalog: {backupData.numberOfBackups.catalog}
          </Text>{" "}
          {!!backupData.latestCatalogBackup ? (
            `${new Date(
              parseFloat(backupData.latestCatalogBackup)
            ).toLocaleDateString()} @ ${new Date(
              parseFloat(backupData.latestCatalogBackup)
            ).toLocaleTimeString()}`
          ) : (
            <Text style={{ color: "red", fontWeight: "700" }}>NONE</Text>
          )}
        </Text>
        <Button
          disabled={isLoading}
          icon="plus"
          loading={isLoading}
          mode="contained"
          onPress={async () => {
            setIsLoading(() => true);

            db.transaction(
              (tx) => {
                tx.executeSql(
                  "SELECT * FROM items",
                  [],
                  async (_, { rows: { _array } }) => {
                    try {
                      const { status } = await axios.post(
                        `${API_URL}/backupCatalog`,
                        { data: _array, user: userId }
                      );

                      if (status === 200) {
                        handleCheckBackups();
                      } else {
                        throw new Error("Something went wrong!");
                      }
                    } catch (err) {
                      if (err instanceof AxiosError) {
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
        >
          Catalog
        </Button>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>
          <Text variant="titleMedium">
            Storage: {backupData.numberOfBackups.storage}
          </Text>{" "}
          {!!backupData.latestStorageBackup ? (
            `${new Date(
              parseFloat(backupData.latestStorageBackup)
            ).toLocaleDateString()} @ ${new Date(
              parseFloat(backupData.latestStorageBackup)
            ).toLocaleTimeString()}`
          ) : (
            <Text style={{ color: "red", fontWeight: "700" }}>NONE</Text>
          )}
        </Text>
        <Button
          disabled={isLoading}
          icon="plus"
          loading={isLoading}
          mode="contained"
          onPress={async () => {
            setIsLoading(() => true);

            db.transaction(
              (tx) => {
                tx.executeSql(
                  "SELECT * FROM storage",
                  [],
                  async (_, { rows: { _array } }) => {
                    try {
                      const { status } = await axios.post(
                        `${API_URL}/backupStorage`,
                        { data: _array, user: userId }
                      );

                      if (status === 200) {
                        handleCheckBackups();
                      } else {
                        throw new Error("Something went wrong!");
                      }
                    } catch (err) {
                      if (err instanceof AxiosError) {
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
        >
          Storage
        </Button>
      </View>
    </View>
  );
};
