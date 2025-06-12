import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Users,
  Calendar,
  ChevronRight,
  Star,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";
import { University } from "@/types/university";

interface PopularUniversitiesProps {
  onUniversitySelect?: (university: University) => void;
  showViewAll?: boolean;
}

const PopularUniversities = ({
  onUniversitySelect,
  showViewAll = true,
}: PopularUniversitiesProps) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // Popular universities based on ranking, student numbers, and prestige
  const popularUniversityIds = [
    "uct",
    "wits",
    "stellenbosch",
    "up",
    "ukzn",
    "uj",
  ];

  const popularUniversities = SOUTH_AFRICAN_UNIVERSITIES.filter((uni) =>
    popularUniversityIds.includes(uni.id),
  );

  const displayUniversities = showAll
    ? SOUTH_AFRICAN_UNIVERSITIES
    : popularUniversities;

  const handleUniversityClick = (university: University) => {
    if (onUniversitySelect) {
      onUniversitySelect(university);
    } else {
      navigate(`/university/${university.id}`);
    }
  };

  const getUniversityStats = (universityId: string) => {
    const statsMap: Record<
      string,
      { students: string; established: string; faculties: number }
    > = {
      uct: { students: "29,000+", established: "1829", faculties: 6 },
      wits: { students: "40,000+", established: "1922", faculties: 5 },
      stellenbosch: { students: "32,000+", established: "1918", faculties: 10 },
      up: { students: "53,000+", established: "1908", faculties: 9 },
      ukzn: { students: "47,000+", established: "2004", faculties: 4 },
      uj: { students: "50,000+", established: "2005", faculties: 9 },
    };

    return (
      statsMap[universityId] || {
        students: "25,000+",
        established: "1959",
        faculties: 6,
      }
    );
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-book-100 rounded-full text-book-700 text-xs md:text-sm font-medium mb-3 md:mb-4">
            <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
            {showAll
              ? `All ${SOUTH_AFRICAN_UNIVERSITIES.length} Universities`
              : "Popular Choices"}
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            {showAll
              ? "Complete University Directory"
              : "Top Universities in South Africa"}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            {showAll
              ? "Browse our complete directory of South African universities and find your perfect match."
              : "Discover the most popular and prestigious universities chosen by thousands of students."}
          </p>
        </div>

        {/* Universities Grid - Improved mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {displayUniversities.map((university) => {
            const stats = getUniversityStats(university.id);

            return (
              <Card
                key={university.id}
                className="group cursor-pointer transition-all duration-200 hover:shadow-xl hover:border-book-300 border-2 border-transparent hover:scale-[1.02] h-full"
                onClick={() => handleUniversityClick(university)}
              >
                <CardHeader className="pb-3 md:pb-4 p-4 md:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-book-100 rounded-lg md:rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                        <span className="text-book-600 font-bold text-xs md:text-sm">
                          {university.abbreviation}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm md:text-lg text-gray-900 group-hover:text-book-600 transition-colors leading-tight">
                          {university.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 font-medium">
                          {university.abbreviation}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-book-600 transition-colors flex-shrink-0" />
                  </div>

                  <div className="flex items-center space-x-2 mt-2 md:mt-3">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-gray-600 truncate">
                      {university.location}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-book-50 text-book-700 text-xs flex-shrink-0"
                    >
                      {university.province}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 p-4 md:p-6 md:pt-0">
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
                    {university.overview}
                  </p>

                  {/* Quick Stats - Mobile optimized */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="text-center bg-gray-50 rounded-lg p-1.5 md:p-2">
                      <Users className="w-3 h-3 md:w-4 md:h-4 text-book-600 mx-auto mb-0.5 md:mb-1" />
                      <div className="text-xs font-semibold text-book-600">
                        {stats.students}
                      </div>
                      <div className="text-xs text-gray-500 hidden md:block">
                        Students
                      </div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-1.5 md:p-2">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-book-600 mx-auto mb-0.5 md:mb-1" />
                      <div className="text-xs font-semibold text-book-600">
                        {stats.established}
                      </div>
                      <div className="text-xs text-gray-500 hidden md:block">
                        Est.
                      </div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-1.5 md:p-2">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-book-600 mx-auto mb-0.5 md:mb-1" />
                      <div className="text-xs font-semibold text-book-600">
                        {stats.faculties}
                      </div>
                      <div className="text-xs text-gray-500 hidden md:block">
                        Faculties
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs md:text-sm border-book-200 text-book-600 hover:bg-book-50 py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUniversityClick(university);
                    }}
                  >
                    <span className="hidden md:inline">Explore University</span>
                    <span className="md:hidden">Explore</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Universities Button */}
        {showViewAll && !showAll && (
          <div className="text-center px-4">
            <Button
              onClick={() => setShowAll(true)}
              className="bg-book-600 hover:bg-book-700 text-white px-6 md:px-8 py-3 text-sm md:text-lg font-medium w-full sm:w-auto"
            >
              <span className="hidden sm:inline">
                View All {SOUTH_AFRICAN_UNIVERSITIES.length} Universities
              </span>
              <span className="sm:hidden">View All Universities</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Show Less Button */}
        {showAll && showViewAll && (
          <div className="text-center px-4">
            <Button
              variant="outline"
              onClick={() => setShowAll(false)}
              className="border-book-200 text-book-600 hover:bg-book-50 px-6 md:px-8 py-3 w-full sm:w-auto"
            >
              <span className="hidden sm:inline">
                Show Popular Universities Only
              </span>
              <span className="sm:hidden">Show Popular Only</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularUniversities;
