import { University } from "@/types/university";
import {
  ALL_26_SA_UNIVERSITIES,
  UNIVERSITY_COUNT_SUMMARY,
} from "./complete-sa-universities";
import {
  generateStandardFaculties,
  UNIVERSITIES_NEEDING_PROGRAMS,
  COMMON_DEGREE_TEMPLATES,
  FORCE_COMPREHENSIVE_PROGRAMS,
} from "./complete-programs-database";
import { fixProgramFacultyAssignments } from "@/utils/programFacultyUtils";
import { assignComprehensivePrograms } from "@/utils/comprehensiveProgramAssignment";

// Function to ensure all universities have complete programs
const ensureCompletePrograms = (universities: University[]): University[] => {
  return universities.map((university) => {
    // Calculate total degrees for this university
    const totalDegrees = university.faculties.reduce(
      (total, faculty) => total + faculty.degrees.length,
      0,
    );

    // CONSERVATIVE criteria: Only enhance universities with very few programs AND in the verified list
    // This prevents corruption of existing well-structured university data
    if (
      FORCE_COMPREHENSIVE_PROGRAMS ||
      (totalDegrees < 10 &&
        UNIVERSITIES_NEEDING_PROGRAMS.includes(university.id))
    ) {
      const standardFaculties = generateStandardFaculties(
        university.name,
        university.id,
      );

      // Start with existing faculties
      const mergedFaculties = [...university.faculties];

      // Add missing faculties or enhance existing ones
      standardFaculties.forEach((standardFaculty) => {
        const existingFacultyIndex = mergedFaculties.findIndex(
          (f) =>
            f.id === standardFaculty.id ||
            f.name
              .toLowerCase()
              .includes(
                standardFaculty.name.toLowerCase().split(" ")[2] || "",
              ) ||
            f.name
              .toLowerCase()
              .includes(standardFaculty.name.toLowerCase().split(" ")[1] || ""),
        );

        if (existingFacultyIndex === -1) {
          // Add entirely new faculty
          mergedFaculties.push(standardFaculty);
        } else {
          // Enhance existing faculty with more degrees - be more aggressive
          const existingFaculty = mergedFaculties[existingFacultyIndex];
          const newDegrees = standardFaculty.degrees.filter(
            (degree) =>
              !existingFaculty.degrees.some(
                (existing) =>
                  existing.id === degree.id ||
                  existing.name
                    .toLowerCase()
                    .includes(degree.name.toLowerCase().split(" ")[1] || "") ||
                  degree.name
                    .toLowerCase()
                    .includes(existing.name.toLowerCase().split(" ")[1] || ""),
              ),
          );

          // Add all new degrees to ensure comprehensive coverage
          existingFaculty.degrees.push(...newDegrees);
        }
      });

      return { ...university, faculties: mergedFaculties };
    }

    // Even for universities with enough programs, ensure minimum faculty count
    if (university.faculties.length < 8) {
      const standardFaculties = generateStandardFaculties(
        university.name,
        university.id,
      );
      const mergedFaculties = [...university.faculties];

      // Add essential faculties if missing
      const essentialFaculties = standardFaculties.filter(
        (f) =>
          f.id === "commerce" ||
          f.id === "science" ||
          f.id === "humanities" ||
          f.id === "engineering" ||
          f.id === "health-sciences" ||
          f.id === "education" ||
          f.id === "law" ||
          f.id === "information-technology",
      );

      essentialFaculties.forEach((essentialFaculty) => {
        const exists = mergedFaculties.some(
          (f) =>
            f.id === essentialFaculty.id ||
            f.name
              .toLowerCase()
              .includes(
                essentialFaculty.name.toLowerCase().split(" ")[2] || "",
              ),
        );

        if (!exists) {
          mergedFaculties.push(essentialFaculty);
        }
      });

      return { ...university, faculties: mergedFaculties };
    }

    return university;
  });
};

// Use the complete, audited database of all 26 South African public universities
let allUniversities = [...ALL_26_SA_UNIVERSITIES];

// Ensure all universities have complete programs
allUniversities = ensureCompletePrograms(allUniversities);

// Apply comprehensive program assignment based on user specifications
allUniversities = assignComprehensivePrograms(allUniversities);

// Fix program-faculty assignments to ensure proper categorization
allUniversities = allUniversities.map((university) =>
  fixProgramFacultyAssignments(university),
);

export const ALL_SOUTH_AFRICAN_UNIVERSITIES: University[] = allUniversities;

// Production-ready university data loaded
if (import.meta.env.DEV) {
  const totalPrograms = allUniversities.reduce(
    (total, uni) =>
      total +
      uni.faculties.reduce((facTotal, fac) => facTotal + fac.degrees.length, 0),
    0,
  );
  console.log(
    `📚 ReBooked Campus: ${allUniversities.length} universities loaded with ${totalPrograms} programs`,
  );
}

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
