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
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-book-100 rounded-full text-book-700 text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            {showAll
              ? `All ${SOUTH_AFRICAN_UNIVERSITIES.length} Universities`
              : "Popular Choices"}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {showAll
              ? "Complete University Directory"
              : "Top Universities in South Africa"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {showAll
              ? "Browse our complete directory of South African universities and find your perfect match."
              : "Discover the most popular and prestigious universities chosen by thousands of students."}
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayUniversities.map((university) => {
            const stats = getUniversityStats(university.id);

            return (
              <Card
                key={university.id}
                className="group cursor-pointer transition-all duration-200 hover:shadow-xl hover:border-book-300 border-2 border-transparent hover:scale-[1.02]"
                onClick={() => handleUniversityClick(university)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {university.logo ? (
                        <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 p-2 flex items-center justify-center shadow-sm">
                          <img
                            src={university.logo}
                            alt={`${university.name} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const fallback =
                                target.parentElement?.querySelector(
                                  ".logo-fallback",
                                );
                              if (fallback)
                                (fallback as HTMLElement).style.display =
                                  "flex";
                            }}
                          />
                          <div
                            className="logo-fallback w-full h-full bg-book-100 rounded-lg flex items-center justify-center"
                            style={{ display: "none" }}
                          >
                            <span className="text-book-600 font-bold text-sm">
                              {university.abbreviation}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-14 h-14 bg-book-100 rounded-xl flex items-center justify-center shadow-sm">
                          <span className="text-book-600 font-bold text-sm">
                            {university.abbreviation}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-book-600 transition-colors leading-tight">
                          {university.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                          {university.abbreviation}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-book-600 transition-colors flex-shrink-0" />
                  </div>

                  <div className="flex items-center space-x-2 mt-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {university.location}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-book-50 text-book-700 text-xs"
                    >
                      {university.province}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {university.overview}
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                      <Users className="w-4 h-4 text-book-600 mx-auto mb-1" />
                      <div className="text-xs font-semibold text-book-600">
                        {stats.students}
                      </div>
                      <div className="text-xs text-gray-500">Students</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                      <Calendar className="w-4 h-4 text-book-600 mx-auto mb-1" />
                      <div className="text-xs font-semibold text-book-600">
                        {stats.established}
                      </div>
                      <div className="text-xs text-gray-500">Est.</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                      <Star className="w-4 h-4 text-book-600 mx-auto mb-1" />
                      <div className="text-xs font-semibold text-book-600">
                        {stats.faculties}
                      </div>
                      <div className="text-xs text-gray-500">Faculties</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs border-book-200 text-book-600 hover:bg-book-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUniversityClick(university);
                    }}
                  >
                    Explore University
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Universities Button */}
        {showViewAll && !showAll && (
          <div className="text-center">
            <Button
              onClick={() => setShowAll(true)}
              className="bg-book-600 hover:bg-book-700 text-white px-8 py-3 text-lg font-medium"
            >
              View All {SOUTH_AFRICAN_UNIVERSITIES.length} Universities
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Show Less Button */}
        {showAll && showViewAll && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(false)}
              className="border-book-200 text-book-600 hover:bg-book-50 px-8 py-3"
            >
              Show Popular Universities Only
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularUniversities;
