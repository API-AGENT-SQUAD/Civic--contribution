import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ 
  issue, 
  onBookmark, 
  onViewDetails, 
  isBookmarked = false 
}) => {
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-success text-success-foreground';
      case 'intermediate':
        return 'bg-warning text-warning-foreground';
      case 'advanced':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimeCommitment = (hours) => {
    if (hours < 1) return '< 1 hour';
    if (hours === 1) return '1 hour';
    if (hours < 8) return `${hours} hours`;
    if (hours < 24) return `${Math.round(hours / 8)} day${Math.round(hours / 8) > 1 ? 's' : ''}`;
    return `${Math.round(hours / 24)} week${Math.round(hours / 24) > 1 ? 's' : ''}`;
  };

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 cursor-pointer transition-smooth hover:shadow-soft hover:scale-105 hover:border-primary/20"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="GitBranch" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-mono truncate">
              {issue?.repository}
            </span>
            {issue?.isCivicProject && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                Civic
              </span>
            )}
          </div>
          
          <h3 className="text-base font-medium text-foreground line-clamp-2 mb-2">
            {issue?.title}
          </h3>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(issue?.difficulty)}`}>
              {issue?.difficulty}
            </span>
            
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              {formatTimeCommitment(issue?.timeCommitment)}
            </span>
            
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
        >
          <Icon 
            name={isBookmarked ? 'BookmarkCheck' : 'Bookmark'} 
            size={16}
            className={isBookmarked ? 'text-primary' : 'text-muted-foreground'}
          />
        </Button>
      </div>
      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
        {issue?.description}
      </p>
      {/* Skills Required */}
      <div className="flex flex-wrap gap-1 mb-4">
        {issue?.skills?.slice(0, 3)?.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
          >
            {skill}
          </span>
        ))}
        {issue?.skills?.length > 3 && (
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
            +{issue?.skills?.length - 3} more
          </span>
        )}
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MessageSquare" size={14} />
            <span>{issue?.comments}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} />
            <span>{issue?.stars}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{issue?.lastUpdated}</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e?.stopPropagation();
            window.open(issue?.githubUrl, '_blank', 'noopener,noreferrer');
          }}
          iconName="ExternalLink"
          iconSize={14}
          className="text-xs"
        >
          GitHub
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;