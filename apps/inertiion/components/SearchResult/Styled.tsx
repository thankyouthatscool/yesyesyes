import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

import { defaultAppPadding } from "@theme";

export const SearchResultWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <View style={{ marginTop: defaultAppPadding }}>{children}</View>;
};
