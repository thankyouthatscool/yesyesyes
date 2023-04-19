import { FC, useCallback, useEffect, useState } from "react";
import { BackHandler, ScrollView, View } from "react-native";
import { Card, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { clearStorageSearchTerm, setStorageSearchTerm } from "@store";
import { defaultAppPadding } from "@theme";
import {
  StorageCardComponentNavProps,
  StorageLocationData,
  StorageScreenProps,
} from "@types";

export const StorageScreen: FC<StorageScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { databaseInstance: db, storageSearchTerm } = useAppSelector(
    ({ app }) => ({ ...app })
  );

  const [distinctLocations, setDistinctLocations] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);

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
        elevation={isFocus ? 3 : 0}
        placeholder="Search Storage"
        onBlur={() => {
          setIsFocus(() => false);
        }}
        onClearIconPress={() => {
          dispatch(clearStorageSearchTerm());
        }}
        onChangeText={(newStorageSearchTerm) => {
          dispatch(setStorageSearchTerm(newStorageSearchTerm));
        }}
        onFocus={() => {
          setIsFocus(() => true);
        }}
        style={{
          margin: defaultAppPadding,
          marginBottom: defaultAppPadding / 2,
        }}
        value={storageSearchTerm}
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

export const StorageCardComponent: FC<{
  location: string;
  nav: StorageCardComponentNavProps;
}> = ({ location, nav }) => {
  const { databaseInstance: db, storageSearchTerm } = useAppSelector(
    ({ app }) => ({ ...app })
  );

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
    // TODO: Redo these cards, maybe have two columns.
    // FIXME: ^^Same as the above, just wanted to have some fun with the colors.
    // TODO: Also a good chance that will need to convert to a flat-list for better performance at some stage.
    <Card
      onPress={() => {
        nav.navigate("StorageLocationScreen", {
          locationName: location,
        });
      }}
      style={{
        display: locationData.some((loc) =>
          `${loc.code} ${loc.description} ${loc.color} ${loc.location}`
            .trim()
            .toLowerCase()
            .includes(storageSearchTerm.trim().toLowerCase())
        )
          ? "flex"
          : "none",
        marginHorizontal: defaultAppPadding,
        marginVertical: defaultAppPadding / 2,
      }}
    >
      <Card.Title title={location} titleVariant="titleLarge" />
      <Card.Content>
        {locationData.map((loc, idx) => {
          return (
            <View
              key={`${location} - ${loc.id} - ${loc.itemId}`}
              style={{ marginTop: !idx ? 0 : defaultAppPadding }}
            >
              <Text variant="titleSmall">
                {loc.code}
                {!!loc.color ? <Text> - {loc.color}</Text> : ""}
                {!!loc.size ? ` - ${loc.size}` : ""} - {loc.location}
              </Text>
              <Text>
                Cartons:{" "}
                <Text style={{ fontWeight: "700" }}>{loc.cartons}</Text>
              </Text>
              <Text>
                Pieces: <Text style={{ fontWeight: "700" }}>{loc.pieces}</Text>
              </Text>
            </View>
          );
        })}
      </Card.Content>
    </Card>
  );
};
