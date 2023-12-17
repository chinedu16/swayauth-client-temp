import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface AuthData {
  auth: boolean
}
const initialState: AuthData = {
  auth: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state: AuthData, action: PayloadAction<boolean>) => {
      state.auth = action.payload ?? state.auth
    },
  },
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer