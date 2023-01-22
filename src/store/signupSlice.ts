import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  email: string;
  code: string;
  agreeOlder14Years: boolean;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
};

const initialState: SliceState = {
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
});

export const { setSignupEmail, setSignupCode, setSignupAgree } =
  signupSlice.actions;

export default signupSlice;
