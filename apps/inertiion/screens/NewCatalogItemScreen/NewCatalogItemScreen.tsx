import * as Crypto from "expo-crypto";
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

    dispatch(
      addCatalogItem({
        ...newCatalogItemData,
        id: Crypto.randomUUID(),
        color:
          newCatalogItemData.color
            ?.split(",")
            .map((color) => color.trim().toLowerCase()) || [],
        size:
          newCatalogItemData.size
            ?.split(",")
            .map((size) => size.trim().toLowerCase()) || [],
      })
    );

    ToastAndroid.show(
      `Catalog Item ${newCatalogItemData.code} saved!`,
      ToastAndroid.LONG
    );

    navigation.navigate("HomeScreen");
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
