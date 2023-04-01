import * as Crypto from "expo-crypto";
import * as SQLite from "expo-sqlite";
import { FC, useCallback, useState } from "react";
import { ScrollView, ToastAndroid } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch } from "@hooks";
import { addCatalogItem } from "@store";
import { defaultAppPadding } from "@theme";
import { NewCatalogItemInput, NewCatalogItemScreenNavProps } from "@types";

import { ButtonWrapper } from "./Styled";

export const NewCatalogItemScreen: FC<NewCatalogItemScreenNavProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] =
    useState<boolean>(false);
  const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);
  const [newCatalogItemData, setNewCatalogItemData] =
    useState<NewCatalogItemInput>({
      code: "",
      color: "",
      location: "",
      size: "",
    });

  const handleSaveNewCatalogItem = useCallback(() => {
    setIsDataUpdated(() => false);

    const newCatalogItemId = Crypto.randomUUID();

    const { code, color, location, size } = newCatalogItemData;

    const db = SQLite.openDatabase("catalog.db");

    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO items (id, code, color, size, location) VALUES (?, ?, ?, ?, ?)",
          [
            newCatalogItemId,
            code.toUpperCase(),
            color ? color.toUpperCase() : null,
            size ? size.toUpperCase() : null,
            location.toUpperCase(),
          ]
        );
      },
      (err) => console.log(err),
      () => {
        dispatch(
          addCatalogItem({
            code: code.toUpperCase(),
            color:
              color
                ?.split(",")
                .map((color) => color.trim().toLowerCase())
                .filter((color) => !!color) || [],
            id: newCatalogItemId,
            location: location.toUpperCase(),
            size:
              size
                ?.split(",")
                .map((size) => size.trim().toLowerCase())
                .filter((size) => !!size) || [],
          })
        );

        ToastAndroid.show(
          `Catalog Item ${newCatalogItemData.code} saved!`,
          ToastAndroid.LONG
        );

        navigation.navigate("HomeScreen");
      }
    );
  }, [newCatalogItemData]);

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
          label="Color"
          mode="outlined"
          onChangeText={(newColor) => {
            setIsDataUpdated(() => true);

            setNewCatalogItemData((data) => ({ ...data, color: newColor }));
          }}
          placeholder="Comma Separated"
          value={newCatalogItemData.color}
        />
        <TextInput
          label="Size"
          mode="outlined"
          onChangeText={(newSize) => {
            setIsDataUpdated(() => true);

            setNewCatalogItemData((data) => ({ ...data, size: newSize }));
          }}
          placeholder="Comma Separated"
          value={newCatalogItemData.size}
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