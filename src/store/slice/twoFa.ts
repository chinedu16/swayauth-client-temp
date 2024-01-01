import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type twoFaData = ('app' | 'sms' | 'mail')[]

export interface TwoFaState extends AnyReduxState {
  data?: twoFaData | null;
}

const initialState: TwoFaState = {
  status: false,
  message: null,
  data: null,
  loading: "false",
};

export const twoFaSlice = createSlice({
  name: "twoFa",
  initialState,
  reducers: {
    updateTwoFa: (
      state: TwoFaState,
      action: PayloadAction<TwoFaState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
  },
});

export const { updateTwoFa } = twoFaSlice.actions;

export default twoFaSlice.reducer;
