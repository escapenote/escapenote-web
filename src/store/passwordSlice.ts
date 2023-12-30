import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { revertAll } from 'store';

export type PasswordState = {
  email: string;
};

const initialState: PasswordState = {
  email: '',
};

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    reset: () => initialState,
    setEmailForForgotPassword: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(revertAll, () => initialState);
  },
});

export const { reset, setEmailForForgotPassword } = passwordSlice.actions;

export default passwordSlice;
