import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface statsProp {
  loading: loading;
  count: number;
  duration: '7_days' | '14_days' | '30_days' | '6_months' | '1_year'
}

export interface StatisticData {
  users: statsProp
  sms: statsProp
  mail: statsProp
  google: statsProp
  facebook: statsProp
  manual: statsProp
}

export interface StatisticState extends AnyReduxState {
  data: StatisticData;
}

const initialStatProp: statsProp = {
  loading: 'false',
  count: 0,
  duration: '7_days'
}

const initialState: StatisticState = {
  loading: 'false',
  status: false,
  message: null,
  data: {
    users: initialStatProp,
    sms: initialStatProp,
    mail: initialStatProp,
    google: initialStatProp,
    facebook: initialStatProp,
    manual: initialStatProp,
  },
};

export const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    updateOneStat: (
      state: StatisticState,
      action: PayloadAction<{
        key: keyof StatisticData;
        loading?: loading,
        status?: boolean,
        message?: string
        data?: { duration: statsProp['duration'] } & { [K in keyof StatisticData]: number }
      }>
    ) => {
      state.data[action.payload.key].count = action.payload?.data?.[action.payload.key] ?? state.data[action.payload.key].count;
      state.data[action.payload.key].loading = action.payload.loading ?? state.data[action.payload.key].loading;
      state.data[action.payload.key].duration = action.payload?.data?.duration ?? state.data[action.payload.key].duration
      state.message = action.payload.message ?? state.message;
      state.status = action.payload.status ?? state.status;
    },
    updateStatistics: (
      state: StatisticState,
      action: PayloadAction<{
        loading?: loading,
        status?: boolean,
        message?: string
        data?: { duration: statsProp['duration'] } & { [K in keyof StatisticData]: number }
      }>
    ) => {
      if (action.payload.loading) {
        state.loading = action.payload.loading
        for (const key in state.data) {
          state.data[key as keyof StatisticData].loading = action.payload.loading
        }
      }
      if (action.payload.data) {
        for (const key in action.payload.data) {
          if (key !== 'duration')
            state.data[key as keyof StatisticData].count = action.payload.data[key as never] as number
        }
      }
      state.message = action.payload.message ?? state.message;
      state.status = action.payload.status ?? state.status;
    }
  },
});

export const { updateOneStat, updateStatistics } = statisticSlice.actions;

export default statisticSlice.reducer;
