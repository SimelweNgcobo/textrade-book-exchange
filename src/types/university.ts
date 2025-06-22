
export interface Subject {
  name: string;
  level: number;
  isRequired: boolean;
}

export interface Degree {
  id: string;
  code: string;
  name: string;
  faculty: string;
  duration: string;
  apsRequirement: number;
  description: string;
  subjects?: Subject[];
  careerProspects?: string[];
}

export interface University {
  id: string;
  name: string;
  abbreviation: string;
  fullName: string;
  logo: string;
  location: string;
  province: string;
  website?: string;
  overview: string;
  studentPopulation?: number;
  faculties?: string[];
  establishedYear?: number;
  established?: string;
  type?: string;
}

export interface UniversityWithDegrees extends University {
  degrees: Degree[];
}

export interface APSCalculation {
  totalAPS: number;
  subjects: Record<string, number>;
  eligibleUniversities: University[];
  eligibleDegrees: Degree[];
}
