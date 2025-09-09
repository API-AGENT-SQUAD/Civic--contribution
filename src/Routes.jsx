import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import { AuthProvider } from "components/ui/AuthenticationGuard";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import AuthenticationGuard from "components/ui/AuthenticationGuard";
import NotFound from "pages/NotFound";
import IssueDetailsPage from './pages/issue-details';
import LoginPage from './pages/login';
import UserDashboard from './pages/user-dashboard';
import RepositoryBrowse from './pages/repository-browse';
import ProfileSettings from './pages/profile-settings';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Public routes that don't require authentication */}
            <Route path="/login" element={
              <AuthenticationGuard requireAuth={false}>
                <LoginPage />
              </AuthenticationGuard>
            } />
            <Route path="/register" element={
              <AuthenticationGuard requireAuth={false}>
                <Register />
              </AuthenticationGuard>
            } />
            
            {/* Protected routes that require authentication */}
            <Route path="/" element={
              <AuthenticationGuard requireAuth={true}>
                <IssueDetailsPage />
              </AuthenticationGuard>
            } />
            <Route path="/issue-details" element={
              <AuthenticationGuard requireAuth={true}>
                <IssueDetailsPage />
              </AuthenticationGuard>
            } />
            <Route path="/user-dashboard" element={
              <AuthenticationGuard requireAuth={true}>
                <UserDashboard />
              </AuthenticationGuard>
            } />
            <Route path="/repository-browse" element={
              <AuthenticationGuard requireAuth={true}>
                <RepositoryBrowse />
              </AuthenticationGuard>
            } />
            <Route path="/profile-settings" element={
              <AuthenticationGuard requireAuth={true}>
                <ProfileSettings />
              </AuthenticationGuard>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;