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
import { Progress } from "@/components/ui/progress";
import {
  Calculator,
  Plus,
  Minus,
  CheckCircle,
  AlertCircle,
  Info,
  TrendingUp,
  Target,
  Award,
  Zap,
} from "lucide-react";
import { APSSubject, APSCalculation } from "@/types/university";
import { SUBJECTS_LIST } from "@/constants/degrees";
import {
  calculateAPS,
  convertPercentageToPoints,
  validateSubjectMarks,
  getRecommendations,
} from "@/utils/apsCalculation";

interface APSCalculatorSectionProps {
  onCalculationComplete: (calculation: APSCalculation) => void;
}

const APSCalculatorSection = ({
  onCalculationComplete,
}: APSCalculatorSectionProps) => {
  const [subjects, setSubjects] = useState<APSSubject[]>([
    { name: "Mathematics", marks: 0, level: 1, points: 0 },
    { name: "English", marks: 0, level: 1, points: 0 },
  ]);

  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

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

  const calculateResults = async () => {
    if (calculation) {
      setIsCalculating(true);
      // Add a small delay for better UX
      setTimeout(() => {
        setShowResults(true);
        setIsCalculating(false);
        onCalculationComplete(calculation);
        // Smooth scroll to results
        setTimeout(() => {
          document
            .getElementById("aps-results")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }, 1000);
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
  const progressPercentage = Math.min((currentTotal / 42) * 100, 100); // 42 is max possible APS

  const getScoreColor = (score: number) => {
    if (score >= 35) return "text-green-600";
    if (score >= 25) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <section id="aps-calculator" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
            <Calculator className="h-4 w-4" />
            APS Calculator
          </div>
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Calculate Your
            </span>
            <br />
            <span className="text-gray-900">Admission Point Score</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Enter your NSC subject marks to see which university programs you
            qualify for. Get instant results and personalized recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Panel */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calculator className="h-6 w-6" />
                  Your Subject Marks
                </CardTitle>
                <CardDescription className="text-green-100">
                  Enter your final NSC marks for each subject (0-100%). You need
                  at least 6 subjects including Mathematics and English.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
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
                    value={
                      (subjects.filter((s) => s.marks > 0).length / 6) * 100
                    }
                    className="h-2"
                  />
                </div>

                {/* Subject Input Grid */}
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="flex-1">
                          <Select
                            value={subject.name}
                            onValueChange={(value) =>
                              updateSubject(index, "name", value)
                            }
                          >
                            <SelectTrigger className="border-gray-300 focus:border-green-500">
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              {SUBJECTS_LIST.filter(
                                (subj) =>
                                  !subjects.some(
                                    (s, i) => s.name === subj && i !== index,
                                  ),
                              ).map((subjectName) => (
                                <SelectItem
                                  key={subjectName}
                                  value={subjectName}
                                >
                                  {subjectName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="w-32">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Mark %"
                            value={subject.marks || ""}
                            onChange={(e) =>
                              updateSubject(index, "marks", e.target.value)
                            }
                            className="text-center border-gray-300 focus:border-green-500"
                          />
                        </div>

                        <div className="w-20 text-center">
                          <Badge
                            variant={
                              subject.level >= 4 ? "default" : "secondary"
                            }
                            className={`${subject.level >= 4 ? "bg-green-500" : "bg-gray-500"} text-white`}
                          >
                            {subject.points} pts
                          </Badge>
                        </div>

                        {subjects.length > 2 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSubject(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Subject Button */}
                {subjects.length < 7 && (
                  <Button
                    variant="outline"
                    onClick={addSubject}
                    className="w-full border-dashed border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-600"
                    disabled={subjects.length >= 7}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Subject ({subjects.length}/7)
                  </Button>
                )}

                {/* Validation Messages */}
                {subjects.length < 6 && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
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
                    disabled={!canCalculate || isCalculating}
                    className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-lg py-6"
                  >
                    {isCalculating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="h-5 w-5 mr-2" />
                        Calculate APS & Find Programs
                      </>
                    )}
                  </Button>

                  {showResults && (
                    <Button
                      variant="outline"
                      onClick={resetCalculator}
                      className="py-6"
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
            {/* Current Score Display */}
            <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
              <CardHeader className="text-center">
                <CardTitle className="text-lg text-green-800">
                  Current APS Total
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div
                  className={`text-4xl font-bold ${getScoreColor(currentTotal)}`}
                >
                  {currentTotal}
                </div>
                <div className="text-sm text-gray-600">
                  Based on {subjects.filter((s) => s.marks > 0).length} subjects
                </div>

                {currentTotal > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Progress to Excellence</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progressPercentage)}`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* APS Information */}
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>APS Points System:</strong>
                <br />
                80-100% = 7 points, 70-79% = 6 points, 60-69% = 5 points, 50-59%
                = 4 points, 40-49% = 3 points, 30-39% = 2 points, 0-29% = 1
                point
              </AlertDescription>
            </Alert>

            {/* Quick Tips */}
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg text-purple-800 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  APS Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-700">
                    Mathematics and English are required for most programs
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-700">
                    Aim for 35+ APS to qualify for most degree programs
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-700">
                    Higher APS scores open more opportunities
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Section */}
        {showResults && calculation && (
          <div id="aps-results" className="mt-16">
            <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6" />
                  Your APS Results
                </CardTitle>
                <CardDescription className="text-green-100">
                  Congratulations! Here are your detailed results and
                  recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {/* Final Score */}
                <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-6xl font-bold text-green-600 mb-4">
                    {calculation.totalScore}
                  </div>
                  <div className="text-xl text-gray-600 mb-2">
                    Your Total APS Score
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-sm px-4 py-1">
                    {calculation.totalScore >= 35
                      ? "Excellent Score!"
                      : calculation.totalScore >= 25
                        ? "Good Score!"
                        : "Keep Improving!"}
                  </Badge>
                </div>

                {/* Subject Breakdown */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">
                    Subject Breakdown:
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {calculation.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow border"
                      >
                        <div className="font-medium text-gray-800">
                          {subject.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {subject.marks}%
                        </div>
                        <div className="font-bold text-green-600 text-lg">
                          {subject.points} points
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">
                    Recommendations:
                  </h4>
                  <div className="space-y-3">
                    {getRecommendations(calculation.totalScore).map(
                      (recommendation, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 bg-white p-4 rounded-lg shadow"
                        >
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            {recommendation}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white text-center">
                  <h4 className="text-xl font-bold mb-3">What's Next?</h4>
                  <p className="text-indigo-100 mb-4">
                    Explore degree programs you qualify for and find bursary
                    opportunities.
                  </p>
                  <Button
                    onClick={() =>
                      document
                        .getElementById("degrees")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold"
                  >
                    View Eligible Programs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default APSCalculatorSection;
