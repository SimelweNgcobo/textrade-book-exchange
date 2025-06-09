import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CampusLayout from "@/components/CampusLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Import immersive sections
import UniversityExplorer from "@/components/university-info/UniversityExplorer";
import APSCalculatorSection from "@/components/university-info/APSCalculatorSection";
import DegreeFinderSection from "@/components/university-info/DegreeFinderSection";
import BursaryExplorer from "@/components/university-info/BursaryExplorer";
import CampusBooksSection from "@/components/university-info/CampusBooksSection";

// Import types
import { University, APSCalculation } from "@/types/university";

const UniversityInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [apsCalculation, setApsCalculation] = useState<APSCalculation | null>(
    null,
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle smooth scroll to sections based on hash
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university);
    // Smooth scroll to details section
    setTimeout(() => {
      document
        .getElementById("university-details")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleAPSCalculationComplete = (calculation: APSCalculation) => {
    setApsCalculation(calculation);
    // Auto-scroll to degree finder with a small delay
    setTimeout(() => {
      document
        .getElementById("degrees")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleViewBooks = (universityId: string, degreeId?: string) => {
    setIsTransitioning(true);

    // Create animated transition to books page
    const params = new URLSearchParams();
    params.set("university", universityId);
    if (degreeId) {
      params.set("search", degreeId);
    }

    // Add a brief delay for transition effect
    setTimeout(() => {
      navigate(`/books?${params.toString()}`);
    }, 300);
  };

  const handleNavigateToCreateListing = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/create-listing");
    }, 300);
  };

  return (
    <>
      <SEO
        title="ReBooked Campus - University Guide & Student Resources"
        description="Your complete South African university guide. Calculate APS scores, explore degree programs, find bursaries, and connect with students selling textbooks at your campus."
        keywords="South African universities, APS calculator, degree programs, university bursaries, student textbooks, UCT, Wits, Stellenbosch, UP, UKZN"
        url="https://www.rebookedsolutions.co.za/university-info"
      />

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 z-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading...</p>
          </div>
        </div>
      )}

      <CampusLayout showBackButton={true}>
        {/* Hero Section - University Explorer */}
        <UniversityExplorer
          onUniversitySelect={handleUniversitySelect}
          onViewBooks={handleViewBooks}
        />

        {/* University Details Section (Conditional) */}
        {selectedUniversity && (
          <section id="university-details" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-2xl max-w-4xl mx-auto">
                <CardContent className="p-8">
                  {/* Back Button */}
                  <div className="flex items-center gap-4 mb-8">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedUniversity(null)}
                      className="border-gray-300 hover:border-indigo-400"
                    >
                      ← Back to Universities
                    </Button>
                  </div>

                  {/* University Header */}
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">
                        {selectedUniversity.abbreviation}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedUniversity.name}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {selectedUniversity.location},{" "}
                      {selectedUniversity.province}
                    </p>
                  </div>

                  {/* University Overview */}
                  <div className="bg-indigo-50 rounded-2xl p-6 mb-8">
                    <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                      About the University
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedUniversity.overview}
                    </p>
                  </div>

                  {/* Faculties Grid */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                      Faculties & Schools
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedUniversity.faculties.map((faculty) => (
                        <Card
                          key={faculty.id}
                          className="bg-white hover:shadow-lg transition-shadow"
                        >
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-gray-800 mb-2">
                              {faculty.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {faculty.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => handleViewBooks(selectedUniversity.id)}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      Browse Campus Books
                    </Button>
                    {selectedUniversity.website && (
                      <Button variant="outline" asChild>
                        <a
                          href={selectedUniversity.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Official Website
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() =>
                        document
                          .getElementById("aps-calculator")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Calculate APS for this University
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* APS Calculator Section */}
        <APSCalculatorSection
          onCalculationComplete={handleAPSCalculationComplete}
        />

        {/* Degree Finder Section */}
        <DegreeFinderSection
          calculation={apsCalculation}
          onViewBooks={handleViewBooks}
        />

        {/* Bursary Explorer Section */}
        <BursaryExplorer />

        {/* Campus Books Section */}
        <CampusBooksSection />

        {/* Final Call to Action */}
        <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your University Journey?
            </h2>
            <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
              You now have all the tools you need to make informed decisions
              about your education. From calculating your APS to finding the
              perfect textbooks - your success starts here.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">1</div>
                  <div className="text-sm">Calculate Your APS</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">2</div>
                  <div className="text-sm">Find Your Program</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">3</div>
                  <div className="text-sm">Get Your Books</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("aps-calculator")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold"
              >
                Start with APS Calculator
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleNavigateToCreateListing}
                className="border-white text-white hover:bg-white/10"
              >
                Sell Your Textbooks
              </Button>
            </div>
          </div>
        </section>
      </CampusLayout>
    </>
  );
};

export default UniversityInfo;
