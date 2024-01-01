import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface TeamData {
  id?: string;
  first_name?: string;
  last_name?: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  status?: 'active' | 'disabled';
  verified?: boolean
  photo?: string;
  scope?: ('manual' | 'google' | 'facebook' | 'two_factor' | 'sms' | 'mail')[]
  two_factor_type?: 'app' | 'sms' | 'mail'
  company_id?: string | null
  created_at?: string
  association?: {
    permissions: ('read' | 'write' | 'delete')[]
    access: 'level_2' | 'level_3'
  }
  updated_at?: string
  email?: string;
}

export interface TeamState extends AnyReduxState {
  data?: TeamData[] | null;
}

const initialState: TeamState = {
  loading: "false",
  status: false,
  message: null,
  data: null,
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    updateTeam: (
      state: TeamState,
      action: PayloadAction<TeamState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
    pushATeamMember: (
      state: TeamState,
      action: PayloadAction<TeamData>
    ) => {
      if (state.data) {
        const ref = [...state.data]
        ref.push(action.payload)
        state.data = ref
      } else {
        state.data = [action.payload]
      }
    }
  },
});

export const { updateTeam, pushATeamMember } = teamSlice.actions;

export default teamSlice.reducer;
