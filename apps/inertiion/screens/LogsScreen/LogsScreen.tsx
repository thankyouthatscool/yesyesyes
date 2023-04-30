import { FC, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@hooks";
import { LogsScreenProps } from "@types";
import { defaultAppPadding } from "@theme";

interface LogItem {
  dateCreated: string;
  description: string;
  logId: string;
  operationType: "delete" | "update";
  referenceId: string;
  userId: string;
}

export const LogsScreen: FC<LogsScreenProps> = ({ navigation }) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [logs, setLogs] = useState<LogItem[]>([]);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `
            SELECT *
            FROM logs
            ORDER BY dateCreated DESC
            LIMIT 100
        `,
          [],
          (_, { rows: { _array } }) => {
            setLogs(() => _array);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    if (!!selectedLog) {
      console.log(selectedLog);

      console.log(logs.find((log) => log.logId === selectedLog));
    }
  }, [logs, selectedLog]);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <IconButton
          icon="arrow-left"
          mode="contained"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text>Logs Screen</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {!selectedLog &&
            logs.map((log) => (
              <Card
                key={log.logId}
                onPress={() => {
                  setSelectedLog(() => log.logId);
                }}
                style={{
                  marginHorizontal: defaultAppPadding,
                  marginVertical: defaultAppPadding / 2,
                }}
              >
                <Card.Content>
                  <Text>{log.description}</Text>
                </Card.Content>
              </Card>
            ))}

          {!!selectedLog && (
            <View>
              <Button
                mode="contained"
                onPress={() => {
                  setSelectedLog(() => null);
                }}
              >
                Unselect
              </Button>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
