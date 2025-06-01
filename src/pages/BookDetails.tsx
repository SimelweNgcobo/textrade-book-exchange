
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Share2, MessageCircle } from 'lucide-react';
import BookImageCarousel from '@/components/BookImageCarousel';
import ReportBookDialog from '@/components/ReportBookDialog';
import { useAuth } from '@/contexts/AuthContext';
import { getBookById } from '@/services/book/bookQueries';
import { Book } from '@/types/book';
import { useIsMobile } from '@/hooks/use-mobile';
import { calculateCommission, calculateSellerReceives } from '@/services/bookService';
import { toast } from 'sonner';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadBook(id);
    }
  }, [id]);

  const loadBook = async (bookId: string) => {
    try {
      const bookData = await getBookById(bookId);
      setBook(bookData);
    } catch (error) {
      console.error('Error loading book:', error);
      toast.error('Failed to load book details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: book?.title,
          text: `Check out this book: ${book?.title} by ${book?.author}`,
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      } catch (error) {
        toast.error('Failed to copy link');
      }
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error('Please log in to purchase books');
      navigate('/login');
      return;
    }
    navigate('/checkout', { state: { book } });
  };

  const handleContactSeller = () => {
    if (!user) {
      toast.error('Please log in to contact the seller');
      navigate('/login');
      return;
    }
    // Implement contact seller functionality
    toast.info('Contact seller feature coming soon!');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Book Not Found</h2>
            <p className="text-gray-600 mb-4">The book you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/books')}>Browse Books</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const images = [book.frontCover, book.backCover, ...(book.insidePages || [])].filter(Boolean);
  const commission = calculateCommission(book.price);
  const sellerReceives = calculateSellerReceives(book.price);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 text-book-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <BookImageCarousel images={images} title={book.title} />
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-book-800 mb-2">{book.title}</h1>
              <p className="text-xl text-book-600 mb-4">by {book.author}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{book.category}</Badge>
                <Badge variant="outline">{book.condition}</Badge>
                {book.grade && <Badge variant="outline">Grade {book.grade}</Badge>}
                {book.universityYear && <Badge variant="outline">Year {book.universityYear}</Badge>}
              </div>
            </div>

            {/* Price */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    R{book.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Commission: R{commission.toFixed(2)} | Seller receives: R{sellerReceives.toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {book.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
            )}

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Seller Information</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{book.seller.name}</p>
                    <p className="text-sm text-gray-500">
                      Listed on {new Date(book.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/user/${book.seller.id}`)}
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!book.sold && user?.id !== book.seller.id && (
                <>
                  <Button 
                    onClick={handleBuyNow}
                    className="w-full bg-book-600 hover:bg-book-700 text-white py-3"
                    size="lg"
                  >
                    Buy Now - R{book.price.toFixed(2)}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      onClick={handleContactSeller}
                      className="w-full"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Seller
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={handleShare}
                      className="w-full"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </>
              )}
              
              {book.sold && (
                <div className="text-center py-4">
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    SOLD
                  </Badge>
                </div>
              )}
              
              {user?.id === book.seller.id && (
                <div className="space-y-2">
                  <Button 
                    onClick={() => navigate(`/edit-book/${book.id}`)}
                    className="w-full"
                    variant="outline"
                  >
                    Edit Listing
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      onClick={handleShare}
                      className="w-full"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => toast.info('Mark as sold feature coming soon!')}
                      className="w-full"
                    >
                      Mark as Sold
                    </Button>
                  </div>
                </div>
              )}

              {/* Report Button - Always visible for non-owners */}
              {user?.id !== book.seller.id && (
                <div className="pt-4 border-t">
                  <ReportBookDialog
                    bookId={book.id}
                    bookTitle={book.title}
                    sellerId={book.seller.id}
                    sellerName={book.seller.name}
                  >
                    <Button variant="ghost" size="sm" className="w-full text-red-600 hover:text-red-700">
                      <span className="text-red-500 mr-2">⚠️</span>
                      Report this listing
                    </Button>
                  </ReportBookDialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetails;
