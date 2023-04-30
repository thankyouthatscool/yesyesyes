// TODO: Move out of here
type DatabaseStorageItemWithoutDate = [string, string, string, number, number];

// TODO: Move out of here
export type DatabaseStorageItem = [...DatabaseStorageItemWithoutDate, string];

// Create Tables
export const sqlStatementCreateItemsTable =
  "CREATE TABLE IF NOT EXISTS items (id TEXT UNIQUE NOT NULL PRIMARY KEY, code TEXT NOT NULL, color TEXT, size TEXT, description TEXT, location TEXT NOT NULL)";

export const sqlStatementCreateLogsTable = `
  CREATE TABLE IF NOT EXISTS logs
  ( logId TEXT UNIQUE NOT NULL PRIMARY KEY, 
    referenceId TEXT NOT NULL, 
    operationType TEXT NOT NULL,
    description TEXT,
    userId TEXT NOT NULL,
    dateCreated TEXT NOT NULL
  )
`;

export const sqlStatementCreateNotesTable =
  "CREATE TABLE IF NOT EXISTS notes (noteId TEXT UNIQUE NOT NULL PRIMARY KEY, referenceId STRING NOT NULL, noteBody TEXT NOT NULL, dateModified TEXT NOT NULL)";

export const sqlStatementCreateStorageTable =
  "CREATE TABLE IF NOT EXISTS storage (storageId TEXT UNIQUE NOT NULL PRIMARY KEY, storageLocation TEXT NOT NULL, itemId STRING NOT NULL, cartons INTEGER NOT NULL, pieces INTEGER NOT NULL, dateModified TEXT NOT NULL, FOREIGN KEY (itemId) REFERENCES items (id))";
