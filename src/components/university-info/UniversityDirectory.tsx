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

  // Correct logo mapping based on actual university IDs and names from the database
  const logoMap: Record<string, string> = {
    // Traditional Universities - based on actual IDs from complete-sa-universities.ts
    uct: "/logos/universities/university-of-cape-town.svg",
    wits: "/logos/universities/university-of-witwatersrand.svg",
    stellenbosch: "/logos/universities/stellenbosch-university.svg",
    up: "/logos/universities/university-of-pretoria.svg",
    ukzn: "/logos/universities/university-of-kwazulu-natal.svg",
    ru: "/logos/universities/rhodes-university.svg",
    nwu: "/logos/universities/north-west-university.svg",
    ufs: "/logos/universities/university-of-free-state.svg",
    uwc: "/logos/universities/university-of-western-cape.svg",
    ufh: "/logos/universities/university-of-fort-hare.svg",
    ul: "/logos/universities/university-of-limpopo.svg",

    // Universities of Technology - based on actual IDs
    cput: "/logos/universities/cape-peninsula-university-of-technology.svg",
    dut: "/logos/universities/durban-university-of-technology.svg",
    tut: "/logos/universities/tshwane-university-of-technology.svg",
    vut: "/logos/universities/vaal-university-of-technology.svg",
    cut: "/logos/universities/central-university-of-technology.svg",
    mut: "/logos/universities/mangosuthu-university-of-technology.svg",

    // Comprehensive Universities - based on actual IDs
    uj: "/logos/universities/university-of-johannesburg.svg",
    unizulu: "/logos/universities/university-of-zululand.svg",
    wsu: "/logos/universities/walter-sisulu-university.svg",
    univen: "/logos/universities/university-of-venda.svg",
    ump: "/logos/universities/university-of-mpumalanga.svg",
    spu: "/logos/universities/sol-plaatje-university.svg",

    // Specialized Universities - based on actual IDs
    unisa: "/logos/universities/unisa.svg",
    smu: "/logos/universities/sefako-makgatho-health-sciences-university.svg",
    nmu: "/logos/universities/nelson-mandela-university.svg",
  };

  const getUniversityLogo = (university: any) => {
    // First try to match by university ID (most reliable)
    if (university.id && logoMap[university.id]) {
      return logoMap[university.id];
    }

    // Try to match by abbreviation (lowercase)
    if (
      university.abbreviation &&
      logoMap[university.abbreviation.toLowerCase()]
    ) {
      return logoMap[university.abbreviation.toLowerCase()];
    }

    // Fallback: try to match by name transformation
    const normalized = university.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/--+/g, "-");

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
              Complete directory of all {SOUTH_AFRICAN_UNIVERSITIES.length}{" "}
              South African universities with logos, contact information, and
              key details.
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
            <div className="space-y-6">
              {filteredUniversities.map((university) => {
                const logoUrl = getUniversityLogo(university);

                return (
                  <Card
                    key={university.id}
                    className="hover:shadow-lg transition-shadow duration-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* University Logo - Naturally Proportioned */}
                        <div className="flex-shrink-0 flex justify-center lg:justify-start">
                          {logoUrl ? (
                            <div className="flex items-center justify-center min-w-[100px] min-h-[80px] max-w-[150px] max-h-[120px]">
                              <img
                                src={logoUrl}
                                alt={`${university.name} logo`}
                                className="max-w-full max-h-full object-contain"
                                style={{
                                  // Natural proportional scaling - logos can be different sizes
                                  width: "auto",
                                  height: "auto",
                                  maxWidth: "150px",
                                  maxHeight: "120px",
                                  minWidth: "80px",
                                  minHeight: "60px",
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
                                className="logo-fallback w-24 h-24 lg:w-28 lg:h-28 bg-book-100 rounded-xl flex items-center justify-center"
                                style={{ display: "none" }}
                              >
                                <span className="text-book-600 font-bold text-lg lg:text-xl">
                                  {university.abbreviation}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="w-24 h-24 lg:w-28 lg:h-28 bg-book-100 rounded-xl flex items-center justify-center">
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
                                    {university.studentPopulation
                                      ? `${university.studentPopulation.toLocaleString()}+`
                                      : "25,000+"}{" "}
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
                                    Est.{" "}
                                    {university.establishedYear ||
                                      university.established ||
                                      "1959"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-48">
                              <Button
                                className="bg-book-600 hover:bg-book-700 text-white"
                                onClick={() =>
                                  university.website &&
                                  window.open(university.website, "_blank")
                                }
                              >
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
              <Search className="h-12 w-12 mx-auto text-gray-400" />
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
