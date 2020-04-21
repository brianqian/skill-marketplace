import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import Client from '../../utils/HTTPClient';
import { COURSES_ROUTE, USERS_ROUTE } from '../../Routes';
import { ICategory, IUser, ICourse } from '../../global';

type StateShape = {
  userData: IUser;
  userCourses: ICourse[];
};

const initialState: StateShape = {
  userData: {
    id: '',
    firstName: '',
    lastName: '',
    specialty: '',
    email: '',
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
    setData: (state, action) => {
      state.userData = action.payload;
    },
    setCourses: (state, action) => {
      state.userCourses = action.payload;
    },
    addCourse: (state, action) => {
      state.userCourses.push(action.payload);
    },
  },
});

export const { setData, setCourses, addCourse } = userSlice.actions;

export const postCourse = (body: ICategory) => async (dispatch: AppDispatch) => {
  const data = await Client.request(COURSES_ROUTE, 'POST', body);
  dispatch(setCourses(data));
};

export const getUser = () => async (dispatch: AppDispatch) => {
  const userData = await Client.request(USERS_ROUTE);
  dispatch(setData(userData));
};

export default userSlice.reducer;
