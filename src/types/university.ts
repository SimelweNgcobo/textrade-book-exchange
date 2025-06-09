export interface University {
  id: string;
  name: string;
  abbreviation: string;
  fullName: string;
  location: string;
  province: string;
  logo?: string;
  overview: string;
  faculties: Faculty[];
  website?: string;
  studentPortal?: string;
  admissionsContact?: string;
}

export interface Faculty {
  id: string;
  name: string;
  description: string;
  degrees: Degree[];
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

export interface Subject {
  name: string;
  level: number;
  isRequired: boolean;
}

export interface APSCalculation {
  subjects: APSSubject[];
  totalScore: number;
  eligibleDegrees: EligibleDegree[];
}

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
  requirements: {
    academicRequirement?: string;
    financialNeed?: boolean;
    race?: string[];
    gender?: string[];
    disability?: boolean;
  };
}

export interface BursaryFilters {
  fieldOfStudy?: string;
  province?: string;
  financialNeed?: boolean;
  race?: string;
  gender?: string;
  disability?: boolean;
  searchQuery?: string;
}
