import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  email: string;
};

const initialState: SliceState = {
  email: '',
};

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setEmailForForgotPassword: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setEmailForForgotPassword } = passwordSlice.actions;

export default passwordSlice;
