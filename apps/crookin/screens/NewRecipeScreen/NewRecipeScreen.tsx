import * as Crypto from "expo-crypto";
import { FC, useCallback, useEffect, useState } from "react";
import { Modal, ScrollView, ToastAndroid, View } from "react-native";
import {
  IconButton,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";

import { useAppDispatch } from "@hooks";
import { addRecipe, setAvailableTags } from "@store";
import { defaultAppPaddingSize } from "@theme";
import { NewRecipeScreenNavigationProps, RecipeStep } from "@types";
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
    steps: RecipeStep[];
    tags: string;
  }>({
    description: "",
    name: "",
    steps: [{ description: "", id: Crypto.randomUUID(), pictures: [] }],
    tags: "",
  });

  const handleResetNewRecipeData = useCallback(() => {
    setNewRecipeData(() => ({
      description: "",
      name: "",
      steps: [],
      tags: "",
    }));
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
      <Text variant="headlineMedium">New Recipe</Text>
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
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text variant="headlineSmall">Method</Text>
          <IconButton
            disabled={
              !newRecipeData.steps
                .map((step) => step.description)
                .every((step) => !!step.trim().length)
            }
            icon="plus"
            mode="contained"
            onPress={() =>
              setNewRecipeData((data) => ({
                ...data,
                steps: [
                  ...data.steps,
                  { description: "", id: Crypto.randomUUID(), pictures: [] },
                ],
              }))
            }
            size={15}
          />
        </View>
        {newRecipeData.steps.map((step, idx) => (
          <View key={step.id}>
            <TextInput
              label={`Step ${idx + 1}`}
              mode="outlined"
              multiline
              numberOfLines={3}
              onChangeText={(e) =>
                setNewRecipeData((data) => ({
                  ...data,
                  steps: [
                    ...data.steps.slice(0, idx),
                    { description: e, id: step.id, pictures: [] },
                    ...data.steps.slice(idx + 1),
                  ],
                }))
              }
              style={{ flex: 1 }}
              value={newRecipeData.steps[idx].description}
            />
            <View
              style={{
                alignItems: "center",
              }}
            >
              <TextInput
                keyboardType="numeric"
                mode="outlined"
                onChangeText={(e) => {
                  setNewRecipeData((data) => {
                    return {
                      ...data,
                      steps: [
                        ...data.steps.slice(0, idx),
                        {
                          ...data.steps[idx],
                          duration: parseInt(e) || data.steps[idx].duration,
                        },
                        ...data.steps.slice(idx + 1),
                      ],
                    };
                  });
                }}
                placeholder="Duration"
                style={{ width: "100%" }}
                value={newRecipeData.steps[idx].duration?.toString() || ""}
              />
              <SegmentedButtons
                buttons={[
                  { value: "s", label: "s" },
                  { value: "m", label: "m" },
                  { value: "h", label: "h" },
                ]}
                onValueChange={(e) => {
                  const durationType = e as unknown as "s" | "m" | "h";

                  setNewRecipeData((data) => ({
                    ...data,
                    steps: [
                      ...data.steps.slice(0, idx),
                      { ...data.steps[idx], durationUnit: durationType },
                      ...data.steps.slice(idx + 1),
                    ],
                  }));
                }}
                style={{ marginTop: defaultAppPaddingSize - 2 }}
                value={newRecipeData.steps[idx].durationUnit as string}
              />
              <SegmentedButtons
                buttons={[
                  { label: "prep", value: "prep" },
                  {
                    label: "cook",
                    value: "cook",
                  },
                ]}
                style={{ marginTop: defaultAppPaddingSize - 2 }}
                onValueChange={(e) => {
                  const stepType = e as unknown as "prep" | "cook";

                  setNewRecipeData((data) => ({
                    ...data,
                    steps: [
                      ...data.steps.slice(0, idx),
                      { ...data.steps[idx], type: stepType },
                      ...data.steps.slice(idx + 1),
                    ],
                  }));
                }}
                value={newRecipeData.steps[idx].type as string}
              />
            </View>

            <View>
              <Text>Step Pics</Text>
            </View>
          </View>
        ))}
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
          disabled={!newRecipeData.name || !newRecipeData.steps.length}
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
