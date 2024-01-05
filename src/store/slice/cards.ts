import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface CardsData {
  id: string;
  first_6digit?: string;
  last_4digit?: string;
  exp_month?: string;
  exp_year?: string;
  country_code?: string;
  card_type?: string;
  bank?: string;
  account_name?: string;
  company_email?: string;
  created_at?: string
  updated_at?: string
}

export interface CardsState extends AnyReduxState {
  data?: CardsData[] | null;
}

const initialState: CardsState = {
  status: false,
  message: null,
  data: null,
  loading: "false",
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    updateCards: (
      state: CardsState,
      action: PayloadAction<CardsState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
  },
});

export const { updateCards } = cardsSlice.actions;

export default cardsSlice.reducer;
