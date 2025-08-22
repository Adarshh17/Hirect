import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Calendar, DollarSign, Building, Info, IndianRupee } from 'lucide-react';
import { ApplicationModal } from '@/components/jobs/ApplicationModal';
import { useAuth } from '@/contexts/AuthContext';

export const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/jobs/${id}/`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Job not found');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError('Failed to fetch job details.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchJob();
    }
  }, [id, token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Job not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-foreground">{job.title}</h1>
            <Button size="lg" onClick={() => setIsModalOpen(true)} disabled={job.is_applied}>
              {job.is_applied ? 'Applied' : 'Apply Now'}
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-lg text-muted-foreground mb-6">
            <Building className="h-5 w-5" />
            <span>{job.company}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <span>{job.jobType || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Posted on {new Date(job.posted_at).toLocaleDateString()}</span>
            </div>
            {job.salary && (
              <div className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-primary" />
                <span>{job.salary} ₹</span>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Job Description</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
          </div>

          {job.responsibilities && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Responsibilities</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                {job.responsibilities.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {job.qualifications && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Qualifications</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                {job.qualifications.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      {job && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          job={job}
        />
      )}
    </div>
  );
};