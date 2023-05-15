import Checkbox from "expo-checkbox";
import { FC, useCallback, useEffect, useState } from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import {
  setIsCheckedQueueHidden,
  setItemQueue,
  setItemQueueChecked,
} from "@store";
import { defaultAppPadding } from "@theme";
import {
  AsyncStorageReturnStatus,
  CatalogItem,
  ItemQueueScreenNavProps,
} from "@types";
import {
  localStorageGetIsCheckedQueueHidden,
  localStorageSetIsCheckedQueueHidden,
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
    isCheckedQueueHidden,
    itemQueue,
    itemQueueChecked,
  } = useAppSelector(({ app, appState }) => ({ ...app, ...appState }));

  const [catalogData, setCatalogData] = useState<CatalogItem[]>([]);

  const handleItemDataLoad = useCallback(async () => {
    setCatalogData(() => []);

    const { checkedItemQueue, status } =
      await localStorageGetCheckedItemQueue();

    if (status === AsyncStorageReturnStatus.OK) {
      dispatch(setItemQueueChecked(checkedItemQueue));
    }

    const hiddenItemQueueStatus = await localStorageGetIsCheckedQueueHidden();

    console.log(hiddenItemQueueStatus);

    dispatch(setIsCheckedQueueHidden(hiddenItemQueueStatus));

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
    <SafeAreaView style={{ height: "100%" }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <IconButton
            icon="arrow-left"
            mode="contained"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text variant="headlineLarge">Queue</Text>
        </View>
        <IconButton
          disabled={!itemQueue.length}
          icon={isCheckedQueueHidden ? "eye" : "eye-off"}
          mode="contained"
          onPress={async () => {
            dispatch(setIsCheckedQueueHidden(!isCheckedQueueHidden));

            await localStorageSetIsCheckedQueueHidden(!isCheckedQueueHidden);
          }}
          onLongPress={() => {
            dispatch(setItemQueue([]));

            ToastAndroid.show(
              "All items removed from the queue.",
              ToastAndroid.SHORT
            );
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {itemQueue.map((item) => {
            return (
              <Card
                key={item}
                onPress={() => {
                  if (itemQueueChecked.includes(item)) {
                    dispatch(
                      setItemQueueChecked(
                        itemQueueChecked.filter((i) => i !== item)
                      )
                    );

                    localStorageSetCheckedItemQueue(
                      itemQueueChecked.filter((i) => i !== item)
                    );
                  } else {
                    dispatch(setItemQueueChecked([...itemQueueChecked, item]));

                    localStorageSetCheckedItemQueue([
                      ...itemQueueChecked,
                      item,
                    ]);
                  }
                }}
                onLongPress={() => {
                  navigation.navigate("CatalogItemScreen", { itemId: item });
                }}
                style={{
                  display:
                    itemQueueChecked.includes(item) && !!isCheckedQueueHidden
                      ? "none"
                      : "flex",
                  marginVertical: defaultAppPadding / 2,
                  marginHorizontal: defaultAppPadding,
                }}
              >
                <Card.Content
                  style={{
                    alignItems: "center",
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
                        >{` ${
                          catalogData.find((i) => i.id === item)?.size
                        }`}</Text>
                      )}
                    </Text>
                    <Text variant="bodyMedium" style={{ fontWeight: "700" }}>
                      {catalogData.find((i) => i.id === item)?.location}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Checkbox
                      onValueChange={(e) => {
                        if (!!e) {
                          dispatch(
                            setItemQueueChecked([...itemQueueChecked, item])
                          );

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
                    <IconButton
                      iconColor="red"
                      icon="close"
                      mode="contained-tonal"
                      onPress={() => {
                        dispatch(
                          setItemQueue(itemQueue.filter((i) => i !== item))
                        );

                        localStorageSetCheckedItemQueue(
                          itemQueueChecked.filter((i) => i !== item)
                        );
                      }}
                      style={{ marginLeft: defaultAppPadding * 2 }}
                    />
                  </View>
                </Card.Content>
              </Card>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
