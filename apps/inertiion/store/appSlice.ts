import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SQLite from "expo-sqlite";

import { AppState, CatalogItem } from "@types";

const initialState: AppState = {
  databaseInstance: SQLite.openDatabase("catalog.db"),
  itemQueue: [],
  itemQueueChecked: [],
  searchResult: [],
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
    setItemQueueChecked: (state, { payload }: PayloadAction<string[]>) => {
      state.itemQueueChecked = payload;
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

    // Search Result
    setSearchResult: (state, { payload }: PayloadAction<CatalogItem[]>) => {
      state.searchResult = payload;
    },
    clearSearchResult: (state) => {
      state.searchResult = [];
    },

    // Search term
    setSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.searchTerm = payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },
});

export const {
  // Item Queue
  setItemQueue,
  setItemQueueChecked,
  addToItemQueue,
  removeFromItemQueue,
  clearItemQueue,

  // Search Result
  setSearchResult,
  clearSearchResult,

  // Search Term
  setSearchTerm,
  clearSearchTerm,
} = appSlice.actions;
