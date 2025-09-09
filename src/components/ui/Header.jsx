import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'Home',
      tooltip: 'View personalized issue recommendations'
    },
    {
      label: 'Browse',
      path: '/repository-browse',
      icon: 'Search',
      tooltip: 'Explore repositories and issues'
    },
    {
      label: 'Profile',
      path: '/profile-settings',
      icon: 'User',
      tooltip: 'Manage account settings and preferences'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/user-dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-smooth">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="GitBranch" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            Civic Contributor
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth
                hover:bg-muted hover:scale-105
                ${isActivePath(item?.path) 
                  ? 'bg-primary text-primary-foreground shadow-soft' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
        </Button>
      </div>
      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-[1050] bg-black bg-opacity-50 md:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-16 right-0 z-[1100] w-64 h-[calc(100vh-4rem)] bg-card border-l border-border shadow-elevated md:hidden">
            <nav className="flex flex-col p-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-smooth
                    hover:bg-muted
                    ${isActivePath(item?.path) 
                      ? 'bg-primary text-primary-foreground shadow-soft' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={20} />
                  <div>
                    <div>{item?.label}</div>
                    <div className="text-xs opacity-75 mt-1">{item?.tooltip}</div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;