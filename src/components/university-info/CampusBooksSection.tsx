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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BookOpen,
  Search,
  Filter,
  MapPin,
  DollarSign,
  User,
  ExternalLink,
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Info,
} from "lucide-react";
import { SOUTH_AFRICAN_UNIVERSITIES_SIMPLE } from "@/constants/universities";
import { COMMON_DEGREES } from "@/constants/degrees";

const CampusBooksSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [books, setBooks] = useState([]);

  // In a real implementation, this would fetch from your existing book service
  useEffect(() => {
    // This would be replaced with actual API call to your book service
    // fetchBooksFromMarketplace(filters).then(setBooks);
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        !searchQuery ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesUniversity =
        selectedUniversity === "all" || book.university === selectedUniversity;
      const matchesCourse =
        selectedCourse === "all" || book.course === selectedCourse;
      const matchesYear = selectedYear === "all" || book.year === selectedYear;
      const matchesPrice = !maxPrice || book.price <= parseInt(maxPrice);

      return (
        matchesSearch &&
        matchesUniversity &&
        matchesCourse &&
        matchesYear &&
        matchesPrice
      );
    });
  }, [
    books,
    searchQuery,
    selectedUniversity,
    selectedCourse,
    selectedYear,
    maxPrice,
  ]);

  const handleViewMarketplace = () => {
    const params = new URLSearchParams();
    if (selectedUniversity !== "all")
      params.set("university", selectedUniversity);
    if (selectedCourse !== "all") params.set("course", selectedCourse);
    if (selectedYear !== "all") params.set("year", selectedYear);
    if (maxPrice) params.set("maxPrice", maxPrice);

    const queryString = params.toString();
    navigate(`/books${queryString ? `?${queryString}` : ""}`);
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedUniversity("all");
    setSelectedCourse("all");
    setSelectedYear("all");
    setMaxPrice("");
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "like new":
      case "excellent":
        return "bg-green-100 text-green-800";
      case "very good":
      case "good":
        return "bg-blue-100 text-blue-800";
      case "fair":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUniversityName = (code: string) => {
    const university = SOUTH_AFRICAN_UNIVERSITIES_SIMPLE.find(
      (uni) => uni.code === code,
    );
    return university ? university.name : code.toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Campus Books</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Find affordable textbooks from students at your university. Search by
          course, year level, and more to discover the books you need at
          student-friendly prices.
        </p>
      </div>

      {/* Quick Access Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Looking for more books?</strong> Visit our{" "}
          <button
            onClick={() => navigate("/books")}
            className="underline font-medium hover:text-blue-900"
          >
            main marketplace
          </button>{" "}
          to browse thousands of textbooks from students across South Africa.
        </AlertDescription>
      </Alert>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {books.length}
              </div>
              <div className="text-sm text-gray-600">Books Available</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {[...new Set(books.map((book) => book.university))].length}
              </div>
              <div className="text-sm text-gray-600">Universities</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {[...new Set(books.map((book) => book.category))].length}
              </div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                R
                {Math.round(
                  books.reduce((sum, book) => sum + book.price, 0) /
                    books.length || 0,
                )}
              </div>
              <div className="text-sm text-gray-600">Avg. Price</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Books
          </CardTitle>
          <CardDescription>
            Find specific textbooks using our advanced search filters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by book title, author, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* University Filter */}
            <Select
              value={selectedUniversity}
              onValueChange={setSelectedUniversity}
            >
              <SelectTrigger>
                <SelectValue placeholder="University" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Universities</SelectItem>
                {SOUTH_AFRICAN_UNIVERSITIES_SIMPLE.map((uni) => (
                  <SelectItem key={uni.code} value={uni.code}>
                    {uni.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Course Filter */}
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {COMMON_DEGREES.map((degree) => (
                  <SelectItem key={degree.code} value={degree.code}>
                    {degree.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year Level Filter */}
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1st Year">1st Year</SelectItem>
                <SelectItem value="2nd Year">2nd Year</SelectItem>
                <SelectItem value="3rd Year">3rd Year</SelectItem>
                <SelectItem value="4th Year">4th Year</SelectItem>
                <SelectItem value="Postgraduate">Postgraduate</SelectItem>
              </SelectContent>
            </Select>

            {/* Max Price Filter */}
            <Input
              type="number"
              placeholder="Max Price (R)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={clearFilters}
                variant="outline"
                className="flex-1"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {filteredBooks.length === 0
              ? "No books found"
              : `${filteredBooks.length} book${filteredBooks.length === 1 ? "" : "s"} found`}
          </h2>
          <Button
            onClick={handleViewMarketplace}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Full Marketplace
          </Button>
        </div>

        {filteredBooks.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No books found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search criteria or browse our full
                  marketplace.
                </p>
                <Button onClick={handleViewMarketplace}>
                  Browse All Books
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <Card
                key={book.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleBookClick(book.id)}
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={getConditionColor(book.condition)}>
                      {book.condition}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{getUniversityName(book.university)}</span>
                    </div>

                    <div className="text-sm text-gray-500">
                      {book.year} • {book.category}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-lg font-bold text-green-600">
                        R{book.price}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <User className="h-3 w-3" />
                        <span>{book.seller}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">
              Can't find the book you need?
            </h3>
            <p className="text-gray-600">
              Browse our complete marketplace with thousands of textbooks from
              students across South Africa, or list your own books for sale.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleViewMarketplace} size="lg">
                <Search className="h-4 w-4 mr-2" />
                Browse Full Marketplace
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/create-listing")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Sell Your Books
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampusBooksSection;
