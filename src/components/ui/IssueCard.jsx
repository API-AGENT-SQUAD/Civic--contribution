import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const IssueCard = ({ 
  issue, 
  onBookmark, 
  onViewDetails, 
  isBookmarked = false,
  showRepository = true,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const handleBookmark = async (e) => {
    e?.stopPropagation();
    setBookmarkLoading(true);
    
    try {
      await onBookmark?.(issue?.id, !isBookmarked);
    } catch (error) {
      console.error('Bookmark action failed:', error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleCardClick = () => {
    onViewDetails?.(issue);
  };

  const handleGitHubClick = (e) => {
    e?.stopPropagation();
    window.open(issue?.html_url, '_blank', 'noopener,noreferrer');
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

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      className={`
        bg-card border border-border rounded-lg p-4 cursor-pointer transition-smooth
        hover:shadow-soft hover:scale-105 hover:border-primary/20
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          {showRepository && issue?.repository && (
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="GitBranch" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-mono truncate">
                {issue?.repository?.full_name}
              </span>
            </div>
          )}
          
          <h3 className="text-base font-medium text-foreground line-clamp-2 mb-2">
            {issue?.title}
          </h3>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue?.state)}`}>
              {issue?.state}
            </span>
            
            {issue?.difficulty && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(issue?.difficulty)}`}>
                {issue?.difficulty}
              </span>
            )}
            
            <span className="text-xs text-muted-foreground">
              #{issue?.number}
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleBookmark}
          loading={bookmarkLoading}
          className="ml-2 flex-shrink-0"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Icon 
            name={isBookmarked ? 'BookmarkCheck' : 'Bookmark'} 
            size={16}
            className={isBookmarked ? 'text-primary' : 'text-muted-foreground'}
          />
        </Button>
      </div>
      {/* Description */}
      {issue?.body && (
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {issue?.body?.replace(/[#*`]/g, '')?.substring(0, 150)}
          {issue?.body?.length > 150 && '...'}
        </p>
      )}
      {/* Labels */}
      {issue?.labels && issue?.labels?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {issue?.labels?.slice(0, 3)?.map((label) => (
            <span
              key={label?.id}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              style={{
                backgroundColor: label?.color ? `#${label?.color}20` : undefined,
                color: label?.color ? `#${label?.color}` : undefined
              }}
            >
              {label?.name}
            </span>
          ))}
          {issue?.labels?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{issue?.labels?.length - 3} more
            </span>
          )}
        </div>
      )}
      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MessageSquare" size={14} />
            <span>{issue?.comments || 0}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{formatDate(issue?.created_at)}</span>
          </div>
          
          {issue?.assignee && (
            <div className="flex items-center space-x-1">
              <Icon name="User" size={14} />
              <span>Assigned</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGitHubClick}
            iconName="ExternalLink"
            iconSize={14}
            className="text-xs"
          >
            GitHub
          </Button>
          
          {isHovered && (
            <Button
              variant="default"
              size="sm"
              onClick={handleCardClick}
              iconName="ArrowRight"
              iconSize={14}
              className="text-xs"
            >
              Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueCard;