import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const PrivacyControls = ({ privacy, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(privacy?.profileVisibility || 'public');
  const [contributionTracking, setContributionTracking] = useState(privacy?.contributionTracking || true);
  const [dataSharing, setDataSharing] = useState(privacy?.dataSharing || {});
  const [isLoading, setIsLoading] = useState(false);

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can view your profile and contributions' },
    { value: 'community', label: 'Community Only', description: 'Only registered users can see your profile' },
    { value: 'private', label: 'Private', description: 'Your profile is hidden from others' }
  ];

  const dataSharingOptions = [
    {
      id: 'analytics',
      name: 'Usage Analytics',
      description: 'Help improve the platform by sharing anonymous usage data',
      icon: 'BarChart3',
      enabled: dataSharing?.analytics || false
    },
    {
      id: 'recommendations',
      name: 'Recommendation Improvements',
      description: 'Use your activity to improve recommendations for all users',
      icon: 'Target',
      enabled: dataSharing?.recommendations || false
    },
    {
      id: 'research',
      name: 'Research Participation',
      description: 'Participate in studies about open-source contribution patterns',
      icon: 'Search',
      enabled: dataSharing?.research || false
    },
    {
      id: 'marketing',
      name: 'Marketing Communications',
      description: 'Receive updates about new features and platform improvements',
      icon: 'Mail',
      enabled: dataSharing?.marketing || false
    }
  ];

  const handleDataSharingChange = (optionId, checked) => {
    setDataSharing(prev => ({
      ...prev,
      [optionId]: checked
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onUpdate?.({
        profileVisibility,
        contributionTracking,
        dataSharing
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update privacy settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileVisibility(privacy?.profileVisibility || 'public');
    setContributionTracking(privacy?.contributionTracking || true);
    setDataSharing(privacy?.dataSharing || {});
    setIsEditing(false);
  };

  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'public':
        return 'Globe';
      case 'community':
        return 'Users';
      case 'private':
        return 'Lock';
      default:
        return 'Eye';
    }
  };

  const getVisibilityColor = (visibility) => {
    switch (visibility) {
      case 'public':
        return 'text-success';
      case 'community':
        return 'text-warning';
      case 'private':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Shield" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Privacy Controls</h2>
            <p className="text-sm text-muted-foreground">Manage your privacy and data sharing preferences</p>
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
      <div className="space-y-8">
        {/* Profile Visibility */}
        <div>
          {!isEditing ? (
            <div className="border border-border rounded-lg p-4 bg-muted/30">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                  <Icon name={getVisibilityIcon(profileVisibility)} size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Profile Visibility</p>
                  <p className={`text-lg font-semibold capitalize ${getVisibilityColor(profileVisibility)}`}>
                    {profileVisibility}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Select
              label="Profile Visibility"
              description="Control who can see your profile and contribution history"
              options={visibilityOptions}
              value={profileVisibility}
              onChange={setProfileVisibility}
            />
          )}
        </div>

        {/* Contribution Tracking */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Activity" size={16} className="text-primary" />
            <h3 className="text-sm font-medium text-foreground">Contribution Tracking</h3>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg mt-1">
                <Icon name="GitBranch" size={14} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Track My Contributions</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Allow the platform to track your GitHub contributions for better recommendations
                    </p>
                  </div>
                  <Checkbox
                    checked={contributionTracking}
                    onChange={(e) => setContributionTracking(e?.target?.checked)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sharing Preferences */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Database" size={16} className="text-primary" />
            <h3 className="text-sm font-medium text-foreground">Data Sharing Preferences</h3>
          </div>
          
          <div className="space-y-4">
            {dataSharingOptions?.map((option) => (
              <div key={option?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg mt-1">
                    <Icon name={option?.icon} size={14} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{option?.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{option?.description}</p>
                      </div>
                      <Checkbox
                        checked={option?.enabled}
                        onChange={(e) => handleDataSharingChange(option?.id, e?.target?.checked)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Summary */}
        {!isEditing && (
          <div className="border border-border rounded-lg p-4 bg-accent/5">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-accent mt-1" />
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Privacy Summary</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Profile visibility: {profileVisibility}</p>
                  <p>• Contribution tracking: {contributionTracking ? 'Enabled' : 'Disabled'}</p>
                  <p>• Data sharing options: {Object.values(dataSharing)?.filter(Boolean)?.length} enabled</p>
                  <p className="mt-2 text-accent">
                    Your data is always encrypted and never shared with third parties without your consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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
              Save Privacy Settings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyControls;