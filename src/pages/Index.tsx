import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import HealthCheck from "@/components/HealthCheck";
import { Button } from "@/components/ui/button";
import { getBooks } from "@/services/book/bookQueries";
import { Book } from "@/types/book";
import { BookOpen, Search, Star } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Index page mounted, loading featured books...");
    loadFeaturedBooks();
  }, []);

  const loadFeaturedBooks = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching books for featured section...");
      const allBooks = await getBooks();
      console.log("Books fetched for Index page:", allBooks.length);
      setFeaturedBooks(allBooks.slice(0, 4)); // Get first 4 books for featured section
    } catch (error) {
      console.error("Error loading featured books:", error);
      toast.error("Failed to load featured books");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery.trim());
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: "Computer Science", icon: "💻" },
    { name: "Mathematics", icon: "📊" },
    { name: "Biology", icon: "🧬" },
    { name: "Chemistry", icon: "⚗️" },
    { name: "Physics", icon: "🔭" },
    { name: "Economics", icon: "📈" },
  ];

  return (
    <Layout>
      <SEO
        title="ReBooked Solutions - Buy and Sell Used Textbooks"
        description="South Africa's trusted platform for buying and selling used textbooks. Find affordable academic books, sell your old textbooks, and connect with students across the country."
        keywords="textbooks, used books, academic books, sell books, buy books, student books, South Africa"
        url="https://www.rebookedsolutions.co.za/"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-book-100 to-book-200 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="mb-4">
              <span className="inline-block bg-book-600/10 text-book-700 px-4 py-2 rounded-full text-sm font-medium italic">
                "Pre-Loved Pages, New Adventures"
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-book-900 mb-4">
              Buy and Sell Textbooks with Ease
            </h1>
            <p className="text-xl text-book-700 mb-8">
              Buy affordable secondhand textbooks and give your old ones a new
              home — all handled securely through ReBooked Solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-book-600 hover:bg-book-700"
                onClick={() => navigate("/books")}
              >
                Browse Books
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-book-600 text-book-700 hover:bg-book-100"
                onClick={() => navigate("/create-listing")}
              >
                Sell Your Books
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/lovable-uploads/bd1bff70-5398-480d-ab05-1a01e839c2d0.png"
              alt="Students reading colorful books"
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-book-800">
            Find Your Textbooks
          </h2>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
            <input
              type="text"
              placeholder="Search by title, author, or subject..."
              className="w-full p-4 pr-16 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-book-500 focus:border-transparent text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-book-600 text-white p-2 rounded-lg hover:bg-book-700 transition duration-200"
            >
              <Search className="h-6 w-6" />
            </button>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-book-800">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/books?category=${encodeURIComponent(category.name)}`}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200"
              >
                <span className="text-4xl mb-4 block">{category.icon}</span>
                <h3 className="font-semibold text-book-800">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-book-800">
              Featured Textbooks
            </h2>
            <Link
              to="/books"
              className="text-book-600 hover:text-book-800 transition-colors duration-200"
            >
              View all →
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-600"></div>
            </div>
          ) : featuredBooks.length === 0 ? (
            <div className="text-center py-10">
              <BookOpen className="mx-auto h-12 w-12 text-book-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No books available yet
              </h3>
              <p className="text-gray-500 mb-6">
                Be the first to list your textbooks!
              </p>
              <Button
                onClick={() => navigate("/create-listing")}
                className="bg-book-600 hover:bg-book-700"
              >
                Sell Your Books
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBooks.map((book) => (
                <Link
                  key={book.id}
                  to={`/books/${book.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200 book-card-hover"
                  onClick={() =>
                    console.log("Clicking featured book:", book.id)
                  }
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
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
                    <div className="flex items-center justify-between">
                      <span className="bg-book-100 text-book-800 px-2 py-1 rounded text-xs font-medium">
                        {book.condition}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {book.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-book-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-book-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                <BookOpen className="h-10 w-10 text-book-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-book-800">
                List Your Books
              </h3>
              <p className="text-gray-600">
                Create listings for your used textbooks in minutes. Add details,
                photos, and set your price.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Search className="h-10 w-10 text-book-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-book-800">
                List your books for sale
              </h3>
              <p className="text-gray-600">
                List your books for sale and let ReBooked Solutions handle the
                rest.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Star className="h-10 w-10 text-book-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-book-800">
                Save Money
              </h3>
              <p className="text-gray-600">
                Buyers save on textbook costs, and sellers earn money on books
                they no longer need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-book-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join ReBooked Solutions to buy and sell textbooks securely. Save
            money and help others do the same!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-book-600 hover:bg-gray-100 border-2 border-white"
              onClick={() => navigate("/register")}
            >
              Sign Up Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-book-600"
              onClick={() => navigate("/books")}
            >
              Browse Books
            </Button>
          </div>
        </div>
      </section>

      {/* Temporary Health Check */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <HealthCheck />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
