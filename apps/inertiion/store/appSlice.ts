import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SQLite from "expo-sqlite";

import { AppState } from "@types";

const initialState: AppState = {
  databaseInstance: SQLite.openDatabase("catalog.db"),
  itemQueue: [],
  searchTerm: "",
};

export const appSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    // Item queue
    setItemQueue: (state, { payload }: PayloadAction<string[]>) => {
      state.itemQueue = payload;
    },
    addToItemQueue: (state, { payload }: PayloadAction<string>) => {
      state.itemQueue = Array.from(new Set([...state.itemQueue, payload]));
    },
    removeFromItemQueue: (state, { payload }: PayloadAction<string>) => {
      state.itemQueue = state.itemQueue.filter((itemId) => itemId !== payload);
    },
    clearItemQueue: (state) => {
      state.itemQueue = [];
    },
    // Search term
    setSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.searchTerm = payload;
    },
  },
});

export const {
  // Item queue
  setItemQueue,
  addToItemQueue,
  removeFromItemQueue,
  clearItemQueue,
  // Search term
  setSearchTerm,
} = appSlice.actions;
