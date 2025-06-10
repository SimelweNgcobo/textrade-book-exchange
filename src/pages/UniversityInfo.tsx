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

  // Statistics for the platform
  const stats = {
    universities: SOUTH_AFRICAN_UNIVERSITIES.length,
    students: "1M+",
    books: "10,000+",
    bursaries: "100+",
  };

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
            <TabsContent value="aps" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>Admission Point Score Calculator</CardTitle>
                      <CardDescription>
                        Calculate your APS and see which programs you qualify
                        for
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <APSCalculatorSection />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bursaries Tab */}
            <TabsContent value="bursaries" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>Bursary & Scholarship Explorer</CardTitle>
                      <CardDescription>
                        Find funding opportunities for your studies
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <BursaryExplorerSection />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Textbooks Tab */}
            <TabsContent value="books" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Book className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>Campus Textbook Marketplace</CardTitle>
                      <CardDescription>
                        Buy and sell textbooks with students at your university
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CampusBooksSection />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Success Stories Section - Show on all tabs */}
        <section className="relative py-16 bg-book-50 overflow-hidden">
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
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose ReBooked Campus?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need for your university journey in one
                comprehensive platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-book-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-book-600" />
                  </div>
                  <CardTitle>Complete University Guide</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Comprehensive information about all {stats.universities}{" "}
                    South African universities. Find programs, requirements, and
                    make informed decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-book-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-book-600" />
                  </div>
                  <CardTitle>Smart APS Calculator</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Calculate your Admission Point Score and discover which
                    programs you qualify for. Get personalized recommendations
                    instantly.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-book-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Book className="w-8 h-8 text-book-600" />
                  </div>
                  <CardTitle>Student Marketplace</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Connect with students to buy affordable textbooks and find
                    bursary opportunities. Save money while supporting fellow
                    students.
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
