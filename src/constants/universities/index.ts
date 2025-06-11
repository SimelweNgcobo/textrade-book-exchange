import { University } from "@/types/university";
import { TRADITIONAL_UNIVERSITIES } from "./traditionalUniversities";
import { UNIVERSITIES_OF_TECHNOLOGY } from "./technicalUniversities";
import { COMPREHENSIVE_UNIVERSITIES } from "./comprehensiveUniversities";
import {
  generateStandardFaculties,
  UNIVERSITIES_NEEDING_PROGRAMS,
  COMMON_DEGREE_TEMPLATES,
  FORCE_COMPREHENSIVE_PROGRAMS,
} from "./complete-programs-database";
import { fixProgramFacultyAssignments } from "@/utils/programFacultyUtils";

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

// Combine all university data from modular files
// Filter out duplicates: NWU from traditional (belongs in comprehensive), UFH from comprehensive (belongs in traditional)
let allUniversities = [
  ...TRADITIONAL_UNIVERSITIES.filter((uni) => uni.id !== "nwu"),
  ...UNIVERSITIES_OF_TECHNOLOGY,
  ...COMPREHENSIVE_UNIVERSITIES.filter((uni) => uni.id !== "ufh"),
];

// Ensure all universities have complete programs
allUniversities = ensureCompletePrograms(allUniversities);

// Fix program-faculty assignments to ensure proper categorization
allUniversities = allUniversities.map((university) =>
  fixProgramFacultyAssignments(university),
);

export const ALL_SOUTH_AFRICAN_UNIVERSITIES: University[] = allUniversities;

// Test the university programs in development
if (import.meta.env.DEV) {
  console.log("=== University Programs Status ===");
  allUniversities.forEach((university) => {
    const totalPrograms = university.faculties.reduce(
      (total, faculty) => total + faculty.degrees.length,
      0,
    );
    console.log(
      `${university.name}: ${university.faculties.length} faculties, ${totalPrograms} programs`,
    );
  });

  const totalPrograms = allUniversities.reduce(
    (total, uni) =>
      total +
      uni.faculties.reduce((facTotal, fac) => facTotal + fac.degrees.length, 0),
    0,
  );
  console.log(
    `📊 Total: ${allUniversities.length} universities with ${totalPrograms} programs`,
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
