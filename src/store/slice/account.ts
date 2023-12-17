import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AccountData {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface AccountState extends AnyReduxState {
  data?: AccountData | null;
}

const initialState: AccountState = {
  status: false,
  message: null,
  data: null,
  loading: "false",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateAccount: (
      state: AccountState,
      action: PayloadAction<AccountState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
  },
});

export const { updateAccount } = accountSlice.actions;

export default accountSlice.reducer;
