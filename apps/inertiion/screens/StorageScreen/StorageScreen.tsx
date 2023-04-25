import _debounce from "lodash.debounce";
import { FC, useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Card, IconButton, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import {
  clearStorageSearchTerm,
  setAllLocationData,
  setStorageSearchTerm,
} from "@store";
import { defaultAppPadding } from "@theme";
import {
  StorageLocationData,
  StorageScreenProps,
  StorageCardComponentNavProps,
} from "@types";

export const StorageScreen: FC<StorageScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const {
    allLocationData,
    databaseInstance: db,
    storageSearchTerm,
  } = useAppSelector(({ app }) => ({ ...app }));

  const [distinctLocations, setDistinctLocations] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isLoadingStorageData, setIsLoadingStorageData] =
    useState<boolean>(false);
  const [isLoadingSearchResults, setIsLoadingSearchResults] =
    useState<boolean>(false);
  const [storageSearchResult, setStorageSearchResult] = useState<
    StorageLocationData[]
  >([]);

  const handleLoadStorageData = useCallback(() => {
    setIsLoadingStorageData(() => true);

    db.transaction(
      (tx) => {
        tx.executeSql(
          ` SELECT DISTINCT storageLocation
            FROM storage`,
          [],
          (_, { rows: { _array } }) => {
            setDistinctLocations(() => {
              const distinctStorageLocations = _array.map(
                (loc) => loc.storageLocation
              ) as string[];

              return distinctStorageLocations;
            });
          }
        );
      },
      (err) => console.log(err)
    );
  }, []);

  const handleLoadAllLocationData = useCallback(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `
          SELECT *
          FROM storage
          INNER JOIN items
          ON items.id = storage.itemId
          `,
          [],
          (_, { rows: { _array } }) => {
            dispatch(setAllLocationData(_array));

            setIsLoadingStorageData(() => false);
          }
        );
      },
      (err) => console.log(err)
    );
  }, []);

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
          `,
            [`%${storageSearchTerm}%`, `%${storageSearchTerm}%`],
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
    handleLoadStorageData();
  }, []);

  useEffect(() => {
    if (!!distinctLocations.length) {
      handleLoadAllLocationData();
    }
  }, [distinctLocations]);

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
        <IconButton
          icon="plus"
          mode="contained"
          onPress={() => {
            navigation.navigate("NewStorageLocationScreen");
          }}
        />
      </View>
      {storageSearchTerm.length > 2 ? (
        isLoadingSearchResults ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={Array.from(
              new Set(storageSearchResult.map((res) => res.storageLocation))
            ).sort((a, b) => a.localeCompare(b))}
            onRefresh={() => {
              handleStorageSearch(storageSearchTerm);
            }}
            refreshing={false}
            renderItem={({ item }) => (
              <LocationCard
                content={storageSearchResult.filter(
                  (loc) => loc.storageLocation === item
                )}
                loc={item}
                nav={navigation}
              />
            )}
          />
        )
      ) : isLoadingStorageData ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={distinctLocations.sort((a, b) => a.localeCompare(b))}
          onRefresh={handleLoadAllLocationData}
          refreshing={false}
          renderItem={({ item }) => (
            <LocationCard
              content={allLocationData.filter(
                (loc) => loc.storageLocation === item
              )}
              loc={item}
              nav={navigation}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const LocationCard: FC<{
  content: StorageLocationData[];
  loc: string;
  nav: StorageCardComponentNavProps;
}> = ({ content, loc, nav }) => {
  return (
    <Card
      onPress={() =>
        nav.navigate("StorageLocationScreen", { locationName: loc })
      }
      style={{
        marginHorizontal: defaultAppPadding,
        marginVertical: defaultAppPadding / 2,
      }}
    >
      <Card.Title title={loc} titleVariant="titleLarge" />
      <Card.Content>
        {content.map((ls, idx) => (
          <View
            key={ls.storageId}
            style={{
              marginTop: idx !== 0 ? defaultAppPadding : 0,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text>{ls.code}</Text>
              {!!ls.color && (
                <View style={{ flexDirection: "row" }}>
                  <Text> | </Text>
                  <Text style={{ fontWeight: "700" }}>{ls.color}</Text>
                </View>
              )}
              {!!ls.size && (
                <View style={{ flexDirection: "row" }}>
                  <Text> | </Text>
                  <Text style={{ fontWeight: "700" }}>{ls.size}</Text>
                </View>
              )}
              <Text> | </Text>
              <Text>{ls.location}</Text>
            </View>
            {!!ls.description && <Text>{ls.description}</Text>}
            {!!ls.cartons && !!ls.pieces && (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "green",
                    flex: 1,
                    fontWeight: "700",
                  }}
                >
                  Cartons: {ls.cartons}
                </Text>
                <Text
                  style={{
                    color: "green",
                    flex: 1,
                    fontWeight: "700",
                  }}
                >
                  Pieces: {ls.pieces}
                </Text>
              </View>
            )}
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};
