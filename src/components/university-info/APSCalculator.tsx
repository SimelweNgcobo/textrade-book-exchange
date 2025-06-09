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
import {
  Calculator,
  Plus,
  Minus,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { APSSubject, APSCalculation } from "@/types/university";
import { SUBJECTS_LIST } from "@/constants/degrees";
import {
  calculateAPS,
  convertPercentageToPoints,
  validateSubjectMarks,
  getRecommendations,
} from "@/utils/apsCalculation";

interface APSCalculatorProps {
  onCalculationComplete: (calculation: APSCalculation) => void;
}

const APSCalculator = ({ onCalculationComplete }: APSCalculatorProps) => {
  const [subjects, setSubjects] = useState<APSSubject[]>([
    { name: "Mathematics", marks: 0, level: 1, points: 0 },
    { name: "English", marks: 0, level: 1, points: 0 },
  ]);

  const [showResults, setShowResults] = useState(false);

  const calculation = useMemo(() => {
    if (subjects.every((s) => s.marks > 0)) {
      return calculateAPS(subjects);
    }
    return null;
  }, [subjects]);

  const addSubject = () => {
    if (subjects.length < 7) {
      setSubjects([...subjects, { name: "", marks: 0, level: 1, points: 0 }]);
    }
  };

  const removeSubject = (index: number) => {
    if (subjects.length > 2) {
      setSubjects(subjects.filter((_, i) => i !== index));
    }
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
        subject.points = subject.level;
      }
    } else {
      (subject as any)[field] = value;
    }

    setSubjects(updatedSubjects);
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
      { name: "English", marks: 0, level: 1, points: 0 },
    ]);
    setShowResults(false);
  };

  const canCalculate =
    subjects.length >= 6 && subjects.every((s) => s.name && s.marks > 0);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-book-800 flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8" />
          APS Calculator
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your Admission Point Score (APS) to see which university
          programs you qualify for. Enter your NSC subject marks to get started.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Subject Marks</CardTitle>
          <CardDescription>
            Enter your final NSC marks for each subject (0-100%). You need at
            least 6 subjects including Mathematics and English.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Subject Input Grid */}
          <div className="space-y-3">
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
                      {SUBJECTS_LIST.filter(
                        (subj) =>
                          !subjects.some(
                            (s, i) => s.name === subj && i !== index,
                          ),
                      ).map((subjectName) => (
                        <SelectItem key={subjectName} value={subjectName}>
                          {subjectName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-24">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Mark %"
                    value={subject.marks || ""}
                    onChange={(e) =>
                      updateSubject(index, "marks", e.target.value)
                    }
                    className="text-center"
                  />
                </div>

                <div className="w-16 text-center">
                  <Badge variant={subject.level >= 4 ? "default" : "secondary"}>
                    {subject.points} pts
                  </Badge>
                </div>

                {subjects.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSubject(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Add Subject Button */}
          {subjects.length < 7 && (
            <Button
              variant="outline"
              onClick={addSubject}
              className="w-full"
              disabled={subjects.length >= 7}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Subject ({subjects.length}/7)
            </Button>
          )}

          {/* APS Information */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>APS Points System:</strong> 80-100% = 7 points, 70-79% = 6
              points, 60-69% = 5 points, 50-59% = 4 points, 40-49% = 3 points,
              30-39% = 2 points, 0-29% = 1 point
            </AlertDescription>
          </Alert>

          {/* Current Total */}
          {subjects.some((s) => s.marks > 0) && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Current APS Total:</span>
                <span className="text-2xl font-bold text-book-600">
                  {subjects.reduce((total, s) => total + s.points, 0)} points
                </span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Based on {subjects.filter((s) => s.marks > 0).length} subjects
              </div>
            </div>
          )}

          {/* Validation Messages */}
          {subjects.length < 6 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You need at least 6 subjects to calculate your APS for
                university admission. Currently you have {subjects.length}{" "}
                subjects.
              </AlertDescription>
            </Alert>
          )}

          {/* Calculate Button */}
          <div className="flex gap-3">
            <Button
              onClick={calculateResults}
              disabled={!canCalculate}
              className="flex-1 bg-book-600 hover:bg-book-700"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate APS & Find Programs
            </Button>

            {showResults && (
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {showResults && calculation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Your APS Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Final Score */}
            <div className="text-center bg-book-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-book-600 mb-2">
                {calculation.totalScore} Points
              </div>
              <div className="text-gray-600">Your Total APS Score</div>
            </div>

            {/* Subject Breakdown */}
            <div>
              <h4 className="font-semibold mb-3">Subject Breakdown:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {calculation.subjects.map((subject, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-sm">{subject.name}</div>
                    <div className="text-xs text-gray-600">
                      {subject.marks}%
                    </div>
                    <div className="font-bold text-book-600">
                      {subject.points} points
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Recommendations */}
            <div>
              <h4 className="font-semibold mb-3">Recommendations:</h4>
              <div className="space-y-2">
                {getRecommendations(calculation.totalScore).map(
                  (recommendation, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">
                        {recommendation}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default APSCalculator;
