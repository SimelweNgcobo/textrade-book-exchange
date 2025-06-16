
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  University,
  GraduationCap,
  Users,
  BookOpen,
  RefreshCw
} from "lucide-react";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities/index";

interface UniversityStats {
  id: string;
  name: string;
  abbreviation: string;
  facultyCount: number;
  programCount: number;
  status: "complete" | "needs_attention" | "minimal";
}

const UniversityProgramFixesSummary = () => {
  const [universityStats, setUniversityStats] = useState<UniversityStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalStats, setTotalStats] = useState({
    universities: 0,
    faculties: 0,
    programs: 0,
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    setIsLoading(true);
    
    try {
      const stats: UniversityStats[] = [];
      let totalFaculties = 0;
      let totalPrograms = 0;

      SOUTH_AFRICAN_UNIVERSITIES.forEach((university) => {
        const facultyCount = university.faculties?.length || 0;
        const programCount = university.faculties?.reduce(
          (total, faculty) => total + (faculty.degrees?.length || 0),
          0
        ) || 0;

        totalFaculties += facultyCount;
        totalPrograms += programCount;

        // Determine status based on program count
        let status: "complete" | "needs_attention" | "minimal";
        if (programCount >= 50) {
          status = "complete";
        } else if (programCount >= 20) {
          status = "needs_attention";
        } else {
          status = "minimal";
        }

        stats.push({
          id: university.id,
          name: university.name,
          abbreviation: university.abbreviation,
          facultyCount,
          programCount,
          status,
        });
      });

      // Sort by program count (descending)
      stats.sort((a, b) => b.programCount - a.programCount);

      setUniversityStats(stats);
      setTotalStats({
        universities: SOUTH_AFRICAN_UNIVERSITIES.length,
        faculties: totalFaculties,
        programs: totalPrograms,
      });
    } catch (error) {
      console.error("Error calculating university stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "needs_attention":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "minimal":
        return <Info className="w-4 h-4 text-blue-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
      case "needs_attention":
        return <Badge className="bg-orange-100 text-orange-800">Needs Attention</Badge>;
      case "minimal":
        return <Badge className="bg-blue-100 text-blue-800">Minimal</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const completeCount = universityStats.filter(u => u.status === "complete").length;
  const needsAttentionCount = universityStats.filter(u => u.status === "needs_attention").length;
  const minimalCount = universityStats.filter(u => u.status === "minimal").length;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          <span>Calculating university statistics...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalStats.universities}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
                <University className="w-4 h-4 mr-1" />
                Universities
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{totalStats.faculties}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
                <Users className="w-4 h-4 mr-1" />
                Faculties
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{totalStats.programs}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
                <GraduationCap className="w-4 h-4 mr-1" />
                Programs
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {Math.round(totalStats.programs / totalStats.universities)}
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
                <BookOpen className="w-4 h-4 mr-1" />
                Avg/University
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>University Program Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{completeCount}</div>
              <div className="text-sm text-green-700">Complete (50+ programs)</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{needsAttentionCount}</div>
              <div className="text-sm text-orange-700">Needs Attention (20-49 programs)</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{minimalCount}</div>
              <div className="text-sm text-blue-700">Minimal (&lt;20 programs)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed University List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>University Details</CardTitle>
            <Button variant="outline" size="sm" onClick={calculateStats}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {universityStats.map((university) => (
              <div
                key={university.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(university.status)}
                  <div>
                    <div className="font-semibold">{university.name}</div>
                    <div className="text-sm text-gray-600">{university.abbreviation}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{university.programCount} programs</div>
                    <div className="text-xs text-gray-600">{university.facultyCount} faculties</div>
                  </div>
                  {getStatusBadge(university.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>System Status:</strong> All {totalStats.universities} South African universities are loaded with a total of {totalStats.programs} programs across {totalStats.faculties} faculties. 
          The system automatically ensures comprehensive program coverage through intelligent faculty and program assignment.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UniversityProgramFixesSummary;
