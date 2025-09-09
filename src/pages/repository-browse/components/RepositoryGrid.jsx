import React, { useState, useEffect } from 'react';
import RepositoryCard from './RepositoryCard';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RepositoryGrid = ({ 
  repositories = [], 
  loading = false, 
  onLoadMore, 
  hasMore = false,
  onBookmark 
}) => {
  const [bookmarkedRepos, setBookmarkedRepos] = useState(new Set());
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    // Load bookmarked repositories from localStorage
    const saved = localStorage.getItem('bookmarkedRepositories');
    if (saved) {
      setBookmarkedRepos(new Set(JSON.parse(saved)));
    }
  }, []);

  const handleBookmark = async (repoId, shouldBookmark) => {
    try {
      const newBookmarked = new Set(bookmarkedRepos);
      
      if (shouldBookmark) {
        newBookmarked?.add(repoId);
      } else {
        newBookmarked?.delete(repoId);
      }
      
      setBookmarkedRepos(newBookmarked);
      localStorage.setItem('bookmarkedRepositories', JSON.stringify([...newBookmarked]));
      
      // Call parent callback if provided
      await onBookmark?.(repoId, shouldBookmark);
    } catch (error) {
      console.error('Failed to bookmark repository:', error);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      await onLoadMore?.();
    } catch (error) {
      console.error('Failed to load more repositories:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading && repositories?.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 bg-muted rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-5 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
              <div className="w-8 h-8 bg-muted rounded"></div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
            
            <div className="flex space-x-2 mb-4">
              <div className="h-6 w-16 bg-muted rounded-full"></div>
              <div className="h-6 w-20 bg-muted rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-4">
                <div className="h-4 w-12 bg-muted rounded"></div>
                <div className="h-4 w-12 bg-muted rounded"></div>
                <div className="h-4 w-16 bg-muted rounded"></div>
              </div>
              <div className="h-4 w-16 bg-muted rounded"></div>
            </div>
            
            <div className="flex justify-between pt-4 border-t border-border">
              <div className="h-4 w-20 bg-muted rounded"></div>
              <div className="flex space-x-2">
                <div className="h-8 w-16 bg-muted rounded"></div>
                <div className="h-8 w-20 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!repositories?.length && !loading) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No repositories found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Try adjusting your search criteria or filters to find repositories that match your interests.
        </p>
        <Button
          variant="outline"
          iconName="RotateCcw"
          onClick={() => window.location?.reload()}
        >
          Reset Search
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Repository Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {repositories?.map((repository) => (
          <RepositoryCard
            key={repository?.id}
            repository={repository}
            onBookmark={handleBookmark}
            isBookmarked={bookmarkedRepos?.has(repository?.id)}
          />
        ))}
      </div>
      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            loading={loadingMore}
            iconName="ChevronDown"
            iconPosition="right"
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More Repositories'}
          </Button>
        </div>
      )}
      {/* Loading Indicator for Additional Results */}
      {loading && repositories?.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span>Loading more repositories...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepositoryGrid;