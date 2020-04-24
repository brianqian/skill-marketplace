import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Client from '../../utils/HTTPClient';
import { CATEGORIES_ROUTE } from '../../Routes';
import { AppDispatch } from '../store';

type StateShape = {
  categories: string[];
  error: number | null;
};

const initialState: StateShape = {
  categories: [],
  error: null,
};

export const getAllCategories = createAsyncThunk('/courses', async (param, thunkApi) => {
  const categories = await Client.request(CATEGORIES_ROUTE);
  return categories;
});

const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      console.log('extra reducers, categories', action);
      const categories = action.payload.map((category: { name: string }) => category.name);
      state.categories = categories;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {});
  },
});

export const { setError } = userSlice.actions;

export default userSlice.reducer;
