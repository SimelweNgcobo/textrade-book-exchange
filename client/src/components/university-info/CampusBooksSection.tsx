
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Search,
  Filter,
  University,
  GraduationCap,
  Star,
  ExternalLink,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities/index";
import { COMMON_DEGREES } from "@/constants/degrees";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  price: number;
  condition: "New" | "Used - Good" | "Used - Fair" | "Used - Poor";
  description: string;
  university: string;
  degree: string;
  year: string;
  subject: string;
  imageUrl?: string;
  seller: {
    name: string;
    rating: number;
    reviewCount: number;
  };
  availability: "Available" | "Sold" | "Reserved";
}

// Sample book data for demonstration
const SAMPLE_BOOKS: Book[] = [
  {
    id: "1",
    title: "Introduction to Accounting Principles",
    author: "Smith, J. & Johnson, A.",
    isbn: "978-0-123456-78-9",
    price: 450,
    condition: "Used - Good",
    description: "Comprehensive textbook covering fundamental accounting principles. Minor highlighting, good condition.",
    university: "uct",
    degree: "bcom-accounting",
    year: "1st Year",
    subject: "Accounting",
    seller: {
      name: "Sarah M.",
      rating: 4.8,
      reviewCount: 23,
    },
    availability: "Available",
  },
  {
    id: "2",
    title: "Engineering Mathematics Volume 1",
    author: "Brown, K.A.",
    isbn: "978-0-987654-32-1",
    price: 650,
    condition: "New",
    description: "Brand new textbook, still in wrapper. Perfect for first-year engineering students.",
    university: "wits",
    degree: "beng-civil",
    year: "1st Year",
    subject: "Mathematics",
    seller: {
      name: "Mike T.",
      rating: 4.9,
      reviewCount: 45,
    },
    availability: "Available",
  },
  {
    id: "3",
    title: "Fundamentals of Chemistry",
    author: "Wilson, P. et al.",
    price: 380,
    condition: "Used - Good",
    description: "Well-maintained chemistry textbook with some notes in margins.",
    university: "up",
    degree: "bsc-chemistry",
    year: "1st Year",
    subject: "Chemistry",
    seller: {
      name: "Lisa R.",
      rating: 4.6,
      reviewCount: 18,
    },
    availability: "Available",
  },
];

const CampusBooksSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>(SAMPLE_BOOKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("");
  const [selectedDegree, setSelectedDegree] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedCondition, setSelectedCondition] = useState<string>("");
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "newest" | "rating">("newest");

  // Initialize filters from URL params
  useEffect(() => {
    const university = searchParams.get("university");
    const degree = searchParams.get("degree");
    if (university) setSelectedUniversity(university);
    if (degree) setSelectedDegree(degree);
  }, [searchParams]);

  // Get available degrees for selected university
  const availableDegrees = useMemo(() => {
    if (!selectedUniversity) return COMMON_DEGREES;
    
    const university = SOUTH_AFRICAN_UNIVERSITIES.find(u => u.id === selectedUniversity);
    if (!university) return COMMON_DEGREES;

    const degrees = university.faculties.flatMap(faculty => 
      faculty.degrees.map(degree => ({
        id: degree.id,
        name: degree.name,
        code: degree.code || degree.id,
        faculty: degree.faculty,
      }))
    );
    
    return degrees;
  }, [selectedUniversity]);

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = books.filter((book) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !book.title.toLowerCase().includes(query) &&
          !book.author.toLowerCase().includes(query) &&
          !book.subject.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // University filter
      if (selectedUniversity && book.university !== selectedUniversity) {
        return false;
      }

      // Degree filter
      if (selectedDegree && book.degree !== selectedDegree) {
        return false;
      }

      // Year filter
      if (selectedYear && book.year !== selectedYear) {
        return false;
      }

      // Condition filter
      if (selectedCondition && book.condition !== selectedCondition) {
        return false;
      }

      // Price range filter
      if (priceRange.min && book.price < parseInt(priceRange.min)) {
        return false;
      }
      if (priceRange.max && book.price > parseInt(priceRange.max)) {
        return false;
      }

      return true;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.seller.rating - a.seller.rating;
        case "newest":
        default:
          return 0; // Keep original order for "newest"
      }
    });

    return filtered;
  }, [
    books,
    searchQuery,
    selectedUniversity,
    selectedDegree,
    selectedYear,
    selectedCondition,
    priceRange,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedUniversity("");
    setSelectedDegree("");
    setSelectedYear("");
    setSelectedCondition("");
    setPriceRange({ min: "", max: "" });
    setSortBy("newest");
    setSearchParams({});
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative text-center space-y-4 bg-gradient-to-r from-book-50 to-book-100 rounded-2xl p-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop&crop=center"
            alt="University textbooks"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-book-50/80 to-book-100/80" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-8 h-8 text-book-600" />
            <h2 className="text-3xl font-bold text-gray-900">Campus Books</h2>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Find textbooks for your university courses. Buy and sell books with fellow students
            at affordable prices. Support sustainable learning!
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Search & Filter Books</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by title, author, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>University</Label>
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger>
                  <SelectValue placeholder="All universities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Universities</SelectItem>
                  {SOUTH_AFRICAN_UNIVERSITIES.map((uni) => (
                    <SelectItem key={uni.id} value={uni.id}>
                      {uni.abbreviation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Degree Program</Label>
              <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                <SelectTrigger>
                  <SelectValue placeholder="All programs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Programs</SelectItem>
                  {availableDegrees.map((degree) => (
                    <SelectItem key={degree.id} value={degree.id}>
                      {degree.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Year Level</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="All years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Years</SelectItem>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                  <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Condition</Label>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Any condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Condition</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Used - Good">Used - Good</SelectItem>
                  <SelectItem value="Used - Fair">Used - Fair</SelectItem>
                  <SelectItem value="Used - Poor">Used - Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={sortBy} onValueChange={(value: typeof sortBy) => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated Sellers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 space-y-2">
              <Label>Min Price (R)</Label>
              <Input
                type="number"
                placeholder="0"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label>Max Price (R)</Label>
              <Input
                type="number"
                placeholder="1000"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              />
            </div>
            <Button variant="outline" onClick={clearFilters} className="mt-8">
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {filteredBooks.length} {filteredBooks.length === 1 ? 'Book' : 'Books'} Found
          </h3>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight mb-2">
                        {book.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {SOUTH_AFRICAN_UNIVERSITIES.find(u => u.id === book.university)?.abbreviation}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {book.year}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        R{book.price}
                      </span>
                      <Badge 
                        variant={book.condition === "New" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {book.condition}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {book.description}
                    </p>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{book.seller.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {book.seller.name} ({book.seller.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-book-600 hover:bg-book-700">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Books Found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find more books.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-book-50 to-book-100 border-book-200">
        <CardContent className="text-center py-8">
          <BookOpen className="w-12 h-12 text-book-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Have Books to Sell?</h3>
          <p className="text-gray-600 mb-4">
            List your textbooks and help fellow students while earning some cash!
          </p>
          <Button className="bg-book-600 hover:bg-book-700">
            Sell Your Books
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampusBooksSection;
