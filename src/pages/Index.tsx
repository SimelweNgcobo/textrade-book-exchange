
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBooks } from "@/services/book/bookQueries";
import { Book } from "@/types/book";
import { BookOpen, Search, Star, GraduationCap, Calendar, Users, MapPin, FileText, Info } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [uniSearchQuery, setUniSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("books");
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
      setFeaturedBooks(allBooks.slice(0, 4));
    } catch (error) {
      console.error("Error loading featured books:", error);
      toast.error("Failed to load featured books");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for books:", searchQuery.trim());
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleUniSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (uniSearchQuery.trim()) {
      console.log("Searching for university info:", uniSearchQuery.trim());
      // TODO: Navigate to university search results when implemented
      toast.info("University search coming soon!");
    }
  };

  const bookCategories = [
    { name: "Computer Science", icon: "💻" },
    { name: "Mathematics", icon: "📊" },
    { name: "Biology", icon: "🧬" },
    { name: "Chemistry", icon: "⚗️" },
    { name: "Physics", icon: "🔭" },
    { name: "Economics", icon: "📈" },
  ];

  const universityInfo = [
    { 
      name: "Admissions Info", 
      icon: <GraduationCap className="h-8 w-8" />,
      description: "Application requirements and deadlines",
      color: "bg-blue-100 text-blue-600"
    },
    { 
      name: "Course Directories", 
      icon: <FileText className="h-8 w-8" />,
      description: "Browse programs and courses",
      color: "bg-green-100 text-green-600"
    },
    { 
      name: "Campus Life", 
      icon: <Users className="h-8 w-8" />,
      description: "Student activities and facilities",
      color: "bg-purple-100 text-purple-600"
    },
    { 
      name: "Application Tips", 
      icon: <Info className="h-8 w-8" />,
      description: "Guidance for new students",
      color: "bg-orange-100 text-orange-600"
    },
    { 
      name: "Important Dates", 
      icon: <Calendar className="h-8 w-8" />,
      description: "Academic calendar and deadlines",
      color: "bg-red-100 text-red-600"
    },
    { 
      name: "Campus Locations", 
      icon: <MapPin className="h-8 w-8" />,
      description: "Find universities near you",
      color: "bg-indigo-100 text-indigo-600"
    },
  ];

  return (
    <Layout>
      <SEO
        title="ReBooked Solutions - Buy and Sell Used Textbooks & University Info Hub"
        description="South Africa's trusted platform for buying and selling used textbooks, plus your comprehensive guide to university information, admissions, and student life."
        keywords="textbooks, used books, academic books, sell books, buy books, student books, South Africa, university info, admissions, courses"
        url="https://www.rebookedsolutions.co.za/"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-book-100 to-book-200 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="mb-4">
              <span className="inline-block bg-book-600/10 text-book-700 px-4 py-2 rounded-full text-sm font-medium italic">
                "Your Complete Student Companion"
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-book-900 mb-4">
              Books, University Info & Student Success
            </h1>
            <p className="text-xl text-book-700 mb-8">
              Buy affordable secondhand textbooks, get university information, and access everything you need for your academic journey — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-book-600 hover:bg-book-700"
                onClick={() => setActiveTab("books")}
              >
                Browse Books
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-book-600 text-book-700 hover:bg-book-100"
                onClick={() => setActiveTab("university")}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                University Info
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/lovable-uploads/bd1bff70-5398-480d-ab05-1a01e839c2d0.png"
              alt="Students reading colorful books"
              width="600"
              height="400"
              className="rounded-lg shadow-xl max-w-full h-auto"
              loading="eager"
              decoding="sync"
            />
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="books" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Books
              </TabsTrigger>
              <TabsTrigger value="university" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                University Info
              </TabsTrigger>
            </TabsList>

            {/* Books Tab Content */}
            <TabsContent value="books" className="space-y-12">
              {/* Book Search Section */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-8 text-book-800">
                  Find Your Textbooks
                </h2>
                <form onSubmit={handleBookSearch} className="max-w-3xl mx-auto relative">
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

              {/* Book Categories */}
              <div className="bg-gray-50 py-12">
                <h2 className="text-3xl font-bold text-center mb-8 text-book-800">
                  Browse by Category
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {bookCategories.map((category) => (
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

              {/* Featured Books */}
              <div>
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
                            width="400"
                            height="300"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                            decoding="async"
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
            </TabsContent>

            {/* University Info Tab Content */}
            <TabsContent value="university" className="space-y-12">
              {/* University Search Section */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-8 text-book-800">
                  Explore University Information
                </h2>
                <form onSubmit={handleUniSearch} className="max-w-3xl mx-auto relative">
                  <input
                    type="text"
                    placeholder="Search universities, courses, or programs..."
                    className="w-full p-4 pr-16 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-book-500 focus:border-transparent text-lg"
                    value={uniSearchQuery}
                    onChange={(e) => setUniSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bg-book-600 text-white p-2 rounded-lg hover:bg-book-700 transition duration-200"
                  >
                    <Search className="h-6 w-6" />
                  </button>
                </form>
              </div>

              {/* University Info Categories */}
              <div className="bg-gray-50 py-12">
                <h2 className="text-3xl font-bold text-center mb-8 text-book-800">
                  What Would You Like to Learn About?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {universityInfo.map((info) => (
                    <div
                      key={info.name}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                      onClick={() => toast.info(`${info.name} coming soon!`)}
                    >
                      <div className={`w-16 h-16 rounded-lg ${info.color} flex items-center justify-center mb-4`}>
                        {info.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-book-800 mb-2">{info.name}</h3>
                      <p className="text-gray-600">{info.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coming Soon Section */}
              <div className="text-center py-16 bg-book-50">
                <GraduationCap className="mx-auto h-16 w-16 text-book-400 mb-6" />
                <h3 className="text-2xl font-bold text-book-800 mb-4">
                  University Info Hub Coming Soon!
                </h3>
                <p className="text-lg text-book-600 mb-8 max-w-2xl mx-auto">
                  We're working hard to bring you comprehensive university information, 
                  including admissions guidance, course directories, and student resources. 
                  Stay tuned for updates!
                </p>
                <Button
                  variant="outline"
                  className="border-book-600 text-book-700 hover:bg-book-100"
                  onClick={() => toast.info("We'll notify you when it's ready!")}
                >
                  Notify Me When Ready
                </Button>
              </div>
            </TabsContent>
          </Tabs>
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
                Discover & Connect
              </h3>
              <p className="text-gray-600">
                Find the books you need and get university information to support your academic journey.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Star className="h-10 w-10 text-book-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-book-800">
                Save Money & Succeed
              </h3>
              <p className="text-gray-600">
                Save on textbook costs, earn money from book sales, and access resources for academic success.
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
            Join ReBooked Solutions for affordable textbooks and comprehensive university information. 
            Everything you need for your academic success in one place!
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
    </Layout>
  );
};

export default Index;
