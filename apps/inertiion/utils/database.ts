import * as Crypto from "expo-crypto";

import { DatabaseItemInput, DatabaseItemInputWithId } from "@types";

export const items: DatabaseItemInput[] = [
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

  // AH711
  ["AH711", "BOTTLE", "55cm", "School Foam Hat", "Bay 4-1/5-1", null],
  ["AH711", "BOTTLE", "57cm", "School Foam Hat", "Bay 7-2", null],
  ["AH711", "BOTTLE", "59cm", "School Foam Hat", "Bay 4-2/5-2", null],
  ["AH711", "BOTTLE", "61cm", "School Foam Hat", "Bay 2-2", null],
  ["AH711", "MAROON", "55cm", "School Foam Hat", "Bay 6-1/7-1", null],
  ["AH711", "MAROON", "57cm", "School Foam Hat", "Bay 6-2", null],
  ["AH711", "MAROON", "59cm", "School Foam Hat", "Bay 3-2/4-2", null],
  ["AH711", "MAROON", "61cm", "School Foam Hat", "Bay 1-2", null],
  ["AH711", "NAVY", "55cm", "School Foam Hat", "Bay 5-1/6-1", null],
  ["AH711", "NAVY", "57cm", "School Foam Hat", "Bay 6-2/7-2", null],
  ["AH711", "NAVY", "59cm", "School Foam Hat", "Bay 4-2", null],
  ["AH711", "NAVY", "61cm", "School Foam Hat", "Bay 1-2/2-2", null],
  ["AH711", "ROYAL", "55cm", "School Foam Hat", "Bay 4-1", null],
  ["AH711", "ROYAL", "57cm", "School Foam Hat", "Bay 7-1", null],
  ["AH711", "ROYAL", "59cm", "School Foam Hat", "Bay 5-2/6-2", null],
  ["AH711", "ROYAL", "61cm", "School Foam Hat", "Bay 3-2", null],

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

  // G2000
  ["G2000", "BLACK", null, "Large Sports Bag", "1GE52", null],
  ["G2000", "NAVY", null, "Large Sports Bag", "1GE52", null],
  ["G2000", "RED, BLACK", null, "Large Sports Bag", "1GE42", null],
  ["G2000", "ROYAL, BLACK", null, "Large Sports Bag", "1GE42", null],

  // G2209
  ["G2209", "BLACK", null, "Belroy Backpack", "1GO11", null],
  ["G2209", "NAVY", null, "Belroy Backpack", "1GO11", null],

  // G3475
  ["G3475", "BLACK", null, "Shoe Bag", "1GO12", null],

  // G5222
  ["G5222", "BLACK, BLACK", null, "Casual Sports Bag", "1GV11", null],
  ["G5222", "BLACK, NAVY", null, "Casual Sports Bag", "1GV31", null],
  ["G5222", "BLACK, ROYAL", null, "Casual Sports Bag", "1GV21", null],

  // ST1333
  ["ST1333", "BLACK, APPLE GREEN", "10", "Centaur Polos", "12D51", null],
  ["ST1333", "BLACK, APPLE GREEN", "12", "Centaur Polos", "12D51", null],
  ["ST1333", "BLACK, APPLE GREEN", "14", "Centaur Polos", "12D51", null],
  ["ST1333", "BLACK, APPLE GREEN", "16", "Centaur Polos", "12D41", null],
  ["ST1333", "BLACK, APPLE GREEN", "18", "Centaur Polos", "12D51", null],
  ["ST1333", "BLACK, APPLE GREEN", "20", "Centaur Polos", "12C31", null],
  ["ST1333", "BLACK, APPLE GREEN", "22", "Centaur Polos", "12C21", null],
  ["ST1333", "BLACK, APPLE GREEN", "2XL", "Centaur Polos", "12C52", null],
  ["ST1333", "BLACK, APPLE GREEN", "3XL", "Centaur Polos", "12C52", null],
  ["ST1333", "BLACK, APPLE GREEN", "5XL", "Centaur Polos", "12C42", null],

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
  (item) => [Crypto.randomUUID() as string, ...item] as DatabaseItemInputWithId
);

// Create Tables
export const sqlStatementCreateItemsTable =
  "CREATE TABLE IF NOT EXISTS items (id TEXT UNIQUE NOT NULL PRIMARY KEY, code TEXT NOT NULL, color TEXT, size TEXT, description TEXT, location TEXT NOT NULL, storage TEXT)";

export const sqlStatementCreateNotesTables =
  "CREATE TABLE IF NOT EXIST storage (id TEXT UNIQUE NOT NULL PRIMARY KEY)";

export const sqlStatementCreateStorageTable =
  "CREATE TABLE IF NOT EXIST notes (id TEXT UNIQUE NOT NULL PRIMARY KEY)";

// Seed Tables
export const sqlStatementSeedItemsTable = `INSERT INTO items (id, code, color, size, description, location, storage) VALUES ${databaseItems
  .map(() => `(?, ?, ?, ?, ?, ?, ?)`)
  .join(", ")}`;
