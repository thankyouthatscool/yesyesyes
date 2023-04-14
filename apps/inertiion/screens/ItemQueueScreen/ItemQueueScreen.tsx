import Checkbox from "expo-checkbox";
import { FC, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setItemQueueChecked } from "@store";
import { defaultAppPadding } from "@theme";
import {
  AsyncStorageReturnStatus,
  CatalogItem,
  ItemQueueScreenNavProps,
} from "@types";
import {
  localStorageGetCheckedItemQueue,
  localStorageSetCheckedItemQueue,
} from "@utils";

import { ItemQueueScreenWrapper } from "./Styled";

export const ItemQueueScreen: FC<ItemQueueScreenNavProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const {
    databaseInstance: db,
    itemQueue,
    itemQueueChecked,
  } = useAppSelector(({ app }) => app);

  const [catalogData, setCatalogData] = useState<CatalogItem[]>([]);

  const handleItemDataLoad = useCallback(async () => {
    setCatalogData(() => []);

    const { checkedItemQueue, status } =
      await localStorageGetCheckedItemQueue();

    if (status === AsyncStorageReturnStatus.OK) {
      dispatch(setItemQueueChecked(checkedItemQueue));
    }

    db.transaction(
      (tx) => {
        itemQueue.forEach((itemId) => {
          tx.executeSql(
            "SELECT * FROM items WHERE id = ?",
            [itemId],
            (_, { rows: { _array } }) => {
              setCatalogData((catalogData) => [...catalogData, _array[0]]);
            }
          );
        });
      },
      (err) => console.log(err)
    );
  }, [itemQueue]);

  useEffect(() => {
    handleItemDataLoad();
  }, []);

  return (
    <ItemQueueScreenWrapper>
      <Text variant="headlineLarge">Item Queue</Text>
      {itemQueue.map((item, idx) => {
        return (
          <Card
            key={item}
            onLongPress={() => {
              navigation.navigate("CatalogItemScreen", { itemId: item });
            }}
            style={{ marginTop: !!idx ? defaultAppPadding : 0 }}
          >
            <Card.Content
              style={{
                alignItems: "flex-start",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text variant="bodyLarge" style={{ fontWeight: "700" }}>
                  {catalogData.find((i) => i.id === item)?.code}
                </Text>
                <Text>
                  {catalogData.find((i) => i.id === item)?.color}
                  {!!catalogData.find((i) => i.id === item)?.size && (
                    <Text
                      style={{ fontStyle: "italic", fontWeight: "700" }}
                    >{` ${catalogData.find((i) => i.id === item)?.size}`}</Text>
                  )}
                </Text>
                <Text variant="bodyMedium" style={{ fontWeight: "700" }}>
                  {catalogData.find((i) => i.id === item)?.location}
                </Text>
              </View>
              <Checkbox
                onValueChange={(e) => {
                  if (!!e) {
                    dispatch(setItemQueueChecked([...itemQueueChecked, item]));

                    localStorageSetCheckedItemQueue([
                      ...itemQueueChecked,
                      item,
                    ]);

                    return;
                  }

                  if (!e) {
                    dispatch(
                      setItemQueueChecked(
                        itemQueueChecked.filter((i) => i !== item)
                      )
                    );

                    localStorageSetCheckedItemQueue(
                      itemQueueChecked.filter((i) => i !== item)
                    );

                    return;
                  }
                }}
                value={itemQueueChecked.includes(item)}
              />
            </Card.Content>
          </Card>
        );
      })}
    </ItemQueueScreenWrapper>
  );
};
