import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const InterestPreferences = ({ preferences, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState(preferences?.domains || []);
  const [selectedCauses, setSelectedCauses] = useState(preferences?.causes || []);
  const [selectedContributions, setSelectedContributions] = useState(preferences?.contributions || []);
  const [isLoading, setIsLoading] = useState(false);

  const projectDomains = [
    { id: 'web-development', name: 'Web Development', icon: 'Globe' },
    { id: 'mobile-apps', name: 'Mobile Apps', icon: 'Smartphone' },
    { id: 'data-science', name: 'Data Science', icon: 'BarChart3' },
    { id: 'machine-learning', name: 'Machine Learning', icon: 'Brain' },
    { id: 'devops', name: 'DevOps & Infrastructure', icon: 'Server' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: 'Shield' },
    { id: 'game-development', name: 'Game Development', icon: 'Gamepad2' },
    { id: 'blockchain', name: 'Blockchain', icon: 'Link' }
  ];

  const causeAreas = [
    { id: 'education', name: 'Education & Learning', icon: 'GraduationCap' },
    { id: 'healthcare', name: 'Healthcare & Medicine', icon: 'Heart' },
    { id: 'environment', name: 'Environment & Climate', icon: 'Leaf' },
    { id: 'social-justice', name: 'Social Justice', icon: 'Scale' },
    { id: 'accessibility', name: 'Accessibility', icon: 'Eye' },
    { id: 'open-source', name: 'Open Source Tools', icon: 'Code' },
    { id: 'civic-tech', name: 'Civic Technology', icon: 'Building' },
    { id: 'humanitarian', name: 'Humanitarian Aid', icon: 'Users' }
  ];

  const contributionTypes = [
    { id: 'bug-fixes', name: 'Bug Fixes', icon: 'Bug' },
    { id: 'new-features', name: 'New Features', icon: 'Plus' },
    { id: 'documentation', name: 'Documentation', icon: 'FileText' },
    { id: 'testing', name: 'Testing & QA', icon: 'CheckCircle' },
    { id: 'ui-ux', name: 'UI/UX Improvements', icon: 'Palette' },
    { id: 'performance', name: 'Performance Optimization', icon: 'Zap' },
    { id: 'security', name: 'Security Enhancements', icon: 'Lock' },
    { id: 'refactoring', name: 'Code Refactoring', icon: 'RefreshCw' }
  ];

  const handleDomainChange = (domainId, checked) => {
    if (checked) {
      setSelectedDomains(prev => [...prev, domainId]);
    } else {
      setSelectedDomains(prev => prev?.filter(id => id !== domainId));
    }
  };

  const handleCauseChange = (causeId, checked) => {
    if (checked) {
      setSelectedCauses(prev => [...prev, causeId]);
    } else {
      setSelectedCauses(prev => prev?.filter(id => id !== causeId));
    }
  };

  const handleContributionChange = (contributionId, checked) => {
    if (checked) {
      setSelectedContributions(prev => [...prev, contributionId]);
    } else {
      setSelectedContributions(prev => prev?.filter(id => id !== contributionId));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onUpdate?.({
        domains: selectedDomains,
        causes: selectedCauses,
        contributions: selectedContributions
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedDomains(preferences?.domains || []);
    setSelectedCauses(preferences?.causes || []);
    setSelectedContributions(preferences?.contributions || []);
    setIsEditing(false);
  };

  const renderPreferenceSection = (title, items, selectedItems, onItemChange, icon) => (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name={icon} size={16} className="text-primary" />
        <label className="text-sm font-medium text-foreground">
          {title}
          <span className="text-xs text-muted-foreground ml-2">
            ({selectedItems?.length} selected)
          </span>
        </label>
      </div>
      
      {!isEditing ? (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedItems?.length > 0 ? (
            items?.filter(item => selectedItems?.includes(item?.id))?.map((item) => (
                <div
                  key={item?.id}
                  className="flex items-center space-x-2 px-3 py-2 bg-primary/10 text-primary text-sm rounded-lg"
                >
                  <Icon name={item?.icon} size={14} />
                  <span>{item?.name}</span>
                </div>
              ))
          ) : (
            <p className="text-sm text-muted-foreground">No preferences selected</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 max-h-48 overflow-y-auto border border-border rounded-lg p-4">
          {items?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-3">
              <Checkbox
                checked={selectedItems?.includes(item?.id)}
                onChange={(e) => onItemChange(item?.id, e?.target?.checked)}
              />
              <Icon name={item?.icon} size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{item?.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Heart" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Interest Preferences</h2>
            <p className="text-sm text-muted-foreground">Customize your interests to get better issue recommendations</p>
          </div>
        </div>
        
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Project Domains */}
        {renderPreferenceSection(
          'Project Domains',
          projectDomains,
          selectedDomains,
          handleDomainChange,
          'Folder'
        )}

        {/* Cause Areas */}
        {renderPreferenceSection(
          'Cause Areas',
          causeAreas,
          selectedCauses,
          handleCauseChange,
          'Target'
        )}

        {/* Contribution Types */}
        {renderPreferenceSection(
          'Contribution Types',
          contributionTypes,
          selectedContributions,
          handleContributionChange,
          'GitPullRequest'
        )}

        {/* Impact Preview */}
        {!isEditing && (
          <div className="border border-border rounded-lg p-4 bg-accent/5">
            <div className="flex items-start space-x-3">
              <Icon name="TrendingUp" size={16} className="text-accent mt-1" />
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Recommendation Impact</p>
                <p className="text-xs text-muted-foreground">
                  Your preferences help us match you with {selectedDomains?.length + selectedCauses?.length + selectedContributions?.length} relevant issue types. 
                  The more specific your interests, the better our recommendations become.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Save Preferences
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestPreferences;