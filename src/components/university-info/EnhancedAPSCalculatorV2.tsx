
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  Plus,
  Trash2,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  University,
  GraduationCap,
  Star,
  ExternalLink,
} from "lucide-react";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities/index";
import { SOUTH_AFRICAN_SUBJECTS } from "@/constants/subjects";
import { calculateAPS, convertPercentageToPoints } from "@/utils/apsCalculation";
import { APSCalculation, APSSubject } from "@/types/university";

interface EnhancedAPSCalculatorV2Props {
  onCalculationComplete: (calculation: APSCalculation) => void;
  selectedUniversityId?: string;
}

interface SubjectEntry {
  id: string;
  name: string;
  marks: number;
  level: number;
  points: number;
}

const EnhancedAPSCalculatorV2 = ({
  onCalculationComplete,
  selectedUniversityId,
}: EnhancedAPSCalculatorV2Props) => {
  const [subjects, setSubjects] = useState<SubjectEntry[]>([
    {
      id: "1",
      name: "English Home Language",
      marks: 0,
      level: 0,
      points: 0,
    },
    {
      id: "2",
      name: "Mathematics",
      marks: 0,
      level: 0,
      points: 0,
    },
  ]);

  const [calculation, setCalculation] = useState<APSCalculation | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [filterUniversity, setFilterUniversity] = useState<string>("");
  const [filterFaculty, setFilterFaculty] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "university" | "aps">("aps");
  const [showFilters, setShowFilters] = useState(false);

  // Calculate APS when subjects change
  useEffect(() => {
    if (subjects.length > 0 && subjects.some(s => s.marks > 0)) {
      const apsSubjects: APSSubject[] = subjects.map(subject => ({
        name: subject.name,
        marks: subject.marks,
        level: subject.level,
        points: subject.points,
      }));

      const newCalculation = calculateAPS(apsSubjects);
      setCalculation(newCalculation);
      onCalculationComplete(newCalculation);
    }
  }, [subjects, onCalculationComplete]);

  const addSubject = () => {
    const newSubject: SubjectEntry = {
      id: Date.now().toString(),
      name: "",
      marks: 0,
      level: 0,
      points: 0,
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((s) => s.id !== id));
    }
  };

  const updateSubject = (id: string, field: keyof SubjectEntry, value: string | number) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === id) {
        const updated = { ...subject, [field]: value };
        
        if (field === 'marks') {
          const marks = Number(value);
          updated.level = convertPercentageToPoints(marks);
          updated.points = updated.level;
        }
        
        return updated;
      }
      return subject;
    }));
  };

  const calculateTotal = () => {
    const validSubjects = subjects.filter(s => s.name && s.marks > 0);
    if (validSubjects.length === 0) return;

    const apsSubjects: APSSubject[] = validSubjects.map(subject => ({
      name: subject.name,
      marks: subject.marks,
      level: subject.level,
      points: subject.points,
    }));

    const newCalculation = calculateAPS(apsSubjects);
    setCalculation(newCalculation);
    setShowResults(true);
    onCalculationComplete(newCalculation);
  };

  // Get available faculties from all universities
  const allFaculties = useMemo(() => {
    const facultySet = new Set<string>();
    SOUTH_AFRICAN_UNIVERSITIES.forEach(uni => {
      uni.faculties.forEach(faculty => {
        facultySet.add(faculty.name);
      });
    });
    return Array.from(facultySet).sort();
  }, []);

  // Filter and sort eligible degrees
  const filteredDegrees = useMemo(() => {
    if (!calculation?.eligibleDegrees) return [];

    let filtered = calculation.eligibleDegrees.filter(eligible => {
      // University filter
      if (filterUniversity && eligible.university.id !== filterUniversity) {
        return false;
      }

      // Faculty filter
      if (filterFaculty && eligible.degree.faculty !== filterFaculty) {
        return false;
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          eligible.degree.name.toLowerCase().includes(query) ||
          eligible.university.name.toLowerCase().includes(query) ||
          eligible.degree.faculty.toLowerCase().includes(query)
        );
      }

      return true;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.degree.name.localeCompare(b.degree.name);
        case "university":
          return a.university.name.localeCompare(b.university.name);
        case "aps":
        default:
          if (a.meetsRequirement && !b.meetsRequirement) return -1;
          if (!a.meetsRequirement && b.meetsRequirement) return 1;
          return a.degree.apsRequirement - b.degree.apsRequirement;
      }
    });

    return filtered;
  }, [calculation, filterUniversity, filterFaculty, searchQuery, sortBy]);

  const totalAPS = subjects.reduce((sum, subject) => sum + subject.points, 0);
  const eligibleCount = calculation?.eligibleDegrees?.filter(d => d.meetsRequirement).length || 0;

  return (
    <div className="space-y-6">
      {/* Calculator Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            <span>APS Calculator</span>
            {totalAPS > 0 && (
              <Badge variant="secondary" className="ml-auto">
                Total: {totalAPS} points
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {subjects.map((subject, index) => (
            <div key={subject.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Subject {index + 1}</Label>
                <Select
                  value={subject.name}
                  onValueChange={(value) => updateSubject(subject.id, 'name', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {SOUTH_AFRICAN_SUBJECTS.map((subjectName) => (
                      <SelectItem key={subjectName} value={subjectName}>
                        {subjectName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Marks (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={subject.marks || ""}
                  onChange={(e) => updateSubject(subject.id, 'marks', Number(e.target.value))}
                  placeholder="Enter marks"
                />
              </div>

              <div className="space-y-2">
                <Label>Level</Label>
                <div className="flex items-center h-10 px-3 border rounded-md bg-gray-50">
                  {subject.level}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Points</Label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center h-10 px-3 border rounded-md bg-gray-50">
                    {subject.points}
                  </div>
                  {subjects.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSubject(subject.id)}
                      className="ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={addSubject} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Subject</span>
            </Button>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Total APS Score</div>
                <div className="text-2xl font-bold text-blue-600">{totalAPS}</div>
              </div>
              <Button onClick={calculateTotal} disabled={totalAPS === 0}>
                Calculate Results
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {showResults && calculation && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{calculation.totalScore}</div>
                  <div className="text-sm text-gray-600">Your APS Score</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{eligibleCount}</div>
                  <div className="text-sm text-gray-600">Eligible Programs</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {calculation.eligibleDegrees?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Total Programs</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Program Results</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>

            {showFilters && (
              <CardContent className="border-t">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Search Programs</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search degrees, universities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>University</Label>
                    <Select value={filterUniversity} onValueChange={setFilterUniversity}>
                      <SelectTrigger>
                        <SelectValue placeholder="All universities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Universities</SelectItem>
                        {SOUTH_AFRICAN_UNIVERSITIES.map((uni) => (
                          <SelectItem key={uni.id} value={uni.id}>
                            {uni.abbreviation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Faculty</Label>
                    <Select value={filterFaculty} onValueChange={setFilterFaculty}>
                      <SelectTrigger>
                        <SelectValue placeholder="All faculties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Faculties</SelectItem>
                        {allFaculties.map((faculty) => (
                          <SelectItem key={faculty} value={faculty}>
                            {faculty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Sort By</Label>
                    <Select value={sortBy} onValueChange={(value: "name" | "university" | "aps") => setSortBy(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aps">APS Requirement</SelectItem>
                        <SelectItem value="name">Program Name</SelectItem>
                        <SelectItem value="university">University</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Results List */}
          {filteredDegrees.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {filteredDegrees.length} Programs Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDegrees.slice(0, 20).map((eligible, index) => (
                    <div
                      key={`${eligible.university.id}-${eligible.degree.id}`}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">{eligible.degree.name}</h3>
                            {eligible.meetsRequirement ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Eligible
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-red-100 text-red-800">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Need {eligible.apsGap} more points
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center">
                              <University className="w-4 h-4 mr-1" />
                              {eligible.university.abbreviation}
                            </span>
                            <span className="flex items-center">
                              <GraduationCap className="w-4 h-4 mr-1" />
                              {eligible.degree.faculty}
                            </span>
                            <span>{eligible.degree.duration}</span>
                            <span className="font-medium text-blue-600">
                              APS: {eligible.degree.apsRequirement}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">{eligible.degree.description}</p>

                          {eligible.degree.careerProspects.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {eligible.degree.careerProspects.slice(0, 4).map((career, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {career}
                                </Badge>
                              ))}
                              {eligible.degree.careerProspects.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{eligible.degree.careerProspects.length - 4} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {index < filteredDegrees.slice(0, 20).length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}

                  {filteredDegrees.length > 20 && (
                    <div className="text-center pt-4">
                      <p className="text-gray-600 mb-4">
                        Showing top 20 of {filteredDegrees.length} results
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Programs Found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search criteria to find more programs.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedAPSCalculatorV2;
