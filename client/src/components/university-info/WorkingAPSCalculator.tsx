
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, Calculator, Target, TrendingUp, AlertCircle } from "lucide-react";
import { calculateAPS } from "@/utils/apsCalculation";
import { ALL_SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";
import { APSSubject, EligibleDegree, University, Degree } from "@/types/university";

// South African subjects for Grade 12
const SOUTH_AFRICAN_SUBJECTS = [
  "Mathematics",
  "Mathematical Literacy", 
  "English Home Language",
  "English First Additional Language",
  "Afrikaans Home Language",
  "Afrikaans First Additional Language",
  "Physical Sciences",
  "Life Sciences",
  "Geography",
  "History",
  "Business Studies",
  "Economics",
  "Accounting",
  "Life Orientation",
  "Information Technology",
  "Computer Applications Technology",
  "Agricultural Sciences",
  "Engineering Graphics and Design",
  "Consumer Studies",
  "Tourism",
  "Visual Arts",
  "Music",
  "Dramatic Arts",
];

const WorkingAPSCalculator: React.FC = () => {
  const [subjects, setSubjects] = useState<APSSubject[]>([]);
  const [totalAPS, setTotalAPS] = useState<number>(0);
  const [eligibleDegrees, setEligibleDegrees] = useState<EligibleDegree[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Initialize with empty subjects
  useEffect(() => {
    const initialSubjects: APSSubject[] = Array.from({ length: 7 }, (_, index) => ({
      name: "",
      marks: 0,
      level: 0,
      points: 0,
    }));
    setSubjects(initialSubjects);
  }, []);

  // Calculate points from marks
  const calculatePoints = (marks: number): number => {
    if (marks >= 80) return 7;
    if (marks >= 70) return 6; 
    if (marks >= 60) return 5;
    if (marks >= 50) return 4;
    if (marks >= 40) return 3;
    if (marks >= 30) return 2;
    return 1;
  };

  // Update subject data
  const updateSubject = (index: number, field: keyof APSSubject, value: string | number) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
    
    // Auto-calculate points when marks change
    if (field === "marks") {
      const marks = typeof value === "number" ? value : parseInt(value as string) || 0;
      updatedSubjects[index].points = calculatePoints(marks);
      updatedSubjects[index].marks = marks;
    }
    
    setSubjects(updatedSubjects);
  };

  // Calculate APS and find eligible degrees
  const performCalculation = async () => {
    setIsCalculating(true);
    
    try {
      // Filter out empty subjects
      const validSubjects = subjects.filter(subject => subject.name && subject.marks > 0);
      
      if (validSubjects.length < 6) {
        alert("Please enter at least 6 subjects with valid marks.");
        setIsCalculating(false);
        return;
      }

      // Calculate total APS
      const apsTotal = validSubjects.reduce((total, subject) => total + subject.points, 0);
      setTotalAPS(apsTotal);

      // Find eligible degrees
      const eligible: EligibleDegree[] = [];
      
      ALL_SOUTH_AFRICAN_UNIVERSITIES.forEach((university: University) => {
        university.faculties.forEach((faculty) => {
          faculty.degrees.forEach((degree: Degree) => {
            const meetsRequirement = apsTotal >= degree.apsRequirement;
            const apsGap = meetsRequirement ? 0 : degree.apsRequirement - apsTotal;
            
            eligible.push({
              degree,
              university,
              meetsRequirement,
              apsGap,
            });
          });
        });
      });

      // Sort by APS requirement (ascending) and whether they meet the requirement
      eligible.sort((a, b) => {
        if (a.meetsRequirement && !b.meetsRequirement) return -1;
        if (!a.meetsRequirement && b.meetsRequirement) return 1;
        return a.degree.apsRequirement - b.degree.apsRequirement;
      });

      setEligibleDegrees(eligible);
      setShowResults(true);
    } catch (error) {
      console.error("Error calculating APS:", error);
      alert("An error occurred during calculation. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  // Reset calculator
  const resetCalculator = () => {
    const emptySubjects: APSSubject[] = Array.from({ length: 7 }, () => ({
      name: "",
      marks: 0,
      level: 0,
      points: 0,
    }));
    setSubjects(emptySubjects);
    setTotalAPS(0);
    setEligibleDegrees([]);
    setShowResults(false);
  };

  // Get APS category
  const getAPSCategory = (score: number): { label: string; color: string } => {
    if (score >= 40) return { label: "Excellent", color: "bg-green-500" };
    if (score >= 35) return { label: "Very Good", color: "bg-blue-500" };
    if (score >= 30) return { label: "Good", color: "bg-yellow-500" };
    if (score >= 25) return { label: "Satisfactory", color: "bg-orange-500" };
    if (score >= 20) return { label: "Basic", color: "bg-red-500" };
    return { label: "Below Minimum", color: "bg-gray-500" };
  };

  const apsCategory = getAPSCategory(totalAPS);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            APS Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Enter your Grade 12 final results for at least 6 subjects. The calculator will automatically convert your marks to APS points.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4">
            {subjects.map((subject, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div>
                  <Label htmlFor={`subject-${index}`}>Subject {index + 1}</Label>
                  <Select
                    value={subject.name}
                    onValueChange={(value) => updateSubject(index, "name", value)}
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

                <div>
                  <Label htmlFor={`marks-${index}`}>Final Mark (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={subject.marks || ""}
                    onChange={(e) => updateSubject(index, "marks", parseInt(e.target.value) || 0)}
                    placeholder="0-100"
                  />
                </div>

                <div>
                  <Label>APS Points</Label>
                  <div className="flex items-center h-10 px-3 border rounded-md bg-gray-50">
                    <Badge variant="secondary" className="text-sm">
                      {subject.points}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label>Status</Label>
                  <div className="flex items-center h-10">
                    {subject.name && subject.marks > 0 ? (
                      <Badge variant="default" className="text-xs">
                        Complete
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Incomplete
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="text-lg font-semibold">
                Total APS Score: {totalAPS}
              </div>
              {totalAPS > 0 && (
                <Badge className={`${apsCategory.color} text-white`}>
                  {apsCategory.label}
                </Badge>
              )}
            </div>
            
            <div className="space-x-2">
              <Button onClick={resetCalculator} variant="outline">
                Reset
              </Button>
              <Button 
                onClick={performCalculation} 
                disabled={isCalculating}
                className="min-w-[120px]"
              >
                {isCalculating ? "Calculating..." : "Calculate APS"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Your Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{totalAPS}</div>
                  <div className="text-sm text-gray-600">Total APS Score</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {eligibleDegrees.filter(d => d.meetsRequirement).length}
                  </div>
                  <div className="text-sm text-gray-600">Eligible Programs</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {eligibleDegrees.filter(d => !d.meetsRequirement && d.apsGap && d.apsGap <= 5).length}
                  </div>
                  <div className="text-sm text-gray-600">Close Programs</div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Available Programs
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {eligibleDegrees.slice(0, 20).map((item, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg ${
                        item.meetsRequirement
                          ? "border-green-200 bg-green-50"
                          : "border-orange-200 bg-orange-50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium">{item.degree.name}</div>
                          <div className="text-sm text-gray-600">
                            {item.university.name} - {item.degree.faculty}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Duration: {item.degree.duration}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={item.meetsRequirement ? "default" : "secondary"}
                            className="mb-1"
                          >
                            APS: {item.degree.apsRequirement}
                          </Badge>
                          {!item.meetsRequirement && item.apsGap && (
                            <div className="text-xs text-red-600">
                              Need {item.apsGap} more points
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {eligibleDegrees.length > 20 && (
                  <div className="text-center mt-4">
                    <Badge variant="outline">
                      Showing 20 of {eligibleDegrees.length} programs
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkingAPSCalculator;
