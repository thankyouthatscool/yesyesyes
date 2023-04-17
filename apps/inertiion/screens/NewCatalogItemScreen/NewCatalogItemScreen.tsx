import * as Crypto from "expo-crypto";
import { FC, useCallback, useState } from "react";
import { ScrollView, ToastAndroid } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setSearchResult } from "@store";
import { defaultAppPadding } from "@theme";
import {
  CatalogItem,
  NewCatalogItemInput,
  NewCatalogItemScreenNavProps,
} from "@types";

import { ButtonWrapper } from "./Styled";

export const NewCatalogItemScreen: FC<NewCatalogItemScreenNavProps> = ({
  navigation,
  route: {
    params: { formData },
  },
}) => {
  const dispatch = useAppDispatch();

  const { databaseInstance: db, searchTerm } = useAppSelector(({ app }) => ({
    ...app,
  }));

  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] =
    useState<boolean>(false);
  const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);
  const [newCatalogItemData, setNewCatalogItemData] =
    useState<NewCatalogItemInput>(
      () => formData || { code: "", color: "", location: "", size: "" }
    );

  const handleSaveNewCatalogItem = useCallback(() => {
    setIsDataUpdated(() => false);

    const newCatalogItemId = Crypto.randomUUID();

    const { code, color, description, location, size } = newCatalogItemData;

    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO items (id, code, color, size, description, location) VALUES (?, ?, ?, ?, ?, ?)",
          [
            newCatalogItemId,
            code.toUpperCase(),
            !!color ? color.toUpperCase() : null,
            !!size ? size.toUpperCase() : null,
            !!description ? description : null,
            location.toUpperCase(),
          ],
          () => {
            ToastAndroid.show(
              `Catalog Item ${newCatalogItemData.code} saved!`,
              ToastAndroid.LONG
            );
          }
        );

        if (!!searchTerm) {
          tx.executeSql(
            "SELECT * FROM items WHERE code LIKE ? OR location LIKE ?",
            [`%${searchTerm}%`, `%${searchTerm}%`],
            (_, { rows: { _array } }) => {
              const searchResult = _array.map((item) => ({
                ...item,
                color: item.color
                  ?.split(",")
                  .map((color: string) => color.trim()),
                size: item.size?.split(",").map((size: string) => size.trim()),
              })) as unknown as CatalogItem[];

              dispatch(setSearchResult(searchResult));
            }
          );
        } else {
          console.log("there was no search term to update the results for");
        }
      },
      (err) => console.log(err),
      () => {
        // dispatch(
        //   addCatalogItem({
        //     code: code.toUpperCase(),
        //     color:
        //       color
        //         ?.split(",")
        //         .map((color) => color.trim().toLowerCase())
        //         .filter((color) => !!color) || [],
        //     id: newCatalogItemId,
        //     location: location.toUpperCase(),
        //     size:
        //       size
        //         ?.split(",")
        //         .map((size) => size.trim().toLowerCase())
        //         .filter((size) => !!size) || [],
        //   })
        // );

        navigation.navigate("HomeScreen");
      }
    );
  }, [newCatalogItemData, searchTerm]);

  const handleResetNewCatalogItemForm = useCallback(() => {
    setIsDataUpdated(() => false);

    setNewCatalogItemData(() => ({
      code: "",
      color: "",
      location: "",
      size: "",
    }));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: defaultAppPadding }}>
        <Text variant="titleLarge">New Catalog Item</Text>
        <TextInput
          label="Code"
          mode="outlined"
          onChangeText={(newCode) => {
            setIsDataUpdated(() => true);

            setNewCatalogItemData((data) => ({ ...data, code: newCode }));
          }}
          value={newCatalogItemData.code}
        />
        <TextInput
          label="Color(s)"
          mode="outlined"
          onChangeText={(newColor) => {
            setIsDataUpdated(() => true);

            setNewCatalogItemData((data) => ({ ...data, color: newColor }));
          }}
          placeholder="Comma Separated"
          value={newCatalogItemData.color}
        />
        <TextInput
          label="Size(s)"
          mode="outlined"
          onChangeText={(newSize) => {
            setIsDataUpdated(() => true);

            setNewCatalogItemData((data) => ({ ...data, size: newSize }));
          }}
          placeholder="Comma Separated"
          value={newCatalogItemData.size}
        />
        <TextInput
          label="Description"
          mode="outlined"
          multiline
          numberOfLines={4}
          onChangeText={(newDescription) => {
            setIsDataUpdated(() => true);

            setNewCatalogItemData((data) => ({
              ...data,
              description: newDescription,
            }));
          }}
        />
        <TextInput
          label="Location"
          mode="outlined"
          onChangeText={(newLocation) => {
            setIsDataUpdated(() => true);

            setNewCatalogItemData((data) => ({
              ...data,
              location: newLocation,
            }));
          }}
          value={newCatalogItemData.location}
        />
        <ButtonWrapper>
          <IconButton
            icon="cancel"
            mode="outlined"
            onPress={() => {
              setIsConfirmCancelModalOpen(() => true);

              handleResetNewCatalogItemForm();

              navigation.goBack();
            }}
            size={30}
          />
          <IconButton
            disabled={!newCatalogItemData.code || !newCatalogItemData.location}
            icon="content-save"
            mode="contained"
            onPress={handleSaveNewCatalogItem}
            size={30}
          />
        </ButtonWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};
