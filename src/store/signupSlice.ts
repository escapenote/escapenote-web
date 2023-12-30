import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { revertAll } from 'store';

export type SignupState = {
  email: string;
  code: string;
  agreeOlder14Years: boolean;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
};

const initialState: SignupState = {
  email: '',
  code: '',
  agreeOlder14Years: false,
  agreeTerms: false,
  agreePrivacy: false,
  agreeMarketing: false,
};

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    reset: () => initialState,
    setSignupEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setSignupCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setSignupAgree: (
      state,
      action: PayloadAction<{
        agreeOlder14Years: boolean;
        agreeTerms: boolean;
        agreePrivacy: boolean;
        agreeMarketing: boolean;
      }>,
    ) => {
      state.agreeOlder14Years = action.payload.agreeOlder14Years;
      state.agreeTerms = action.payload.agreeTerms;
      state.agreePrivacy = action.payload.agreePrivacy;
      state.agreeMarketing = action.payload.agreeMarketing;
    },
  },
  extraReducers(builder) {
    builder.addCase(revertAll, () => initialState);
  },
});

export const { setSignupEmail, setSignupCode, setSignupAgree } =
  signupSlice.actions;

export default signupSlice;
