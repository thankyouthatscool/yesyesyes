import { FC, useEffect } from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { CatalogItemScreenNavProps } from "@types";
import { defaultAppPadding } from "@theme";

export const CatalogItemScreen: FC<CatalogItemScreenNavProps> = ({
  navigation,
  route: {
    params: { itemId },
  },
}) => {
  useEffect(() => {
    console.log(itemId);
  }, []);

  return (
    <SafeAreaView style={{ padding: defaultAppPadding }}>
      <Text>Catalog Item</Text>
      <Text>{itemId}</Text>
    </SafeAreaView>
  );
};
