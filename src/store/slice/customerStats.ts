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
    updateCustomerStatus: (
      state: CustomerStatsState,
      action: PayloadAction<{ count: number, status: 'disabled' | 'active' }>
    ) => {
      if (state.data?.active || state.data?.disabled) {
        if (action.payload.status == 'active') {
          state.data.active = (state.data.active || 0) + action.payload.count;
          state.data.disabled = (state.data.disabled || 0) - action.payload.count
        } else {
          state.data.active = (state.data.active || 0) - action.payload.count
          state.data.disabled = (state.data.disabled || 0) + action.payload.count
        }
      }
    },
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

export const { updateCustomerStats, updateCustomerStatus } = customerStatsSlice.actions;

export default customerStatsSlice.reducer;
