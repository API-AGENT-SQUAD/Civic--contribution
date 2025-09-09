import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContributionHistory = ({ contributions }) => {
  const [viewMode, setViewMode] = useState('recent'); // recent, all, stats
  const [selectedPeriod, setSelectedPeriod] = useState('month'); // week, month, year

  const mockContributions = [
    {
      id: 1,
      type: 'pull_request',
      title: 'Fix responsive layout issues in dashboard',
      repository: 'civic-tech/community-portal',
      status: 'merged',
      createdAt: '2025-01-05T10:30:00Z',
      url: 'https://github.com/civic-tech/community-portal/pull/123',
      language: 'JavaScript',
      difficulty: 'intermediate'
    },
    {
      id: 2,
      type: 'issue',
      title: 'Add accessibility features to form components',
      repository: 'open-source/ui-library',
      status: 'open',
      createdAt: '2025-01-03T14:20:00Z',
      url: 'https://github.com/open-source/ui-library/issues/456',
      language: 'TypeScript',
      difficulty: 'beginner'
    },
    {
      id: 3,
      type: 'pull_request',
      title: 'Implement dark mode toggle functionality',
      repository: 'community/design-system',
      status: 'closed',
      createdAt: '2024-12-28T09:15:00Z',
      url: 'https://github.com/community/design-system/pull/789',
      language: 'CSS',
      difficulty: 'intermediate'
    },
    {
      id: 4,
      type: 'documentation',
      title: 'Update API documentation with new endpoints',
      repository: 'tech-for-good/api-docs',
      status: 'merged',
      createdAt: '2024-12-25T16:45:00Z',
      url: 'https://github.com/tech-for-good/api-docs/pull/234',
      language: 'Markdown',
      difficulty: 'beginner'
    },
    {
      id: 5,
      type: 'bug_fix',
      title: 'Resolve memory leak in data processing module',
      repository: 'environmental/data-analyzer',
      status: 'merged',
      createdAt: '2024-12-20T11:30:00Z',
      url: 'https://github.com/environmental/data-analyzer/pull/567',
      language: 'Python',
      difficulty: 'advanced'
    }
  ];

  const getContributionIcon = (type) => {
    switch (type) {
      case 'pull_request':
        return 'GitPullRequest';
      case 'issue':
        return 'AlertCircle';
      case 'documentation':
        return 'FileText';
      case 'bug_fix':
        return 'Bug';
      default:
        return 'Code';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'merged':
        return 'text-success bg-success/10';
      case 'open':
        return 'text-primary bg-primary/10';
      case 'closed':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-success bg-success/10';
      case 'intermediate':
        return 'text-warning bg-warning/10';
      case 'advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getContributionStats = () => {
    const total = mockContributions?.length;
    const merged = mockContributions?.filter(c => c?.status === 'merged')?.length;
    const open = mockContributions?.filter(c => c?.status === 'open')?.length;
    const languages = [...new Set(mockContributions.map(c => c.language))];
    
    return { total, merged, open, languages: languages?.length };
  };

  const stats = getContributionStats();

  const renderStatsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="GitBranch" size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats?.total}</p>
            <p className="text-sm text-muted-foreground">Total Contributions</p>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="CheckCircle" size={20} className="text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats?.merged}</p>
            <p className="text-sm text-muted-foreground">Merged PRs</p>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
            <Icon name="Clock" size={20} className="text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats?.open}</p>
            <p className="text-sm text-muted-foreground">Open Issues</p>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Code" size={20} className="text-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats?.languages}</p>
            <p className="text-sm text-muted-foreground">Languages Used</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContributionsList = () => (
    <div className="space-y-4">
      {mockContributions?.map((contribution) => (
        <div
          key={contribution?.id}
          className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg mt-1">
                <Icon name={getContributionIcon(contribution?.type)} size={14} className="text-muted-foreground" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2">
                  {contribution?.title}
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="GitBranch" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-mono">
                    {contribution?.repository}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution?.status)}`}>
                    {contribution?.status}
                  </span>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(contribution?.difficulty)}`}>
                    {contribution?.difficulty}
                  </span>
                  
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    {contribution?.language}
                  </span>
                  
                  <span className="text-xs text-muted-foreground">
                    {formatDate(contribution?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(contribution?.url, '_blank')}
              iconName="ExternalLink"
              iconSize={14}
              className="ml-4 flex-shrink-0"
            >
              View
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Activity" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Contribution History</h2>
            <p className="text-sm text-muted-foreground">Track your open-source contributions and impact</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'stats' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('stats')}
            iconName="BarChart3"
            iconSize={14}
          >
            Stats
          </Button>
          
          <Button
            variant={viewMode === 'recent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('recent')}
            iconName="List"
            iconSize={14}
          >
            Recent
          </Button>
        </div>
      </div>
      {viewMode === 'stats' && renderStatsView()}
      {viewMode === 'recent' && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-medium text-foreground">Recent Contributions</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('all')}
              iconName="ArrowRight"
              iconSize={14}
            >
              View All
            </Button>
          </div>
          {renderContributionsList()}
        </>
      )}
      {mockContributions?.length === 0 && (
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
            <Icon name="GitBranch" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Contributions Yet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Start contributing to open-source projects to see your history here
          </p>
          <Button
            variant="default"
            iconName="Search"
            iconPosition="left"
            iconSize={16}
          >
            Find Issues to Contribute
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContributionHistory;