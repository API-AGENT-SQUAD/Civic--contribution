import React, { useState } from 'react';
import { useAuth } from '../../../components/ui/AuthenticationGuard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountInformation = ({ user: propUser, onUpdate }) => {
  const { user: authUser, updateUserProfile, githubData } = useAuth();
  const user = propUser || authUser;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    githubUsername: user?.githubUsername || '',
    bio: user?.bio || ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.githubUsername?.trim()) {
      newErrors.githubUsername = 'GitHub username is required';
    } else if (!/^[a-zA-Z0-9]([a-zA-Z0-9-])*[a-zA-Z0-9]$/?.test(formData?.githubUsername)) {
      newErrors.githubUsername = 'Please enter a valid GitHub username';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Update through Descope
      const result = await updateUserProfile(formData);
      
      if (result?.success) {
        onUpdate?.(formData);
        setIsEditing(false);
      } else {
        setErrors({ submit: result?.error || 'Update failed' });
      }
    } catch (error) {
      console.error('Failed to update account information:', error);
      setErrors({ submit: 'Update failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      githubUsername: user?.githubUsername || '',
      bio: user?.bio || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Account Information</h2>
            <p className="text-sm text-muted-foreground">Manage your personal details and GitHub integration</p>
          </div>
        </div>
        
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="User" size={24} className="text-primary" />
            </div>
            {isEditing && (
              <Button
                variant="outline"
                size="icon"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full"
                iconName="Camera"
                iconSize={12}
              />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Profile Picture</p>
            <p className="text-xs text-muted-foreground">Upload a photo to personalize your profile</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            disabled={!isEditing}
            required
            placeholder="Enter your full name"
          />

          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            disabled={!isEditing}
            required
            placeholder="Enter your email address"
          />

          <Input
            label="GitHub Username"
            type="text"
            value={formData?.githubUsername}
            onChange={(e) => handleInputChange('githubUsername', e?.target?.value)}
            error={errors?.githubUsername}
            disabled={!isEditing}
            required
            placeholder="Enter your GitHub username"
            description="Used to sync your repositories and contributions"
          />

          <div className="md:col-span-2">
            <Input
              label="Bio"
              type="text"
              value={formData?.bio}
              onChange={(e) => handleInputChange('bio', e?.target?.value)}
              disabled={!isEditing}
              placeholder="Tell us about yourself and your interests"
              description="Optional: Share your background and what motivates you to contribute"
            />
          </div>
        </div>

        {/* GitHub Integration Status */}
        <div className="border border-border rounded-lg p-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg">
                <Icon name="Github" size={16} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {githubData ? 'GitHub Connected via Descope' : 'GitHub Not Connected'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {githubData 
                    ? `@${githubData?.profile?.login} • ${githubData?.stats?.publicRepos} repos`
                    : 'Connect GitHub for enhanced features'
                  }
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              iconName={githubData ? "RefreshCw" : "Github"} 
              iconSize={14}
            >
              {githubData ? "Sync Now" : "Connect GitHub"}
            </Button>
          </div>
          
          {githubData && (
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-foreground">{githubData?.stats?.publicRepos}</p>
                <p className="text-xs text-muted-foreground">Repositories</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{githubData?.stats?.followers}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{githubData?.stats?.following}</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInformation;