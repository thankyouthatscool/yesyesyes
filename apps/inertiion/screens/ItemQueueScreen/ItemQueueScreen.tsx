import Checkbox from "expo-checkbox";
import { FC, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

import { useAppSelector } from "@hooks";
import { defaultAppPadding } from "@theme";
import { CatalogItem, ItemQueueScreenNavProps } from "@types";

import { ItemQueueScreenWrapper } from "./Styled";

export const ItemQueueScreen: FC<ItemQueueScreenNavProps> = ({
  navigation,
}) => {
  const { databaseInstance: db, itemQueue } = useAppSelector(({ app }) => app);

  const [catalogData, setCatalogData] = useState<CatalogItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleItemDataLoad = useCallback(() => {
    setCatalogData(() => []);

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

  const sortQueue = useCallback(
    (itemQueue: string[]) => {
      const unCheckedItems = itemQueue.filter((i) => !checkedItems.includes(i));

      return [...unCheckedItems, ...checkedItems];
    },
    [checkedItems]
  );

  useEffect(() => {
    handleItemDataLoad();
  }, []);

  return (
    <ItemQueueScreenWrapper>
      <Text variant="headlineLarge">Item Queue</Text>
      {[...sortQueue(itemQueue)].map((item, idx) => {
        return (
          <Card
            key={item}
            onPress={() => {
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
                    setCheckedItems((checkedItems) => [...checkedItems, item]);
                  } else {
                    setCheckedItems((checkedItems) =>
                      checkedItems.filter((i) => i !== item)
                    );
                  }
                }}
                value={checkedItems.includes(item)}
              />
            </Card.Content>
          </Card>
        );
      })}
    </ItemQueueScreenWrapper>
  );
};
