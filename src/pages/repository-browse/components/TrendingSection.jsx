import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingSection = ({ repositories = [] }) => {
  const navigate = useNavigate();

  const handleRepositoryClick = (repository) => {
    navigate('/issue-details', { state: { repository } });
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'k';
    }
    return num?.toString();
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

  if (!repositories?.length) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="TrendingUp" size={24} className="text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Trending Civic Tech</h2>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => navigate('/repository-browse')}
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repositories?.slice(0, 6)?.map((repo, index) => (
          <div
            key={repo?.id}
            className="bg-card border border-border rounded-lg p-4 cursor-pointer transition-smooth hover:shadow-soft hover:scale-105 hover:border-primary/20"
            onClick={() => handleRepositoryClick(repo)}
          >
            {/* Trending Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                  #{index + 1} Trending
                </span>
                {repo?.is_civic && (
                  <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full font-medium">
                    Civic
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-1 text-success">
                <Icon name="TrendingUp" size={14} />
                <span className="text-xs font-medium">+{repo?.growth_rate || 15}%</span>
              </div>
            </div>

            {/* Repository Info */}
            <div className="mb-3">
              <h3 className="font-semibold text-foreground truncate mb-1">
                {repo?.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                {repo?.description || 'No description available.'}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning" />
                  <span className="text-sm font-medium">{formatNumber(repo?.stargazers_count)}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} className="text-primary" />
                  <span className="text-sm text-primary">{repo?.open_issues_count}</span>
                </div>
              </div>

              {repo?.language && (
                <div className="flex items-center space-x-1">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getLanguageColor(repo?.language) }}
                  />
                  <span className="text-xs text-muted-foreground">{repo?.language}</span>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                {repo?.contributors_count || 8} contributors
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="ExternalLink"
                iconSize={12}
                onClick={(e) => {
                  e?.stopPropagation();
                  window.open(repo?.html_url, '_blank', 'noopener,noreferrer');
                }}
                className="text-xs"
              >
                GitHub
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;