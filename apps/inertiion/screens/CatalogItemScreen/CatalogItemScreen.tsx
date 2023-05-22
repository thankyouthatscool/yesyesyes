import { useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import * as Crypto from "expo-crypto";
import { Image } from "expo-image";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Menu,
  Modal,
  Text,
  TextInput,
} from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setUploadingState, setSearchResult, setSearchTerm } from "@store";
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

const ENV = Constants.expoConfig?.extra?.ENV;

const API_URL =
  ENV === "development:win"
    ? "http://192.168.0.8:5000"
    : Constants.expoConfig?.extra?.API_URL!;

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export const CatalogItemScreen: FC<CatalogItemScreenNavProps> = ({
  navigation,
  route: {
    params: { itemId },
  },
}) => {
  const dispatch = useAppDispatch();

  const scrollViewRef = useRef<ScrollView>(null);

  const {
    databaseInstance: db,
    isUploading,
    searchTerm,
  } = useAppSelector(({ app, appState }) => ({
    ...app,
    ...appState,
  }));

  const [isImageSelectModalOpen, setIsImageSelectModalOpen] =
    useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isNotesUpdateNeeded, setIsNotesUpdateNeeded] =
    useState<boolean>(false);

  const [
    isDeleteItemConfirmationModalOpen,
    setIsDeleteItemConfirmationModalOpen,
  ] = useState<boolean>(false);

  const [isDisplayFullImage, setIsDisplayFullImage] = useState<boolean>(false);
  const [fullImageScreenURI, setFullScreenImageURI] = useState<string | null>(
    null
  );

  const [isUpdateNeeded, setIsUpdateNeeded] = useState<boolean>(false);
  const [isURLTextboxOpen, setIsURLTextboxOpen] = useState<boolean>(false);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [itemData, setItemData] = useState<CatalogItemInputWithId | null>(null);
  const [itemNotes, setItemNotes] = useState<ItemNote[]>([]);
  const [images, setImages] = useState<
    {
      referenceId: string;
      referenceType: "item" | "note";
      uri: string;
    }[]
  >([]);
  const [databaseImages, setDatabaseImages] = useState<
    {
      referenceId: string;
      referenceType: "item" | "note";
      uri: string;
    }[]
  >([]);

  // Section Toggles
  const [isItemInformationCollapsed, setIsItemInformationCollapsed] =
    useState<boolean>(false);
  const [isNotesSectionCollapsed, setIsNotesSectionCollapsed] =
    useState<boolean>(true);

  const { top } = useSafeAreaInsets();

  const handleGetImageData = useCallback(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM images WHERE referenceId = ?",
          [itemId],
          (_, { rows: { _array } }) => {
            setDatabaseImages(() =>
              _array.map((image) => ({ ...image, uri: image.imageLocation }))
            );
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }, [itemId]);

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
              !!location ? location.toUpperCase() : null,
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
              } catch (err) {
                console.log(err);
              }
            }
          );

          images.forEach((image) => {
            tx.executeSql(
              ` 
                INSERT INTO images
                VALUES (?, ?, ?, ?)
              `,
              [
                Crypto.randomUUID(),
                image.referenceId,
                image.referenceType,
                image.uri,
              ]
            );
          });

          setImages((images) => {
            setDatabaseImages((databaseImages) => [
              ...databaseImages,
              ...images,
            ]);

            return images.filter((image) => image.referenceType !== "item");
          });
        },
        (err) => console.log(err)
      );
      setIsUpdateNeeded(() => false);
    }
  }, [images, itemData]);

  const pickImage = useCallback(async (source: "camera" | "gallery") => {
    ToastAndroid.show("Picking an image", ToastAndroid.LONG);

    let res: ImagePicker.ImagePickerResult;

    if (source === "camera") {
      res = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
    } else {
      res = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
    }

    if (!res.canceled) {
      try {
        // TODO: Will need to upload!!!

        const selectedAssets = res.assets.map((asset) => ({
          referenceId: itemId,
          referenceType: "item" as const,
          uri: asset.uri,
        }));

        setIsImageSelectModalOpen(() => false);
        setImages((images) => [...images, ...selectedAssets]);
        setIsUpdateNeeded(() => true);
      } catch (err) {
        if (err instanceof Error) {
          ToastAndroid.show(err.message, ToastAndroid.LONG);

          console.log(err.message);
        } else {
          ToastAndroid.show("Something went wrong!", ToastAndroid.LONG);

          console.log(err);
        }
      }
    }
  }, []);

  useEffect(() => {
    handleGetItemData();
    handleGetImageData();
  }, [itemId]);

  useEffect(() => {
    ToastAndroid.show(
      images.map((image) => image.uri).join(", "),
      ToastAndroid.SHORT
    );
  }, [images]);

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
            setImages(() => []);

            navigation.goBack();
          }}
        >
          Back
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
              leadingIcon="image-area"
              onPress={() => {
                setIsImageSelectModalOpen(() => true);
                setIsMenuOpen(() => false);
              }}
              title="Add Image(s)"
            />
            <Menu.Item
              leadingIcon="plus"
              onPress={() => {
                console.log("will add to the item queue");
              }}
              title="Add to Queue"
            />
            <Menu.Item
              leadingIcon="delete"
              onPress={() => {
                setIsDeleteItemConfirmationModalOpen(() => true);
                setIsMenuOpen(() => false);
              }}
              title="Delete Item"
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

          {!![...databaseImages, ...images].filter(
            (image) => image.referenceType === "item"
          ).length && (
            <View>
              <Text variant="headlineSmall">Images</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[...databaseImages, ...images]
                  .filter((image) => image.referenceType === "item")
                  .map((image, idx) => (
                    <Pressable
                      key={`${image.uri}-${idx}`}
                      onPress={() => {
                        setIsDisplayFullImage(() => true);
                        setFullScreenImageURI(() => image.uri);
                      }}
                    >
                      <Image
                        contentFit="contain"
                        source={image.uri}
                        style={{
                          height: 120,
                          marginRight: defaultAppPadding / 2,
                          width: 90,
                        }}
                      />
                    </Pressable>
                  ))}
              </ScrollView>
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
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              {!!isNotesUpdateNeeded && (
                <Button
                  disabled={
                    !itemNotes.every((note) => !!note.noteBody) || !!isUploading
                  }
                  icon="content-save"
                  loading={isUploading}
                  mode="contained"
                  onPress={async () => {
                    dispatch(setUploadingState(true));

                    const imageUploadRes = await Promise.all(
                      images.map(
                        async ({ referenceId, referenceType, uri }) => {
                          const { body } = await FileSystem.uploadAsync(
                            `${API_URL}/uploadImage`,
                            uri,
                            {
                              httpMethod: "POST",
                              uploadType:
                                FileSystem.FileSystemUploadType.MULTIPART,
                              fieldName: "note_image",
                            }
                          );

                          const { imageId } = JSON.parse(body) as {
                            imageId: string;
                          };

                          return { imageId, referenceId, referenceType };
                        }
                      )
                    );

                    db.transaction(
                      (tx) => {
                        if (!!imageUploadRes.length) {
                          imageUploadRes.forEach(
                            ({ imageId, referenceId, referenceType }) => {
                              tx.executeSql(
                                `
                                  INSERT INTO images
                                  VALUES (?, ?, ?, ?)
                              `,
                                [
                                  Crypto.randomUUID(),
                                  referenceId,
                                  referenceType,
                                  imageId,
                                ]
                              );
                            }
                          );
                        }

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

                    setImages((images) =>
                      images.filter((image) => image.referenceType !== "note")
                    );

                    setIsNotesUpdateNeeded(() => false);

                    dispatch(setUploadingState(false));
                  }}
                >
                  Save
                </Button>
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
                disabled={!itemNotes.length}
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
                fullScreenActions={{
                  setFullScreenImageURI,
                  setIsDisplayFullImage,
                }}
                idx={idx}
                images={
                  !![].length
                    ? []
                    : images
                        .filter(
                          ({ referenceId }) => referenceId === note.noteId
                        )
                        .map(({ uri }) => uri)
                }
                key={note.noteId}
                note={note}
                onUpdate={{ setImages, setIsNotesUpdateNeeded, setItemNotes }}
                nav={navigation}
              />
            ))}
        </ScrollView>
      )}
      <Modal
        onDismiss={() => {
          setIsDeleteItemConfirmationModalOpen(() => false);
        }}
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
        visible={isDeleteItemConfirmationModalOpen}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: defaultAppPadding * 3,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text variant="titleLarge">Confirm DELETE?</Text>
            <IconButton icon="close" />
          </View>
          <Text variant="bodyLarge">Are you sure you want to delete:</Text>
          <Text>{itemData?.code}</Text>
          <Text>{itemData?.color}</Text>
          <Text>{itemData?.size}</Text>
          <Text>{itemData?.description}</Text>
          <Text>{itemData?.location}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: defaultAppPadding,
            }}
          >
            <Button
              mode="contained-tonal"
              onPress={() => {
                setIsDeleteItemConfirmationModalOpen(() => false);
              }}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                db.transaction(
                  (tx) => {
                    tx.executeSql(
                      `
                      DELETE FROM items
                      WHERE id = ?
                    `,
                      [itemId]
                    );
                  },
                  (err) => {
                    console.log(err.message);
                  }
                );

                setIsDeleteItemConfirmationModalOpen(() => false);

                dispatch(setSearchTerm(""));
                dispatch(setSearchResult([]));

                navigation.navigate("HomeScreen");
              }}
              style={{ marginLeft: defaultAppPadding }}
            >
              Delete
            </Button>
          </View>
        </View>
      </Modal>
      <Modal
        onDismiss={() => {
          setIsImageSelectModalOpen(() => false);
          setIsURLTextboxOpen(() => false);
        }}
        style={{
          paddingHorizontal: defaultAppPadding,
        }}
        visible={isImageSelectModalOpen}
      >
        <Card>
          <Card.Title
            right={(props) => (
              <IconButton
                {...props}
                icon="close"
                onPress={() => {
                  setIsImageSelectModalOpen(() => false);
                  setIsURLTextboxOpen(() => false);
                }}
              />
            )}
            title="Image(s) Source"
            titleVariant="titleLarge"
          />
          <ScrollView horizontal style={{ padding: defaultAppPadding }}>
            <Button
              icon="camera"
              mode="contained"
              onPress={() => {
                pickImage("camera");
              }}
              style={{ marginRight: defaultAppPadding / 2 }}
            >
              Camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              onPress={() => {
                pickImage("gallery");
              }}
              style={{ marginRight: defaultAppPadding / 2 }}
            >
              Gallery
            </Button>
            <Button
              icon="web"
              mode="contained"
              onPress={() => {
                setIsURLTextboxOpen(() => true);
              }}
            >
              URLs
            </Button>
          </ScrollView>
          {!!isURLTextboxOpen && (
            <View>
              <Card.Content>
                <TextInput
                  label="Image URLs"
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                  onChangeText={(text) => {
                    setImageURLs(() =>
                      text.split(/,|\n/).map((url) => url.trim())
                    );
                  }}
                  placeholder="Image URLs (comma/new line separated)"
                />
              </Card.Content>
              <Card.Actions>
                <Button
                  icon="cancel"
                  mode="contained"
                  onPress={() => {
                    setIsURLTextboxOpen(() => false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!imageURLs.filter((url) => !!url).length}
                  icon="content-save"
                  mode="contained"
                  onPress={() => {
                    setImages((images) => [
                      ...images,
                      ...imageURLs
                        .filter((url) => !!url)
                        .map((url) => ({
                          referenceId: itemId,
                          referenceType: "item" as const,
                          uri: url.trim(),
                        })),
                    ]);

                    setIsUpdateNeeded(() => true);
                    setIsImageSelectModalOpen(() => false);
                    setIsURLTextboxOpen(() => false);
                  }}
                >
                  Save
                </Button>
              </Card.Actions>
            </View>
          )}
        </Card>
      </Modal>
      {!!isDisplayFullImage && (
        <View
          style={{
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "red",
            height: "100%",
            justifyContent: "center",
            position: "absolute",
            top,
            width: SCREEN_WIDTH,
          }}
        >
          <Image
            contentFit="contain"
            source={fullImageScreenURI}
            style={{
              height: "75%",
              width: "75%",
            }}
          />

          <Button
            icon="close"
            mode="contained"
            onPress={() => {
              setIsDisplayFullImage(() => false);
              setFullScreenImageURI(() => null);
            }}
          >
            Close
          </Button>
        </View>
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
      isModified?: boolean;
    }[]
  >([]);

  // Section Toggles
  const [isStorageCollapsed, setIsStorageCollapsed] = useState<boolean>(false);

  const handleUpdateItemStorageData = useCallback(() => {
    itemStorageData.forEach(
      ({ storageId, storageLocation, itemId, cartons, pieces, isModified }) => {
        if (!isModified) return;

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
    console.log("🚀 ~ file: CatalogItemScreen.tsx:1132 ~ id:", id);

    db.transaction((tx) => {
      tx.executeSql(
        `
          SELECT * FROM storage 
          INNER JOIN items
          ON items.id = storage.itemId
          WHERE storage.storageId = ?`,
        [id],
        (_, { rows: { _array } }) => {
          console.log(
            "🚀 ~ file: CatalogItemScreen.tsx:1144 ~ db.transaction ~ _array:",
            _array
          );

          if (_array.length) {
            const { code, color, storageLocation, cartons, pieces } = _array[0];

            console.log(
              "🚀 ~ file: CatalogItemScreen.tsx:1148 ~ db.transaction ~ code, color, storageLocation, cartons, pieces :",
              code,
              color,
              storageLocation,
              cartons,
              pieces
            );

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
              ]
            );

            tx.executeSql(
              "DELETE FROM storage WHERE storageId = ?",
              [id],
              (_, { rows: { _array } }) => {
                console.log(
                  "🚀 ~ file: CatalogItemScreen.tsx:1153 ~ db.transaction ~ _array :",
                  _array
                );
              }
            );
          } else {
            console.log("only removing from mem");
          }

          setItemStorageData((itemStorageData) =>
            itemStorageData.filter((item) => item.storageId !== id)
          );
        }
      );
    });
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
                  isModified: true,
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
                          isModified: true,
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
                          isModified: true,
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
                          isModified: true,
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
  fullScreenActions: {
    setFullScreenImageURI: Dispatch<SetStateAction<string | null>>;
    setIsDisplayFullImage: Dispatch<SetStateAction<boolean>>;
  };
  idx: number;
  images: string[];
  note: ItemNote;
  onUpdate: {
    setImages: Dispatch<
      SetStateAction<
        {
          referenceId: string;
          referenceType: "item" | "note";
          uri: string;
        }[]
      >
    >;
    setIsNotesUpdateNeeded: Dispatch<SetStateAction<boolean>>;
    setItemNotes: Dispatch<SetStateAction<ItemNote[]>>;
  };
  nav: StorageComponentNav;
}> = ({
  fullScreenActions: { setFullScreenImageURI, setIsDisplayFullImage },
  idx,
  images,
  note,
  onUpdate: { setImages, setIsNotesUpdateNeeded, setItemNotes },
  nav,
}) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [noteImages, setNoteImages] = useState<string[]>([]);

  const handleUpdateNoteImages = useCallback(async (noteId: string) => {
    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!res.canceled) {
      setImages((images) => [
        ...images,
        {
          referenceId: noteId,
          referenceType: "note",
          uri: res.assets[0].uri,
        },
      ]);

      setIsNotesUpdateNeeded(() => true);
    }
  }, []);

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `
            SELECT * FROM images
            WHERE referenceId = ?
          `,
          [note.noteId],
          (_, { rows: { _array } }) => {
            setNoteImages(() => _array.map((item) => item.imageLocation));
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    setNoteImages((noteImages) =>
      Array.from(new Set([...noteImages, ...images]))
    );
  }, [images]);

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
      {!![...images, ...noteImages].length && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          style={{ flexDirection: "row", marginTop: defaultAppPadding }}
        >
          {[
            ...noteImages.map((image) =>
              image.startsWith("file")
                ? image
                : `${API_URL}/getImage/${image}.jpeg`
            ),
          ].map((image) => {
            return (
              <Pressable
                onPress={() => {
                  setFullScreenImageURI(() => image);
                  setIsDisplayFullImage(() => true);
                }}
                key={image}
              >
                <Image
                  contentFit="contain"
                  source={image}
                  style={{
                    borderRadius: 10,
                    height: 120,
                    width: 90,
                    marginRight: defaultAppPadding / 2,
                  }}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      )}
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
            leadingIcon="image-area"
            onPress={() => {
              setIsMenuOpen(() => false);

              handleUpdateNoteImages(note.noteId);
            }}
            title="Add Image(s)"
          />
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
