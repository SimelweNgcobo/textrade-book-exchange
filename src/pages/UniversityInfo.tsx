import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  University,
  GraduationCap,
  BookOpen,
  MapPin,
  Building,
  Users,
  Award,
  Calculator,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";
import UniversityHero from "@/components/university-info/UniversityHero";
import PopularUniversities from "@/components/university-info/PopularUniversities";
import SEO from "@/components/SEO";
import CampusNavbar from "@/components/CampusNavbar";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load heavy components for better performance
const APSCalculatorSection = lazy(
  () => import("@/components/university-info/APSCalculatorSection"),
);
const BursaryExplorerSection = lazy(
  () => import("@/components/university-info/BursaryExplorerSection"),
);
const CampusBooksSection = lazy(
  () => import("@/components/university-info/CampusBooksSection"),
);

const UniversityInfo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTool = searchParams.get("tool") || "overview";

  // Handle automatic redirect to APS calculator if coming from specific links
  useEffect(() => {
    if (window.location.hash === "#aps-calculator") {
      setSearchParams({ tool: "aps-calculator" });
    }
  }, [setSearchParams]);

  const handleTabChange = (value: string) => {
    const newParams = new URLSearchParams();
    newParams.set("tool", value);
    setSearchParams(newParams);
  };

  // Memoized statistics calculation for better performance
  const stats = useMemo(() => {
    try {
      // Ensure SOUTH_AFRICAN_UNIVERSITIES is defined and is an array
      if (
        !SOUTH_AFRICAN_UNIVERSITIES ||
        !Array.isArray(SOUTH_AFRICAN_UNIVERSITIES)
      ) {
        console.warn("SOUTH_AFRICAN_UNIVERSITIES is not properly defined");
        return {
          universities: 0,
          students: "0",
          programs: "0",
          resources: "Loading...",
        };
      }

      const totalPrograms = SOUTH_AFRICAN_UNIVERSITIES.reduce((total, uni) => {
        // Safely handle undefined or null universities
        if (!uni) {
          return total;
        }

        // Safely handle undefined or null faculties
        if (!uni.faculties || !Array.isArray(uni.faculties)) {
          return total;
        }

        return (
          total +
          uni.faculties.reduce((facTotal, fac) => {
            // Safely handle undefined or null degrees
            if (!fac || !fac.degrees || !Array.isArray(fac.degrees)) {
              return facTotal;
            }
            return facTotal + fac.degrees.length;
          }, 0)
        );
      }, 0);

      return {
        universities: SOUTH_AFRICAN_UNIVERSITIES.length,
        students: "1M+",
        programs: `${totalPrograms}+`,
        resources: "Growing Daily",
      };
    } catch (error) {
      console.error("Error calculating university statistics:", error);
      return {
        universities: 0,
        students: "Error",
        programs: "Error",
        resources: "Error",
      };
    }
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
        <div className="container mx-auto px-4 py-6">
          <Tabs
            value={currentTool}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 h-auto">
              <TabsTrigger
                value="overview"
                className="flex flex-col items-center gap-1 py-2 px-2 text-center"
              >
                <University className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="aps-calculator"
                className="flex flex-col items-center gap-1 py-2 px-2 text-center"
              >
                <Calculator className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs">APS</span>
              </TabsTrigger>
              <TabsTrigger
                value="bursaries"
                className="flex flex-col items-center gap-1 py-2 px-2 text-center"
              >
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs">Bursaries</span>
              </TabsTrigger>
              <TabsTrigger
                value="books"
                className="flex flex-col items-center gap-1 py-2 px-2 text-center"
              >
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs">Books</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Hero Section */}
              <UniversityHero onNavigateToTool={handleTabChange} />

              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-2xl md:text-3xl font-bold text-blue-600">
                      {stats.universities}
                    </div>
                    <div className="text-sm text-gray-600">Universities</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-2xl md:text-3xl font-bold text-green-600">
                      {stats.students}
                    </div>
                    <div className="text-sm text-gray-600">Students</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-2xl md:text-3xl font-bold text-purple-600">
                      {stats.programs}
                    </div>
                    <div className="text-sm text-gray-600">Programs</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-2xl md:text-3xl font-bold text-orange-600">
                      {stats.resources}
                    </div>
                    <div className="text-sm text-gray-600">Resources</div>
                  </CardContent>
                </Card>
              </div>

              {/* Popular Universities */}
              <PopularUniversities />

              {/* Quick Tools Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleTabChange("aps-calculator")}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-blue-600" />
                      APS Calculator
                    </CardTitle>
                    <CardDescription>
                      Calculate your Admission Point Score and find eligible
                      universities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">Most Popular</Badge>
                  </CardContent>
                </Card>

                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleTabChange("bursaries")}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Find Bursaries
                    </CardTitle>
                    <CardDescription>
                      Discover funding opportunities for your university studies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline">40+ Available</Badge>
                  </CardContent>
                </Card>
              </div>

              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    About ReBooked Campus
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    ReBooked Campus is your comprehensive guide to South African
                    higher education. We provide tools and resources to help you
                    make informed decisions about your university journey, from
                    calculating your APS score to finding the right bursaries
                    and degree programs.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold">For Students</h4>
                        <p className="text-sm text-gray-600">
                          Tools and guidance for university planning
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-semibold">Trusted Information</h4>
                        <p className="text-sm text-gray-600">
                          Accurate, up-to-date university data
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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

            <TabsContent value="books" className="space-y-6">
              <Suspense fallback={<LoadingSection />}>
                <CampusBooksSection />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default UniversityInfo;
