import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import IssueHeader from './components/IssueHeader';
import DifficultyWidget from './components/DifficultyWidget';
import RepositoryContext from './components/RepositoryContext';
import IssueContent from './components/IssueContent';
import SimilarIssues from './components/SimilarIssues';
import CommunityEngagement from './components/CommunityEngagement';
import ProgressTracker from './components/ProgressTracker';

const IssueDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [issue, setIssue] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock issue data
  const mockIssue = {
    id: parseInt(id) || 1,
    number: 142,
    title: "Improve error handling in user authentication flow",
    body: `## Problem Description

The current user authentication system lacks proper error handling for edge cases, particularly when users attempt to log in with expired tokens or invalid credentials. This creates a poor user experience and makes debugging difficult for developers.

## Expected Behavior

- Clear error messages should be displayed to users
- Expired tokens should trigger automatic refresh attempts
- Invalid credentials should show specific validation errors
- Loading states should be properly managed during authentication

## Current Behavior

- Generic "Authentication failed" message appears for all errors
- No automatic token refresh mechanism
- Users get stuck in loading states
- Console errors are not user-friendly

## Steps to Reproduce

1. Navigate to the login page
2. Enter invalid credentials
3. Observe the generic error message
4. Try logging in with an expired token
5. Notice the lack of specific feedback

## Proposed Solution

Implement a comprehensive error handling system that:
- Categorizes different types of authentication errors
- Provides user-friendly error messages
- Handles token refresh automatically
- Includes proper loading states and feedback

## Additional Context

This issue affects user onboarding and retention. New users often get confused by the generic error messages and abandon the registration process.

**Files to modify:**
- \`src/components/auth/LoginForm.jsx\`
- \`src/hooks/useAuth.js\`
- \`src/utils/authHelpers.js\`

**Testing requirements:**
- Unit tests for error handling functions
- Integration tests for login flow
- E2E tests for user scenarios`,
    state: "open",
    difficulty: "beginner",
    created_at: "2025-01-03T14:30:00Z",
    updated_at: "2025-01-05T16:45:00Z",
    comments: 8,
    html_url: "https://github.com/civic-org/user-portal/issues/142",
    assignee: null,
    labels: [
      { id: 1, name: "good first issue", color: "7057ff" },
      { id: 2, name: "bug", color: "d73a49" },
      { id: 3, name: "frontend", color: "0052cc" },
      { id: 4, name: "authentication", color: "fbca04" },
      { id: 5, name: "javascript", color: "f1e05a" },
      { id: 6, name: "help wanted", color: "008672" }
    ],
    repository: {
      id: 1,
      full_name: "civic-org/user-portal",
      name: "user-portal",
      description: "Civic engagement platform for community participation and democratic involvement",
      language: "JavaScript",
      stargazers_count: 1247,
      forks_count: 89,
      open_issues_count: 23,
      watchers_count: 156,
      created_at: "2024-08-15T10:00:00Z",
      updated_at: "2025-01-05T12:30:00Z"
    }
  };

  useEffect(() => {
    const loadIssueDetails = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIssue(mockIssue);
        
        // Check if issue is bookmarked (mock)
        const bookmarkedIssues = JSON.parse(localStorage.getItem('bookmarkedIssues') || '[]');
        setIsBookmarked(bookmarkedIssues?.includes(mockIssue?.id));
      } catch (err) {
        setError('Failed to load issue details');
        console.error('Error loading issue:', err);
      } finally {
        setLoading(false);
      }
    };

    loadIssueDetails();
  }, [id]);

  const handleBookmark = async () => {
    try {
      const bookmarkedIssues = JSON.parse(localStorage.getItem('bookmarkedIssues') || '[]');
      
      if (isBookmarked) {
        const updatedBookmarks = bookmarkedIssues?.filter(issueId => issueId !== issue?.id);
        localStorage.setItem('bookmarkedIssues', JSON.stringify(updatedBookmarks));
        setIsBookmarked(false);
      } else {
        const updatedBookmarks = [...bookmarkedIssues, issue?.id];
        localStorage.setItem('bookmarkedIssues', JSON.stringify(updatedBookmarks));
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  const handleGitHubClick = () => {
    window.open(issue?.html_url, '_blank', 'noopener,noreferrer');
  };

  const handleSimilarIssueClick = (similarIssue) => {
    navigate(`/issue-details/${similarIssue?.id}`);
  };

  const handleBackClick = () => {
    const from = location?.state?.from;
    if (from) {
      navigate(from);
    } else {
      navigate('/user-dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-muted-foreground">Loading issue details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">Issue Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  {error || 'The issue you are looking for could not be found.'}
                </p>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" onClick={handleBackClick} iconName="ArrowLeft">
                    Go Back
                  </Button>
                  <Button variant="default" onClick={() => navigate('/repository-browse')}>
                    Browse Issues
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button
              onClick={handleBackClick}
              className="flex items-center space-x-1 hover:text-foreground transition-smooth"
            >
              <Icon name="ArrowLeft" size={14} />
              <span>Back</span>
            </button>
            <Icon name="ChevronRight" size={14} />
            <span>Issue Details</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground">#{issue?.number}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <IssueHeader
                issue={issue}
                onBookmark={handleBookmark}
                onGitHubClick={handleGitHubClick}
                isBookmarked={isBookmarked}
              />

              <IssueContent issue={issue} />

              <CommunityEngagement issue={issue} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <DifficultyWidget issue={issue} />

              <RepositoryContext repository={issue?.repository} />

              <ProgressTracker issue={issue} />
            </div>
          </div>

          {/* Similar Issues Section */}
          <div className="mt-12">
            <SimilarIssues
              currentIssue={issue}
              onIssueClick={handleSimilarIssueClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsPage;