import { FC, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Card,
  IconButton,
  RadioButton,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@hooks";
import { MoveNoteScreenProps } from "@types";
import { defaultAppPadding } from "@theme";

export const MoveNoteScreen: FC<MoveNoteScreenProps> = ({
  navigation,
  route: {
    params: { noteId },
  },
}) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [itemSearchTerm, setItemSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<
    {
      id: string;
      code: string;
      color?: string;
      size?: string;
      location: string;
      description?: string;
    }[]
  >([]);
  const [selectedOperation, setSelectedOperation] = useState<"copy" | "move">(
    "move"
  );
  const [targetNote, setTargetNote] = useState<
    | {
        dateModified: string;
        nodeBody: string;
        noteId: string;
        referenceId: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `
          SELECT *
          FROM notes
          WHERE noteId = ?
        `,
          [noteId],
          (_, { rows: { _array } }) => {
            setTargetNote(() => _array[0]);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    if (itemSearchTerm.length > 2) {
      console.log(itemSearchTerm);

      db.transaction(
        (tx) => {
          tx.executeSql(
            `
            SELECT *
            FROM items
            WHERE code LIKE ?
            OR location LIKE ?
          `,
            [`%${itemSearchTerm}%`, `%${itemSearchTerm}%`],
            (_, { rows: { _array } }) => {
              setSearchResult(() => _array);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [itemSearchTerm]);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <IconButton
            icon="arrow-left"
            mode="contained"
            onPress={() => {
              if (targetNote?.referenceId) {
                navigation.navigate("CatalogItemScreen", {
                  itemId: targetNote.referenceId,
                });
              } else {
                navigation.goBack();
              }
            }}
          />
          <Text variant="headlineSmall">Move Note Screen</Text>
        </View>
        <RadioButton.Group
          onValueChange={(op) => {
            setSelectedOperation(() => op as "copy" | "move");
          }}
          value={selectedOperation}
        >
          <RadioButton.Item
            label="Copy"
            labelVariant="titleLarge"
            value="copy"
          />
          <RadioButton.Item
            label="Move"
            labelVariant="titleLarge"
            value="move"
          />
        </RadioButton.Group>
        <TextInput
          label="Item Lookup"
          mode="outlined"
          onChangeText={(newItemSearchTerm) =>
            setItemSearchTerm(() => newItemSearchTerm)
          }
          placeholder="Lookup item by code or location"
          style={{
            marginHorizontal: defaultAppPadding,
            marginBottom: defaultAppPadding / 2,
          }}
          value={itemSearchTerm}
        />
        {itemSearchTerm.length > 2 &&
          !!searchResult.length &&
          searchResult.map((res) => (
            <Card
              key={res.id}
              style={{
                marginHorizontal: defaultAppPadding,
                marginVertical: defaultAppPadding / 2,
              }}
            >
              <Card.Content>
                <View style={{ flexDirection: "row" }}>
                  <Text>{res.code}</Text>
                  {!!res.color?.length && (
                    <View style={{ flexDirection: "row" }}>
                      <Text> | </Text>
                      <Text>{res.color}</Text>
                    </View>
                  )}
                  {!!res.size?.length && (
                    <View style={{ flexDirection: "row" }}>
                      <Text> | </Text>
                      <Text>{res.size}</Text>
                    </View>
                  )}
                  <View style={{ flexDirection: "row" }}>
                    <Text> | </Text>
                    <Text>{res.location}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};
