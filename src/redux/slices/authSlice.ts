import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  uuid: string | null;
  name: string | null;
  surname: string | null;
  father_name: string | null;
  fin_code: string | null;
  email: string | null;
  token: string | null;
  role: number | null;
  profile_completed_percentage: number | null;
}

const initialState: AuthState = {
  uuid: null,
  name: null,
  surname: null,
  father_name: null,
  fin_code: null,
  email: null,
  token: null,
  role: null,
  profile_completed_percentage: null
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
          uuid?: string;
          name?: string;
          surname?: string;
          father_name?: string;
          fin_code?: string;
          email?: string;
          role?: number;
          profile_completed_percentage?: number;
        };
      }>
    ) => {
      const user = action.payload.alumni || {};
      state.uuid = user.uuid || null;
      state.name = user.name || null;
      state.surname = user.surname || null;
      state.father_name = user.father_name || null;
      state.fin_code = user.fin_code || null;
      state.email = user.email || null;
      state.token = action.payload.token || null;
      state.role = action.payload.alumni?.role || null;
      state.profile_completed_percentage = user.profile_completed_percentage || null
    },
    setProfileCompleted: (state: AuthState) => {
      state.profile_completed_percentage = 100;
    },
    logout: () => initialState,
    clearLoginSteps: (state: AuthState) => {
      state.uuid = null;
      state.fin_code = null;
      state.name = null;
      state.surname = null;
      state.father_name = null;
      state.token = null;
      state.email = null;
      state.role = null;
      state.profile_completed_percentage = null;
    },
  },
});

export const {
  loginSuccess,
  clearLoginSteps,
  logout,
  setProfileCompleted
} = authSlice.actions;
export default authSlice.reducer;