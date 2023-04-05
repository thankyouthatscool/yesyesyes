import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Text, TextInput, ToastAndroid, View } from "react-native";
import { Chip, FAB, IconButton, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { SearchResult } from "@components/SearchResult";
import { useAppDispatch, useAppSelector } from "@hooks";
import { clearItemQueue, setSearchTerm } from "@store";
import { defaultAppPadding } from "@theme";
import { AsyncStorageReturnStatus, HomeScreenNavProps } from "@types";
import {
  localStorageGetSearchTerm,
  localStorageSetItemQueue,
  localStorageSetSearchTerm,
} from "@utils";

export const HomeScreen: FC<HomeScreenNavProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { itemQueue, searchTerm } = useAppSelector(({ app }) => ({
    ...app,
  }));

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [lastSearchTerm, setLastSearchTerm] = useState<string | null>(null);

  const searchBarRef = useRef<TextInput>(null);

  const handleLocalStorageSearchTerm = useCallback(async () => {
    const { searchTerm, status } = await localStorageGetSearchTerm();

    if (status === AsyncStorageReturnStatus.OK) {
      setLastSearchTerm(() => searchTerm);
    }
  }, []);

  useEffect(() => {
    if (!!searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [searchBarRef]);

  useEffect(() => {
    handleLocalStorageSearchTerm();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      localStorageSetSearchTerm(searchTerm);

      handleLocalStorageSearchTerm();
    }
  }, [searchTerm]);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          padding: defaultAppPadding,
        }}
      >
        <Searchbar
          autoCapitalize="characters"
          elevation={isFocus ? 3 : 0}
          onBlur={() => setIsFocus(() => false)}
          onChangeText={(newSearchTerm) => {
            dispatch(setSearchTerm(newSearchTerm));
          }}
          onFocus={() => setIsFocus(() => true)}
          placeholder="Search item or location"
          ref={searchBarRef}
          style={{ flex: 1 }}
          value={searchTerm || ""}
        />
        <IconButton
          icon="plus"
          mode="contained"
          onPress={() => {
            navigation.navigate("NewCatalogItemScreen");
          }}
          size={30}
        />
      </View>
      {!searchTerm && (
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: defaultAppPadding,
          }}
        >
          <Chip
            onPress={() => {
              searchBarRef.current?.focus();

              dispatch(setSearchTerm(lastSearchTerm!));
            }}
          >
            {lastSearchTerm?.toUpperCase()}
          </Chip>
        </View>
      )}
      {!!searchTerm && <SearchResult navigation={navigation} />}
      {!!itemQueue.length && (
        <FAB
          icon="pickaxe"
          label={`${itemQueue.length} item(s) in queue`}
          onPress={() => {
            navigation.navigate("ItemQueueScreen");
          }}
          onLongPress={async () => {
            ToastAndroid.show("Item queue cleared!", ToastAndroid.LONG);

            await localStorageSetItemQueue([]);

            dispatch(clearItemQueue());
          }}
          style={{
            position: "absolute",
            bottom: defaultAppPadding * 2,
            right: defaultAppPadding * 2,
          }}
        />
      )}
    </SafeAreaView>
  );
};
