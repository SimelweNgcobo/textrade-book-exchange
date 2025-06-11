import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  TrendingUp,
  BookOpen,
  Users,
  Award,
  Target,
  CheckCircle,
  AlertCircle,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import CampusNavbar from "@/components/CampusNavbar";
import SEO from "@/components/SEO";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";
import { University, Faculty, Degree } from "@/types/university";

const CourseDetail = () => {
  const { universityId, facultyId, courseId } = useParams<{
    universityId: string;
    facultyId: string;
    courseId: string;
  }>();
  const navigate = useNavigate();
  const [university, setUniversity] = useState<University | null>(null);
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [course, setCourse] = useState<Degree | null>(null);

  useEffect(() => {
    if (universityId && facultyId && courseId) {
      const foundUniversity = SOUTH_AFRICAN_UNIVERSITIES.find(
        (uni) => uni.id === universityId,
      );
      if (foundUniversity) {
        setUniversity(foundUniversity);
        const foundFaculty = foundUniversity.faculties.find(
          (fac) => fac.id === facultyId,
        );
        if (foundFaculty) {
          setFaculty(foundFaculty);
          const foundCourse = foundFaculty.degrees.find(
            (deg) => deg.id === courseId,
          );
          setCourse(foundCourse || null);
        }
      }
    }
  }, [universityId, facultyId, courseId]);

  if (!university || !faculty || !course) {
    return (
      <>
        <CampusNavbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Course Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The course you're looking for doesn't exist.
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
    navigate(`/books?university=${universityId}&degree=${courseId}`);
  };

  const handleCalculateAPS = () => {
    navigate("/university-info?tool=aps");
  };

  // Graduation ceremony image for success theme
  const heroImage =
    "https://images.unsplash.com/photo-1627556704834-c5de8b97cf83?w=1200&h=400&fit=crop&crop=center";

  return (
    <>
      <SEO
        title={`${course.name} - ${university.abbreviation} - ReBooked Campus`}
        description={course.description}
        keywords={`${course.name}, ${faculty.name}, ${university.name}, course details, career prospects`}
        url={`https://www.rebookedsolutions.co.za/university/${university.id}/faculty/${faculty.id}/course/${course.id}`}
      />

      <CampusNavbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Graduation Theme */}
        <div className="relative bg-gradient-to-r from-book-600 to-book-700 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() =>
                  navigate(`/university/${universityId}/faculty/${facultyId}`)
                }
                className="text-white hover:text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {faculty.name}
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
                <h1 className="text-4xl font-bold mb-2">
                  {course.name || "Unknown Course"}
                </h1>
                <p className="text-xl opacity-90 mb-4">
                  {faculty?.name || "Unknown Faculty"} •{" "}
                  {university?.name || "Unknown University"}
                </p>
                <div className="flex items-center space-x-6 text-lg opacity-80">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    {course.duration || "Unknown Duration"}
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    APS: {course.apsRequirement || "N/A"}
                  </div>
                  <div className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    {course.faculty || "Unknown Faculty"}
                  </div>
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
              {/* Course Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {course.description ||
                      "Course description is not available at this time. Please contact the university for more information about this program."}
                  </p>
                </CardContent>
              </Card>

              {/* Subject Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Subject Requirements</CardTitle>
                  <CardDescription>
                    Minimum subject requirements for admission to this program
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(course.subjects || []).length > 0 ? (
                      (course.subjects || []).map((subject, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            {subject?.isRequired ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-orange-600" />
                            )}
                            <div>
                              <div className="font-semibold text-gray-900">
                                {subject?.name || "Unknown Subject"}
                              </div>
                              <div className="text-sm text-gray-600">
                                {subject?.isRequired
                                  ? "Required"
                                  : "Recommended"}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-book-600">
                              Level {subject?.level || "N/A"}
                            </div>
                            <div className="text-sm text-gray-600">
                              {(subject?.level || 0) >= 4 ? "Pass" : "Minimum"}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p>
                          No specific subject requirements listed for this
                          program.
                        </p>
                        <p className="text-sm mt-2">
                          Contact the university for detailed admission
                          requirements.
                        </p>
                      </div>
                    )}
                  </div>

                  <Alert className="mt-4 border-book-200 bg-book-50">
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription className="text-book-800">
                      <strong>APS Requirement:</strong> You need a minimum of{" "}
                      {course.apsRequirement} APS points to be considered for
                      admission to this program.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Career Prospects */}
              <Card>
                <CardHeader>
                  <CardTitle>Career Opportunities</CardTitle>
                  <CardDescription>
                    Potential career paths after completing this qualification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(course.careerProspects || []).length > 0 ? (
                      (course.careerProspects || []).map((career, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-book-50 rounded-lg"
                        >
                          <Award className="w-5 h-5 text-book-600 flex-shrink-0" />
                          <span className="font-medium text-gray-900">
                            {career || "Career opportunity"}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p>
                          Career information is being updated for this program.
                        </p>
                        <p className="text-sm mt-2">
                          Contact the university for detailed career guidance.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Course Structure */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Structure</CardTitle>
                  <CardDescription>
                    Typical course structure and progression
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.duration.includes("3") && (
                      <>
                        <div className="border-l-4 border-book-600 pl-4">
                          <h4 className="font-semibold text-gray-900">
                            Year 1: Foundation
                          </h4>
                          <p className="text-sm text-gray-600">
                            Core subjects and fundamental concepts in{" "}
                            {course.faculty.toLowerCase()}
                          </p>
                        </div>
                        <div className="border-l-4 border-book-500 pl-4">
                          <h4 className="font-semibold text-gray-900">
                            Year 2: Intermediate
                          </h4>
                          <p className="text-sm text-gray-600">
                            Specialized subjects and practical applications
                          </p>
                        </div>
                        <div className="border-l-4 border-book-400 pl-4">
                          <h4 className="font-semibold text-gray-900">
                            Year 3: Advanced
                          </h4>
                          <p className="text-sm text-gray-600">
                            Research projects, internships, and specialization
                          </p>
                        </div>
                      </>
                    )}

                    {course.duration.includes("4") && (
                      <>
                        <div className="border-l-4 border-book-600 pl-4">
                          <h4 className="font-semibold text-gray-900">
                            Year 1-2: Foundation
                          </h4>
                          <p className="text-sm text-gray-600">
                            Mathematical and scientific foundations
                          </p>
                        </div>
                        <div className="border-l-4 border-book-500 pl-4">
                          <h4 className="font-semibold text-gray-900">
                            Year 3: Specialization
                          </h4>
                          <p className="text-sm text-gray-600">
                            Core professional subjects and practical work
                          </p>
                        </div>
                        <div className="border-l-4 border-book-400 pl-4">
                          <h4 className="font-semibold text-gray-900">
                            Year 4: Professional
                          </h4>
                          <p className="text-sm text-gray-600">
                            Final project, industry placement, and capstone
                          </p>
                        </div>
                      </>
                    )}

                    {course.duration.includes("6") && (
                      <>
                        <div className="border-l-4 border-book-600 pl-4">
                          <h4 className="font-semibold text-gray-900">
                            Year 1-3: Pre-clinical
                          </h4>
                          <p className="text-sm text-gray-600">
                            Basic medical sciences and theoretical foundation
                          </p>
                        </div>
                        <div className="border-l-4 border-book-500 pl-4">
                          <h4 className="font-semibold text-gray-900">
                            Year 4-6: Clinical
                          </h4>
                          <p className="text-sm text-gray-600">
                            Hospital rotations and practical medical training
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Take Action</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleViewBooks}
                    className="w-full bg-book-600 hover:bg-book-700 text-white"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Find Textbooks
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleCalculateAPS}
                    className="w-full border-book-200 text-book-600 hover:bg-book-50"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Calculate My APS
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/university-info?tool=bursaries")}
                    className="w-full border-book-200 text-book-600 hover:bg-book-50"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Find Bursaries
                  </Button>
                </CardContent>
              </Card>

              {/* Course Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Program Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">
                      {course.duration || "N/A"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">APS Requirement</span>
                    <span className="font-semibold text-book-600">
                      {course.apsRequirement || "N/A"}{" "}
                      {course.apsRequirement && "points"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Faculty</span>
                    <span className="font-semibold">
                      {course.faculty || "N/A"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Career Options</span>
                    <span className="font-semibold">
                      {(course.careerProspects || []).length}+
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* University Info */}
              <Card>
                <CardHeader>
                  <CardTitle>University Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      University
                    </label>
                    <p className="text-sm text-gray-600">
                      {university?.name || "Unknown University"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Location
                    </label>
                    <p className="text-sm text-gray-600">
                      {university?.location || "Unknown Location"}
                      {university?.province && `, ${university.province}`}
                    </p>
                  </div>

                  {university.website && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Website
                      </label>
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-book-600 hover:text-book-700 underline"
                      >
                        Visit University Website
                      </a>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => navigate(`/university/${universityId}`)}
                    className="w-full border-book-200 text-book-600 hover:bg-book-50 mt-4"
                  >
                    View University Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Application Tips */}
              <Card className="border-book-200 bg-book-50">
                <CardHeader>
                  <CardTitle className="text-book-800">
                    Application Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-book-700">
                    <li>• Apply early to secure your place</li>
                    <li>• Meet all subject requirements</li>
                    <li>• Consider backup programs</li>
                    <li>• Apply for financial aid early</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
