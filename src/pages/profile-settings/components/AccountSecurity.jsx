import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../components/ui/AuthenticationGuard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSecurity = ({ security, onUpdate }) => {
  const { user, updateUserProfile } = useAuth();
  const [securityData, setSecurityData] = useState(security || {});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (security) {
      setSecurityData(security);
    }
  }, [security]);

  const handlePasswordChange = async () => {
    if (!validatePasswordForm()) return;
    
    setIsLoading(true);
    try {
      // In a real implementation, this would use Descope's change password API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      onUpdate?.({
        ...securityData,
        lastPasswordChange: new Date()?.toISOString()?.split('T')?.[0]
      });
      
      alert('Password changed successfully');
    } catch (error) {
      setErrors({ password: 'Failed to change password' });
    } finally {
      setIsLoading(false);
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordForm?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleToggle2FA = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would integrate with Descope's 2FA setup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTwoFactorState = !securityData?.twoFactor;
      const updatedSecurity = {
        ...securityData,
        twoFactor: newTwoFactorState
      };
      
      setSecurityData(updatedSecurity);
      onUpdate?.(updatedSecurity);
      
    } catch (error) {
      console.error('2FA toggle failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Lock" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Account Security</h2>
          <p className="text-sm text-muted-foreground">Manage your password and security settings</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Descope Integration Status */}
        <div className="border border-border rounded-lg p-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg">
                <Icon name="Shield" size={16} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Descope Authentication</p>
                <p className="text-xs text-muted-foreground">
                  Project ID: {import.meta.env?.VITE_DESCOPE_PROJECT_ID}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-success">Active</span>
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-foreground">Change Password</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Current Password"
              type="password"
              value={passwordForm?.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e?.target?.value)}
              error={errors?.currentPassword}
              placeholder="Enter current password"
              required
            />
            
            <Input
              label="New Password"
              type="password"
              value={passwordForm?.newPassword}
              onChange={(e) => handleInputChange('newPassword', e?.target?.value)}
              error={errors?.newPassword}
              placeholder="Enter new password"
              description="Minimum 8 characters required"
              required
            />
            
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordForm?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              placeholder="Confirm new password"
              required
            />
          </div>
          
          <Button
            variant="default"
            onClick={handlePasswordChange}
            loading={isLoading}
            iconName="Key"
            iconPosition="left"
            iconSize={16}
          >
            Update Password
          </Button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-md font-medium text-foreground">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Button
              variant={securityData?.twoFactor ? "destructive" : "default"}
              onClick={handleToggle2FA}
              loading={isLoading}
              iconName={securityData?.twoFactor ? "ShieldOff" : "Shield"}
              iconSize={16}
            >
              {securityData?.twoFactor ? "Disable 2FA" : "Enable 2FA"}
            </Button>
          </div>
          
          {securityData?.twoFactor && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm text-success">Two-factor authentication is enabled</span>
              </div>
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-md font-medium text-foreground">Active Sessions</h3>
              <p className="text-sm text-muted-foreground">
                Manage your active login sessions
              </p>
            </div>
            <span className="text-sm text-muted-foreground">
              {securityData?.activeSessions || 1} active session(s)
            </span>
          </div>
          
          <Button
            variant="outline"
            iconName="LogOut"
            iconSize={16}
          >
            Sign Out All Devices
          </Button>
        </div>

        {/* Security Information */}
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Security Information</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Last password change:</span>
              <span>{securityData?.lastPasswordChange || 'Never'}</span>
            </div>
            <div className="flex justify-between">
              <span>Account created:</span>
              <span>{user?.createdTime ? new Date(user?.createdTime)?.toLocaleDateString() : 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span>Last login:</span>
              <span>{user?.lastLogin ? new Date(user?.lastLogin)?.toLocaleDateString() : 'Current session'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;