import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import RecommendationCard from './components/RecommendationCard';
import StatsPanel from './components/StatsPanel';
import FilterControls from './components/FilterControls';
import NotificationBadge from './components/NotificationBadge';
import QuickActions from './components/QuickActions';
import ProgressWidget from './components/ProgressWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [bookmarkedIssues, setBookmarkedIssues] = useState(new Set());
  const [filters, setFilters] = useState({
    search: '',
    language: '',
    issueType: '',
    timeCommitment: '',
    projectDomain: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for recommended issues
  const [recommendedIssues] = useState([
    {
      id: 1,
      title: "Add accessibility features to voting interface",
      description: "Implement ARIA labels and keyboard navigation for the civic voting platform to ensure compliance with WCAG 2.1 guidelines. This includes adding proper focus management and screen reader support.",
      repository: "civic-tech/voting-platform",
      number: 142,
      difficulty: "beginner",
      skills: ["HTML", "CSS", "JavaScript", "Accessibility"],
      timeCommitment: 4,
      comments: 8,
      stars: 234,
      lastUpdated: "2 days ago",
      githubUrl: "https://github.com/civic-tech/voting-platform/issues/142",
      isCivicProject: true
    },
    {
      id: 2,
      title: "Create data visualization for budget transparency",
      description: "Build interactive charts using D3.js to display municipal budget data in an accessible format. The visualization should allow citizens to explore spending categories and trends over time.",
      repository: "open-gov/budget-tracker",
      number: 89,
      difficulty: "intermediate",
      skills: ["JavaScript", "D3.js", "React", "Data Visualization"],
      timeCommitment: 12,
      comments: 15,
      stars: 456,
      lastUpdated: "1 day ago",
      githubUrl: "https://github.com/open-gov/budget-tracker/issues/89",
      isCivicProject: true
    },
    {
      id: 3,
      title: "Fix mobile responsive layout for service request form",
      description: "The citizen service request form is not properly responsive on mobile devices. Need to update CSS Grid and Flexbox layouts to ensure proper display across all screen sizes.",
      repository: "city-services/request-portal",
      number: 67,
      difficulty: "beginner",
      skills: ["CSS", "HTML", "Responsive Design"],
      timeCommitment: 2,
      comments: 5,
      stars: 123,
      lastUpdated: "3 hours ago",
      githubUrl: "https://github.com/city-services/request-portal/issues/67",
      isCivicProject: true
    },
    {
      id: 4,
      title: "Implement search functionality for public records",
      description: "Add full-text search capabilities to the public records database using Elasticsearch. Include filters for date ranges, document types, and departments.",
      repository: "transparency/public-records",
      number: 201,
      difficulty: "advanced",
      skills: ["Node.js", "Elasticsearch", "Express", "Database"],
      timeCommitment: 24,
      comments: 22,
      stars: 789,
      lastUpdated: "5 days ago",
      githubUrl: "https://github.com/transparency/public-records/issues/201",
      isCivicProject: true
    },
    {
      id: 5,
      title: "Add multi-language support for community portal",
      description: "Implement internationalization (i18n) for the community engagement portal. Priority languages include Spanish, Chinese, and Arabic based on local demographics.",
      repository: "community/engagement-hub",
      number: 156,
      difficulty: "intermediate",
      skills: ["React", "i18n", "JavaScript", "Localization"],
      timeCommitment: 16,
      comments: 12,
      stars: 345,
      lastUpdated: "1 week ago",
      githubUrl: "https://github.com/community/engagement-hub/issues/156",
      isCivicProject: true
    },
    {
      id: 6,
      title: "Create API documentation for transit data",
      description: "Write comprehensive API documentation for the public transit real-time data API. Include examples, authentication details, and rate limiting information.",
      repository: "transit/api-service",
      number: 78,
      difficulty: "beginner",
      skills: ["Documentation", "API Design", "Markdown"],
      timeCommitment: 6,
      comments: 3,
      stars: 167,
      lastUpdated: "4 days ago",
      githubUrl: "https://github.com/transit/api-service/issues/78",
      isCivicProject: true
    }
  ]);

  // Mock user stats
  const [userStats] = useState({
    contributedIssues: 12,
    repositories: 8,
    bookmarked: 24,
    skillLevel: "Intermediate",
    recentActivity: [
      {
        id: 1,
        description: "Completed issue #142 in voting-platform",
        timestamp: "2 hours ago",
        icon: "CheckCircle",
        color: "text-success",
        bgColor: "bg-success/10"
      },
      {
        id: 2,
        description: "Bookmarked issue #89 in budget-tracker",
        timestamp: "1 day ago",
        icon: "Bookmark",
        color: "text-warning",
        bgColor: "bg-warning/10"
      },
      {
        id: 3,
        description: "Started working on issue #67 in request-portal",
        timestamp: "3 days ago",
        icon: "Code",
        color: "text-primary",
        bgColor: "bg-primary/10"
      }
    ],
    skillProgress: [
      { name: "JavaScript", progress: 85 },
      { name: "React", progress: 70 },
      { name: "CSS", progress: 90 },
      { name: "Node.js", progress: 60 }
    ]
  });

  // Mock progress data
  const [progressData] = useState({
    completed: 12,
    inProgress: 3,
    overallProgress: 75,
    currentIssues: [
      {
        id: 2,
        title: "Create data visualization for budget transparency",
        repository: "open-gov/budget-tracker",
        number: 89,
        status: "in-progress",
        lastUpdate: "2 hours ago"
      },
      {
        id: 3,
        title: "Fix mobile responsive layout for service request form",
        repository: "city-services/request-portal",
        number: 67,
        status: "review",
        lastUpdate: "1 day ago"
      },
      {
        id: 5,
        title: "Add multi-language support for community portal",
        repository: "community/engagement-hub",
        number: 156,
        status: "blocked",
        lastUpdate: "3 days ago"
      }
    ]
  });

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "new_match",
      title: "New matching issues found",
      message: "3 new beginner-friendly issues match your JavaScript skills",
      timestamp: "5 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "issue_update",
      title: "Issue status updated",
      message: "Issue #142 in voting-platform has been merged",
      timestamp: "2 hours ago",
      read: false
    },
    {
      id: 3,
      type: "bookmark_update",
      title: "Bookmarked issue updated",
      message: "Issue #89 in budget-tracker has new comments",
      timestamp: "1 day ago",
      read: true
    }
  ]);

  const lastSync = new Date(Date.now() - 15 * 60 * 1000); // 15 minutes ago

  const handleBookmark = async (issueId, isBookmarked) => {
    const newBookmarked = new Set(bookmarkedIssues);
    if (isBookmarked) {
      newBookmarked?.add(issueId);
    } else {
      newBookmarked?.delete(issueId);
    }
    setBookmarkedIssues(newBookmarked);
  };

  const handleViewDetails = (issue) => {
    navigate('/issue-details', { state: { issue } });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleBulkBookmark = async (issueIds) => {
    const newBookmarked = new Set(bookmarkedIssues);
    issueIds?.forEach(id => newBookmarked?.add(id));
    setBookmarkedIssues(newBookmarked);
    setSelectedIssues([]);
  };

  const handleBulkStatusUpdate = async (issueIds, status) => {
    // Simulate status update
    console.log(`Updating ${issueIds?.length} issues to status: ${status}`);
    setSelectedIssues([]);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(notification =>
        notification?.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const filteredIssues = recommendedIssues?.filter(issue => {
    if (filters?.search && !issue?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !issue?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.language && !issue?.skills?.some(skill => 
        skill?.toLowerCase()?.includes(filters?.language?.toLowerCase()))) {
      return false;
    }
    if (filters?.timeCommitment && issue?.timeCommitment > parseInt(filters?.timeCommitment)) {
      return false;
    }
    if (filters?.projectDomain === 'civic-tech' && !issue?.isCivicProject) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Welcome back, Developer!
              </h1>
              <p className="text-muted-foreground">
                Discover meaningful open-source issues that match your skills and interests
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationBadge
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onViewAll={() => navigate('/notifications')}
              />
              
              <Button
                variant="default"
                onClick={() => navigate('/repository-browse')}
                iconName="Search"
                iconSize={16}
              >
                Browse All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filter Controls */}
              <FilterControls
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onRefresh={handleRefresh}
                lastSync={lastSync}
              />

              {/* Recommended Issues */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Recommended for You
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {filteredIssues?.length} issue{filteredIssues?.length !== 1 ? 's' : ''} found
                  </span>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <p className="text-muted-foreground">Loading recommendations...</p>
                    </div>
                  </div>
                ) : filteredIssues?.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {filteredIssues?.map((issue) => (
                      <RecommendationCard
                        key={issue?.id}
                        issue={issue}
                        onBookmark={handleBookmark}
                        onViewDetails={handleViewDetails}
                        isBookmarked={bookmarkedIssues?.has(issue?.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No issues found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setFilters({
                        search: '',
                        language: '',
                        issueType: '',
                        timeCommitment: '',
                        projectDomain: ''
                      })}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats Panel */}
              <StatsPanel
                stats={userStats}
                onViewAll={() => navigate('/profile-settings')}
              />

              {/* Progress Widget */}
              <ProgressWidget
                progressData={progressData}
                onViewDetails={() => navigate('/profile-settings')}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <QuickActions
        selectedIssues={selectedIssues}
        onBulkBookmark={handleBulkBookmark}
        onBulkStatusUpdate={handleBulkStatusUpdate}
        onClearSelection={() => setSelectedIssues([])}
      />
    </div>
  );
};

export default UserDashboard;