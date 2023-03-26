import { FC, PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";

export const HomeScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <View style={{ flex: 1 }}>{children}</View>;
};

export const HomeScreenScrollWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
      }}
    >
      {children}
    </ScrollView>
  );
};

export const HomeScreenColumnWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  return <View style={{ flex: 1, marginTop: 8 }}>{children}</View>;
};
