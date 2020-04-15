import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
  },
});

export default userSlice.reducer;
