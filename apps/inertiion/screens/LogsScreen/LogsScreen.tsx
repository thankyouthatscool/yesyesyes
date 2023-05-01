import { FC, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@hooks";
import { LogsScreenProps } from "@types";
import { defaultAppPadding } from "@theme";
import { ScreenStackHeaderConfig } from "react-native-screens";
import { array } from "zod";

interface LogItem {
  dateCreated: string;
  description: string;
  logId: string;
  operationType: string;
  referenceId: string;
  userId: string;
}

const LOG_OFFSET_INCREMENT = 25;

export const LogsScreen: FC<LogsScreenProps> = ({ navigation }) => {
  const { databaseInstance: db } = useAppSelector(({ app }) => ({ ...app }));

  const [logs, setLogs] = useState<LogItem[]>([]);
  const [offset, setOffset] = useState<number | null>(null);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `
            SELECT *
            FROM logs
            ORDER BY dateCreated DESC
            LIMIT ${LOG_OFFSET_INCREMENT}
        `,
          [],
          (_, { rows: { _array } }) => {
            setLogs(() => _array);

            setOffset(() => LOG_OFFSET_INCREMENT);
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
      const { operationType, referenceId } = logs.find(
        (log) => log.logId === selectedLog
      )!;

      const [operation, target] = operationType
        .split(",")
        .map((op) => op.trim());

      console.log(operation);
      console.log(target);
      console.log(referenceId);
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
        <Text variant="headlineSmall">Logs</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {!selectedLog &&
            logs.map((log) => (
              <Card
                key={log.logId}
                // onPress={() => {
                // setSelectedLog(() => log.logId);
                // }}
                style={{
                  marginHorizontal: defaultAppPadding,
                  marginVertical: defaultAppPadding / 2,
                }}
              >
                <Card.Content>
                  <Text>{log.description}</Text>
                  <Text>
                    {new Date(parseInt(log.dateCreated)).toLocaleDateString()} @{" "}
                    {new Date(parseInt(log.dateCreated)).toLocaleTimeString()}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          <Button
            onPress={() => {
              db.transaction(
                (tx) => {
                  tx.executeSql(
                    `
                      SELECT *
                      FROM logs
                      ORDER BY dateCreated DESC
                      LIMIT ${LOG_OFFSET_INCREMENT}
                      OFFSET ?
                    `,
                    [offset],
                    (_, { rows: { _array } }) => {
                      console.log(_array);

                      setLogs((logs) => [...logs, ..._array]);
                    }
                  );
                },
                (err) => {
                  console.log(err);
                }
              );

              setOffset((offset) =>
                !!offset ? offset + LOG_OFFSET_INCREMENT : LOG_OFFSET_INCREMENT
              );
            }}
          >
            Load More
          </Button>
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
