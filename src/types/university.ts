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
