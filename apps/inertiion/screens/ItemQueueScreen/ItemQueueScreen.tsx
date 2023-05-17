import Checkbox from "expo-checkbox";
import * as Haptics from "expo-haptics";
import { FC, useCallback, useEffect, useState } from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import { Card, IconButton, Snackbar, Text } from "react-native-paper";
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
  const [isSnackVisible, setIsSnackVisible] = useState<boolean>(false);
  const [lastActions, setLastActions] = useState<
    | {
        action: "check" | "uncheck";
        item: string;
        message: string;
      }[]
    | null
  >(null);

  const handleItemDataLoad = useCallback(async () => {
    setCatalogData(() => []);

    const { checkedItemQueue, status } =
      await localStorageGetCheckedItemQueue();

    if (status === AsyncStorageReturnStatus.OK) {
      dispatch(setItemQueueChecked(checkedItemQueue));
    }

    const hiddenItemQueueStatus = await localStorageGetIsCheckedQueueHidden();

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
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

                  setIsSnackVisible(() => true);

                  if (itemQueueChecked.includes(item)) {
                    dispatch(
                      setItemQueueChecked(
                        itemQueueChecked.filter((i) => i !== item)
                      )
                    );

                    localStorageSetCheckedItemQueue(
                      itemQueueChecked.filter((i) => i !== item)
                    );

                    setLastActions((lastActions) => {
                      if (!!lastActions?.length) {
                        return [
                          ...lastActions,
                          {
                            action: "uncheck",
                            item,
                            message: `Undo UN-checking ${catalogData.find(
                              (i) => i.id === item
                            )?.code!}?`,
                          },
                        ];
                      } else {
                        return [
                          {
                            action: "uncheck",
                            item,
                            message: `Undo UN-checking ${catalogData.find(
                              (i) => i.id === item
                            )?.code!}?`,
                          },
                        ];
                      }
                    });
                  } else {
                    dispatch(setItemQueueChecked([...itemQueueChecked, item]));

                    localStorageSetCheckedItemQueue([
                      ...itemQueueChecked,
                      item,
                    ]);

                    setLastActions((lastActions) => {
                      if (!!lastActions?.length) {
                        return [
                          ...lastActions,
                          {
                            action: "check",
                            item,
                            message: `Undo checking ${catalogData.find(
                              (i) => i.id === item
                            )?.code!}?`,
                          },
                        ];
                      } else {
                        return [
                          {
                            action: "check",
                            item,
                            message: `Undo checking ${catalogData.find(
                              (i) => i.id === item
                            )?.code!}?`,
                          },
                        ];
                      }
                    });
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
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

                        setIsSnackVisible(() => true);

                        if (!!e) {
                          dispatch(
                            setItemQueueChecked([...itemQueueChecked, item])
                          );

                          localStorageSetCheckedItemQueue([
                            ...itemQueueChecked,
                            item,
                          ]);

                          setLastActions((lastActions) => {
                            if (!!lastActions?.length) {
                              return [
                                ...lastActions,
                                {
                                  action: "check",
                                  item,
                                  message: `Undo checking ${catalogData.find(
                                    (i) => i.id === item
                                  )?.code!}?`,
                                },
                              ];
                            } else {
                              return [
                                {
                                  action: "check",
                                  item,
                                  message: `Undo checking ${catalogData.find(
                                    (i) => i.id === item
                                  )?.code!}?`,
                                },
                              ];
                            }
                          });

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

                          setLastActions((lastActions) => {
                            if (!!lastActions?.length) {
                              return [
                                ...lastActions,
                                {
                                  action: "uncheck",
                                  item,
                                  message: `Undo UN-checking ${catalogData.find(
                                    (i) => i.id === item
                                  )?.code!}?`,
                                },
                              ];
                            } else {
                              return [
                                {
                                  action: "uncheck",
                                  item,
                                  message: `Undo UN-checking ${catalogData.find(
                                    (i) => i.id === item
                                  )?.code!}?`,
                                },
                              ];
                            }
                          });

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
      <Snackbar
        action={{
          label: "Undo",
          onPress: async () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

            if (!!lastActions?.length) {
              if (lastActions.length === 1) {
                if (lastActions[0].action === "check") {
                  dispatch(
                    setItemQueueChecked(
                      itemQueueChecked.filter((i) => i !== lastActions[0].item)
                    )
                  );

                  localStorageSetCheckedItemQueue(
                    itemQueueChecked.filter((i) => i !== lastActions[0].item)
                  );
                } else {
                  dispatch(
                    setItemQueueChecked([
                      ...itemQueueChecked,
                      lastActions[0].item,
                    ])
                  );

                  await localStorageSetCheckedItemQueue([
                    ...itemQueueChecked,
                    lastActions[0].item,
                  ]);
                }
              } else {
                const toRemove = lastActions
                  .filter((action) => action.action === "check")
                  .map((action) => action.item);

                const toAdd = lastActions
                  .filter((action) => action.action === "uncheck")
                  .map((action) => action.item);

                const finalCheckedQueue = [
                  ...itemQueueChecked.filter(
                    (item) => !toRemove.includes(item)
                  ),
                  ...toAdd,
                ];

                dispatch(setItemQueueChecked(finalCheckedQueue));
              }
            }

            setLastActions(() => null);
          },
        }}
        onDismiss={() => {
          setIsSnackVisible(() => false);
          setLastActions(() => []);
        }}
        visible={isSnackVisible}
      >
        {lastActions?.length === 1
          ? lastActions[0].message
          : !!lastActions
          ? `Undo last ${lastActions?.length} actions?`
          : "All done!"}
      </Snackbar>
    </SafeAreaView>
  );
};
