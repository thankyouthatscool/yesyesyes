import { FC, PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export const AppRootWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaView style={{ borderWidth: 2, flex: 1 }}>{children}</SafeAreaView>
  );
};
