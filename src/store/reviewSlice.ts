import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    setReviewTypeAndId: (
      state,
      action: PayloadAction<{ type: ReviewType; id: string }>,
    ) => {
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    resetReviewTypeAndId: (state, action: PayloadAction) => {
      state.type = '';
      state.id = '';
    },
  },
});

export const { setReviewTypeAndId, resetReviewTypeAndId } = reviewSlice.actions;

export default reviewSlice;
