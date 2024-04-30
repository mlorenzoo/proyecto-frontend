import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../slices/auth/authSlice'
import commentReducer from '../posts/comments/slices/commentsSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    comment: commentReducer,
  },
})