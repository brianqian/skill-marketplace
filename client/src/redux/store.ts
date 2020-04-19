import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserState/userSlice';
import appReducer from './AppState/appSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
