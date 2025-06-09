import { useState, useMemo } from "react";
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
import { Search, MapPin, ExternalLink, BookOpen, Users } from "lucide-react";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";
import { University } from "@/types/university";

interface UniversityDirectoryProps {
  onUniversitySelect: (university: University) => void;
  onViewBooks: (universityId: string) => void;
}

const UniversityDirectory = ({
  onUniversitySelect,
  onViewBooks,
}: UniversityDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");

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

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-book-800">
          South African Universities
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore comprehensive information about South African universities,
          their programs, and admission requirements.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search universities by name, abbreviation, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedProvince} onValueChange={setSelectedProvince}>
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="Filter by province" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Provinces</SelectItem>
            {provinces.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* University Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((university) => (
          <Card
            key={university.id}
            className="hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-book-800 group-hover:text-book-600 transition-colors">
                    {university.abbreviation}
                  </CardTitle>
                  <CardDescription className="font-medium text-gray-700 mt-1">
                    {university.name}
                  </CardDescription>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                {university.location}, {university.province}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-3">
                {university.overview}
              </p>

              {/* Faculties Preview */}
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUniversitySelect(university)}
                  className="flex-1 text-xs"
                >
                  <Users className="h-3 w-3 mr-1" />
                  View Details
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onViewBooks(university.id)}
                  className="flex-1 text-xs bg-book-600 hover:bg-book-700"
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  Browse Books
                </Button>
              </div>

              {/* External Links */}
              {university.website && (
                <div className="pt-2 border-t">
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-book-600 hover:text-book-700 transition-colors"
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
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
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
    </div>
  );
};

export default UniversityDirectory;
