import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface CustomerStatsData {
  users?: number,
  organizations?: number,
  active?: number
  disabled?: number
}

export interface CustomerStatsState extends AnyReduxState {
  data?: CustomerStatsData | null;
}

const initialState: CustomerStatsState = {
  loading: 'false',
  status: false,
  message: null,
  data: null
};

export const customerStatsSlice = createSlice({
  name: "customerStats",
  initialState,
  reducers: {
    updateCustomerStats: (
      state: CustomerStatsState,
      action: PayloadAction<CustomerStatsState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
  }
});

export const { updateCustomerStats } = customerStatsSlice.actions;

export default customerStatsSlice.reducer;
