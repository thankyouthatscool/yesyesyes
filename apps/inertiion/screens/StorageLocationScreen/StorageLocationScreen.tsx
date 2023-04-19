import { FC, useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@hooks";
import { StorageLocationData, StorageLocationScreenProps } from "@types";
import { defaultAppPadding } from "@theme";

export const StorageLocationScreen: FC<StorageLocationScreenProps> = ({
  navigation,
  route: {
    params: { locationName },
  },
}) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [locationData, setLocationData] = useState<StorageLocationData[]>([]);

  const handleLoadLocationData = useCallback(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `  
            SELECT * 
            FROM storage
            INNER JOIN items
            ON items.id = storage.itemId
            WHERE storage.storageLocation = ?
            `,
          [locationName],
          (_, { rows: { _array } }) => {
            setLocationData(() => _array);
          }
        );
      },
      (err) => console.log(err)
    );
  }, [locationName]);

  useEffect(() => {
    if (!!locationName) {
      handleLoadLocationData();
    }
  }, [locationName]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text
          style={{
            padding: defaultAppPadding,
            paddingBottom: defaultAppPadding / 2,
          }}
          variant="headlineLarge"
        >
          {locationName}
        </Text>
        {locationData.map((item) => (
          <Card
            key={item.itemId}
            onPress={() => {
              navigation.navigate("CatalogItemScreen", { itemId: item.itemId });
            }}
            style={{
              marginHorizontal: defaultAppPadding,
              marginVertical: defaultAppPadding / 2,
            }}
          >
            <Card.Content>
              <Text>{item.code}</Text>
              <Text>{item.description}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
