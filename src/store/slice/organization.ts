import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface OrganizationData {
  id: string;
  photo?: string;
  name?: string;
  website?: string;
  bio?: string;
  organization_token?: {
    _count?: number;
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

export const { updateOrganization } = organizationSlice.actions;

export default organizationSlice.reducer;
