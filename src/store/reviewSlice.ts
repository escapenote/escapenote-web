import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { revertAll } from 'store';

type ReviewType = 'cafe' | 'theme' | '';

type SliceState = {
  type: ReviewType;
  id: string;
};

const initialState: SliceState = {
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
