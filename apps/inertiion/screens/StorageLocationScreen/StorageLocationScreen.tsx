import { FC, useCallback, useEffect } from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@hooks";
import { StorageLocationScreenProps } from "@types";

export const StorageLocationScreen: FC<StorageLocationScreenProps> = ({
  navigation,
  route: {
    params: { locationName },
  },
}) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const handleLoadLocationData = useCallback(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `  
            SELECT * 
            FROM storage
            INNER JOIN items
            ON items.id = storage.itemId
            WHERE storage.location = ?
            `,
          [locationName],
          (_, { rows: { _array } }) => {
            console.log(_array);
            console.log(_array.length);
          }
        );
      },
      (err) => console.log(err)
    );
  }, [locationName]);

  useEffect(() => {
    if (!!locationName) {
      handleLoadLocationData();
    }
  }, [locationName]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Storage Location Screen</Text>
        <Text>{locationName}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
