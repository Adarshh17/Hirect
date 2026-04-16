export interface Job {
  id: number;
  title: string;
  description: string;
  responsibilities: string;
  qualifications: string;
  company: string;
  location: string;
  salary: number | null;
  posted_at: string;
  jobType?: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experienceLevel?: 'Entry-level' | 'Mid-level' | 'Senior-level' | 'Executive';
  is_applied?: boolean;
}

export interface JobApplication {
  id: number;
  job: Job;
  full_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  resume: string;
  applied_at: string;
  status: 'applied' | 'reviewed' | 'rejected';
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume: File | null;
}

export interface PosterJob {
  jobId: string;
  title: string;
  applicantCount: number;
}

export interface JobFilters {
  searchTerm: string;
  location: string;
  jobType: string;
  experienceLevel: string;
}