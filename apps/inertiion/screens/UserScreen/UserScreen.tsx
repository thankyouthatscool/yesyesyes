import { FC, useCallback, useEffect, useState } from "react";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { defaultAppPadding } from "@theme";
import { ScrollView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const UserScreen = () => {
  const { isSignedIn, signOut } = useAuth();
  const { setSession, signIn } = useSignIn();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [userData, setUserData] = useState<{
    username: string;
    password: string;
  }>({
    username: "o.zahnitko@gmail.com",
    password: "j4i6NeXKt6PZM6",
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
          <Button
            disabled={isLoading}
            loading={isLoading}
            mode="contained"
            onPress={() => {
              signOut();
            }}
          >
            Sign Out
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
