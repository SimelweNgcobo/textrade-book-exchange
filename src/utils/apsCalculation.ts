import { APSSubject, APSCalculation, EligibleDegree } from "@/types/university";
import { COMMON_DEGREES, calculateAPSPoints } from "@/constants/degrees";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";

export const calculateAPS = (subjects: APSSubject[]): APSCalculation => {
  // Calculate total APS score
  const totalScore = subjects.reduce(
    (total, subject) => total + subject.points,
    0,
  );

  // Find eligible degrees
  const eligibleDegrees: EligibleDegree[] = [];

  COMMON_DEGREES.forEach((degree) => {
    SOUTH_AFRICAN_UNIVERSITIES.forEach((university) => {
      const meetsRequirement = totalScore >= degree.apsRequirement;
      const apsGap = meetsRequirement ? 0 : degree.apsRequirement - totalScore;

      eligibleDegrees.push({
        degree,
        university,
        meetsRequirement,
        apsGap: apsGap > 0 ? apsGap : undefined,
      });
    });
  });

  // Sort by eligibility and APS requirement
  eligibleDegrees.sort((a, b) => {
    if (a.meetsRequirement && !b.meetsRequirement) return -1;
    if (!a.meetsRequirement && b.meetsRequirement) return 1;
    return a.degree.apsRequirement - b.degree.apsRequirement;
  });

  return {
    subjects,
    totalScore,
    eligibleDegrees,
  };
};

export const convertPercentageToPoints = (percentage: number): number => {
  return calculateAPSPoints(percentage);
};

export const validateSubjectMarks = (marks: number): boolean => {
  return marks >= 0 && marks <= 100;
};

export const getSubjectLevel = (marks: number): number => {
  return convertPercentageToPoints(marks);
};

export const formatAPSScore = (score: number): string => {
  return `${score} points`;
};

export const getEligibilityStatus = (
  userAPS: number,
  requiredAPS: number,
): {
  eligible: boolean;
  message: string;
  gap?: number;
} => {
  if (userAPS >= requiredAPS) {
    return {
      eligible: true,
      message: "You meet the APS requirement!",
    };
  } else {
    const gap = requiredAPS - userAPS;
    return {
      eligible: false,
      message: `You need ${gap} more APS points`,
      gap,
    };
  }
};

export const getRecommendations = (currentAPS: number): string[] => {
  const recommendations: string[] = [];

  if (currentAPS < 20) {
    recommendations.push(
      "Consider improving your Mathematics and English marks",
    );
    recommendations.push("Look into bridging courses or alternative pathways");
    recommendations.push("Explore TVET college programs");
  } else if (currentAPS < 30) {
    recommendations.push("Focus on improving your strongest subjects");
    recommendations.push(
      "Consider studying part-time or through distance learning",
    );
    recommendations.push(
      "Look into diploma programs at universities of technology",
    );
  } else if (currentAPS < 35) {
    recommendations.push("You qualify for most degree programs!");
    recommendations.push(
      "Consider your career interests when choosing a degree",
    );
    recommendations.push("Look into bursary opportunities");
  } else {
    recommendations.push(
      "Excellent APS score! You qualify for competitive programs",
    );
    recommendations.push("Consider prestigious universities and programs");
    recommendations.push("Apply for merit-based bursaries and scholarships");
  }

  return recommendations;
};
