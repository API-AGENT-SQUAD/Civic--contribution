import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import descopeAuth from "../utils/descopeAuth"; 

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      
      const sessionCheck = await descopeAuth?.validateSession();
      
      if (sessionCheck?.valid) {
        const userProfile = await descopeAuth?.getUserProfile();
        const storedGithubData = localStorage.getItem('githubData');
        
        if (userProfile) {
          setUser(userProfile);
          setIsAuthenticated(true);
          
          if (storedGithubData) {
            setGithubData(JSON.parse(storedGithubData));
          }
        } else {
          // Try to refresh the session
          const refreshResult = await descopeAuth?.refreshSession();
          if (refreshResult?.success) {
            const newUserProfile = await descopeAuth?.getUserProfile();
            if (newUserProfile) {
              setUser(newUserProfile);
              setIsAuthenticated(true);
            }
          }
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setGithubData(null);
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      setGithubData(null);
      setError('Authentication check failed');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGithub = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await descopeAuth?.loginWithGithub();
      
      if (result?.success) {
        localStorage.setItem('descopeSessionToken', result?.sessionToken);
        localStorage.setItem('descopeRefreshToken', result?.refreshToken);
        
        setUser(result?.user);
        setIsAuthenticated(true);
        
        // Fetch GitHub data through Descope Outbound Apps
        if (result?.user?.customAttributes?.githubAccessToken) {
          const githubInfo = await descopeAuth?.fetchGithubData(
            result?.user?.customAttributes?.githubAccessToken
          );
          
          if (githubInfo) {
            setGithubData(githubInfo);
            localStorage.setItem('githubData', JSON.stringify(githubInfo));
          }
        }
        
        return { success: true };
      } else {
        setError(result?.error || 'GitHub login failed');
        return { success: false, error: result?.error };
      }
    } catch (error) {
      console.error('GitHub login error:', error);
      setError('GitHub login failed');
      return { success: false, error: 'GitHub login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await descopeAuth?.loginWithEmail(
        credentials?.email, 
        credentials?.password
      );
      
      if (result?.success) {
        localStorage.setItem('descopeSessionToken', result?.sessionToken);
        localStorage.setItem('descopeRefreshToken', result?.refreshToken);
        
        setUser(result?.user);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        setError(result?.error || 'Login failed');
        return { success: false, error: result?.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed');
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await descopeAuth?.signUpWithEmail(
        userData?.email,
        userData?.password,
        {
          name: userData?.name,
          githubUsername: userData?.githubUsername,
          skillLevel: userData?.skillLevel,
          preferences: userData?.preferences
        }
      );
      
      if (result?.success) {
        localStorage.setItem('descopeSessionToken', result?.sessionToken);
        localStorage.setItem('descopeRefreshToken', result?.refreshToken);
        
        setUser(result?.user);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        setError(result?.error || 'Registration failed');
        return { success: false, error: result?.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed');
      return { success: false, error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      const result = await descopeAuth?.updateUserProfile(updates);
      
      if (result?.success) {
        setUser(prevUser => ({
          ...prevUser,
          customAttributes: {
            ...prevUser?.customAttributes,
            ...updates
          }
        }));
        return { success: true };
      }
      
      return result;
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Profile update failed' };
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      await descopeAuth?.logoutFromDescope();
      
      setIsAuthenticated(false);
      setUser(null);
      setGithubData(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    githubData,
    error,
    login,
    loginWithGithub,
    register,
    logout,
    updateUserProfile,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthenticationGuard = ({ children, requireAuth = true }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Authenticating with Descope...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};

export default AuthenticationGuard;
