import { useCallback, useEffect, useState } from "react";
import { Card, Text } from "react-native-paper";

import { useAppSelector } from "@hooks";
import { CatalogItem } from "@types";

import { ItemQueueScreenWrapper } from "./Styled";

export const ItemQueueScreen = () => {
  const { databaseInstance: db, itemQueue } = useAppSelector(({ app }) => app);

  const [catalogData, setCatalogData] = useState<CatalogItem[]>([]);

  const handleItemDataLoad = useCallback(() => {
    setCatalogData(() => []);

    db.transaction(
      (tx) => {
        itemQueue.forEach((itemId) => {
          tx.executeSql(
            "SELECT * FROM items WHERE id=?",
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

  useEffect(() => {
    console.log(catalogData.length);
  }, [catalogData]);

  return (
    <ItemQueueScreenWrapper>
      <Text variant="headlineLarge">Item Queue</Text>
      {itemQueue.map((item) => (
        <Card key={item}>
          <Card.Content>
            <Text>{catalogData.find((i) => i.id === item)?.code}</Text>
          </Card.Content>
        </Card>
      ))}
    </ItemQueueScreenWrapper>
  );
};
