import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatsPanel = ({ stats, onViewAll }) => {
  const statItems = [
    {
      label: 'Issues Contributed',
      value: stats?.contributedIssues,
      icon: 'GitPullRequest',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Repositories',
      value: stats?.repositories,
      icon: 'GitBranch',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Bookmarked',
      value: stats?.bookmarked,
      icon: 'Bookmark',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Skill Level',
      value: stats?.skillLevel,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Your Progress</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconSize={14}
          className="text-xs"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {statItems?.map((item) => (
          <div key={item?.label} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${item?.bgColor} mb-2`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground">{item?.value}</div>
            <div className="text-xs text-muted-foreground">{item?.label}</div>
          </div>
        ))}
      </div>
      {/* Recent Activity */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Activity</h4>
        <div className="space-y-3">
          {stats?.recentActivity?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${activity?.bgColor} flex items-center justify-center`}>
                <Icon name={activity?.icon} size={14} className={activity?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground line-clamp-2">{activity?.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity?.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Skill Progress */}
      <div className="border-t border-border pt-4 mt-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Skill Progress</h4>
        <div className="space-y-3">
          {stats?.skillProgress?.map((skill) => (
            <div key={skill?.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">{skill?.name}</span>
                <span className="text-muted-foreground">{skill?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-smooth"
                  style={{ width: `${skill?.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;