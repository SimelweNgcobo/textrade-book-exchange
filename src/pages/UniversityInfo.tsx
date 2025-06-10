import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  Book,
  BookOpen,
  Calculator,
  GraduationCap,
  ExternalLink,
  Users,
  MapPin,
  TrendingUp,
  Award,
  Target,
  ChevronRight,
  Star,
  Info,
} from "lucide-react";

import CampusNavbar from "@/components/CampusNavbar";
import SEO from "@/components/SEO";
import UniversityGrid from "@/components/university-info/UniversityGrid";
import UniversityExplorer from "@/components/university-info/UniversityExplorer";
import APSCalculatorSection from "@/components/university-info/APSCalculatorSection";
import BursaryExplorerSection from "@/components/university-info/BursaryExplorerSection";
import CampusBooksSection from "@/components/university-info/CampusBooksSection";

import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";

const UniversityInfo = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const currentTool = searchParams.get("tool") || "home";

  // Set the active tab based on URL parameter
  useEffect(() => {
    const tool = searchParams.get("tool");
    if (tool && ["home", "aps", "bursaries", "books"].includes(tool)) {
      // Tab is already controlled by searchParams
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ tool: "home", search: searchQuery });
    }
  };

  const handleTabChange = (value: string) => {
    const newParams = new URLSearchParams();
    newParams.set("tool", value);
    setSearchParams(newParams);
  };

  // Memoized statistics calculation for better performance
  const stats = useMemo(() => {
    const totalPrograms = SOUTH_AFRICAN_UNIVERSITIES.reduce((total, uni) => {
      return total + uni.faculties.reduce((facTotal, fac) => facTotal + fac.degrees.length, 0);
    }, 0);

    return {
      universities: SOUTH_AFRICAN_UNIVERSITIES.length,
      students: "1M+",
      programs: `${totalPrograms}+`,
      resources: "Growing Daily",
    };
  }, []);

  // Loading component for lazy-loaded sections
  const LoadingSection = () => (
    <div className="flex justify-center items-center py-12">
      <LoadingSpinner />
    </div>
  );

  return (
    <>
      <SEO
        title="ReBooked Campus - Your Complete University Guide"
        description="Explore South African universities, calculate your APS, find bursaries, and discover textbooks. Your one-stop platform for higher education in South Africa."
        keywords="South African universities, APS calculator, university bursaries, student textbooks, higher education, NSFAS"
        url="https://www.rebookedsolutions.co.za/university-info"
      />

      <CampusNavbar />

      <div className="min-h-screen bg-gray-50">
        {/* Main Content with Tabs */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 md:py-8">
          <Tabs
            value={currentTool}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 md:mb-8 h-auto">
              <TabsTrigger
                value="home"
                className="flex items-center gap-1 md:gap-2 py-2 md:py-3 text-xs md:text-sm"
              >
                <Search className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Universities</span>
                <span className="sm:hidden">Unis</span>
              </TabsTrigger>
              <TabsTrigger
                value="aps"
                className="flex items-center gap-1 md:gap-2 py-2 md:py-3 text-xs md:text-sm"
              >
                <Calculator className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">APS Calculator</span>
                <span className="sm:hidden">APS</span>
              </TabsTrigger>
              <TabsTrigger
                value="bursaries"
                className="flex items-center gap-1 md:gap-2 py-2 md:py-3 text-xs md:text-sm"
              >
                <GraduationCap className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Bursaries</span>
                <span className="sm:hidden">Funding</span>
              </TabsTrigger>
              <TabsTrigger
                value="books"
                className="flex items-center gap-1 md:gap-2 py-2 md:py-3 text-xs md:text-sm"
              >
                <Book className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Textbooks</span>
                <span className="sm:hidden">Books</span>
              </TabsTrigger>
            </TabsList>

            {/* Universities Tab */}
            <TabsContent value="home" className="space-y-6">
              <UniversityExplorer
                onUniversitySelect={(university) => {
                  // Handle university selection - navigate to detailed view
                  navigate(`/university/${university.id}`);
                }}
                onViewBooks={(universityId) => {
                  // Handle view books action
                  navigate(`/books?university=${universityId}`);
                }}
              />
            </TabsContent>

            {/* APS Calculator Tab */}
            <TabsContent value="aps" className="space-y-4 md:space-y-6">
              <Card>
                <CardHeader className="pb-3 md:pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calculator className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg md:text-xl">
                        <span className="hidden md:inline">
                          Admission Point Score Calculator
                        </span>
                        <span className="md:hidden">APS Calculator</span>
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base">
                        <span className="hidden md:inline">
                          Calculate your APS and see which programs you qualify
                          for
                        </span>
                        <span className="md:hidden">
                          Calculate your APS score
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 md:p-6">
                  <APSCalculatorSection />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bursaries Tab */}
          <TabsContent value="aps-calculator" className="space-y-6">
            <Suspense fallback={<LoadingSection />}>
              <APSCalculatorSection />
            </Suspense>
          </TabsContent>

          <TabsContent value="bursaries" className="space-y-6">
            <Suspense fallback={<LoadingSection />}>
              <BursaryExplorerSection />
            </Suspense>
          </TabsContent>

          <TabsContent value="degrees" className="space-y-6">
            <Suspense fallback={<LoadingSection />}>
              <DegreeFinderSection />
            </Suspense>
          </TabsContent>

          <TabsContent value="books" className="space-y-6">
            <Suspense fallback={<LoadingSection />}>
              <CampusBooksSection />
            </Suspense>
          </TabsContent>

          <TabsContent value="explore" className="space-y-6">
            <Suspense fallback={<LoadingSection />}>
              <UniversityExplorer />
            </Suspense>
          </TabsContent>
              <Card>
                <CardHeader className="pb-3 md:pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Book className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg md:text-xl">
                        <span className="hidden md:inline">
                          Campus Textbook Marketplace
                        </span>
                        <span className="md:hidden">Textbook Marketplace</span>
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base">
                        <span className="hidden md:inline">
                          Buy and sell textbooks with students at your
                          university
                        </span>
                        <span className="md:hidden">Buy & sell textbooks</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 md:p-6">
                  <CampusBooksSection />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Success Stories Section - Show on all tabs - Mobile optimized */}
        <section className="relative py-12 md:py-16 bg-book-50 overflow-hidden">
          {/* Background Graduation Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop&crop=center"
              alt="Graduation celebration with caps in the air"
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-book-50/80" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                Why Choose ReBooked Campus?
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                <span className="hidden md:inline">
                  Everything you need for your university journey in one
                  comprehensive platform.
                </span>
                <span className="md:hidden">
                  Your complete university journey platform.
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center p-4 md:p-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-book-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Search className="w-6 h-6 md:w-8 md:h-8 text-book-600" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">
                    <span className="hidden md:inline">
                      Complete University Guide
                    </span>
                    <span className="md:hidden">University Guide</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 md:p-6 pt-0">
                  <p className="text-sm md:text-base text-gray-600">
                    <span className="hidden md:inline">
                      Comprehensive information about all {stats.universities}{" "}
                      South African universities. Find programs, requirements,
                      and make informed decisions.
                    </span>
                    <span className="md:hidden">
                      Complete info on all {stats.universities} SA universities.
                      Find programs and requirements.
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center p-4 md:p-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-book-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Calculator className="w-6 h-6 md:w-8 md:h-8 text-book-600" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">
                    <span className="hidden md:inline">
                      Smart APS Calculator
                    </span>
                    <span className="md:hidden">APS Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 md:p-6 pt-0">
                  <p className="text-sm md:text-base text-gray-600">
                    <span className="hidden md:inline">
                      Calculate your Admission Point Score and discover which
                      programs you qualify for. Get personalized recommendations
                      instantly.
                    </span>
                    <span className="md:hidden">
                      Calculate your APS and find qualifying programs instantly.
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                <CardHeader className="text-center p-4 md:p-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-book-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Book className="w-6 h-6 md:w-8 md:h-8 text-book-600" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">
                    <span className="hidden md:inline">
                      Student Marketplace
                    </span>
                    <span className="md:hidden">Marketplace</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 md:p-6 pt-0">
                  <p className="text-sm md:text-base text-gray-600">
                    <span className="hidden md:inline">
                      Connect with students to buy affordable textbooks and find
                      bursary opportunities. Save money while supporting fellow
                      students.
                    </span>
                    <span className="md:hidden">
                      Buy affordable textbooks and find bursaries from fellow
                      students.
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Platform Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-book-600 mb-2">
                  {stats.universities}
                </div>
                <div className="text-gray-600">Universities</div>
              </div>
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-book-600 mb-2">
                  {stats.students}
                </div>
                <div className="text-gray-600">Students Served</div>
              </div>
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-book-600 mb-2">
                  {stats.books}
                </div>
                <div className="text-gray-600">Books Available</div>
              </div>
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-book-600 mb-2">
                  {stats.bursaries}
                </div>
                <div className="text-gray-600">Bursaries Listed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your University Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are using ReBooked Campus to
              navigate their path to higher education success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleTabChange("home")}
                size="lg"
                className="bg-book-600 hover:bg-book-700 text-white px-8"
              >
                <Search className="w-5 h-5 mr-2" />
                Explore Universities
              </Button>
              <Button
                onClick={() => handleTabChange("aps")}
                variant="outline"
                size="lg"
                className="border-book-200 text-book-600 hover:bg-book-50 px-8"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate APS
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UniversityInfo;