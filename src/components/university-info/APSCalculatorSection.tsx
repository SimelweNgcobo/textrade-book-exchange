import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calculator,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import EnhancedAPSCalculator from "@/components/university-info/EnhancedAPSCalculator";
import { APSCalculation, EligibleDegree } from "@/types/university";
import { useNavigate } from "react-router-dom";

const APSCalculatorSection = () => {
  const navigate = useNavigate();
  const [calculation, setCalculation] = useState<APSCalculation | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculationComplete = (newCalculation: APSCalculation) => {
    setCalculation(newCalculation);
    setShowResults(true);
  };

  const handleViewBooks = (universityId: string, degreeId: string) => {
    navigate(`/books?university=${universityId}&degree=${degreeId}`);
  };

  const handleViewUniversity = (universityId: string) => {
    navigate(`/university/${universityId}`);
  };

  const getEligibilityColor = (meetsRequirement: boolean, apsGap?: number) => {
    if (meetsRequirement) return "text-green-600";
    if (apsGap && apsGap <= 3) return "text-orange-600";
    return "text-red-600";
  };

  const getEligibilityBadge = (meetsRequirement: boolean, apsGap?: number) => {
    if (meetsRequirement) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Eligible
        </Badge>
      );
    }
    if (apsGap && apsGap <= 3) {
      return (
        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
          Close
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-800 border-red-200">
        Not Eligible
      </Badge>
    );
  };

  const eligibleDegrees =
    calculation?.eligibleDegrees.filter((d) => d.meetsRequirement) || [];
  const closeMatches =
    calculation?.eligibleDegrees.filter(
      (d) => !d.meetsRequirement && d.apsGap && d.apsGap <= 5,
    ) || [];

  return (
    <div className="space-y-8">
      {/* Header with Study Image */}
      <div className="relative text-center space-y-4 bg-gradient-to-r from-book-50 to-book-100 rounded-2xl p-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=400&fit=crop&crop=center"
            alt="Students studying with textbooks"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-book-50/80 to-book-100/80" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calculator className="w-8 h-8 text-book-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              APS Calculator & Degree Finder
            </h2>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Calculate your Admission Point Score (APS) and discover which
            university programs you qualify for. Get personalized
            recommendations and find books for your chosen courses.
          </p>
        </div>
      </div>

      {/* Enhanced APS Calculator */}
      <EnhancedAPSCalculator
        onCalculationComplete={handleCalculationComplete}
      />

      {/* Results Section */}
      {showResults && calculation && (
        <div className="space-y-6">
          {/* Summary */}
          <Card className="border-book-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-book-600" />
                <span>Your Results Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center bg-book-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-book-600 mb-2">
                    {calculation.totalScore}
                  </div>
                  <div className="text-gray-600">Your APS Score</div>
                </div>

                <div className="text-center bg-green-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {eligibleDegrees.length}
                  </div>
                  <div className="text-gray-600">Eligible Programs</div>
                </div>

                <div className="text-center bg-orange-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {closeMatches.length}
                  </div>
                  <div className="text-gray-600">Close Matches</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eligible Degrees */}
          {eligibleDegrees.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Programs You Qualify For</span>
                </CardTitle>
                <CardDescription>
                  These university programs match your APS score. Click to
                  explore books and resources.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eligibleDegrees.slice(0, 12).map((eligible, index) => (
                    <div
                      key={`${eligible.university.id}-${eligible.degree.id}`}
                      className="border border-gray-200 rounded-lg p-4 hover:border-book-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">
                              {eligible.degree.name}
                            </h3>
                            {getEligibilityBadge(
                              eligible.meetsRequirement,
                              eligible.apsGap,
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="font-medium">
                              {eligible.university?.abbreviation ||
                                eligible.university?.name ||
                                "Unknown University"}
                            </span>
                            <span>•</span>
                            <span>
                              {eligible.degree?.faculty || "Unknown Faculty"}
                            </span>
                            <span>•</span>
                            <span>
                              {eligible.degree?.duration || "Unknown Duration"}
                            </span>
                            <span>•</span>
                            <span className="text-book-600 font-medium">
                              APS: {eligible.degree?.apsRequirement || "N/A"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed mb-3">
                            {eligible.degree?.description ||
                              "No description available."}
                          </p>

                          {/* Career Prospects */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {(eligible.degree.careerProspects || [])
                              .slice(0, 4)
                              .map((career, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs bg-gray-100"
                                >
                                  {career}
                                </Badge>
                              ))}
                            {(eligible.degree.careerProspects?.length || 0) >
                              4 && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-gray-100"
                              >
                                +
                                {(eligible.degree.careerProspects?.length ||
                                  0) - 4}{" "}
                                more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            handleViewBooks(
                              eligible.university.id,
                              eligible.degree.id,
                            )
                          }
                          className="bg-book-600 hover:bg-book-700 text-white"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          View Books
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleViewUniversity(eligible.university.id)
                          }
                          className="border-book-200 text-book-600 hover:bg-book-50"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          University Info
                        </Button>
                      </div>

                      {index < eligibleDegrees.slice(0, 12).length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}

                  {eligibleDegrees.length > 12 && (
                    <div className="text-center pt-4">
                      <p className="text-gray-600 mb-4">
                        Showing top 12 matches. You qualify for{" "}
                        {eligibleDegrees.length} total programs.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() =>
                          navigate("/university-info?tool=degrees")
                        }
                        className="border-book-200 text-book-600 hover:bg-book-50"
                      >
                        View All Eligible Programs
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Close Matches */}
          {closeMatches.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span>Programs Within Reach</span>
                </CardTitle>
                <CardDescription>
                  These programs are close to your APS score. Consider improving
                  specific subjects or exploring alternative pathways.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {closeMatches.slice(0, 6).map((close, index) => (
                    <div
                      key={`${close.university.id}-${close.degree.id}`}
                      className="border border-orange-200 rounded-lg p-4 bg-orange-50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">
                              {close.degree.name}
                            </h3>
                            {getEligibilityBadge(
                              close.meetsRequirement,
                              close.apsGap,
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="font-medium">
                              {close.university?.abbreviation ||
                                close.university?.name ||
                                "Unknown University"}
                            </span>
                            <span>•</span>
                            <span>
                              {close.degree?.faculty || "Unknown Faculty"}
                            </span>
                            <span>•</span>
                            <span className="text-orange-600 font-medium">
                              Need {close.apsGap || 0} more points
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {close.degree?.description ||
                              "No description available."}
                          </p>
                        </div>
                      </div>

                      <Alert className="mt-3 border-orange-200 bg-orange-50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          <strong>Improvement tip:</strong> Focus on improving
                          your Mathematics or English marks, or consider
                          bridging courses to boost your APS score.
                        </AlertDescription>
                      </Alert>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <Card className="border-book-200">
            <CardHeader>
              <CardTitle>Next Steps & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Application Guidance
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>
                        Apply early - most universities have limited spaces
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>
                        Check specific subject requirements for each program
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>
                        Consider multiple universities as backup options
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>
                        Research bursary and financial aid opportunities
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Explore Resources
                  </h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigate("/university-info?tool=bursaries")
                      }
                      className="w-full justify-start border-book-200 text-book-600 hover:bg-book-50"
                    >
                      Find Bursaries & Financial Aid
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/university-info?tool=books")}
                      className="w-full justify-start border-book-200 text-book-600 hover:bg-book-50"
                    >
                      Browse University Textbooks
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/university-info")}
                      className="w-full justify-start border-book-200 text-book-600 hover:bg-book-50"
                    >
                      Explore University Profiles
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default APSCalculatorSection;
