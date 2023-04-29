import { FC, useCallback, useEffect, useState } from "react";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { defaultAppPadding } from "@theme";
import { ScrollView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const UserScreen = () => {
  const { isSignedIn, signOut } = useAuth();
  const { isLoaded, setSession, signIn } = useSignIn();

  const [userData, setUserData] = useState<{
    username: string;
    password: string;
  }>({
    username: "o.zahnitko@gmail.com",
    password: "j4i6NeXKt6PZM6",
  });

  const handleSignIn = useCallback(async () => {
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
  }, [userData]);

  useEffect(() => {
    console.log(isSignedIn);
    console.log(isLoaded);
  }, [isLoaded, isSignedIn]);

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
              disabled={!userData.username || !userData.password}
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
