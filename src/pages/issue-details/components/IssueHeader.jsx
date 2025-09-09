import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IssueHeader = ({ issue, onBookmark, onGitHubClick, isBookmarked = false }) => {
  const getStatusColor = (state) => {
    switch (state) {
      case 'open':
        return 'bg-success text-success-foreground';
      case 'closed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': case'good first issue':
        return 'bg-success text-success-foreground';
      case 'intermediate':
        return 'bg-warning text-warning-foreground';
      case 'advanced':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Repository Info */}
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="GitBranch" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-mono">
          {issue?.repository?.full_name}
        </span>
        <span className="text-muted-foreground">•</span>
        <span className="text-sm text-muted-foreground">
          Issue #{issue?.number}
        </span>
      </div>
      {/* Title */}
      <h1 className="text-2xl font-bold text-foreground mb-4 leading-tight">
        {issue?.title}
      </h1>
      {/* Status and Labels */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(issue?.state)}`}>
          <Icon name={issue?.state === 'open' ? 'CircleDot' : 'CheckCircle'} size={14} className="inline mr-1" />
          {issue?.state}
        </span>
        
        {issue?.difficulty && (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(issue?.difficulty)}`}>
            {issue?.difficulty}
          </span>
        )}

        {issue?.labels?.slice(0, 4)?.map((label) => (
          <span
            key={label?.id}
            className="px-2 py-1 bg-muted text-muted-foreground text-sm rounded-md"
            style={{
              backgroundColor: label?.color ? `#${label?.color}20` : undefined,
              color: label?.color ? `#${label?.color}` : undefined
            }}
          >
            {label?.name}
          </span>
        ))}
        
        {issue?.labels?.length > 4 && (
          <span className="px-2 py-1 bg-muted text-muted-foreground text-sm rounded-md">
            +{issue?.labels?.length - 4} more
          </span>
        )}
      </div>
      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={14} />
          <span>Created {formatDate(issue?.created_at)}</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Icon name="MessageSquare" size={14} />
          <span>{issue?.comments || 0} comments</span>
        </div>
        
        {issue?.assignee && (
          <div className="flex items-center space-x-1">
            <Icon name="User" size={14} />
            <span>Assigned to {issue?.assignee?.login}</span>
          </div>
        )}
        
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} />
          <span>Updated {formatDate(issue?.updated_at)}</span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="default"
          onClick={onGitHubClick}
          iconName="ExternalLink"
          iconPosition="right"
          className="flex-shrink-0"
        >
          View on GitHub
        </Button>
        
        <Button
          variant={isBookmarked ? "secondary" : "outline"}
          onClick={onBookmark}
          iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
          iconPosition="left"
          className="flex-shrink-0"
        >
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
        
        <Button
          variant="outline"
          iconName="Share"
          iconPosition="left"
          onClick={() => {
            navigator.clipboard?.writeText(window.location?.href);
          }}
        >
          Share
        </Button>
      </div>
    </div>
  );
};

export default IssueHeader;