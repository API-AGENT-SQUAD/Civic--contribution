import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({ filters, onFiltersChange, onRefresh, lastSync }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const languageOptions = [
    { value: '', label: 'All Languages' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'html', label: 'HTML/CSS' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' }
  ];

  const issueTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'bug', label: 'Bug Fix' },
    { value: 'feature', label: 'New Feature' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'enhancement', label: 'Enhancement' },
    { value: 'good-first-issue', label: 'Good First Issue' },
    { value: 'help-wanted', label: 'Help Wanted' }
  ];

  const timeCommitmentOptions = [
    { value: '', label: 'Any Time' },
    { value: '1', label: '< 1 hour' },
    { value: '4', label: '1-4 hours' },
    { value: '8', label: '4-8 hours' },
    { value: '24', label: '1-3 days' },
    { value: '168', label: '1+ weeks' }
  ];

  const projectDomainOptions = [
    { value: '', label: 'All Domains' },
    { value: 'civic-tech', label: 'Civic Technology' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'environment', label: 'Environment' },
    { value: 'accessibility', label: 'Accessibility' },
    { value: 'open-data', label: 'Open Data' },
    { value: 'social-good', label: 'Social Good' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange?.({
      ...filters,
      [key]: value
    });
  };

  const handleReset = () => {
    onFiltersChange?.({
      search: '',
      language: '',
      issueType: '',
      timeCommitment: '',
      projectDomain: ''
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value && value !== '')?.length;
  };

  const formatLastSync = (timestamp) => {
    const now = new Date();
    const sync = new Date(timestamp);
    const diffMinutes = Math.floor((now - sync) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} className="text-muted-foreground" />
            <h3 className="font-medium text-foreground">Filters</h3>
            {getActiveFilterCount() > 0 && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="RefreshCw" size={14} />
            <span>Last sync: {formatLastSync(lastSync)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            iconName="RefreshCw"
            iconSize={14}
            className="text-xs"
          >
            Refresh
          </Button>
          
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
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </Button>
        </div>
      </div>
      {/* Search */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search issues by title, description, or technology..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filter Controls */}
      <div className={`transition-layout overflow-hidden ${isExpanded ? 'max-h-96 lg:max-h-none' : 'max-h-0 lg:max-h-none'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Programming Language"
            options={languageOptions}
            value={filters?.language}
            onChange={(value) => handleFilterChange('language', value)}
          />
          
          <Select
            label="Issue Type"
            options={issueTypeOptions}
            value={filters?.issueType}
            onChange={(value) => handleFilterChange('issueType', value)}
          />
          
          <Select
            label="Time Commitment"
            options={timeCommitmentOptions}
            value={filters?.timeCommitment}
            onChange={(value) => handleFilterChange('timeCommitment', value)}
          />
          
          <Select
            label="Project Domain"
            options={projectDomainOptions}
            value={filters?.projectDomain}
            onChange={(value) => handleFilterChange('projectDomain', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterControls;