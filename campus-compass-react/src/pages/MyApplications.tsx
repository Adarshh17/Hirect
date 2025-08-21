import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { JobApplication } from '@/types/job';
import { JobCard } from '@/components/jobs/JobCard';
import { Skeleton } from '@/components/ui/skeleton';

const MyApplications: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/my-applications/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        }
      } catch (error) {
        console.error('Failed to fetch applications', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchApplications();
    }
  }, [token]);

  const acceptedApplications = applications.filter(app => app.status === 'accepted');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');
  const pendingApplications = applications.filter(app => app.status !== 'accepted' && app.status !== 'rejected');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Applications</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-48 w-full" />
          ))}
        </div>
      ) : (
        <>
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-green-500">Accepted Applications</h2>
            {acceptedApplications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {acceptedApplications.map(app => (
                  <JobCard key={app.id} job={app.job} status={app.status} />
                ))}
              </div>
            ) : (
              <p>No accepted applications yet.</p>
            )}
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Rejected Applications</h2>
            {rejectedApplications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejectedApplications.map(app => (
                  <JobCard key={app.id} job={app.job} status={app.status} />
                ))}
              </div>
            ) : (
              <p>No rejected applications yet.</p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Pending Applications</h2>
            {pendingApplications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingApplications.map(app => (
                  <JobCard key={app.id} job={app.job} status={app.status} />
                ))}
              </div>
            ) : (
              <p>No pending applications.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default MyApplications;