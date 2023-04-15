import { FC, PropsWithChildren } from "react";
import { ScrollView } from "react-native";

import { defaultAppPadding } from "@theme";

export const SearchResultWrapper: FC<
  PropsWithChildren & { onScrollCallback: (dir: boolean) => void }
> = ({ children, onScrollCallback }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: defaultAppPadding,
        paddingBottom: defaultAppPadding,
      }}
      onScroll={(e) => {
        onScrollCallback(e.nativeEvent?.velocity?.y! > 0 || false);
      }}
      overScrollMode="never"
      showsVerticalScrollIndicator={true}
    >
      {children}
    </ScrollView>
  );
};
