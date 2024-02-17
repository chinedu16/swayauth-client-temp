import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SubscriptionData {
  id?: string;
  amount?: number;
  subscription?: 'free' | 'standard' | 'premium';
  company_id?: string;
  created_at?: string;
}

export interface SubscriptionState extends AnyReduxState {
  data?: SubscriptionData | null;
}

const initialState: SubscriptionState = {
  status: false,
  message: null,
  data: null,
  loading: "false",
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    updateSubscription: (
      state: SubscriptionState,
      action: PayloadAction<SubscriptionState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
  },
});

export const { updateSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
