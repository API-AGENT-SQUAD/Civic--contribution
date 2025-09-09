import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationSettings = ({ settings, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(settings?.email || {});
  const [pushNotifications, setPushNotifications] = useState(settings?.push || {});
  const [frequency, setFrequency] = useState(settings?.frequency || 'daily');
  const [isLoading, setIsLoading] = useState(false);

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate', description: 'Get notified as soon as new issues match' },
    { value: 'daily', label: 'Daily Digest', description: 'Receive a summary once per day' },
    { value: 'weekly', label: 'Weekly Summary', description: 'Get updates once per week' },
    { value: 'never', label: 'Never', description: 'Turn off all notifications' }
  ];

  const emailNotificationTypes = [
    {
      id: 'newMatches',
      name: 'New Issue Matches',
      description: 'When new issues match your skills and interests',
      icon: 'Target',
      enabled: emailNotifications?.newMatches || false
    },
    {
      id: 'contributionUpdates',
      name: 'Contribution Updates',
      description: 'Updates on issues you\'ve bookmarked or contributed to',
      icon: 'GitPullRequest',
      enabled: emailNotifications?.contributionUpdates || false
    },
    {
      id: 'communityActivity',
      name: 'Community Activity',
      description: 'Comments and discussions on your contributions',
      icon: 'MessageSquare',
      enabled: emailNotifications?.communityActivity || false
    },
    {
      id: 'weeklyDigest',
      name: 'Weekly Digest',
      description: 'Summary of your activity and new opportunities',
      icon: 'Calendar',
      enabled: emailNotifications?.weeklyDigest || false
    }
  ];

  const pushNotificationTypes = [
    {
      id: 'urgentMatches',
      name: 'Urgent Issue Matches',
      description: 'High-priority issues that need immediate attention',
      icon: 'AlertTriangle',
      enabled: pushNotifications?.urgentMatches || false
    },
    {
      id: 'deadlineReminders',
      name: 'Deadline Reminders',
      description: 'Reminders for issues with approaching deadlines',
      icon: 'Clock',
      enabled: pushNotifications?.deadlineReminders || false
    },
    {
      id: 'mentionAlerts',
      name: 'Mention Alerts',
      description: 'When someone mentions you in comments or discussions',
      icon: 'AtSign',
      enabled: pushNotifications?.mentionAlerts || false
    }
  ];

  const handleEmailNotificationChange = (notificationId, checked) => {
    setEmailNotifications(prev => ({
      ...prev,
      [notificationId]: checked
    }));
  };

  const handlePushNotificationChange = (notificationId, checked) => {
    setPushNotifications(prev => ({
      ...prev,
      [notificationId]: checked
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onUpdate?.({
        email: emailNotifications,
        push: pushNotifications,
        frequency: frequency
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update notification settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEmailNotifications(settings?.email || {});
    setPushNotifications(settings?.push || {});
    setFrequency(settings?.frequency || 'daily');
    setIsEditing(false);
  };

  const renderNotificationSection = (title, notifications, onNotificationChange, icon) => (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name={icon} size={16} className="text-primary" />
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {notifications?.map((notification) => (
          <div key={notification?.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg mt-1">
              <Icon name={notification?.icon} size={14} className="text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{notification?.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification?.description}</p>
                </div>
                <Checkbox
                  checked={notification?.enabled}
                  onChange={(e) => onNotificationChange(notification?.id, e?.target?.checked)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Bell" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Notification Settings</h2>
            <p className="text-sm text-muted-foreground">Control how and when you receive updates</p>
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
        {/* Notification Frequency */}
        <div>
          <Select
            label="Notification Frequency"
            description="Choose how often you want to receive notifications"
            options={frequencyOptions}
            value={frequency}
            onChange={setFrequency}
            disabled={!isEditing}
          />
        </div>

        {/* Email Notifications */}
        {renderNotificationSection(
          'Email Notifications',
          emailNotificationTypes,
          handleEmailNotificationChange,
          'Mail'
        )}

        {/* Push Notifications */}
        {renderNotificationSection(
          'Push Notifications',
          pushNotificationTypes,
          handlePushNotificationChange,
          'Smartphone'
        )}

        {/* Notification Preview */}
        {!isEditing && (
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-1" />
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Current Settings Summary</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Frequency: {frequencyOptions?.find(opt => opt?.value === frequency)?.label}</p>
                  <p>• Email notifications: {Object.values(emailNotifications)?.filter(Boolean)?.length} enabled</p>
                  <p>• Push notifications: {Object.values(pushNotifications)?.filter(Boolean)?.length} enabled</p>
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
              Save Settings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;