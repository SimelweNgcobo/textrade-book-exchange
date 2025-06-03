
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import Layout from '@/components/Layout';
import BookImageSection from '@/components/book-details/BookImageSection';
import BookInfo from '@/components/book-details/BookInfo';
import BookDescription from '@/components/book-details/BookDescription';
import BookActions from '@/components/book-details/BookActions';
import BookPricing from '@/components/book-details/BookPricing';
import SellerInfo from '@/components/book-details/SellerInfo';
import ReportBookDialog from '@/components/ReportBookDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2 } from 'lucide-react';
import { useBookDetails } from '@/hooks/useBookDetails';
import { toast } from 'sonner';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { addToCart } = useCart();
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  const { book, isLoading, error } = useBookDetails(id || '');

  useEffect(() => {
    if (!id) {
      navigate('/books');
    }
  }, [id, navigate]);

  const handleBuyNow = () => {
    if (!user) {
      toast.error('Please log in to purchase books');
      navigate('/login');
      return;
    }

    if (!book) return;

    navigate(`/checkout/${book.id}`);
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please log in to add books to cart');
      navigate('/login');
      return;
    }

    if (!book) return;

    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      imageUrl: book.frontCover || book.imageUrl,
      sellerId: book.seller?.id || ''
    });

    toast.success('Book added to cart!');
  };

  const handleEditBook = () => {
    if (!book) return;
    navigate(`/edit-book/${book.id}`);
  };

  const handleShare = async () => {
    if (!book) return;

    const shareData = {
      title: `${book.title} by ${book.author}`,
      text: `Check out this book on ReBooked: ${book.title} by ${book.author} for R${book.price}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleViewSellerProfile = () => {
    if (!book?.seller?.id) {
      toast.error('Seller profile not available');
      return;
    }
    navigate(`/user/${book.seller.id}`);
  };

  const handleReportBook = () => {
    if (!user) {
      toast.error('Please log in to report a book');
      navigate('/login');
      return;
    }
    setIsReportDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-600 mx-auto"></div>
        </div>
      </Layout>
    );
  }

  if (error || !book) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Book not found</h2>
          <p className="text-gray-600 mb-4">The book you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/books')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Button>
        </div>
      </Layout>
    );
  }

  const isOwner = user?.id === book.seller?.id;
  const showCommissionDetails = isOwner || isAdmin;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl">
        {/* Mobile back button */}
        <div className="mb-4 sm:mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="text-book-600 hover:bg-book-50 p-2 sm:p-3"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left column - Images and Description */}
          <div className="lg:col-span-2 space-y-6">
            <BookImageSection book={book} />
            <BookInfo book={book} />
            <BookDescription book={book} />
            
            {/* Mobile-only pricing card */}
            <div className="lg:hidden">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-book-600">
                      R{book.price?.toLocaleString()}
                    </span>
                  </div>
                  <BookActions
                    book={book}
                    user={user}
                    onBuyNow={handleBuyNow}
                    onAddToCart={handleAddToCart}
                    onEditBook={handleEditBook}
                    onShare={handleShare}
                    onViewSellerProfile={handleViewSellerProfile}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right column - Pricing and Actions (Desktop only) */}
          <div className="hidden lg:block space-y-6">
            <BookActions
              book={book}
              user={user}
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
              onEditBook={handleEditBook}
              onShare={handleShare}
              onViewSellerProfile={handleViewSellerProfile}
            />
            
            {showCommissionDetails && (
              <BookPricing
                price={book.price}
                commission={book.price * 0.1}
                sellerReceives={book.price * 0.9}
                showCommissionDetails={showCommissionDetails}
              />
            )}
            
            <SellerInfo 
              seller={book.seller} 
              onViewProfile={handleViewSellerProfile}
            />
          </div>
        </div>

        {/* Mobile seller info and report button */}
        <div className="lg:hidden mt-6 space-y-4">
          <SellerInfo 
            seller={book.seller} 
            onViewProfile={handleViewSellerProfile}
          />
          
          {!isOwner && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReportBook}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Report Issue
              </Button>
            </div>
          )}
        </div>

        {/* Desktop report button */}
        {!isOwner && (
          <div className="hidden lg:flex justify-center mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReportBook}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Report Issue with this Book
            </Button>
          </div>
        )}

        <ReportBookDialog
          isOpen={isReportDialogOpen}
          onClose={() => setIsReportDialogOpen(false)}
          bookId={book.id}
          bookTitle={book.title}
        />
      </div>
    </Layout>
  );
};

export default BookDetails;
