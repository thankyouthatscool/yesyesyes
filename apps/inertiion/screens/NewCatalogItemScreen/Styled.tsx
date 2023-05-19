import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

import { defaultAppPadding } from "@theme";

export const ButtonWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: defaultAppPadding,
      }}
    >
      {children}
    </View>
  );
};
