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
    // Calculate total degrees for this university
    const totalDegrees = university.faculties.reduce(
      (total, faculty) => total + faculty.degrees.length,
      0,
    );

    // If university has less than 15 degrees or very few faculties, enhance it
    if (totalDegrees < 15 || university.faculties.length <= 3) {
      const standardFaculties = generateStandardFaculties(university.name);

      // Start with existing faculties
      const mergedFaculties = [...university.faculties];

      // Add missing faculties or enhance existing ones
      standardFaculties.forEach((standardFaculty) => {
        const existingFacultyIndex = mergedFaculties.findIndex(
          (f) =>
            f.id === standardFaculty.id ||
            f.name
              .toLowerCase()
              .includes(standardFaculty.name.toLowerCase().split(" ")[2] || ""),
        );

        if (existingFacultyIndex === -1) {
          // Add entirely new faculty
          mergedFaculties.push(standardFaculty);
        } else {
          // Enhance existing faculty with more degrees
          const existingFaculty = mergedFaculties[existingFacultyIndex];
          const newDegrees = standardFaculty.degrees.filter(
            (degree) =>
              !existingFaculty.degrees.some(
                (existing) =>
                  existing.id === degree.id ||
                  existing.name.toLowerCase() === degree.name.toLowerCase(),
              ),
          );
          existingFaculty.degrees.push(...newDegrees);
        }
      });

      return { ...university, faculties: mergedFaculties };
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
