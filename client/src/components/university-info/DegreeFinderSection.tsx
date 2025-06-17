
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
import { Search, BookOpen, Target, AlertCircle } from "lucide-react";
import { calculateAPS } from "@/utils/apsCalculation";
import { ALL_SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";
import { APSSubject, EligibleDegree, University, Degree } from "@/types/university";

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
];

const DegreeFinderSection: React.FC = () => {
  const [subjects, setSubjects] = useState<APSSubject[]>([]);
  const [calculation, setCalculation] = useState<{
    totalScore: number;
    eligibleDegrees: EligibleDegree[];
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [minAPS, setMinAPS] = useState<string>("");
  const [maxAPS, setMaxAPS] = useState<string>("");

  // Initialize with empty subjects
  useEffect(() => {
    const initialSubjects: APSSubject[] = Array.from({ length: 6 }, (_, index) => ({
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
    
    if (field === "marks") {
      const marks = typeof value === "number" ? value : parseInt(value as string) || 0;
      updatedSubjects[index].points = calculatePoints(marks);
      updatedSubjects[index].marks = marks;
    }
    
    setSubjects(updatedSubjects);
  };

  // Perform APS calculation
  const performCalculation = () => {
    const validSubjects = subjects.filter(subject => subject.name && subject.marks > 0);
    
    if (validSubjects.length < 6) {
      alert("Please enter at least 6 subjects with valid marks.");
      return;
    }

    const totalScore = validSubjects.reduce((total, subject) => total + subject.points, 0);
    
    // Find eligible degrees
    const eligible: EligibleDegree[] = [];
    
    ALL_SOUTH_AFRICAN_UNIVERSITIES.forEach((university: University) => {
      university.faculties.forEach((faculty) => {
        faculty.degrees.forEach((degree: Degree) => {
          const meetsRequirement = totalScore >= degree.apsRequirement;
          const apsGap = meetsRequirement ? 0 : degree.apsRequirement - totalScore;
          
          eligible.push({
            degree,
            university,
            meetsRequirement,
            apsGap,
          });
        });
      });
    });

    // Sort eligible degrees
    eligible.sort((a, b) => {
      if (a.meetsRequirement && !b.meetsRequirement) return -1;
      if (!a.meetsRequirement && b.meetsRequirement) return 1;
      return a.degree.apsRequirement - b.degree.apsRequirement;
    });

    setCalculation({
      totalScore,
      eligibleDegrees: eligible,
    });
  };

  // Filter degrees based on search criteria
  const getFilteredDegrees = () => {
    if (!calculation) return [];

    let filtered = calculation.eligibleDegrees;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.degree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.degree.faculty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedProvince) {
      filtered = filtered.filter(item =>
        item.university.province === selectedProvince
      );
    }

    if (minAPS) {
      filtered = filtered.filter(item =>
        item.degree.apsRequirement >= parseInt(minAPS)
      );
    }

    if (maxAPS) {
      filtered = filtered.filter(item =>
        item.degree.apsRequirement <= parseInt(maxAPS)
      );
    }

    return filtered;
  };

  const filteredDegrees = getFilteredDegrees();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Find Your Degree
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Enter your Grade 12 results to find degrees you qualify for.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4">
            {subjects.map((subject, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div>
                  <Label>Subject {index + 1}</Label>
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
                  <Label>Final Mark (%)</Label>
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
                    <Badge variant="secondary">{subject.points}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={performCalculation} className="w-full">
            Calculate & Find Degrees
          </Button>
        </CardContent>
      </Card>

      {calculation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Your Results - APS Score: {calculation.totalScore}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Search Degrees</Label>
                <Input
                  placeholder="Search by degree or university..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label>Province</Label>
                <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                  <SelectTrigger>
                    <SelectValue placeholder="All provinces" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Provinces</SelectItem>
                    <SelectItem value="Gauteng">Gauteng</SelectItem>
                    <SelectItem value="Western Cape">Western Cape</SelectItem>
                    <SelectItem value="KwaZulu-Natal">KwaZulu-Natal</SelectItem>
                    <SelectItem value="Eastern Cape">Eastern Cape</SelectItem>
                    <SelectItem value="Free State">Free State</SelectItem>
                    <SelectItem value="Limpopo">Limpopo</SelectItem>
                    <SelectItem value="Mpumalanga">Mpumalanga</SelectItem>
                    <SelectItem value="Northern Cape">Northern Cape</SelectItem>
                    <SelectItem value="North West">North West</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Min APS</Label>
                <Input
                  type="number"
                  placeholder="Min APS"
                  value={minAPS}
                  onChange={(e) => setMinAPS(e.target.value)}
                />
              </div>
              <div>
                <Label>Max APS</Label>
                <Input
                  type="number"
                  placeholder="Max APS"
                  value={maxAPS}
                  onChange={(e) => setMaxAPS(e.target.value)}
                />
              </div>
            </div>

            <Separator />

            {/* Results Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {calculation.eligibleDegrees.filter(d => d.meetsRequirement).length}
                </div>
                <div className="text-sm text-gray-600">Eligible Programs</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {calculation.eligibleDegrees.filter(d => !d.meetsRequirement && d.apsGap && d.apsGap <= 5).length}
                </div>
                <div className="text-sm text-gray-600">Close Programs</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {filteredDegrees.length}
                </div>
                <div className="text-sm text-gray-600">Filtered Results</div>
              </div>
            </div>

            {/* Degree List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredDegrees.slice(0, 50).map((item, index) => (
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
                        Duration: {item.degree.duration} | Province: {item.university.province}
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

            {filteredDegrees.length > 50 && (
              <div className="text-center">
                <Badge variant="outline">
                  Showing 50 of {filteredDegrees.length} programs
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DegreeFinderSection;
