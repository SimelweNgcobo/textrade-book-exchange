
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { getBooks } from '@/services/bookService';
import { Book } from '@/types/book';
import { BookOpen, Search, Star, Sparkles, TrendingUp, Users } from 'lucide-react';

const Index = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [animatedStats, setAnimatedStats] = useState({ books: 0, users: 0, savings: 0 });
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

    // Animate stats on page load
    const animateStats = () => {
      const duration = 2000;
      const startTime = Date.now();
      const targets = { books: 1250, users: 850, savings: 15000 };
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setAnimatedStats({
          books: Math.floor(targets.books * progress),
          users: Math.floor(targets.users * progress),
          savings: Math.floor(targets.savings * progress)
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };

    setTimeout(animateStats, 500); // Start animation after a short delay
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
      {/* Hero Section with Enhanced Animations */}
      <section className="relative bg-gradient-to-br from-book-100 via-book-200 to-book-300 py-20 overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-book-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-8 w-96 h-96 bg-book-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-book-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
            <div className="mb-4 animate-bounce">
              <span className="inline-flex items-center bg-gradient-to-r from-book-600/10 to-book-700/10 text-book-700 px-4 py-2 rounded-full text-sm font-medium italic border border-book-300/50 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                "Old Pages, New Adventures"
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-book-900 mb-4 leading-tight">
              Buy and Sell Textbooks with{' '}
              <span className="bg-gradient-to-r from-book-600 to-book-800 bg-clip-text text-transparent animate-pulse">
                Ease
              </span>
            </h1>
            <p className="text-xl text-book-700 mb-8 leading-relaxed">
              Buy affordable secondhand textbooks and give your old ones a new home — all handled securely through ReBooked Solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-book-600 to-book-700 hover:from-book-700 hover:to-book-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => navigate('/books')}
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Books
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-book-600 text-book-700 hover:bg-book-100 hover:border-book-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => navigate('/create-listing')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Sell Your Books
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-book-400 to-book-600 rounded-lg blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img 
                src="/lovable-uploads/bd1bff70-5398-480d-ab05-1a01e839c2d0.png"
                alt="Students reading colorful books"
                className="relative rounded-lg shadow-xl max-w-full h-auto transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-book-50/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="bg-gradient-to-br from-book-100 to-book-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <BookOpen className="w-12 h-12 text-book-600 mx-auto mb-4 group-hover:animate-bounce" />
                <div className="text-3xl font-bold text-book-800 mb-2">{animatedStats.books.toLocaleString()}+</div>
                <div className="text-book-600 font-medium">Books Available</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-book-100 to-book-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Users className="w-12 h-12 text-book-600 mx-auto mb-4 group-hover:animate-bounce" />
                <div className="text-3xl font-bold text-book-800 mb-2">{animatedStats.users.toLocaleString()}+</div>
                <div className="text-book-600 font-medium">Happy Students</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-book-100 to-book-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <TrendingUp className="w-12 h-12 text-book-600 mx-auto mb-4 group-hover:animate-bounce" />
                <div className="text-3xl font-bold text-book-800 mb-2">R{animatedStats.savings.toLocaleString()}+</div>
                <div className="text-book-600 font-medium">Money Saved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search Section */}
      <section className="py-12 bg-gradient-to-br from-white to-book-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-book-800">Find Your Textbooks</h2>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-book-400 to-book-600 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, author, or subject..."
                className="w-full p-4 pr-16 rounded-xl border-2 border-book-200 focus:outline-none focus:ring-2 focus:ring-book-500 focus:border-transparent text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-gradient-to-r from-book-600 to-book-700 text-white p-2 rounded-lg hover:from-book-700 hover:to-book-800 transition-all duration-200 transform hover:scale-110 shadow-lg"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-book-800">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/books?category=${encodeURIComponent(category.name)}`}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {category.icon}
                  </span>
                  <h3 className="font-semibold text-book-800 relative z-10 group-hover:text-book-900 transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Books Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-book-800">Featured Textbooks</h2>
            <Link 
              to="/books" 
              className="group inline-flex items-center text-book-600 hover:text-book-800 transition-colors duration-200 font-medium"
            >
              View all 
              <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-book-600"></div>
                <BookOpen className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-book-600 animate-pulse" />
              </div>
            </div>
          ) : featuredBooks.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-book-50 to-book-100 rounded-2xl">
              <div className="relative">
                <BookOpen className="mx-auto h-16 w-16 text-book-300 mb-4 animate-bounce" />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <Sparkles className="h-6 w-6 text-book-400 animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">No books available yet</h3>
              <p className="text-gray-500 mb-6">Be the first to list your textbooks!</p>
              <Button 
                onClick={() => navigate('/create-listing')}
                className="bg-gradient-to-r from-book-600 to-book-700 hover:from-book-700 hover:to-book-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Sell Your Books
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBooks.map((book, index) => (
                <Link 
                  key={book.id}
                  to={`/books/${book.id}`}
                  className="group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={book.imageUrl} 
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-book-800 shadow-lg">
                        R{book.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 text-book-800 line-clamp-1 group-hover:text-book-900 transition-colors duration-300">
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

      {/* Enhanced How It Works Section */}
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
            ].map((step, index) => (
              <div key={step.title} className="text-center group" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative mx-auto mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-book-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-book-800 group-hover:text-book-900 transition-colors duration-300">
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

      {/* Enhanced CTA Section */}
      <section className="py-16 bg-gradient-to-br from-book-600 via-book-700 to-book-800 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-8 -left-8 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-8 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
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
                className="border-2 border-white text-white hover:bg-white hover:text-book-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm"
                onClick={() => navigate('/register')}
              >
                <Users className="w-5 h-5 mr-2" />
                Sign Up Now
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-book-600 hover:bg-gray-100 hover:text-book-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
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
