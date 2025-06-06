
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BroadcastMessage from '@/components/BroadcastMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  BookOpen, 
  Users, 
  Shield, 
  TrendingUp,
  Star,
  ArrowRight
} from 'lucide-react';
import { getBooks } from '@/services/book/bookQueries';
import { Book } from '@/types/book';
import BookCard from '@/components/book/BookCard';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedBooks();
  }, []);

  const loadFeaturedBooks = async () => {
    try {
      setIsLoading(true);
      const books = await getBooks({ limit: 8 });
      setFeaturedBooks(books);
    } catch (error) {
      console.error('Error loading featured books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/books');
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Safe and protected buying and selling with verified users'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with students and book lovers in your area'
    },
    {
      icon: TrendingUp,
      title: 'Best Prices',
      description: 'Get the best deals on new and used books'
    },
    {
      icon: BookOpen,
      title: 'Wide Selection',
      description: 'Find textbooks, novels, and academic materials'
    }
  ];

  const categories = [
    'Textbooks',
    'Science',
    'Mathematics',
    'Literature',
    'History',
    'Business'
  ];

  return (
    <Layout>
      <BroadcastMessage />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-book-600 to-book-800 text-white py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Find Your Next Great Read
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-book-100 max-w-3xl mx-auto">
            Buy and sell new and used books in our secure marketplace. 
            Connect with readers and find amazing deals.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search for books, authors, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-14 text-lg bg-white text-gray-900"
              />
              <Button 
                type="submit"
                size="lg"
                className="bg-white text-book-600 hover:bg-gray-100 h-14 px-8"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => navigate(`/books?category=${encodeURIComponent(category)}`)}
                className="bg-white bg-opacity-10 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-20"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/books')}
              className="bg-white text-book-600 hover:bg-gray-100"
            >
              Browse All Books
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/create-listing')}
              className="border-white text-white hover:bg-white hover:text-book-600"
            >
              Sell Your Books
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ReBooked Solutions?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make buying and selling books simple, secure, and enjoyable
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-book-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-book-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Featured Books
              </h2>
              <p className="text-xl text-gray-600">
                Discover popular titles from our community
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/books')}
              className="hidden sm:flex"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : featuredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  className="hover:scale-105 transition-transform"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No books available at the moment</p>
            </div>
          )}
          
          <div className="text-center mt-8 sm:hidden">
            <Button
              variant="outline"
              onClick={() => navigate('/books')}
            >
              View All Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-book-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Trading Books?
          </h2>
          <p className="text-xl mb-8 text-book-100 max-w-2xl mx-auto">
            Join thousands of users who trust ReBooked Solutions for their book trading needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/register')}
              className="bg-white text-book-600 hover:bg-gray-100"
            >
              Get Started Today
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/books')}
              className="border-white text-white hover:bg-white hover:text-book-600"
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
