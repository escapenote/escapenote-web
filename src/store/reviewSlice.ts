import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { revertAll } from 'store';

type ReviewType = 'cafe' | 'theme' | '';

export type ReviewState = {
  type: ReviewType;
  id: string;
};

const initialState: ReviewState = {
  type: '',
  id: '',
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    reset: () => initialState,
    setReviewTypeAndId: (
      state,
      action: PayloadAction<{ type: ReviewType; id: string }>,
    ) => {
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    resetReviewTypeAndId: state => {
      state.type = '';
      state.id = '';
    },
  },
  extraReducers(builder) {
    builder.addCase(revertAll, () => initialState);
  },
});

export const { reset, setReviewTypeAndId, resetReviewTypeAndId } =
  reviewSlice.actions;

export default reviewSlice;
