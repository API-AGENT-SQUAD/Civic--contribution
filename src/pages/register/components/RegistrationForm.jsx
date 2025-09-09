import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const RegistrationForm = ({ 
  formData, 
  onFormDataChange, 
  errors = {},
  passwordStrength = 0 
}) => {
  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 2) return 'bg-error';
    if (passwordStrength < 4) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 2) return 'Weak';
    if (passwordStrength < 4) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="We'll use this for account notifications and updates"
          required
        />
      </div>
      {/* Account Security */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Account Security
        </h3>
        
        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          
          {formData?.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Password strength:</span>
                <span className={`font-medium ${
                  passwordStrength < 2 ? 'text-error' : 
                  passwordStrength < 4 ? 'text-warning' : 'text-success'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-smooth ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
      </div>
      {/* GitHub Integration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          GitHub Integration
        </h3>
        
        <Input
          label="GitHub Username"
          type="text"
          placeholder="Enter your GitHub username"
          value={formData?.githubUsername}
          onChange={(e) => handleInputChange('githubUsername', e?.target?.value)}
          error={errors?.githubUsername}
          description="Optional: Link your GitHub profile for contribution tracking"
        />
        
        <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
          <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-foreground font-medium mb-1">
              Why connect GitHub?
            </p>
            <p className="text-muted-foreground">
              Linking your GitHub account helps us track your contributions and provide better issue recommendations based on your activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;