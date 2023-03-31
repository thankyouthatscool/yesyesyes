import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { AppRoot } from "@components/AppRoot";
import { NavTheme } from "@theme";

export const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer theme={NavTheme}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <AppRoot />
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
