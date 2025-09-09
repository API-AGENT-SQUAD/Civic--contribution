import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityEngagement = ({ issue }) => {
  const [activeTab, setActiveTab] = useState('comments');

  const mockComments = [
    {
      id: 1,
      user: {
        login: "sarah_dev",
        avatar_url: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      body: "This is a great first issue! I\'d recommend starting by looking at the existing authentication components in the `/src/components/auth/` directory. The error handling patterns are already established there.",
      created_at: "2025-01-04T10:30:00Z",
      updated_at: "2025-01-04T10:30:00Z",
      author_association: "MAINTAINER"
    },
    {
      id: 2,
      user: {
        login: "code_mentor",
        avatar_url: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      body: "I can help mentor someone through this issue! I've worked on similar authentication improvements before. Feel free to tag me if you need guidance on the implementation approach.",
      created_at: "2025-01-04T14:15:00Z",
      updated_at: "2025-01-04T14:15:00Z",
      author_association: "CONTRIBUTOR"
    },
    {
      id: 3,
      user: {
        login: "new_contributor",
        avatar_url: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      body: "I\'m interested in working on this! This would be my first contribution to the project. @code_mentor would you be able to help me get started?",
      created_at: "2025-01-05T09:20:00Z",
      updated_at: "2025-01-05T09:20:00Z",
      author_association: "NONE"
    }
  ];

  const mockMentors = [
    {
      id: 1,
      login: "sarah_dev",
      name: "Sarah Johnson",
      avatar_url: "https://randomuser.me/api/portraits/women/32.jpg",
      expertise: ["React", "Authentication", "Error Handling"],
      availability: "Available weekdays",
      response_time: "Usually responds within 4 hours"
    },
    {
      id: 2,
      login: "code_mentor",
      name: "Alex Chen",
      avatar_url: "https://randomuser.me/api/portraits/men/45.jpg",
      expertise: ["JavaScript", "Testing", "Code Review"],
      availability: "Available evenings",
      response_time: "Usually responds within 8 hours"
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleColor = (association) => {
    switch (association) {
      case 'MAINTAINER':
        return 'bg-primary text-primary-foreground';
      case 'CONTRIBUTOR':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleLabel = (association) => {
    switch (association) {
      case 'MAINTAINER':
        return 'Maintainer';
      case 'CONTRIBUTOR':
        return 'Contributor';
      default:
        return 'Community';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Users" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Community Engagement</h2>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('comments')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
            activeTab === 'comments' ?'bg-card text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="MessageSquare" size={16} className="inline mr-2" />
          Discussion ({mockComments?.length})
        </button>
        
        <button
          onClick={() => setActiveTab('mentors')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
            activeTab === 'mentors' ?'bg-card text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="UserCheck" size={16} className="inline mr-2" />
          Mentors ({mockMentors?.length})
        </button>
      </div>
      {/* Comments Tab */}
      {activeTab === 'comments' && (
        <div className="space-y-4">
          {mockComments?.map((comment) => (
            <div key={comment?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <img
                  src={comment?.user?.avatar_url}
                  alt={comment?.user?.login}
                  className="w-8 h-8 rounded-full"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-foreground">{comment?.user?.login}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(comment?.author_association)}`}>
                      {getRoleLabel(comment?.author_association)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(comment?.created_at)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-foreground leading-relaxed">
                    {comment?.body}
                  </p>
                  
                  <div className="flex items-center space-x-4 mt-3">
                    <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-smooth">
                      <Icon name="ThumbsUp" size={14} />
                      <span>Helpful</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-smooth">
                      <Icon name="MessageCircle" size={14} />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add Comment */}
          <div className="border border-border rounded-lg p-4 bg-muted/50">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-foreground" />
              </div>
              
              <div className="flex-1">
                <textarea
                  placeholder="Add your comment or question..."
                  className="w-full p-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                  rows={3}
                />
                
                <div className="flex justify-between items-center mt-3">
                  <p className="text-xs text-muted-foreground">
                    Be respectful and constructive in your feedback
                  </p>
                  
                  <Button variant="default" size="sm">
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Mentors Tab */}
      {activeTab === 'mentors' && (
        <div className="space-y-4">
          {mockMentors?.map((mentor) => (
            <div key={mentor?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <img
                  src={mentor?.avatar_url}
                  alt={mentor?.login}
                  className="w-10 h-10 rounded-full"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-foreground">{mentor?.name}</h4>
                    <span className="text-sm text-muted-foreground">@{mentor?.login}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {mentor?.expertise?.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{mentor?.availability}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={12} />
                      <span>{mentor?.response_time}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm" iconName="MessageSquare">
                      Message
                    </Button>
                    <Button variant="ghost" size="sm" iconName="UserPlus">
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Become a Mentor */}
          <div className="border border-dashed border-border rounded-lg p-6 text-center">
            <Icon name="Users" size={24} className="text-muted-foreground mx-auto mb-2" />
            <h4 className="font-medium text-foreground mb-1">Want to help others?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Share your expertise and mentor new contributors
            </p>
            <Button variant="outline" size="sm" iconName="UserPlus">
              Become a Mentor
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityEngagement;