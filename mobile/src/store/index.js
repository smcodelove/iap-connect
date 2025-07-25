/**
 * Redux store configuration for IAP Connect mobile app
 * Combines all slices and configures middleware
 * UPDATED: Added searchReducer for search functionality
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice';
import commentReducer from './slices/commentSlice';
import searchReducer from './slices/searchSlice'; // ADDED: Search slice

// Configure store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    users: userReducer,
    comments: commentReducer,
    search: searchReducer, // ADDED: Search functionality
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER'
        ]
      }
    }),
  devTools: __DEV__ // Enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;