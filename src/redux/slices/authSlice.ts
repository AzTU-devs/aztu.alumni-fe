import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  name: string | null;
  surname: string | null;
  father_name: string | null;
  fin_code: string | null;
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  name: null,
  surname: null,
  father_name: null,
  fin_code: null,
  email: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state: AuthState,
      action: PayloadAction<{
        token: string;
        alumni?: {
          name?: string;
          surname?: string;
          father_name?: string;
          fin_code?: string;
          email?: string;
        };
      }>
    ) => {
      const user = action.payload.alumni || {};
      state.name = user.name || null;
      state.surname = user.surname || null;
      state.father_name = user.father_name || null;
      state.fin_code = user.fin_code || null;
      state.email = user.email || null;
      state.token = action.payload.token || null;
    },
    logout: () => initialState,
    clearLoginSteps: (state: AuthState) => {
      state.fin_code = null;
      state.name = null;
      state.surname = null;
      state.father_name = null;
      state.token = null;
      state.email = null;
    },
  },
});

export const {
  loginSuccess,
  clearLoginSteps,
  logout
} = authSlice.actions;
export default authSlice.reducer;