import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UsersData {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  status?: 'active' | 'disabled';
  verified?: boolean
  photo?: string;
  scope?: ('manual' | 'google' | 'facebook' | 'two_factor' | 'sms' | 'mail')[]
  permissions: ('read' | 'write' | 'delete')[]
  access: 'level_1'
  two_factor_type?: 'app' | 'sms' | 'mail'
  company_id?: string
  organization_id?: string
  organization?: {
    name: string
  }
  organization_token_id?: string
  created_at?: string
  updated_at?: string
}

export interface UsersState extends AnyReduxState {
  data?: UsersData[] | null;
}

const initialState: UsersState = {
  status: false,
  message: null,
  data: null,
  loading: "false",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeAUser: (
      state: UsersState,
      action: PayloadAction<string>
    ) => {
      if (state.data) {
        state.data = [...state.data].map(d => ({ ...d })).filter(d => d.id != action.payload);
      }
    },
    updateUsersStatus: (
      state: UsersState,
      action: PayloadAction<{ ids: string[], status: 'active' | 'disabled' }>
    ) => {
      if (state.data) {
        const oldData = [...state.data].map(d => ({ ...d }));
        for (let i = 0; i < action.payload.ids.length; i++) {
          const foundIndex = oldData.findIndex(d => d.id == action.payload.ids[i]);
          if (foundIndex > -1) {
            oldData[foundIndex] = { ...oldData[foundIndex], status: action.payload.status }
          }
        }
        state.data = oldData
      }
    },
    updateUsers: (
      state: UsersState,
      action: PayloadAction<UsersState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
  },
});

export const { updateUsers, removeAUser, updateUsersStatus } = usersSlice.actions;

export default usersSlice.reducer;
