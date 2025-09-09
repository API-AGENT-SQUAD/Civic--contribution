import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import RepositoryFilters from './components/RepositoryFilters';
import TrendingSection from './components/TrendingSection';
import RepositoryGrid from './components/RepositoryGrid';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RepositoryBrowse = () => {
  const [repositories, setRepositories] = useState([]);
  const [trendingRepos, setTrendingRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock repository data
  const mockRepositories = [
    {
      id: 1,
      name: "civic-engagement-platform",
      full_name: "govtech/civic-engagement-platform",
      description: "A comprehensive platform for citizens to engage with local government initiatives, track policy changes, and participate in community decision-making processes.",
      html_url: "https://github.com/govtech/civic-engagement-platform",
      stargazers_count: 2847,
      forks_count: 456,
      open_issues_count: 23,
      language: "JavaScript",
      updated_at: "2025-01-05T10:30:00Z",
      created_at: "2024-03-15T08:00:00Z",
      is_civic: true,
      beginner_friendly: true,
      difficulty_level: "beginner",
      contributors_count: 34,
      commits_count: 892,
      documentation_score: 92,
      growth_rate: 18
    },
    {
      id: 2,
      name: "climate-data-analyzer",
      full_name: "climate-org/climate-data-analyzer",
      description: "Open-source tool for analyzing climate data patterns, generating reports, and visualizing environmental trends to support climate action initiatives.",
      html_url: "https://github.com/climate-org/climate-data-analyzer",
      stargazers_count: 1923,
      forks_count: 287,
      open_issues_count: 31,
      language: "Python",
      updated_at: "2025-01-04T15:45:00Z",
      created_at: "2024-01-20T12:00:00Z",
      is_civic: true,
      beginner_friendly: true,
      difficulty_level: "intermediate",
      contributors_count: 28,
      commits_count: 1247,
      documentation_score: 88,
      growth_rate: 25
    },
    {
      id: 3,
      name: "education-resource-hub",
      full_name: "edu-foundation/education-resource-hub",
      description: "Collaborative platform for educators to share teaching resources, lesson plans, and educational tools to improve learning outcomes in underserved communities.",
      html_url: "https://github.com/edu-foundation/education-resource-hub",
      stargazers_count: 3456,
      forks_count: 678,
      open_issues_count: 18,
      language: "TypeScript",
      updated_at: "2025-01-03T09:20:00Z",
      created_at: "2024-05-10T14:30:00Z",
      is_civic: true,
      beginner_friendly: true,
      difficulty_level: "beginner",
      contributors_count: 52,
      commits_count: 1534,
      documentation_score: 95,
      growth_rate: 12
    },
    {
      id: 4,
      name: "healthcare-appointment-system",
      full_name: "health-tech/healthcare-appointment-system",
      description: "Modern appointment scheduling system for healthcare providers with patient management, automated reminders, and telehealth integration capabilities.",
      html_url: "https://github.com/health-tech/healthcare-appointment-system",
      stargazers_count: 1567,
      forks_count: 234,
      open_issues_count: 27,
      language: "Java",
      updated_at: "2025-01-02T11:15:00Z",
      created_at: "2024-07-08T16:45:00Z",
      is_civic: true,
      beginner_friendly: false,
      difficulty_level: "advanced",
      contributors_count: 19,
      commits_count: 743,
      documentation_score: 78,
      growth_rate: 22
    },
    {
      id: 5,
      name: "open-budget-tracker",
      full_name: "transparency-org/open-budget-tracker",
      description: "Transparent budget tracking application that allows citizens to monitor government spending, track project progress, and analyze fiscal responsibility.",
      html_url: "https://github.com/transparency-org/open-budget-tracker",
      stargazers_count: 2134,
      forks_count: 389,
      open_issues_count: 15,
      language: "Go",
      updated_at: "2025-01-01T13:30:00Z",
      created_at: "2024-02-28T10:00:00Z",
      is_civic: true,
      beginner_friendly: true,
      difficulty_level: "intermediate",
      contributors_count: 41,
      commits_count: 967,
      documentation_score: 85,
      growth_rate: 30
    },
    {
      id: 6,
      name: "accessibility-checker",
      full_name: "a11y-tools/accessibility-checker",
      description: "Automated web accessibility testing tool that helps developers identify and fix accessibility issues to create more inclusive digital experiences.",
      html_url: "https://github.com/a11y-tools/accessibility-checker",
      stargazers_count: 4521,
      forks_count: 892,
      open_issues_count: 42,
      language: "JavaScript",
      updated_at: "2024-12-30T08:45:00Z",
      created_at: "2024-04-12T11:20:00Z",
      is_civic: true,
      beginner_friendly: true,
      difficulty_level: "beginner",
      contributors_count: 67,
      commits_count: 2156,
      documentation_score: 91,
      growth_rate: 35
    },
    {
      id: 7,
      name: "disaster-response-coordinator",
      full_name: "emergency-tech/disaster-response-coordinator",
      description: "Emergency response coordination system for disaster management teams to organize resources, track relief efforts, and coordinate volunteer activities.",
      html_url: "https://github.com/emergency-tech/disaster-response-coordinator",
      stargazers_count: 987,
      forks_count: 156,
      open_issues_count: 33,
      language: "Python",
      updated_at: "2024-12-29T14:20:00Z",
      created_at: "2024-06-15T09:30:00Z",
      is_civic: true,
      beginner_friendly: false,
      difficulty_level: "advanced",
      contributors_count: 23,
      commits_count: 654,
      documentation_score: 82,
      growth_rate: 28
    },
    {
      id: 8,
      name: "public-transport-optimizer",
      full_name: "transit-solutions/public-transport-optimizer",
      description: "Route optimization and scheduling system for public transportation networks to improve efficiency, reduce wait times, and enhance passenger experience.",
      html_url: "https://github.com/transit-solutions/public-transport-optimizer",
      stargazers_count: 1678,
      forks_count: 298,
      open_issues_count: 21,
      language: "C++",
      updated_at: "2024-12-28T16:10:00Z",
      created_at: "2024-08-03T12:15:00Z",
      is_civic: true,
      beginner_friendly: false,
      difficulty_level: "advanced",
      contributors_count: 31,
      commits_count: 1089,
      documentation_score: 76,
      growth_rate: 19
    },
    {
      id: 9,
      name: "community-garden-manager",
      full_name: "green-spaces/community-garden-manager",
      description: "Management platform for community gardens including plot allocation, harvest tracking, event coordination, and resource sharing among gardeners.",
      html_url: "https://github.com/green-spaces/community-garden-manager",
      stargazers_count: 756,
      forks_count: 123,
      open_issues_count: 19,
      language: "Ruby",
      updated_at: "2024-12-27T10:30:00Z",
      created_at: "2024-09-20T14:45:00Z",
      is_civic: true,
      beginner_friendly: true,
      difficulty_level: "beginner",
      contributors_count: 18,
      commits_count: 432,
      documentation_score: 89,
      growth_rate: 15
    }
  ];

  useEffect(() => {
    loadRepositories();
    loadTrendingRepositories();
  }, []);

  const loadRepositories = async (page = 1, query = '', filterOptions = {}) => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredRepos = [...mockRepositories];
      
      // Apply search filter
      if (query) {
        filteredRepos = filteredRepos?.filter(repo =>
          repo?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
          repo?.description?.toLowerCase()?.includes(query?.toLowerCase()) ||
          repo?.language?.toLowerCase()?.includes(query?.toLowerCase())
        );
      }
      
      // Apply filters
      if (filterOptions?.languages?.length > 0) {
        filteredRepos = filteredRepos?.filter(repo =>
          filterOptions?.languages?.includes(repo?.language)
        );
      }
      
      if (filterOptions?.civicTech) {
        filteredRepos = filteredRepos?.filter(repo => repo?.is_civic);
      }
      
      if (filterOptions?.beginnerFriendly) {
        filteredRepos = filteredRepos?.filter(repo => repo?.beginner_friendly);
      }
      
      // Apply sorting
      switch (filterOptions?.sortBy) {
        case 'stars':
          filteredRepos?.sort((a, b) => b?.stargazers_count - a?.stargazers_count);
          break;
        case 'updated':
          filteredRepos?.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
          break;
        case 'created':
          filteredRepos?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case 'issues':
          filteredRepos?.sort((a, b) => b?.open_issues_count - a?.open_issues_count);
          break;
        case 'beginner-friendly':
          filteredRepos?.sort((a, b) => {
            if (a?.beginner_friendly && !b?.beginner_friendly) return -1;
            if (!a?.beginner_friendly && b?.beginner_friendly) return 1;
            return b?.stargazers_count - a?.stargazers_count;
          });
          break;
        default: // relevance
          filteredRepos?.sort((a, b) => b?.stargazers_count - a?.stargazers_count);
      }
      
      // Pagination
      const itemsPerPage = 6;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedRepos = filteredRepos?.slice(0, endIndex);
      
      if (page === 1) {
        setRepositories(paginatedRepos);
      } else {
        setRepositories(prev => [...prev, ...filteredRepos?.slice(startIndex, endIndex)]);
      }
      
      setHasMore(endIndex < filteredRepos?.length);
      setCurrentPage(page);
      
    } catch (error) {
      console.error('Failed to load repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingRepositories = async () => {
    try {
      // Get top trending repositories
      const trending = mockRepositories?.filter(repo => repo?.is_civic)?.sort((a, b) => b?.growth_rate - a?.growth_rate)?.slice(0, 6);
      
      setTrendingRepos(trending);
    } catch (error) {
      console.error('Failed to load trending repositories:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    loadRepositories(1, query, filters);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    loadRepositories(1, searchQuery, newFilters);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    loadRepositories(nextPage, searchQuery, filters);
  };

  const handleBookmark = async (repoId, shouldBookmark) => {
    // This would typically make an API call
    console.log(`Repository ${repoId} ${shouldBookmark ? 'bookmarked' : 'unbookmarked'}`);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.languages?.length > 0) count++;
    if (filters?.domains?.length > 0) count++;
    if (filters?.activityLevel) count++;
    if (filters?.issueAvailability) count++;
    if (filters?.civicTech) count++;
    if (filters?.beginnerFriendly) count++;
    if (filters?.hasDocumentation) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Browse Repositories - Civic Contributor</title>
        <meta name="description" content="Explore open-source civic tech repositories and find meaningful projects to contribute to. Filter by technology, cause, and difficulty level." />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Search" size={32} className="text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Browse Repositories</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Discover open-source civic technology projects that align with your interests and skills. 
              Find meaningful ways to contribute to public good initiatives through code.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8">
            <SearchBar
              onSearch={handleSearch}
              onFilterToggle={() => setShowFilters(!showFilters)}
              activeFilters={getActiveFilterCount()}
            />
          </div>

          {/* Advanced Filters */}
          <RepositoryFilters
            isOpen={showFilters}
            onToggle={() => setShowFilters(!showFilters)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            resultCount={repositories?.length}
          />

          {/* Trending Section */}
          {!searchQuery && !showFilters && (
            <TrendingSection repositories={trendingRepos} />
          )}

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-foreground">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Repositories'}
              </h2>
              <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                {repositories?.length} repositories
              </span>
            </div>

            {(searchQuery || getActiveFilterCount() > 0) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setFilters({});
                  setShowFilters(false);
                  loadRepositories(1, '', {});
                }}
                iconName="X"
                iconSize={14}
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Repository Grid */}
          <RepositoryGrid
            repositories={repositories}
            loading={loading}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            onBookmark={handleBookmark}
          />
        </div>
      </main>
    </div>
  );
};

export default RepositoryBrowse;