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

// Mock book data that would normally come from your actual book service
const SAMPLE_CAMPUS_BOOKS = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Engineering Mathematics 4th Edition",
    author: "K.A. Stroud",
    university: "uct",
    course: "beng-civil",
    year: "1st Year",
    price: 450,
    condition: "Excellent",
    seller: "Sarah M.",
    location: "Cape Town",
    description:
      "Complete textbook with all chapters. Perfect for first year engineering students.",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=250&fit=crop",
    category: "Engineering",
    availability: "Available",
  },
  {
    id: "book-2",
    title: "Principles of Accounting Vol 1 & 2",
    author: "Weygandt, Kimmel & Kieso",
    university: "wits",
    course: "bcom-accounting",
    year: "1st Year",
    price: 380,
    condition: "Good",
    seller: "Michael K.",
    location: "Johannesburg",
    description:
      "Both volumes included. Some highlighting but all pages intact.",
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=200&h=250&fit=crop",
    category: "Commerce",
    availability: "Available",
  },
  {
    id: "book-3",
    title: "Anatomy & Physiology for Health Professionals",
    author: "Booth, Waugh & Grant",
    university: "uct",
    course: "mbchb",
    year: "1st Year",
    price: 890,
    condition: "Like New",
    seller: "Dr. Patricia L.",
    location: "Cape Town",
    description:
      "Latest edition with access code still valid. Excellent condition.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=250&fit=crop",
    category: "Health Sciences",
    availability: "Available",
  },
  {
    id: "book-4",
    title: "Introduction to Psychology 6th Edition",
    author: "Plotnik & Kouyoumdjian",
    university: "stellenbosch",
    course: "ba-psychology",
    year: "1st Year",
    price: 320,
    condition: "Good",
    seller: "Emma R.",
    location: "Stellenbosch",
    description:
      "Well-maintained book with minimal notes. Great for psych students.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=250&fit=crop",
    category: "Humanities",
    availability: "Available",
  },
  {
    id: "book-5",
    title: "Fundamentals of Corporate Finance",
    author: "Ross, Westerfield & Jordan",
    university: "up",
    course: "bcom-business-management",
    year: "2nd Year",
    price: 520,
    condition: "Excellent",
    seller: "James T.",
    location: "Pretoria",
    description:
      "Latest edition with case studies. Perfect for finance modules.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=250&fit=crop",
    category: "Commerce",
    availability: "Available",
  },
  {
    id: "book-6",
    title: "Organic Chemistry 8th Edition",
    author: "Vollhardt & Schore",
    university: "ukzn",
    course: "bsc-chemistry",
    year: "2nd Year",
    price: 750,
    condition: "Good",
    seller: "Priya S.",
    location: "Durban",
    description:
      "Comprehensive organic chemistry textbook. Some notes included.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=250&fit=crop",
    category: "Science",
    availability: "Available",
  },
];

const CampusBooksSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [books, setBooks] = useState(SAMPLE_CAMPUS_BOOKS);

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

    navigate(`/books?${params.toString()}`);
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "like new":
        return "bg-green-100 text-green-800 border-green-200";
      case "excellent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "good":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const universities = SOUTH_AFRICAN_UNIVERSITIES_SIMPLE;
  const courses = COMMON_DEGREES;
  const years = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "Masters",
    "Doctorate",
  ];

  return (
    <div className="space-y-8">
      {/* Header with Books Image */}
      <div className="relative text-center space-y-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=400&fit=crop&crop=center"
            alt="Stack of study books and textbooks"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50/85 to-red-50/85" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-8 h-8 text-book-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Campus Books Marketplace
            </h2>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Find affordable textbooks from students at your university. Buy and
            sell books specific to your courses and save money on your studies.
          </p>
        </div>
      </div>

      {/* Integration Notice */}
      <Alert className="border-book-200 bg-book-50">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-book-800">
          <strong>Seamless Integration:</strong> This section connects directly
          to the ReBooked marketplace. Filter by your university and course to
          find exactly what you need for your studies.
        </AlertDescription>
      </Alert>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Find Books for Your Course</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by book title, author, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              value={selectedUniversity}
              onValueChange={setSelectedUniversity}
            >
              <SelectTrigger>
                <SelectValue placeholder="University" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Universities</SelectItem>
                {universities.map((uni) => (
                  <SelectItem key={uni.id} value={uni.id}>
                    {uni.abbreviation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Max Price (R)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredBooks.length} books
            </p>
            <Button
              onClick={handleViewMarketplace}
              className="bg-book-600 hover:bg-book-700 text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Marketplace
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Engineering",
              "Commerce",
              "Health Sciences",
              "Science",
              "Humanities",
              "Law",
              "Education",
              "IT",
            ].map((category) => (
              <Button
                key={category}
                variant="outline"
                onClick={() => setSearchQuery(category)}
                className="border-book-200 text-book-600 hover:bg-book-50 h-auto py-3"
              >
                <div className="text-center">
                  <div className="font-semibold">{category}</div>
                  <div className="text-xs text-gray-500">
                    {books.filter((b) => b.category === category).length} books
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          const university = universities.find((u) => u.id === book.university);

          return (
            <Card
              key={book.id}
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-book-300 border-2 border-transparent"
              onClick={() => handleBookClick(book.id)}
            >
              <CardHeader className="pb-3">
                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-book-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600">{book.author}</p>

                  <div className="flex items-center justify-between">
                    <Badge className={getConditionColor(book.condition)}>
                      {book.condition}
                    </Badge>
                    <div className="text-lg font-bold text-book-600">
                      R{book.price}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* University & Course */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-600">
                        {university?.abbreviation}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-book-50 text-book-700 text-xs"
                    >
                      {book.year}
                    </Badge>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-600">{book.seller}</span>
                    </div>
                    <span className="text-gray-500">{book.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {book.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-book-600 hover:bg-book-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookClick(book.id);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-book-200 text-book-600 hover:bg-book-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to wishlist functionality
                      }}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No books found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or check the full marketplace for
            more options.
          </p>
          <Button
            onClick={handleViewMarketplace}
            className="bg-book-600 hover:bg-book-700 text-white"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Browse Full Marketplace
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <Card className="border-book-200 bg-book-50">
        <CardHeader>
          <CardTitle className="text-book-800">Sell Your Books Too!</CardTitle>
          <CardDescription className="text-book-700">
            Turn your old textbooks into cash and help fellow students save
            money.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center bg-white rounded-lg p-4">
              <DollarSign className="w-8 h-8 text-book-600 mx-auto mb-2" />
              <h4 className="font-semibold text-book-800">Earn Money</h4>
              <p className="text-sm text-book-700">
                Get cash for books you no longer need
              </p>
            </div>
            <div className="text-center bg-white rounded-lg p-4">
              <Truck className="w-8 h-8 text-book-600 mx-auto mb-2" />
              <h4 className="font-semibold text-book-800">Easy Delivery</h4>
              <p className="text-sm text-book-700">
                Built-in shipping and tracking system
              </p>
            </div>
            <div className="text-center bg-white rounded-lg p-4">
              <Star className="w-8 h-8 text-book-600 mx-auto mb-2" />
              <h4 className="font-semibold text-book-800">Trusted Platform</h4>
              <p className="text-sm text-book-700">
                Safe transactions with verified users
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/create-listing")}
              className="bg-book-600 hover:bg-book-700 text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              List Your Books
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampusBooksSection;
