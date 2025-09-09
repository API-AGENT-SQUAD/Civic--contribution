import React from 'react';
import Icon from '../../../components/AppIcon';

const DifficultyWidget = ({ issue }) => {
  const getDifficultyScore = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': case'good first issue':
        return { score: 85, level: 'Beginner Friendly', color: 'text-success' };
      case 'intermediate':
        return { score: 60, level: 'Intermediate', color: 'text-warning' };
      case 'advanced':
        return { score: 30, level: 'Advanced', color: 'text-error' };
      default:
        return { score: 50, level: 'Unknown', color: 'text-muted-foreground' };
    }
  };

  const getTimeEstimate = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': case'good first issue':
        return '2-4 hours';
      case 'intermediate':
        return '1-2 days';
      case 'advanced':
        return '3-5 days';
      default:
        return 'Variable';
    }
  };

  const getRequiredSkills = (labels) => {
    const skillLabels = labels?.filter(label => 
      ['javascript', 'python', 'react', 'nodejs', 'css', 'html', 'typescript', 'java', 'go', 'rust']?.includes(label?.name?.toLowerCase())
    ) || [];
    
    return skillLabels?.length > 0 ? skillLabels?.map(label => label?.name) : ['General Programming'];
  };

  const difficultyData = getDifficultyScore(issue?.difficulty);
  const timeEstimate = getTimeEstimate(issue?.difficulty);
  const requiredSkills = getRequiredSkills(issue?.labels);

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Target" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Difficulty Assessment</h2>
      </div>
      {/* Difficulty Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Beginner Friendliness</span>
          <span className={`text-sm font-semibold ${difficultyData?.color}`}>
            {difficultyData?.score}/100
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              difficultyData?.score >= 70 ? 'bg-success' : 
              difficultyData?.score >= 40 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${difficultyData?.score}%` }}
          />
        </div>
        
        <p className="text-xs text-muted-foreground mt-1">
          {difficultyData?.level} - {difficultyData?.score >= 70 ? 'Great for beginners' : 
           difficultyData?.score >= 40 ? 'Some experience helpful' : 'Advanced knowledge required'}
        </p>
      </div>
      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Time Estimate */}
        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
          <Icon name="Clock" size={16} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground">Estimated Time</h4>
            <p className="text-sm text-muted-foreground">{timeEstimate}</p>
          </div>
        </div>

        {/* Required Skills */}
        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
          <Icon name="Code" size={16} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground">Required Skills</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {requiredSkills?.slice(0, 3)?.map((skill, index) => (
                <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
              {requiredSkills?.length > 3 && (
                <span className="text-xs text-muted-foreground">+{requiredSkills?.length - 3} more</span>
              )}
            </div>
          </div>
        </div>

        {/* Mentorship Available */}
        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
          <Icon name="Users" size={16} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground">Community Support</h4>
            <p className="text-sm text-muted-foreground">
              {issue?.comments > 5 ? 'Active discussion' : 'Limited discussion'}
            </p>
          </div>
        </div>

        {/* Setup Complexity */}
        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
          <Icon name="Settings" size={16} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground">Setup Complexity</h4>
            <p className="text-sm text-muted-foreground">
              {issue?.labels?.some(l => l?.name?.toLowerCase()?.includes('docker')) ? 'Docker required' : 'Standard setup'}
            </p>
          </div>
        </div>
      </div>
      {/* Recommendation */}
      <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground">Recommendation</h4>
            <p className="text-sm text-muted-foreground">
              {difficultyData?.score >= 70 
                ? "Perfect for beginners! This issue has clear requirements and good documentation."
                : difficultyData?.score >= 40
                ? "Good learning opportunity with moderate complexity. Consider reviewing similar issues first." :"Advanced issue requiring deep knowledge. Recommended for experienced contributors."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifficultyWidget;