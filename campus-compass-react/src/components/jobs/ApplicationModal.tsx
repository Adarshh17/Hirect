import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Job, ApplicationFormData } from '@/types/job';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
});

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ 
  isOpen, 
  onClose, 
  job 
}) => {
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const { user, token } = useAuth();
  const { toast } = useToast();

  const form = useForm<Omit<ApplicationFormData, 'resume'>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
      email: user?.email || '',
      phone: '',
      coverLetter: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }

      setResume(file);
    }
  };

  const onSubmit = async (data: Omit<ApplicationFormData, 'resume'>) => {
    if (!resume) {
      toast({
        variant: "destructive",
        title: "Resume required",
        description: "Please upload your resume before submitting.",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('full_name', data.fullName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('cover_letter', data.coverLetter);
      formData.append('resume', resume);
      formData.append('job', job.id.toString());

      const response = await fetch(`http://localhost:8000/api/jobs/${job.id}/apply/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Application failed');
      }
      
      toast({
        title: "Application submitted!",
        description: `Your application for ${job.title} at ${job.company} has been submitted successfully.`,
      });

      onClose();
      form.reset();
      setResume(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Application failed",
        description: "There was an error submitting your application. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            at {job.companyName}
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              {...form.register('fullName')}
              className="focus-ring"
              placeholder="John Doe"
            />
            {form.formState.errors.fullName && (
              <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              className="focus-ring"
              placeholder="john@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              {...form.register('phone')}
              className="focus-ring"
              placeholder="+1 (555) 123-4567"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume *</Label>
            <div className="relative">
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="resume"
                className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors"
              >
                {resume ? (
                  <>
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{resume.name}</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload resume (PDF, DOC, DOCX)
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter *</Label>
            <Textarea
              id="coverLetter"
              {...form.register('coverLetter')}
              rows={6}
              className="focus-ring resize-none"
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            />
            {form.formState.errors.coverLetter && (
              <p className="text-sm text-destructive">{form.formState.errors.coverLetter.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};