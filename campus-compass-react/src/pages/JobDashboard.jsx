import React, { useState, useEffect, useMemo } from 'react';
import { JobList } from '@/components/jobs/JobList';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Briefcase } from 'lucide-react';
import { FilterBar } from '@/components/jobs/FilterBar';

export const JobDashboard = () => {
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applicationCount, setApplicationCount] = useState(0);
  const [filters, setFilters] = useState({});

  const locations = useMemo(() => {
    const allLocations = jobs.map(job => job.location);
    return [...new Set(allLocations)];
  }, [jobs]);

  useEffect(() => {
    const fetchJobs = async () => {
      const queryParams = new URLSearchParams(filters).toString();
      try {
        const response = await fetch(`http://localhost:8000/api/jobs/?${queryParams}`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/my-applications/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setApplicationCount(data.length);
        }
      } catch (error) {
        console.error('Failed to fetch applications', error);
      }
    };

    if (token) {
      fetchJobs();
      fetchApplications();
    }
  }, [token, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back!
              </h1>
              <p className="text-muted-foreground">
                Discover your next career opportunity from {jobs.length} available positions
              </p>
            </div>
            
            <div className="flex gap-3">
              <Link to="/my-applications">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  My Applications
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Jobs</p>
                  <p className="text-2xl font-bold">{jobs.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-success/10 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Applications Sent</p>
                  <p className="text-2xl font-bold">{applicationCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FilterBar onFilterChange={handleFilterChange} locations={locations} />

        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {jobs.length} of {jobs.length} jobs
          </p>
        </div>

        <JobList jobs={jobs} />
      </main>
    </div>
  );
};