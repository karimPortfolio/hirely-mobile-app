export interface ApplicationStatus {
  label: string;
  value: 'applied' | 'in_review' | 'interview' | 'offer' | 'hired' | 'rejected';
  colorClass: string;
}

export interface ApplicationStage {
  label: string;
  value: 'screening' | 'technical_interview' | 'hr_interview' | 'final_interview' | 'offer';
  colorClass: string;
}

export interface CreateApplicationPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  linkedInUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  resume?: string | File;
  country?: string;
  city?: string;
  job: string;
  status?: 'applied' | 'in_review' | 'interview' | 'offer' | 'hired' | 'rejected';
  stage?: 'screening' | 'technical_interview' | 'hr_interview' | 'final_interview' | 'offer';
  source?: string;
  referalName?: string;
  referalEmail?: string;
  recaptchaToken?: string;
}
