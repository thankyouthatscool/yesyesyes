import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { AppRoot } from "@components/AppRoot";

export const App = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <AppRoot />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
