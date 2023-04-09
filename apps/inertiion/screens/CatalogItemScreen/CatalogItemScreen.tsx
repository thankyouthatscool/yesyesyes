import { FC, useCallback, useEffect, useState } from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
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
    <SafeAreaView style={{ padding: defaultAppPadding }}>
      {!!itemData && (
        <ScrollView>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: defaultAppPadding,
            }}
          >
            <Button
              mode="contained-tonal"
              onPress={() => {
                navigation.goBack();
              }}
            >
              Back
            </Button>
            <Button
              disabled={!isUpdateNeeded}
              mode="contained"
              onPress={() => {
                handleUpdateItemData();
              }}
              style={{ marginLeft: defaultAppPadding }}
            >
              Update
            </Button>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
