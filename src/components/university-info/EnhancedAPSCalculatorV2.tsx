import { useState, useMemo, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  Plus,
  Minus,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  Filter,
  Eye,
  Users,
  Star,
  School,
  University as UniversityIcon,
  GraduationCap,
  MapPin,
} from "lucide-react";
import {
  APSSubject,
  APSCalculation,
  EligibleDegree,
  University,
  Degree,
} from "@/types/university";
import {
  SOUTH_AFRICAN_SUBJECTS,
  SUBJECT_CATEGORIES,
  isNonContributing,
  getSubjectCategory,
  isLanguageSubject,
} from "@/constants/subjects";
import { ALL_SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";
import {
  calculateAPS,
  convertPercentageToPoints,
  validateSubjectMarks,
  getRecommendations,
} from "@/utils/apsCalculation";
import { getUniversityType } from "@/constants/universities/university-specific-programs";

interface EnhancedAPSCalculatorV2Props {
  onCalculationComplete: (calculation: APSCalculation) => void;
  selectedUniversityId?: string; // Optional - if provided, focus on this university
}

const EnhancedAPSCalculatorV2 = ({
  onCalculationComplete,
  selectedUniversityId,
}: EnhancedAPSCalculatorV2Props) => {
  const [subjects, setSubjects] = useState<APSSubject[]>([
    { name: "Mathematics", marks: 0, level: 1, points: 0 },
    { name: "English Home Language", marks: 0, level: 1, points: 0 },
    { name: "Life Orientation", marks: 0, level: 1, points: 0 }, // Permanent LO
  ]);

  const [showResults, setShowResults] = useState(false);
  const [facultyFilter, setFacultyFilter] = useState<string>("all");
  const [universityFilter, setUniversityFilter] = useState<string>(
    selectedUniversityId || "all",
  );
  const [qualificationFilter, setQualificationFilter] =
    useState<string>("qualify"); // all, qualify, close
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const [customSubject, setCustomSubject] = useState("");
  const [sortBy, setSortBy] = useState<"aps" | "name" | "university">("aps");

  // Create calculation with real university data and filtering
  const calculation = useMemo(() => {
    const contributingSubjects = subjects.filter(
      (s) => !isNonContributing(s.name) && s.marks > 0,
    );

    // Require at least 6 contributing subjects for a valid calculation
    if (contributingSubjects.length >= 6) {
      const totalScore = contributingSubjects.reduce(
        (total, subject) => total + subject.points,
        0,
      );

      // Get all degrees from all universities with filtering
      const eligibleDegrees: EligibleDegree[] = [];

      ALL_SOUTH_AFRICAN_UNIVERSITIES.forEach((university) => {
        // Skip if university filter is active and doesn't match
        if (universityFilter !== "all" && university.id !== universityFilter) {
          return;
        }

        // Ensure university has faculties
        if (!university.faculties || university.faculties.length === 0) {
          console.warn(`University ${university.name} has no faculties`);
          return;
        }

        university.faculties.forEach((faculty) => {
          // Skip if faculty filter is active and doesn't match
          if (
            facultyFilter !== "all" &&
            !faculty.name.toLowerCase().includes(facultyFilter.toLowerCase())
          ) {
            return;
          }

          // Ensure faculty has degrees
          if (!faculty.degrees || faculty.degrees.length === 0) {
            return;
          }

          faculty.degrees.forEach((degree) => {
            // Validate degree has required properties
            if (
              !degree.id ||
              !degree.name ||
              typeof degree.apsRequirement !== "number"
            ) {
              console.warn(`Invalid degree data:`, degree);
              return;
            }

            // Check APS requirement
            const meetsAPSRequirement = totalScore >= degree.apsRequirement;
            const apsGap = meetsAPSRequirement
              ? 0
              : degree.apsRequirement - totalScore;

            // Check subject requirements
            const meetsSubjectRequirements = checkSubjectRequirements(
              degree,
              contributingSubjects,
            );

            // Overall qualification check (both APS and subjects)
            const meetsRequirement =
              meetsAPSRequirement && meetsSubjectRequirements;

            // Apply qualification filter
            if (qualificationFilter === "qualify" && !meetsRequirement) {
              return;
            }

            eligibleDegrees.push({
              degree,
              university,
              meetsRequirement,
              apsGap: apsGap > 0 ? apsGap : undefined,
            });
          });
        });
      });

      // Sort based on selected criteria
      eligibleDegrees.sort((a, b) => {
        if (sortBy === "aps") {
          if (a.meetsRequirement && !b.meetsRequirement) return -1;
          if (!a.meetsRequirement && b.meetsRequirement) return 1;
          return a.degree.apsRequirement - b.degree.apsRequirement;
        } else if (sortBy === "name") {
          return a.degree.name.localeCompare(b.degree.name);
        } else if (sortBy === "university") {
          return a.university.name.localeCompare(b.university.name);
        }
        return 0;
      });

      // Debug information in development
      if (import.meta.env.DEV) {
        console.log(`APS Calculator Debug:`, {
          totalScore,
          contributingSubjects: contributingSubjects.length,
          universitiesProcessed: ALL_SOUTH_AFRICAN_UNIVERSITIES.length,
          totalPrograms: eligibleDegrees.length,
          qualifyingPrograms: eligibleDegrees.filter((d) => d.meetsRequirement)
            .length,
        });
      }

      return {
        subjects: contributingSubjects,
        totalScore,
        eligibleDegrees,
      };
    }
    return null;
  }, [subjects, facultyFilter, universityFilter, qualificationFilter, sortBy]);

  // Get unique universities and faculties for filters
  const availableUniversities = useMemo(() => {
    return ALL_SOUTH_AFRICAN_UNIVERSITIES.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, []);

  const availableFaculties = useMemo(() => {
    const faculties = new Set<string>();
    ALL_SOUTH_AFRICAN_UNIVERSITIES.forEach((uni) => {
      uni.faculties.forEach((faculty) => {
        faculties.add(faculty.name);
      });
    });
    return Array.from(faculties).sort();
  }, []);

  // Statistics for the results
  const stats = useMemo(() => {
    if (!calculation) return null;

    const total = calculation.eligibleDegrees.length;
    const qualifying = calculation.eligibleDegrees.filter(
      (d) => d.meetsRequirement,
    ).length;
    const universities = new Set(
      calculation.eligibleDegrees.map((d) => d.university.id),
    ).size;

    return { total, qualifying, universities };
  }, [calculation]);

  // Get contributing subjects count (excluding LO)
  const contributingSubjectsCount = subjects.filter(
    (s) => !isNonContributing(s.name) && s.marks > 0,
  ).length;

  // Error handling for university data
  const hasValidUniversityData =
    ALL_SOUTH_AFRICAN_UNIVERSITIES && ALL_SOUTH_AFRICAN_UNIVERSITIES.length > 0;

  // Check if user meets subject requirements for a degree
  const checkSubjectRequirements = (
    degree: any,
    userSubjects: APSSubject[],
  ): boolean => {
    if (!degree.subjects || degree.subjects.length === 0) {
      return true; // No specific requirements
    }

    // Map user subjects to standardized names for comparison
    const userSubjectMap = new Map();
    userSubjects.forEach((subject) => {
      const normalizedName = normalizeSubjectName(subject.name);
      userSubjectMap.set(normalizedName, subject);
    });

    // Check each required subject
    for (const requiredSubject of degree.subjects) {
      if (requiredSubject.isRequired) {
        const normalizedRequired = normalizeSubjectName(requiredSubject.name);
        const userSubject = userSubjectMap.get(normalizedRequired);

        if (!userSubject) {
          // User doesn't have this required subject
          return false;
        }

        if (userSubject.level < requiredSubject.level) {
          // User's level is too low for this subject
          return false;
        }
      }
    }

    return true;
  };

  // Normalize subject names for comparison
  const normalizeSubjectName = (name: string): string => {
    const normalized = name.toLowerCase().trim();

    // Handle common variations
    const subjectMappings: { [key: string]: string } = {
      mathematics: "mathematics",
      maths: "mathematics",
      "mathematical literacy": "mathematical literacy",
      "math lit": "mathematical literacy",
      "physical sciences": "physical sciences",
      physics: "physical sciences",
      "life sciences": "life sciences",
      biology: "life sciences",
      "english home language": "english",
      "english first additional language": "english",
      english: "english",
      accounting: "accounting",
      "information technology": "information technology",
      "computer applications technology": "information technology",
      it: "information technology",
    };

    return subjectMappings[normalized] || normalized;
  };

  const addSubject = () => {
    if (subjects.length < 8) {
      setSubjects([...subjects, { name: "", marks: 0, level: 1, points: 0 }]);
    }
  };

  const removeSubject = (index: number) => {
    const subject = subjects[index];
    if (subject.name === "Life Orientation" || subjects.length <= 3) {
      return;
    }
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (
    index: number,
    field: keyof APSSubject,
    value: string | number,
  ) => {
    const updatedSubjects = [...subjects];
    const subject = updatedSubjects[index];

    if (field === "marks") {
      const marks = typeof value === "string" ? parseInt(value) || 0 : value;
      if (validateSubjectMarks(marks)) {
        subject.marks = marks;
        subject.level = convertPercentageToPoints(marks);
        subject.points = isNonContributing(subject.name) ? 0 : subject.level;
      }
    } else {
      if (field === "name") {
        subject.name = value as string;
        subject.points = isNonContributing(subject.name) ? 0 : subject.level;
      } else if (field === "level") {
        subject.level = value as number;
        subject.points = isNonContributing(subject.name) ? 0 : subject.level;
      }
    }

    setSubjects(updatedSubjects);
  };

  const addCustomSubject = () => {
    if (customSubject.trim() && subjects.length < 8) {
      setSubjects([
        ...subjects,
        {
          name: customSubject.trim(),
          marks: 0,
          level: 1,
          points: 0,
        },
      ]);
      setCustomSubject("");
    }
  };

  const calculateResults = () => {
    if (calculation) {
      setShowResults(true);
      onCalculationComplete(calculation);
    }
  };

  const resetCalculator = () => {
    setSubjects([
      { name: "Mathematics", marks: 0, level: 1, points: 0 },
      { name: "English Home Language", marks: 0, level: 1, points: 0 },
      { name: "Life Orientation", marks: 0, level: 1, points: 0 },
    ]);
    setShowResults(false);
    setFacultyFilter("all");
    setUniversityFilter(selectedUniversityId || "all");
    setQualificationFilter("all");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Enhanced APS Calculator
          </CardTitle>
          <CardDescription>
            Calculate your APS score and find qualifying programs with advanced
            filtering
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Subject Input Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Subjects</h3>
            <div className="grid gap-4">
              {subjects.map((subject, index) => (
                <div
                  key={`subject-${index}-${subject.name}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-2 border rounded-lg"
                >
                  <div className="flex-1 w-full">
                    <Select
                      value={subject.name}
                      onValueChange={(value) =>
                        updateSubject(index, "name", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {SOUTH_AFRICAN_SUBJECTS.filter(
                          (s) =>
                            !subjects.some(
                              (sub, i) => i !== index && sub.name === s,
                            ),
                        )
                          .sort((a, b) => a.localeCompare(b))
                          .map((subj, subjIndex) => (
                            <SelectItem
                              key={`subject-option-${index}-${subjIndex}-${subj}`}
                              value={subj}
                            >
                              {subj} {isLanguageSubject(subj) && "(Language)"}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="flex-1 sm:w-24">
                      <Input
                        type="number"
                        placeholder="Mark %"
                        min="0"
                        max="100"
                        value={subject.marks || ""}
                        onChange={(e) =>
                          updateSubject(
                            index,
                            "marks",
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={subject.points > 0 ? "default" : "secondary"}
                        className="min-w-[3rem] justify-center"
                      >
                        {subject.points}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeSubject(index)}
                        disabled={
                          subject.name === "Life Orientation" ||
                          subjects.length <= 3
                        }
                        className="shrink-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Custom Subject */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Add custom subject..."
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCustomSubject()}
                className="flex-1"
              />
              <div className="flex gap-2">
                <Button
                  onClick={addCustomSubject}
                  disabled={!customSubject.trim()}
                  className="flex-1 sm:flex-none"
                >
                  Add Custom
                </Button>
                <Button
                  onClick={addSubject}
                  disabled={subjects.length >= 8}
                  className="flex-1 sm:flex-none"
                >
                  <Plus className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Add Subject</span>
                </Button>
              </div>
            </div>

            {/* Status and Calculate */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Contributing subjects: {contributingSubjectsCount}/7
                {calculation && (
                  <span className="ml-4 font-semibold">
                    Total APS: {calculation.totalScore}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={resetCalculator} variant="outline">
                  Reset
                </Button>
                <Button
                  onClick={calculateResults}
                  disabled={
                    contributingSubjectsCount < 6 || !hasValidUniversityData
                  }
                  className={
                    contributingSubjectsCount >= 6 && hasValidUniversityData
                      ? "bg-green-600 hover:bg-green-700"
                      : ""
                  }
                >
                  Calculate APS
                </Button>
              </div>
            </div>

            {/* Validation Messages */}
            {contributingSubjectsCount < 6 && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  You need at least 6 contributing subjects (excluding Life
                  Orientation) to calculate your APS score. Add more subjects to
                  continue.
                </AlertDescription>
              </Alert>
            )}

            {!hasValidUniversityData && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Data Loading Issue:</strong> University data is not
                  available. Please refresh the page or contact support if the
                  issue persists.
                </AlertDescription>
              </Alert>
            )}

            {calculation && calculation.totalScore < 20 && showResults && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Low APS Score:</strong> Your APS score of{" "}
                  {calculation.totalScore} may limit university options.
                  Consider improving your marks or exploring bridging courses
                  and TVET college programs.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Results Section */}
          {showResults && calculation && (
            <div className="space-y-6">
              <Separator />

              {/* Statistics */}
              {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {stats.qualifying}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Qualifying Programs
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {calculation.totalScore}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Your APS Score
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {stats.total}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Programs
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {stats.universities}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Universities
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Filters */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">
                  Filter Results
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Select
                    value={universityFilter}
                    onValueChange={setUniversityFilter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by University" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="filter-university-all" value="all">
                        All Universities
                      </SelectItem>
                      {availableUniversities.map((uni) => (
                        <SelectItem
                          key={`filter-university-${uni.id}`}
                          value={uni.id}
                        >
                          {uni.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={facultyFilter}
                    onValueChange={setFacultyFilter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by Faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="filter-faculty-all" value="all">
                        All Faculties
                      </SelectItem>
                      {availableFaculties.map((faculty, index) => (
                        <SelectItem
                          key={`filter-faculty-${index}-${faculty.replace(/\s+/g, "-").toLowerCase()}`}
                          value={faculty}
                        >
                          {faculty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={qualificationFilter}
                    onValueChange={setQualificationFilter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Qualification Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="filter-qualification-all" value="all">
                        All Programs
                      </SelectItem>
                      <SelectItem
                        key="filter-qualification-qualify"
                        value="qualify"
                      >
                        I Qualify
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={sortBy}
                    onValueChange={(value: string) =>
                      setSortBy(value as "aps" | "alphabetical")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="filter-sort-aps" value="aps">
                        APS Requirement
                      </SelectItem>
                      <SelectItem key="filter-sort-name" value="name">
                        Program Name
                      </SelectItem>
                      <SelectItem
                        key="filter-sort-university"
                        value="university"
                      >
                        University
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Matching Programs ({calculation.eligibleDegrees.length})
                </h3>

                {calculation.eligibleDegrees.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p>
                          <strong>
                            No qualifying programs found with your current APS
                            score and filters.
                          </strong>
                        </p>
                        <p>Try these adjustments:</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>
                            Change qualification filter to "All Programs" to see
                            all available options
                          </li>
                          <li>Select "All Universities" and "All Faculties"</li>
                          <li>
                            Consider improving your subject marks to increase
                            your APS score
                          </li>
                          <li>
                            Look into diploma and certificate programs with
                            lower APS requirements
                          </li>
                        </ul>
                      </div>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="grid gap-4">
                    {calculation.eligibleDegrees
                      .slice(0, showAllPrograms ? undefined : 10)
                      .map((item, index) => (
                        <Card
                          key={`${item.university.id}-${item.degree.id}`}
                          className="relative"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold">
                                    {item.degree.name}
                                  </h4>
                                  {item.meetsRequirement ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                                  )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <UniversityIcon className="h-4 w-4" />
                                    {item.university.name}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <GraduationCap className="h-4 w-4" />
                                    {item.degree.faculty}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {item.university.location}
                                  </div>
                                </div>
                                <p className="text-sm">
                                  {item.degree.description}
                                </p>
                              </div>
                              <div className="text-right space-y-1">
                                <div className="text-lg font-bold">
                                  APS {item.degree.apsRequirement}
                                </div>
                                {item.apsGap && (
                                  <div className="text-sm text-yellow-600">
                                    Need {item.apsGap} more
                                  </div>
                                )}
                                <div className="text-sm text-muted-foreground">
                                  {item.degree.duration}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}

                {calculation.eligibleDegrees.length > 10 &&
                  !showAllPrograms && (
                    <Button
                      variant="outline"
                      onClick={() => setShowAllPrograms(true)}
                      className="w-full"
                    >
                      Show All {calculation.eligibleDegrees.length} Programs
                    </Button>
                  )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAPSCalculatorV2;
