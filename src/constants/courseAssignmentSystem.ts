
// University ID mappings for consistent reference
export const UNIVERSITY_ABBREVIATIONS = {
  UCT: "uct",
  WITS: "wits", 
  UP: "up",
  SU: "stellenbosch",
  UKZN: "ukzn",
  UJ: "uj",
  RU: "ru",
  NWU: "nwu",
  UFS: "ufs",
  UNISA: "unisa",
  UWC: "uwc",
  UNIVEN: "univen",
  UL: "ul",
  MUT: "mut",
  CPUT: "cput",
  UFH: "ufh",
  WSU: "wsu",
  VUT: "vut",
  TUT: "tut",
  CUT: "cut",
  DUT: "dut",
  NMMU: "nmmu",
  UZ: "uz",
  SMU: "smu",
  UMP: "ump",
  SOL: "sol"
};

// Course assignment rule types
export type CourseAssignmentRule = 
  | { type: "all" }
  | { type: "exclude"; universities: string[] }
  | { type: "include_only"; universities: string[] };

// Helper function to get universities for a given assignment rule
export const getUniversitiesForCourse = (rule: CourseAssignmentRule): string[] => {
  const allUniversities = Object.values(UNIVERSITY_ABBREVIATIONS);
  
  switch (rule.type) {
    case "all":
      return allUniversities;
    case "exclude":
      return allUniversities.filter(id => !rule.universities.includes(id));
    case "include_only":
      return rule.universities.filter(id => allUniversities.includes(id));
    default:
      return [];
  }
};

// Predefined university groups for common assignment patterns
export const UNIVERSITY_GROUPS = {
  // Major research universities
  RESEARCH_INTENSIVE: ["uct", "wits", "up", "stellenbosch", "ukzn"],
  
  // Universities of technology
  TECHNOLOGY_FOCUSED: ["cput", "dut", "tut", "vut", "mut"],
  
  // Comprehensive universities
  COMPREHENSIVE: ["uj", "uwc", "ufs", "nwu"],
  
  // Specialized institutions
  DISTANCE_LEARNING: ["unisa"],
  
  // Regional universities
  REGIONAL: ["ul", "univen", "ufh", "wsu", "cut"],
  
  // Top tier universities (most competitive programs)
  TOP_TIER: ["uct", "wits", "up", "stellenbosch"],
  
  // Medical schools (for health science programs)
  MEDICAL_SCHOOLS: ["uct", "wits", "up", "stellenbosch", "ukzn", "ufs", "ul"],
  
  // Engineering schools (for engineering programs)
  ENGINEERING_SCHOOLS: ["uct", "wits", "up", "stellenbosch", "ukzn", "uj", "cput", "dut", "tut"],
  
  // Business schools (for commerce programs)
  BUSINESS_SCHOOLS: ["uct", "wits", "up", "stellenbosch", "ukzn", "uj", "uwc", "ufs", "nwu", "unisa"],
};

// Assignment rule templates for common patterns
export const ASSIGNMENT_TEMPLATES = {
  // All universities offer this program
  ALL_UNIVERSITIES: { type: "all" } as CourseAssignmentRule,
  
  // Only research universities
  RESEARCH_ONLY: { 
    type: "include_only", 
    universities: UNIVERSITY_GROUPS.RESEARCH_INTENSIVE 
  } as CourseAssignmentRule,
  
  // Only universities of technology
  TECH_ONLY: { 
    type: "include_only", 
    universities: UNIVERSITY_GROUPS.TECHNOLOGY_FOCUSED 
  } as CourseAssignmentRule,
  
  // Top tier universities only
  TOP_TIER_ONLY: { 
    type: "include_only", 
    universities: UNIVERSITY_GROUPS.TOP_TIER 
  } as CourseAssignmentRule,
  
  // Medical schools only
  MEDICAL_ONLY: { 
    type: "include_only", 
    universities: UNIVERSITY_GROUPS.MEDICAL_SCHOOLS 
  } as CourseAssignmentRule,
  
  // Engineering schools only
  ENGINEERING_ONLY: { 
    type: "include_only", 
    universities: UNIVERSITY_GROUPS.ENGINEERING_SCHOOLS 
  } as CourseAssignmentRule,
  
  // Business schools only
  BUSINESS_ONLY: { 
    type: "include_only", 
    universities: UNIVERSITY_GROUPS.BUSINESS_SCHOOLS 
  } as CourseAssignmentRule,
  
  // Exclude distance learning
  NO_DISTANCE_LEARNING: { 
    type: "exclude", 
    universities: UNIVERSITY_GROUPS.DISTANCE_LEARNING 
  } as CourseAssignmentRule,
};

// Validation function
export const validateAssignmentRule = (rule: CourseAssignmentRule): boolean => {
  const allUniversities = Object.values(UNIVERSITY_ABBREVIATIONS);
  
  switch (rule.type) {
    case "all":
      return true;
    case "exclude":
    case "include_only":
      return rule.universities.every(id => allUniversities.includes(id));
    default:
      return false;
  }
};
