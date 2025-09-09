import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProgressTracker = ({ issue }) => {
  const [contributionStatus, setContributionStatus] = useState('interested');
  const [isTracking, setIsTracking] = useState(false);

  const statusOptions = [
    { value: 'interested', label: 'Interested' },
    { value: 'researching', label: 'Researching' },
    { value: 'working', label: 'Working on it' },
    { value: 'testing', label: 'Testing solution' },
    { value: 'submitted', label: 'PR submitted' },
    { value: 'completed', label: 'Completed' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'interested':
        return 'text-muted-foreground';
      case 'researching':
        return 'text-primary';
      case 'working':
        return 'text-warning';
      case 'testing':
        return 'text-warning';
      case 'submitted':
        return 'text-success';
      case 'completed':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'interested':
        return 'Eye';
      case 'researching':
        return 'Search';
      case 'working':
        return 'Code';
      case 'testing':
        return 'TestTube';
      case 'submitted':
        return 'GitPullRequest';
      case 'completed':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const handleStatusChange = (newStatus) => {
    setContributionStatus(newStatus);
    if (newStatus !== 'interested') {
      setIsTracking(true);
    }
  };

  const handleStartTracking = () => {
    setIsTracking(true);
    setContributionStatus('researching');
  };

  const mockProgressSteps = [
    {
      id: 1,
      title: "Understanding the Issue",
      description: "Read through the issue description and requirements",
      completed: contributionStatus !== 'interested',
      current: contributionStatus === 'researching'
    },
    {
      id: 2,
      title: "Environment Setup",
      description: "Fork repository and set up local development environment",
      completed: ['working', 'testing', 'submitted', 'completed']?.includes(contributionStatus),
      current: contributionStatus === 'working'
    },
    {
      id: 3,
      title: "Implementation",
      description: "Write code to address the issue requirements",
      completed: ['testing', 'submitted', 'completed']?.includes(contributionStatus),
      current: contributionStatus === 'working'
    },
    {
      id: 4,
      title: "Testing",
      description: "Test your solution and ensure it meets acceptance criteria",
      completed: ['submitted', 'completed']?.includes(contributionStatus),
      current: contributionStatus === 'testing'
    },
    {
      id: 5,
      title: "Pull Request",
      description: "Submit your changes for review",
      completed: contributionStatus === 'completed',
      current: contributionStatus === 'submitted'
    }
  ];

  const mockResources = [
    {
      title: "Getting Started Guide",
      description: "Step-by-step setup instructions",
      url: "#",
      icon: "BookOpen"
    },
    {
      title: "Code Style Guide",
      description: "Project coding standards and conventions",
      url: "#",
      icon: "Code"
    },
    {
      title: "Testing Guidelines",
      description: "How to write and run tests",
      url: "#",
      icon: "TestTube"
    },
    {
      title: "PR Template",
      description: "Template for submitting pull requests",
      url: "#",
      icon: "GitPullRequest"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Target" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Progress Tracker</h2>
      </div>
      {!isTracking ? (
        /* Initial State */
        (<div className="text-center py-8">
          <Icon name="Rocket" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Ready to contribute?</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Track your progress on this issue and get personalized guidance throughout your contribution journey.
          </p>
          <div className="flex justify-center space-x-3">
            <Button
              variant="default"
              onClick={handleStartTracking}
              iconName="Play"
              iconPosition="left"
            >
              Start Contributing
            </Button>
            
            <Button
              variant="outline"
              iconName="Bookmark"
              iconPosition="left"
            >
              Save for Later
            </Button>
          </div>
        </div>)
      ) : (
        /* Tracking State */
        (<div className="space-y-6">
          {/* Status Selector */}
          <div>
            <Select
              label="Current Status"
              description="Update your progress to get relevant guidance"
              options={statusOptions}
              value={contributionStatus}
              onChange={handleStatusChange}
            />
          </div>
          {/* Progress Steps */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">Contribution Steps</h3>
            <div className="space-y-3">
              {mockProgressSteps?.map((step, index) => (
                <div key={step?.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    step?.completed 
                      ? 'bg-success text-success-foreground' 
                      : step?.current 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step?.completed ? (
                      <Icon name="Check" size={14} />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium ${
                      step?.completed || step?.current ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {step?.description}
                    </p>
                  </div>
                  
                  {step?.current && (
                    <Icon name="ArrowRight" size={16} className="text-primary flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Current Status Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon 
                name={getStatusIcon(contributionStatus)} 
                size={16} 
                className={getStatusColor(contributionStatus)} 
              />
              <h4 className="text-sm font-medium text-foreground">
                Current Status: {statusOptions?.find(opt => opt?.value === contributionStatus)?.label}
              </h4>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {contributionStatus === 'interested' && "Great! Take your time to understand the requirements."}
              {contributionStatus === 'researching' && "Read through the issue details and check out the repository structure."}
              {contributionStatus === 'working' && "You're making progress! Don't hesitate to ask questions in the comments."}
              {contributionStatus === 'testing' && "Almost there! Make sure your solution meets all acceptance criteria."}
              {contributionStatus === 'submitted' && "Excellent work! Your PR is under review."}
              {contributionStatus === 'completed' && "Congratulations on your successful contribution!"}
            </p>
          </div>
          {/* Helpful Resources */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Helpful Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockResources?.map((resource, index) => (
                <a
                  key={index}
                  href={resource?.url}
                  className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-smooth"
                >
                  <Icon name={resource?.icon} size={16} className="text-primary" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground">{resource?.title}</h4>
                    <p className="text-xs text-muted-foreground">{resource?.description}</p>
                  </div>
                  <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageSquare"
              iconPosition="left"
            >
              Ask Question
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Users"
              iconPosition="left"
            >
              Find Mentor
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left"
            >
              Share Progress
            </Button>
          </div>
        </div>)
      )}
    </div>
  );
};

export default ProgressTracker;