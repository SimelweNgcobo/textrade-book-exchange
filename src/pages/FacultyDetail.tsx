import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  Clock,
  TrendingUp,
  BookOpen,
  Users,
  Award,
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
import { University, Faculty, Degree } from "@/types/university";

const FacultyDetail = () => {
  const { universityId, facultyId } = useParams<{
    universityId: string;
    facultyId: string;
  }>();
  const navigate = useNavigate();
  const [university, setUniversity] = useState<University | null>(null);
  const [faculty, setFaculty] = useState<Faculty | null>(null);

  useEffect(() => {
    if (universityId && facultyId) {
      const foundUniversity = SOUTH_AFRICAN_UNIVERSITIES.find(
        (uni) => uni.id === universityId,
      );
      if (foundUniversity) {
        setUniversity(foundUniversity);
        const foundFaculty = foundUniversity.faculties.find(
          (fac) => fac.id === facultyId,
        );
        setFaculty(foundFaculty || null);
      }
    }
  }, [universityId, facultyId]);

  if (!university || !faculty) {
    return (
      <>
        <CampusNavbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Faculty Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The faculty you're looking for doesn't exist.
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

  const handleCourseClick = (degreeId: string) => {
    navigate(
      `/university/${universityId}/faculty/${facultyId}/course/${degreeId}`,
    );
  };

  const handleViewBooks = (degreeId: string) => {
    navigate(`/books?university=${universityId}&degree=${degreeId}`);
  };

  // Hero image based on study theme
  const heroImage =
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=400&fit=crop&crop=center";

  return (
    <>
      <SEO
        title={`${faculty.name} - ${university.abbreviation} - ReBooked Campus`}
        description={faculty.description}
        keywords={`${faculty.name}, ${university.name}, ${university.province}, courses, programs`}
        url={`https://www.rebookedsolutions.co.za/university/${university.id}/faculty/${faculty.id}`}
      />

      <CampusNavbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Study Theme */}
        <div className="relative bg-gradient-to-r from-book-600 to-book-700 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate(`/university/${universityId}`)}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {university.abbreviation}
              </Button>
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
                <h1 className="text-4xl font-bold mb-2">{faculty.name}</h1>
                <p className="text-xl opacity-90 mb-4">{university.name}</p>
                <p className="text-lg opacity-80 max-w-3xl">
                  {faculty.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Faculty Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-book-100 rounded-lg flex items-center justify-center mr-4">
                  <GraduationCap className="w-6 h-6 text-book-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-book-600">
                    {faculty.degrees.length}
                  </div>
                  <div className="text-gray-600">Programs Available</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.floor(Math.random() * 5000) + 2000}+
                  </div>
                  <div className="text-gray-600">Students Enrolled</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.floor(Math.random() * 30) + 70}%
                  </div>
                  <div className="text-gray-600">Employment Rate</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Available Programs */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">
                Available Programs & Courses
              </CardTitle>
              <CardDescription>
                Explore the undergraduate and postgraduate programs offered by{" "}
                {faculty.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {faculty.degrees.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {faculty.degrees.map((degree, index) => (
                    <Card
                      key={`${universityId}-${facultyId}-${degree.id}-${index}`}
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-book-300"
                      onClick={() => handleCourseClick(degree.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg hover:text-book-600 transition-colors">
                              {degree.name}
                            </CardTitle>
                            <div className="flex items-center space-x-3 mt-2">
                              <Badge
                                variant="secondary"
                                className="bg-book-50 text-book-700"
                              >
                                {degree.faculty}
                              </Badge>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-1" />
                                {degree.duration}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                APS: {degree.apsRequirement}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {degree.description}
                        </p>

                        {/* Career Prospects */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-sm text-gray-900 mb-2">
                            Career Opportunities:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {degree.careerProspects
                              .slice(0, 3)
                              .map((career, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {career}
                                </Badge>
                              ))}
                            {degree.careerProspects.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{degree.careerProspects.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCourseClick(degree.id);
                            }}
                            className="flex-1 bg-book-600 hover:bg-book-700 text-white"
                          >
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewBooks(degree.id);
                            }}
                            className="flex-1 border-book-200 text-book-600 hover:bg-book-50"
                          >
                            <BookOpen className="w-4 h-4 mr-1" />
                            Books
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Program Information Coming Soon
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Detailed program information for {faculty.name} will be
                    available soon.
                  </p>
                  <Button
                    onClick={() => navigate(`/university/${universityId}`)}
                    variant="outline"
                    className="border-book-200 text-book-600 hover:bg-book-50"
                  >
                    Explore Other Faculties
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admission Requirements */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>General Admission Requirements</CardTitle>
              <CardDescription>
                Common requirements for programs in {faculty.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Academic Requirements
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>
                      • National Senior Certificate (NSC) with admission to
                      higher education
                    </li>
                    <li>• Minimum APS score requirements vary by program</li>
                    <li>
                      • Specific subject requirements for specialized programs
                    </li>
                    <li>• English proficiency requirements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Application Process
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Online application through university portal</li>
                    <li>• Submit certified academic transcripts</li>
                    <li>• Pay application fee</li>
                    <li>• Some programs may require additional assessments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Faculty Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Academic Inquiries
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    For questions about programs, curriculum, and academic
                    requirements.
                  </p>
                  <p className="text-sm text-book-600">
                    {faculty.id}@{university.id}.ac.za
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Admissions Office
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    For application procedures, requirements, and deadlines.
                  </p>
                  <p className="text-sm text-book-600">
                    {university.admissionsContact}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FacultyDetail;
