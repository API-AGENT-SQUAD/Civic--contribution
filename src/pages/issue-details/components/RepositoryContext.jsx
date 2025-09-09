import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RepositoryContext = ({ repository }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'k';
    }
    return num?.toString() || '0';
  };

  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#2b7489',
      'Python': '#3572A5',
      'Java': '#b07219',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'C++': '#f34b7d',
      'HTML': '#e34c26',
      'CSS': '#1572B6',
      'React': '#61dafb'
    };
    return colors?.[language] || '#8b5cf6';
  };

  const mockContributionGuidelines = `## Contributing to ${repository?.name || 'this project'}

### Getting Started
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: \`npm install\`
4. Create a new branch: \`git checkout -b feature/your-feature\`

### Development Process
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Pull Request Guidelines
- Use clear, descriptive commit messages
- Reference the issue number in your PR
- Include screenshots for UI changes
- Request review from maintainers

### Code of Conduct
Please be respectful and inclusive in all interactions.`;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="GitBranch" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Repository Context</h2>
      </div>
      {/* Repository Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <Icon name="Star" size={16} className="text-warning mx-auto mb-1" />
          <div className="text-lg font-semibold text-foreground">{formatNumber(repository?.stargazers_count)}</div>
          <div className="text-xs text-muted-foreground">Stars</div>
        </div>
        
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <Icon name="GitFork" size={16} className="text-primary mx-auto mb-1" />
          <div className="text-lg font-semibold text-foreground">{formatNumber(repository?.forks_count)}</div>
          <div className="text-xs text-muted-foreground">Forks</div>
        </div>
        
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <Icon name="AlertCircle" size={16} className="text-error mx-auto mb-1" />
          <div className="text-lg font-semibold text-foreground">{formatNumber(repository?.open_issues_count)}</div>
          <div className="text-xs text-muted-foreground">Issues</div>
        </div>
        
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <Icon name="Users" size={16} className="text-success mx-auto mb-1" />
          <div className="text-lg font-semibold text-foreground">{formatNumber(repository?.watchers_count)}</div>
          <div className="text-xs text-muted-foreground">Watchers</div>
        </div>
      </div>
      {/* Description */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-2">Project Description</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {repository?.description || "A modern web application built with React and Node.js, focusing on user experience and performance. This project aims to provide developers with tools and resources for building scalable applications."}
        </p>
      </div>
      {/* Tech Stack */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {repository?.language && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getLanguageColor(repository?.language) }}
              />
              <span className="text-sm text-foreground">{repository?.language}</span>
            </div>
          )}
          
          {/* Mock additional technologies */}
          {['React', 'Node.js', 'Express', 'MongoDB']?.map((tech) => (
            <div key={tech} className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getLanguageColor(tech) }}
              />
              <span className="text-sm text-foreground">{tech}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Maintainer Responsiveness */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Maintainer Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <div>
              <div className="text-sm font-medium text-foreground">Response Time</div>
              <div className="text-xs text-muted-foreground">Usually within 2 days</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <Icon name="Activity" size={16} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Last Activity</div>
              <div className="text-xs text-muted-foreground">3 days ago</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <Icon name="GitPullRequest" size={16} className="text-warning" />
            <div>
              <div className="text-sm font-medium text-foreground">PR Merge Rate</div>
              <div className="text-xs text-muted-foreground">85% accepted</div>
            </div>
          </div>
        </div>
      </div>
      {/* Contribution Guidelines */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Contribution Guidelines</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? "Hide" : "Show"}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="bg-muted/50 rounded-lg p-4">
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
              {mockContributionGuidelines}
            </pre>
          </div>
        )}
        
        {!isExpanded && (
          <p className="text-sm text-muted-foreground">
            Clear contribution guidelines available. Click to view setup instructions, coding standards, and PR requirements.
          </p>
        )}
      </div>
    </div>
  );
};

export default RepositoryContext;