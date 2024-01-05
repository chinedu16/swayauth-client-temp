import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface TransactionsData {
  id: string;
  amount?: number;
  type?: 'wallet';
  status?: 'failed' | 'pending' | 'success';
  reference?: string
  purpose?: string
  company_id?: string
  created_at?: string
  updated_at?: string
}

export interface TransactionsState extends AnyReduxState {
  data?: TransactionsData[] | null;
}

const initialState: TransactionsState = {
  status: false,
  message: null,
  data: null,
  loading: "false",
};

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    updateTransactions: (
      state: TransactionsState,
      action: PayloadAction<TransactionsState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
  },
});

export const { updateTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
