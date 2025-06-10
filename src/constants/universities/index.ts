import { University } from "@/types/university";
import { TRADITIONAL_UNIVERSITIES } from "./traditionalUniversities";
import { UNIVERSITIES_OF_TECHNOLOGY } from "./technicalUniversities";
import { COMPREHENSIVE_UNIVERSITIES } from "./comprehensiveUniversities";

// Combine all university data from modular files
// Filter out duplicates: NWU from traditional (belongs in comprehensive), UFH from comprehensive (belongs in traditional)
export const ALL_SOUTH_AFRICAN_UNIVERSITIES: University[] = [
  ...TRADITIONAL_UNIVERSITIES.filter((uni) => uni.id !== "nwu"),
  ...UNIVERSITIES_OF_TECHNOLOGY,
  ...COMPREHENSIVE_UNIVERSITIES.filter((uni) => uni.id !== "ufh"),
];

// Export individual categories
export { TRADITIONAL_UNIVERSITIES } from "./traditionalUniversities";
export { UNIVERSITIES_OF_TECHNOLOGY } from "./technicalUniversities";
export { COMPREHENSIVE_UNIVERSITIES } from "./comprehensiveUniversities";

// Create simplified list for basic operations
export const SOUTH_AFRICAN_UNIVERSITIES_SIMPLE =
  ALL_SOUTH_AFRICAN_UNIVERSITIES.map((university) => ({
    id: university.id,
    name: university.name,
    abbreviation: university.abbreviation,
    fullName: university.fullName,
    logo: university.logo,
  }));
