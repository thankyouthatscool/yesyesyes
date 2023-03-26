import { FC, PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";

export const HomeScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={{ borderWidth: 2, borderColor: "red", flex: 1 }}>
      {children}
    </View>
  );
};

export const HomeScreenScrollWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ScrollView
      contentContainerStyle={{ flexDirection: "row" }}
      style={{ borderWidth: 2 }}
    >
      {children}
    </ScrollView>
  );
};

export const HomeScreenColumnWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  return <View style={{ borderWidth: 2, flex: 1 }}>{children}</View>;
};
