import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import Client from '../../utils/HTTPClient';
import { COURSES_ROUTE, USERS_ROUTE, TOKEN_AUTH_ROUTE } from '../../Routes';
import { ICategory, IUser, ICourse, IError } from '../../global';

type StateShape = {
  userData: IUser;
  userCourses: Array<ICourse & { rating: number }>;
  error?: number;
  loading: 'idle' | 'pending';
};

const initialState: StateShape = {
  loading: 'idle',
  userData: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    isInstructor: false,
    description: '',
  },
  userCourses: [],
};

export const authenticateToken = createAsyncThunk('/users/authenticate', async () => {
  const resp = await Client.request(TOKEN_AUTH_ROUTE);
  return resp;
});

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
  extraReducers: builder => {
    builder.addCase(authenticateToken.fulfilled, (state, action) => {
      console.log('user retrieved', action.payload);
      state.userData = action.payload;
    });
    builder.addCase(authenticateToken.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
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
