import { useState } from "react";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  AlertCircle,
  MapPin,
  Users,
  GraduationCap,
} from "lucide-react";

const UniversityAuditReport = () => {
  const [showDetails, setShowDetails] = useState(false);

  // Official list of all 26 South African public universities for verification
  const OFFICIAL_SA_UNIVERSITIES = [
    // Traditional Universities (11)
    {
      name: "University of Cape Town",
      abbreviation: "UCT",
      id: "uct",
      type: "Traditional",
    },
    {
      name: "University of the Witwatersrand",
      abbreviation: "Wits",
      id: "wits",
      type: "Traditional",
    },
    {
      name: "Stellenbosch University",
      abbreviation: "SU",
      id: "stellenbosch",
      type: "Traditional",
    },
    {
      name: "University of Pretoria",
      abbreviation: "UP",
      id: "up",
      type: "Traditional",
    },
    {
      name: "University of KwaZulu-Natal",
      abbreviation: "UKZN",
      id: "ukzn",
      type: "Traditional",
    },
    {
      name: "Rhodes University",
      abbreviation: "RU",
      id: "ru",
      type: "Traditional",
    },
    {
      name: "North-West University",
      abbreviation: "NWU",
      id: "nwu",
      type: "Traditional",
    },
    {
      name: "University of the Free State",
      abbreviation: "UFS",
      id: "ufs",
      type: "Traditional",
    },
    {
      name: "University of the Western Cape",
      abbreviation: "UWC",
      id: "uwc",
      type: "Traditional",
    },
    {
      name: "University of Fort Hare",
      abbreviation: "UFH",
      id: "ufh",
      type: "Traditional",
    },
    {
      name: "University of Limpopo",
      abbreviation: "UL",
      id: "ul",
      type: "Traditional",
    },

    // Universities of Technology (6)
    {
      name: "Cape Peninsula University of Technology",
      abbreviation: "CPUT",
      id: "cput",
      type: "Technology",
    },
    {
      name: "Durban University of Technology",
      abbreviation: "DUT",
      id: "dut",
      type: "Technology",
    },
    {
      name: "Tshwane University of Technology",
      abbreviation: "TUT",
      id: "tut",
      type: "Technology",
    },
    {
      name: "Vaal University of Technology",
      abbreviation: "VUT",
      id: "vut",
      type: "Technology",
    },
    {
      name: "Central University of Technology",
      abbreviation: "CUT",
      id: "cut",
      type: "Technology",
    },
    {
      name: "Mangosuthu University of Technology",
      abbreviation: "MUT",
      id: "mut",
      type: "Technology",
    },

    // Comprehensive Universities (6)
    {
      name: "University of Johannesburg",
      abbreviation: "UJ",
      id: "uj",
      type: "Comprehensive",
    },
    {
      name: "University of Zululand",
      abbreviation: "UNIZULU",
      id: "unizulu",
      type: "Comprehensive",
    },
    {
      name: "Walter Sisulu University",
      abbreviation: "WSU",
      id: "wsu",
      type: "Comprehensive",
    },
    {
      name: "University of Venda",
      abbreviation: "UNIVEN",
      id: "univen",
      type: "Comprehensive",
    },
    {
      name: "University of Mpumalanga",
      abbreviation: "UMP",
      id: "ump",
      type: "Comprehensive",
    },
    {
      name: "Sol Plaatje University",
      abbreviation: "SPU",
      id: "sol",
      type: "Comprehensive",
    },

    // Specialized Universities (3)
    {
      name: "University of South Africa",
      abbreviation: "UNISA",
      id: "unisa",
      type: "Specialized",
    },
    {
      name: "Sefako Makgatho Health Sciences University",
      abbreviation: "SMU",
      id: "smu",
      type: "Specialized",
    },
  ];

  // Audit current database against official list
  const currentUniversityIds = new Set(
    SOUTH_AFRICAN_UNIVERSITIES.map((uni) => uni.id),
  );
  const missingUniversities = OFFICIAL_SA_UNIVERSITIES.filter(
    (official) => !currentUniversityIds.has(official.id),
  );
  const extraUniversities = SOUTH_AFRICAN_UNIVERSITIES.filter(
    (current) =>
      !OFFICIAL_SA_UNIVERSITIES.find((official) => official.id === current.id),
  );

  const auditStatus = {
    total: SOUTH_AFRICAN_UNIVERSITIES.length,
    expected: 26,
    missing: missingUniversities.length,
    extra: extraUniversities.length,
    isComplete:
      missingUniversities.length === 0 &&
      SOUTH_AFRICAN_UNIVERSITIES.length === 26,
  };

  // Calculate statistics
  const totalPrograms = SOUTH_AFRICAN_UNIVERSITIES.reduce(
    (total, uni) =>
      total +
      uni.faculties.reduce((facTotal, fac) => facTotal + fac.degrees.length, 0),
    0,
  );

  const totalFaculties = SOUTH_AFRICAN_UNIVERSITIES.reduce(
    (total, uni) => total + uni.faculties.length,
    0,
  );

  const universitiesByType = SOUTH_AFRICAN_UNIVERSITIES.reduce(
    (acc, uni) => {
      const type =
        OFFICIAL_SA_UNIVERSITIES.find((official) => official.id === uni.id)
          ?.type || "Unknown";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {auditStatus.isComplete ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
            South African Universities Audit Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Audit Status */}
          <Alert
            className={
              auditStatus.isComplete
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            }
          >
            <AlertDescription>
              {auditStatus.isComplete ? (
                <span className="text-green-800">
                  ✅ AUDIT COMPLETE: All 26 public universities are properly
                  loaded and configured.
                </span>
              ) : (
                <span className="text-red-800">
                  ❌ AUDIT INCOMPLETE: {auditStatus.missing} universities
                  missing, {auditStatus.extra} extra entries found.
                </span>
              )}
            </AlertDescription>
          </Alert>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {auditStatus.total}
              </div>
              <div className="text-sm text-blue-700">Universities Loaded</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {totalPrograms}
              </div>
              <div className="text-sm text-green-700">Total Programs</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {totalFaculties}
              </div>
              <div className="text-sm text-purple-700">Total Faculties</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {Object.keys(universitiesByType).length}
              </div>
              <div className="text-sm text-orange-700">University Types</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {Math.round(totalPrograms / auditStatus.total)}
              </div>
              <div className="text-sm text-gray-700">Avg Programs/Uni</div>
            </div>
          </div>

          {/* University Types Breakdown */}
          <div>
            <h3 className="font-semibold mb-3">Universities by Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(universitiesByType).map(([type, count]) => (
                <div key={type} className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold">{count}</div>
                  <div className="text-sm text-gray-600">{type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Universities Alert */}
          {missingUniversities.length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <div className="text-red-800">
                  <strong>
                    Missing Universities ({missingUniversities.length}):
                  </strong>
                  <ul className="mt-2 list-disc list-inside">
                    {missingUniversities.map((uni) => (
                      <li key={uni.id}>
                        {uni.name} ({uni.abbreviation}) - {uni.type}
                      </li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Extra Universities Alert */}
          {extraUniversities.length > 0 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription>
                <div className="text-yellow-800">
                  <strong>
                    Extra Universities ({extraUniversities.length}):
                  </strong>
                  <ul className="mt-2 list-disc list-inside">
                    {extraUniversities.map((uni) => (
                      <li key={uni.id}>
                        {uni.name} ({uni.abbreviation})
                      </li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Detailed View Toggle */}
          <Button
            onClick={() => setShowDetails(!showDetails)}
            variant="outline"
            className="w-full"
          >
            {showDetails ? "Hide" : "Show"} Detailed University List
          </Button>
        </CardContent>
      </Card>

      {/* Detailed University List */}
      {showDetails && (
        <Card>
          <CardHeader>
            <CardTitle>Complete University Database</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {SOUTH_AFRICAN_UNIVERSITIES.map((university) => {
                const officialInfo = OFFICIAL_SA_UNIVERSITIES.find(
                  (official) => official.id === university.id,
                );
                const totalPrograms = university.faculties.reduce(
                  (total, faculty) => total + faculty.degrees.length,
                  0,
                );

                return (
                  <div key={university.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {university.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {university.location}, {university.province}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {university.studentPopulation?.toLocaleString() ||
                              "N/A"}{" "}
                            students
                          </span>
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {totalPrograms} programs
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          variant={officialInfo ? "default" : "destructive"}
                        >
                          {university.abbreviation}
                        </Badge>
                        {officialInfo && (
                          <Badge variant="outline">{officialInfo.type}</Badge>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      {university.faculties.length} faculties:{" "}
                      {university.faculties.map((f) => f.name).join(", ")}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UniversityAuditReport;
