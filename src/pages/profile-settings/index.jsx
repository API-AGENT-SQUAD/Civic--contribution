import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AccountInformation from './components/AccountInformation';
import SkillAssessment from './components/SkillAssessment';
import InterestPreferences from './components/InterestPreferences';
import NotificationSettings from './components/NotificationSettings';
import PrivacyControls from './components/PrivacyControls';
import ContributionHistory from './components/ContributionHistory';
import AccountSecurity from './components/AccountSecurity';

const ProfileSettings = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('account');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock user data with comprehensive profile information
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    githubUsername: 'alexjohnson-dev',
    bio: 'Full-stack developer passionate about civic technology and open-source contributions. Love building solutions that make a positive impact on communities.',
    skills: {
      level: 'intermediate',
      languages: ['JavaScript', 'Python', 'TypeScript', 'Java'],
      frameworks: ['React', 'Node.js', 'Django', 'Express']
    },
    preferences: {
      domains: ['web-development', 'civic-tech', 'education'],
      causes: ['education', 'accessibility', 'open-source'],
      contributions: ['bug-fixes', 'new-features', 'documentation']
    },
    notifications: {
      email: {
        newMatches: true,
        contributionUpdates: true,
        communityActivity: false,
        weeklyDigest: true
      },
      push: {
        urgentMatches: true,
        deadlineReminders: true,
        mentionAlerts: true
      },
      frequency: 'daily'
    },
    privacy: {
      profileVisibility: 'public',
      contributionTracking: true,
      dataSharing: {
        analytics: true,
        recommendations: true,
        research: false,
        marketing: false
      }
    },
    security: {
      twoFactor: false,
      lastPasswordChange: '2024-12-15',
      activeSessions: 3
    }
  });

  const settingsSections = [
    {
      id: 'account',
      name: 'Account Information',
      icon: 'User',
      description: 'Personal details and GitHub integration'
    },
    {
      id: 'skills',
      name: 'Skills & Experience',
      icon: 'Code',
      description: 'Programming skills and proficiency levels'
    },
    {
      id: 'interests',
      name: 'Interest Preferences',
      icon: 'Heart',
      description: 'Project domains and contribution preferences'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: 'Bell',
      description: 'Email and push notification settings'
    },
    {
      id: 'privacy',
      name: 'Privacy Controls',
      icon: 'Shield',
      description: 'Data sharing and visibility preferences'
    },
    {
      id: 'history',
      name: 'Contribution History',
      icon: 'Activity',
      description: 'Track your open-source contributions'
    },
    {
      id: 'security',
      name: 'Account Security',
      icon: 'Lock',
      description: 'Password and authentication settings'
    }
  ];

  useEffect(() => {
    // Set page title
    document.title = 'Profile Settings - Civic Contributor';
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const handleSectionChange = (sectionId) => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave this section?');
      if (!confirmLeave) return;
    }
    
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    setHasUnsavedChanges(false);
  };

  const handleDataUpdate = (section, data) => {
    setUserData(prev => ({
      ...prev,
      [section]: { ...prev?.[section], ...data }
    }));
    setHasUnsavedChanges(false);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'account':
        return (
          <AccountInformation
            user={userData}
            onUpdate={(data) => handleDataUpdate('account', data)}
          />
        );
      case 'skills':
        return (
          <SkillAssessment
            skills={userData?.skills}
            onUpdate={(data) => handleDataUpdate('skills', data)}
          />
        );
      case 'interests':
        return (
          <InterestPreferences
            preferences={userData?.preferences}
            onUpdate={(data) => handleDataUpdate('preferences', data)}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            settings={userData?.notifications}
            onUpdate={(data) => handleDataUpdate('notifications', data)}
          />
        );
      case 'privacy':
        return (
          <PrivacyControls
            privacy={userData?.privacy}
            onUpdate={(data) => handleDataUpdate('privacy', data)}
          />
        );
      case 'history':
        return (
          <ContributionHistory
            contributions={userData?.contributions}
          />
        );
      case 'security':
        return (
          <AccountSecurity
            security={userData?.security}
            onUpdate={(data) => handleDataUpdate('security', data)}
          />
        );
      default:
        return null;
    }
  };

  const getCurrentSection = () => {
    return settingsSections?.find(section => section?.id === activeSection);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <Icon name="Settings" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account, preferences, and contribution settings
                </p>
              </div>
            </div>

            {/* Mobile Section Selector */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                iconName={isMobileMenuOpen ? 'X' : 'Menu'}
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                {getCurrentSection()?.name}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className={`lg:col-span-1 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                <nav className="space-y-2">
                  {settingsSections?.map((section) => (
                    <button
                      key={section?.id}
                      onClick={() => handleSectionChange(section?.id)}
                      className={`
                        w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-smooth
                        hover:bg-muted hover:scale-105
                        ${activeSection === section?.id 
                          ? 'bg-primary text-primary-foreground shadow-soft' 
                          : 'text-muted-foreground hover:text-foreground'
                        }
                      `}
                    >
                      <Icon name={section?.icon} size={18} className="mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{section?.name}</p>
                        <p className={`text-xs mt-1 ${
                          activeSection === section?.id 
                            ? 'text-primary-foreground/80' 
                            : 'text-muted-foreground'
                        }`}>
                          {section?.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {renderActiveSection()}
                
                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Quick Actions</h3>
                      <p className="text-sm text-muted-foreground">
                        Common tasks and helpful shortcuts
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => window.open('https://github.com/settings/applications', '_blank')}
                      iconName="Github"
                      iconPosition="left"
                      iconSize={16}
                      className="justify-start"
                    >
                      Manage GitHub Apps
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleSectionChange('notifications')}
                      iconName="Bell"
                      iconPosition="left"
                      iconSize={16}
                      className="justify-start"
                    >
                      Test Notifications
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => {
                        const dataStr = JSON.stringify(userData, null, 2);
                        const dataBlob = new Blob([dataStr], { type: 'application/json' });
                        const url = URL.createObjectURL(dataBlob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'profile-backup.json';
                        link?.click();
                      }}
                      iconName="Download"
                      iconPosition="left"
                      iconSize={16}
                      className="justify-start"
                    >
                      Export Profile Data
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;