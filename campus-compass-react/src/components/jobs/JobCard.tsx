import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
export const JobCard = ({ job, status }) => {
  const getJobTypeBadge = (type) => {
    const variants = {
      'Full-time': 'default',
      'Part-time': 'secondary',
      'Contract': 'outline',
      'Remote': 'secondary',
    };
    return variants[type] || 'default';
  };

  const statusColor = status === 'accepted' ? 'border-green-500' : status === 'rejected' ? 'border-red-500' : '';

  return (
    <Card className={`job-card group cursor-pointer ${statusColor}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
          <Badge variant={getJobTypeBadge(job.jobType)}>
            {job.jobType}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{new Date(job.posted_at).toLocaleDateString()}</span>
            </div>
          </div>

          {job.experienceLevel && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Experience:</span>
              <Badge variant="outline">{job.experienceLevel}</Badge>
            </div>
          )}

          {job.salary && (
            <div className="text-sm">
              <span className="text-muted-foreground">Salary: </span>
              <span className="font-medium text-primary">₹{job.salary}</span>
            </div>
          )}

          <div className="pt-2">
            <Link to={`/job/${job.id}`}>
              <Button className="w-full group-hover:bg-primary-dark transition-colors" disabled={job.is_applied || status === 'accepted'}>
                {status ? status.charAt(0).toUpperCase() + status.slice(1) : (job.is_applied ? 'Applied' : 'View Details')}
                {!job.is_applied && status !== 'accepted' && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};