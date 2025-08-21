import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Search, Users, Building2, CheckCircle, Star } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  // Redirect authenticated users to their appropriate dashboard
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'poster' ? '/poster-dashboard' : '/dashboard'} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Briefcase className="h-6 w-6 text-primary" />
            Campus Compass
          </div>
          <Link to="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Find Your Perfect
              <span className="text-primary block">Career Opportunity</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with top companies and discover opportunities that match your skills and aspirations. 
              Built for the modern job market.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="px-8">
                  <Search className="mr-2 h-5 w-5" />
                  Find Jobs
                </Button>
              </Link>
              
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-card/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Campus Compass?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="job-card text-center">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Smart Job Matching</h3>
                  <p className="text-muted-foreground">
                    Advanced filtering and search capabilities to find roles that perfectly match your skills and preferences.
                  </p>
                </CardContent>
              </Card>

              <Card className="job-card text-center">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Top Companies</h3>
                  <p className="text-muted-foreground">
                    Connect directly with hiring managers from leading companies across various industries.
                  </p>
                </CardContent>
              </Card>

              <Card className="job-card text-center">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Easy Application</h3>
                  <p className="text-muted-foreground">
                    Streamlined application process with one-click apply and application tracking features.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Active Jobs</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5K+</div>
                <div className="text-muted-foreground">Companies</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Job Seekers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of professionals who found their dream jobs through Campus Compass
            </p>
            <Link to="/auth">
              <Button size="lg" className="px-12">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="font-semibold">Campus Compass</span>
          </div>
          <p>&copy; 2025 Campus Compass. Built with modern technologies for the future of work.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;