export interface Subject {
  name: string;
  level: number;
  isRequired: boolean;
}

export interface Degree {
  id: string;
  name: string;
  faculty: string;
  duration: string;
  apsRequirement: number;
  description: string;
  subjects: Subject[];
  careerProspects: string[];
}

export interface Faculty {
  id: string;
  name: string;
  description: string;
  degrees: Degree[];
}

export interface ApplicationInfo {
  isOpen: boolean;
  openingDate: string;
  closingDate: string;
  academicYear: string;
  applicationFee?: string;
  applicationMethod: string;
  lateApplications?: {
    available: boolean;
    deadline?: string;
    additionalFee?: string;
  };
}

export interface University {
  id: string;
  name: string;
  abbreviation: string;
  fullName: string;
  location: string;
  province: string;
  logo: string;
  overview: string;
  website: string;
  studentPortal: string;
  admissionsContact: string;
  faculties: Faculty[];
  applicationInfo: ApplicationInfo;
  establishedYear?: number;
  studentPopulation?: number;
  campuses?: string[];
}

// APS Calculator Types
export interface APSSubject {
  name: string;
  marks: number;
  level: number;
  points: number;
}

export interface EligibleDegree {
  degree: Degree;
  university: University;
  meetsRequirement: boolean;
  apsGap?: number;
}

export interface APSCalculation {
  subjects: APSSubject[];
  totalScore: number;
  eligibleDegrees: EligibleDegree[];
}

// Bursary Types
export interface BursaryRequirements {
  academicRequirement: string;
  financialNeed: boolean;
  workCommitment?: boolean;
  citizenship?: string;
  age?: {
    min?: number;
    max?: number;
  };
}

export interface Bursary {
  id: string;
  name: string;
  provider: string;
  description: string;
  amount: string;
  eligibilityCriteria: string[];
  applicationDeadline: string;
  applicationProcess: string;
  contactInfo: string;
  website?: string;
  fieldsOfStudy: string[];
  provinces: string[];
  requirements: BursaryRequirements;
  isActive?: boolean;
  priority?: "high" | "medium" | "low";
}

export interface BursaryFilters {
  searchTerm?: string;
  fieldOfStudy?: string;
  province?: string;
  financialNeed?: boolean;
  maxAmount?: number;
  deadline?: string;
}

// User-submitted Program Types
export interface UserSubmittedProgram {
  id?: string;
  universityId: string;
  universityName: string;
  facultyId: string;
  facultyName: string;
  programName: string;
  duration: string;
  apsRequirement: number;
  description: string;
  subjects: Subject[];
  careerProspects: string[];
  submittedBy: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

// Study Resources Types
export interface StudyTip {
  id: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  effectiveness?: number;
  tags?: string[];
  content: string;
  author?: string;
}

export interface StudyResource {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "video" | "website" | "tool" | "course";
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  url: string;
  rating?: number;
  provider?: string;
  duration?: string;
  tags?: string[];
}

export interface TimeTableEntry {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  day: string;
  color: string;
  location?: string;
  notes?: string;
}

export interface StudyPlan {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  subjects: string[];
  goals: string[];
  schedule: TimeTableEntry[];
  userId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
