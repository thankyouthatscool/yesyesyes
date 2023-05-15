import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppStateState {
  isCheckedQueueHidden: boolean;
  isUploading: boolean;
}

const initialState: AppStateState = {
  isCheckedQueueHidden: false,
  isUploading: false,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setIsCheckedQueueHidden: (state, { payload }: PayloadAction<boolean>) => {
      state.isCheckedQueueHidden = payload;
    },
    setUploadingState: (state, { payload }: PayloadAction<boolean>) => {
      state.isUploading = payload;
    },
  },
});

export const { setIsCheckedQueueHidden, setUploadingState } =
  appStateSlice.actions;
