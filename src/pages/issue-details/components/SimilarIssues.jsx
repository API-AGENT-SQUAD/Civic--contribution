import React from 'react';
import Icon from '../../../components/AppIcon';
import IssueCard from '../../../components/ui/IssueCard';

const SimilarIssues = ({ currentIssue, onIssueClick }) => {
  const mockSimilarIssues = [
    {
      id: 2,
      number: 156,
      title: "Implement password strength validation in registration form",
      body: "Add real-time password strength indicator with requirements checklist to improve user security and experience during registration.",
      state: "open",
      difficulty: "beginner",
      created_at: "2025-01-02T10:30:00Z",
      updated_at: "2025-01-04T14:20:00Z",
      comments: 8,
      html_url: "https://github.com/example/civic-app/issues/156",
      labels: [
        { id: 1, name: "good first issue", color: "7057ff" },
        { id: 2, name: "frontend", color: "0052cc" },
        { id: 3, name: "javascript", color: "f1e05a" }
      ],
      repository: {
        id: 1,
        full_name: "civic-org/user-portal",
        name: "user-portal",
        description: "Civic engagement platform for community participation"
      }
    },
    {
      id: 3,
      number: 189,
      title: "Add loading spinner to form submissions",
      body: "Users need visual feedback when submitting forms. Implement loading states for all form submissions to improve UX.",
      state: "open",
      difficulty: "beginner",
      created_at: "2025-01-01T16:45:00Z",
      updated_at: "2025-01-03T09:15:00Z",
      comments: 5,
      html_url: "https://github.com/example/civic-app/issues/189",
      labels: [
        { id: 4, name: "enhancement", color: "a2eeef" },
        { id: 5, name: "ui/ux", color: "d4c5f9" },
        { id: 6, name: "react", color: "61dafb" }
      ],
      repository: {
        id: 2,
        full_name: "civic-org/community-dashboard",
        name: "community-dashboard",
        description: "Dashboard for community leaders and administrators"
      }
    },
    {
      id: 4,
      number: 234,
      title: "Improve error handling in API service layer",
      body: "Standardize error responses and implement proper error boundaries to handle API failures gracefully across the application.",
      state: "open",
      difficulty: "intermediate",
      created_at: "2024-12-28T11:20:00Z",
      updated_at: "2025-01-02T13:45:00Z",
      comments: 12,
      html_url: "https://github.com/example/civic-app/issues/234",
      labels: [
        { id: 7, name: "backend", color: "0e8a16" },
        { id: 8, name: "error-handling", color: "d93f0b" },
        { id: 9, name: "api", color: "fbca04" }
      ],
      repository: {
        id: 3,
        full_name: "civic-org/api-gateway",
        name: "api-gateway",
        description: "Central API gateway for civic platform services"
      }
    }
  ];

  const handleIssueClick = (issue) => {
    onIssueClick?.(issue);
  };

  const handleBookmark = async (issueId, isBookmarked) => {
    // Mock bookmark functionality
    console.log(`${isBookmarked ? 'Bookmarked' : 'Unbookmarked'} issue ${issueId}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="GitBranch" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Similar Issues</h2>
        <span className="text-sm text-muted-foreground">
          Based on your interests and skills
        </span>
      </div>
      <div className="space-y-4">
        {mockSimilarIssues?.map((issue) => (
          <IssueCard
            key={issue?.id}
            issue={issue}
            onBookmark={handleBookmark}
            onViewDetails={handleIssueClick}
            isBookmarked={false}
            showRepository={true}
            className="hover:shadow-elevated"
          />
        ))}
      </div>
      {/* View More */}
      <div className="mt-6 pt-4 border-t border-border text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Found {mockSimilarIssues?.length} similar issues that match your profile
        </p>
        <div className="flex justify-center space-x-3">
          <button
            onClick={() => window.location.href = '/repository-browse?filter=similar'}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            View All Similar Issues
          </button>
          <span className="text-muted-foreground">•</span>
          <button
            onClick={() => window.location.href = '/user-dashboard'}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarIssues;