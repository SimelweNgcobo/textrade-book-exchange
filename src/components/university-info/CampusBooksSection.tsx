import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Search,
  Filter,
  Plus,
  ExternalLink,
  Users,
  Star,
  TrendingUp,
  MapPin,
  Calendar,
  ShoppingCart,
  Heart,
  Eye,
} from "lucide-react";
import { getBooks } from "@/services/book/bookQueries";
import { Book } from "@/types/book";
import {
  SOUTH_AFRICAN_UNIVERSITIES_SIMPLE,
  UNIVERSITY_YEARS,
} from "@/constants/universities";
import { toast } from "sonner";

interface CampusBooksSectionProps {
  selectedUniversity?: string;
  selectedDegree?: string;
}

const CampusBooksSection = ({
  selectedUniversity,
  selectedDegree,
}: CampusBooksSectionProps) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversityFilter, setSelectedUniversityFilter] = useState(
    selectedUniversity || "",
  );
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [sortBy, setSortBy] = useState<
    "newest" | "price-low" | "price-high" | "popular"
  >("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const loadBooks = async () => {
    setIsLoading(true);
    try {
      const filters: any = {};

      if (selectedUniversityFilter) {
        filters.university = selectedUniversityFilter;
      }

      if (selectedYear) {
        filters.universityYear = selectedYear;
      }

      if (searchQuery) {
        filters.search = searchQuery;
      }

      if (selectedCondition) {
        filters.condition = selectedCondition;
      }

      const loadedBooks = await getBooks(filters);
      let sortedBooks = Array.isArray(loadedBooks) ? loadedBooks : [];

      // Apply sorting
      switch (sortBy) {
        case "price-low":
          sortedBooks.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          sortedBooks.sort((a, b) => b.price - a.price);
          break;
        case "popular":
          // Sort by condition (New first, then Good, etc.)
          sortedBooks.sort((a, b) => {
            const conditionOrder = {
              New: 0,
              Good: 1,
              Better: 2,
              Average: 3,
              "Below Average": 4,
            };
            return (
              (conditionOrder[a.condition] || 5) -
              (conditionOrder[b.condition] || 5)
            );
          });
          break;
        case "newest":
        default:
          sortedBooks.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          break;
      }

      setBooks(sortedBooks);
    } catch (error) {
      console.error("Error loading campus books:", error);
      toast.error("Failed to load books. Please try again.");
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [
    selectedUniversityFilter,
    selectedYear,
    searchQuery,
    selectedCondition,
    sortBy,
  ]);

  const filteredBooks = useMemo(() => {
    let filtered = books;

    // Additional filtering for degree if specified
    if (selectedDegree && selectedDegree !== "") {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(selectedDegree.toLowerCase()) ||
          book.description
            .toLowerCase()
            .includes(selectedDegree.toLowerCase()) ||
          book.category.toLowerCase().includes(selectedDegree.toLowerCase()),
      );
    }

    return filtered;
  }, [books, selectedDegree]);

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  const handleViewFullMarketplace = () => {
    const params = new URLSearchParams();
    if (selectedUniversityFilter)
      params.set("university", selectedUniversityFilter);
    if (selectedYear) params.set("universityYear", selectedYear);
    if (searchQuery) params.set("search", searchQuery);

    navigate(`/books?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedUniversityFilter("");
    setSelectedYear("");
    setSelectedCondition("");
  };

  const getUniversityName = (universityId: string) => {
    const university = SOUTH_AFRICAN_UNIVERSITIES_SIMPLE.find(
      (u) => u.id === universityId,
    );
    return university ? university.abbreviation : universityId;
  };

  const BookCard = ({ book }: { book: Book }) => (
    <Card
      className="group hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-0 hover:bg-white hover:-translate-y-1"
      onClick={() => handleBookClick(book.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {/* Book Image */}
          <div className="w-20 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex-shrink-0 overflow-hidden shadow-md">
            {book.imageUrl ? (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
              {book.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              by {book.author}
            </CardDescription>

            {/* Price and Condition */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-bold text-green-600">
                R{book.price.toLocaleString()}
              </span>
              <Badge
                variant="secondary"
                className={`text-xs ${
                  book.condition === "New"
                    ? "bg-green-100 text-green-800"
                    : book.condition === "Good"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {book.condition}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* University and Year Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{book.seller.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {book.universityYear && (
              <Badge
                variant="outline"
                className="text-xs border-blue-200 text-blue-700"
              >
                {book.universityYear}
              </Badge>
            )}
            <Badge
              variant="outline"
              className="text-xs border-purple-200 text-purple-700"
            >
              {book.category}
            </Badge>
          </div>
        </div>

        {/* Description */}
        {book.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {book.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(book.createdAt).toLocaleDateString()}
          </span>
          <Button
            size="sm"
            className="h-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs"
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const topUniversities = ["uct", "wits", "stellenbosch", "up", "ukzn"];

  return (
    <section id="campus-books" className="py-16 bg-book-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-book-100 rounded-full text-book-700 text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4" />
            Campus Textbook Marketplace
          </div>
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-book-600">Find Textbooks</span>
            <br />
            <span className="text-gray-900">From Your Campus</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Connect with students at your university to buy and sell affordable
            textbooks. Support your campus community while saving money on
            course materials.
          </p>

          {/* Quick University Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={!selectedUniversityFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedUniversityFilter("")}
              className="rounded-full"
            >
              All Universities
            </Button>
            {topUniversities.map((uniId) => {
              const uni = SOUTH_AFRICAN_UNIVERSITIES_SIMPLE.find(
                (u) => u.id === uniId,
              );
              return uni ? (
                <Button
                  key={uniId}
                  variant={
                    selectedUniversityFilter === uniId ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedUniversityFilter(uniId)}
                  className="rounded-full"
                >
                  {uni.abbreviation}
                </Button>
              ) : null;
            })}
          </div>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Find Your Textbooks
            </CardTitle>
            <CardDescription>
              Search and filter through thousands of textbooks listed by
              students across South African universities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search books by title, author, subject, or course code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <Select
                value={selectedUniversityFilter || "all"}
                onValueChange={(value) =>
                  setSelectedUniversityFilter(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="Select university" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Universities</SelectItem>
                  {SOUTH_AFRICAN_UNIVERSITIES_SIMPLE.map((university) => (
                    <SelectItem key={university.id} value={university.id}>
                      {university.abbreviation} - {university.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedYear || "all"}
                onValueChange={(value) =>
                  setSelectedYear(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="Year level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {UNIVERSITY_YEARS.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedCondition || "all"}
                onValueChange={(value) =>
                  setSelectedCondition(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Better">Better</SelectItem>
                  <SelectItem value="Average">Average</SelectItem>
                  <SelectItem value="Below Average">Below Average</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={(
                  value: "newest" | "price-low" | "price-high" | "popular",
                ) => setSortBy(value)}
              >
                <SelectTrigger className="border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={viewMode}
                onValueChange={(value: "grid" | "list") => setViewMode(value)}
              >
                <SelectTrigger className="border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid View</SelectItem>
                  <SelectItem value="list">List View</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-gray-300 hover:border-blue-400"
              >
                Clear Filters
              </Button>
            </div>

            {/* Active Filters Display */}
            {(selectedUniversityFilter ||
              selectedYear ||
              selectedCondition ||
              searchQuery) && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedUniversityFilter && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    University: {getUniversityName(selectedUniversityFilter)}
                  </Badge>
                )}
                {selectedYear && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    Year: {selectedYear}
                  </Badge>
                )}
                {selectedCondition && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    Condition: {selectedCondition}
                  </Badge>
                )}
                {searchQuery && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    Search: "{searchQuery}"
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary and Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-gray-600">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
                Loading textbooks...
              </div>
            ) : (
              <span className="font-medium">
                {filteredBooks.length} textbooks found
                {selectedUniversityFilter &&
                  ` at ${getUniversityName(selectedUniversityFilter)}`}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewFullMarketplace}
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Browse All Books
            </Button>
            <Button
              size="sm"
              onClick={() => navigate("/create-listing")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              List Your Books
            </Button>
          </div>
        </div>

        {/* Books Grid/List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="animate-pulse bg-white/60">
                <CardHeader>
                  <div className="flex gap-3">
                    <div className="w-20 h-24 bg-gray-200 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : filteredBooks.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No textbooks found
            </h3>
            <p className="text-gray-600 mb-6">
              No textbooks match your current search criteria. Try adjusting
              your filters or search terms.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
              <Button
                onClick={() => navigate("/create-listing")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Be the First to List Books
              </Button>
            </div>
          </div>
        )}

        {/* Helpful Tips */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Alert className="border-green-200 bg-green-50">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Buying Tips:</strong> Contact sellers directly to
              negotiate prices, ask about book condition, and arrange safe
              pickup locations on campus.
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-200 bg-blue-50">
            <Star className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Selling Tips:</strong> Take clear photos, provide accurate
              descriptions, and price competitively to sell your books quickly
              to fellow students.
            </AlertDescription>
          </Alert>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Join the Campus Community
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Be part of a growing community of students helping each other
                succeed. Buy affordable textbooks and sell the ones you no
                longer need.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate("/create-listing")}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Start Selling Your Books
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleViewFullMarketplace}
                  className="border-white text-white hover:bg-white/10"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Explore All Textbooks
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CampusBooksSection;
