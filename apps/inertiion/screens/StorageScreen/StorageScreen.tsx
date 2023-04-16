import { FC, useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Card, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@hooks";
import { defaultAppPadding } from "@theme";
import { StorageCardComponentNavProps, StorageScreenProps } from "@types";

export const StorageScreen: FC<StorageScreenProps> = ({ navigation }) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [distinctLocations, setDistinctLocations] = useState<string[]>([]);

  const handleLoadStorageData = useCallback(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          ` SELECT DISTINCT location
            FROM storage`,
          [],
          (_, { rows: { _array } }) => {
            setDistinctLocations(() => {
              const distinctStorageLocations = _array.map(
                (loc) => loc.location
              ) as string[];

              return distinctStorageLocations;
            });
          }
        );
      },
      (err) => console.log(err)
    );
  }, []);

  useEffect(() => {
    handleLoadStorageData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search Storage"
        style={{
          margin: defaultAppPadding,
          marginBottom: defaultAppPadding / 2,
        }}
        value=""
      />
      <View style={{ flex: 1 }}>
        <ScrollView>
          {distinctLocations
            .sort((a, b) => a.localeCompare(b))
            .map((loc) => (
              <StorageCardComponent key={loc} location={loc} nav={navigation} />
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

interface StorageLocationData {
  cartons: number;
  code: string;
  color?: string;
  dateModified: string;
  description: string;
  itemId: string;
  pieces: number;
  size?: string;
}

export const StorageCardComponent: FC<{
  location: string;
  nav: StorageCardComponentNavProps;
}> = ({ location, nav }) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [locationData, setLocationData] = useState<StorageLocationData[]>([]);

  const handleGetStorageLocationData = useCallback(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          ` SELECT *
            FROM storage
            INNER JOIN items
            on items.id = storage.itemId
            WHERE storage.location = ?`,
          [location],
          (_, { rows: { _array } }) =>
            setLocationData(() => _array as StorageLocationData[])
        );
      },
      (err) => console.log(err)
    );
  }, [location]);

  useEffect(() => {
    if (!!location) {
      handleGetStorageLocationData();
    }
  }, [location]);

  return (
    <Card
      onPress={() => {
        nav.navigate("StorageLocationScreen", {
          locationName: location,
        });
      }}
      style={{
        marginHorizontal: defaultAppPadding,
        marginVertical: defaultAppPadding / 2,
      }}
    >
      <Card.Title title={location} titleVariant="titleLarge" />
      <Card.Content>
        {locationData.map((loc, idx) => {
          return (
            <View
              key={`${location} -${loc.code}`}
              style={{ marginTop: !idx ? 0 : defaultAppPadding }}
            >
              <Text variant="titleSmall">
                {loc.code}
                {!!loc.color ? <Text> - {loc.color}</Text> : ""}
                {!!loc.size ? ` - ${loc.size}` : ""}{" "}
              </Text>
              <Text>Cartons</Text>
              <Text>Pieces</Text>
            </View>
          );
        })}
      </Card.Content>
    </Card>
  );
};
