// web/src/App.js - ROUTER STRUCTURE FIX FOR 404 ISSUE
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './store';
import { colors, typography } from './utils/constants';
import GlobalStyles from './styles/GlobalStyles';

// Import Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/home/HomePage';
import FeedPage from './pages/feed/FeedPage';
import TrendingPage from './pages/trending/TrendingPage';
import ProfilePage from './pages/profile/ProfilePage';
import EditProfilePage from './pages/profile/EditProfilePage';
import CreatePostPage from './pages/post/CreatePostPage';
import PostDetailPage from './pages/post/PostDetailPage';
import SearchPage from './pages/search/SearchPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import BookmarksPage from './pages/bookmarks/BookmarksPage';

// Import User Pages
import UserProfilePage from './pages/user/UserProfilePage';
import UserFollowersPage from './pages/user/UserFollowersPage';
import UserFollowingPage from './pages/user/UserFollowingPage';
import UserPostsPage from './pages/user/UserPostsPage';
import ConnectionsPage from './pages/user/ConnectionsPage';

// Import Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Theme configuration
const theme = {
  colors,
  typography,
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    large: '1200px'
  }
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes - Direct Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes - Flat Structure to Avoid Nesting Issues */}
              <Route path="/" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Navigate to="/feed" replace />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/feed" element={
                <ProtectedRoute>
                  <AppLayout>
                    <FeedPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/trending" element={
                <ProtectedRoute>
                  <AppLayout>
                    <TrendingPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/home" element={
                <ProtectedRoute>
                  <AppLayout>
                    <HomePage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <AppLayout>
                    <ProfilePage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/edit-profile" element={
                <ProtectedRoute>
                  <AppLayout>
                    <EditProfilePage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/connections" element={
                <ProtectedRoute>
                  <AppLayout>
                    <ConnectionsPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/user/:id" element={
                <ProtectedRoute>
                  <AppLayout>
                    <UserProfilePage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/user/:id/posts" element={
                <ProtectedRoute>
                  <AppLayout>
                    <UserPostsPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/user/:id/followers" element={
                <ProtectedRoute>
                  <AppLayout>
                    <UserFollowersPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/user/:id/following" element={
                <ProtectedRoute>
                  <AppLayout>
                    <UserFollowingPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/create-post" element={
                <ProtectedRoute>
                  <AppLayout>
                    <CreatePostPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/post/:id" element={
                <ProtectedRoute>
                  <AppLayout>
                    <PostDetailPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/search" element={
                <ProtectedRoute>
                  <AppLayout>
                    <SearchPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/bookmarks" element={
                <ProtectedRoute>
                  <AppLayout>
                    <BookmarksPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AppLayout>
                    <AdminDashboardPage />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <AppLayout>
                    <div style={{
                      padding: '50px', 
                      textAlign: 'center', 
                      background: 'linear-gradient(135deg, #0066CC, #3385DB)',
                      color: 'white',
                      borderRadius: '12px',
                      margin: '20px'
                    }}>
                      <h2>🔔 Notifications</h2>
                      <p>Notification system coming soon!</p>
                    </div>
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              {/* Catch All Route */}
              <Route path="*" element={
                <div style={{
                  padding: '50px', 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #FF6B35, #E55A2B)',
                  color: 'white',
                  borderRadius: '12px',
                  margin: '20px',
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <h1>🎯 IAP Connect</h1>
                  <h2>🔍 Page Not Found</h2>
                  <p>The page you're looking for doesn't exist.</p>
                  <button 
                    onClick={() => window.location.href = '/feed'}
                    style={{
                      background: 'white',
                      color: '#FF6B35',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '6px',
                      marginTop: '20px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '1rem'
                    }}
                  >
                    Go to Feed
                  </button>
                </div>
              } />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

// Layout component for authenticated pages
const AppLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default App;