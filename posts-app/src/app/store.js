import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from '../features/login/loginSlice';

export default configureStore({
  reducer: {
    Login: LoginReducer,
  },
});
