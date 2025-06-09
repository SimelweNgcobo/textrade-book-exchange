import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CampusLayout from "@/components/CampusLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Search,
  MapPin,
  ExternalLink,
  Calculator,
  DollarSign,
  BookOpen,
  Users,
} from "lucide-react";

import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";
import { University } from "@/types/university";
import APSCalculatorTool from "@/components/university-info/APSCalculatorTool";
import BursaryExplorer from "@/components/university-info/BursaryExplorer";

const UniversityInfo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [currentTool, setCurrentTool] = useState<string | null>(null);

  // Handle tool routing from URL params
  useEffect(() => {
    const tool = searchParams.get("tool");
    if (tool) {
      setCurrentTool(tool);
    }
  }, [searchParams]);

  // Filter universities based on search
  const filteredUniversities = useMemo(() => {
    if (!searchQuery.trim()) return SOUTH_AFRICAN_UNIVERSITIES;

    const query = searchQuery.toLowerCase();
    return SOUTH_AFRICAN_UNIVERSITIES.filter(
      (university) =>
        university.name.toLowerCase().includes(query) ||
        university.abbreviation.toLowerCase().includes(query) ||
        university.location.toLowerCase().includes(query) ||
        university.province.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const handleUniversityClick = (university: University) => {
    setSelectedUniversity(university);
    // Smooth scroll to details
    setTimeout(() => {
      document.getElementById("university-details")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const handleViewBooks = (universityId: string) => {
    const params = new URLSearchParams();
    params.set("university", universityId);
    navigate(`/books?${params.toString()}`);
  };

  // Render tools
  if (currentTool === "calculator") {
    return (
      <>
        <SEO
          title="APS Calculator - ReBooked Campus"
          description="Calculate your Admission Point Score (APS) based on your NSC marks. Find out which university programs you qualify for."
          url="https://www.rebookedsolutions.co.za/university-info?tool=calculator"
        />
        <CampusLayout>
          <APSCalculatorTool />
        </CampusLayout>
      </>
    );
  }

  if (currentTool === "bursaries") {
    return (
      <>
        <SEO
          title="Find Bursaries - ReBooked Campus"
          description="Discover bursary and scholarship opportunities for South African students. Find funding for your university education."
          url="https://www.rebookedsolutions.co.za/university-info?tool=bursaries"
        />
        <CampusLayout>
          <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate("/university-info")}
                className="text-gray-600 hover:text-gray-900 p-0"
              >
                ← Back to Universities
              </Button>
            </div>
            <BursaryExplorer />
          </div>
        </CampusLayout>
      </>
    );
  }

  if (selectedUniversity) {
    return (
      <>
        <SEO
          title={`${selectedUniversity.name} - ReBooked Campus`}
          description={`Learn about ${selectedUniversity.name} - programs, faculties, admission requirements, and find textbooks from students.`}
          url={`https://www.rebookedsolutions.co.za/university-info#${selectedUniversity.id}`}
        />
        <CampusLayout>
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Back Navigation */}
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => setSelectedUniversity(null)}
                className="text-gray-600 hover:text-gray-900 p-0"
              >
                ← Back to Universities
              </Button>
            </div>

            {/* University Details */}
            <div id="university-details" className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold text-gray-700">
                    {selectedUniversity.abbreviation}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedUniversity.name}
                  </h1>
                  <p className="text-gray-600 flex items-center justify-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedUniversity.location}, {selectedUniversity.province}
                  </p>
                </div>
              </div>

              {/* Overview */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  About
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {selectedUniversity.overview}
                </p>
              </div>

              {/* Faculties */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Faculties & Schools
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedUniversity.faculties.map((faculty) => (
                    <Card
                      key={faculty.id}
                      className="border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <CardContent className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                          {faculty.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {faculty.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleViewBooks(selectedUniversity.id)}
                    className="h-auto p-4 flex flex-col items-center gap-2 border-gray-200 hover:border-gray-300"
                  >
                    <BookOpen className="h-5 w-5 text-gray-600" />
                    <span className="text-sm">Campus Books</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/university-info?tab=calculator")}
                    className="h-auto p-4 flex flex-col items-center gap-2 border-gray-200 hover:border-gray-300"
                  >
                    <Calculator className="h-5 w-5 text-gray-600" />
                    <span className="text-sm">APS Calculator</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/university-info?tab=bursaries")}
                    className="h-auto p-4 flex flex-col items-center gap-2 border-gray-200 hover:border-gray-300"
                  >
                    <DollarSign className="h-5 w-5 text-gray-600" />
                    <span className="text-sm">Find Bursaries</span>
                  </Button>
                  {selectedUniversity.website && (
                    <Button
                      variant="outline"
                      asChild
                      className="h-auto p-4 flex flex-col items-center gap-2 border-gray-200 hover:border-gray-300"
                    >
                      <a
                        href={selectedUniversity.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-5 w-5 text-gray-600" />
                        <span className="text-sm">Official Website</span>
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CampusLayout>
      </>
    );
  }

  return (
    <>
      <SEO
        title="ReBooked Campus - Explore South African Universities"
        description="Discover and explore South African universities. Find programs, calculate APS scores, discover bursaries, and connect with students selling textbooks."
        keywords="South African universities, university guide, APS calculator, bursaries, student textbooks"
        url="https://www.rebookedsolutions.co.za/university-info"
      />

      <CampusLayout>
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Hero Section - Centered */}
          <div className="text-center space-y-8 mb-16">
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Explore South African
                <br />
                <span className="text-gray-700">Universities</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover university programs, calculate your APS score, find
                bursaries, and connect with students selling textbooks at your
                chosen institution.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search universities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-base border-gray-200 rounded-xl focus:border-gray-400 focus:ring-gray-200 bg-white"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <span>{SOUTH_AFRICAN_UNIVERSITIES.length} Universities</span>
              <span>•</span>
              <span>9 Provinces</span>
              <span>•</span>
              <span>100+ Programs</span>
            </div>
          </div>

          {/* University Grid */}
          <div className="space-y-8">
            {searchQuery && (
              <div className="text-center text-gray-600">
                Found {filteredUniversities.length} universities matching "
                {searchQuery}"
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUniversities.map((university) => (
                <Card
                  key={university.id}
                  className="group cursor-pointer border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                  onClick={() => handleUniversityClick(university)}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    {/* University Avatar */}
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-gray-200 transition-colors">
                      <span className="text-sm font-bold text-gray-700">
                        {university.abbreviation}
                      </span>
                    </div>

                    {/* University Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {university.name}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {university.province}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredUniversities.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No universities found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try searching with different terms or check your spelling.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                  className="border-gray-200 hover:border-gray-300"
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>

          {/* Additional Tools - Minimal */}
          <div className="mt-20 border-t border-gray-100 pt-16">
            <div className="text-center space-y-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Additional Student Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <Button
                  variant="outline"
                  onClick={() => navigate("/university-info?tool=calculator")}
                  className="h-auto p-6 flex flex-col items-center gap-3 border-gray-200 hover:border-gray-300"
                >
                  <Calculator className="h-8 w-8 text-gray-600" />
                  <div className="text-center">
                    <div className="font-medium text-gray-900">
                      APS Calculator
                    </div>
                    <div className="text-sm text-gray-600">
                      Calculate your admission points
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/university-info?tool=bursaries")}
                  className="h-auto p-6 flex flex-col items-center gap-3 border-gray-200 hover:border-gray-300"
                >
                  <DollarSign className="h-8 w-8 text-gray-600" />
                  <div className="text-center">
                    <div className="font-medium text-gray-900">
                      Find Bursaries
                    </div>
                    <div className="text-sm text-gray-600">
                      Discover funding opportunities
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/books")}
                  className="h-auto p-6 flex flex-col items-center gap-3 border-gray-200 hover:border-gray-300"
                >
                  <BookOpen className="h-8 w-8 text-gray-600" />
                  <div className="text-center">
                    <div className="font-medium text-gray-900">
                      Student Books
                    </div>
                    <div className="text-sm text-gray-600">
                      Buy & sell textbooks
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CampusLayout>
    </>
  );
};

export default UniversityInfo;
