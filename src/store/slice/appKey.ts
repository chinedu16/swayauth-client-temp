import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AppKeyData {
  id?: string;
  key?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppKeyState extends AnyReduxState {
  data?: AppKeyData | null;
}

const initialState: AppKeyState = {
  loading: "false",
  status: false,
  message: null,
  data: null,
};

export const appKetSlice = createSlice({
  name: "appKet",
  initialState,
  reducers: {
    updateAppKey: (
      state: AppKeyState,
      action: PayloadAction<AppKeyState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
  },
});

export const { updateAppKey } = appKetSlice.actions;

export default appKetSlice.reducer;
