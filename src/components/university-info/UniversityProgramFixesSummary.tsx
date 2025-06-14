import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  SOUTH_AFRICAN_UNIVERSITIES,
} from "@/constants/universities";

interface UniversityProgramFixesSummaryProps {
  universityId: string;
}

const UniversityProgramFixesSummary = ({
  universityId,
}: UniversityProgramFixesSummaryProps) => {
  const university = SOUTH_AFRICAN_UNIVERSITIES.find((u) => u.id === universityId);

  if (!university) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>University Program Fixes Summary</CardTitle>
          <CardDescription>No fixes available</CardDescription>
        </CardHeader>
        <CardContent>
          <p>University not found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>University Program Fixes Summary</CardTitle>
        <CardDescription>
          Summary of program fixes for {university.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            This section provides a summary of program fixes and adjustments
            made to ensure accurate and up-to-date information for{" "}
            {university.name}.
          </p>
          <Badge variant="outline">
            {university.faculties?.length || 0} Faculties Adjusted
          </Badge>
          <Badge variant="outline">
            {university.studentPopulation || 0} Student Population Verified
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversityProgramFixesSummary;
