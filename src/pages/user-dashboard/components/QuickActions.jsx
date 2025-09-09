import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ 
  selectedIssues, 
  onBulkBookmark, 
  onBulkStatusUpdate, 
  onClearSelection 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBulkBookmark = async () => {
    setIsLoading(true);
    try {
      await onBulkBookmark?.(selectedIssues);
    } catch (error) {
      console.error('Bulk bookmark failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkStatusUpdate = async (status) => {
    setIsLoading(true);
    try {
      await onBulkStatusUpdate?.(selectedIssues, status);
    } catch (error) {
      console.error('Bulk status update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedIssues?.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card border border-border rounded-lg shadow-elevated p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedIssues?.length} issue{selectedIssues?.length > 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkBookmark}
              loading={isLoading}
              iconName="Bookmark"
              iconSize={14}
              className="text-xs"
            >
              Bookmark All
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkStatusUpdate('interested')}
              loading={isLoading}
              iconName="Heart"
              iconSize={14}
              className="text-xs"
            >
              Mark Interested
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkStatusUpdate('working')}
              loading={isLoading}
              iconName="Code"
              iconSize={14}
              className="text-xs"
            >
              Start Working
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
              iconSize={14}
              className="text-xs"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;