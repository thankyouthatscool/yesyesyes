import * as Crypto from "expo-crypto";
import { FC, useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Card, IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@hooks";
import type { NewStorageLocationScreenNavProps } from "@types";
import { defaultAppPadding } from "@theme";

interface ItemLookupSearchResult {
  code: string;
  color: string;
  description?: string;
  id: string;
  location: string;
  size?: string;
  cartons: number;
  pieces: number;
}

export const NewStorageLocationScreen: FC<NewStorageLocationScreenNavProps> = ({
  navigation: { goBack, navigate },
}) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [isUpdateNeeded, setIsUpdateNeeded] = useState<boolean>(false);
  const [itemLookupSearchResult, setItemLookupSearchResult] = useState<
    ItemLookupSearchResult[]
  >([]);
  const [itemLookupSearchTerm, setItemLookupSearchTerm] = useState<string>("");
  const [locationData, setLocationData] = useState<ItemLookupSearchResult[]>(
    []
  );
  const [newLocationName, setNewLocationName] = useState<string>("");

  const handleLookupItemSearchTerm = useCallback(
    (itemLookupSearchTerm: string) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `
            SELECT *
            FROM items
            WHERE items.code LIKE ?
            OR items.location LIKE ?
          `,
            [`%${itemLookupSearchTerm}%`, `%${itemLookupSearchTerm}%`],
            (_, { rows: { _array } }) => {
              setItemLookupSearchResult(() => _array);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    },
    []
  );

  useEffect(() => {
    if (itemLookupSearchTerm.length > 2) {
      handleLookupItemSearchTerm(itemLookupSearchTerm);
    }
  }, [itemLookupSearchTerm]);

  useEffect(() => {
    if (locationData.length > 0) {
      setIsUpdateNeeded(() => true);
    }
  }, [locationData]);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <IconButton icon="arrow-left" mode="contained" onPress={goBack} />
          <Text variant="titleLarge">New Storage Location</Text>
        </View>
        {!!isUpdateNeeded && (
          <IconButton
            disabled={!locationData.every((ld) => !!ld.cartons && !!ld.pieces)}
            icon="content-save"
            mode="contained"
            onPress={() => {
              db.transaction(
                (tx) => {
                  locationData.forEach(({ cartons, id, pieces }) => {
                    tx.executeSql(
                      `
                        INSERT INTO storage (storageId, storageLocation, itemId, cartons, pieces, dateModified)
                        VALUES (?, ?, ?, ?, ?, ?)
                    `,
                      [
                        Crypto.randomUUID(),
                        newLocationName,
                        id,
                        cartons,
                        pieces,
                        Date.now().toString(),
                      ],
                      (_, { rows: { _array } }) => {
                        navigate("StorageLocationScreen", {
                          locationName: newLocationName,
                        });
                      }
                    );
                  });
                },
                (err) => {
                  console.log(err);
                }
              );
            }}
          />
        )}
      </View>
      <TextInput
        label="Location Name"
        mode="outlined"
        onChangeText={(newLocationName) =>
          setNewLocationName(() => newLocationName)
        }
        placeholder="Enter New Storage Location Name"
        style={{ marginHorizontal: defaultAppPadding }}
      />
      <TextInput
        disabled={!newLocationName.length}
        label="Item Lookup"
        mode="outlined"
        onChangeText={(newItemLookupSearchTerm) =>
          setItemLookupSearchTerm(() => newItemLookupSearchTerm)
        }
        right={
          <TextInput.Icon
            icon="cancel"
            onPress={() => {
              setItemLookupSearchTerm(() => "");

              setItemLookupSearchResult(() => []);
            }}
          />
        }
        style={{
          marginHorizontal: defaultAppPadding,
          marginBottom: defaultAppPadding / 2,
        }}
        value={itemLookupSearchTerm}
      />
      <ScrollView style={{ flex: 1 }}>
        {!!itemLookupSearchResult.length && (
          <Text
            variant="titleLarge"
            style={{
              marginHorizontal: defaultAppPadding,
              marginVertical: defaultAppPadding / 2,
            }}
          >
            Lookup Result
          </Text>
        )}
        {itemLookupSearchTerm.length > 2 &&
          itemLookupSearchResult
            .filter(
              (res) => !locationData.map((loc) => loc.id).includes(res.id)
            )
            .map((res) => (
              <Card
                key={res.id}
                onPress={() => {
                  setLocationData((locationData) => [res, ...locationData]);
                  setItemLookupSearchTerm(() => "");
                  setItemLookupSearchResult(() => []);
                }}
                style={{
                  marginHorizontal: defaultAppPadding,
                  marginVertical: defaultAppPadding / 2,
                }}
              >
                <Card.Content>
                  <Text>{res.code}</Text>
                  <Text>{res.color}</Text>
                  <Text>{res.size}</Text>
                </Card.Content>
              </Card>
            ))}
        {!!locationData.length && (
          <Text
            variant="titleLarge"
            style={{
              marginHorizontal: defaultAppPadding,
              marginVertical: defaultAppPadding / 2,
            }}
          >
            Storage Content
          </Text>
        )}
        {locationData.map((ld, idx) => (
          <Card
            key={ld.id}
            style={{
              marginHorizontal: defaultAppPadding,
              marginVertical: defaultAppPadding / 2,
            }}
          >
            <Card.Content>
              <View style={{ flexDirection: "row" }}>
                <Text variant="titleMedium">{ld.code}</Text>
                {!!ld.color && (
                  <View style={{ flexDirection: "row" }}>
                    <Text variant="titleMedium"> | </Text>
                    <Text style={{ fontWeight: "700" }} variant="titleMedium">
                      {ld.color}
                    </Text>
                  </View>
                )}
                {!!ld.size && (
                  <View style={{ flexDirection: "row" }}>
                    <Text> | </Text>
                    <Text style={{ fontWeight: "700" }} variant="titleMedium">
                      {ld.size}
                    </Text>
                  </View>
                )}
                <View style={{ flexDirection: "row" }}>
                  <Text> | </Text>
                  <Text variant="titleMedium">{ld.location}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  keyboardType="numeric"
                  label="Carton(s)"
                  mode="outlined"
                  onChangeText={(newNumberOfCartons) => {
                    setLocationData((locationData) => [
                      ...locationData.slice(0, idx),
                      {
                        ...locationData[idx],
                        cartons: parseInt(newNumberOfCartons),
                      },
                      ...locationData.slice(idx + 1),
                    ]);
                  }}
                  style={{ flex: 1, marginRight: defaultAppPadding / 2 }}
                  value={locationData[idx].cartons?.toString() || "0"}
                />
                <TextInput
                  keyboardType="numeric"
                  label="Pieces"
                  mode="outlined"
                  onChangeText={(newNumberOfPieces) =>
                    setLocationData((locationData) => [
                      ...locationData.slice(0, idx),
                      {
                        ...locationData[idx],
                        pieces: parseInt(newNumberOfPieces),
                      },
                      ...locationData.slice(idx + 1),
                    ])
                  }
                  style={{ flex: 1, marginLeft: defaultAppPadding / 2 }}
                  value={locationData[idx].pieces?.toString() || "0"}
                />
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
