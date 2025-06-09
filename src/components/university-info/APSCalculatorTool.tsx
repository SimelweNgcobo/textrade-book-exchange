import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import { Progress } from "@/components/ui/progress";
import {
  Calculator,
  Plus,
  Minus,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
} from "lucide-react";
import { APSSubject, APSCalculation } from "@/types/university";
import { SUBJECTS_LIST } from "@/constants/degrees";
import {
  calculateAPS,
  convertPercentageToPoints,
  validateSubjectMarks,
  getRecommendations,
} from "@/utils/apsCalculation";

const APSCalculatorTool = () => {
  const navigate = useNavigate();
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
      setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
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
  const currentTotal = subjects.reduce((total, s) => total + s.points, 0);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Back Navigation */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/university-info")}
          className="text-gray-600 hover:text-gray-900 p-0"
        >
          ← Back to Universities
        </Button>
      </div>

      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
          <Calculator className="h-8 w-8 text-gray-700" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            APS Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your Admission Point Score based on your NSC subject
            marks. You need at least 6 subjects including Mathematics and
            English.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subject Input */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">
                Your Subject Marks
              </CardTitle>
              <CardDescription>
                Enter your final NSC marks for each subject (0-100%)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Indicator */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progress
                  </span>
                  <span className="text-sm text-gray-600">
                    {subjects.filter((s) => s.marks > 0).length}/6 subjects
                    minimum
                  </span>
                </div>
                <Progress
                  value={(subjects.filter((s) => s.marks > 0).length / 6) * 100}
                  className="h-2"
                />
              </div>

              {/* Subject Inputs */}
              <div className="space-y-3">
                {subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <Select
                        value={subject.name}
                        onValueChange={(value) =>
                          updateSubject(index, "name", value)
                        }
                      >
                        <SelectTrigger className="border-gray-200">
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
                        className="text-center border-gray-200"
                      />
                    </div>

                    <div className="w-16 text-center">
                      <Badge
                        variant={subject.level >= 4 ? "default" : "secondary"}
                      >
                        {subject.points} pts
                      </Badge>
                    </div>

                    {subjects.length > 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSubject(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Subject */}
              {subjects.length < 7 && (
                <Button
                  variant="outline"
                  onClick={addSubject}
                  className="w-full border-dashed border-gray-300 text-gray-600 hover:border-gray-400"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject ({subjects.length}/7)
                </Button>
              )}

              {/* Calculate Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculateResults}
                  disabled={!canCalculate}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate APS
                </Button>

                {showResults && (
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    className="border-gray-300"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Results Panel */}
        <div className="space-y-6">
          {/* Current Score */}
          <Card className="border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-lg text-gray-900">
                Current APS Total
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-4xl font-bold text-gray-900">
                {currentTotal}
              </div>
              <div className="text-sm text-gray-600">
                Based on {subjects.filter((s) => s.marks > 0).length} subjects
              </div>
            </CardContent>
          </Card>

          {/* Info */}
          <Alert className="border-gray-200">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-gray-700">
              <strong>APS Points:</strong>
              <br />
              80-100% = 7 points
              <br />
              70-79% = 6 points
              <br />
              60-69% = 5 points
              <br />
              50-59% = 4 points
              <br />
              40-49% = 3 points
              <br />
              30-39% = 2 points
              <br />
              0-29% = 1 point
            </AlertDescription>
          </Alert>

          {/* Validation */}
          {subjects.length < 6 && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                You need at least 6 subjects to calculate your APS for
                university admission.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* Results Section */}
      {showResults && calculation && (
        <div id="results" className="mt-16 space-y-8">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Your APS Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Final Score */}
              <div className="text-center bg-gray-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {calculation.totalScore}
                </div>
                <div className="text-gray-600">Your Total APS Score</div>
              </div>

              {/* Subject Breakdown */}
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">
                  Subject Breakdown:
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {calculation.subjects.map((subject, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-sm text-gray-900">
                        {subject.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {subject.marks}%
                      </div>
                      <div className="font-bold text-gray-900">
                        {subject.points} points
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">
                  Recommendations:
                </h4>
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

              {/* Next Steps */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold mb-3 text-gray-900">
                  What's Next?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => navigate("/university-info")}
                    variant="outline"
                    className="border-gray-300 hover:border-gray-400"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Explore Universities
                  </Button>
                  <Button
                    onClick={() => navigate("/university-info?tool=bursaries")}
                    variant="outline"
                    className="border-gray-300 hover:border-gray-400"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Find Bursaries
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default APSCalculatorTool;
