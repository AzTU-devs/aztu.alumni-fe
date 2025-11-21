import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupState {
  fname: string;
  lname: string;
  email: string;
  password: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
}

const initialState: SignupState = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setSignupData(state, action: PayloadAction<Partial<SignupState>>) {
      return { ...state, ...action.payload };
    },
    clearSignupData() {
      return initialState;
    },
  },
});

export const { setSignupData, clearSignupData } = signupSlice.actions;
export default signupSlice.reducer;
