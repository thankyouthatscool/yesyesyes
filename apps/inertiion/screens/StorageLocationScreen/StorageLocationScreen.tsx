import * as Crypto from "expo-crypto";
import _flattendeep from "lodash.flattendeep";
import _debounce from "lodash.debounce";
import { FC, useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, ToastAndroid, View } from "react-native";
import { Card, IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setAllLocationData, setStorageLocationData } from "@store";
import { StorageLocationScreenProps } from "@types";
import { defaultAppPadding } from "@theme";

interface ItemLookupSearchResult {
  code: string;
  color: string;
  description?: string;
  id: string;
  location: string;
  size?: string;
}

export const StorageLocationScreen: FC<StorageLocationScreenProps> = ({
  navigation,
  route: {
    params: { locationName },
  },
}) => {
  const dispatch = useAppDispatch();

  const { databaseInstance: db, locationData } = useAppSelector(({ app }) => ({
    ...app,
  }));

  const [isItemLookup, setIsItemLookup] = useState<boolean>(false);
  const [isSomethingLoading, setIsSomethingLoading] = useState<boolean>(false);
  const [isUpdateNeeded, setIsUpdateNeeded] = useState<boolean>(false);

  const [itemLookupSearchResult, setItemLookupSearchResult] = useState<
    ItemLookupSearchResult[]
  >([]);
  const [itemLookupSearchTerm, setItemLookupSearchTerm] = useState<string>("");

  const handleLoadLocationData = useCallback(() => {
    setIsSomethingLoading(() => true);

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
            dispatch(setStorageLocationData(_array));
          }
        );
      },
      (err) => console.log(err)
    );

    setIsSomethingLoading(() => false);
  }, [locationName]);

  const handleItemLookup = useCallback(
    _debounce((itemLookupSearchTerm: string) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `
            SELECT *
            FROM items
            WHERE code LIKE ?
            OR description LIKE ?
            OR location LIKE ?
          `,
            [
              `%${itemLookupSearchTerm}%`,
              `%${itemLookupSearchTerm}%`,
              `%${itemLookupSearchTerm}%`,
            ],
            (_, { rows: { _array } }) => {
              setItemLookupSearchResult(() => _array);
            }
          );
        },
        (err) => console.log(err)
      );
    }, 500),
    []
  );

  useEffect(() => {
    if (!!locationName) {
      handleLoadLocationData();
    }
  }, [locationName]);

  useEffect(() => {
    if (itemLookupSearchTerm.length > 2) {
      handleItemLookup(itemLookupSearchTerm);
    }
  }, [itemLookupSearchTerm]);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            padding: defaultAppPadding,
            paddingBottom: defaultAppPadding / 2,
          }}
          variant="headlineLarge"
        >
          {locationName}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {!!isUpdateNeeded && (
            <IconButton
              icon="content-save"
              mode="contained"
              onPress={() => {
                db.transaction(
                  (tx) => {
                    locationData.forEach(
                      ({
                        dateModified,
                        itemId,
                        cartons,
                        pieces,
                        storageId,
                        storageLocation,
                      }) => {
                        tx.executeSql(
                          `
                          INSERT INTO storage (storageId, storageLocation, itemId, cartons, pieces, dateModified)
                          VALUES (?, ?, ?, ?, ?, ?)
                          ON CONFLICT (storageId) DO UPDATE SET
                            cartons = excluded.cartons,
                            pieces = excluded.pieces`,
                          [
                            storageId,
                            storageLocation,
                            itemId,
                            cartons,
                            pieces,
                            dateModified,
                          ]
                        );
                      }
                    );

                    tx.executeSql(
                      `
                      SELECT *
                      FROM storage
                      INNER JOIN items
                      ON items.id = storage.itemId
                    `,
                      [],
                      (_, { rows: { _array } }) => {
                        dispatch(setAllLocationData(_array));

                        ToastAndroid.show(
                          `Location ${locationName} updated.`,
                          ToastAndroid.SHORT
                        );
                      }
                    );
                  },
                  (err) => console.log(err)
                );

                setIsUpdateNeeded(() => false);
              }}
            />
          )}
          <IconButton
            icon={isItemLookup ? "cancel" : "plus"}
            mode="contained"
            onPress={() => {
              setIsItemLookup((isItemLookup) => !isItemLookup);
              setItemLookupSearchTerm(() => "");
              setItemLookupSearchResult(() => []);
            }}
          />
        </View>
      </View>
      {!!isItemLookup && (
        <TextInput
          label="Item Lookup"
          mode="outlined"
          onChangeText={(newItemLookupSearchTerm) => {
            setItemLookupSearchTerm(() => newItemLookupSearchTerm);
          }}
          style={{
            marginHorizontal: defaultAppPadding,
            marginVertical: defaultAppPadding / 2,
          }}
          value={itemLookupSearchTerm}
        />
      )}
      <View style={{ flex: 1 }}>
        {itemLookupSearchTerm.length > 2 &&
          !!itemLookupSearchResult.length &&
          itemLookupSearchResult.map((item) => (
            <Card
              key={item.id}
              onPress={() => {
                dispatch(
                  setStorageLocationData([
                    {
                      code: item.code,
                      color: item.color,
                      size: item.size,
                      itemId: item.id,
                      cartons: 0,
                      pieces: 0,
                      dateModified: Date.now().toString(),
                      description: item.description,
                      location: item.location,
                      storageId: Crypto.randomUUID(),
                      storageLocation: locationName,
                    },
                    ...locationData,
                  ])
                );

                setIsItemLookup(() => false);
                setItemLookupSearchResult(() => []);
                setItemLookupSearchTerm(() => "");
                setIsUpdateNeeded(() => true);
              }}
              style={{
                marginHorizontal: defaultAppPadding,
                marginVertical: defaultAppPadding / 2,
              }}
            >
              <Card.Content style={{ flexDirection: "row" }}>
                <Text>{item.code}</Text>
                {!!item.color.length && (
                  <View style={{ flexDirection: "row" }}>
                    <Text>{" | "}</Text>
                    <Text>{item.color}</Text>
                  </View>
                )}
                {!!item.size?.length && (
                  <View style={{ flexDirection: "row" }}>
                    <Text>{" | "}</Text>
                    <Text>{item.size}</Text>
                  </View>
                )}
                <View style={{ flexDirection: "row" }}>
                  <Text>{" | "}</Text>
                  <Text key={item.id}>{item.location}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        <FlatList
          data={locationData}
          keyExtractor={(item) => item.itemId}
          // onRefresh={() => {
          //   db.transaction(
          //     (tx) => {
          //       tx.executeSql(
          //         `
          //         SELECT *
          //         FROM storage
          //         INNER JOIN items
          //         ON items.id = storage.itemId
          //         WHERE storage.storageLocation = ?
          //       `,
          //         [locationName],
          //         (_, { rows: { _array } }) => {
          //           dispatch(setStorageLocationData(_array));
          //         }
          //       );
          //     },
          //     (err) => console.log(err)
          //   );
          // }}
          onRefresh={handleLoadLocationData}
          refreshing={isSomethingLoading}
          renderItem={({ item, index: idx }) => (
            <Card
              key={item.itemId}
              style={{
                marginHorizontal: defaultAppPadding,
                marginVertical: defaultAppPadding / 2,
              }}
            >
              <Card.Content>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <TextInput
                    disabled
                    label="Item Code"
                    mode="outlined"
                    style={{ flex: 1 }}
                    value={item.code}
                  />
                  <IconButton
                    icon="arrow-right"
                    mode="contained"
                    onPress={() => {
                      navigation.navigate("CatalogItemScreen", {
                        itemId: item.itemId,
                      });
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    disabled
                    label="Item Color"
                    mode="outlined"
                    style={{ flex: 2, marginRight: defaultAppPadding / 2 }}
                    value={item.color}
                  />
                  <TextInput
                    disabled
                    label="Item Size"
                    mode="outlined"
                    style={{ flex: 1, marginLeft: defaultAppPadding / 2 }}
                    value={item.size}
                  />
                </View>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <TextInput
                    keyboardType="numeric"
                    label="Carton(s)"
                    mode="outlined"
                    onChangeText={(newCartonCount) => {
                      setIsUpdateNeeded(() => true);

                      dispatch(
                        setStorageLocationData([
                          ...locationData.slice(0, idx),
                          {
                            ...locationData[idx],
                            cartons: parseInt(newCartonCount) || 0,
                          },
                          ...locationData.slice(idx + 1),
                        ])
                      );
                    }}
                    style={{ flex: 1, marginRight: defaultAppPadding / 2 }}
                    value={item.cartons.toString()}
                  />
                  <TextInput
                    keyboardType="numeric"
                    label="Pieces"
                    mode="outlined"
                    onChangeText={(newPiecesCount) => {
                      setIsUpdateNeeded(() => true);

                      dispatch(
                        setStorageLocationData([
                          ...locationData.slice(0, idx),
                          {
                            ...locationData[idx],
                            pieces: parseInt(newPiecesCount) || 0,
                          },
                          ...locationData.slice(idx + 1),
                        ])
                      );
                    }}
                    style={{ flex: 1, marginLeft: defaultAppPadding / 2 }}
                    value={item.pieces.toString()}
                  />
                  <IconButton iconColor="red" icon="delete" mode="contained" />
                </View>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
