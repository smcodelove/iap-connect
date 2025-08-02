// web/src/store/index.js - SIMPLE FIX MAINTAINING YOUR PATTERN
import { configureStore } from '@reduxjs/toolkit';

// Import slices with error handling
let authReducer, postReducer, userReducer;

try {
  authReducer = require('./slices/authSlice').default;
} catch (error) {
  console.warn('⚠️ AuthSlice not found, using fallback reducer');
  // Simple fallback reducer
  authReducer = (state = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    token: localStorage.getItem('access_token') || null
  }, action) => {
    switch (action.type) {
      case 'auth/loginStart':
        return { ...state, loading: true, error: null };
      case 'auth/loginSuccess':
        return { 
          ...state, 
          loading: false, 
          isAuthenticated: true, 
          user: action.payload.user,
          token: action.payload.token,
          error: null 
        };
      case 'auth/loginFailure':
        return { 
          ...state, 
          loading: false, 
          isAuthenticated: false, 
          user: null,
          token: null,
          error: action.payload 
        };
      case 'auth/logout':
        localStorage.removeItem('access_token');
        localStorage.removeItem('token');
        return { 
          ...state, 
          loading: false, 
          isAuthenticated: false, 
          user: null,
          token: null,
          error: null 
        };
      default:
        return state;
    }
  };
}

try {
  postReducer = require('./slices/postSlice').default;
} catch (error) {
  console.warn('⚠️ PostSlice not found, using fallback reducer');
  // Simple fallback reducer
  postReducer = (state = {
    posts: [],
    trendingPosts: [],
    currentPost: null,
    loading: false,
    error: null,
    hasMore: false,
    page: 1
  }, action) => {
    switch (action.type) {
      case 'posts/fetchPostsStart':
        return { ...state, loading: true, error: null };
      case 'posts/fetchPostsSuccess':
        return { 
          ...state, 
          loading: false, 
          posts: action.payload.posts || action.payload,
          hasMore: action.payload.hasMore || false,
          page: action.payload.page || 1,
          error: null 
        };
      case 'posts/fetchPostsFailure':
        return { ...state, loading: false, error: action.payload };
      case 'posts/addPost':
        return { ...state, posts: [action.payload, ...state.posts] };
      case 'posts/updatePost':
        return { 
          ...state, 
          posts: state.posts.map(post => 
            post.id === action.payload.id ? action.payload : post
          )
        };
      case 'posts/removePost':
        return { 
          ...state, 
          posts: state.posts.filter(post => post.id !== action.payload)
        };
      case 'posts/likePost':
        return {
          ...state,
          posts: state.posts.map(post =>
            post.id === action.payload.postId
              ? { ...post, is_liked: action.payload.liked, likes_count: action.payload.likes_count }
              : post
          )
        };
      default:
        return state;
    }
  };
}

try {
  userReducer = require('./slices/userSlice').default;
} catch (error) {
  console.warn('⚠️ UserSlice not found, using fallback reducer');
  // Simple fallback reducer
  userReducer = (state = {
    currentUser: null,
    users: [],
    searchResults: [],
    loading: false,
    error: null
  }, action) => {
    switch (action.type) {
      case 'users/setCurrentUser':
        return { ...state, currentUser: action.payload };
      case 'users/updateProfile':
        return { 
          ...state, 
          currentUser: { ...state.currentUser, ...action.payload }
        };
      case 'users/setSearchResults':
        return { ...state, searchResults: action.payload };
      case 'users/clearSearchResults':
        return { ...state, searchResults: [] };
      default:
        return state;
    }
  };
}

// Configure store with your existing pattern
const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    users: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

// Action creators for fallback usage
export const authActions = {
  loginStart: () => ({ type: 'auth/loginStart' }),
  loginSuccess: (payload) => ({ type: 'auth/loginSuccess', payload }),
  loginFailure: (payload) => ({ type: 'auth/loginFailure', payload }),
  logout: () => ({ type: 'auth/logout' })
};

export const postActions = {
  fetchPostsStart: () => ({ type: 'posts/fetchPostsStart' }),
  fetchPostsSuccess: (payload) => ({ type: 'posts/fetchPostsSuccess', payload }),
  fetchPostsFailure: (payload) => ({ type: 'posts/fetchPostsFailure', payload }),
  addPost: (payload) => ({ type: 'posts/addPost', payload }),
  updatePost: (payload) => ({ type: 'posts/updatePost', payload }),
  removePost: (payload) => ({ type: 'posts/removePost', payload }),
  likePost: (payload) => ({ type: 'posts/likePost', payload })
};

export const userActions = {
  setCurrentUser: (payload) => ({ type: 'users/setCurrentUser', payload }),
  updateProfile: (payload) => ({ type: 'users/updateProfile', payload }),
  setSearchResults: (payload) => ({ type: 'users/setSearchResults', payload }),
  clearSearchResults: () => ({ type: 'users/clearSearchResults' })
};

export default store;