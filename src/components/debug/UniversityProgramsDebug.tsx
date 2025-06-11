import { useState } from "react";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UniversityProgramsDebug = () => {
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>("");

  const selectedUniversity = SOUTH_AFRICAN_UNIVERSITIES.find(
    (uni) => uni.id === selectedUniversityId,
  );

  const totalPrograms = SOUTH_AFRICAN_UNIVERSITIES.reduce(
    (total, uni) =>
      total +
      uni.faculties.reduce((facTotal, fac) => facTotal + fac.degrees.length, 0),
    0,
  );

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>University Programs Debug Panel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {SOUTH_AFRICAN_UNIVERSITIES.length}
              </div>
              <div className="text-sm text-gray-600">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {totalPrograms}
              </div>
              <div className="text-sm text-gray-600">Total Programs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {SOUTH_AFRICAN_UNIVERSITIES.reduce(
                  (total, uni) => total + uni.faculties.length,
                  0,
                )}
              </div>
              <div className="text-sm text-gray-600">Total Faculties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(totalPrograms / SOUTH_AFRICAN_UNIVERSITIES.length)}
              </div>
              <div className="text-sm text-gray-600">Avg Programs/Uni</div>
            </div>
          </div>

          <Select
            value={selectedUniversityId}
            onValueChange={setSelectedUniversityId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a university to inspect" />
            </SelectTrigger>
            <SelectContent>
              {SOUTH_AFRICAN_UNIVERSITIES.map((uni) => (
                <SelectItem key={uni.id} value={uni.id}>
                  {uni.name} (
                  {uni.faculties.reduce(
                    (total, fac) => total + fac.degrees.length,
                    0,
                  )}{" "}
                  programs)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedUniversity && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedUniversity.name} - Program Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedUniversity.faculties.map((faculty, facultyIndex) => (
                <div
                  key={`${selectedUniversity.id}-${faculty.id}-${facultyIndex}`}
                  className="border rounded-lg p-4"
                >
                  <h3 className="font-semibold text-lg mb-2">
                    {faculty.name} ({faculty.degrees.length} programs)
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {faculty.description}
                  </p>

                  <div className="grid gap-2">
                    {faculty.degrees.map((degree, degreeIndex) => (
                      <div
                        key={`${selectedUniversity.id}-${faculty.id}-${degree.id}-${degreeIndex}`}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{degree.name}</div>
                          <div className="text-sm text-gray-600">
                            {degree.description}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{degree.duration}</Badge>
                          <Badge variant="outline">
                            APS: {degree.apsRequirement}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {faculty.degrees.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      No programs assigned to this faculty
                    </div>
                  )}
                </div>
              ))}

              {selectedUniversity.faculties.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No faculties found for this university
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UniversityProgramsDebug;
