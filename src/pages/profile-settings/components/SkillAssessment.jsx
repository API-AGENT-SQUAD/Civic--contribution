import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SkillAssessment = ({ skills, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skillLevel, setSkillLevel] = useState(skills?.level || 'beginner');
  const [selectedLanguages, setSelectedLanguages] = useState(skills?.languages || []);
  const [selectedFrameworks, setSelectedFrameworks] = useState(skills?.frameworks || []);
  const [isLoading, setIsLoading] = useState(false);

  const skillLevelOptions = [
    { value: 'beginner', label: 'Beginner', description: 'New to programming, learning fundamentals' },
    { value: 'intermediate', label: 'Intermediate', description: 'Comfortable with basic concepts, building projects' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced developer, can mentor others' }
  ];

  const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Rust',
    'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart', 'Scala', 'R', 'MATLAB'
  ];

  const frameworks = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Django', 'Flask',
    'Spring Boot', 'Laravel', 'Ruby on Rails', 'Next.js', 'Nuxt.js', 'Svelte',
    'Flutter', 'React Native', 'Electron'
  ];

  const handleLanguageChange = (language, checked) => {
    if (checked) {
      setSelectedLanguages(prev => [...prev, language]);
    } else {
      setSelectedLanguages(prev => prev?.filter(lang => lang !== language));
    }
  };

  const handleFrameworkChange = (framework, checked) => {
    if (checked) {
      setSelectedFrameworks(prev => [...prev, framework]);
    } else {
      setSelectedFrameworks(prev => prev?.filter(fw => fw !== framework));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onUpdate?.({
        level: skillLevel,
        languages: selectedLanguages,
        frameworks: selectedFrameworks
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSkillLevel(skills?.level || 'beginner');
    setSelectedLanguages(skills?.languages || []);
    setSelectedFrameworks(skills?.frameworks || []);
    setIsEditing(false);
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'text-success';
      case 'intermediate':
        return 'text-warning';
      case 'advanced':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Code" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Skill Assessment</h2>
            <p className="text-sm text-muted-foreground">Update your programming skills and experience level</p>
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
        {/* Current Skill Level Display */}
        {!isEditing && (
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                <Icon name="Award" size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Current Level</p>
                <p className={`text-lg font-semibold capitalize ${getSkillLevelColor(skillLevel)}`}>
                  {skillLevel}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Skill Level Selection */}
        {isEditing && (
          <Select
            label="Experience Level"
            description="Choose the level that best describes your programming experience"
            options={skillLevelOptions}
            value={skillLevel}
            onChange={setSkillLevel}
          />
        )}

        {/* Programming Languages */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-4">
            Programming Languages
            <span className="text-xs text-muted-foreground ml-2">
              ({selectedLanguages?.length} selected)
            </span>
          </label>
          
          {!isEditing ? (
            <div className="flex flex-wrap gap-2">
              {selectedLanguages?.length > 0 ? (
                selectedLanguages?.map((language) => (
                  <span
                    key={language}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {language}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No languages selected</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto border border-border rounded-lg p-4">
              {programmingLanguages?.map((language) => (
                <Checkbox
                  key={language}
                  label={language}
                  checked={selectedLanguages?.includes(language)}
                  onChange={(e) => handleLanguageChange(language, e?.target?.checked)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Frameworks & Libraries */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-4">
            Frameworks & Libraries
            <span className="text-xs text-muted-foreground ml-2">
              ({selectedFrameworks?.length} selected)
            </span>
          </label>
          
          {!isEditing ? (
            <div className="flex flex-wrap gap-2">
              {selectedFrameworks?.length > 0 ? (
                selectedFrameworks?.map((framework) => (
                  <span
                    key={framework}
                    className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                  >
                    {framework}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No frameworks selected</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto border border-border rounded-lg p-4">
              {frameworks?.map((framework) => (
                <Checkbox
                  key={framework}
                  label={framework}
                  checked={selectedFrameworks?.includes(framework)}
                  onChange={(e) => handleFrameworkChange(framework, e?.target?.checked)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Skill Recommendations */}
        {!isEditing && (
          <div className="border border-border rounded-lg p-4 bg-accent/5">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={16} className="text-accent mt-1" />
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Skill Recommendations</p>
                <p className="text-xs text-muted-foreground">
                  Based on your current skills, we recommend exploring issues in React, Node.js, and Python projects. 
                  Consider learning TypeScript to expand your opportunities in modern web development.
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
              Save Skills
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillAssessment;