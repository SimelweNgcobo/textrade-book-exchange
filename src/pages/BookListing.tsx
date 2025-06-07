import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import BookFilters from "@/components/book-listing/BookFilters";
import BookGrid from "@/components/book-listing/BookGrid";
import { getBooks } from "@/services/book/bookQueries";
import { Book } from "@/types/book";
import { toast } from "sonner";

const BookListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedUniversityYear, setSelectedUniversityYear] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [bookType, setBookType] = useState<"all" | "school" | "university">(
    "all",
  );

  useEffect(() => {
    console.log("BookListing component mounted");
    loadBooks();
  }, []);

  useEffect(() => {
    console.log("Search params changed:", Object.fromEntries(searchParams));
    loadBooks();
  }, [searchParams]);

  const loadBooks = async () => {
    console.log("Loading books...");
    setIsLoading(true);
    setError(null);

    try {
      const searchQuery = searchParams.get("search") || "";
      const category = searchParams.get("category") || "";
      const grade = searchParams.get("grade") || "";
      const universityYear = searchParams.get("universityYear") || "";

      const filters: {
        search?: string;
        category?: string;
        condition?: string;
        grade?: string;
        universityYear?: string;
        minPrice?: number;
        maxPrice?: number;
      } = {};

      if (searchQuery) filters.search = searchQuery;
      if (category) filters.category = category;
      if (selectedCondition) filters.condition = selectedCondition;
      if (grade) filters.grade = grade;
      if (universityYear) filters.universityYear = universityYear;

      if (priceRange[0] > 0) filters.minPrice = priceRange[0];
      if (priceRange[1] < 1000) filters.maxPrice = priceRange[1];

      console.log("Applied filters:", filters);

      const loadedBooks = await getBooks(filters);
      console.log("Loaded books count:", loadedBooks.length);
      setBooks(loadedBooks);

      if (loadedBooks.length === 0) {
        console.log("No books found with current filters");
      }
    } catch (error) {
      console.error("Error loading books:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load books. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted with query:", searchQuery);
    updateFilters();
  };

  const updateFilters = () => {
    console.log("Updating filters...");
    const params = new URLSearchParams();

    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedGrade) params.set("grade", selectedGrade);
    if (selectedUniversityYear)
      params.set("universityYear", selectedUniversityYear);

    setSearchParams(params);
    loadBooks();
  };

  const clearFilters = () => {
    console.log("Clearing all filters");
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedCondition("");
    setSelectedGrade("");
    setSelectedUniversityYear("");
    setPriceRange([0, 1000]);
    setBookType("all");
    setSearchParams({});
    loadBooks();
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Error Loading Books
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadBooks}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Browse Textbooks - ReBooked Solutions"
        description="Browse thousands of used textbooks from students across South Africa. Find affordable academic books for university, college, and high school."
        keywords="browse textbooks, used books, academic books, student books, textbook marketplace"
        url="https://www.rebookedsolutions.co.za/books"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-book-800 mb-8">Browse Books</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <BookFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCondition={selectedCondition}
            setSelectedCondition={setSelectedCondition}
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            selectedUniversityYear={selectedUniversityYear}
            setSelectedUniversityYear={setSelectedUniversityYear}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            bookType={bookType}
            setBookType={setBookType}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            onSearch={(e) => {
              e.preventDefault();
              console.log("Search submitted with query:", searchQuery);
              const params = new URLSearchParams();
              if (searchQuery) params.set("search", searchQuery);
              if (selectedCategory) params.set("category", selectedCategory);
              if (selectedGrade) params.set("grade", selectedGrade);
              if (selectedUniversityYear)
                params.set("universityYear", selectedUniversityYear);
              setSearchParams(params);
              loadBooks();
            }}
            onUpdateFilters={() => {
              console.log("Updating filters...");
              const params = new URLSearchParams();
              if (searchQuery) params.set("search", searchQuery);
              if (selectedCategory) params.set("category", selectedCategory);
              if (selectedGrade) params.set("grade", selectedGrade);
              if (selectedUniversityYear)
                params.set("universityYear", selectedUniversityYear);
              setSearchParams(params);
              loadBooks();
            }}
            onClearFilters={() => {
              console.log("Clearing all filters");
              setSearchQuery("");
              setSelectedCategory("");
              setSelectedCondition("");
              setSelectedGrade("");
              setSelectedUniversityYear("");
              setPriceRange([0, 1000]);
              setBookType("all");
              setSearchParams({});
              loadBooks();
            }}
          />

          <BookGrid
            books={books}
            isLoading={isLoading}
            onClearFilters={() => {
              console.log("Clearing all filters");
              setSearchQuery("");
              setSelectedCategory("");
              setSelectedCondition("");
              setSelectedGrade("");
              setSelectedUniversityYear("");
              setPriceRange([0, 1000]);
              setBookType("all");
              setSearchParams({});
              loadBooks();
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default BookListing;
