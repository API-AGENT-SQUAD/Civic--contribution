import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IssueContent = ({ issue }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const formatMarkdown = (text) => {
    if (!text) return '';
    
    // Simple markdown-like formatting
    return text?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')?.replace(/\*(.*?)\*/g, '<em>$1</em>')?.replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')?.replace(/\n/g, '<br />');
  };

  const mockIssueBody = issue?.body || `## Problem Description

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
- E2E tests for user scenarios`;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Issue Description</h2>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>
      {isExpanded && (
        <div className="prose prose-sm max-w-none">
          <div 
            className="text-sm text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: formatMarkdown(mockIssueBody)
            }}
          />
        </div>
      )}
      {!isExpanded && (
        <p className="text-sm text-muted-foreground">
          {mockIssueBody?.substring(0, 200)}...
        </p>
      )}
      {/* Issue Metadata */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Acceptance Criteria */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground flex items-center space-x-1">
              <Icon name="CheckSquare" size={14} />
              <span>Acceptance Criteria</span>
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start space-x-2">
                <Icon name="Circle" size={12} className="mt-1 flex-shrink-0" />
                <span>Error messages are user-friendly and specific</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Circle" size={12} className="mt-1 flex-shrink-0" />
                <span>Automatic token refresh is implemented</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Circle" size={12} className="mt-1 flex-shrink-0" />
                <span>Loading states are properly managed</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Circle" size={12} className="mt-1 flex-shrink-0" />
                <span>Unit and integration tests are included</span>
              </li>
            </ul>
          </div>

          {/* Technical Requirements */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground flex items-center space-x-1">
              <Icon name="Code" size={14} />
              <span>Technical Requirements</span>
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start space-x-2">
                <Icon name="Circle" size={12} className="mt-1 flex-shrink-0" />
                <span>React 18+ functional components</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Circle" size={12} className="mt-1 flex-shrink-0" />
                <span>TypeScript for type safety</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Circle" size={12} className="mt-1 flex-shrink-0" />
                <span>Jest and React Testing Library</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Circle" size={12} className="mt-1 flex-shrink-0" />
                <span>Follow existing code patterns</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Related Links */}
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Related Resources</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => window.open('https://github.com/example/repo/wiki/Authentication', '_blank')}
          >
            Authentication Docs
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => window.open('https://github.com/example/repo/issues/123', '_blank')}
          >
            Related Issue #123
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => window.open('https://github.com/example/repo/pull/456', '_blank')}
          >
            Previous PR #456
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssueContent;