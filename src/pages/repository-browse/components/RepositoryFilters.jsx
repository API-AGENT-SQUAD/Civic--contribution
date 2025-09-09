import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RepositoryFilters = ({ 
  isOpen = false, 
  onToggle, 
  filters = {}, 
  onFiltersChange,
  resultCount = 0 
}) => {
  const [localFilters, setLocalFilters] = useState({
    languages: [],
    domains: [],
    activityLevel: '',
    issueAvailability: '',
    sortBy: 'relevance',
    civicTech: false,
    beginnerFriendly: false,
    hasDocumentation: false,
    ...filters
  });

  const languageOptions = [
    'JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'Go', 'Rust', 'PHP', 'C#', 'Ruby'
  ];

  const domainOptions = [
    'Climate & Environment', 'Education', 'Healthcare', 'Government & Civic', 
    'Social Justice', 'Economic Development', 'Transportation', 'Housing',
    'Public Safety', 'Digital Rights', 'Accessibility', 'Open Data'
  ];

  const activityLevelOptions = [
    { value: '', label: 'Any Activity Level' },
    { value: 'high', label: 'High Activity (Daily commits)' },
    { value: 'medium', label: 'Medium Activity (Weekly commits)' },
    { value: 'low', label: 'Low Activity (Monthly commits)' }
  ];

  const issueAvailabilityOptions = [
    { value: '', label: 'All Repositories' },
    { value: 'has-issues', label: 'Has Open Issues' },
    { value: 'beginner-issues', label: 'Has Beginner Issues' },
    { value: 'unassigned-issues', label: 'Has Unassigned Issues' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'stars', label: 'Most Stars' },
    { value: 'updated', label: 'Recently Updated' },
    { value: 'created', label: 'Newest' },
    { value: 'beginner-friendly', label: 'Beginner Friendly' },
    { value: 'issues', label: 'Most Issues' }
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

  const handleDomainChange = (domain, checked) => {
    const updatedDomains = checked
      ? [...localFilters?.domains, domain]
      : localFilters?.domains?.filter(d => d !== domain);
    
    handleFilterChange('domains', updatedDomains);
  };

  const handleReset = () => {
    const resetFilters = {
      languages: [],
      domains: [],
      activityLevel: '',
      issueAvailability: '',
      sortBy: 'relevance',
      civicTech: false,
      beginnerFriendly: false,
      hasDocumentation: false
    };
    setLocalFilters(resetFilters);
    onFiltersChange?.(resetFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.languages?.length > 0) count++;
    if (localFilters?.domains?.length > 0) count++;
    if (localFilters?.activityLevel) count++;
    if (localFilters?.issueAvailability) count++;
    if (localFilters?.civicTech) count++;
    if (localFilters?.beginnerFriendly) count++;
    if (localFilters?.hasDocumentation) count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
          <span className="px-2 py-1 bg-muted text-muted-foreground text-sm rounded-full">
            {resultCount?.toLocaleString()} repositories
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={getActiveFilterCount() === 0}
          >
            Reset All
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="lg:hidden"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Languages & Domains */}
        <div className="space-y-6">
          {/* Programming Languages */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Programming Languages
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {languageOptions?.map((language) => (
                <Checkbox
                  key={language}
                  label={language}
                  checked={localFilters?.languages?.includes(language)}
                  onChange={(e) => handleLanguageChange(language, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Project Domains */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Project Domains
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {domainOptions?.map((domain) => (
                <Checkbox
                  key={domain}
                  label={domain}
                  checked={localFilters?.domains?.includes(domain)}
                  onChange={(e) => handleDomainChange(domain, e?.target?.checked)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Activity & Issues */}
        <div className="space-y-6">
          {/* Activity Level */}
          <div>
            <Select
              label="Activity Level"
              options={activityLevelOptions}
              value={localFilters?.activityLevel}
              onChange={(value) => handleFilterChange('activityLevel', value)}
            />
          </div>

          {/* Issue Availability */}
          <div>
            <Select
              label="Issue Availability"
              options={issueAvailabilityOptions}
              value={localFilters?.issueAvailability}
              onChange={(value) => handleFilterChange('issueAvailability', value)}
            />
          </div>

          {/* Sort By */}
          <div>
            <Select
              label="Sort By"
              options={sortOptions}
              value={localFilters?.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>
        </div>

        {/* Column 3: Special Filters */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-4">
              Special Criteria
            </label>
            <div className="space-y-4">
              <Checkbox
                label="Civic Tech Projects"
                description="Projects focused on public good and civic engagement"
                checked={localFilters?.civicTech}
                onChange={(e) => handleFilterChange('civicTech', e?.target?.checked)}
              />
              
              <Checkbox
                label="Beginner Friendly"
                description="Projects with good first issues and documentation"
                checked={localFilters?.beginnerFriendly}
                onChange={(e) => handleFilterChange('beginnerFriendly', e?.target?.checked)}
              />
              
              <Checkbox
                label="Well Documented"
                description="Projects with comprehensive documentation"
                checked={localFilters?.hasDocumentation}
                onChange={(e) => handleFilterChange('hasDocumentation', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Active Filters Summary */}
          {getActiveFilterCount() > 0 && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">Active Filters</h4>
              <div className="flex flex-wrap gap-2">
                {localFilters?.languages?.map(lang => (
                  <span key={lang} className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    {lang}
                  </span>
                ))}
                {localFilters?.domains?.map(domain => (
                  <span key={domain} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                    {domain}
                  </span>
                ))}
                {localFilters?.civicTech && (
                  <span className="px-2 py-1 bg-success text-success-foreground text-xs rounded-full">
                    Civic Tech
                  </span>
                )}
                {localFilters?.beginnerFriendly && (
                  <span className="px-2 py-1 bg-warning text-warning-foreground text-xs rounded-full">
                    Beginner Friendly
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositoryFilters;