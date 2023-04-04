import * as Crypto from "expo-crypto";

export const databaseItems = [
  // AH230
  ["AH230", "BLACK", null, "21B12", null],
  ["AH230", "NAVY", null, "21B11", null],

  // AH317
  ["AH317", "MARBLE", null, "21D31", null],

  // AH695
  ["AH695", "GREY, BLACK", "S/M", "21M11", null],

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
].map(
  (item) =>
    [Crypto.randomUUID(), ...item] as [
      string,
      string,
      string | null,
      string | null,
      string,
      string | null
    ]
);

export const sqlStatement = `INSERT INTO items (id, code, color, size, location, storage) VALUES ${databaseItems
  .map(() => `(?, ?, ?, ?, ?, ?)`)
  .join(", ")}`;
