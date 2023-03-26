import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SplashScreen from "expo-splash-screen";
import { FC, useCallback, useEffect, useState } from "react";
import { Modal, ScrollView, ToastAndroid, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";

import { useAppDispatch } from "@hooks";
import { HomeScreen } from "@screens/HomeScreen";
import { setAvailableTags, setRecipes } from "@store";
import {
  NewRecipeScreenNavigationProps,
  RootDrawerNavigationProps,
} from "@types";
import { lsGetRecipes, lsGetTags } from "@utils";

import { AppRootWrapper } from "./Styled";
import { defaultAppPaddingSize } from "@/theme";

const RootDrawer = createDrawerNavigator<RootDrawerNavigationProps>();

export const AppRoot = () => {
  const dispatch = useAppDispatch();

  const handleInitialLoad = useCallback(async () => {
    const { recipes, status } = await lsGetRecipes();
    const { tags } = await lsGetTags();

    ToastAndroid.show(
      status === 200
        ? `${recipes.length} recipes retrieved.`
        : status === 400
        ? "No recipes found."
        : "Something went wrong! Please try again later!",
      ToastAndroid.SHORT
    );

    dispatch(setAvailableTags(tags));
    dispatch(setRecipes(recipes));

    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <AppRootWrapper>
      <RootDrawer.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <RootDrawer.Screen component={HomeScreen} name="Home" />
        <RootDrawer.Screen
          component={NewRecipeScreen}
          name="NewRecipe"
          options={{ drawerItemStyle: { display: "none" } }}
        />
      </RootDrawer.Navigator>
    </AppRootWrapper>
  );
};

const NewRecipeScreen: FC<NewRecipeScreenNavigationProps> = ({
  navigation,
}) => {
  const [isConfirmDiscardModalOpen, setIsConfirmDiscardModalOpen] =
    useState<boolean>(false);
  const [newRecipeData, setNewRecipeData] = useState<{
    name: string;
    description?: string;
  }>({ description: "", name: "" });

  const handleResetNewRecipeData = useCallback(() => {
    setNewRecipeData(() => ({ description: "", name: "" }));
  }, []);

  return (
    <View style={{ height: "100%", padding: defaultAppPaddingSize }}>
      <Text variant="headlineSmall">New Recipe Details</Text>
      <ScrollView>
        <TextInput
          mode="outlined"
          onChangeText={(e) => {
            setNewRecipeData((data) => ({ ...data, name: e }));
          }}
          placeholder="Recipe Name"
          value={newRecipeData.name}
        />
        <TextInput
          mode="outlined"
          multiline
          numberOfLines={4}
          onChangeText={(e) => {
            setNewRecipeData((data) => ({ ...data, description: e }));
          }}
          placeholder="Recipe Description"
          value={newRecipeData.description}
        />
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <IconButton
          mode="outlined"
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
        <IconButton mode="contained" onPress={() => {}} icon="plus" size={30} />
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
            <Text variant="headlineSmall" style={{ color: "purple" }}>
              Discard Data
            </Text>
            <Text variant="bodyMedium">Unsaved data will be discarded.</Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <IconButton
                icon="cancel"
                mode="outlined"
                onPress={() => {
                  setIsConfirmDiscardModalOpen(() => false);
                }}
                size={30}
              />
              <IconButton
                icon="information"
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
