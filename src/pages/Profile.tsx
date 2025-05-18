
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBooksBySeller } from '@/services/bookService';
import { Book } from '@/types/book';
import { BookOpen, Plus, User } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserBooks = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const books = await getBooksBySeller(user.id);
        setMyBooks(books);
      } catch (error) {
        console.error('Error loading user books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserBooks();
  }, [user]);

  const activeBooks = myBooks.filter(book => !book.sold);
  const soldBooks = myBooks.filter(book => book.sold);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="bg-book-100 rounded-full w-24 h-24 flex items-center justify-center text-book-600">
              <User className="h-12 w-12" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-3xl font-bold text-book-800">{user?.name}</h1>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button 
                  variant="outline" 
                  className="border-book-600 text-book-600"
                  onClick={() => navigate('/create-listing')}
                >
                  <Plus className="mr-2 h-4 w-4" /> Sell a Book
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-gray-600"
                  onClick={() => logout()}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Books Tabs */}
        <Tabs defaultValue="active" className="bg-white rounded-lg shadow-md p-6">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active" className="text-lg py-3">
              Active Listings ({activeBooks.length})
            </TabsTrigger>
            <TabsTrigger value="sold" className="text-lg py-3">
              Sold Books ({soldBooks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-600"></div>
              </div>
            ) : activeBooks.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="mx-auto h-12 w-12 text-book-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No active listings</h3>
                <p className="text-gray-500 mb-6">You don't have any books listed for sale yet.</p>
                <Button 
                  onClick={() => navigate('/create-listing')}
                  className="bg-book-600 hover:bg-book-700"
                >
                  <Plus className="mr-2 h-4 w-4" /> Sell a Book
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeBooks.map(book => (
                  <div key={book.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col sm:flex-row">
                    <div className="sm:w-1/4 md:w-1/5">
                      <img 
                        src={book.imageUrl} 
                        alt={book.title} 
                        className="w-full h-40 sm:h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <h3 className="font-bold text-lg text-book-800">{book.title}</h3>
                          <p className="text-gray-600 mb-2">{book.author}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="bg-book-100 text-book-800 px-2 py-1 rounded text-xs font-medium">
                              {book.condition}
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                              {book.category}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm">Listed on: {formatDate(book.createdAt)}</p>
                        </div>
                        <div className="mt-4 sm:mt-0 text-right">
                          <p className="text-xl font-bold text-book-600">R{book.price}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Link to={`/books/${book.id}`}>
                          <Button variant="outline" className="border-book-600 text-book-600">
                            View Listing
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sold">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-600"></div>
              </div>
            ) : soldBooks.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="mx-auto h-12 w-12 text-book-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No sold books</h3>
                <p className="text-gray-500">You haven't sold any books yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {soldBooks.map(book => (
                  <div key={book.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col sm:flex-row bg-gray-50">
                    <div className="sm:w-1/4 md:w-1/5">
                      <img 
                        src={book.imageUrl} 
                        alt={book.title} 
                        className="w-full h-40 sm:h-full object-cover opacity-75"
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="font-bold text-lg text-gray-700">{book.title}</h3>
                            <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              Sold
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{book.author}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                              {book.condition}
                            </span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {book.category}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm">Sold on: {formatDate(book.createdAt)}</p>
                        </div>
                        <div className="mt-4 sm:mt-0 text-right">
                          <p className="text-lg font-medium text-gray-700">R{book.price}</p>
                          <p className="text-sm text-gray-500">Commission: R15</p>
                          <p className="text-md font-bold text-book-600">You received: R{book.price - 15}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
