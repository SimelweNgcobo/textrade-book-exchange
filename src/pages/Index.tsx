
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, BookOpen, Shield, Clock, Star, Users } from 'lucide-react';
import { getBooks } from '@/services/book/bookQueries';
import { Book } from '@/types/book';
import BookCard from '@/components/book/BookCard';
import BroadcastMessage from '@/components/BroadcastMessage';

const Index = () => {
  const navigate = useNavigate();
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedBooks();
  }, []);

  const loadFeaturedBooks = async () => {
    try {
      setIsLoading(true);
      const books = await getBooks({});
      setFeaturedBooks(books.slice(0, 8));
    } catch (error) {
      console.error('Error loading featured books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Search className="h-8 w-8 text-book-600" />,
      title: "Easy Search",
      description: "Find textbooks by title, author, subject, or grade level with our powerful search engine."
    },
    {
      icon: <Shield className="h-8 w-8 text-book-600" />,
      title: "Secure Transactions", 
      description: "All transactions are protected with secure payment processing and buyer protection."
    },
    {
      icon: <Clock className="h-8 w-8 text-book-600" />,
      title: "Quick Delivery",
      description: "Connect with local sellers for fast pickup or reliable shipping options."
    },
    {
      icon: <Star className="h-8 w-8 text-book-600" />,
      title: "Quality Guaranteed",
      description: "All books are verified for quality and condition before listing."
    }
  ];

  return (
    <Layout>
      <BroadcastMessage />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-book-50 to-book-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-book-800 mb-6">
            Buy & Sell <span className="text-book-600">Textbooks</span> Easily
          </h1>
          <p className="text-xl text-book-700 mb-8 max-w-3xl mx-auto">
            The marketplace for students to buy and sell new and used textbooks. 
            Find affordable books or turn your old textbooks into cash.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-book-600 hover:bg-book-700 text-white px-8 py-3"
              onClick={() => navigate('/books')}
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Books
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-book-600 text-book-600 hover:bg-book-50 px-8 py-3"
              onClick={() => navigate('/create-listing')}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Sell Your Books
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-book-600 mb-2">10,000+</div>
              <div className="text-gray-600">Books Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-book-600 mb-2">5,000+</div>
              <div className="text-gray-600">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-book-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-book-800 mb-4">
              Why Choose ReBooked Solutions?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make textbook trading simple, secure, and affordable for students everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-book-800 mb-4">
              Featured Books
            </h2>
            <p className="text-xl text-gray-600">
              Check out some of the latest textbooks available
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading books...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-book-600 text-book-600 hover:bg-book-50"
                  onClick={() => navigate('/books')}
                >
                  View All Books
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-book-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-book-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already saving money on textbooks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-book-600 hover:bg-gray-100 px-8 py-3"
              onClick={() => navigate('/register')}
            >
              <Users className="mr-2 h-5 w-5" />
              Join Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-book-700 px-8 py-3"
              onClick={() => navigate('/books')}
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
