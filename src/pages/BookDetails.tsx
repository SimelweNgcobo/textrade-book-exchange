
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Share2, MessageCircle } from 'lucide-react';
import BookImageSection from '@/components/book-details/BookImageSection';
import BookPricing from '@/components/book-details/BookPricing';
import BookDescription from '@/components/book-details/BookDescription';
import BookInfo from '@/components/book-details/BookInfo';
import SellerInfo from '@/components/book-details/SellerInfo';
import BookActions from '@/components/book-details/BookActions';
import ReportBookDialog from '@/components/ReportBookDialog';
import { useAuth } from '@/contexts/AuthContext';
import { getBookById } from '@/services/book/bookQueries';
import { Book } from '@/types/book';
import { calculateCommission, calculateSellerReceives } from '@/services/bookService';
import { toast } from 'sonner';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
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
          <BookImageSection images={images} />

          {/* Details Section */}
          <div className="space-y-6">
            <BookInfo 
              title={book.title}
              author={book.author}
              category={book.category}
              condition={book.condition}
              grade={book.grade}
              universityYear={book.universityYear}
            />

            <BookPricing 
              price={book.price}
              commission={commission}
              sellerReceives={sellerReceives}
            />

            <BookDescription description={book.description} />

            <SellerInfo 
              seller={book.seller}
              createdAt={book.createdAt}
              onViewProfile={() => navigate(`/user/${book.seller.id}`)}
            />

            <BookActions
              book={book}
              user={user}
              onBuyNow={handleBuyNow}
              onContactSeller={handleContactSeller}
              onShare={handleShare}
              onEdit={() => navigate(`/edit-book/${book.id}`)}
              onMarkAsSold={() => toast.info('Mark as sold feature coming soon!')}
            />

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
    </Layout>
  );
};

export default BookDetails;
