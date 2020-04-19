import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  userData: {
    firstName: '',
    lastName: '',
    specialty: '',
    email: '',
    password: '',
    avatar: '',
    isInstructor: false,
    description: '',
  },
  userCourses: {},
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserCourses: (state, action) => {},
  },
});

export default userSlice.reducer;
