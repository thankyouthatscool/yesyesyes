import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

export const HeaderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <View>{children}</View>;
};
