
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBooksBySeller } from '@/services/bookService';
import { Book } from '@/types/book';
import { BookOpen, Plus, User, Share2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import ShareProfileDialog from '@/components/ShareProfileDialog';

const Profile = () => {
  const { user, profile, logout } = useAuth();
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserBooks = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const books = await getBooksBySeller(user.id);
        setMyBooks(books);
        console.log('Loaded user books:', books);
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

  const handleShareProfile = () => {
    setShowShareDialog(true);
  };

  const copyProfileLink = () => {
    const profileUrl = `${window.location.origin}/user/${user?.id}`;
    navigator.clipboard.writeText(profileUrl);
    toast.success('Profile link copied to clipboard!');
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
              <h1 className="text-3xl font-bold text-book-800">{profile?.name || 'User'}</h1>
              <p className="text-gray-600 mb-4">{profile?.email || user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button 
                  variant="outline" 
                  className="border-book-600 text-book-600"
                  onClick={() => navigate('/create-listing')}
                >
                  <Plus className="mr-2 h-4 w-4" /> Sell a Book
                </Button>
                <Button 
                  variant="outline" 
                  className="border-book-600 text-book-600"
                  onClick={handleShareProfile}
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-600"
                  onClick={copyProfileLink}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy Link
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeBooks.map(book => (
                  <div key={book.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={book.imageUrl} 
                        alt={book.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&h=400';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-book-800 mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-gray-600 mb-2">{book.author}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-book-100 text-book-800 px-2 py-1 rounded text-xs font-medium">
                          {book.condition}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                          {book.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xl font-bold text-book-600">R{book.price}</p>
                        <Link to={`/books/${book.id}`}>
                          <Button variant="outline" size="sm" className="border-book-600 text-book-600">
                            View
                          </Button>
                        </Link>
                      </div>
                      <p className="text-gray-500 text-sm mt-2">Listed: {formatDate(book.createdAt)}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {soldBooks.map(book => (
                  <div key={book.id} className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="relative h-48">
                      <img 
                        src={book.imageUrl} 
                        alt={book.title} 
                        className="w-full h-full object-cover opacity-75"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&h=400';
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
                          SOLD
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-700 mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-gray-600 mb-2">{book.author}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                          {book.condition}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {book.category}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-medium text-gray-700">R{book.price}</p>
                        <p className="text-sm text-gray-500">Commission: R15</p>
                        <p className="text-md font-bold text-book-600">You received: R{book.price - 15}</p>
                      </div>
                      <p className="text-gray-500 text-sm mt-2">Sold: {formatDate(book.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {user && profile && (
        <ShareProfileDialog
          isOpen={showShareDialog}
          onClose={() => setShowShareDialog(false)}
          userId={user.id}
          userName={profile.name || 'User'}
          isOwnProfile={true}
        />
      )}
    </Layout>
  );
};

export default Profile;
