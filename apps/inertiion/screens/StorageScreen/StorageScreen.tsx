import _debounce from "lodash.debounce";
import { FC, useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Card, IconButton, Menu, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { clearStorageSearchTerm, setStorageSearchTerm } from "@store";
import { defaultAppPadding } from "@theme";
import { StorageLocationData, StorageScreenProps } from "@types";

export const StorageScreen: FC<StorageScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { databaseInstance: db, storageSearchTerm } = useAppSelector(
    ({ app }) => ({ ...app })
  );

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoadingSearchResults, setIsLoadingSearchResults] =
    useState<boolean>(false);
  const [isSortSubMenuOpen, setIsSortSubMenuOpen] = useState<boolean>(false);

  const [storageSearchResult, setStorageSearchResult] = useState<
    StorageLocationData[]
  >([]);

  const [sortOrder, setSortOrder] = useState<
    | {
        orderBy: "storageLocation" | "itemLocation" | "dateModified";
        ascending: boolean;
      }
    | undefined
  >(undefined);

  const handleStorageSearch = useCallback(
    _debounce((storageSearchTerm: string) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `
            SELECT *
            FROM storage
            INNER JOIN items
            ON items.id = storage.itemId
            WHERE items.code LIKE ?
            OR items.location LIKE ?
            OR storage.storageLocation LIKE ?
          `,
            [
              `%${storageSearchTerm}%`,
              `%${storageSearchTerm}%`,
              `%${storageSearchTerm}%`,
            ],
            (_, { rows: { _array } }) => {
              setStorageSearchResult(() => _array);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );

      setIsLoadingSearchResults(() => false);
    }, 500),
    []
  );

  useEffect(() => {
    if (!!sortOrder && storageSearchTerm.length > 2) {
      return db.transaction(
        (tx) => {
          tx.executeSql(
            `
              SELECT *
              FROM storage
              INNER JOIN items
              ON items.id = storage.itemId
              WHERE items.code LIKE ?
              OR items.location LIKE ?
              OR storage.storageLocation LIKE ?
              ORDER BY ${
                sortOrder.orderBy === "dateModified"
                  ? "storage.dateModified"
                  : sortOrder.orderBy === "itemLocation"
                  ? "items.location"
                  : "storage.storageLocation"
              } ${!!sortOrder.ascending ? "ASC" : "DESC"}
            `,
            [
              `%${storageSearchTerm}%`,
              `%${storageSearchTerm}%`,
              `%${storageSearchTerm}%`,
            ],
            (_, { rows: { _array } }) => {
              setStorageSearchResult(() => _array);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [sortOrder, storageSearchTerm]);

  useEffect(() => {
    setSortOrder(() => undefined);
  }, []);

  useEffect(() => {
    if (storageSearchTerm.length > 2) {
      setIsLoadingSearchResults(() => true);
      handleStorageSearch(storageSearchTerm);
    }
  }, [storageSearchTerm]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <IconButton
          icon="arrow-left"
          mode="contained"
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        />
        <Searchbar
          elevation={isFocus ? 3 : 0}
          placeholder="Search Storage"
          onBlur={() => {
            setIsFocus(() => false);
          }}
          onClearIconPress={() => {
            dispatch(clearStorageSearchTerm());

            setStorageSearchResult(() => []);
          }}
          onChangeText={(newStorageSearchTerm) => {
            dispatch(setStorageSearchTerm(newStorageSearchTerm));
          }}
          onFocus={() => {
            setIsFocus(() => true);
          }}
          style={{
            flex: 1,
            margin: defaultAppPadding,
            marginBottom: defaultAppPadding / 2,
          }}
          value={storageSearchTerm}
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
            setIsSortSubMenuOpen(() => false);

            setIsMenuOpen(() => false);
          }}
          visible={isMenuOpen}
        >
          {!isSortSubMenuOpen ? (
            <View>
              <Menu.Item
                leadingIcon="plus"
                onPress={() => {
                  setIsMenuOpen(() => false);

                  navigation.navigate("NewStorageLocationScreen");
                }}
                title="Add Location"
              />
              <Menu.Item
                leadingIcon="history"
                onPress={() => {
                  setIsMenuOpen(() => false);

                  navigation.navigate("RecentStorage");
                }}
                title="Show Recent"
              />
              <Menu.Item
                leadingIcon="sort-ascending"
                onPress={() => {
                  setIsSortSubMenuOpen(() => true);
                }}
                title="Sort"
              />
            </View>
          ) : (
            <View>
              <Menu.Item
                {...(sortOrder?.orderBy === "storageLocation" && {
                  leadingIcon: `arrow-${sortOrder.ascending ? "up" : "down"}`,
                })}
                title="Storage Location"
                onPress={() => {
                  setSortOrder((sortOrder) => {
                    return {
                      orderBy: "storageLocation",
                      ascending:
                        sortOrder?.orderBy === "storageLocation"
                          ? !sortOrder.ascending
                          : false,
                    };
                  });
                }}
              />
              <Menu.Item
                {...(sortOrder?.orderBy === "itemLocation" && {
                  leadingIcon: `arrow-${sortOrder.ascending ? "up" : "down"}`,
                })}
                title="Item Location"
                onPress={() => {
                  setSortOrder((sortOrder) => {
                    return {
                      orderBy: "itemLocation",
                      ascending:
                        sortOrder?.orderBy === "itemLocation"
                          ? !sortOrder.ascending
                          : false,
                    };
                  });
                }}
              />
              <Menu.Item
                {...(sortOrder?.orderBy === "dateModified" && {
                  leadingIcon: `arrow-${sortOrder.ascending ? "up" : "down"}`,
                })}
                title="Date Modified"
                onPress={() => {
                  setSortOrder((sortOrder) => {
                    return {
                      orderBy: "dateModified",
                      ascending:
                        sortOrder?.orderBy === "dateModified"
                          ? !sortOrder.ascending
                          : false,
                    };
                  });
                }}
              />
            </View>
          )}
        </Menu>
      </View>
      {isLoadingSearchResults ? (
        <Text variant="titleLarge">Loading...</Text>
      ) : !!storageSearchResult.length ? (
        <FlatList
          data={storageSearchResult}
          keyExtractor={(item) => item.storageId}
          renderItem={({ item, index }) => (
            <Card
              onPress={() =>
                navigation.navigate("StorageLocationScreen", {
                  locationName: item.storageLocation,
                })
              }
              style={{
                marginHorizontal: defaultAppPadding,
                marginVertical: defaultAppPadding / 2,
              }}
            >
              <Card.Title
                subtitle={`${index + 1} of ${storageSearchResult.length}`}
                title={item.storageLocation}
                titleVariant="titleLarge"
              />
              <Card.Content>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "700" }}>{item.code}</Text>
                  {!!item.color && (
                    <View style={{ flexDirection: "row" }}>
                      <Text> | </Text>
                      <Text>{item.color}</Text>
                    </View>
                  )}
                  {!!item.size && (
                    <View style={{ flexDirection: "row" }}>
                      <Text> | </Text>
                      <Text>{item.size}</Text>
                    </View>
                  )}
                  <View style={{ flexDirection: "row" }}>
                    <Text> | </Text>
                    <Text style={{ fontWeight: "700" }}>{item.location}</Text>
                  </View>
                </View>
                {!!item.description && <Text>{item.description}</Text>}
                <Text>
                  Cartons:{" "}
                  <Text style={{ fontWeight: "bold" }}>{item.cartons}</Text>{" "}
                  Pieces:{" "}
                  <Text style={{ fontWeight: "bold" }}>{item.pieces}</Text>
                </Text>
              </Card.Content>
            </Card>
          )}
        />
      ) : storageSearchTerm.length > 2 ? (
        <Text>No Res</Text>
      ) : (
        <Text>Search for something</Text>
      )}
    </SafeAreaView>
  );
};
