import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";

/**
 * Utility to verify all universities have proper logo mappings
 */
export const verifyUniversityLogos = () => {
  const results = {
    total: SOUTH_AFRICAN_UNIVERSITIES.length,
    withLogos: 0,
    missingLogos: [] as string[],
    logoMappings: [] as { id: string; name: string; logo: string | null }[],
  };

  SOUTH_AFRICAN_UNIVERSITIES.forEach((university) => {
    const hasLogo = university.logo && university.logo !== null;

    if (hasLogo) {
      results.withLogos++;
    } else {
      results.missingLogos.push(`${university.name} (${university.id})`);
    }

    results.logoMappings.push({
      id: university.id,
      name: university.name,
      logo: university.logo || null,
    });
  });

  // Log verification results in development
  if (import.meta.env.DEV) {
    console.log("🎓 University Logo Verification:", {
      total: results.total,
      withLogos: results.withLogos,
      coverage: `${Math.round((results.withLogos / results.total) * 100)}%`,
      missingLogos: results.missingLogos.length,
      missingList: results.missingLogos,
    });
  }

  return results;
};

/**
 * Get university by ID with logo verification
 */
export const getUniversityWithLogo = (universityId: string) => {
  const university = SOUTH_AFRICAN_UNIVERSITIES.find(
    (uni) => uni.id === universityId,
  );

  if (university && import.meta.env.DEV) {
    console.log(`🏛️ University ${university.abbreviation}:`, {
      name: university.name,
      logo: university.logo,
      hasLogo: !!university.logo,
    });
  }

  return university;
};
