import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SQLite from "expo-sqlite";

import { AppState } from "@types";

const initialState: AppState = {
  databaseInstance: SQLite.openDatabase("catalog.db"),
  searchTerm: "",
};

export const appSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.searchTerm = payload;
    },
  },
});

export const { setSearchTerm } = appSlice.actions;
