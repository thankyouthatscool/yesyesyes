import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";

import { AppRoot } from "@components/AppRoot";
import { store } from "@store";

SplashScreen.preventAutoHideAsync();

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: "#fff",
          },
        }}
      >
        <SafeAreaProvider>
          <PaperProvider>
            <View style={styles.container}>
              <AppRoot />
              <StatusBar style="auto" />
            </View>
          </PaperProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
