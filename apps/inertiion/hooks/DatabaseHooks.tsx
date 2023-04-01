import * as SQLite from "expo-sqlite";
import { useCallback, useMemo } from "react";

export const useDatabaseHooks = () => {
  const db = useMemo(() => {
    console.log("opening a connection to the database");

    return SQLite.openDatabase("catalog.db");
  }, []);

  return {
    db,
    initDatabase: useCallback(() => {}, []),
  };
};
