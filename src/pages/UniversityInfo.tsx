import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Info
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
    students: "500,000+",
    books: "50,000+",
    bursaries: "50+"
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
        {/* Hero Section - Only show on home tab */}
        {currentTool === "home" && (
          <section className="relative bg-gradient-to-br from-book-50 to-white py-16 overflow-hidden">
            {/* Background Study Image */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=800&fit=crop&crop=center"
                alt="Students studying with books"
                className="w-full h-full object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-book-50/90 to-white/90" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-8">
                {/* Main Hero Content */}
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                    Explore South Africa's{" "}
                    <span className="text-book-600">Universities with Ease</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    Your trusted student guide for finding the right place to study.
                    Discover universities, calculate your APS, find bursaries, and get textbooks.
                  </p>
                </div>

                {/* Search Form */}
                <div className="max-w-2xl mx-auto">
                  <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search universities, programs, or locations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-book-300"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-book-600 hover:bg-book-700 text-white px-8 h-12"
                    >
                      Search
                    </Button>
                  </form>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    onClick={() => handleTabChange("home")}
                    size="lg"
                    className="bg-book-600 hover:bg-book-700 text-white px-6"
                  >
                    <Book className="w-5 h-5 mr-2" />
                    Browse Universities
                  </Button>
                  <Button
                    onClick={() => handleTabChange("aps")}
                    variant="outline"
                    size="lg"
                    className="border-book-200 text-book-600 hover:bg-book-50 px-6"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    APS Calculator
                  </Button>
                  <Button
                    onClick={() => handleTabChange("bursaries")}
                    variant="outline"
                    size="lg"
                    className="border-book-200 text-book-600 hover:bg-book-50 px-6"
                  >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Find Bursaries
                  </Button>
                </div>

                {/* Platform Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                  <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                    <div className="text-3xl font-bold text-book-600 mb-2">{stats.universities}</div>
                    <div className="text-gray-600">Universities</div>
                  </div>
                  <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                    <div className="text-3xl font-bold text-book-600 mb-2">{stats.students}</div>
                    <div className="text-gray-600">Students</div>
                  </div>
                  <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                    <div className="text-3xl font-bold text-book-600 mb-2">{stats.books}</div>
                    <div className="text-gray-600">Books Available</div>
                  </div>
                  <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                    <div className="text-3xl font-bold text-book-600 mb-2">{stats.bursaries}</div>
                    <div className="text-gray-600">Bursaries</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* University Explorer Section - Only show on home tab */}
        {currentTool === "home" && (
          <div className="bg-white">
            <UniversityExplorer
              onUniversitySelect={(university) => {
                // Handle university selection - could navigate to detailed view
                navigate(`/university/${university.id}`);
              }}
              onViewBooks={(universityId) => {
                // Handle view books action
                navigate(`/books?university=${universityId}`);
              }}
            />
          </div>
        )}
                {/* UCT Card */}
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-book-300" onClick={() => navigate("/university/uct")}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-lg">UCT</span>
                        </div>
                        <div>
                          <CardTitle className="group-hover:text-book-600 transition-colors">
                            University of Cape Town
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Cape Town, Western Cape</span>
                            <Badge variant="secondary">Public</Badge>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-book-600 transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Africa's leading university, renowned for research excellence and situated beneath Table Mountain.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">Medicine</Badge>
                      <Badge variant="outline" className="text-xs">Engineering</Badge>
                      <Badge variant="outline" className="text-xs">Commerce</Badge>
                      <Badge variant="outline" className="text-xs">Law</Badge>
                      <Badge variant="outline" className="text-xs">+4 more</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Est. 1829</span>
                      <span>29,000+ students</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Wits Card */}
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-book-300" onClick={() => navigate("/university/wits")}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <span className="text-yellow-600 font-bold text-lg">W</span>
                        </div>
                        <div>
                          <CardTitle className="group-hover:text-book-600 transition-colors">
                            University of the Witwatersrand
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Johannesburg, Gauteng</span>
                            <Badge variant="secondary">Public</Badge>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-book-600 transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      World-class African university distinguished for excellent research and producing global leaders.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">Mining Engineering</Badge>
                      <Badge variant="outline" className="text-xs">Medicine</Badge>
                      <Badge variant="outline" className="text-xs">Business</Badge>
                      <Badge variant="outline" className="text-xs">Science</Badge>
                      <Badge variant="outline" className="text-xs">+3 more</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Est. 1922</span>
                      <span>40,000+ students</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => handleTabChange("home")}
                  variant="outline"
                  size="lg"
                  className="border-book-200 text-book-600 hover:bg-book-50"
                >
                  View All Universities
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Why Choose ReBooked Campus Section - Only show on home tab */}
        {currentTool === "home" && (
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
                  Everything you need for your university journey in one comprehensive platform.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-book-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-book-600" />
                    </div>
                    <CardTitle>Easy University Discovery</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">
                      Find universities by location, programs, or specific requirements.
                      Get detailed profiles with all the information you need.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-book-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-8 h-8 text-book-600" />
                    </div>
                    <CardTitle>Smart APS Calculator</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">
                      Calculate your Admission Point Score and discover which programs you qualify for.
                      Get personalized recommendations instantly.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-book-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-book-600" />
                    </div>
                    <CardTitle>Integrated Marketplace</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">
                      Find textbooks specific to your university and courses.
                      Buy and sell books with fellow students safely.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Main Content Tabs */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={currentTool} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-white border-2 border-book-100">
                <TabsTrigger
                  value="home"
                  className="data-[state=active]:bg-book-600 data-[state=active]:text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Universities
                </TabsTrigger>
                <TabsTrigger
                  value="aps"
                  className="data-[state=active]:bg-book-600 data-[state=active]:text-white"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  APS Calculator
                </TabsTrigger>
                <TabsTrigger
                  value="bursaries"
                  className="data-[state=active]:bg-book-600 data-[state=active]:text-white"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Bursaries
                </TabsTrigger>
                <TabsTrigger
                  value="books"
                  className="data-[state=active]:bg-book-600 data-[state=active]:text-white"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Campus Books
                </TabsTrigger>
              </TabsList>

              <TabsContent value="home" className="mt-8">
                <UniversityGrid searchQuery={searchParams.get("search") || ""} />
              </TabsContent>

              <TabsContent value="aps" className="mt-8">
                <APSCalculatorSection />
              </TabsContent>

              <TabsContent value="bursaries" className="mt-8">
                <BursaryExplorerSection />
              </TabsContent>

              <TabsContent value="books" className="mt-8">
                <CampusBooksSection />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Call to Action Section - Only show on home tab */}
        {currentTool === "home" && (
          <section className="py-16 bg-white border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Card className="bg-book-50 border-book-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-book-800">
                    Ready to Start Your University Journey?
                  </CardTitle>
                  <CardDescription className="text-book-700 text-lg">
                    Get personalized guidance and find everything you need for your studies.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleTabChange("aps")}
                      size="lg"
                      className="bg-book-600 hover:bg-book-700 text-white"
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate Your APS
                    </Button>

                    <Button
                      onClick={() => navigate("/books")}
                      variant="outline"
                      size="lg"
                      className="border-book-200 text-book-600 hover:bg-book-50"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Visit Marketplace
                    </Button>
                  </div>

                  <Alert className="border-book-200 bg-book-100">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-book-800">
                      <strong>Pro Tip:</strong> Use our APS calculator first, then explore bursaries and textbooks
                      for your eligible programs. This gives you a complete picture of your university options!
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default UniversityInfo;