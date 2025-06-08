import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BookOpen, Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBooks } from "@/services/book/bookQueries";
import { Book } from "@/types/book";
import BookGrid from "@/components/book-listing/BookGrid";
import { toast } from "sonner";
import { useLoadingState } from "@/utils/loadingStateManager";

const Index = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Use improved loading state management
  const { isLoading, startLoading, stopLoading, forceStopLoading } =
    useLoadingState("Index");

  useEffect(() => {
    loadFeaturedBooks();
  }, []);

  // Emergency timeout to prevent infinite loading
  useEffect(() => {
    if (isLoading) {
      const emergencyTimeout = setTimeout(() => {
        console.error(
          "🚨 Index page emergency timeout - force stopping loading",
        );
        forceStopLoading();
      }, 20000); // 20 seconds emergency timeout

      return () => clearTimeout(emergencyTimeout);
    }
  }, [isLoading, forceStopLoading]);

  const loadFeaturedBooks = async () => {
    const loadingId = startLoading("featured-books");

    try {
      console.log("Fetching books for featured section...");

      // Add timeout protection
      const booksPromise = getBooks();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Featured books loading timeout")),
          15000,
        ),
      );

      const allBooks = (await Promise.race([
        booksPromise,
        timeoutPromise,
      ])) as Book[];
      console.log("Books fetched for Index page:", allBooks.length);
      setFeaturedBooks(allBooks.slice(0, 4)); // Get first 4 books for featured section
    } catch (error) {
      console.error("Error loading featured books:", error);
      toast.error("Failed to load featured books");
      setFeaturedBooks([]); // Set empty array to prevent loading loops
    } finally {
      stopLoading();
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const statsData = [
    {
      icon: BookOpen,
      label: "Books Available",
      value: "1,000+",
      color: "text-blue-600",
    },
    {
      icon: Users,
      label: "Happy Students",
      value: "500+",
      color: "text-green-600",
    },
    {
      icon: Star,
      label: "Average Rating",
      value: "4.8",
      color: "text-yellow-600",
    },
    {
      icon: TrendingUp,
      label: "Money Saved",
      value: "R50,000+",
      color: "text-purple-600",
    },
  ];

  return (
    <Layout>
      <SEO
        title="ReBooked Solutions - Buy and Sell Used Textbooks"
        description="The premier marketplace for buying and selling used textbooks in South Africa. Save money on academic books and earn from books you no longer need."
        keywords="used textbooks, buy sell books, academic books South Africa, student textbooks, university books, college books"
        url="https://www.rebookedsolutions.co.za"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-book-50 to-book-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-book-800 mb-6">
            Your Textbook Marketplace
          </h1>
          <p className="text-xl text-book-600 mb-8 max-w-2xl mx-auto">
            Buy and sell used textbooks with students across South Africa. Save
            money and help others access affordable education.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search for textbooks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 border border-book-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-book-500"
              />
              <Button
                type="submit"
                className="bg-book-600 hover:bg-book-700 text-white px-6 py-3"
              >
                Search
              </Button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/books")}
              size="lg"
              className="bg-book-600 hover:bg-book-700 text-white"
            >
              Browse Books
            </Button>
            <Button
              onClick={() => navigate("/create-listing")}
              size="lg"
              variant="outline"
              className="border-book-600 text-book-600 hover:bg-book-50"
            >
              Sell Your Books
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-book-800 mb-12">
            Why Choose ReBooked Solutions?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className={`h-12 w-12 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-book-800 mb-2">
                  {stat.value}
                </h3>
                <p className="text-book-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-book-800 mb-12">
            Featured Books
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-600"></div>
              <span className="ml-3 text-book-600">
                Loading featured books...
              </span>
            </div>
          ) : featuredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80";
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-book-800">
                      R{book.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 text-book-800 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{book.author}</p>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {book.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No featured books available at the moment.
              </p>
              <Button
                onClick={loadFeaturedBooks}
                variant="outline"
                className="border-book-600 text-book-600"
              >
                Retry Loading
              </Button>
            </div>
          )}

          <div className="text-center mt-8">
            <Button
              onClick={() => navigate("/books")}
              size="lg"
              className="bg-book-600 hover:bg-book-700 text-white"
            >
              View All Books
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-book-800 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-book-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-book-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-book-800 mb-2">
                List Your Books
              </h3>
              <p className="text-book-600">
                Upload photos and details of textbooks you want to sell
              </p>
            </div>
            <div className="text-center">
              <div className="bg-book-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-book-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-book-800 mb-2">
                Connect with Buyers
              </h3>
              <p className="text-book-600">
                Students find your books and purchase directly from you
              </p>
            </div>
            <div className="text-center">
              <div className="bg-book-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-book-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-book-800 mb-2">
                Earn Money
              </h3>
              <p className="text-book-600">
                Get paid for books you no longer need and help other students
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
