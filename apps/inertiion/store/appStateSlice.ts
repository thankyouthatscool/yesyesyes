import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppStateState {
  isUploading: boolean;
}

const initialState: AppStateState = {
  isUploading: false,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setUploadingState: (state, { payload }: PayloadAction<boolean>) => {
      state.isUploading = payload;
    },
  },
});

export const { setUploadingState } = appStateSlice.actions;
