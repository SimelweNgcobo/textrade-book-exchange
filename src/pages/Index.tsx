
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { getBooks } from '@/services/bookService';
import { Book } from '@/types/book';
import { BookOpen, Search, Star, TrendingUp, Users } from 'lucide-react';

const Index = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeaturedBooks = async () => {
      try {
        const allBooks = await getBooks();
        setFeaturedBooks(allBooks.slice(0, 4)); // Get first 4 books for featured section
      } catch (error) {
        console.error('Error loading featured books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedBooks();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: 'Computer Science', icon: '💻', color: 'from-blue-400 to-blue-600' },
    { name: 'Mathematics', icon: '📊', color: 'from-purple-400 to-purple-600' },
    { name: 'Biology', icon: '🧬', color: 'from-green-400 to-green-600' },
    { name: 'Chemistry', icon: '⚗️', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Physics', icon: '🔭', color: 'from-indigo-400 to-indigo-600' },
    { name: 'Economics', icon: '📈', color: 'from-red-400 to-red-600' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-book-100 via-book-200 to-book-300 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="mb-4">
              <span className="inline-flex items-center bg-book-600/10 text-book-700 px-4 py-2 rounded-full text-sm font-medium">
                "Old Pages, New Adventures"
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-book-900 mb-4 leading-tight">
              Buy and Sell Textbooks with{' '}
              <span className="bg-gradient-to-r from-book-600 to-book-800 bg-clip-text text-transparent">
                Ease
              </span>
            </h1>
            <p className="text-xl text-book-700 mb-8 leading-relaxed">
              Buy affordable secondhand textbooks and give your old ones a new home — all handled securely through ReBooked Solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-book-600 to-book-700 hover:from-book-700 hover:to-book-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => navigate('/books')}
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Books
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-book-600 text-book-700 hover:bg-book-100 hover:border-book-700 transition-all duration-200"
                onClick={() => navigate('/create-listing')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Sell Your Books
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="/lovable-uploads/bd1bff70-5398-480d-ab05-1a01e839c2d0.png"
              alt="Students reading colorful books"
              className="rounded-lg shadow-xl max-w-full h-auto hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-gradient-to-br from-book-100 to-book-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <BookOpen className="w-12 h-12 text-book-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-book-800 mb-2">1,250+</div>
              <div className="text-book-600 font-medium">Books Available</div>
            </div>
            <div className="bg-gradient-to-br from-book-100 to-book-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <Users className="w-12 h-12 text-book-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-book-800 mb-2">850+</div>
              <div className="text-book-600 font-medium">Happy Students</div>
            </div>
            <div className="bg-gradient-to-br from-book-100 to-book-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <TrendingUp className="w-12 h-12 text-book-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-book-800 mb-2">R15,000+</div>
              <div className="text-book-600 font-medium">Money Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gradient-to-br from-white to-book-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-book-800">Find Your Textbooks</h2>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, author, or subject..."
                className="w-full p-4 pr-16 rounded-xl border-2 border-book-200 focus:outline-none focus:ring-2 focus:ring-book-500 focus:border-transparent text-lg shadow-lg transition-shadow duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-gradient-to-r from-book-600 to-book-700 text-white p-2 rounded-lg hover:from-book-700 hover:to-book-800 transition-all duration-200 shadow-lg"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-book-800">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/books?category=${encodeURIComponent(category.name)}`}
                className="block"
              >
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <span className="text-4xl mb-4 block">
                    {category.icon}
                  </span>
                  <h3 className="font-semibold text-book-800">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-book-800">Featured Textbooks</h2>
            <Link 
              to="/books" 
              className="text-book-600 hover:text-book-800 transition-colors duration-200 font-medium"
            >
              View all →
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-book-600"></div>
            </div>
          ) : featuredBooks.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-book-50 to-book-100 rounded-2xl">
              <BookOpen className="mx-auto h-16 w-16 text-book-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No books available yet</h3>
              <p className="text-gray-500 mb-6">Be the first to list your textbooks!</p>
              <Button 
                onClick={() => navigate('/create-listing')}
                className="bg-gradient-to-r from-book-600 to-book-700 hover:from-book-700 hover:to-book-800"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Sell Your Books
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBooks.map((book) => (
                <Link 
                  key={book.id}
                  to={`/books/${book.id}`}
                  className="block"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={book.imageUrl} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-book-800 shadow-lg">
                        R{book.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 text-book-800 line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{book.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="bg-gradient-to-r from-book-100 to-book-200 text-book-800 px-3 py-1 rounded-full text-xs font-medium border border-book-300">
                          {book.condition}
                        </span>
                        <span className="text-gray-500 text-sm">{book.category}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-br from-book-50 to-book-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-book-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "List Your Books",
                description: "Create listings for your used textbooks in minutes. Add details, photos, and set your price.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Search,
                title: "We Handle Everything",
                description: "List your books for sale and let ReBooked Solutions handle the rest.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Star,
                title: "Save Money",
                description: "Buyers save on textbook costs, and sellers earn money on books they no longer need.",
                color: "from-green-500 to-green-600"
              }
            ].map((step) => (
              <div key={step.title} className="text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-book-800">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-book-600 via-book-700 to-book-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              Join ReBooked Solutions to buy and sell textbooks securely. Save money and help others do the same!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-book-600 transition-all duration-200"
                onClick={() => navigate('/register')}
              >
                <Users className="w-5 h-5 mr-2" />
                Sign Up Now
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-book-600 hover:bg-gray-100 hover:text-book-700 transition-all duration-200"
                onClick={() => navigate('/books')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Books
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
