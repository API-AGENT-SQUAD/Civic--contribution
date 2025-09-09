import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationBadge = ({ notifications, onMarkAsRead, onViewAll }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMarkAllRead = () => {
    notifications?.forEach(notification => {
      if (!notification?.read) {
        onMarkAsRead?.(notification?.id);
      }
    });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_match':
        return 'Target';
      case 'issue_update':
        return 'GitPullRequest';
      case 'bookmark_update':
        return 'Bookmark';
      case 'skill_progress':
        return 'TrendingUp';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'new_match':
        return 'text-success';
      case 'issue_update':
        return 'text-primary';
      case 'bookmark_update':
        return 'text-warning';
      case 'skill_progress':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  if (unreadCount === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Notification Badge */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className="relative"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>
      {/* Notification Dropdown */}
      {isExpanded && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsExpanded(false)}
          />
          <div className="absolute top-full right-0 z-50 w-80 bg-card border border-border rounded-lg shadow-elevated mt-2">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-medium text-foreground">Notifications</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications?.slice(0, 5)?.map((notification) => (
                <div
                  key={notification?.id}
                  className={`p-4 border-b border-border hover:bg-muted cursor-pointer transition-smooth ${
                    !notification?.read ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => onMarkAsRead?.(notification?.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 ${getNotificationColor(notification?.type)}`}>
                      <Icon name={getNotificationIcon(notification?.type)} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-2">
                        {notification?.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {notification?.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification?.timestamp}
                      </p>
                    </div>
                    {!notification?.read && (
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={onViewAll}
                iconName="ArrowRight"
                iconSize={14}
                className="w-full text-xs"
              >
                View All Notifications
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBadge;