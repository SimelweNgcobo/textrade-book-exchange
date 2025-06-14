import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Calculator,
  GraduationCap,
  School,
  BookOpen,
  Check,
  X,
  Info,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  Award,
  Star,
  Clock,
  Lightbulb,
  Bookmark,
  BookmarkPlus,
  Trash2,
  Save,
  RefreshCw,
  Download,
  Share2,
  HelpCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SOUTH_AFRICAN_UNIVERSITIES,
  UNIVERSITY_YEARS,
} from "@/constants/universities";
import { toast } from "sonner";
import {
  University,
  Degree,
  APSSubject,
  EligibleDegree,
} from "@/types/university";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Default subjects for APS calculation
const DEFAULT_SUBJECTS: APSSubject[] = [
  { name: "English", marks: 0, level: 0, points: 0 },
  { name: "Mathematics", marks: 0, level: 0, points: 0 },
  { name: "Physical Sciences", marks: 0, level: 0, points: 0 },
  { name: "Life Sciences", marks: 0, level: 0, points: 0 },
  { name: "Additional Subject 1", marks: 0, level: 0, points: 0 },
  { name: "Additional Subject 2", marks: 0, level: 0, points: 0 },
  { name: "Additional Subject 3", marks: 0, level: 0, points: 0 },
];

// Subject options for dropdown
const SUBJECT_OPTIONS = [
  "English",
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "Geography",
  "History",
  "Accounting",
  "Economics",
  "Business Studies",
  "Information Technology",
  "Computer Applications Technology",
  "Consumer Studies",
  "Tourism",
  "Agricultural Sciences",
  "Life Orientation",
  "Music",
  "Visual Arts",
  "Dramatic Arts",
  "Engineering Graphics and Design",
  "Civil Technology",
  "Electrical Technology",
  "Mechanical Technology",
  "Religion Studies",
  "Second Language",
  "Third Language",
];

// APS calculation function
const calculateAPS = (marks: number): number => {
  if (marks >= 80) return 7;
  if (marks >= 70) return 6;
  if (marks >= 60) return 5;
  if (marks >= 50) return 4;
  if (marks >= 40) return 3;
  if (marks >= 30) return 2;
  if (marks >= 0) return 1;
  return 0;
};

// Check if a student is eligible for a degree based on APS and subjects
const checkEligibility = (
  totalAPS: number,
  subjects: APSSubject[],
  degree: Degree,
  university: University,
): { eligible: boolean; reasons: string[] } => {
  const reasons: string[] = [];
  let eligible = true;

  // Check total APS
  if (totalAPS < degree.apsRequirement) {
    reasons.push(
      `Your APS score (${totalAPS}) is below the required minimum (${degree.apsRequirement})`,
    );
    eligible = false;
  }

  // Check required subjects
  if (
    degree.subjects &&
    Array.isArray(degree.subjects) &&
    degree.subjects.length > 0
  ) {
    degree.subjects.forEach((subject) => {
      // Check if subject is required for this degree
      const isRequired =
        typeof subject === "string" ? false : subject.isRequired;
      const subjectName = typeof subject === "string" ? subject : subject.name;

      if (isRequired) {
        // Find the subject in student's subjects
        const studentSubject = subjects.find(
          (s) => s.name.toLowerCase() === subjectName.toLowerCase(),
        );

        // Check if student has the subject and meets minimum level
        const subjectLevel = typeof subject === "string" ? 4 : subject.level;

        if (!studentSubject) {
          reasons.push(
            `${subjectName} is required but not in your subject list`,
          );
          eligible = false;
        } else if (studentSubject.level < subjectLevel) {
          reasons.push(
            `${subjectName} requires level ${subjectLevel} but you have level ${studentSubject.level}`,
          );
          eligible = false;
        }
      }
    });
  }

  return { eligible, reasons };
};

// Find eligible degrees based on APS and subjects
const findEligibleDegrees = (
  totalAPS: number,
  subjects: APSSubject[],
  universities: University[],
  filters: {
    universityIds?: string[];
    facultyNames?: string[];
    minAPS?: number;
    maxAPS?: number;
    keywords?: string;
  },
): EligibleDegree[] => {
  const eligibleDegrees: EligibleDegree[] = [];

  // Filter universities if specified
  const filteredUniversities = filters.universityIds?.length
    ? universities.filter((uni) => filters.universityIds?.includes(uni.id))
    : universities;

  // Process each university
  filteredUniversities.forEach((university) => {
    // Ensure university has faculties array
    if (!university?.faculties || !Array.isArray(university.faculties)) {
      return;
    }

    // Process each faculty in the university
    university.faculties.forEach((faculty) => {
      // Skip faculty if faculty filter is applied and doesn't match
      if (
        filters.facultyNames?.length &&
        !filters.facultyNames.some((name) =>
          faculty.name.toLowerCase().includes(name.toLowerCase()),
        )
      ) {
        return;
      }

      // Ensure faculty has degrees array
      if (!faculty?.degrees || !Array.isArray(faculty.degrees)) {
        return;
      }

      // Process each degree in the faculty
      faculty.degrees.forEach((degree) => {
        // Skip if APS requirement is outside filter range
        if (
          (filters.minAPS !== undefined &&
            degree.apsRequirement < filters.minAPS) ||
          (filters.maxAPS !== undefined &&
            degree.apsRequirement > filters.maxAPS)
        ) {
          return;
        }

        // Skip if keyword filter is applied and doesn't match
        if (filters.keywords) {
          const keywords = filters.keywords.toLowerCase();
          const matchesKeyword =
            degree.name.toLowerCase().includes(keywords) ||
            degree.description.toLowerCase().includes(keywords) ||
            faculty.name.toLowerCase().includes(keywords);

          if (!matchesKeyword) {
            return;
          }
        }

        // Check eligibility
        const { eligible, reasons } = checkEligibility(
          totalAPS,
          subjects,
          degree,
          university,
        );

        // Calculate APS gap if not eligible
        const apsGap = eligible ? 0 : degree.apsRequirement - totalAPS;

        // Add to eligible degrees list
        eligibleDegrees.push({
          degree: {
            ...degree,
            subjects: degree.subjects || [],
          },
          university,
          meetsRequirement: eligible,
          apsGap: apsGap > 0 ? apsGap : undefined,
        });
      });
    });
  });

  return eligibleDegrees;
};

// Main component
const EnhancedAPSCalculatorV2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // State for subjects and marks
  const [subjects, setSubjects] = useLocalStorage<APSSubject[]>(
    "aps-calculator-subjects",
    DEFAULT_SUBJECTS,
  );

  // State for filters
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>(
    [],
  );
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>([]);
  const [minAPS, setMinAPS] = useState<number | undefined>(undefined);
  const [maxAPS, setMaxAPS] = useState<number | undefined>(undefined);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [showOnlyEligible, setShowOnlyEligible] = useState(false);
  const [sortBy, setSortBy] = useState<
    "name" | "university" | "aps" | "alphabetical"
  >("aps");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [savedCalculations, setSavedCalculations] = useLocalStorage<
    {
      id: string;
      name: string;
      subjects: APSSubject[];
      totalAPS: number;
      timestamp: number;
    }[]
  >("saved-aps-calculations", []);
  const [activeCalculationName, setActiveCalculationName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [includeLifeOrientation, setIncludeLifeOrientation] = useState(false);
  const [useAlternativeAPS, setUseAlternativeAPS] = useState(false);
  const [showEligibilityReasons, setShowEligibilityReasons] = useState<{
    [key: string]: boolean;
  }>({});

  // Calculate total APS
  const totalAPS = useMemo(() => {
    let total = 0;
    subjects.forEach((subject) => {
      // Skip Life Orientation if not included
      if (!includeLifeOrientation && subject.name === "Life Orientation") {
        return;
      }
      total += subject.points;
    });
    return total;
  }, [subjects, includeLifeOrientation]);

  // Get all faculties from universities
  const allFaculties = useMemo(() => {
    const faculties = new Set<string>();
    SOUTH_AFRICAN_UNIVERSITIES.forEach((university) => {
      university.faculties.forEach((faculty) => {
        faculties.add(faculty.name);
      });
    });
    return Array.from(faculties).sort();
  }, []);

  // Find eligible degrees
  const eligibleDegrees = useMemo(() => {
    return findEligibleDegrees(totalAPS, subjects, SOUTH_AFRICAN_UNIVERSITIES, {
      universityIds: selectedUniversities.length
        ? selectedUniversities
        : undefined,
      facultyNames: selectedFaculties.length ? selectedFaculties : undefined,
      minAPS,
      maxAPS,
      keywords: searchKeywords.trim() || undefined,
    });
  }, [
    totalAPS,
    subjects,
    selectedUniversities,
    selectedFaculties,
    minAPS,
    maxAPS,
    searchKeywords,
  ]);

  // Filter and sort eligible degrees
  const filteredAndSortedDegrees = useMemo(() => {
    let filtered = eligibleDegrees;

    // Filter by eligibility if option is selected
    if (showOnlyEligible) {
      filtered = filtered.filter((degree) => degree.meetsRequirement);
    }

    // Sort the degrees
    return filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.degree.name.localeCompare(b.degree.name);
          break;
        case "university":
          comparison = a.university.name.localeCompare(b.university.name);
          break;
        case "aps":
          comparison = a.degree.apsRequirement - b.degree.apsRequirement;
          break;
        case "alphabetical":
          comparison = a.degree.name.localeCompare(b.degree.name);
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [eligibleDegrees, showOnlyEligible, sortBy, sortDirection]);

  // Statistics about eligible degrees
  const eligibilityStats = useMemo(() => {
    const totalDegrees = eligibleDegrees.length;
    const eligibleCount = eligibleDegrees.filter(
      (d) => d.meetsRequirement,
    ).length;
    const eligiblePercentage = totalDegrees
      ? Math.round((eligibleCount / totalDegrees) * 100)
      : 0;

    // Group by university
    const byUniversity: Record<
      string,
      { total: number; eligible: number; percentage: number }
    > = {};

    eligibleDegrees.forEach((degree) => {
      const uniId = degree.university.id;
      if (!byUniversity[uniId]) {
        byUniversity[uniId] = { total: 0, eligible: 0, percentage: 0 };
      }
      byUniversity[uniId].total++;
      if (degree.meetsRequirement) {
        byUniversity[uniId].eligible++;
      }
    });

    // Calculate percentages
    Object.keys(byUniversity).forEach((uniId) => {
      const stats = byUniversity[uniId];
      stats.percentage = stats.total
        ? Math.round((stats.eligible / stats.total) * 100)
        : 0;
    });

    // Group by faculty
    const byFaculty: Record<
      string,
      { total: number; eligible: number; percentage: number }
    > = {};

    eligibleDegrees.forEach((degree) => {
      const faculty = degree.degree.faculty;
      if (!byFaculty[faculty]) {
        byFaculty[faculty] = { total: 0, eligible: 0, percentage: 0 };
      }
      byFaculty[faculty].total++;
      if (degree.meetsRequirement) {
        byFaculty[faculty].eligible++;
      }
    });

    // Calculate percentages
    Object.keys(byFaculty).forEach((faculty) => {
      const stats = byFaculty[faculty];
      stats.percentage = stats.total
        ? Math.round((stats.eligible / stats.total) * 100)
        : 0;
    });

    return {
      total: totalDegrees,
      eligible: eligibleCount,
      percentage: eligiblePercentage,
      byUniversity,
      byFaculty,
    };
  }, [eligibleDegrees]);

  // Handle subject change
  const handleSubjectChange = (
    index: number,
    field: keyof APSSubject,
    value: any,
  ) => {
    const updatedSubjects = [...subjects];

    if (field === "name") {
      updatedSubjects[index].name = value;
    } else if (field === "marks") {
      const marks = parseInt(value) || 0;
      updatedSubjects[index].marks = Math.min(Math.max(marks, 0), 100);
      updatedSubjects[index].level = calculateAPS(updatedSubjects[index].marks);
      updatedSubjects[index].points = updatedSubjects[index].level;
    }

    setSubjects(updatedSubjects);
  };

  // Reset calculator
  const handleReset = () => {
    setSubjects(DEFAULT_SUBJECTS);
    setSelectedUniversities([]);
    setSelectedFaculties([]);
    setMinAPS(undefined);
    setMaxAPS(undefined);
    setSearchKeywords("");
    setShowOnlyEligible(false);
    setSortBy("aps");
    setSortDirection("asc");
    setActiveCalculationName("");
    toast.success("Calculator has been reset");
  };

  // Save current calculation
  const handleSaveCalculation = () => {
    if (!activeCalculationName.trim()) {
      toast.error("Please enter a name for this calculation");
      return;
    }

    const newCalculation = {
      id: Date.now().toString(),
      name: activeCalculationName,
      subjects: [...subjects],
      totalAPS,
      timestamp: Date.now(),
    };

    setSavedCalculations([...savedCalculations, newCalculation]);
    setShowSaveDialog(false);
    toast.success(`Calculation "${activeCalculationName}" saved successfully`);
  };

  // Load a saved calculation
  const handleLoadCalculation = (calculationId: string) => {
    const calculation = savedCalculations.find((c) => c.id === calculationId);
    if (calculation) {
      setSubjects(calculation.subjects);
      setActiveCalculationName(calculation.name);
      toast.success(`Loaded calculation: ${calculation.name}`);
    }
  };

  // Delete a saved calculation
  const handleDeleteCalculation = (calculationId: string) => {
    const updatedCalculations = savedCalculations.filter(
      (c) => c.id !== calculationId,
    );
    setSavedCalculations(updatedCalculations);
    toast.success("Calculation deleted");
  };

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value as "name" | "university" | "aps" | "alphabetical");
  };

  // Toggle eligibility reasons
  const toggleEligibilityReasons = (degreeId: string) => {
    setShowEligibilityReasons((prev) => ({
      ...prev,
      [degreeId]: !prev[degreeId],
    }));
  };

  // Save calculation to database
  const saveCalculationToDatabase = async () => {
    if (!user) {
      toast.error("You must be logged in to save calculations to your account");
      return;
    }

    if (!activeCalculationName.trim()) {
      toast.error("Please enter a name for this calculation");
      return;
    }

    try {
      const { data, error } = await supabase.from("aps_calculations").insert({
        user_id: user.id,
        name: activeCalculationName,
        subjects: subjects,
        total_aps: totalAPS,
      });

      if (error) throw error;

      toast.success("Calculation saved to your account");
    } catch (error) {
      console.error("Error saving calculation:", error);
      toast.error("Failed to save calculation to your account");
    }
  };

  // Share calculation
  const shareCalculation = () => {
    // Create URL with query parameters
    const subjectsParam = encodeURIComponent(JSON.stringify(subjects));
    const shareUrl = `${window.location.origin}${window.location.pathname}?subjects=${subjectsParam}`;

    // Copy to clipboard
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success("Share link copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy share link");
      });
  };

  // Load calculation from URL on initial render
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subjectsParam = params.get("subjects");

    if (subjectsParam) {
      try {
        const loadedSubjects = JSON.parse(decodeURIComponent(subjectsParam));
        if (Array.isArray(loadedSubjects)) {
          setSubjects(loadedSubjects);
          toast.success("Loaded shared calculation");
        }
      } catch (error) {
        console.error("Error parsing subjects from URL:", error);
      }
    }
  }, [location.search, setSubjects]);

  // Sort options
  const sortOptions: Array<"name" | "university" | "aps" | "alphabetical"> = [
    "name",
    "university",
    "aps",
    "alphabetical",
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4">
          <Calculator className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Enhanced APS Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your Admission Point Score (APS) and discover which degrees
          you qualify for at South African universities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Calculator */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                APS Calculator
              </CardTitle>
              <CardDescription>
                Enter your subject marks to calculate your APS score
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subject Inputs */}
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-center"
                >
                  <div className="col-span-6">
                    <Select
                      value={subject.name}
                      onValueChange={(value) =>
                        handleSubjectChange(index, "name", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECT_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={subject.marks}
                      onChange={(e) =>
                        handleSubjectChange(index, "marks", e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-3 text-center">
                    <Badge
                      variant={subject.points > 0 ? "default" : "outline"}
                      className="w-full"
                    >
                      {subject.points}
                    </Badge>
                  </div>
                </div>
              ))}

              {/* Advanced Options */}
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="w-full flex items-center justify-between"
                >
                  <span>Advanced Options</span>
                  {showAdvancedOptions ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>

                {showAdvancedOptions && (
                  <div className="mt-4 space-y-4 p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="include-lo"
                        className="flex items-center gap-2"
                      >
                        <Info className="h-4 w-4" />
                        Include Life Orientation
                      </Label>
                      <Switch
                        id="include-lo"
                        checked={includeLifeOrientation}
                        onCheckedChange={setIncludeLifeOrientation}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="alt-aps"
                        className="flex items-center gap-2"
                      >
                        <Calculator className="h-4 w-4" />
                        Use Alternative APS Method
                      </Label>
                      <Switch
                        id="alt-aps"
                        checked={useAlternativeAPS}
                        onCheckedChange={setUseAlternativeAPS}
                      />
                    </div>

                    <Separator />

                    <div className="text-sm text-gray-500">
                      <p className="mb-2">
                        <strong>Note:</strong> Different universities may
                        calculate APS scores differently. Some include Life
                        Orientation while others don't.
                      </p>
                      <p>
                        The alternative APS method uses a different point scale
                        for some universities.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-md">
                <span className="text-lg font-semibold">Total APS Score:</span>
                <Badge
                  variant="default"
                  className="text-lg px-3 py-1 bg-blue-600"
                >
                  {totalAPS}
                </Badge>
              </div>

              <div className="w-full flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSaveDialog(true)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={shareCalculation}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                {user && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={saveCalculationToDatabase}
                  >
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Save to Account
                  </Button>
                )}
              </div>

              {/* Save Dialog */}
              {showSaveDialog && (
                <div className="w-full p-4 border rounded-md mt-4">
                  <h3 className="font-medium mb-2">Save Calculation</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="calculation-name">Name</Label>
                      <Input
                        id="calculation-name"
                        value={activeCalculationName}
                        onChange={(e) =>
                          setActiveCalculationName(e.target.value)
                        }
                        placeholder="e.g., My Grade 12 Marks"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleSaveCalculation}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSaveDialog(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Saved Calculations */}
              {savedCalculations.length > 0 && (
                <div className="w-full">
                  <h3 className="font-medium mb-2">Saved Calculations</h3>
                  <ScrollArea className="h-[150px]">
                    <div className="space-y-2">
                      {savedCalculations.map((calc) => (
                        <div
                          key={calc.id}
                          className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50"
                        >
                          <div>
                            <div className="font-medium">{calc.name}</div>
                            <div className="text-sm text-gray-500">
                              APS: {calc.totalAPS} •{" "}
                              {new Date(calc.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLoadCalculation(calc.id)}
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCalculation(calc.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </CardFooter>
          </Card>

          {/* Eligibility Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Eligibility Overview
              </CardTitle>
              <CardDescription>
                Summary of your eligibility for degrees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Total Degrees:</span>
                  <Badge variant="outline">{eligibilityStats.total}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Eligible Degrees:</span>
                  <Badge
                    variant={
                      eligibilityStats.eligible > 0 ? "default" : "outline"
                    }
                  >
                    {eligibilityStats.eligible}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Eligibility Rate:</span>
                  <Badge
                    variant={
                      eligibilityStats.percentage > 50 ? "success" : "outline"
                    }
                  >
                    {eligibilityStats.percentage}%
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Top Universities for You</h4>
                <div className="space-y-2">
                  {Object.entries(eligibilityStats.byUniversity)
                    .sort(([, a], [, b]) => b.percentage - a.percentage)
                    .slice(0, 3)
                    .map(([uniId, stats]) => {
                      const university = SOUTH_AFRICAN_UNIVERSITIES.find(
                        (u) => u.id === uniId,
                      );
                      return (
                        <div
                          key={uniId}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm truncate max-w-[180px]">
                            {university?.name || uniId}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs">
                              {stats.eligible}/{stats.total}
                            </span>
                            <Badge
                              variant={
                                stats.percentage > 50 ? "success" : "outline"
                              }
                              className="text-xs"
                            >
                              {stats.percentage}%
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Top Faculties for You</h4>
                <div className="space-y-2">
                  {Object.entries(eligibilityStats.byFaculty)
                    .sort(([, a], [, b]) => b.percentage - a.percentage)
                    .slice(0, 3)
                    .map(([faculty, stats]) => (
                      <div
                        key={faculty}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm truncate max-w-[180px]">
                          {faculty}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">
                            {stats.eligible}/{stats.total}
                          </span>
                          <Badge
                            variant={
                              stats.percentage > 50 ? "success" : "outline"
                            }
                            className="text-xs"
                          >
                            {stats.percentage}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Degree Eligibility Results
              </CardTitle>
              <CardDescription>
                Explore degrees based on your APS score and subject choices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <h3 className="font-medium">Filters</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* University Filter */}
                  <div>
                    <Label htmlFor="university-filter" className="mb-1 block">
                      Universities
                    </Label>
                    <Select
                      value={
                        selectedUniversities.length === 1
                          ? selectedUniversities[0]
                          : ""
                      }
                      onValueChange={(value) => {
                        if (value) {
                          setSelectedUniversities([value]);
                        } else {
                          setSelectedUniversities([]);
                        }
                      }}
                    >
                      <SelectTrigger id="university-filter">
                        <SelectValue placeholder="All Universities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Universities</SelectItem>
                        {SOUTH_AFRICAN_UNIVERSITIES.map((uni) => (
                          <SelectItem key={uni.id} value={uni.id}>
                            {uni.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Faculty Filter */}
                  <div>
                    <Label htmlFor="faculty-filter" className="mb-1 block">
                      Faculty
                    </Label>
                    <Select
                      value={
                        selectedFaculties.length === 1
                          ? selectedFaculties[0]
                          : ""
                      }
                      onValueChange={(value) => {
                        if (value) {
                          setSelectedFaculties([value]);
                        } else {
                          setSelectedFaculties([]);
                        }
                      }}
                    >
                      <SelectTrigger id="faculty-filter">
                        <SelectValue placeholder="All Faculties" />
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

                  {/* APS Range */}
                  <div>
                    <Label htmlFor="min-aps" className="mb-1 block">
                      Minimum APS
                    </Label>
                    <Input
                      id="min-aps"
                      type="number"
                      placeholder="Min APS"
                      value={minAPS || ""}
                      onChange={(e) => {
                        const value = e.target.value
                          ? parseInt(e.target.value)
                          : undefined;
                        setMinAPS(value);
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="max-aps" className="mb-1 block">
                      Maximum APS
                    </Label>
                    <Input
                      id="max-aps"
                      type="number"
                      placeholder="Max APS"
                      value={maxAPS || ""}
                      onChange={(e) => {
                        const value = e.target.value
                          ? parseInt(e.target.value)
                          : undefined;
                        setMaxAPS(value);
                      }}
                    />
                  </div>

                  {/* Search */}
                  <div className="md:col-span-2">
                    <Label htmlFor="search-keywords" className="mb-1 block">
                      Search
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="search-keywords"
                        placeholder="Search by degree name, description..."
                        value={searchKeywords}
                        onChange={(e) => setSearchKeywords(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="show-eligible"
                      checked={showOnlyEligible}
                      onCheckedChange={(checked) =>
                        setShowOnlyEligible(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="show-eligible"
                      className="text-sm cursor-pointer"
                    >
                      Show only eligible degrees
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="sort-by" className="text-sm">
                      Sort by:
                    </Label>
                    <Select value={sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger id="sort-by" className="h-8 w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aps">APS Requirement</SelectItem>
                        <SelectItem value="name">Degree Name</SelectItem>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="alphabetical">
                          Alphabetical
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleSortDirection}
                      className="h-8 w-8 p-0"
                    >
                      {sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Results */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>{filteredAndSortedDegrees.length} Degrees Found</span>
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedUniversities([]);
                      setSelectedFaculties([]);
                      setMinAPS(undefined);
                      setMaxAPS(undefined);
                      setSearchKeywords("");
                      setShowOnlyEligible(false);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>

                {filteredAndSortedDegrees.length === 0 ? (
                  <div className="text-center py-8">
                    <School className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No degrees found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your filters or increasing your APS score.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedUniversities([]);
                        setSelectedFaculties([]);
                        setMinAPS(undefined);
                        setMaxAPS(undefined);
                        setSearchKeywords("");
                        setShowOnlyEligible(false);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAndSortedDegrees.map((eligibleDegree) => {
                      const { degree, university, meetsRequirement, apsGap } =
                        eligibleDegree;
                      const degreeId = `${university.id}-${degree.id}`;

                      return (
                        <Card
                          key={degreeId}
                          className={cn(
                            "border overflow-hidden transition-all",
                            meetsRequirement
                              ? "border-green-200 hover:border-green-300"
                              : "border-gray-200 hover:border-gray-300",
                          )}
                        >
                          <div
                            className={cn(
                              "h-1",
                              meetsRequirement ? "bg-green-500" : "bg-gray-200",
                            )}
                          />
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant={
                                      meetsRequirement ? "success" : "outline"
                                    }
                                    className="uppercase text-xs"
                                  >
                                    {meetsRequirement
                                      ? "Eligible"
                                      : "Not Eligible"}
                                  </Badge>
                                  {apsGap && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Need +{apsGap} APS
                                    </Badge>
                                  )}
                                </div>

                                <h3 className="font-semibold text-lg">
                                  {degree.name}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <School className="h-4 w-4" />
                                  <span>{university.name}</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {degree.faculty}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {degree.duration}
                                  </Badge>
                                </div>

                                <p className="text-sm text-gray-600 mt-2">
                                  {degree.description}
                                </p>

                                {/* Career Prospects */}
                                {degree.careerProspects &&
                                  degree.careerProspects &&
                                  Array.isArray(degree.careerProspects) &&
                                  degree.careerProspects.length > 0 && (
                                    <div className="mt-2">
                                      <h4 className="text-sm font-medium mb-1">
                                        Career Prospects:
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {degree.careerProspects.map(
                                          (career, idx) => (
                                            <Badge
                                              key={idx}
                                              variant="outline"
                                              className="text-xs"
                                            >
                                              {career}
                                            </Badge>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  )}

                                {/* Eligibility Reasons */}
                                {!meetsRequirement && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      toggleEligibilityReasons(degreeId)
                                    }
                                    className="mt-2 h-auto p-0 text-blue-600 hover:text-blue-800 hover:bg-transparent"
                                  >
                                    <Info className="h-3 w-3 mr-1" />
                                    <span className="text-xs">
                                      {showEligibilityReasons[degreeId]
                                        ? "Hide eligibility details"
                                        : "Show why you don't qualify"}
                                    </span>
                                  </Button>
                                )}

                                {!meetsRequirement &&
                                  showEligibilityReasons[degreeId] && (
                                    <div className="mt-2 p-3 bg-red-50 rounded-md text-sm">
                                      <h4 className="font-medium text-red-800 mb-1">
                                        Why you don't qualify:
                                      </h4>
                                      <ul className="list-disc list-inside text-red-700 space-y-1">
                                        {apsGap && (
                                          <li>
                                            Your APS score ({totalAPS}) is{" "}
                                            {apsGap} points below the
                                            requirement ({degree.apsRequirement}
                                            )
                                          </li>
                                        )}
                                        {degree.subjects &&
                                          degree.subjects.map(
                                            (subject, idx) => {
                                              // Check if subject is required
                                              const isRequired =
                                                typeof subject === "string"
                                                  ? false
                                                  : subject.isRequired;

                                              if (!isRequired) return null;

                                              const subjectName =
                                                typeof subject === "string"
                                                  ? subject
                                                  : subject.name;

                                              const subjectLevel =
                                                typeof subject === "string"
                                                  ? 4
                                                  : subject.level;

                                              // Find if student has this subject
                                              const studentSubject =
                                                subjects.find(
                                                  (s) =>
                                                    s.name.toLowerCase() ===
                                                    subjectName.toLowerCase(),
                                                );

                                              if (!studentSubject) {
                                                return (
                                                  <li key={idx}>
                                                    Missing required subject:{" "}
                                                    {subjectName}
                                                  </li>
                                                );
                                              }

                                              if (
                                                studentSubject.level <
                                                subjectLevel
                                              ) {
                                                return (
                                                  <li key={idx}>
                                                    {subjectName} requires level{" "}
                                                    {subjectLevel} but you have
                                                    level {studentSubject.level}
                                                  </li>
                                                );
                                              }

                                              return null;
                                            },
                                          )}
                                      </ul>
                                    </div>
                                  )}
                              </div>

                              <div className="flex flex-col items-center justify-center min-w-[100px] mt-4 md:mt-0">
                                <div className="text-center">
                                  <div className="text-sm text-gray-500">
                                    APS Required
                                  </div>
                                  <div
                                    className={cn(
                                      "text-2xl font-bold",
                                      meetsRequirement
                                        ? "text-green-600"
                                        : "text-gray-700",
                                    )}
                                  >
                                    {degree.apsRequirement}
                                  </div>
                                </div>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-4"
                                  onClick={() =>
                                    navigate(
                                      `/universities/${university.id}/programs/${degree.id}`,
                                    )
                                  }
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* APS Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                About APS Calculation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How is the APS score calculated?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      The Admission Point Score (APS) is calculated based on
                      your Grade 12 (Matric) subject marks. Each subject is
                      assigned points according to the percentage achieved:
                    </p>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Percentage</TableHead>
                          <TableHead>APS Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>80-100%</TableCell>
                          <TableCell>7</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>70-79%</TableCell>
                          <TableCell>6</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>60-69%</TableCell>
                          <TableCell>5</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>50-59%</TableCell>
                          <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>40-49%</TableCell>
                          <TableCell>3</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>30-39%</TableCell>
                          <TableCell>2</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>0-29%</TableCell>
                          <TableCell>1</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Do all universities calculate APS the same way?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      No, different universities may have slightly different APS
                      calculation methods:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>
                        Some universities include Life Orientation in the
                        calculation, while others don't.
                      </li>
                      <li>
                        Some universities may give additional points for certain
                        subjects relevant to specific degrees.
                      </li>
                      <li>
                        Some may use a different point scale (e.g., out of 8 or
                        out of 10).
                      </li>
                      <li>
                        Some may only count a specific number of subjects (e.g.,
                        best 6 subjects).
                      </li>
                    </ul>
                    <p className="mt-2">
                      Always check the specific requirements for each university
                      and program you're interested in.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    What else do universities consider besides APS?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      While APS is important, universities also consider other
                      factors:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>
                        Specific subject requirements (e.g., minimum level for
                        Mathematics)
                      </li>
                      <li>
                        National Benchmark Tests (NBTs) for some universities
                      </li>
                      <li>Faculty-specific selection tests or interviews</li>
                      <li>
                        Portfolio submissions (for creative arts programs)
                      </li>
                      <li>Previous academic performance and academic record</li>
                      <li>
                        Extracurricular activities and leadership experience
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAPSCalculatorV2;
