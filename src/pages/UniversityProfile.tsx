import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  BookOpen,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CampusNavbar from "@/components/CampusNavbar";
import SEO from "@/components/SEO";
import UniversityApplicationInfo from "@/components/university-info/UniversityApplicationInfo";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";
import { University } from "@/types/university";

const UniversityProfile = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const navigate = useNavigate();
  const [university, setUniversity] = useState<University | null>(null);

  useEffect(() => {
    if (universityId) {
      const found = SOUTH_AFRICAN_UNIVERSITIES.find(
        (uni) => uni.id === universityId,
      );
      setUniversity(found || null);
    }
  }, [universityId]);

  if (!university) {
    return (
      <>
        <CampusNavbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              University Not Found
            </h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              The university you're looking for doesn't exist.
            </p>
            <Button
              onClick={() => navigate("/university-info")}
              className="bg-book-600 hover:bg-book-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Universities
            </Button>
          </div>
        </div>
      </>
    );
  }

  const handleViewBooks = () => {
    navigate(`/books?university=${university.id}`);
  };

  const handleExternalLink = () => {
    if (university.website) {
      window.open(university.website, "_blank");
    }
  };

  return (
    <>
      <SEO
        title={`${university.name} - ReBooked Campus`}
        description={university.overview}
        keywords={`${university.name}, ${university.province}, South African university, ${university.abbreviation}`}
        url={`https://www.rebookedsolutions.co.za/university/${university.id}`}
      />

      <CampusNavbar />

      <div className="min-h-screen bg-gray-50">
        {/* Header Section - Mobile Optimized */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            {/* Back Button and Action Buttons Row */}
            <div className="flex flex-col space-y-4 mb-4 sm:mb-6">
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => navigate("/university-info")}
                className="text-book-600 hover:text-book-700 self-start text-xs sm:text-sm"
                size="sm"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Universities</span>
                <span className="sm:hidden">Back</span>
              </Button>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  onClick={handleExternalLink}
                  className="border-book-200 text-book-600 hover:bg-book-50 text-xs sm:text-sm"
                  size="sm"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Visit Website
                </Button>

                <Button
                  onClick={handleViewBooks}
                  className="bg-book-600 hover:bg-book-700 text-white text-xs sm:text-sm"
                  size="sm"
                >
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  View Books
                </Button>
              </div>
            </div>

            {/* University Logo and Info - Mobile Optimized */}
            <div className="space-y-4">
              {/* Logo and Basic Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                {university.logo && (
                  <img
                    src={university.logo}
                    alt={`${university.name} logo`}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-contain bg-white border border-gray-200 p-2 flex-shrink-0"
                  />
                )}
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                    {university.name}
                  </h1>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="text-xs sm:text-sm lg:text-base">
                        {university.location}, {university.province}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-book-50 text-book-700 text-xs sm:text-sm"
                    >
                      Public University
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Overview */}
              <Card className="mb-6 sm:mb-8">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    About {university.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {university.overview}
                  </p>
                </CardContent>
              </Card>

              {/* Application Information */}
              <UniversityApplicationInfo
                applicationInfo={university.applicationInfo}
                universityName={university.name}
                universityAbbreviation={university.abbreviation}
                website={university.website}
              />

              {/* Hero Image Section */}
              <Card className="mb-6 sm:mb-8">
                <CardContent className="p-0">
                  <div className="relative h-48 sm:h-64 bg-gradient-to-r from-book-100 to-book-200 rounded-t-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=300&fit=crop&crop=center"
                      alt="Students studying with books"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-book-600/20 to-book-700/20" />
                    <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6">
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">
                        Academic Excellence
                      </h2>
                      <p className="text-white/90 text-xs sm:text-sm lg:text-base">
                        Discover your path to success at{" "}
                        {university.abbreviation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Faculties */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    Faculties & Schools
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Click on any faculty to explore available programs and
                    courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {university.faculties && Array.isArray(university.faculties)
                      ? university.faculties.map((faculty, index) => {
                          // Safely handle undefined faculty or degrees
                          if (!faculty) return null;

                          const degreesCount =
                            faculty.degrees && Array.isArray(faculty.degrees)
                              ? faculty.degrees.length
                              : 0;

                          return (
                            <div
                              key={`${university.id}-${faculty.id || index}-${index}`}
                              className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-book-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
                              onClick={() =>
                                navigate(
                                  `/university/${university.id}/faculty/${faculty.id}`,
                                )
                              }
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2 group-hover:text-book-600 transition-colors leading-tight">
                                    {faculty.name || "Faculty Name"}
                                  </h3>
                                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3">
                                    {faculty.description ||
                                      "Faculty description will be available soon."}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <Badge
                                      variant="secondary"
                                      className="bg-book-50 text-book-700 text-xs"
                                    >
                                      {degreesCount} Programs
                                    </Badge>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-book-600 hover:text-book-700 hover:bg-book-50 p-1 h-auto"
                                    >
                                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>

                  {(!university.faculties ||
                    !Array.isArray(university.faculties) ||
                    university.faculties.length === 0) && (
                    <div className="text-center py-6 sm:py-8">
                      <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 text-sm sm:text-base">
                        Faculty information will be available soon.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    University Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="text-center p-3 sm:p-4 bg-book-50 rounded-lg">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-book-600 mx-auto mb-2" />
                      <div className="text-lg sm:text-2xl font-bold text-book-600">
                        {university.id === "uct"
                          ? "29,000+"
                          : university.id === "wits"
                            ? "40,000+"
                            : university.id === "stellenbosch"
                              ? "32,000+"
                              : university.id === "up"
                                ? "53,000+"
                                : "25,000+"}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Students
                      </div>
                    </div>

                    <div className="text-center p-3 sm:p-4 bg-book-50 rounded-lg">
                      <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-book-600 mx-auto mb-2" />
                      <div className="text-lg sm:text-2xl font-bold text-book-600">
                        {university.id === "uct"
                          ? "1829"
                          : university.id === "wits"
                            ? "1922"
                            : university.id === "stellenbosch"
                              ? "1918"
                              : university.id === "up"
                                ? "1908"
                                : "1959"}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Established
                      </div>
                    </div>

                    <div className="text-center p-3 sm:p-4 bg-book-50 rounded-lg">
                      <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-book-600 mx-auto mb-2" />
                      <div className="text-lg sm:text-2xl font-bold text-book-600">
                        {university.faculties &&
                        Array.isArray(university.faculties)
                          ? university.faculties.length
                          : 0}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Faculties
                      </div>
                    </div>

                    <div className="text-center p-3 sm:p-4 bg-book-50 rounded-lg">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-book-600 mx-auto mb-2" />
                      <div className="text-sm sm:text-lg font-bold text-book-600 truncate">
                        {university.province}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Province
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  <Button
                    onClick={handleViewBooks}
                    className="w-full bg-book-600 hover:bg-book-700 text-white text-xs sm:text-sm"
                  >
                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Browse Books for {university.abbreviation}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate("/university-info?tool=aps-calculator")
                    }
                    className="w-full border-book-200 text-book-600 hover:bg-book-50 text-xs sm:text-sm"
                  >
                    <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Check APS Requirements
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/university-info?tool=bursaries")}
                    className="w-full border-book-200 text-book-600 hover:bg-book-50 text-xs sm:text-sm"
                  >
                    <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Find Bursaries
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {university.website && (
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">
                        Website
                      </label>
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-book-600 hover:text-book-700 text-xs sm:text-sm underline break-all"
                      >
                        {university.website}
                      </a>
                    </div>
                  )}

                  {university.studentPortal && (
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">
                        Student Portal
                      </label>
                      <a
                        href={university.studentPortal}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-book-600 hover:text-book-700 text-xs sm:text-sm underline break-all"
                      >
                        Student Portal
                      </a>
                    </div>
                  )}

                  {university.admissionsContact && (
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">
                        Admissions
                      </label>
                      <a
                        href={`mailto:${university.admissionsContact}`}
                        className="text-book-600 hover:text-book-700 text-xs sm:text-sm underline break-all"
                      >
                        {university.admissionsContact}
                      </a>
                    </div>
                  )}

                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">
                      Location
                    </label>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {university.location}, {university.province}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Related Universities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    Other Universities in {university.province}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    {SOUTH_AFRICAN_UNIVERSITIES.filter(
                      (uni) =>
                        uni.province === university.province &&
                        uni.id !== university.id,
                    )
                      .slice(0, 3)
                      .map((uni) => (
                        <button
                          key={uni.id}
                          onClick={() => navigate(`/university/${uni.id}`)}
                          className="w-full text-left p-2 sm:p-3 rounded-lg border border-gray-200 hover:border-book-300 hover:bg-book-50 transition-colors"
                        >
                          <div className="font-medium text-gray-900 text-xs sm:text-sm">
                            {uni.abbreviation}
                          </div>
                          <div className="text-xs text-gray-600">
                            {uni.location}
                          </div>
                        </button>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniversityProfile;
