import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CatalogItem, CatalogState } from "@types";

const initialState: CatalogState = {
  items: [],
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    addCatalogItem: (state, { payload }: PayloadAction<CatalogItem>) => {
      state.items = [...state.items, payload];
    },
    setCatalogItems: (state, { payload }: PayloadAction<CatalogItem[]>) => {
      state.items = payload;
    },
  },
});

export const { addCatalogItem, setCatalogItems } = catalogSlice.actions;
