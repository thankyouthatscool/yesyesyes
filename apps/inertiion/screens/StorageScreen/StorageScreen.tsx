import _debounce from "lodash.debounce";
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

  const [allLocationData, setAllLocationData] = useState<StorageLocationData[]>(
    []
  );
  const [distinctLocations, setDistinctLocations] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isLoadingStorageData, setIsLoadingStorageData] =
    useState<boolean>(false);

  const handleLoadStorageData = useCallback(() => {
    setIsLoadingStorageData(() => true);

    db.transaction(
      (tx) => {
        tx.executeSql(
          ` SELECT DISTINCT storageLocation
            FROM storage`,
          [],
          (_, { rows: { _array } }) => {
            setDistinctLocations(() => {
              const distinctStorageLocations = _array.map(
                (loc) => loc.storageLocation
              ) as string[];

              return distinctStorageLocations;
            });
          }
        );
      },
      (err) => console.log(err)
    );
  }, []);

  const handleLoadAllLocationData = useCallback(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `
          SELECT *
          FROM storage
          INNER JOIN items
          WHERE items.id = storage.itemId
          `,
          [],
          (_, { rows: { _array } }) => {
            setAllLocationData(() => _array);

            setIsLoadingStorageData(() => false);
          }
        );
      },
      (err) => console.log(err)
    );
  }, []);

  useEffect(() => {
    handleLoadStorageData();
  }, []);

  useEffect(() => {
    if (!!distinctLocations.length) {
      handleLoadAllLocationData();
    }
  }, [distinctLocations]);

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

      {!isLoadingStorageData && !!distinctLocations.length ? (
        <ScrollView>
          {distinctLocations.map((loc) => (
            <Card
              key={loc}
              onPress={() => {
                navigation.navigate("StorageLocationScreen", {
                  locationName: loc,
                });
              }}
              style={{
                display: allLocationData
                  .filter((ss) => ss.storageLocation === loc)
                  .some((ls) =>
                    `${ls.code} ${ls.location}`
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
              <Card.Title title={loc} titleVariant="titleLarge" />
              <Card.Content>
                {allLocationData
                  .filter((l) => l.storageLocation === loc)
                  .map((ls, idx) => (
                    <View
                      key={ls.id}
                      style={{
                        marginTop: idx !== 0 ? defaultAppPadding : 0,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text>{ls.code}</Text>
                        {!!ls.color && (
                          <View style={{ flexDirection: "row" }}>
                            <Text> | </Text>
                            <Text style={{ fontWeight: "700" }}>
                              {ls.color}
                            </Text>
                          </View>
                        )}
                        {!!ls.size && (
                          <View style={{ flexDirection: "row" }}>
                            <Text> | </Text>
                            <Text style={{ fontWeight: "700" }}>{ls.size}</Text>
                          </View>
                        )}
                        <Text> | </Text>
                        <Text>{ls.location}</Text>
                      </View>
                      {!!ls.description && <Text>{ls.description}</Text>}
                      {/* {!!ls.cartons && <Text>Cartons: {ls.cartons}</Text>} */}
                      {/* {!!ls.pieces && <Text>Pieces: {ls.pieces}</Text>} */}
                      {!!ls.cartons && !!ls.pieces && (
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              color: "green",
                              flex: 1,
                              fontWeight: "700",
                            }}
                          >
                            Cartons: {ls.cartons}
                          </Text>
                          <Text
                            style={{
                              color: "green",
                              flex: 1,
                              fontWeight: "700",
                            }}
                          >
                            Pieces: {ls.pieces}
                          </Text>
                        </View>
                      )}
                    </View>
                  ))}
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      ) : (
        <Text>Loading</Text>
      )}
    </SafeAreaView>
  );
};

const StorageCardComponent: FC<{
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
            WHERE storage.storageLocation = ?`,
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
