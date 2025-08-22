import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
          <Briefcase className="h-6 w-6 text-primary" />
          Campus Compass
        </Link>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{user?.firstName || user?.companyName || user?.email}</span>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {user?.role === 'seeker' ? 'Job Seeker' : 'Job Poster'}
              </span>
            </div>
            <Link to="/my-applications">
              <Button variant="outline" size="sm">My Applications</Button>
            </Link>
            <Link to="/analysis">
              <Button variant="outline" size="sm">Analysis</Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/auth">
            <Button variant="default">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
};