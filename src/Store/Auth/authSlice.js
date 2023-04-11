import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'Checking', // "Authenticated", "Not-authenticated"
    user: {},
    errorMessage: undefined
  },
  reducers: {
    onChecking: (state) => {
      state.status = 'Checking',
      state.user = {},
      state.errorMessage = undefined
    },
    onLogin: (state, {payload}) => {
      state.status = 'Authenticated'
      state.user = payload
      state.errorMessage = undefined
    },
    onLogout: (state, {payload}) => {
      state.status = 'Not-authenticated'
      state.user = {}
      state.errorMessage = payload
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined
    }
  }
});

// Action creators are generated for each case redicer function
export const { 
  onChecking, 
  onLogin, 
  onLogout, 
  clearErrorMessage 
} = authSlice.actions;