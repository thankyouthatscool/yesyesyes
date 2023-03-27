import * as Crypto from "expo-crypto";
import { FC, useCallback, useState } from "react";
import { Modal, ScrollView, ToastAndroid, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";

import { useAppDispatch } from "@hooks";
import { addRecipe, setAvailableTags } from "@store";
import { defaultAppPaddingSize } from "@theme";
import { NewRecipeScreenNavigationProps } from "@types";
import { lsAddRecipe, lsAddTags } from "@utils";

export const NewRecipeScreen: FC<NewRecipeScreenNavigationProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const [isConfirmDiscardModalOpen, setIsConfirmDiscardModalOpen] =
    useState<boolean>(false);
  const [newRecipeData, setNewRecipeData] = useState<{
    name: string;
    description?: string;
    tags: string;
  }>({ description: "", name: "", tags: "" });

  const handleResetNewRecipeData = useCallback(() => {
    setNewRecipeData(() => ({ description: "", name: "", tags: "" }));
  }, []);

  const handleSaveNewRecipe = useCallback(async () => {
    const uniqueTags = Array.from(
      new Set(
        newRecipeData.tags
          .split(",")
          .map((tag) => tag.trim())
          .map((tag) => tag.toLowerCase())
          .filter((tag) => !!tag)
      )
    );

    const newRecipe = {
      ...newRecipeData,
      id: Crypto.randomUUID() as string,
      reactions: [],
      steps: [],
      tags: uniqueTags,
    };

    if (!!newRecipeData.tags) {
      const { status, tags } = await lsAddTags(newRecipe.tags);

      if (status === 200) {
        dispatch(setAvailableTags(tags));
      }

      const withFullTags = {
        ...newRecipe,
        tags: tags.filter((tag) => newRecipe.tags.includes(tag.name)),
      };

      dispatch(addRecipe(withFullTags));

      const { status: recStatus } = await lsAddRecipe(withFullTags);

      if (recStatus === 200) {
        ToastAndroid.show(
          `Recipe ${newRecipeData.name} saved to device.`,
          ToastAndroid.LONG
        );

        handleResetNewRecipeData();

        navigation.navigate("Home");
      } else {
        ToastAndroid.show(
          `Something went wrong saving the recipe ${newRecipeData.name}!\nPlease try again later!`,
          ToastAndroid.LONG
        );
      }
    }
  }, [newRecipeData]);

  return (
    <View style={{ height: "100%", padding: defaultAppPaddingSize }}>
      <Text variant="headlineSmall">New Recipe</Text>
      <ScrollView>
        <TextInput
          label="Recipe Name"
          mode="outlined"
          onChangeText={(e) => {
            setNewRecipeData((data) => ({ ...data, name: e }));
          }}
          value={newRecipeData.name}
        />
        <TextInput
          label="Recipe Description"
          mode="outlined"
          multiline
          numberOfLines={4}
          onChangeText={(e) => {
            setNewRecipeData((data) => ({ ...data, description: e }));
          }}
          value={newRecipeData.description}
        />
        <TextInput
          label="Recipe Tags"
          mode="outlined"
          onChangeText={(e) => {
            setNewRecipeData((data) => ({
              ...data,
              tags: e,
            }));
          }}
          placeholder="comma separated"
          value={newRecipeData.tags}
        />
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <IconButton
          mode="contained-tonal"
          icon="cancel"
          onPress={() => {
            if (!!newRecipeData.name || !!newRecipeData.description) {
              setIsConfirmDiscardModalOpen(() => true);
            } else {
              handleResetNewRecipeData();

              navigation.navigate("Home");
            }
          }}
          size={30}
        />
        <IconButton
          disabled={!newRecipeData.name}
          mode="contained"
          onPress={handleSaveNewRecipe}
          icon="content-save"
          size={30}
        />
      </View>
      <Modal
        animationType="slide"
        hardwareAccelerated
        transparent
        visible={isConfirmDiscardModalOpen}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              elevation: 10,
              padding: defaultAppPaddingSize,
              width: "90%",
            }}
          >
            <Text variant="headlineSmall">Discard Data</Text>
            <Text variant="bodyMedium">Unsaved data will be discarded.</Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <IconButton
                icon="close"
                mode="contained-tonal"
                onPress={() => {
                  setIsConfirmDiscardModalOpen(() => false);
                }}
                size={30}
              />
              <IconButton
                icon="check"
                mode="contained"
                onPress={() => {
                  setIsConfirmDiscardModalOpen(() => false);

                  handleResetNewRecipeData();

                  navigation.navigate("Home");
                }}
                size={30}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
