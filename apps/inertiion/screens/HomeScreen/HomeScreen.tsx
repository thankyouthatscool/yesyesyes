import * as SQLite from "expo-sqlite";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { IconButton, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setSearchTerm } from "@store";
import { defaultAppPadding } from "@theme";
import { CatalogItem, HomeScreenNavProps } from "@types";

export const HomeScreen: FC<HomeScreenNavProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { searchTerm } = useAppSelector(({ app }) => ({ ...app }));

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const searchBarRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!!searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [searchBarRef]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: defaultAppPadding }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Searchbar
            elevation={isFocus ? 3 : 0}
            onBlur={() => setIsFocus(() => false)}
            onChangeText={(e) => dispatch(setSearchTerm(e))}
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
        {!!searchTerm && <SearchResult />}
      </ScrollView>
    </SafeAreaView>
  );
};

export const SearchResult = () => {
  const { searchTerm } = useAppSelector(({ app }) => ({ ...app }));

  const [catalogItemsSearchResult, setCatalogItemsSearchResult] = useState<
    CatalogItem[]
  >([]);
  const [locationSearchResults, setLocationSearchResults] = useState<string[]>(
    []
  );

  const db = useMemo(() => SQLite.openDatabase("catalog.db"), []);

  const searchDatabase = useCallback((searchTerm: string) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM items WHERE code LIKE ?",
        [`%${searchTerm}%`],
        (_, { rows: { _array } }) => {
          try {
            const searchResult = _array.map((item) => ({
              ...item,
              color: item.color
                ?.split(",")
                .map((color: string) => color.trim()),
              size: item.size?.split(",").map((size: string) => size.trim()),
            })) as unknown as CatalogItem[];

            setCatalogItemsSearchResult(() => searchResult);
          } catch (err) {
            console.log(err);
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    searchDatabase(searchTerm);
  }, [searchTerm]);

  return (
    <View style={{ marginTop: defaultAppPadding }}>
      <Text>Search Results</Text>
      {!!catalogItemsSearchResult.length && <Text>Items</Text>}
      {catalogItemsSearchResult.map((item) => (
        <View key={item.id}>
          <Text>
            {item.code}
            {!!item.color && `/${item.color.join(", ")}`}
            {!!item.size && `/${item.size.join(", ")}`}/{item.location}
          </Text>
        </View>
      ))}
      {!!locationSearchResults.length && <Text>Locations</Text>}
    </View>
  );
};
