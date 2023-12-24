import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface WalletData {
  id?: string;
  amount?: number
}

export interface WalletState extends AnyReduxState {
  data?: WalletData | null;
}

const initialState: WalletState = {
  status: false,
  message: null,
  data: null,
  loading: "false",
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateWallet: (
      state: WalletState,
      action: PayloadAction<WalletState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
  },
});

export const { updateWallet } = walletSlice.actions;

export default walletSlice.reducer;
