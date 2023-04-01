import _debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { useAppSelector } from "@hooks";
import { CatalogItem } from "@types";

import { SearchResultWrapper } from "./Styled";

export const SearchResult = () => {
  const { databaseInstance: db, searchTerm } = useAppSelector(({ app }) => ({
    ...app,
  }));

  const [catalogItemsSearchResult, setCatalogItemsSearchResult] = useState<
    CatalogItem[]
  >([]);
  const [locationSearchResults, setLocationSearchResults] = useState<string[]>(
    []
  );

  const searchDatabase = _debounce(
    useCallback((searchTerm: string) => {
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
    }, [])
  );

  useEffect(() => {
    if (searchTerm.length > 2) {
      searchDatabase(searchTerm);
    }
  }, [searchTerm]);

  return (
    <SearchResultWrapper>
      <Text variant="labelLarge">Search Results</Text>
      {!!catalogItemsSearchResult.length && (
        <Text variant="labelMedium">Items</Text>
      )}
      {catalogItemsSearchResult.map((item) => (
        <View key={item.id}>
          <Text>
            {item.code}
            {!!item.color && ` / ${item.color.join(", ")}`}
            {!!item.size && ` / ${item.size.join(", ")}`} / {item.location}
          </Text>
        </View>
      ))}
      {!!locationSearchResults.length && (
        <Text variant="labelMedium">Locations</Text>
      )}
    </SearchResultWrapper>
  );
};
