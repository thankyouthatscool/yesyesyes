import { useAuth } from "@clerk/clerk-expo";
import * as Crypto from "expo-crypto";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Pressable, ScrollView, ToastAndroid, View } from "react-native";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setSearchResult } from "@store";
import { defaultAppPadding } from "@theme";
import { CatalogItem, StorageComponentNav } from "@types";

import {
  CatalogItemScreenNavProps,
  NewCatalogItemInput as CatalogItemInput,
} from "@types";

interface CatalogItemInputWithId extends CatalogItemInput {
  id: string;
}

interface ItemNote {
  noteId: string;
  noteBody: string;
  referenceId: string;
  dateModified: string;
}

export const CatalogItemScreen: FC<CatalogItemScreenNavProps> = ({
  navigation,
  route: {
    params: { itemId },
  },
}) => {
  const dispatch = useAppDispatch();

  const scrollViewRef = useRef<ScrollView>(null);

  const { databaseInstance: db, searchTerm } = useAppSelector(({ app }) => ({
    ...app,
  }));

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isNotesUpdateNeeded, setIsNotesUpdateNeeded] =
    useState<boolean>(false);
  const [isUpdateNeeded, setIsUpdateNeeded] = useState<boolean>(false);
  const [itemData, setItemData] = useState<CatalogItemInputWithId | null>(null);
  const [itemNotes, setItemNotes] = useState<ItemNote[]>([]);

  // Section Toggles
  const [isItemInformationCollapsed, setIsItemInformationCollapsed] =
    useState<boolean>(false);
  const [isNotesSectionCollapsed, setIsNotesSectionCollapsed] =
    useState<boolean>(true);

  const handleGetItemData = useCallback(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM items WHERE id = ?",
          [itemId],
          (_, { rows: { _array } }) => {
            const itemData: CatalogItemInputWithId = _array[0];

            setItemData(() => itemData);
          }
        );

        tx.executeSql(
          `
          SELECT *
          FROM notes
          WHERE referenceId = ?
        `,
          [itemId],
          (_, { rows: { _array } }) => {
            setItemNotes(() => _array);
          }
        );
      },
      (err) => console.log(err)
    );
  }, [itemId]);

  const handleUpdateItemData = useCallback(() => {
    if (!!itemData) {
      const { code, id, location, color, description, size } = itemData;

      db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE items SET code = ?, color = ?, size = ?, description = ?, location = ? WHERE id = ?`,
            [
              code.toUpperCase(),
              color?.toUpperCase() || null,
              size?.toUpperCase() || null,
              description || null,
              location.toUpperCase(),
              id,
            ],
            () => {
              ToastAndroid.show(
                `${itemData.code} updated successfully!`,
                ToastAndroid.LONG
              );
            }
          );

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
                  size: item.size
                    ?.split(",")
                    .map((size: string) => size.trim()),
                })) as unknown as CatalogItem[];

                dispatch(setSearchResult(searchResult));

                setIsUpdateNeeded(() => false);
              } catch (err) {
                console.log(err);
              }
            }
          );
        },
        (err) => console.log(err)
      );
    }
  }, [itemData]);

  useEffect(() => {
    handleGetItemData();
  }, [itemId]);

  return (
    <SafeAreaView
      style={{ height: "100%", padding: defaultAppPadding, paddingTop: 0 }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: defaultAppPadding,
        }}
      >
        <Button
          icon="arrow-left"
          mode="contained-tonal"
          onPress={() => {
            navigation.goBack();
          }}
        >
          Go Back
        </Button>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          {!!isUpdateNeeded ? (
            <IconButton
              disabled={!isUpdateNeeded}
              icon="content-save"
              mode="contained"
              onPress={() => {
                handleUpdateItemData();
              }}
            />
          ) : (
            <IconButton
              containerColor="rgba(0,0,0,0)"
              iconColor="rgba(0,0,0,0)"
              icon="content-save"
            />
          )}
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
            onDismiss={() => setIsMenuOpen(() => false)}
            visible={isMenuOpen}
          >
            <Menu.Item
              leadingIcon="content-duplicate"
              onPress={() => {
                setIsMenuOpen(() => false);

                const { code, color, description, location, size } = itemData!;

                navigation.navigate("NewCatalogItemScreen", {
                  formData: {
                    code,
                    color: color || "",
                    description: description || "",
                    location,
                    size: size || "",
                  },
                });
              }}
              title="Duplicate"
            />
            <Menu.Item
              leadingIcon="plus"
              onPress={() => {
                console.log("will add to the item queue");
              }}
              title="Add to Queue"
            />
          </Menu>
        </View>
      </View>
      {!!itemData && (
        <ScrollView ref={scrollViewRef}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text variant="headlineSmall">Item Information</Text>
            <IconButton
              icon={`chevron-${isItemInformationCollapsed ? "down" : "up"}`}
              mode="contained"
              onPress={() => {
                setIsItemInformationCollapsed(
                  (isItemInformationCollapsed) => !isItemInformationCollapsed
                );
              }}
            />
          </View>
          {!isItemInformationCollapsed && (
            <View>
              <TextInput
                label="Code"
                mode="outlined"
                onChangeText={(newCode) => {
                  setIsUpdateNeeded(() => true);

                  setItemData((itemData) => ({ ...itemData!, code: newCode }));
                }}
                value={itemData.code}
              />
              <TextInput
                label="Color(s)"
                mode="outlined"
                onChangeText={(newColor) => {
                  setIsUpdateNeeded(() => true);

                  setItemData((itemData) => ({
                    ...itemData!,
                    color: newColor,
                  }));
                }}
                value={itemData.color || ""}
              />
              <TextInput
                label="Size(s)"
                mode="outlined"
                onChangeText={(newSize) => {
                  setIsUpdateNeeded(() => true);

                  setItemData((itemData) => ({ ...itemData!, size: newSize }));
                }}
                value={itemData.size || ""}
              />
              <TextInput
                label="Description"
                mode="outlined"
                multiline
                numberOfLines={4}
                onChangeText={(newDescription) => {
                  setIsUpdateNeeded(() => true);

                  setItemData((itemData) => ({
                    ...itemData!,
                    description: newDescription,
                  }));
                }}
                value={itemData.description || ""}
              />
              <TextInput
                label="Location"
                mode="outlined"
                onChangeText={(newLocation) => {
                  setIsUpdateNeeded(() => true);

                  setItemData((itemData) => ({
                    ...itemData!,
                    location: newLocation,
                  }));
                }}
                value={itemData.location}
              />
            </View>
          )}
          <CatalogItemScreenStorageComponent
            itemId={itemData.id}
            navigation={navigation}
          />
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignItems: "center",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Text
                variant="headlineSmall"
                style={{ paddingRight: defaultAppPadding }}
              >
                Notes
              </Text>
              {!!itemNotes.length && (
                <Avatar.Text label={itemNotes.length.toString()} size={24} />
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              {!!isNotesUpdateNeeded && (
                <IconButton
                  disabled={!itemNotes.every((note) => !!note.noteBody)}
                  icon="content-save"
                  mode="contained"
                  onPress={() => {
                    db.transaction(
                      (tx) => {
                        itemNotes.forEach(
                          ({ dateModified, noteBody, noteId, referenceId }) => {
                            tx.executeSql(
                              `
                              INSERT INTO notes
                              VALUES (?, ?, ?, ?)
                              ON CONFLICT (noteId) DO UPDATE SET
                                noteBody = excluded.noteBody,
                                dateModified = excluded.dateModified
                            `,
                              [noteId, referenceId, noteBody, dateModified]
                            );
                          }
                        );
                      },
                      (err) => console.log(err)
                    );

                    setIsNotesUpdateNeeded(() => false);
                  }}
                />
              )}
              <IconButton
                disabled={!itemNotes.every((note) => !!note.noteBody)}
                icon="plus"
                mode="contained"
                onPress={() => {
                  scrollViewRef.current?.scrollToEnd();

                  setIsNotesSectionCollapsed(() => false);

                  setItemNotes((itemNotes) => [
                    ...itemNotes,
                    {
                      noteBody: "",
                      noteId: Crypto.randomUUID(),
                      dateModified: Date.now().toString(),
                      referenceId: itemData.id,
                    },
                  ]);
                }}
              />
              <IconButton
                icon={`chevron-${isNotesSectionCollapsed ? "down" : "up"}`}
                mode="contained"
                onPress={() => {
                  scrollViewRef.current?.scrollToEnd();

                  setIsNotesSectionCollapsed(
                    (isNotesSectionCollapsed) => !isNotesSectionCollapsed
                  );
                }}
              />
            </View>
          </View>
          {!isNotesSectionCollapsed &&
            itemNotes.map((note, idx) => (
              <NoteComponent
                idx={idx}
                key={note.noteId}
                note={note}
                onUpdate={{ setIsNotesUpdateNeeded, setItemNotes }}
                nav={navigation}
              />
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export const CatalogItemScreenStorageComponent: FC<{
  itemId: string;
  navigation: StorageComponentNav;
}> = ({ itemId, navigation }) => {
  const { userId } = useAuth();

  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [isUpdateNeeded, setIsUpdateNeeded] = useState<boolean>(false);
  const [itemStorageData, setItemStorageData] = useState<
    {
      storageId: string;
      storageLocation: string;
      itemId: string;
      cartons: number;
      pieces: number;
      dateModified: string;
    }[]
  >([]);

  // Section Toggles
  const [isStorageCollapsed, setIsStorageCollapsed] = useState<boolean>(false);

  const handleUpdateItemStorageData = useCallback(() => {
    itemStorageData.forEach(
      ({ storageId, storageLocation, itemId, cartons, pieces }) => {
        let code: string;
        let color: string;

        db.transaction(
          (tx) => {
            tx.executeSql(
              `
                SELECT *
                FROM items
                WHERE id = ?
            `,
              [itemId],
              (_, { rows: { _array } }) => {
                code = _array[0].code;
                color = _array[0].color;
              }
            );
          },
          (err) => {
            console.log(err);
          }
        );

        db.transaction(
          (tx) => {
            tx.executeSql(
              ` 
                INSERT INTO storage (storageId, storageLocation, itemId, cartons, pieces, dateModified)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT (storageId) DO UPDATE SET
                  storageLocation = excluded.storageLocation,
                  itemId = excluded.itemId,
                  cartons = excluded.cartons,
                  pieces = excluded.pieces,
                  dateModified = excluded.dateModified
            `,
              [
                storageId,
                storageLocation,
                itemId,
                cartons,
                pieces,
                Date.now().toString(),
              ]
            );

            tx.executeSql(
              `
                INSERT INTO logs
                VALUES (?, ?, ?, ?, ?, ?)
              `,
              [
                Crypto.randomUUID(),
                storageId,
                "update, storage",
                `Storage location "${storageLocation}" updated with ${cartons} carton(s)/${pieces} piece(s) of ${code}${
                  !!color && ` ${color}`
                }.`,
                userId || "unknown",
                Date.now().toString(),
              ],
              (_, { rows: { _array } }) => {
                console.log(_array);
              }
            );
          },
          (err) => {
            console.log(err);
          }
        );
      }
    );

    ToastAndroid.show(
      "Item storage data updated successfully!",
      ToastAndroid.LONG
    );

    setIsUpdateNeeded(() => false);
  }, [itemStorageData]);

  const handleDeleteItemStorageRow = useCallback((id: string) => {
    let code: string;
    let color: string;
    let storageLocation: string;
    let cartons: number;
    let pieces: number;

    db.transaction(
      (tx) => {
        tx.executeSql(
          `
          SELECT *
          FROM storage
          INNER JOIN items
          ON items.id = storage.ItemId
          WHERE storage.storageId = ?
      `,
          [id],
          (_, { rows: { _array } }) => {
            console.log(_array);

            code = _array[0].code;
            color = _array[0].color;
            storageLocation = _array[0].storageLocation;
            cartons = _array[0].cartons;
            pieces = _array[0].pieces;
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );

    db.transaction(
      (tx) => {
        tx.executeSql(
          `
            DELETE FROM storage 
            WHERE storageId = ?
          `,
          [id],
          () => {
            setItemStorageData((itemStorageData) =>
              itemStorageData.filter((item) => item.storageId !== id)
            );

            ToastAndroid.show("Storage Row removed!", ToastAndroid.LONG);
          }
        );

        console.log(code);
        console.log(storageLocation);
        console.log(cartons);
        console.log(pieces);

        tx.executeSql(
          `
            INSERT INTO logs
            VALUES (?, ?, ?, ?, ?, ?)
        `,
          [
            Crypto.randomUUID(),
            id,
            "delete, storage",
            `Storage location "${storageLocation}" deleted. ${cartons} carton(s)/${pieces} piece(s) of ${code} ${
              !!color && ` ${color}`
            } removed.`,
            userId || "unknown",
            Date.now().toString(),
          ],
          () => {}
        );
      },
      (err) => {
        console.log(err);

        ToastAndroid.show(
          "Something went wrong! Please try again later.",
          ToastAndroid.LONG
        );
      }
    );
  }, []);

  useEffect(() => {
    if (itemId) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM storage WHERE itemId = ?",
            [itemId],
            (_, { rows: { _array } }) => {
              const dbItemStorageData = _array as {
                storageId: string;
                storageLocation: string;
                itemId: string;
                cartons: number;
                pieces: number;
                dateModified: string;
              }[];

              setItemStorageData(() => dbItemStorageData);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [itemId]);

  return (
    <View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={() => {
            console.log("navigating to the storage screen");

            navigation.navigate("StorageScreen");
          }}
        >
          <Text variant="headlineSmall">Storage</Text>
        </Pressable>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          {!!isUpdateNeeded && (
            <IconButton
              icon="content-save"
              mode="contained"
              onPress={handleUpdateItemStorageData}
              size={20}
            />
          )}
          <IconButton
            icon="plus"
            mode="contained"
            onPress={() => {
              setItemStorageData((itemStorageData) => [
                ...itemStorageData,
                {
                  location: "",
                  storageLocation: "",
                  dateModified: Date.now().toString(),
                  cartons: 0,
                  storageId: Crypto.randomUUID(),
                  itemId,
                  pieces: 0,
                },
              ]);
            }}
          />
          <IconButton
            icon={`chevron-${isStorageCollapsed ? "down" : "up"}`}
            mode="contained"
            onPress={() => {
              setIsStorageCollapsed(
                (isStorageCollapsed) => !isStorageCollapsed
              );
            }}
          />
        </View>
      </View>
      <Text variant="titleMedium">
        Total Cartons:{" "}
        <Text style={{ color: "green", fontWeight: "700" }}>
          {itemStorageData.reduce((acc, { cartons }) => {
            return acc + cartons;
          }, 0)}
        </Text>{" "}
        / Total Pieces:{" "}
        <Text style={{ color: "green", fontWeight: "700" }}>
          {itemStorageData.reduce((acc, { pieces }) => {
            return acc + pieces;
          }, 0)}
        </Text>
      </Text>
      {!isStorageCollapsed && (
        <View>
          {itemStorageData.map((loc, idx) => {
            return (
              <View key={loc.storageId}>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <TextInput
                    label="Location"
                    mode="outlined"
                    onChangeText={(newLocation) => {
                      setIsUpdateNeeded(() => true);

                      setItemStorageData((itemStorageData) => [
                        ...itemStorageData.slice(0, idx),
                        {
                          ...itemStorageData[idx],
                          storageLocation: newLocation,
                        },
                        ...itemStorageData.slice(idx + 1),
                      ]);
                    }}
                    style={{ flex: 1 }}
                    value={loc.storageLocation}
                  />
                  <IconButton
                    disabled={!loc.storageLocation || isUpdateNeeded}
                    icon="arrow-right"
                    mode="contained"
                    onPress={() => {
                      navigation.navigate("StorageLocationScreen", {
                        locationName: loc.storageLocation,
                      });
                    }}
                    size={20}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <TextInput
                    keyboardType="number-pad"
                    label="Cartons"
                    mode="outlined"
                    onChangeText={(newNumberOfCartons) => {
                      setIsUpdateNeeded(() => true);

                      setItemStorageData((itemStorageData) => [
                        ...itemStorageData.slice(0, idx),
                        {
                          ...itemStorageData[idx],
                          cartons: parseInt(newNumberOfCartons),
                        },
                        ...itemStorageData.slice(idx + 1),
                      ]);
                    }}
                    value={!!loc.cartons ? loc.cartons.toString() : ""}
                    style={{ flex: 1, marginRight: defaultAppPadding / 2 }}
                  />
                  <TextInput
                    keyboardType="number-pad"
                    label="Pieces"
                    mode="outlined"
                    onChangeText={(newNumberOfPieces) => {
                      setIsUpdateNeeded(() => true);

                      setItemStorageData((itemStorageData) => [
                        ...itemStorageData.slice(0, idx),
                        {
                          ...itemStorageData[idx],
                          pieces: parseInt(newNumberOfPieces),
                        },
                        ...itemStorageData.slice(idx + 1),
                      ]);
                    }}
                    value={!!loc.pieces ? loc.pieces?.toString() : ""}
                    style={{ flex: 1, marginLeft: defaultAppPadding / 2 }}
                  />
                  <IconButton
                    iconColor="red"
                    icon="trash-can"
                    mode="contained"
                    onPress={() => handleDeleteItemStorageRow(loc.storageId)}
                    size={20}
                  />
                </View>
                <Text>
                  {new Date(parseFloat(loc.dateModified)).toLocaleDateString()}{" "}
                  @ {new Date(parseInt(loc.dateModified)).toLocaleTimeString()}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export const NoteComponent: FC<{
  idx: number;
  note: ItemNote;
  onUpdate: {
    setIsNotesUpdateNeeded: Dispatch<SetStateAction<boolean>>;
    setItemNotes: Dispatch<SetStateAction<ItemNote[]>>;
  };
  nav: StorageComponentNav;
}> = ({
  idx,
  note,
  onUpdate: { setIsNotesUpdateNeeded, setItemNotes },
  nav,
}) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <View>
      <TextInput
        label={!!note.noteBody.length ? "Note" : "New note"}
        mode="outlined"
        multiline
        numberOfLines={4}
        onChangeText={(newNoteBody) => {
          setIsNotesUpdateNeeded(() => true);

          setItemNotes((itemNotes) => [
            ...itemNotes.slice(0, idx),
            { ...itemNotes[idx], noteBody: newNoteBody },
            ...itemNotes.slice(idx + 1),
          ]);
        }}
        placeholder="New note"
        style={{ flex: 1 }}
        value={note.noteBody}
      />
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>
          {new Date(parseFloat(note.dateModified)).toDateString()}
          {" @ "}
          {new Date(parseFloat(note.dateModified)).toLocaleTimeString()}
        </Text>
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
            setIsMenuOpen(() => false);
          }}
          visible={isMenuOpen}
        >
          <Menu.Item
            leadingIcon="content-duplicate"
            onPress={() => {
              setIsMenuOpen(() => false);

              nav.navigate("MoveNoteScreen", { noteId: note.noteId });
            }}
            title="Move/Duplicate"
          />
          <Menu.Item
            leadingIcon="delete"
            onPress={() => {
              db.transaction(
                (tx) => {
                  tx.executeSql(
                    `DELETE FROM notes WHERE noteId = ?`,
                    [note.noteId],
                    () => {
                      setItemNotes((notes) =>
                        notes.filter((r) => r.noteId !== note.noteId)
                      );
                    }
                  );
                },
                (err) => {
                  ToastAndroid.show(
                    "Something went wrong! Please try again later!",
                    ToastAndroid.SHORT
                  );

                  console.log(err);
                }
              );
            }}
            title="Delete"
          />
        </Menu>
      </View>
    </View>
  );
};
