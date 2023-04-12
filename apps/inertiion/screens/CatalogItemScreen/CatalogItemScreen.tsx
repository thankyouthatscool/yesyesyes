import * as Crypto from "expo-crypto";
import { FC, useCallback, useEffect, useState } from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setSearchResult, setSearchTerm } from "@store";
import { defaultAppPadding } from "@theme";
import {
  CatalogItemScreenNavProps,
  NewCatalogItemInput as CatalogItemInput,
} from "@types";

interface CatalogItemInputWithId extends CatalogItemInput {
  id: string;
}

export const CatalogItemScreen: FC<CatalogItemScreenNavProps> = ({
  navigation,
  route: {
    params: { itemId },
  },
}) => {
  const dispatch = useAppDispatch();

  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [isUpdateNeeded, setIsUpdateNeeded] = useState<boolean>(false);
  const [itemData, setItemData] = useState<CatalogItemInputWithId | null>(null);

  const handleGetItemData = useCallback(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM items WHERE id = ?",
          [itemId],
          (_, { rows: { _array } }) => {
            const itemData: CatalogItemInputWithId = _array[0];

            setItemData(() => itemData);
          }
        );
      },
      (err) => console.log(err)
    );
  }, []);

  const handleUpdateItemData = useCallback(() => {
    if (!!itemData) {
      const { code, id, location, color, description, size } = itemData;

      db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE items SET code = ?, color = ?, size = ?, description = ?, location = ? WHERE id = ?`,
            [
              code,
              color || null,
              size || null,
              description || null,
              location,
              id,
            ],
            () => {
              setIsUpdateNeeded(() => false);

              dispatch(setSearchResult([]));
              dispatch(setSearchTerm(""));

              ToastAndroid.show(
                `${itemData.code} updated successfully!`,
                ToastAndroid.LONG
              );

              navigation.goBack();
            }
          );
        },
        (err) => console.log(err)
      );
    }
  }, [itemData]);

  useEffect(() => {
    handleGetItemData();
  }, []);

  return (
    <SafeAreaView style={{ padding: defaultAppPadding, paddingTop: 0 }}>
      {!!itemData && (
        <ScrollView>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: defaultAppPadding,
            }}
          >
            <Button
              icon="arrow-left"
              mode="contained-tonal"
              onPress={() => {
                navigation.goBack();
              }}
            >
              Go Back
            </Button>
            <IconButton
              disabled={!isUpdateNeeded}
              icon="content-save"
              mode="contained"
              onPress={() => {
                handleUpdateItemData();
              }}
              size={30}
            />
          </View>
          <Text variant="headlineSmall">Item Information</Text>
          <TextInput
            label="Code"
            mode="outlined"
            onChangeText={(newCode) => {
              setIsUpdateNeeded(() => true);

              setItemData((itemData) => ({ ...itemData!, code: newCode }));
            }}
            value={itemData.code}
          />
          <TextInput
            label="Color(s)"
            mode="outlined"
            onChangeText={(newColor) => {
              setIsUpdateNeeded(() => true);

              setItemData((itemData) => ({ ...itemData!, color: newColor }));
            }}
            value={itemData.color || ""}
          />
          <TextInput
            label="Size(s)"
            mode="outlined"
            onChangeText={(newSize) => {
              setIsUpdateNeeded(() => true);

              setItemData((itemData) => ({ ...itemData!, size: newSize }));
            }}
            value={itemData.size || ""}
          />
          <TextInput
            label="Description"
            mode="outlined"
            multiline
            numberOfLines={4}
            onChangeText={(newDescription) => {
              setIsUpdateNeeded(() => true);

              setItemData((itemData) => ({
                ...itemData!,
                description: newDescription,
              }));
            }}
            value={itemData.description || ""}
          />
          <TextInput
            label="Location"
            mode="outlined"
            onChangeText={(newLocation) => {
              setIsUpdateNeeded(() => true);

              setItemData((itemData) => ({
                ...itemData!,
                location: newLocation,
              }));
            }}
            value={itemData.location}
          />
          <CatalogItemScreenStorageComponent itemId={itemData.id} />
          <Text variant="headlineSmall">Notes</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export const CatalogItemScreenStorageComponent: FC<{ itemId: string }> = ({
  itemId,
}) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [isUpdateNeeded, setIsUpdateNeeded] = useState<boolean>(false);
  const [itemStorageData, setItemStorageData] = useState<
    {
      id: string;
      location: string;
      itemIds: string[];
      cartons: number[];
      pieces: number[];
      dateModified: string;
    }[]
  >([]);

  const handleUpdateItemStorageData = useCallback(() => {
    console.log("handling the update of the storage");

    console.log(itemStorageData);

    const newRows = itemStorageData.filter((item) =>
      item.id.startsWith("new-")
    );

    console.log(newRows);

    console.log(newRows.map((row) => row.location));

    // Step 1:
    // Find whether storage locations already exist with those locations names.

    // Step2:
    // If locations DO NOT EXIST, add the new locations.

    // Step 3:
    // If DO EXIST, add data to the end of the arrays and modify the last modified date.
  }, [itemStorageData]);

  useEffect(() => {
    if (itemId) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM storage WHERE itemIds LIKE ?",
            [`%${itemId}%`],
            (_, { rows: { _array } }) => {
              const dbItemStorageData = _array as {
                id: string;
                location: string;
                itemIds: string;
                cartons: string;
                pieces: string;
                dateModified: string;
              }[];

              setItemStorageData(() =>
                dbItemStorageData.map((item) => ({
                  ...item,
                  itemIds: item.itemIds.split(",").map((id) => id.trim()),
                  cartons: item.cartons
                    .split(",")
                    .map((ctn) => ctn.trim())
                    .map((ctn) => parseInt(ctn)),
                  pieces: item.pieces
                    .split(",")
                    .map((pcs) => pcs.trim())
                    .map((pcs) => parseInt(pcs)),
                }))
              );
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [itemId]);

  return (
    <View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text variant="headlineSmall">Storage</Text>
        <View style={{ flexDirection: "row" }}>
          {!!isUpdateNeeded && (
            <IconButton
              icon="content-save"
              mode="contained"
              onPress={handleUpdateItemStorageData}
              size={20}
            />
          )}
          <IconButton
            icon="plus"
            mode="contained"
            // onPress={() => {
            //   db.transaction(
            //     (tx) => {
            //       tx.executeSql(
            //         "INSERT INTO storage (id, location, itemIds, cartons, pieces, dateModified) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)",
            //         [
            //           Crypto.randomUUID(),
            //           "09-3-2",
            //           `${itemId}, ${Crypto.randomUUID()}, ${Crypto.randomUUID()}`,
            //           "16, 2, 1",
            //           "2400, 300, 150",
            //           new Date().toISOString(),
            //           Crypto.randomUUID(),
            //           "22-3-3",
            //           `${Crypto.randomUUID()}, ${Crypto.randomUUID()}, ${itemId}`,
            //           "20, 2, 1",
            //           "3000, 300, 150",
            //           new Date().toISOString(),
            //         ]
            //       );
            //     },
            //     (err) => console.log(err)
            //   );
            // }}
            onPress={() => {
              setItemStorageData((itemStorageData) => [
                ...itemStorageData,
                {
                  location: "",
                  dateModified: new Date().toISOString(),
                  cartons: [],
                  id: `new-${Crypto.randomUUID()}`,
                  itemIds: [itemId],
                  pieces: [],
                },
              ]);
            }}
            size={20}
          />
        </View>
      </View>
      {itemStorageData.map((loc, idx) => {
        const currentItemIndex = loc.itemIds.indexOf(itemId);

        return (
          <View key={loc.id}>
            <TextInput
              label="Location"
              mode="outlined"
              onChangeText={(newLocation) => {
                setIsUpdateNeeded(() => true);

                setItemStorageData((itemStorageData) => [
                  ...itemStorageData.slice(0, idx),
                  { ...itemStorageData[idx], location: newLocation },
                  ...itemStorageData.slice(idx + 1),
                ]);
              }}
              value={loc.location}
            />
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TextInput
                keyboardType="number-pad"
                label="Cartons"
                mode="outlined"
                onChangeText={(newNumberOfCartons) => {
                  setIsUpdateNeeded(() => true);

                  setItemStorageData((itemStorageData) => [
                    ...itemStorageData.slice(0, idx),
                    {
                      ...itemStorageData[idx],
                      cartons: [
                        ...itemStorageData[idx].cartons.slice(
                          0,
                          currentItemIndex
                        ),
                        parseInt(newNumberOfCartons),
                        ...itemStorageData[idx].cartons.slice(
                          currentItemIndex + 1
                        ),
                      ],
                    },
                    ...itemStorageData.slice(idx + 1),
                  ]);
                }}
                style={{ flex: 1, marginRight: defaultAppPadding / 2 }}
                value={loc.cartons[currentItemIndex]?.toString() || ""}
              />
              <TextInput
                keyboardType="number-pad"
                label="Pieces"
                mode="outlined"
                onChangeText={(newNumberOfPieces) => {
                  setIsUpdateNeeded(() => true);

                  setItemStorageData((itemStorageData) => [
                    ...itemStorageData.slice(0, idx),
                    {
                      ...itemStorageData[idx],
                      pieces: [
                        ...itemStorageData[idx].pieces.slice(
                          0,
                          currentItemIndex
                        ),
                        parseInt(newNumberOfPieces),
                        ...itemStorageData[idx].pieces.slice(
                          currentItemIndex + 1
                        ),
                      ],
                    },
                    ...itemStorageData.slice(idx + 1),
                  ]);
                }}
                style={{ flex: 1, marginLeft: defaultAppPadding / 2 }}
                value={loc.pieces[currentItemIndex]?.toString() || ""}
              />
              <IconButton
                iconColor="red"
                icon="trash-can"
                mode="contained"
                size={20}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};
