import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';
import { Checkbox } from './Checkbox';
import Input from './Input';

const FilterPanel = ({ 
  isOpen = false, 
  onToggle, 
  filters = {}, 
  onFiltersChange, 
  availableLanguages = [],
  availableLabels = [],
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState({
    difficulty: '',
    languages: [],
    labels: [],
    state: 'open',
    hasAssignee: false,
    sortBy: 'created',
    sortOrder: 'desc',
    search: '',
    ...filters
  });

  const [isCollapsed, setIsCollapsed] = useState(!isOpen);

  useEffect(() => {
    setIsCollapsed(!isOpen);
  }, [isOpen]);

  const difficultyOptions = [
    { value: '', label: 'All Difficulties' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const stateOptions = [
    { value: 'open', label: 'Open Issues' },
    { value: 'closed', label: 'Closed Issues' },
    { value: 'all', label: 'All Issues' }
  ];

  const sortOptions = [
    { value: 'created', label: 'Date Created' },
    { value: 'updated', label: 'Last Updated' },
    { value: 'comments', label: 'Comment Count' },
    { value: 'reactions', label: 'Reactions' }
  ];

  const sortOrderOptions = [
    { value: 'desc', label: 'Newest First' },
    { value: 'asc', label: 'Oldest First' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = {
      ...localFilters,
      [key]: value
    };
    setLocalFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const handleLanguageChange = (language, checked) => {
    const updatedLanguages = checked
      ? [...localFilters?.languages, language]
      : localFilters?.languages?.filter(lang => lang !== language);
    
    handleFilterChange('languages', updatedLanguages);
  };

  const handleLabelChange = (label, checked) => {
    const updatedLabels = checked
      ? [...localFilters?.labels, label]
      : localFilters?.labels?.filter(l => l !== label);
    
    handleFilterChange('labels', updatedLabels);
  };

  const handleReset = () => {
    const resetFilters = {
      difficulty: '',
      languages: [],
      labels: [],
      state: 'open',
      hasAssignee: false,
      sortBy: 'created',
      sortOrder: 'desc',
      search: ''
    };
    setLocalFilters(resetFilters);
    onFiltersChange?.(resetFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.difficulty) count++;
    if (localFilters?.languages?.length > 0) count++;
    if (localFilters?.labels?.length > 0) count++;
    if (localFilters?.state !== 'open') count++;
    if (localFilters?.hasAssignee) count++;
    if (localFilters?.search) count++;
    return count;
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onToggle?.(!isCollapsed);
  };

  return (
    <div className={`bg-card border border-border rounded-lg transition-layout ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={getActiveFilterCount() === 0}
            className="text-xs"
          >
            Reset
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="md:hidden"
            aria-label={isCollapsed ? 'Expand filters' : 'Collapse filters'}
          >
            <Icon name={isCollapsed ? 'ChevronDown' : 'ChevronUp'} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`transition-layout overflow-hidden ${isCollapsed ? 'max-h-0 md:max-h-none' : 'max-h-[800px]'}`}>
        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <Input
              label="Search Issues"
              type="search"
              placeholder="Search by title or description..."
              value={localFilters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Difficulty */}
          <div>
            <Select
              label="Difficulty Level"
              options={difficultyOptions}
              value={localFilters?.difficulty}
              onChange={(value) => handleFilterChange('difficulty', value)}
            />
          </div>

          {/* State */}
          <div>
            <Select
              label="Issue State"
              options={stateOptions}
              value={localFilters?.state}
              onChange={(value) => handleFilterChange('state', value)}
            />
          </div>

          {/* Languages */}
          {availableLanguages?.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Programming Languages
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availableLanguages?.slice(0, 10)?.map((language) => (
                  <Checkbox
                    key={language}
                    label={language}
                    checked={localFilters?.languages?.includes(language)}
                    onChange={(e) => handleLanguageChange(language, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Labels */}
          {availableLabels?.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Issue Labels
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availableLabels?.slice(0, 10)?.map((label) => (
                  <Checkbox
                    key={label?.name}
                    label={label?.name}
                    checked={localFilters?.labels?.includes(label?.name)}
                    onChange={(e) => handleLabelChange(label?.name, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Assignment Status */}
          <div>
            <Checkbox
              label="Show only unassigned issues"
              description="Filter for issues available to claim"
              checked={!localFilters?.hasAssignee}
              onChange={(e) => handleFilterChange('hasAssignee', !e?.target?.checked)}
            />
          </div>

          {/* Sorting */}
          <div className="space-y-4">
            <Select
              label="Sort By"
              options={sortOptions}
              value={localFilters?.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
            
            <Select
              label="Sort Order"
              options={sortOrderOptions}
              value={localFilters?.sortOrder}
              onChange={(value) => handleFilterChange('sortOrder', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;