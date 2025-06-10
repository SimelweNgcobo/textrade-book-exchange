import { University } from "@/types/university";
import { TRADITIONAL_UNIVERSITIES } from "./traditionalUniversities";
import { UNIVERSITIES_OF_TECHNOLOGY } from "./technicalUniversities";
import { COMPREHENSIVE_UNIVERSITIES } from "./comprehensiveUniversities";
import {
  generateStandardFaculties,
  UNIVERSITIES_NEEDING_PROGRAMS,
  COMMON_DEGREE_TEMPLATES,
} from "./complete-programs-database";

// Function to ensure all universities have complete programs
const ensureCompletePrograms = (universities: University[]): University[] => {
  return universities.map((university) => {
    // Check if university needs more programs
    if (UNIVERSITIES_NEEDING_PROGRAMS.includes(university.id)) {
      // If university has very few faculties/degrees, add standard ones
      if (
        university.faculties.length <= 2 ||
        university.faculties.some((f) => f.degrees.length <= 3)
      ) {
        const standardFaculties = generateStandardFaculties(university.name);

        // Merge existing faculties with standard ones, avoiding duplicates
        const mergedFaculties = [...university.faculties];

        standardFaculties.forEach((standardFaculty) => {
          const existingFaculty = mergedFaculties.find(
            (f) => f.id === standardFaculty.id,
          );
          if (!existingFaculty) {
            mergedFaculties.push(standardFaculty);
          } else if (existingFaculty.degrees.length < 5) {
            // Add missing degrees to existing faculty
            const newDegrees = standardFaculty.degrees.filter(
              (degree) =>
                !existingFaculty.degrees.some(
                  (existing) => existing.id === degree.id,
                ),
            );
            existingFaculty.degrees.push(...newDegrees);
          }
        });

        return { ...university, faculties: mergedFaculties };
      }
    }
    return university;
  });
};

// Combine all university data from modular files
// Filter out duplicates: NWU from traditional (belongs in comprehensive), UFH from comprehensive (belongs in traditional)
let allUniversities = [
  ...TRADITIONAL_UNIVERSITIES.filter((uni) => uni.id !== "nwu"),
  ...UNIVERSITIES_OF_TECHNOLOGY,
  ...COMPREHENSIVE_UNIVERSITIES.filter((uni) => uni.id !== "ufh"),
];

// Ensure all universities have complete programs
allUniversities = ensureCompletePrograms(allUniversities);

export const ALL_SOUTH_AFRICAN_UNIVERSITIES: University[] = allUniversities;

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
