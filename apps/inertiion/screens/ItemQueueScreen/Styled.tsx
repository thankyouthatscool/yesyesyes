import { FC, PropsWithChildren } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { defaultAppPadding } from "@theme";

export const ItemQueueScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: defaultAppPadding }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
