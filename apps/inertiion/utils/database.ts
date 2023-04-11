import * as Crypto from "expo-crypto";

import { DatabaseItemInput, DatabaseItemInputWithId } from "@types";

export const items: DatabaseItemInput[] = [
  // AH230
  ["AH230", "BLACK", null, "Heavy Brushed Cotton Cap", "21B12"],
  ["AH230", "NAVY", null, "Heavy Brushed Cotton Cap", "21B11"],

  // AH317
  ["AH317", "MARBLE", null, "JK Cap", "21D31"],
  ["AH317", "ROYAL", null, "JK Cap", "21D31"],
  ["AH317", "RED", null, "JK Cap", "21D31"],
  ["AH317", "MAROON", null, "JK Cap", "21D31"],
  ["AH317", "BOTTLE", null, "JK Cap", "21D31"],

  // AH695
  ["AH695", "CHARCOAL, BLACK", "S/M", "HBC Sandwich Bucket Hat", "21M11"],
  ["AH695", "BLACK, RED", "S/M", "HBC Sandwich Bucket Hat", "21M11"],

  // AH711
  ["AH711", "BOTTLE", "55cm", "School Foam Hat", "Bay 4-1/5-1"],
  ["AH711", "BOTTLE", "57cm", "School Foam Hat", "Bay 7-2"],
  ["AH711", "BOTTLE", "59cm", "School Foam Hat", "Bay 4-2/5-2"],
  ["AH711", "BOTTLE", "61cm", "School Foam Hat", "Bay 2-2"],
  ["AH711", "MAROON", "55cm", "School Foam Hat", "Bay 6-1/7-1"],
  ["AH711", "MAROON", "57cm", "School Foam Hat", "Bay 6-2"],
  ["AH711", "MAROON", "59cm", "School Foam Hat", "Bay 3-2/4-2"],
  ["AH711", "MAROON", "61cm", "School Foam Hat", "Bay 1-2"],
  ["AH711", "NAVY", "55cm", "School Foam Hat", "Bay 5-1/6-1"],
  ["AH711", "NAVY", "57cm", "School Foam Hat", "Bay 6-2/7-2"],
  ["AH711", "NAVY", "59cm", "School Foam Hat", "Bay 4-2"],
  ["AH711", "NAVY", "61cm", "School Foam Hat", "Bay 1-2/2-2"],
  ["AH711", "ROYAL", "55cm", "School Foam Hat", "Bay 4-1"],
  ["AH711", "ROYAL", "57cm", "School Foam Hat", "Bay 7-1"],
  ["AH711", "ROYAL", "59cm", "School Foam Hat", "Bay 5-2/6-2"],
  ["AH711", "ROYAL", "61cm", "School Foam Hat", "Bay 3-2"],

  // AH776
  ["AH776", "NAVY", null, "Wrist Band 5 Inch", "1GW42"],
  ["AH776", "YELLOW", null, "Wrist Band 5 Inch", "1GW42"],
  ["AH776", "SKY", null, "Wrist Band 5 Inch", "1GW42"],
  ["AH776", "BOTTLE", null, "Wrist Band 5 Inch", "1GW42"],
  ["AH776", "PINK", null, "Wrist Band 5 Inch", "1GW42"],
  ["AH776", "RED", null, "Wrist Band 5 Inch", "1GW42"],
  ["AH776", "ROYAL", null, "Wrist Band 5 Inch", "1GW52"],
  ["AH776", "BLACK", null, "Wrist Band 5 Inch", "1GW32"],
  ["AH776", "ORANGE", null, "Wrist Band 5 Inch", "1GW42"],
  ["AH776", "WHITE", null, "Wrist Band 5 Inch", "1GW42"],

  // AH777
  ["AH777", "WHITE", null, "Headband", "1GW52"],
  ["AH777", "SKY", null, "Headband", "1GW52"],
  ["AH777", "RED", null, "Headband", "1GW52"],
  ["AH777", "BOTTLE", null, "Headband", "1GW52"],
  ["AH777", "YELLOW", null, "Headband", "1GW52"],
  ["AH777", "BLACK", null, "Headband", "1GW52"],
  ["AH777", "NAVY", null, "Headband", "1GW52"],
  ["AH777", "ROYAL", null, "Headband", "1GW52"],
  ["AH777", "ORANGE", null, "Headband", "1GW52"],
  ["AH777", "PINK", null, "Headband", "1GW52"],

  // G2000
  ["G2000", "BLACK", null, "Large Sports Bag", "1GE52"],
  ["G2000", "NAVY", null, "Large Sports Bag", "1GE52"],
  ["G2000", "RED, BLACK", null, "Large Sports Bag", "1GE42"],
  ["G2000", "ROYAL, BLACK", null, "Large Sports Bag", "1GE42"],

  // G2209
  ["G2209", "BLACK", null, "Belroy Backpack", "1GO11"],
  ["G2209", "NAVY", null, "Belroy Backpack", "1GO11"],

  // G3475
  ["G3475", "BLACK", null, "Shoe Bag", "1GO12"],

  // G5222
  ["G5222", "BLACK, BLACK", null, "Casual Sports Bag", "1GV11"],
  ["G5222", "BLACK, NAVY", null, "Casual Sports Bag", "1GV31"],
  ["G5222", "BLACK, ROYAL", null, "Casual Sports Bag", "1GV21"],

  // ST1333
  ["ST1333", "BLACK, APPLE GREEN", "8", "Centaur Polos", "12D41"],
  ["ST1333", "BLACK, APPLE GREEN", "10", "Centaur Polos", "12D51"],
  ["ST1333", "BLACK, APPLE GREEN", "12", "Centaur Polos", "12D51"],
  ["ST1333", "BLACK, APPLE GREEN", "14", "Centaur Polos", "12D51"],
  ["ST1333", "BLACK, APPLE GREEN", "16", "Centaur Polos", "12D41"],
  ["ST1333", "BLACK, APPLE GREEN", "18", "Centaur Polos", "12D51"],
  ["ST1333", "BLACK, APPLE GREEN", "20", "Centaur Polos", "12C31"],
  ["ST1333", "BLACK, APPLE GREEN", "22", "Centaur Polos", "12C21"],
  ["ST1333", "BLACK, APPLE GREEN", "S", "Centaur Polos", "12C32"],
  ["ST1333", "BLACK, APPLE GREEN", "M", "Centaur Polos", "12C32"],
  ["ST1333", "BLACK, APPLE GREEN", "L", "Centaur Polos", "12C42"],
  ["ST1333", "BLACK, APPLE GREEN", "XL", "Centaur Polos", "12C52"],
  ["ST1333", "BLACK, APPLE GREEN", "2XL", "Centaur Polos", "12C52"],
  ["ST1333", "BLACK, APPLE GREEN", "3XL", "Centaur Polos", "12D52"],
  ["ST1333", "BLACK, APPLE GREEN", "5XL", "Centaur Polos", "12D42"],
  ["ST1333", "BLACK, RED", "8", "Centaur Polos", "12D41"],
  ["ST1333", "BLACK, RED", "10", "Centaur Polos", "12D51"],
  ["ST1333", "BLACK, RED", "12", "Centaur Polos", "12D51"],
  ["ST1333", "BLACK, RED", "14", "Centaur Polos", "12C51"],
  ["ST1333", "BLACK, RED", "16", "Centaur Polos", "12C41"],
  ["ST1333", "BLACK, RED", "18", "Centaur Polos", "12C41"],
  ["ST1333", "BLACK, RED", "20", "Centaur Polos", "12C31"],
  ["ST1333", "BLACK, RED", "22", "Centaur Polos", "12C21"],
  ["ST1333", "BLACK, RED", "S", "Centaur Polos", "12C32"],
  ["ST1333", "BLACK, RED", "M", "Centaur Polos", "12C32"],
  ["ST1333", "BLACK, RED", "L", "Centaur Polos", "12C42"],
  ["ST1333", "BLACK, RED", "XL", "Centaur Polos", "12C52"],
  ["ST1333", "BLACK, RED", "2XL", "Centaur Polos", "12C52"],
  ["ST1333", "BLACK, RED", "3XL", "Centaur Polos", "12D52"],
  ["ST1333", "BLACK, RED", "5XL", "Centaur Polos", "12D42"],
  ["ST1333", "BOTTLE, WHITE", "8", "Centaur Polos", "12D41"],
  ["ST1333", "BOTTLE, WHITE", "10", "Centaur Polos", "12D51"],
  ["ST1333", "BOTTLE, WHITE", "12", "Centaur Polos", "12C51"],
  ["ST1333", "BOTTLE, WHITE", "14", "Centaur Polos", "12C51"],
  ["ST1333", "BOTTLE, WHITE", "16", "Centaur Polos", "12C41"],
  ["ST1333", "BOTTLE, WHITE", "18", "Centaur Polos", "12C31"],
  ["ST1333", "BOTTLE, WHITE", "20", "Centaur Polos", "12C31"],
  ["ST1333", "BOTTLE, WHITE", "22", "Centaur Polos", "12C22"],
  ["ST1333", "BOTTLE, WHITE", "S", "Centaur Polos", "12C32"],
  ["ST1333", "BOTTLE, WHITE", "M", "Centaur Polos", "12C42"],
  ["ST1333", "BOTTLE, WHITE", "L", "Centaur Polos", "12C42"],
  ["ST1333", "BOTTLE, WHITE", "XL", "Centaur Polos", "12C52"],
  ["ST1333", "BOTTLE, WHITE", "2XL", "Centaur Polos", "12D52"],
  ["ST1333", "BOTTLE, WHITE", "3XL", "Centaur Polos", "12D52"],
  ["ST1333", "BOTTLE, WHITE", "5XL", "Centaur Polos", "12D42"],
  ["ST1333", "NAVY, WHITE", "8", "Centaur Polos", "12D41"],
  ["ST1333", "NAVY, WHITE", "10", "Centaur Polos", "12D51"],
  ["ST1333", "NAVY, WHITE", "12", "Centaur Polos", "12C51"],
  ["ST1333", "NAVY, WHITE", "14", "Centaur Polos", "12C51"],
  ["ST1333", "NAVY, WHITE", "16", "Centaur Polos", "12C41"],
  ["ST1333", "NAVY, WHITE", "18", "Centaur Polos", "12C31"],
  ["ST1333", "NAVY, WHITE", "20", "Centaur Polos", "12C31"],
  ["ST1333", "NAVY, WHITE", "22", "Centaur Polos", "12C22"],
  ["ST1333", "NAVY, WHITE", "S", "Centaur Polos", "12C32"],
  ["ST1333", "NAVY, WHITE", "M", "Centaur Polos", "12C42"],
  ["ST1333", "NAVY, WHITE", "L", "Centaur Polos", "12C42"],
  ["ST1333", "NAVY, WHITE", "XL", "Centaur Polos", "12C52"],
  ["ST1333", "NAVY, WHITE", "2XL", "Centaur Polos", "12D52"],
  ["ST1333", "NAVY, WHITE", "3XL", "Centaur Polos", "12D52"],
  ["ST1333", "NAVY, WHITE", "5XL", "Centaur Polos", "12D42"],

  // STS5050
  ["STS5050", "BLACK", "2XL", "Sierra Shorts", "12K41"],
  ["STS5050", "BLACK", "2XS", "Sierra Shorts", "12K42"],
  ["STS5050", "BLACK", "3XS", "Sierra Shorts", "12K42"],
  ["STS5050", "BLACK", "L", "Sierra Shorts", "12K41"],
  ["STS5050", "BLACK", "M", "Sierra Shorts", "12K31"],
  ["STS5050", "BLACK", "S", "Sierra Shorts", "12K32"],
  ["STS5050", "BLACK", "XL", "Sierra Shorts", "12K41"],
  ["STS5050", "BLACK", "XS", "Sierra Shorts", "12K42"],
  ["STS5050", "NAVY", "XS", "Sierra Shorts", "12K42"],
  ["STS5050", "NAVY", "2XL", "Sierra Shorts", "12K41"],
  ["STS5050", "NAVY", "2XS", "Sierra Shorts", "12K42"],
  ["STS5050", "NAVY", "3XS", "Sierra Shorts", "12K42"],
  ["STS5050", "NAVY", "L", "Sierra Shorts", "12K41"],
  ["STS5050", "NAVY", "M", "Sierra Shorts", "12K31"],
  ["STS5050", "NAVY", "S", "Sierra Shorts", "12K32"],
  ["STS5050", "NAVY", "XL", "Sierra Shorts", "12K41"],
];

export const databaseItems = items.map(
  (item) => [Crypto.randomUUID() as string, ...item] as DatabaseItemInputWithId
);

// Create Tables
export const sqlStatementCreateItemsTable =
  "CREATE TABLE IF NOT EXISTS items (id TEXT UNIQUE NOT NULL PRIMARY KEY, code TEXT NOT NULL, color TEXT, size TEXT, description TEXT, location TEXT NOT NULL)";

export const sqlStatementCreateNotesTables =
  "CREATE TABLE IF NOT EXIST storage (id TEXT UNIQUE NOT NULL PRIMARY KEY)";

export const sqlStatementCreateStorageTable =
  "CREATE TABLE IF NOT EXIST notes (id TEXT UNIQUE NOT NULL PRIMARY KEY)";

// Seed Tables
export const sqlStatementSeedItemsTable = `INSERT INTO items (id, code, color, size, description, location) VALUES ${databaseItems
  .map(() => `(?, ?, ?, ?, ?, ?)`)
  .join(", ")}`;
