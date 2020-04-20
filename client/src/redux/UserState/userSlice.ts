import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import Client from '../../utils/HTTPClient';
import { COURSES_ROUTE } from '../../Routes';
import { ICategory } from '../../global';

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
  userCourses: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    setData: (state, action) => {
      state.userData = action.payload;
    },
    setCourses: (state, action) => {},
    addCourse: (state, action) => {},
  },
});

export const { setToken, setData, setCourses, addCourse } = userSlice.actions;

export const postCourse = (body: ICategory) => async (dispatch: AppDispatch) => {
  const resp = await Client.request(COURSES_ROUTE, 'POST', body);
  console.log('REDUX', resp);
};

export default userSlice.reducer;
