import Checkbox from "expo-checkbox";
import _debounce from "lodash.debounce";
import { FC, useCallback, useEffect, useState } from "react";
import { ToastAndroid, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@hooks";
import { addToItemQueue, removeFromItemQueue, setSearchResult } from "@store";
import { defaultAppPadding } from "@theme";
import { CatalogItem, HomeScreenNav } from "@types";
import { localStorageSetItemQueue } from "@utils";

import { SearchResultWrapper } from "./Styled";

export const SearchResult: FC<{ navigation: HomeScreenNav }> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const {
    databaseInstance: db,
    itemQueue,
    searchResult,
    searchTerm,
  } = useAppSelector(({ app }) => ({
    ...app,
  }));

  const [haveBeenTouched, setHaveBeenTouched] = useState<string[]>([]);

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

              dispatch(setSearchResult(searchResult));
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

  useEffect(() => {
    if (itemQueue.length > haveBeenTouched.length) {
      setHaveBeenTouched((haveBeenTouched) =>
        Array.from(new Set([...haveBeenTouched, ...itemQueue]))
      );
    }
  }, [itemQueue]);

  return (
    <SearchResultWrapper>
      {searchResult.map((item, idx) => (
        <Card
          delayLongPress={200}
          key={item.id}
          onPress={() => {
            navigation.navigate("CatalogItemScreen", { itemId: item.id });
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

              setHaveBeenTouched((touched) => [...touched, item.id]);

              await localStorageSetItemQueue([...itemQueue, item.id]);

              dispatch(addToItemQueue(item.id));
            }
          }}
          style={{
            marginTop: !idx ? 2 : defaultAppPadding,
          }}
        >
          <Card.Content
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text variant="titleSmall">
              {item.code}
              {!!item.color && ` / ${item.color.join(", ")}`}
              {!!item.size && ` / ${item.size.join(", ")}`} / {item.location}
            </Text>
            {!!haveBeenTouched.includes(item.id) && (
              <Checkbox
                onValueChange={async (e) => {
                  if (!e) {
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
                value={itemQueue.includes(item.id)}
              />
            )}
          </Card.Content>
        </Card>
      ))}
      {searchTerm.length > 2 && !searchResult.length && (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text variant="bodyLarge">No Results</Text>
          <Button
            icon="plus"
            mode="contained"
            onPress={() => {
              navigation.navigate("NewCatalogItemScreen", { term: searchTerm });
            }}
          >
            Add {searchTerm}
          </Button>
        </View>
      )}
    </SearchResultWrapper>
  );
};
