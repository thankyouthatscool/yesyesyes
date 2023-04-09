import * as Crypto from "expo-crypto";

import { DatabaseItem, DatabaseItemWithId } from "@types";

export const items: DatabaseItem[] = [
  // AH230
  ["AH230", "BLACK", null, "Heavy Brushed Cotton Cap", "21B12", null],
  ["AH230", "NAVY", null, "Heavy Brushed Cotton Cap", "21B11", null],

  // AH317
  ["AH317", "MARBLE", null, "JK Cap", "21D31", null],
  ["AH317", "ROYAL", null, "JK Cap", "21D31", null],
  ["AH317", "RED", null, "JK Cap", "21D31", null],
  ["AH317", "MAROON", null, "JK Cap", "21D31", null],
  ["AH317", "BOTTLE", null, "JK Cap", "21D31", null],

  // AH695
  ["AH695", "CHARCOAL, BLACK", "S/M", "HBC Sandwich Bucket Hat", "21M11", null],
  ["AH695", "BLACK, RED", "S/M", "HBC Sandwich Bucket Hat", "21M11", null],

  // AH776
  ["AH776", "NAVY", null, "Wrist Band 5 Inch", "1GW42", null],
  ["AH776", "YELLOW", null, "Wrist Band 5 Inch", "1GW42", null],
  ["AH776", "SKY", null, "Wrist Band 5 Inch", "1GW42", null],
  ["AH776", "BOTTLE", null, "Wrist Band 5 Inch", "1GW42", null],
  ["AH776", "PINK", null, "Wrist Band 5 Inch", "1GW42", null],
  ["AH776", "RED", null, "Wrist Band 5 Inch", "1GW42", null],
  ["AH776", "ROYAL", null, "Wrist Band 5 Inch", "1GW52", null],
  ["AH776", "BLACK", null, "Wrist Band 5 Inch", "1GW32", null],
  ["AH776", "ORANGE", null, "Wrist Band 5 Inch", "1GW42", null],
  ["AH776", "WHITE", null, "Wrist Band 5 Inch", "1GW42", null],

  // AH777
  ["AH777", "WHITE", null, "Headband", "1GW52", null],
  ["AH777", "SKY", null, "Headband", "1GW52", null],
  ["AH777", "RED", null, "Headband", "1GW52", null],
  ["AH777", "BOTTLE", null, "Headband", "1GW52", null],
  ["AH777", "YELLOW", null, "Headband", "1GW52", null],
  ["AH777", "BLACK", null, "Headband", "1GW52", null],
  ["AH777", "NAVY", null, "Headband", "1GW52", null],
  ["AH777", "ROYAL", null, "Headband", "1GW52", null],
  ["AH777", "ORANGE", null, "Headband", "1GW52", null],
  ["AH777", "PINK", null, "Headband", "1GW52", null],

  // ST1333
  ["ST1333", "BLACK, APPLE GREEN", "10", "Centaur Polos", "12D51", null],
  ["ST1333", "BLACK, APPLE GREEN", "12", "Centaur Polos", "12D51", null],
  ["ST1333", "BLACK, APPLE GREEN", "14", "Centaur Polos", "12D51", null],
  ["ST1333", "BLACK, APPLE GREEN", "16", "Centaur Polos", "12D41", null],
  ["ST1333", "BLACK, APPLE GREEN", "18", "Centaur Polos", "12D51", null],

  // STS5050
  ["STS5050", "BLACK", "2XL", "Sierra Shorts", "12K41", null],
  ["STS5050", "BLACK", "2XS", "Sierra Shorts", "12K42", null],
  ["STS5050", "BLACK", "3XS", "Sierra Shorts", "12K42", null],
  ["STS5050", "BLACK", "L", "Sierra Shorts", "12K41", null],
  ["STS5050", "BLACK", "M", "Sierra Shorts", "12K31", null],
  ["STS5050", "BLACK", "S", "Sierra Shorts", "12K32", null],
  ["STS5050", "BLACK", "XL", "Sierra Shorts", "12K41", null],
  ["STS5050", "BLACK", "XS", "Sierra Shorts", "12K42", null],
  ["STS5050", "NAVY", "XS", "Sierra Shorts", "12K42", null],
  ["STS5050", "NAVY", "2XL", "Sierra Shorts", "12K41", null],
  ["STS5050", "NAVY", "2XS", "Sierra Shorts", "12K42", null],
  ["STS5050", "NAVY", "3XS", "Sierra Shorts", "12K42", null],
  ["STS5050", "NAVY", "L", "Sierra Shorts", "12K41", null],
  ["STS5050", "NAVY", "M", "Sierra Shorts", "12K31", null],
  ["STS5050", "NAVY", "S", "Sierra Shorts", "12K32", null],
  ["STS5050", "NAVY", "XL", "Sierra Shorts", "12K41", null],
];

export const databaseItems = items.map(
  (item) => [Crypto.randomUUID() as string, ...item] as DatabaseItemWithId
);

export const sqlStatementCreateItemsTable =
  "CREATE TABLE IF NOT EXISTS items (id TEXT UNIQUE NOT NULL PRIMARY KEY, code TEXT NOT NULL, color TEXT, size TEXT, description TEXT, location TEXT NOT NULL, storage TEXT)";

export const sqlStatementSeedItemsTable = `INSERT INTO items (id, code, color, size, description, location, storage) VALUES ${databaseItems
  .map(() => `(?, ?, ?, ?, ?, ?, ?)`)
  .join(", ")}`;
