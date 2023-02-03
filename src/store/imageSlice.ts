import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IImportType = 'user' | 'review';

type SliceState = {
  importType: IImportType;
  importedImageFile: File | null;
  exportedImageFile: File | null;
};

const initialState: SliceState = {
  importType: 'user',
  importedImageFile: null,
  exportedImageFile: null,
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
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
});

export const { resetImageFile, setImportImageFile, setExportImageFile } =
  imageSlice.actions;

export default imageSlice;
