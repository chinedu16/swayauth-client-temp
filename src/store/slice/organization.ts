import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface OrganizationData {
  id: string;
  photo?: string;
  name?: string;
  website?: string;
  bio?: string;
  _count?: {
    organization_token?: number
  }
  company_id?: string;
  created_at?: string
  updated_at?: string
}

export interface OrganizationState extends AnyReduxState {
  data?: OrganizationData[] | null;
}

const initialState: OrganizationState = {
  loading: "false",
  status: false,
  message: null,
  data: null,
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    deleteOrg: (
      state: OrganizationState,
      action: PayloadAction<string>
    ) => {
      const oldData = state.data ? [...state.data].map(v => ({ ...v })).filter(v => v.id != action.payload) : []
      state.data = oldData
    },
    addAnOrganization: (
      state: OrganizationState,
      action: PayloadAction<OrganizationData>
    ) => {
      if (state.data) {
        const ref = [...state.data]
        const index = ref.findIndex(r => r.id == action.payload.id)
        if (index > -1) {
          ref[index] = action.payload
        } else {
          ref.push(action.payload)
        }
        state.data = ref
      } else {
        state.data = [action.payload]
      }
    },
    updateOrganization: (
      state: OrganizationState,
      action: PayloadAction<OrganizationState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
  },
});

export const { updateOrganization, deleteOrg, addAnOrganization } = organizationSlice.actions;

export default organizationSlice.reducer;
