import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Authentication',
      description: 'Enterprise-grade security with encrypted data storage'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'Your personal information is never shared with third parties'
    },
    {
      icon: 'GitBranch',
      title: 'GitHub Verified',
      description: 'Official GitHub API integration for authentic project data'
    },
    {
      icon: 'Users',
      title: 'Community Driven',
      description: 'Join thousands of developers making meaningful contributions'
    }
  ];

  return (
    <div className="bg-muted/30 rounded-lg p-6 mb-6">
      <div className="text-center mb-6">
        <Icon name="Award" size={32} className="text-primary mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Trusted by Developers Worldwide
        </h3>
        <p className="text-sm text-muted-foreground">
          Join a secure platform designed for meaningful open-source contributions
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">GDPR Compliant</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Check" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">SOC 2 Certified</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;