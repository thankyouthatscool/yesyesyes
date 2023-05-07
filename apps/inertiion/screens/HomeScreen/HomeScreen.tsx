import _debounce from "lodash.debounce";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, TextInput, ToastAndroid, View } from "react-native";
import {
  Chip,
  FAB,
  IconButton,
  Menu,
  Searchbar,
  Text,
} from "react-native-paper";
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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [lastSearchTerms, setLastSearchTerms] = useState<string[] | null>(null);

  const searchBarRef = useRef<TextInput>(null);

  const _handleSetLastSearchTerm = useCallback((searchTerms: string[]) => {
    setLastSearchTerms((lastSearchTerms) =>
      !!lastSearchTerms
        ? Array.from(
            new Set([
              ...searchTerms.map((term) => term.toUpperCase()),
              ...lastSearchTerms!,
            ])
          ).slice(0, 4)
        : Array.from(
            new Set([...searchTerms.map((term) => term.toUpperCase())])
          ).slice(0, 4)
    );
  }, []);

  const handleLocalStorageSearchTerm = useCallback(async () => {
    const { searchTerms, status } = await localStorageGetSearchTerm();

    if (status === AsyncStorageReturnStatus.OK) {
      _handleSetLastSearchTerm(searchTerms!);
    }
  }, [searchTerm]);

  const handleLatestSearchTerms = useCallback(
    _debounce(
      async (searchTerm: string) => {
        await localStorageSetSearchTerm(searchTerm);

        const { searchTerms, status } = await localStorageGetSearchTerm();

        if (status === AsyncStorageReturnStatus.OK) {
          _handleSetLastSearchTerm(searchTerms!);
        }
      },
      1000,
      { leading: false }
    ),
    []
  );

  useEffect(() => {
    handleLocalStorageSearchTerm();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      handleLatestSearchTerms(searchTerm);
    }
  }, [searchTerm]);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Text>YES?</Text>
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
          autoFocus
          elevation={isFocus ? 3 : 0}
          onBlur={() => setIsFocus(() => false)}
          onChangeText={(newSearchTerm) => {
            dispatch(setSearchTerm(newSearchTerm));
          }}
          onFocus={() => setIsFocus(() => true)}
          placeholder="Search item or location"
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
        <Menu
          anchor={
            <IconButton
              icon="dots-vertical"
              mode="contained"
              onPress={() => {
                setIsMenuOpen(() => true);
              }}
            />
          }
          onDismiss={() => {
            setIsMenuOpen(() => false);
          }}
          visible={isMenuOpen}
        >
          <Menu.Item
            leadingIcon="plus"
            onPress={() => {
              setIsMenuOpen(() => false);

              navigation.navigate("NewCatalogItemScreen", {});
            }}
            title="Add New Item"
          />
          <Menu.Item
            leadingIcon="text-box-outline"
            onPress={() => {
              setIsMenuOpen(() => false);

              navigation.navigate("LogsScreen");
            }}
            title="See Logs"
          />
        </Menu>
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
