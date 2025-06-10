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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              University Not Found
            </h1>
            <p className="text-gray-600 mb-6">
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
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate("/university-info")}
                className="text-book-600 hover:text-book-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Universities
              </Button>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleExternalLink}
                  className="border-book-200 text-book-600 hover:bg-book-50"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </Button>

                <Button
                  onClick={handleViewBooks}
                  className="bg-book-600 hover:bg-book-700 text-white"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Books
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {university.logo && (
                <img
                  src={university.logo}
                  alt={`${university.name} logo`}
                  className="w-16 h-16 rounded-lg object-contain bg-white border border-gray-200 p-2"
                />
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {university.name}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>
                      {university.location}, {university.province}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-book-50 text-book-700"
                  >
                    Public University
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>About {university.abbreviation}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {university.overview}
                  </p>
                </CardContent>
              </Card>

              {/* Hero Image Section */}
              <Card className="mb-8">
                <CardContent className="p-0">
                  <div className="relative h-64 bg-gradient-to-r from-book-100 to-book-200 rounded-t-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=300&fit=crop&crop=center"
                      alt="Students studying with books"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-book-600/20 to-book-700/20" />
                    <div className="absolute bottom-4 left-6">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Academic Excellence
                      </h2>
                      <p className="text-white/90">
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
                  <CardTitle>Faculties & Schools</CardTitle>
                  <CardDescription>
                    Click on any faculty to explore available programs and
                    courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {university.faculties.map((faculty) => (
                      <div
                        key={faculty.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-book-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
                        onClick={() =>
                          navigate(
                            `/university/${university.id}/faculty/${faculty.id}`,
                          )
                        }
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-book-600 transition-colors">
                              {faculty.name}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                              {faculty.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge
                                variant="secondary"
                                className="bg-book-50 text-book-700"
                              >
                                {faculty.degrees.length} Programs
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-book-600 hover:text-book-700 hover:bg-book-50 p-1"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {university.faculties.length === 0 && (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Faculty information will be available soon.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>University Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-book-50 rounded-lg">
                      <Users className="w-8 h-8 text-book-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-book-600">
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
                      <div className="text-sm text-gray-600">Students</div>
                    </div>

                    <div className="text-center p-4 bg-book-50 rounded-lg">
                      <Calendar className="w-8 h-8 text-book-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-book-600">
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
                      <div className="text-sm text-gray-600">Established</div>
                    </div>

                    <div className="text-center p-4 bg-book-50 rounded-lg">
                      <BookOpen className="w-8 h-8 text-book-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-book-600">
                        {university.faculties.length}
                      </div>
                      <div className="text-sm text-gray-600">Faculties</div>
                    </div>

                    <div className="text-center p-4 bg-book-50 rounded-lg">
                      <MapPin className="w-8 h-8 text-book-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-book-600">
                        {university.province}
                      </div>
                      <div className="text-sm text-gray-600">Province</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleViewBooks}
                    className="w-full bg-book-600 hover:bg-book-700 text-white"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Books for {university.abbreviation}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/university-info?tool=aps")}
                    className="w-full border-book-200 text-book-600 hover:bg-book-50"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Check APS Requirements
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/university-info?tool=bursaries")}
                    className="w-full border-book-200 text-book-600 hover:bg-book-50"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Find Bursaries
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {university.website && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Website
                      </label>
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-book-600 hover:text-book-700 text-sm underline"
                      >
                        {university.website}
                      </a>
                    </div>
                  )}

                  {university.studentPortal && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Student Portal
                      </label>
                      <a
                        href={university.studentPortal}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-book-600 hover:text-book-700 text-sm underline"
                      >
                        Student Portal
                      </a>
                    </div>
                  )}

                  {university.admissionsContact && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Admissions
                      </label>
                      <a
                        href={`mailto:${university.admissionsContact}`}
                        className="text-book-600 hover:text-book-700 text-sm underline"
                      >
                        {university.admissionsContact}
                      </a>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Location
                    </label>
                    <p className="text-sm text-gray-600">
                      {university.location}, {university.province}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Related Universities */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Other Universities in {university.province}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
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
                          className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-book-300 hover:bg-book-50 transition-colors"
                        >
                          <div className="font-medium text-gray-900 text-sm">
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
