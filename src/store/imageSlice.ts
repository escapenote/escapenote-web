import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { revertAll } from 'store';

type IImportType = 'user' | 'review';

export type ImageState = {
  importType: IImportType;
  importedImageFile: File | null;
  exportedImageFile: File | null;
};

const initialState: ImageState = {
  importType: 'user',
  importedImageFile: null,
  exportedImageFile: null,
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    reset: () => initialState,
    resetImageFile: state => {
      state.importType = 'user';
      state.importedImageFile = null;
      state.exportedImageFile = null;
    },
    setImportImageFile: (
      state,
      action: PayloadAction<{
        importType: IImportType;
        importedImageFile: File;
      }>,
    ) => {
      const { importType, importedImageFile } = action.payload;
      state.importType = importType;
      state.importedImageFile = importedImageFile;
      state.exportedImageFile = null;
    },
    setExportImageFile: (state, action: PayloadAction<File>) => {
      state.exportedImageFile = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(revertAll, () => initialState);
  },
});

export const { resetImageFile, setImportImageFile, setExportImageFile } =
  imageSlice.actions;

export default imageSlice;
