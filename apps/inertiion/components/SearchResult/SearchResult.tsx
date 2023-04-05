import _debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { ToastAndroid, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@hooks";
import { addToItemQueue, removeFromItemQueue } from "@store";
import { defaultAppPadding } from "@theme";
import { CatalogItem } from "@types";
import { localStorageSetItemQueue } from "@utils";

import { SearchResultWrapper } from "./Styled";

export const SearchResult = () => {
  const dispatch = useAppDispatch();

  const {
    databaseInstance: db,
    itemQueue,
    searchTerm,
  } = useAppSelector(({ app }) => ({
    ...app,
  }));

  const [searchResult, setSearchResult] = useState<CatalogItem[]>([]);

  const searchDatabase = _debounce(
    useCallback((searchTerm: string) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM items WHERE code LIKE ? OR location LIKE ?",
          [`%${searchTerm}%`, `%${searchTerm}%`],
          (_, { rows: { _array } }) => {
            try {
              const searchResult = _array.map((item) => ({
                ...item,
                color: item.color
                  ?.split(",")
                  .map((color: string) => color.trim()),
                size: item.size?.split(",").map((size: string) => size.trim()),
              })) as unknown as CatalogItem[];

              setSearchResult(() => searchResult);
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
      {searchResult.map((item, idx) => (
        <Card
          key={item.id}
          onPress={() => {
            console.log(`Opening ${item.id}`);
          }}
          onLongPress={async () => {
            if (itemQueue.includes(item.id)) {
              ToastAndroid.show(
                `${item.code} removed from item queue.`,
                ToastAndroid.SHORT
              );

              await localStorageSetItemQueue(
                itemQueue.filter((i) => i !== item.id)
              );

              dispatch(removeFromItemQueue(item.id));
            } else {
              ToastAndroid.show(
                `${item.code} added to item queue.`,
                ToastAndroid.SHORT
              );

              await localStorageSetItemQueue([...itemQueue, item.id]);

              dispatch(addToItemQueue(item.id));
            }
          }}
          style={{
            borderColor: !itemQueue.includes(item.id)
              ? "gainsboro"
              : "dodgerblue",
            borderWidth: 2,
            marginTop: !idx ? 0 : defaultAppPadding,
          }}
        >
          <Card.Content>
            <Text>
              {item.code}
              {!!item.color && ` / ${item.color.join(", ")}`}
              {!!item.size && ` / ${item.size.join(", ")}`} / {item.location}
            </Text>
          </Card.Content>
        </Card>
      ))}
      {searchTerm.length > 2 && !searchResult.length && <Text>No Results</Text>}
    </SearchResultWrapper>
  );
};
