import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";

// Quick test to verify all universities have adequate programs
export const testUniversityPrograms = () => {
  console.log("=== University Programs Test ===");

  SOUTH_AFRICAN_UNIVERSITIES.forEach((university) => {
    const totalPrograms = university.faculties.reduce(
      (total, faculty) => total + faculty.degrees.length,
      0,
    );

    console.log(
      `${university.name}: ${university.faculties.length} faculties, ${totalPrograms} programs`,
    );

    if (totalPrograms < 10) {
      console.warn(
        `⚠️  ${university.name} has only ${totalPrograms} programs - may need more`,
      );
    }

    if (university.faculties.length < 3) {
      console.warn(
        `⚠️  ${university.name} has only ${university.faculties.length} faculties - may need more`,
      );
    }
  });

  const totalUniversities = SOUTH_AFRICAN_UNIVERSITIES.length;
  const totalPrograms = SOUTH_AFRICAN_UNIVERSITIES.reduce(
    (total, uni) =>
      total +
      uni.faculties.reduce((facTotal, fac) => facTotal + fac.degrees.length, 0),
    0,
  );

  console.log(
    `\n📊 Summary: ${totalUniversities} universities with ${totalPrograms} total programs`,
  );
  console.log(
    `📈 Average: ${Math.round(totalPrograms / totalUniversities)} programs per university`,
  );

  return {
    totalUniversities,
    totalPrograms,
    averagePrograms: Math.round(totalPrograms / totalUniversities),
  };
};

// Run test in development
if (import.meta.env.DEV) {
  testUniversityPrograms();
}
