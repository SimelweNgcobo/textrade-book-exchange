import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Users,
  BookOpen,
  ExternalLink,
  GraduationCap,
  ArrowRight,
  Star,
  TrendingUp,
} from "lucide-react";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";
import { University } from "@/types/university";

interface UniversityExplorerProps {
  onUniversitySelect: (university: University) => void;
  onViewBooks: (universityId: string) => void;
}

const UniversityExplorer = ({
  onUniversitySelect,
  onViewBooks,
}: UniversityExplorerProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const provinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Northern Cape",
    "North West",
    "Western Cape",
  ];

  const filteredUniversities = useMemo(() => {
    return SOUTH_AFRICAN_UNIVERSITIES.filter((university) => {
      const matchesSearch =
        university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.abbreviation
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        university.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesProvince =
        !selectedProvince || university.province === selectedProvince;

      return matchesSearch && matchesProvince;
    });
  }, [searchTerm, selectedProvince]);

  const featuredUniversities = SOUTH_AFRICAN_UNIVERSITIES.slice(0, 3);

  const handleUniversityClick = (university: University) => {
    // Smooth scroll to details and select university
    document
      .getElementById("university-details")
      ?.scrollIntoView({ behavior: "smooth" });
    onUniversitySelect(university);
  };

  return (
    <section id="universities" className="py-16 bg-book-50">
      <div className="container mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-book-100 rounded-full text-book-700 text-sm font-medium mb-6">
            <Star className="h-4 w-4" />
            Explore 23+ South African Universities
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-book-600">Find Your Perfect</span>
            <br />
            <span className="text-gray-900">University Match</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Discover comprehensive information about South African universities,
            their programs, admission requirements, and connect with students
            selling textbooks on campus.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-book-600">23+</div>
              <div className="text-sm text-gray-600">Universities</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-book-600">9</div>
              <div className="text-sm text-gray-600">Provinces</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-book-600">100+</div>
              <div className="text-sm text-gray-600">Degree Programs</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-book-600">1000+</div>
              <div className="text-sm text-gray-600">Textbooks</div>
            </div>
          </div>
        </div>

        {/* Featured Universities Carousel */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Featured Universities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredUniversities.map((university) => (
              <Card
                key={university.id}
                className="group hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-book-600 rounded-xl flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-book-600 transition-colors">
                        {university.abbreviation}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {university.name}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {university.location}, {university.province}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {university.overview}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {university.faculties.slice(0, 2).map((faculty) => (
                      <Badge
                        key={faculty.id}
                        variant="secondary"
                        className="text-xs"
                      >
                        {faculty.name.replace("Faculty of ", "")}
                      </Badge>
                    ))}
                    {university.faculties.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{university.faculties.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUniversityClick(university)}
                      className="flex-1 text-xs group-hover:border-book-300 group-hover:bg-book-50"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onViewBooks(university.id)}
                      className="flex-1 text-xs bg-book-600 hover:bg-book-700"
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      Campus Books
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Search className="h-5 w-5 text-indigo-600" />
              Explore All Universities
            </CardTitle>
            <CardDescription>
              Search and filter through all South African universities to find
              your perfect match.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search universities by name, abbreviation, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                />
              </div>
              <Select
                value={selectedProvince || "all"}
                onValueChange={(value) =>
                  setSelectedProvince(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="sm:w-48">
                  <SelectValue placeholder="Filter by province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Provinces</SelectItem>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filteredUniversities.length} universities found</span>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  List
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Universities Grid */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredUniversities.map((university) => (
            <Card
              key={university.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/60 backdrop-blur-sm border-0 hover:bg-white/80"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {university.abbreviation}
                    </CardTitle>
                    <CardDescription className="font-medium text-gray-700 mt-1">
                      {university.name}
                    </CardDescription>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {university.location}, {university.province}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {university.overview}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-800">
                    Key Faculties:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {university.faculties.slice(0, 3).map((faculty) => (
                      <Badge
                        key={faculty.id}
                        variant="secondary"
                        className="text-xs"
                      >
                        {faculty.name
                          .replace("Faculty of ", "")
                          .replace("School of ", "")}
                      </Badge>
                    ))}
                    {university.faculties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{university.faculties.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUniversityClick(university)}
                    className="flex-1 text-xs border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
                  >
                    <Users className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onViewBooks(university.id)}
                    className="flex-1 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <BookOpen className="h-3 w-3 mr-1" />
                    Campus Books
                  </Button>
                </div>

                {university.website && (
                  <div className="pt-2 border-t border-gray-100">
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Official Website
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No universities found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or province filter.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedProvince("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Your University Journey?
            </h2>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Calculate your APS score, explore degree programs, and find the
              perfect university for your future.
            </p>
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("aps-calculator")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold"
            >
              Calculate Your APS Score
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversityExplorer;
