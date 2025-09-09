import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const RepositoryCard = ({ repository, onBookmark, isBookmarked = false }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const handleBookmark = async (e) => {
    e?.stopPropagation();
    setBookmarkLoading(true);
    
    try {
      await onBookmark?.(repository?.id, !isBookmarked);
    } catch (error) {
      console.error('Bookmark action failed:', error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate('/issue-details', { state: { repository } });
  };

  const handleGitHubClick = (e) => {
    e?.stopPropagation();
    window.open(repository?.html_url, '_blank', 'noopener,noreferrer');
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'k';
    }
    return num?.toString();
  };

  const getDifficultyColor = (level) => {
    switch (level) {
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

  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': '#f1e05a',
      'Python': '#3572A5',
      'Java': '#b07219',
      'TypeScript': '#2b7489',
      'C++': '#f34b7d',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'PHP': '#4F5D95'
    };
    return colors?.[language] || '#64748b';
  };

  return (
    <div
      className="bg-card border border-border rounded-lg p-6 cursor-pointer transition-smooth hover:shadow-elevated hover:scale-105 hover:border-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <Icon name="GitBranch" size={20} className="text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {repository?.name}
            </h3>
            <p className="text-sm text-muted-foreground font-mono truncate">
              {repository?.full_name}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleBookmark}
          loading={bookmarkLoading}
          className="flex-shrink-0"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Icon 
            name={isBookmarked ? 'BookmarkCheck' : 'Bookmark'} 
            size={18}
            className={isBookmarked ? 'text-primary' : 'text-muted-foreground'}
          />
        </Button>
      </div>
      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 min-h-[60px]">
        {repository?.description || 'No description available for this repository.'}
      </p>
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {repository?.is_civic && (
          <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full font-medium">
            Civic Tech
          </span>
        )}
        
        {repository?.beginner_friendly && (
          <span className="px-2 py-1 bg-success text-success-foreground text-xs rounded-full font-medium">
            Beginner Friendly
          </span>
        )}
        
        {repository?.difficulty_level && (
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getDifficultyColor(repository?.difficulty_level)}`}>
            {repository?.difficulty_level}
          </span>
        )}
      </div>
      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-warning" />
            <span className="text-sm font-medium">{formatNumber(repository?.stargazers_count)}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="GitFork" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{formatNumber(repository?.forks_count)}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} className="text-primary" />
            <span className="text-sm text-primary font-medium">{repository?.open_issues_count} issues</span>
          </div>
        </div>

        {repository?.language && (
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getLanguageColor(repository?.language) }}
            />
            <span className="text-sm text-muted-foreground">{repository?.language}</span>
          </div>
        )}
      </div>
      {/* Quick Preview (on hover) */}
      {isHovered && (
        <div className="border-t border-border pt-4 mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-foreground">{repository?.contributors_count || 12}</div>
              <div className="text-xs text-muted-foreground">Contributors</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">{repository?.commits_count || 156}</div>
              <div className="text-xs text-muted-foreground">Commits</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">{repository?.documentation_score || 85}%</div>
              <div className="text-xs text-muted-foreground">Docs Quality</div>
            </div>
          </div>
        </div>
      )}
      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Updated {new Date(repository.updated_at)?.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
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
          
          <Button
            variant="default"
            size="sm"
            onClick={handleCardClick}
            iconName="ArrowRight"
            iconSize={14}
            className="text-xs"
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;