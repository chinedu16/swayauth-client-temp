import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AssociationData {
  id?: string;
  verified?: boolean
  creator?: boolean
  permissions: ('read' | 'write' | 'delete')[]
  access: 'level_2' | 'level_3'
  company_id?: string;
  client_email?: string;
  created_at?: string
  updated_at?: string
  company?: {
    id: string
    name: string | null
    status: 'active' | 'disabled'
  }
}

export interface AssociationState extends AnyReduxState {
  data?: AssociationData[] | null;
}

const initialState: AssociationState = {
  status: false,
  message: null,
  data: null,
  loading: "false",
};

export const associationSlice = createSlice({
  name: "association",
  initialState,
  reducers: {
    updateAssociation: (
      state: AssociationState,
      action: PayloadAction<AssociationState>
    ) => {
      state.data = action.payload.data ?? state.data;
      state.loading = action.payload.loading ?? state.loading;
      state.status = action.payload.status ?? state.status;
      state.message = action.payload.message ?? state.message;
    },
  },
});

export const { updateAssociation } = associationSlice.actions;

export default associationSlice.reducer;
