import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';

const SkillAssessment = ({ 
  skillLevel, 
  onSkillLevelChange, 
  selectedLanguages, 
  onLanguagesChange, 
  selectedDomains, 
  onDomainsChange,
  errors = {} 
}) => {
  const skillLevels = [
    {
      value: 'beginner',
      label: 'Beginner',
      description: 'New to programming or open source contributions'
    },
    {
      value: 'intermediate',
      label: 'Intermediate',
      description: 'Some experience with coding projects and version control'
    },
    {
      value: 'advanced',
      label: 'Advanced',
      description: 'Experienced developer comfortable with complex projects'
    }
  ];

  const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'TypeScript', 'React', 'Node.js',
    'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin'
  ];

  const projectDomains = [
    'Civic Tech', 'Education', 'Healthcare', 'Environment', 'Social Impact',
    'Open Data', 'Government', 'Non-profit', 'Accessibility', 'Privacy',
    'Climate Change', 'Digital Rights', 'Community Tools'
  ];

  const handleLanguageChange = (language, checked) => {
    const updated = checked
      ? [...selectedLanguages, language]
      : selectedLanguages?.filter(lang => lang !== language);
    onLanguagesChange(updated);
  };

  const handleDomainChange = (domain, checked) => {
    const updated = checked
      ? [...selectedDomains, domain]
      : selectedDomains?.filter(d => d !== domain);
    onDomainsChange(updated);
  };

  return (
    <div className="space-y-8">
      {/* Skill Level Assessment */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          What's your programming experience level?
        </h3>
        <div className="space-y-3">
          {skillLevels?.map((level) => (
            <label
              key={level?.value}
              className={`
                flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-smooth
                hover:border-primary/50 hover:bg-muted/50
                ${skillLevel === level?.value 
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/20' :'border-border'
                }
              `}
            >
              <input
                type="radio"
                name="skillLevel"
                value={level?.value}
                checked={skillLevel === level?.value}
                onChange={(e) => onSkillLevelChange(e?.target?.value)}
                className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <div className="flex-1">
                <div className="font-medium text-foreground">{level?.label}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {level?.description}
                </div>
              </div>
            </label>
          ))}
        </div>
        {errors?.skillLevel && (
          <p className="text-sm text-error mt-2">{errors?.skillLevel}</p>
        )}
      </div>
      {/* Programming Languages */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Which programming languages interest you?
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select all that apply. This helps us recommend relevant issues.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {programmingLanguages?.map((language) => (
            <Checkbox
              key={language}
              label={language}
              checked={selectedLanguages?.includes(language)}
              onChange={(e) => handleLanguageChange(language, e?.target?.checked)}
              className="text-sm"
            />
          ))}
        </div>
        {errors?.languages && (
          <p className="text-sm text-error mt-2">{errors?.languages}</p>
        )}
      </div>
      {/* Project Domains */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          What causes or domains interest you?
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose areas where you'd like to make an impact through code.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projectDomains?.map((domain) => (
            <Checkbox
              key={domain}
              label={domain}
              checked={selectedDomains?.includes(domain)}
              onChange={(e) => handleDomainChange(domain, e?.target?.checked)}
              className="text-sm"
            />
          ))}
        </div>
        {errors?.domains && (
          <p className="text-sm text-error mt-2">{errors?.domains}</p>
        )}
      </div>
    </div>
  );
};

export default SkillAssessment;