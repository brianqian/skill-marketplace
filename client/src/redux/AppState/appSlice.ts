import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Client from '../../utils/HTTPClient';
import { CATEGORIES_ROUTE } from '../../Routes';
import { AppDispatch } from '../store';

const initialState = {
  categories: [],
  error: '',
};

const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setError } = userSlice.actions;

export const getCategories = () => async (dispatch: AppDispatch) => {
  const categories = await Client.request(CATEGORIES_ROUTE);
  if (categories.status) {
    dispatch(setError(categories.status));
  } else {
    dispatch(setCategories(categories));
  }
};

export default userSlice.reducer;
