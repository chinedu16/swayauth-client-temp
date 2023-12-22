import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AccountData {
  id?: string;
  first_name?: string;
  last_name?: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  ip_address?: string;
  status?: 'active' | 'disabled';
  verified?: boolean
  photo?: string;
  scope?: ('manual' | 'google' | 'facebook' | 'two_factor' | 'sms' | 'mail')[]
  two_factor_type?: 'app' | 'sms' | 'mail'
  company_id?: string | null
  created_at?: string
  company?: {
    name?: string
    email?: string
  },
  updated_at?: string
  association?: {
    permissions: ('read' | 'write' | 'delete')[]
    access: 'level_2' | 'level_3'
  }
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
