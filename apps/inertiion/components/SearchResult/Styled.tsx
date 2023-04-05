import { FC, PropsWithChildren } from "react";
import { ScrollView } from "react-native";

import { defaultAppPadding } from "@theme";

export const SearchResultWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: defaultAppPadding,
        paddingBottom: defaultAppPadding,
      }}
      showsVerticalScrollIndicator={true}
    >
      {children}
    </ScrollView>
  );
};
