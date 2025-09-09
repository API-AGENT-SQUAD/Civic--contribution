import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { useAuth } from '../../../components/ui/AuthenticationGuard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGithub, isLoading, error } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setIsLoading] = useState(false);

  const mockCredentials = {
    email: 'developer@civic.com',
    password: 'CivicDev2025!'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setAuthError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleGithubLogin = async (e) => {
    e?.preventDefault();
    
    const result = await loginWithGithub();
    
    if (result?.success) {
      const from = location?.state?.from?.pathname || '/user-dashboard';
      navigate(from, { replace: true });
    } else {
      setAuthError(result?.error || 'GitHub login failed');
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setAuthError('');
    
    try {
      // Check mock credentials
      if (formData?.email !== mockCredentials?.email || formData?.password !== mockCredentials?.password) {
        setAuthError(`Invalid credentials. Use: ${mockCredentials?.email} / ${mockCredentials?.password}`);
        setIsLoading(false);
        return;
      }

      const result = await login({
        email: formData?.email,
        password: formData?.password,
        rememberMe: formData?.rememberMe
      });
      
      if (result?.success) {
        const from = location?.state?.from?.pathname || '/user-dashboard';
        navigate(from, { replace: true });
      } else {
        setAuthError(result?.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-soft p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mx-auto mb-4">
            <Icon name="GitBranch" size={24} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to continue your civic contribution journey
          </p>
        </div>

        {/* Trust Signals */}
        <div className="flex items-center justify-center space-x-4 mb-6 p-3 bg-muted rounded-md">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Shield" size={14} className="text-success" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Github" size={14} className="text-primary" />
            <span>GitHub Verified</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Lock" size={14} className="text-success" />
            <span>Encrypted</span>
          </div>
        </div>

        {/* Error Message */}
        {authError && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error">{authError}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={loading}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={loading}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              disabled={loading}
            />
            
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={loading}
            disabled={loading}
            className="mt-6"
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGithubLogin}
            loading={loading}
            iconName="Github"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            Continue with GitHub (Descope)
          </Button>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 font-medium transition-smooth"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Mock Credentials Info */}
        <div className="mt-4 p-3 bg-muted/50 rounded-md border border-border">
          <p className="text-xs text-muted-foreground text-center">
            <Icon name="Info" size={12} className="inline mr-1" />
            Demo credentials: {mockCredentials?.email} / {mockCredentials?.password}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;