import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CivicMissionBanner = () => {
  const missionPoints = [
    {
      icon: 'Users',
      title: 'Connect Developers',
      description: 'Join a community of civic-minded developers making real impact'
    },
    {
      icon: 'GitBranch',
      title: 'Meaningful Contributions',
      description: 'Find beginner-friendly issues in projects that matter'
    },
    {
      icon: 'Heart',
      title: 'Civic Engagement',
      description: 'Use your coding skills to strengthen communities and democracy'
    }
  ];

  const stats = [
    { label: 'Active Contributors', value: '2,500+' },
    { label: 'Open Issues', value: '15,000+' },
    { label: 'Projects Supported', value: '850+' }
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-8 lg:py-12">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Diverse group of developers collaborating on civic technology projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold mb-2">Code for Good</h2>
            <p className="text-sm opacity-90">
              Transform communities through technology
            </p>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Welcome to Civic Contributor
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Connect your coding skills with meaningful open-source projects that strengthen communities and advance civic engagement.
          </p>
        </div>
      </div>
      {/* Mission Points */}
      <div className="space-y-6 mb-8">
        {missionPoints?.map((point, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={point?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                {point?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {point?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-xl font-bold text-primary mb-1">
              {stat?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Security Notice */}
      <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">Secure & Private</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Your GitHub data is protected with enterprise-grade security. We only access public repository information needed for issue matching.
        </p>
      </div>
    </div>
  );
};

export default CivicMissionBanner;