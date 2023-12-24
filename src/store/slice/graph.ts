import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type duration = '7_days' | '30_days' | '6_months' | '1_year'

export interface GraphData {
  register: {
    graph: number[];
    loading: loading;
    duration: duration
    format: "7" | "30" | "180" | "360";
  },
  login: {
    google: number
    facebook: number
    manual: number
    loading: loading;
    duration: duration
  }
}

export interface GraphState extends AnyReduxState {
  data: GraphData;
}

const initialState: GraphState = {
  loading: 'false',
  status: false,
  message: null,
  data: {
    register: {
      loading: 'false',
      duration: '7_days',
      format: '7',
      graph: []
    },
    login: {
      loading: 'false',
      duration: '7_days',
      facebook: 0,
      google: 0,
      manual: 0
    }
  },
};

export const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    updateRegister: (state: GraphState, action: PayloadAction<AnyReduxState<{
      graph: number[],
      duration: duration
    }>>) => {
      if (action.payload.loading) {
        if (state.loading === 'false') {
          state.loading = action.payload.loading
        }
        state.data.register.loading = action.payload.loading
      }
      if (action.payload.data) {
        const d = action.payload.data.duration
        state.data.register.graph = action.payload.data.graph
        state.data.register.duration = d
        state.data.register.format = d == '7_days' ? '7' : d == '30_days' ? '30' : d == '6_months' ? '180' : '360'
      }
      state.message = action.payload.message ?? state.message;
      state.status = action.payload.status ?? state.status;
    },
    updateLogin: (state: GraphState, action: PayloadAction<AnyReduxState<{
      facebook: number
      google: number
      manual: number
      duration: duration
    }>>) => {
      if (action.payload.loading) {
        if (state.loading === 'false') {
          state.loading = action.payload.loading
        }
        state.data.login.loading = action.payload.loading
      }
      if (action.payload.data) {
        state.data.login.duration = action.payload.data.duration
        state.data.login.facebook = action.payload.data.facebook
        state.data.login.google = action.payload.data.google
        state.data.login.manual = action.payload.data.manual
        console.log(JSON.stringify(state.data))
      }
      state.message = action.payload.message ?? state.message;
      state.status = action.payload.status ?? state.status;
    }
  },
});

export const { updateLogin, updateRegister } = graphSlice.actions;

export default graphSlice.reducer;
