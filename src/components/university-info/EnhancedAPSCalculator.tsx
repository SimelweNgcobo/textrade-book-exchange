import { useState, useMemo } from "react";
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
} from "lucide-react";
import { APSSubject, APSCalculation, EligibleDegree } from "@/types/university";
import {
  SOUTH_AFRICAN_SUBJECTS,
  SUBJECT_CATEGORIES,
  isNonContributing,
  getSubjectCategory,
} from "@/constants/subjects";
import {
  calculateAPS,
  convertPercentageToPoints,
  validateSubjectMarks,
  getRecommendations,
} from "@/utils/apsCalculation";

interface EnhancedAPSCalculatorProps {
  onCalculationComplete: (calculation: APSCalculation) => void;
}

const EnhancedAPSCalculator = ({
  onCalculationComplete,
}: EnhancedAPSCalculatorProps) => {
  const [subjects, setSubjects] = useState<APSSubject[]>([
    { name: "Mathematics", marks: 0, level: 1, points: 0 },
    { name: "English Home Language", marks: 0, level: 1, points: 0 },
    { name: "Life Orientation", marks: 0, level: 1, points: 0 }, // Permanent LO
  ]);

  const [showResults, setShowResults] = useState(false);
  const [facultyFilter, setFacultyFilter] = useState<string>("all");
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const [customSubject, setCustomSubject] = useState("");

  const calculation = useMemo(() => {
    // Filter out LO and subjects with no marks for APS calculation
    const contributingSubjects = subjects.filter(
      (s) => !isNonContributing(s.name) && s.marks > 0,
    );

    if (contributingSubjects.length >= 6) {
      return calculateAPS(contributingSubjects);
    }
    return null;
  }, [subjects]);

  // Get contributing subjects count (excluding LO)
  const contributingSubjectsCount = subjects.filter(
    (s) => !isNonContributing(s.name) && s.marks > 0,
  ).length;

  const addSubject = () => {
    if (subjects.length < 8) {
      // Allow up to 8 total (7 + LO)
      setSubjects([...subjects, { name: "", marks: 0, level: 1, points: 0 }]);
    }
  };

  const removeSubject = (index: number) => {
    const subject = subjects[index];
    // Don't allow removing LO or if it would go below minimum
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
        // LO doesn't contribute points
        subject.points = isNonContributing(subject.name) ? 0 : subject.level;
      }
    } else {
      (subject as any)[field] = value;
      // Reset points if subject name changed
      if (field === "name") {
        subject.points = isNonContributing(subject.name as string)
          ? 0
          : subject.level;
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
    setShowAllPrograms(false);
  };

  const isReadyToCalculate = contributingSubjectsCount >= 6;
  const currentAPSTotal = subjects
    .filter((s) => !isNonContributing(s.name))
    .reduce((total, s) => total + s.points, 0);

  // Filter eligible degrees by faculty
  const filteredEligibleDegrees =
    calculation?.eligibleDegrees.filter((ed) => {
      if (facultyFilter === "all") return true;
      return ed.degree.faculty
        .toLowerCase()
        .includes(facultyFilter.toLowerCase());
    }) || [];

  // Split into qualified and nearly qualified
  const qualifiedDegrees = filteredEligibleDegrees.filter(
    (ed) => ed.meetsRequirement,
  );
  const nearlyQualifiedDegrees = filteredEligibleDegrees.filter(
    (ed) => !ed.meetsRequirement && ed.apsGap && ed.apsGap <= 5,
  );

  // Group by faculty for better organization
  const groupByFaculty = (degrees: EligibleDegree[]) => {
    return degrees.reduce(
      (acc, degree) => {
        const faculty = degree.degree.faculty;
        if (!acc[faculty]) acc[faculty] = [];
        acc[faculty].push(degree);
        return acc;
      },
      {} as Record<string, EligibleDegree[]>,
    );
  };

  const groupedQualified = groupByFaculty(qualifiedDegrees);
  const groupedNearlyQualified = groupByFaculty(nearlyQualifiedDegrees);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Calculator className="h-8 w-8" />
            <div>
              <CardTitle>Enhanced APS Calculator</CardTitle>
              <CardDescription>
                Calculate your Admission Point Score with Life Orientation (LO)
                properly handled. LO is required but doesn't contribute to your
                APS score.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Indicator */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Contributing Subjects: {contributingSubjectsCount}/6 minimum
              </span>
              <span className="text-sm text-gray-600">
                Total Subjects: {subjects.length}/8 max
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((contributingSubjectsCount / 6) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Subjects Input */}
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="flex gap-3 items-center">
                <div className="flex-1">
                  <Select
                    value={subject.name}
                    onValueChange={(value) =>
                      updateSubject(index, "name", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(SUBJECT_CATEGORIES).map((category) => {
                        const categorySubjects = SOUTH_AFRICAN_SUBJECTS.filter(
                          (s) =>
                            getSubjectCategory(s) === category &&
                            !subjects.some((existing) => existing.name === s),
                        );

                        if (categorySubjects.length === 0) return null;

                        return (
                          <div key={category}>
                            <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100">
                              {category}
                            </div>
                            {categorySubjects.map((subjectName) => (
                              <SelectItem key={subjectName} value={subjectName}>
                                {subjectName}
                                {isNonContributing(subjectName) && (
                                  <Badge variant="secondary" className="ml-2">
                                    Non-contributing
                                  </Badge>
                                )}
                              </SelectItem>
                            ))}
                          </div>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-24">
                  <Input
                    type="number"
                    placeholder="Mark %"
                    min="0"
                    max="100"
                    value={subject.marks || ""}
                    onChange={(e) =>
                      updateSubject(index, "marks", e.target.value)
                    }
                  />
                </div>

                <div className="w-16 text-center">
                  <Badge variant={subject.points > 0 ? "default" : "secondary"}>
                    {subject.points} pts
                  </Badge>
                </div>

                {!isNonContributing(subject.name) && subjects.length > 3 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeSubject(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Add Subject Options */}
          <div className="flex gap-2">
            {subjects.length < 8 && (
              <Button variant="outline" onClick={addSubject}>
                <Plus className="h-4 w-4 mr-2" />
                Add Subject ({subjects.length}/8)
              </Button>
            )}
          </div>

          {/* Custom Subject Input */}
          <div className="border-t pt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add custom subject (if not in list)"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCustomSubject()}
              />
              <Button
                variant="outline"
                onClick={addCustomSubject}
                disabled={!customSubject.trim() || subjects.length >= 8}
              >
                Add Custom
              </Button>
            </div>
          </div>

          {/* Current APS Display */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                Current APS Total (excluding LO):
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {currentAPSTotal} points
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Based on {contributingSubjectsCount} contributing subjects
            </p>
          </div>

          {/* Validation Messages */}
          {contributingSubjectsCount < 6 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You need at least 6 contributing subjects (excluding Life
                Orientation) to calculate your APS for university admission.
                Currently you have {contributingSubjectsCount} contributing
                subjects.
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={calculateResults}
              disabled={!isReadyToCalculate}
              className="flex-1"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate APS & Find Programs
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>

          {/* Results Section */}
          {showResults && calculation && (
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Your APS Results</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllPrograms(!showAllPrograms)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {showAllPrograms
                      ? "Show Qualified Only"
                      : "Show All Programs"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-gray-600">Your Total APS Score</div>
                    <div className="text-3xl font-bold text-green-600">
                      {calculation.totalScore}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-gray-600">Qualified Programs</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {qualifiedDegrees.length}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-gray-600">Nearly Qualified</div>
                    <div className="text-3xl font-bold text-orange-600">
                      {nearlyQualifiedDegrees.length}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Faculty Filter */}
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filter by Faculty:</span>
                <Select value={facultyFilter} onValueChange={setFacultyFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Faculties</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="humanities">Humanities</SelectItem>
                    <SelectItem value="health">Health Sciences</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="law">Law</SelectItem>
                    <SelectItem value="information">
                      Information Technology
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Programs by Faculty */}
              <Tabs defaultValue="qualified" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="qualified"
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Qualified Programs ({qualifiedDegrees.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="nearly"
                    className="flex items-center gap-2"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Nearly Qualified ({nearlyQualifiedDegrees.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="qualified" className="space-y-4">
                  {Object.entries(groupedQualified).map(
                    ([faculty, degrees]) => (
                      <Card key={faculty}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            {faculty} ({degrees.length} programs)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-3">
                            {degrees
                              .slice(0, showAllPrograms ? undefined : 5)
                              .map((ed, index) => (
                                <div
                                  key={index}
                                  className="border rounded-lg p-3 bg-green-50"
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-semibold">
                                        {ed.degree.name}
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {ed.university.name}
                                      </p>
                                      <p className="text-sm text-gray-500 mt-1">
                                        {ed.degree.description}
                                      </p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-800">
                                      APS: {ed.degree.apsRequirement}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            {degrees.length > 5 && !showAllPrograms && (
                              <Button
                                variant="outline"
                                onClick={() => setShowAllPrograms(true)}
                              >
                                Show {degrees.length - 5} more programs
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </TabsContent>

                <TabsContent value="nearly" className="space-y-4">
                  {Object.entries(groupedNearlyQualified).map(
                    ([faculty, degrees]) => (
                      <Card key={faculty}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            {faculty} ({degrees.length} programs)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-3">
                            {degrees
                              .slice(0, showAllPrograms ? undefined : 5)
                              .map((ed, index) => (
                                <div
                                  key={index}
                                  className="border rounded-lg p-3 bg-orange-50"
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-semibold">
                                        {ed.degree.name}
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {ed.university.name}
                                      </p>
                                      <p className="text-sm text-gray-500 mt-1">
                                        {ed.degree.description}
                                      </p>
                                      {ed.apsGap && (
                                        <p className="text-sm text-orange-600 font-medium mt-1">
                                          Need {ed.apsGap} more APS points
                                        </p>
                                      )}
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className="border-orange-300 text-orange-800"
                                    >
                                      APS: {ed.degree.apsRequirement}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            {degrees.length > 5 && !showAllPrograms && (
                              <Button
                                variant="outline"
                                onClick={() => setShowAllPrograms(true)}
                              >
                                Show {degrees.length - 5} more programs
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAPSCalculator;
