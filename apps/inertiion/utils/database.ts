import * as Crypto from "expo-crypto";

import { DatabaseItem, DatabaseItemWithId } from "@types";

export const items: DatabaseItem[] = [
  // AH230
  ["AH230", "BLACK", null, "21B12", null],
  ["AH230", "NAVY", null, "21B11", null],

  // AH317
  ["AH317", "MARBLE", null, "21D31", null],

  // AH695
  ["AH695", "GREY, BLACK", "S/M", "21M11", null],

  // AH776
  ["AH776", "NAVY", null, "1GW42", null],
  ["AH776", "YELLOW", null, "1GW42", null],
  ["AH776", "SKY", null, "1GW42", null],
  ["AH776", "BOTTLE", null, "1GW42", null],
  ["AH776", "PINK", null, "1GW42", null],
  ["AH776", "RED", null, "1GW42", null],
  ["AH776", "ROYAL", null, "1GW52", null],
  ["AH776", "BLACK", null, "1GW32", null],
  ["AH776", "ORANGE", null, "1GW42", null],
  ["AH776", "WHITE", null, "1GW42", null],

  // AH777
  ["AH777", "WHITE", null, "1GW52", null],
  ["AH777", "SKY", null, "1GW52", null],
  ["AH777", "RED", null, "1GW52", null],
  ["AH777", "BOTTLE", null, "1GW52", null],
  ["AH777", "YELLOW", null, "1GW52", null],
  ["AH777", "BLACK", null, "1GW52", null],
  ["AH777", "NAVY", null, "1GW52", null],
  ["AH777", "ROYAL", null, "1GW52", null],
  ["AH777", "ORANGE", null, "1GW52", null],
  ["AH777", "PINK", null, "1GW52", null],

  // STS1333
  ["STS1333", "BLACK, APPLE GREEN", "10", "12D51", null],
  ["STS1333", "BLACK, APPLE GREEN", "12", "12D51", null],
  ["STS1333", "BLACK, APPLE GREEN", "14", "12D51", null],
  ["STS1333", "BLACK, APPLE GREEN", "16", "12D41", null],
  ["STS1333", "BLACK, APPLE GREEN", "18", "12D51", null],

  // STS5050
  ["STS5050", "BLACK", "2XL", "12K41", null],
  ["STS5050", "BLACK", "2XS", "12K42", null],
  ["STS5050", "BLACK", "3XS", "12K42", null],
  ["STS5050", "BLACK", "L", "12K41", null],
  ["STS5050", "BLACK", "M", "12K31", null],
  ["STS5050", "BLACK", "S", "12K32", null],
  ["STS5050", "BLACK", "XL", "12K41", null],
  ["STS5050", "BLACK", "XS", "12K42", null],
  ["STS5050", "NAVY", "XS", "12K42", null],
  ["STS5050", "NAVY", "2XL", "12K41", null],
  ["STS5050", "NAVY", "2XS", "12K42", null],
  ["STS5050", "NAVY", "3XS", "12K42", null],
  ["STS5050", "NAVY", "L", "12K41", null],
  ["STS5050", "NAVY", "M", "12K31", null],
  ["STS5050", "NAVY", "S", "12K32", null],
  ["STS5050", "NAVY", "XL", "12K41", null],
];

export const databaseItems = items.map(
  (item) => [Crypto.randomUUID() as string, ...item] as DatabaseItemWithId
);

export const sqlStatement = `INSERT INTO items (id, code, color, size, location, storage) VALUES ${databaseItems
  .map(() => `(?, ?, ?, ?, ?, ?)`)
  .join(", ")}`;
