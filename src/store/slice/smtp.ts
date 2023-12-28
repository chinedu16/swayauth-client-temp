import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SmtpData {
  id?: string;
  company_name?: string;
  verified?: boolean;
  website?: string;
  email?: string;
  photo?: string | null;
  username?: string;
  host?: string;
  company_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SmtpState extends AnyReduxState {
  data?: SmtpData | null;
}

const initialState: SmtpState = {
  status: false,
  message: null,
  data: null,
  loading: "false",
};

export const smtpSlice = createSlice({
  name: "smtp",
  initialState,
  reducers: {
    updateSmtp: (
      state: SmtpState,
      action: PayloadAction<SmtpState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
  },
});

export const { updateSmtp } = smtpSlice.actions;

export default smtpSlice.reducer;
