import * as Crypto from "expo-crypto";

import { DatabaseItemInput, DatabaseItemInputWithId } from "@types";

export const items: DatabaseItemInput[] = [
  // AH130
  ["AH130", "BLACK", null, "Enzyme Washed Cap", "11X31/41"],
  ["AH130", "BOTTLE", null, "Enzyme Washed Cap", "11X31"],
  ["AH130", "KHAKI", null, "Enzyme Washed Cap", "11X41"],
  ["AH130", "NAVY", null, "Enzyme Washed Cap", "11X41"],
  ["AH130", "ORANGE", null, "Enzyme Washed Cap", "11X41"],
  ["AH130", "RED", null, "Enzyme Washed Cap", "11X41"],

  // AH159
  ["AH159", "BLACK", null, "CAZAMATAZ Cap", "21D31"],
  ["AH159", "GREY", null, "CAZAMATAZ Cap", "21D31"],
  ["AH159", "MARBLE", null, "CAZAMATAZ Cap", "21D31"],
  ["AH159", "NAVY", null, "CAZAMATAZ Cap", "21D31"],
  ["AH159", "RED", null, "CAZAMATAZ Cap", "21D31"],
  ["AH159", "ROYAL", null, "CAZAMATAZ Cap", "21D31"],

  // AH163
  ["AH163", "BLACK", null, "Reflex Cap", "11H21"],
  ["AH163", "CHARCOAL", null, "Reflex Cap", "11H21"],
  ["AH163", "NAVY", null, "Reflex Cap", "11H21"],
  ["AH163", "WHITE", null, "Reflex Cap", "11H21"],

  // AH165
  ["AH165", "BEIGE", null, "Visor", "11O22"],

  // AH230
  ["AH230", "BLACK", null, "Heavy Brushed Cotton Cap", "21B12"],
  ["AH230", "NAVY", null, "Heavy Brushed Cotton Cap", "21B11"],

  // AH238
  ["AH238", "BLACK", null, "Cotton Back Coolde Cap", "11V31"],
  ["AH238", "NAVY", null, "Cotton Back Coolde Cap", "11V21/31"],
  ["AH238", "WHITE", null, "Cotton Back Coolde Cap", "11V31"],

  // AH295
  ["AH295", "BLACK", null, "Polymesh Trucker Cap", "11M11"],

  // AH317
  ["AH317", "MARBLE", null, "JK Cap", "21D31"],
  ["AH317", "ROYAL", null, "JK Cap", "21D31"],
  ["AH317", "RED", null, "JK Cap", "21D31"],
  ["AH317", "MAROON", null, "JK Cap", "21D31"],
  ["AH317", "BOTTLE", null, "JK Cap", "21D31"],

  // AH331
  ["AH331", "BLACK", null, "D-Lux 5 Panel Cap", "11T32"],
  ["AH331", "CHARCOAL", null, "D-Lux 5 Panel Cap", "11T42"],
  ["AH331", "MAROON", null, "D-Lux 5 Panel Cap", "11T42"],
  ["AH331", "NAVY", null, "D-Lux 5 Panel Cap", "11T32"],
  ["AH331", "OLIVE", null, "D-Lux 5 Panel Cap", "11T42"],
  ["AH331", "RED", null, "D-Lux 5 Panel Cap", "11T42"],

  // AH525
  ["AH525", "BLACK, WHITE, RED", null, "Adventure Cap", "11H41"],
  ["AH525", "BOTTLE, WHITE, RED", null, "Adventure Cap", "11H42"],
  ["AH525", "MAROON, WHITE, NAVY", null, "Adventure Cap", "11H42"],
  ["AH525", "NAVY, WHITE, GREY", null, "Adventure Cap", "11H41"],
  ["AH525", "NAVY, WHITE, RED", null, "Adventure Cap", "11H42"],
  ["AH525", "NAVY, WHITE, SKY BLUE", null, "Adventure Cap", "11H42"],
  ["AH525", "ROYAL, WHITE, BLACK", null, "Adventure Cap", "11H42"],
  ["AH525", "WHITE, RED, BLACK", null, "Adventure Cap", "11H42"],

  // AH695
  ["AH695", "CHARCOAL, BLACK", "S/M", "HBC Sandwich Bucket Hat", "21M11"],
  ["AH695", "BLACK, RED", "S/M", "HBC Sandwich Bucket Hat", "21M11"],

  // AH708
  ["AH708", "BOTTLE", "L/XL", "Polyviscose School Hat", "11Y31"],
  ["AH708", "BOTTLE", "S/M", "Polyviscose School Hat", "11Y31"],
  ["AH708", "BOTTLE", "S/S", "Polyviscose School Hat", "11Y41"],
  ["AH708", "MAROON", "L/XL", "Polyviscose School Hat", "11Y31"],
  ["AH708", "MAROON", "S/M", "Polyviscose School Hat", "11Y41"],
  ["AH708", "MAROON", "S/S", "Polyviscose School Hat", "11Y41"],
  ["AH708", "NAVY", "L/XL", "Polyviscose School Hat", "11Y31"],
  ["AH708", "NAVY", "S/M", "Polyviscose School Hat", "11Y41"],
  ["AH708", "NAVY", "S/S", "Polyviscose School Hat", "11Y41"],
  ["AH708", "ROYAL", "L/XL", "Polyviscose School Hat", "11Y31"],
  ["AH708", "ROYAL", "S/M", "Polyviscose School Hat", "11Y31"],
  ["AH708", "ROYAL", "S/S", "Polyviscose School Hat", "11Y41"],

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

  // AH715
  ["AH715", "BLACK", "L/XL", "Bucket Hat", "21J31"],
  ["AH715", "BLACK", "S/M", "Bucket Hat", "21J32"],
  ["AH715", "BLACK", "S/S", "Bucket Hat", "21K12"],
  ["AH715", "BOTTLE", "L/XL", "Bucket Hat", "21K21"],
  ["AH715", "BOTTLE", "S/M", "Bucket Hat", "21K22"],
  ["AH715", "BOTTLE", "S/S", "Bucket Hat", "21J12"],
  ["AH715", "BROWN", "L/XL", "Bucket Hat", "21K31"],
  ["AH715", "BROWN", "S/M", "Bucket Hat", "21K32"],
  ["AH715", "BROWN", "S/S", "Bucket Hat", "21K11"],
  ["AH715", "HOT PINK", "L/XL", "Bucket Hat", "21K21"],
  ["AH715", "HOT PINK", "S/M", "Bucket Hat", "21K22"],
  ["AH715", "HOT PINK", "S/S", "Bucket Hat", "21K22"],
  ["AH715", "KHAKI", "L/XL", "Bucket Hat", "21K31"],
  ["AH715", "KHAKI", "S/M", "Bucket Hat", "21K32"],
  ["AH715", "KHAKI", "S/S", "Bucket Hat", "21K11"],
  ["AH715", "MAROON", "L/XL", "Bucket Hat", "21J21"],
  ["AH715", "MAROON", "S/M", "Bucket Hat", "21J22"],
  ["AH715", "MAROON", "S/S", "Bucket Hat", "21K12"],
  ["AH715", "NAVY", "L/XL", "Bucket Hat", "21J21"],
  ["AH715", "NAVY", "S/M", "Bucket Hat", "21J22"],
  ["AH715", "NAVY", "S/S", "Bucket Hat", "21J12"],
  ["AH715", "RED", "L/XL", "Bucket Hat", "21J21"],
  ["AH715", "RED", "S/M", "Bucket Hat", "21J22"],
  ["AH715", "RED", "S/S", "Bucket Hat", "21K11"],
  ["AH715", "ROYAL", "L/XL", "Bucket Hat", "21J31"],
  ["AH715", "ROYAL", "S/M", "Bucket Hat", "21J32"],
  ["AH715", "ROYAL", "S/S", "Bucket Hat", "21K12"],
  ["AH715", "WHITE", "L/XL", "Bucket Hat", "21K31"],
  ["AH715", "WHITE", "S/M", "Bucket Hat", "21K32"],
  ["AH715", "WHITE", "S/S", "Bucket Hat", "21J12"],
  ["AH715", "YELLOW", "L/XL", "Bucket Hat", "21J31"],
  ["AH715", "YELLOW", "S/M", "Bucket Hat", "21J32"],
  ["AH715", "YELLOW", "S/S", "Bucket Hat", "21K21"],

  // AH718
  ["AH718", "DARK NAVY", "55cm", "Microfibre Surf Hat", "11R11"],
  ["AH718", "DARK NAVY", "57cm", "Microfibre Surf Hat", "11Q11"],
  ["AH718", "DARK NAVY", "59cm", "Microfibre Surf Hat", "11Q21"],
  ["AH718", "DARK NAVY", "61cm", "Microfibre Surf Hat", "11Q21"],
  ["AH718", "NATURAL", "55cm", "Microfibre Surf Hat", "11Q11"],
  ["AH718", "NATURAL", "57cm", "Microfibre Surf Hat", "11Q11"],
  ["AH718", "NATURAL", "59cm", "Microfibre Surf Hat", "11Q21"],
  ["AH718", "NATURAL", "61cm", "Microfibre Surf Hat", "11Q21"],

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

  // G1250
  ["G1250", "BLACK", null, "Team Bag", "1GD41"],
  ["G1250", "NAVY", null, "Team Bag", "1GD51"],
  ["G1250", "ORANGE, BLACK", null, "Team Bag", "1GD41/51"],
  ["G1250", "RED, BLACK", null, "Team Bag", "1GD31/41"],
  ["G1250", "ROYAL", null, "Team Bag", "1GD21/31"],
  ["G1250", "ROYAL, BLACK", null, "Team Bag", "1GD11"],
  ["G1250", "YELLOW, BLACK", null, "Team Bag", "1GD11/21"],

  // G1365
  ["G1365", "BLACK, WHITE", null, "Hurtley", "1GO31"],
  ["G1365", "NAVY, WHITE", null, "Hurtley", "1GO31"],

  // G1602
  ["G1602", "BLACK, WHITE, BLACK", null, "Precinct Backpack", "1GE22"],
  ["G1602", "GOLD, WHITE, BOTTLE", null, "Precinct Backpack", "1GE12"],
  ["G1602", "RED, WHITE, BLACK", null, "Precinct Backpack", "1GE32"],
  ["G1602", "ROYAL, GREY, BLACK", null, "Precinct Backpack", "1GE22"],
  ["G1602", "SKY, WHITE, NAVY", null, "Precinct Backpack", "1GE32"],

  // G2000
  ["G2000", "BLACK", null, "Large Sports Bag", "1GE52"],
  ["G2000", "NAVY", null, "Large Sports Bag", "1GE52"],
  ["G2000", "RED, BLACK", null, "Large Sports Bag", "1GE42"],
  ["G2000", "ROYAL, BLACK", null, "Large Sports Bag", "1GE42"],

  // AH2195
  ["AH2195", "BLACK", null, "Boxy Backpack", "1GQ31"],

  // G2002
  ["G2002", "BLACK", null, "Trolley Travel Bag", "1GX32"],

  // G2143
  ["G2143", "BLACK", null, "Vibe", "1GQ41"],

  // G2155
  ["G2155", "BLACK, WHITE, BLACK", null, "Backpack", "1GAA31/41"],
  ["G2155", "BLACK, WHITE, ROYAL", null, "Backpack", "1GAA41"],

  // G2195
  ["G2195", "BLACK", null, "Boxy", "1GQ31"],

  // G2209
  ["G2209", "BLACK", null, "Belroy Backpack", "1GO11"],
  ["G2209", "NAVY", null, "Belroy Backpack", "1GO11"],

  // G3475
  ["G3475", "BLACK", null, "Shoe Bag", "1GO12"],

  // G3620
  ["G3620", "BLACK", null, "Casual Backpack", "1GI52"],
  ["G3620", "MAROON", null, "Casual Backpack", "1GI52"],
  ["G3620", "NAVY", null, "Casual Backpack", "1GI32"],
  ["G3620", "ROYAL", null, "Casual Backpack", "1GI42"],
  ["G3620", "YELLOW", null, "Casual Backpack", "1GI32/42"],

  // G4688
  ["G4688", "BLACK", null, "Edge Cooler Bag", "1GL31"],
  ["G4688", "BOTTLE", null, "Edge Cooler Bag", "1GL11"],
  ["G4688", "NAVY", null, "Edge Cooler Bag", "1GL41"],
  ["G4688", "ROYAL", null, "Edge Cooler Bag", "1GL21"],

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

  // ST1485
  ["ST1485", "BLACK", "2XL", "Ashton Tees", "2GU43"],
  ["ST1485", "BLACK", "L", "Ashton Tees", "2GU33"],
  ["ST1485", "BLACK", "M", "Ashton Tees", "2GU33"],
  ["ST1485", "BLACK", "S", "Ashton Tees", "2GU23"],
  ["ST1485", "BLACK", "XL", "Ashton Tees", "2GU43"],
  ["ST1485", "NAVY", "2XL", "Ashton Tees", "2GU43"],
  ["ST1485", "NAVY", "L", "Ashton Tees", "2GU33"],
  ["ST1485", "NAVY", "M", "Ashton Tees", "2GU33"],
  ["ST1485", "NAVY", "S", "Ashton Tees", "2GU33"],
  ["ST1485", "NAVY", "XL", "Ashton Tees", "2GU43"],
  ["ST1485", "WHITE", "2XL", "Ashton Tees", "2GU43"],
  ["ST1485", "WHITE", "L", "Ashton Tees", "2GU43"],
  ["ST1485", "WHITE", "M", "Ashton Tees", "2GU33"],
  ["ST1485", "WHITE", "S", "Ashton Tees", "2GU33"],
  ["ST1485", "WHITE", "XL", "Ashton Tees", "2GU43"],

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

export const sqlStatementCreateNotesTable =
  "CREATE TABLE IF NOT EXISTS notes (id TEXT UNIQUE NOT NULL PRIMARY KEY, noteBody TEXT NOT NULL, dateModified TEXT NOT NULL)";

export const sqlStatementCreateStorageTable =
  "CREATE TABLE IF NOT EXISTS storage (id TEXT UNIQUE NOT NULL PRIMARY KEY, location TEXT NOT NULL, itemId STRING NOT NULL, cartons INTEGER NOT NULL, pieces INTEGER NOT NULL, dateModified TEXT NOT NULL, FOREIGN KEY (itemId) REFERENCES items (id))";

// Seed Tables
export const sqlStatementSeedItemsTable = `INSERT INTO items (id, code, color, size, description, location) VALUES ${databaseItems
  .map(() => `(?, ?, ?, ?, ?, ?)`)
  .join(", ")}`;

// Drop Tables
