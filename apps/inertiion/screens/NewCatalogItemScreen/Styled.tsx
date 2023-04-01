import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

export const ButtonWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
      {children}
    </View>
  );
};
