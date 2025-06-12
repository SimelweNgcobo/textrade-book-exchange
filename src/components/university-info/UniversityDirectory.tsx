import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  ExternalLink,
  BookOpen,
  Users,
  Calendar,
  Star,
} from "lucide-react";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";

const UniversityDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");

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

  // Enhanced logo mapping with proper file names
  const logoMap: Record<string, string> = {
    "university-of-witwatersrand":
      "/logos/universities/university-of-witwatersrand.svg",
    "university-of-johannesburg":
      "/logos/universities/university-of-johannesburg.svg",
    "university-of-cape-town":
      "/logos/universities/university-of-cape-town.svg",
    "stellenbosch-university":
      "/logos/universities/stellenbosch-university.svg",
    "university-of-pretoria": "/logos/universities/university-of-pretoria.svg",
    "university-of-kwazulu-natal":
      "/logos/universities/university-of-kwazulu-natal.svg",
    "university-of-the-free-state":
      "/logos/universities/university-of-free-state.svg",
    "nelson-mandela-university":
      "/logos/universities/nelson-mandela-university.svg",
    "rhodes-university": "/logos/universities/rhodes-university.svg",
    "university-of-venda": "/logos/universities/university-of-venda.svg",
    "university-of-limpopo": "/logos/universities/university-of-limpopo.svg",
    "university-of-zululand": "/logos/universities/university-of-zululand.svg",
    "university-of-mpumalanga":
      "/logos/universities/university-of-mpumalanga.svg",
    "university-of-north-west":
      "/logos/universities/university-of-north-west.svg",
    "tshwane-university-of-technology":
      "/logos/universities/tshwane-university-of-technology.svg",
    unisa: "/logos/universities/unisa.svg",
    // Add more mappings as needed
  };

  const getUniversityLogo = (universityName: string, id?: string) => {
    // First try to match by ID
    if (id && logoMap[id]) {
      return logoMap[id];
    }

    // Then try to match by name transformation
    const normalized = universityName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    return logoMap[normalized] || null;
  };

  const filteredUniversities = useMemo(() => {
    return SOUTH_AFRICAN_UNIVERSITIES.filter((university) => {
      const matchesSearch =
        university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.abbreviation
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        university.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesProvince =
        selectedProvince === "all" || university.province === selectedProvince;

      return matchesSearch && matchesProvince;
    });
  }, [searchTerm, selectedProvince]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              South African Universities Directory
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete directory of all South African universities with logos,
              contact information, and key details.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search universities by name, abbreviation, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="md:w-48">
                  <Select
                    value={selectedProvince}
                    onValueChange={setSelectedProvince}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Provinces" />
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
              </div>
            </CardHeader>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredUniversities.length} of{" "}
              {SOUTH_AFRICAN_UNIVERSITIES.length} universities
            </p>
          </div>

          {/* Universities List */}
          {filteredUniversities.length > 0 ? (
            <div className="space-y-4">
              {filteredUniversities.map((university) => {
                const logoUrl = getUniversityLogo(
                  university.name,
                  university.id,
                );

                return (
                  <Card
                    key={university.id}
                    className="hover:shadow-lg transition-shadow duration-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* University Logo - Proportionally Scaled */}
                        <div className="flex-shrink-0 flex justify-center lg:justify-start">
                          {logoUrl ? (
                            <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center">
                              <img
                                src={logoUrl}
                                alt={`${university.name} logo`}
                                className="max-w-full max-h-full object-contain"
                                style={{
                                  // Ensure logos maintain aspect ratio and fit naturally
                                  width: "auto",
                                  height: "auto",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                }}
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
                                className="logo-fallback w-20 h-20 lg:w-24 lg:h-24 bg-book-100 rounded-xl flex items-center justify-center"
                                style={{ display: "none" }}
                              >
                                <span className="text-book-600 font-bold text-lg lg:text-xl">
                                  {university.abbreviation}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-book-100 rounded-xl flex items-center justify-center">
                              <span className="text-book-600 font-bold text-lg lg:text-xl">
                                {university.abbreviation}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* University Information */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-start gap-3 mb-3">
                                <div>
                                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                                    {university.name}
                                  </h3>
                                  <p className="text-lg text-gray-600 font-medium">
                                    {university.abbreviation}
                                  </p>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className="bg-book-50 text-book-700"
                                >
                                  {university.type || "University"}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-2 mb-4">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600">
                                  {university.location}, {university.province}
                                </span>
                              </div>

                              <p className="text-gray-600 leading-relaxed mb-4">
                                {university.overview}
                              </p>

                              {/* University Stats */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-book-600" />
                                  <span className="text-sm text-gray-600">
                                    {university.studentCount || "25,000+"}{" "}
                                    Students
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <BookOpen className="h-4 w-4 text-book-600" />
                                  <span className="text-sm text-gray-600">
                                    {university.faculties?.length || "6"}{" "}
                                    Faculties
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-book-600" />
                                  <span className="text-sm text-gray-600">
                                    Est. {university.established || "1959"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-48">
                              <Button className="bg-book-600 hover:bg-book-700 text-white">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Visit Website
                              </Button>
                              <Button
                                variant="outline"
                                className="border-book-200 text-book-600 hover:bg-book-50"
                              >
                                <BookOpen className="h-4 w-4 mr-2" />
                                View Programs
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto" />
              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
                No universities found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or province filter.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedProvince("all");
                }}
                className="border-book-200 text-book-600 hover:bg-book-50"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityDirectory;
