import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';

const MyDashboard = () => {
  const { token } = useAuth();
  const [visualizations, setVisualizations] = useState({
    salary_vs_experience_plot: '',
    salary_by_location_plot: '',
    application_status_plot: '',
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dashboard/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setVisualizations(data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Salary vs. Experience</h2>
            {visualizations.salary_vs_experience_plot && (
              <img src={visualizations.salary_vs_experience_plot} alt="Salary vs. Experience" />
            )}
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Salary by Location</h2>
            {visualizations.salary_by_location_plot && (
              <img src={visualizations.salary_by_location_plot} alt="Salary by Location" />
            )}
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">My Application Status</h2>
            {visualizations.application_status_plot && (
              <img src={visualizations.application_status_plot} alt="Application Status" />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyDashboard;
