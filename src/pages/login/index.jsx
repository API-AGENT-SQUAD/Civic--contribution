import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import LoginForm from './components/LoginForm';
import CivicMissionBanner from './components/CivicMissionBanner';

const LoginPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/user-dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Mission Banner (Desktop Only) */}
        <div className="hidden lg:block bg-muted/30">
          <CivicMissionBanner />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Mission Header */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Civic Contributor
              </h1>
              <p className="text-muted-foreground text-sm">
                Code for good. Contribute to civic projects.
              </p>
            </div>

            <LoginForm />

            {/* Mobile Footer */}
            <div className="lg:hidden mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                By signing in, you agree to contribute to open-source projects that strengthen communities and advance civic engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 lg:hidden">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <span>© {new Date()?.getFullYear()} Civic Contributor</span>
          <span>•</span>
          <span>Secure Authentication</span>
          <span>•</span>
          <span>GitHub Integration</span>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;