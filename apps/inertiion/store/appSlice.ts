import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SQLite from "expo-sqlite";

import { AppState, CatalogItem, StorageLocationData } from "@types";

const initialState: AppState = {
  databaseInstance: SQLite.openDatabase("catalog.db"),
  itemQueue: [],
  itemQueueChecked: [],
  isFABCollapsed: true,
  searchResult: [],
  searchTerm: "",
  storageSearchTerm: "",

  // Storage Location Screen
  locationData: [],

  // Storage Screen - All Location Data
  allLocationData: [],
};

export const appSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    // FAB
    setFABState: (state, { payload }: PayloadAction<boolean>) => {
      state.isFABCollapsed = payload;
    },

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
    setStorageSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.storageSearchTerm = payload;
    },
    clearStorageSearchTerm: (state) => {
      state.storageSearchTerm = "";
    },

    // Storage Location Screen
    setStorageLocationData: (
      state,
      { payload }: PayloadAction<StorageLocationData[]>
    ) => {
      state.locationData = payload;
    },

    // All Location Data
    setAllLocationData: (
      state,
      { payload }: PayloadAction<StorageLocationData[]>
    ) => {
      state.allLocationData = payload;
    },
  },
});

export const {
  // FAB
  setFABState,

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
  setStorageSearchTerm,
  clearStorageSearchTerm,

  // Storage Location Screen
  setStorageLocationData,

  // All Location Data
  setAllLocationData,
} = appSlice.actions;
