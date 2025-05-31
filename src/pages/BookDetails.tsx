
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import BookImageCarousel from '@/components/BookImageCarousel';
import BookInfo from '@/components/book-details/BookInfo';
import BookActions from '@/components/book-details/BookActions';
import SellerInfo from '@/components/book-details/SellerInfo';
import ReportBookDialog from '@/components/ReportBookDialog';
import { useBookDetails } from '@/hooks/useBookDetails';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    book,
    isLoading,
    user,
    handleBuyNow,
    handleAddToCart,
    handleViewSellerProfile,
    handleEditBook
  } = useBookDetails(id);

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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Not Found</h1>
            <p className="text-gray-600">The book you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Fix: Create proper image array with filter to remove null/undefined values
  const bookImages = [
    book.frontCover,
    book.imageUrl,
    book.backCover,
    book.insidePages
  ].filter(Boolean) as string[];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <BookImageCarousel images={bookImages} />
          </div>

          {/* Middle Column - Book Details */}
          <div className="lg:col-span-1">
            <BookInfo book={book} />
          </div>

          {/* Right Column - Actions & Seller */}
          <div className="lg:col-span-1 space-y-6">
            <BookActions
              book={book}
              user={user}
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
              onEditBook={handleEditBook}
            />
            <SellerInfo
              book={book}
              onViewSellerProfile={handleViewSellerProfile}
            />
            
            {/* Add Report Button */}
            {user && user.id !== book.seller?.id && (
              <div className="mt-4">
                <ReportBookDialog
                  bookId={book.id}
                  bookTitle={book.title}
                  sellerId={book.seller?.id || ''}
                  sellerName={book.seller?.name || 'Unknown'}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetails;
