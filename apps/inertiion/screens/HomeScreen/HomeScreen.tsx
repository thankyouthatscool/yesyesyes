import _debounce from "lodash.debounce";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { TextInput, ToastAndroid, View } from "react-native";
import { Chip, FAB, IconButton, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { SearchResult } from "@components/SearchResult";
import { useAppDispatch, useAppSelector } from "@hooks";
import { clearItemQueue, setItemQueueChecked, setSearchTerm } from "@store";
import { defaultAppPadding } from "@theme";
import { AsyncStorageReturnStatus, HomeScreenNavProps } from "@types";
import {
  localStorageGetSearchTerm,
  localStorageRemoveSearchTerm,
  localStorageSetCheckedItemQueue,
  localStorageSetItemQueue,
  localStorageSetSearchTerm,
} from "@utils";

export const HomeScreen: FC<HomeScreenNavProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { itemQueue, isFABCollapsed, searchTerm } = useAppSelector(
    ({ app }) => ({
      ...app,
    })
  );

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [lastSearchTerms, setLastSearchTerms] = useState<string[] | null>(null);

  const searchBarRef = useRef<TextInput>(null);

  const _handleSetLastSearchTerm = useCallback(
    _debounce((searchTerms: string[]) => {
      setLastSearchTerms((lastSearchTerms) =>
        !!lastSearchTerms
          ? Array.from(
              new Set([
                ...searchTerms.map((term) => term.toUpperCase()),
                ...lastSearchTerms!,
              ])
            ).slice(0, 5)
          : Array.from(
              new Set([...searchTerms.map((term) => term.toUpperCase())])
            )
      );
    }, 500),
    []
  );

  const handleLocalStorageSearchTerm = useCallback(async () => {
    const { searchTerms, status } = await localStorageGetSearchTerm();

    if (status === AsyncStorageReturnStatus.OK) {
      _handleSetLastSearchTerm(searchTerms!);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!!searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [searchBarRef]);

  useEffect(() => {
    handleLocalStorageSearchTerm();
  }, [searchTerm]);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          padding: defaultAppPadding,
          paddingBottom: defaultAppPadding,
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
          icon="bookshelf"
          mode="contained"
          onPress={() => {
            navigation.navigate("StorageScreen");
          }}
        />
        <IconButton
          icon="plus"
          mode="contained"
          onPress={() => {
            navigation.navigate("NewCatalogItemScreen", {});
          }}
        />
      </View>
      {searchTerm.length < 3 && (
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: defaultAppPadding,
            paddingBottom: defaultAppPadding,
          }}
        >
          {lastSearchTerms?.map((term) => (
            <Chip
              key={term}
              onPress={async () => {
                searchBarRef.current?.focus();

                dispatch(setSearchTerm(term));
              }}
              onLongPress={() => {
                localStorageRemoveSearchTerm(term);

                setLastSearchTerms((lastSearchTerms) => {
                  if (!!lastSearchTerms) {
                    return lastSearchTerms.filter((t) => t !== term);
                  } else {
                    return [];
                  }
                });
              }}
              style={{ marginRight: defaultAppPadding / 2 }}
            >
              {term}
            </Chip>
          ))}
        </View>
      )}
      {!!searchTerm && <SearchResult navigation={navigation} />}
      {!!itemQueue.length && (
        <FAB
          icon="pickaxe"
          {...(isFABCollapsed && {
            label: `${itemQueue.length} item(s) in queue`,
          })}
          onPress={() => {
            navigation.navigate("ItemQueueScreen");
          }}
          onLongPress={async () => {
            ToastAndroid.show("Item queue cleared!", ToastAndroid.LONG);

            await Promise.all(
              [localStorageSetItemQueue, localStorageSetCheckedItemQueue].map(
                async (fun) => await fun([])
              )
            );

            dispatch(clearItemQueue());
            dispatch(setItemQueueChecked([]));
          }}
          style={{
            bottom: defaultAppPadding * 2,
            opacity: isFABCollapsed ? 1 : 0.75,
            position: "absolute",
            right: defaultAppPadding * 2,
          }}
        />
      )}
    </SafeAreaView>
  );
};
