import { FC, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@hooks";
import { RecentStorageScreenProps } from "@types";
import { defaultAppPadding } from "@theme";

interface StorageRes {
  cartons?: number;
  code: string;
  color: string;
  dateModified: string;
  description?: string;
  id: string;
  itemId: string;
  location: string;
  pieces: number;
  size?: string;
  storageId: string;
  storageLocation: string;
}

export const RecentStorage: FC<RecentStorageScreenProps> = ({ navigation }) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [recentStorageRes, setRecentStorageRes] = useState<StorageRes[]>([]);

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `
            SELECT * 
            FROM storage
            INNER JOIN items
            ON items.id = storage.itemId
            ORDER BY storage.dateModified DESC
            LIMIT 10
        `,
          [],
          (_, { rows: { _array } }) => {
            console.log(_array.map((r) => r.dateModified));

            setRecentStorageRes(() => _array);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView>
        <Text>Recent Storage</Text>
        {recentStorageRes.map((res) => (
          <Card
            key={res.storageId}
            onPress={() => {
              navigation.navigate("StorageLocationScreen", {
                locationName: res.storageLocation,
              });
            }}
            style={{
              marginHorizontal: defaultAppPadding,
              marginVertical: defaultAppPadding / 2,
            }}
          >
            <Card.Title
              title={res.storageLocation}
              titleVariant="headlineSmall"
            />
            <Card.Content>
              <Text>{res.storageLocation}</Text>
              <Text>{res.code}</Text>
              <Text>{res.color}</Text>
              <Text>{res.size}</Text>
              {res.dateModified.endsWith("Z") ? (
                <Text>
                  {new Date(res.dateModified).toLocaleDateString()} @{" "}
                  {new Date(res.dateModified).toLocaleTimeString()}
                </Text>
              ) : (
                <Text>
                  {new Date(parseFloat(res.dateModified)).toLocaleDateString()}{" "}
                  @{" "}
                  {new Date(parseFloat(res.dateModified)).toLocaleTimeString()}
                </Text>
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
