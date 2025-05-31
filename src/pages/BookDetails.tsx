
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import BookImageCarousel from '@/components/BookImageCarousel';
import BookInfo from '@/components/book-details/BookInfo';
import SellerInfo from '@/components/book-details/SellerInfo';
import BookActions from '@/components/book-details/BookActions';
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
    handleEditBook,
    navigate
  } = useBookDetails(id);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-600"></div>
        </div>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Book not found</h2>
            <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/books')} className="bg-book-600 hover:bg-book-700">
              Browse Books
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const bookImages = {
    frontCover: book.frontCover || book.imageUrl,
    backCover: book.backCover,
    insidePages: book.insidePages
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate('/books')} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Book Images */}
          <div className="space-y-4">
            <BookImageCarousel images={bookImages} bookTitle={book.title} />
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <BookInfo book={book} />
            
            <SellerInfo 
              book={book} 
              onViewSellerProfile={handleViewSellerProfile} 
            />

            <BookActions
              book={book}
              currentUserId={user?.id}
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
              onEditBook={handleEditBook}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetails;
