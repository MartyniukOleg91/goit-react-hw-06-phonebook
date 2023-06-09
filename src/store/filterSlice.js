import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',

  reducers: {
    changeValue(state, action) {
      return (state = action.payload);
    },
  },
});

export const { changeValue } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
