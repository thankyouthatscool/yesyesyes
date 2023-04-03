import * as Crypto from "expo-crypto";

export const databaseItems: [
  string,
  string,
  string | null,
  string | null,
  string,
  string | null
][] = [
  // AH230
  [Crypto.randomUUID(), "AH230", "BLACK", null, "21B12", null],
  [Crypto.randomUUID(), "AH230", "NAVY", null, "21B11", null],

  // AH317
  [Crypto.randomUUID(), "AH317", "MARBLE", null, "21D31", null],

  // AH695
  [Crypto.randomUUID(), "AH695", "GREY, BLACK", "S/M", "21M11", null],

  // STS5050
  [Crypto.randomUUID(), "STS5050", "BLACK", "2XL", "12K41", null],
  [Crypto.randomUUID(), "STS5050", "BLACK", "2XS", "12K42", null],
  [Crypto.randomUUID(), "STS5050", "BLACK", "3XS", "12K42", null],
  [Crypto.randomUUID(), "STS5050", "BLACK", "L", "12K41", null],
  [Crypto.randomUUID(), "STS5050", "BLACK", "M", "12K31", null],
  [Crypto.randomUUID(), "STS5050", "BLACK", "S", "12K32", null],
  [Crypto.randomUUID(), "STS5050", "BLACK", "XL", "12K41", null],
  [Crypto.randomUUID(), "STS5050", "BLACK", "XS", "12K42", null],
  [Crypto.randomUUID(), "STS5050", "NAVY", "XS", "12K42", null],
  [Crypto.randomUUID(), "STS5050", "NAVY", "2XL", "12K41", null],
  [Crypto.randomUUID(), "STS5050", "NAVY", "2XS", "12K42", null],
  [Crypto.randomUUID(), "STS5050", "NAVY", "3XS", "12K42", null],
  [Crypto.randomUUID(), "STS5050", "NAVY", "L", "12K41", null],
  [Crypto.randomUUID(), "STS5050", "NAVY", "M", "12K31", null],
  [Crypto.randomUUID(), "STS5050", "NAVY", "S", "12K32", null],
  [Crypto.randomUUID(), "STS5050", "NAVY", "XL", "12K41", null],
];

export const sqlStatement = `INSERT INTO items (id, code, color, size, location, storage) VALUES ${databaseItems
  .map(() => `(?, ?, ?, ?, ?, ?)`)
  .join(", ")}`;
