import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './UserState/userSlice';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
