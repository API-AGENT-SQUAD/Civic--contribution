import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressWidget = ({ progressData, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in-progress':
        return 'text-warning';
      case 'review':
        return 'text-primary';
      case 'blocked':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'review':
        return 'Eye';
      case 'blocked':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10';
      case 'in-progress':
        return 'bg-warning/10';
      case 'review':
        return 'bg-primary/10';
      case 'blocked':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Issue Progress</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewDetails}
          iconName="ArrowRight"
          iconSize={14}
          className="text-xs"
        >
          View All
        </Button>
      </div>
      {/* Progress Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-success">{progressData?.completed}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning">{progressData?.inProgress}</div>
          <div className="text-xs text-muted-foreground">In Progress</div>
        </div>
      </div>
      {/* Current Issues */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Current Issues</h4>
        {progressData?.currentIssues?.map((issue) => (
          <div key={issue?.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getStatusBg(issue?.status)} flex items-center justify-center`}>
              <Icon 
                name={getStatusIcon(issue?.status)} 
                size={14} 
                className={getStatusColor(issue?.status)} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {issue?.title}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground font-mono">
                  {issue?.repository}
                </span>
                <span className="text-xs text-muted-foreground">
                  #{issue?.number}
                </span>
              </div>
            </div>
            
            <div className="flex-shrink-0 text-right">
              <div className={`text-xs font-medium ${getStatusColor(issue?.status)}`}>
                {issue?.status?.replace('-', ' ')}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {issue?.lastUpdate}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Progress Bar */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-foreground">Overall Progress</span>
          <span className="text-muted-foreground">{progressData?.overallProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-smooth"
            style={{ width: `${progressData?.overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressWidget;