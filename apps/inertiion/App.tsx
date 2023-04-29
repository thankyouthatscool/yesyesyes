import { ClerkProvider } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";

import { AppRoot } from "@components/AppRoot";
import { store } from "@store";
import { NavTheme } from "@theme";
import { tokenCache } from "@utils";

export const App = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <ReduxProvider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider>
            <NavigationContainer theme={NavTheme}>
              <View style={styles.container}>
                <StatusBar style="auto" />
                <AppRoot />
              </View>
            </NavigationContainer>
          </PaperProvider>
        </GestureHandlerRootView>
      </ReduxProvider>
    </ClerkProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
