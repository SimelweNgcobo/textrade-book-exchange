
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProfileHeader from '@/components/ProfileHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getUserBooks } from '@/services/bookService';
import { supabase } from '@/integrations/supabase/client';
import { Book } from '@/types/book';
import { useCart } from '@/components/CartProvider';
import { toast } from 'sonner';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [userData, setUserData] = useState<any>(null);
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadUserProfile();
      loadUserBooks();
    }
  }, [userId]);

  const loadUserProfile = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        navigate('/');
        return;
      }

      setUserData({
        id: data.id,
        name: data.name || 'Anonymous User',
        joinDate: data.created_at,
        isVerified: false,
        rating: 4.5,
        successfulDeliveries: 12
      });
    } catch (error) {
      console.error('Error loading user profile:', error);
      navigate('/');
    }
  };

  const loadUserBooks = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const books = await getUserBooks(userId);
      const activeBooks = books.filter(book => !book.sold);
      setUserBooks(activeBooks);
    } catch (error) {
      console.error('Error loading user books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareProfile = () => {
    const profileUrl = window.location.href;
    navigator.clipboard.writeText(profileUrl).then(() => {
      toast.success('Profile link copied to clipboard!');
    });
  };

  const handleAddToCart = (book: Book) => {
    addToCart(book);
  };

  if (!userData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="mb-6">
          <ProfileHeader 
            userData={userData}
            isOwnProfile={false}
            onShareProfile={handleShareProfile}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Active Listings ({userBooks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-book-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading books...</p>
              </div>
            ) : userBooks.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-600">No active listings found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBooks.map((book) => (
                  <div key={book.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded mb-4 cursor-pointer"
                      onClick={() => navigate(`/book/${book.id}`)}
                    />
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-gray-600 mb-2">{book.author}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-book-600">R{book.price}</span>
                      <Badge variant="outline">{book.condition}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/book/${book.id}`)}
                        className="flex-1"
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(book)}
                        className="flex-1 bg-book-600 hover:bg-book-700"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserProfile;
