import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CampusLayout from "@/components/CampusLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Calculator,
  BookOpen,
  DollarSign,
  Users,
  TrendingUp,
  ArrowRight,
  Star,
  Target,
  Award,
} from "lucide-react";

// Import components
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
  const [activeTab, setActiveTab] = useState("overview");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle smooth scroll to sections based on hash
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const tabMap: { [key: string]: string } = {
        "#universities": "universities",
        "#aps-calculator": "calculator",
        "#degrees": "degrees",
        "#bursaries": "bursaries",
        "#campus-books": "books",
      };

      const targetTab = tabMap[hash];
      if (targetTab) {
        setActiveTab(targetTab);
      }
    }
  }, [location.hash]);

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university);
    setActiveTab("university-details");
  };

  const handleAPSCalculationComplete = (calculation: APSCalculation) => {
    setApsCalculation(calculation);
    setActiveTab("degrees");
  };

  const handleViewBooks = (universityId: string, degreeId?: string) => {
    setIsTransitioning(true);

    const params = new URLSearchParams();
    params.set("university", universityId);
    if (degreeId) {
      params.set("search", degreeId);
    }

    setTimeout(() => {
      navigate(`/books?${params.toString()}`);
    }, 300);
  };

  const features = [
    {
      icon: <Users className="h-8 w-8 text-book-600" />,
      title: "University Directory",
      description:
        "Explore 23+ South African universities with detailed information about programs, faculties, and admission requirements.",
      action: () => setActiveTab("universities"),
      count: "23+ Universities",
    },
    {
      icon: <Calculator className="h-8 w-8 text-book-600" />,
      title: "APS Calculator",
      description:
        "Calculate your Admission Point Score and discover which degree programs you qualify for based on your NSC results.",
      action: () => setActiveTab("calculator"),
      count: "Instant Results",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-book-600" />,
      title: "Bursary Portal",
      description:
        "Find financial assistance with comprehensive listings of bursaries, scholarships, and funding opportunities.",
      action: () => setActiveTab("bursaries"),
      count: "10+ Bursaries",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-book-600" />,
      title: "Campus Books",
      description:
        "Browse textbooks specifically from your university and connect with fellow students selling course materials.",
      action: () => setActiveTab("books"),
      count: "Your Campus",
    },
  ];

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
        <div className="fixed inset-0 bg-book-600 z-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading...</p>
          </div>
        </div>
      )}

      <CampusLayout showBackButton={true}>
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <GraduationCap className="h-12 w-12 text-book-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-book-800">
                ReBooked Campus
              </h1>
            </div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your complete student hub for South African universities.
              Calculate your APS score, explore degree programs, find bursaries,
              and connect with students selling textbooks.
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge
                variant="secondary"
                className="text-sm bg-book-100 text-book-800"
              >
                University Guide
              </Badge>
              <Badge
                variant="secondary"
                className="text-sm bg-book-100 text-book-800"
              >
                APS Calculator
              </Badge>
              <Badge
                variant="secondary"
                className="text-sm bg-book-100 text-book-800"
              >
                Bursary Portal
              </Badge>
              <Badge
                variant="secondary"
                className="text-sm bg-book-100 text-book-800"
              >
                Student Marketplace
              </Badge>
            </div>
          </div>

          {/* Tabbed Interface */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8 bg-white border border-book-200">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-book-600 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="universities"
                className="data-[state=active]:bg-book-600 data-[state=active]:text-white"
              >
                Universities
              </TabsTrigger>
              <TabsTrigger
                value="calculator"
                className="data-[state=active]:bg-book-600 data-[state=active]:text-white"
              >
                APS Calculator
              </TabsTrigger>
              <TabsTrigger
                value="degrees"
                className="data-[state=active]:bg-book-600 data-[state=active]:text-white"
              >
                Degrees
              </TabsTrigger>
              <TabsTrigger
                value="bursaries"
                className="data-[state=active]:bg-book-600 data-[state=active]:text-white"
              >
                Bursaries
              </TabsTrigger>
              <TabsTrigger
                value="books"
                className="data-[state=active]:bg-book-600 data-[state=active]:text-white"
              >
                Campus Books
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow cursor-pointer group border-book-200"
                    onClick={feature.action}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-book-50 rounded-lg group-hover:bg-book-100 transition-colors">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl font-semibold text-book-800 group-hover:text-book-600 transition-colors">
                            {feature.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="text-xs border-book-300 text-book-700"
                            >
                              {feature.count}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4">
                        {feature.description}
                      </CardDescription>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group-hover:bg-book-50 group-hover:border-book-300 border-book-200"
                      >
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-book-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-book-600">23+</div>
                    <div className="text-sm text-gray-600">Universities</div>
                  </CardContent>
                </Card>
                <Card className="border-book-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-book-600">100+</div>
                    <div className="text-sm text-gray-600">Degree Programs</div>
                  </CardContent>
                </Card>
                <Card className="border-book-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-book-600">10+</div>
                    <div className="text-sm text-gray-600">Bursary Options</div>
                  </CardContent>
                </Card>
                <Card className="border-book-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-book-600">
                      1000+
                    </div>
                    <div className="text-sm text-gray-600">Student Books</div>
                  </CardContent>
                </Card>
              </div>

              {/* How It Works */}
              <Card className="border-book-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-book-800">
                    How ReBooked Campus Works
                  </CardTitle>
                  <CardDescription className="text-center">
                    Your journey from high school to university success in 4
                    simple steps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 bg-book-100 rounded-full flex items-center justify-center mx-auto">
                        <Calculator className="h-6 w-6 text-book-600" />
                      </div>
                      <h3 className="font-semibold">1. Calculate APS</h3>
                      <p className="text-sm text-gray-600">
                        Enter your NSC marks to calculate your Admission Point
                        Score
                      </p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 bg-book-100 rounded-full flex items-center justify-center mx-auto">
                        <GraduationCap className="h-6 w-6 text-book-600" />
                      </div>
                      <h3 className="font-semibold">2. Find Programs</h3>
                      <p className="text-sm text-gray-600">
                        Discover degree programs you qualify for at different
                        universities
                      </p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 bg-book-100 rounded-full flex items-center justify-center mx-auto">
                        <DollarSign className="h-6 w-6 text-book-600" />
                      </div>
                      <h3 className="font-semibold">3. Apply for Funding</h3>
                      <p className="text-sm text-gray-600">
                        Find and apply for bursaries that match your profile
                      </p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 bg-book-100 rounded-full flex items-center justify-center mx-auto">
                        <BookOpen className="h-6 w-6 text-book-600" />
                      </div>
                      <h3 className="font-semibold">4. Get Textbooks</h3>
                      <p className="text-sm text-gray-600">
                        Buy affordable textbooks from students at your
                        university
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-book-800">
                  Ready to Start Your University Journey?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Join thousands of students who have used ReBooked Campus to
                  make informed decisions about their education.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    size="lg"
                    onClick={() => setActiveTab("calculator")}
                    className="bg-book-600 hover:bg-book-700 text-white"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Your APS
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setActiveTab("universities")}
                    className="border-book-300 hover:bg-book-50"
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Explore Universities
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* University Directory Tab */}
            <TabsContent value="universities">
              <UniversityExplorer
                onUniversitySelect={handleUniversitySelect}
                onViewBooks={handleViewBooks}
              />
            </TabsContent>

            {/* University Details Tab */}
            <TabsContent value="university-details">
              {selectedUniversity ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("universities")}
                      className="border-book-300 hover:bg-book-50"
                    >
                      ← Back to Directory
                    </Button>
                  </div>

                  <Card className="border-book-200">
                    <CardHeader>
                      <CardTitle className="text-2xl text-book-800">
                        {selectedUniversity.name}
                      </CardTitle>
                      <CardDescription>
                        {selectedUniversity.location},{" "}
                        {selectedUniversity.province}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-gray-700">
                        {selectedUniversity.overview}
                      </p>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Faculties & Schools
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedUniversity.faculties.map((faculty) => (
                            <Card
                              key={faculty.id}
                              className="border-book-200 hover:shadow-md transition-shadow"
                            >
                              <CardContent className="p-4">
                                <h4 className="font-medium text-book-800">
                                  {faculty.name}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {faculty.description}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={() => handleViewBooks(selectedUniversity.id)}
                          className="bg-book-600 hover:bg-book-700 text-white"
                        >
                          Browse Campus Books
                        </Button>
                        {selectedUniversity.website && (
                          <Button
                            variant="outline"
                            className="border-book-300 hover:bg-book-50"
                            asChild
                          >
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
                          onClick={() => setActiveTab("calculator")}
                          className="border-book-300 hover:bg-book-50"
                        >
                          Calculate APS for this University
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    Select a university from the directory to view details.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("universities")}
                    className="mt-4 border-book-300 hover:bg-book-50"
                  >
                    Browse Universities
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* APS Calculator Tab */}
            <TabsContent value="calculator">
              <APSCalculatorSection
                onCalculationComplete={handleAPSCalculationComplete}
              />
            </TabsContent>

            {/* Degree Matching Tab */}
            <TabsContent value="degrees">
              <DegreeFinderSection
                calculation={apsCalculation}
                onViewBooks={handleViewBooks}
              />
            </TabsContent>

            {/* Bursaries Tab */}
            <TabsContent value="bursaries">
              <BursaryExplorer />
            </TabsContent>

            {/* Campus Books Tab */}
            <TabsContent value="books">
              <CampusBooksSection />
            </TabsContent>
          </Tabs>

          {/* Final Call to Action */}
          <section className="py-16 bg-book-600 text-white rounded-xl mt-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Transform Your University Journey?
              </h2>
              <p className="text-xl text-book-200 mb-8 max-w-3xl mx-auto">
                You now have all the tools you need to make informed decisions
                about your education. From calculating your APS to finding the
                perfect textbooks - your success starts here.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2">1</div>
                    <div className="text-sm">Calculate Your APS</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2">2</div>
                    <div className="text-sm">Find Your Program</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2">3</div>
                    <div className="text-sm">Get Your Books</div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setActiveTab("calculator")}
                  className="bg-white text-book-600 hover:bg-gray-100 font-semibold"
                >
                  Start with APS Calculator
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/create-listing")}
                  className="border-white text-white hover:bg-white/10"
                >
                  Sell Your Textbooks
                </Button>
              </div>
            </div>
          </section>
        </div>
      </CampusLayout>
    </>
  );
};

export default UniversityInfo;
