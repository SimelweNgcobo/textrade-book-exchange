
import { UniversityAPSResult } from "@/services/universitySpecificAPSService";

export interface UniversityScoreComparison {
  averagePerformance: number;
  bestPerformance: UniversityAPSResult[];
  worstPerformance: UniversityAPSResult[];
  eligibleCount: number;
  totalCount: number;
  insights: string[];
}

export interface UniversityRecommendation {
  title: string;
  message: string;
  universities: string[];
  actionItems: string[];
  priority: 'high' | 'medium' | 'low';
}

export function compareUniversityScores(
  universityScores: UniversityAPSResult[]
): UniversityScoreComparison {
  if (!universityScores || universityScores.length === 0) {
    return {
      averagePerformance: 0,
      bestPerformance: [],
      worstPerformance: [],
      eligibleCount: 0,
      totalCount: 0,
      insights: []
    };
  }

  const performances = universityScores.map(score => ({
    ...score,
    percentage: Math.round((score.score / score.maxScore) * 100)
  }));

  const eligibleCount = performances.filter(p => p.percentage >= 60).length;
  const averagePerformance = Math.round(
    performances.reduce((sum, p) => sum + p.percentage, 0) / performances.length
  );

  const sortedByPerformance = [...performances].sort((a, b) => b.percentage - a.percentage);
  const bestPerformance = sortedByPerformance.slice(0, 3);
  const worstPerformance = sortedByPerformance.slice(-3).reverse();

  const insights: string[] = [];
  
  if (eligibleCount > performances.length * 0.7) {
    insights.push("Excellent performance! You qualify for most universities.");
  } else if (eligibleCount > performances.length * 0.4) {
    insights.push("Good performance with several university options available.");
  } else {
    insights.push("Consider improving your marks to increase university options.");
  }

  if (bestPerformance.length > 0) {
    insights.push(`Your strongest performance is at ${bestPerformance[0].universityName}.`);
  }

  return {
    averagePerformance,
    bestPerformance,
    worstPerformance,
    eligibleCount,
    totalCount: performances.length,
    insights
  };
}

export function getUniversityRecommendations(
  universityScores: UniversityAPSResult[]
): UniversityRecommendation[] {
  if (!universityScores || universityScores.length === 0) {
    return [];
  }

  const recommendations: UniversityRecommendation[] = [];
  const performances = universityScores.map(score => ({
    ...score,
    percentage: Math.round((score.score / score.maxScore) * 100)
  }));

  const eligible = performances.filter(p => p.percentage >= 60);
  const almostEligible = performances.filter(p => p.percentage >= 50 && p.percentage < 60);

  if (eligible.length > 0) {
    recommendations.push({
      title: "Strong Candidates",
      message: "You qualify for these universities with your current performance.",
      universities: eligible.slice(0, 5).map(p => p.universityName),
      actionItems: [
        "Apply to these universities",
        "Research program requirements",
        "Prepare application documents"
      ],
      priority: 'high'
    });
  }

  if (almostEligible.length > 0) {
    recommendations.push({
      title: "Improvement Opportunities", 
      message: "With slight improvements, you could qualify for these additional universities.",
      universities: almostEligible.slice(0, 3).map(p => p.universityName),
      actionItems: [
        "Focus on improving weaker subjects",
        "Consider supplementary exams",
        "Explore alternative pathways"
      ],
      priority: 'medium'
    });
  }

  // Add subject-specific recommendations
  const customScoringUnis = performances.filter(p => 
    ['uct', 'wits', 'stellenbosch', 'rhodes', 'unisa'].includes(p.universityId)
  );

  if (customScoringUnis.length > 0) {
    recommendations.push({
      title: "Custom Scoring Advantages",
      message: "These universities use unique scoring systems that may work in your favor.",
      universities: customScoringUnis.map(p => p.universityName),
      actionItems: [
        "Research each university's specific requirements",
        "Understand their scoring methodology",
        "Consider these as strategic choices"
      ],
      priority: 'medium'
    });
  }

  return recommendations;
}
