
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getBookById } from '@/services/bookService';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, BookOpen, Check, Calendar, User, ShoppingCart } from 'lucide-react';
import BookImageCarousel from '@/components/BookImageCarousel';
import ReportBookDialog from '@/components/ReportBookDialog';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const loadBook = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const bookData = await getBookById(id);
        if (!bookData) {
          setError('Book not found');
        } else {
          console.log('Loaded book data:', bookData);
          setBook(bookData);
        }
      } catch (error) {
        console.error('Error loading book:', error);
        setError('Failed to load book details');
      } finally {
        setIsLoading(false);
      }
    };

    loadBook();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (book) {
      navigate(`/checkout/${book.id}`);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (book) {
      addToCart(book);
    }
  };

  const handleViewSellerProfile = () => {
    if (book) {
      navigate(`/user/${book.seller.id}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !book) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={handleBack} className="mb-6 text-book-600">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-book-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Book not found</h3>
            <p className="text-gray-500 mb-6">{error || 'The book you are looking for does not exist'}</p>
            <Button onClick={() => navigate('/books')} className="bg-book-600 hover:bg-book-700">
              Browse other books
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const isOwner = user?.id === book.seller.id;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleBack} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to listings
        </Button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Book Image Carousel */}
            <div className="md:w-1/2 lg:w-2/5 p-6">
              <BookImageCarousel
                images={{
                  frontCover: book.frontCover || book.imageUrl,
                  backCover: book.backCover,
                  insidePages: book.insidePages
                }}
                bookTitle={book.title}
              />
            </div>

            {/* Book Details */}
            <div className="md:w-1/2 lg:w-3/5 p-6">
              <div className="flex flex-wrap items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-book-800 mb-2 flex-grow">{book.title}</h1>
                <div className="text-2xl font-bold text-book-600">R{book.price}</div>
              </div>

              <p className="text-lg text-gray-600 mb-4">By {book.author}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-book-100 text-book-800 hover:bg-book-200">{book.category}</Badge>
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Condition: {book.condition}</Badge>
                {book.sold ? (
                  <Badge variant="destructive">Sold</Badge>
                ) : (
                  <Badge variant="outline" className="border-green-500 text-green-600 flex items-center">
                    <Check className="mr-1 h-3 w-3" /> Available
                  </Badge>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-book-800">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <User className="h-5 w-5 mr-2" />
                  <span>Seller: {book.seller.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Listed on: {formatDate(book.createdAt)}</span>
                </div>
              </div>

              {/* Seller Profile Link */}
              {!isOwner && (
                <div className="mb-6 p-4 bg-book-50 rounded-lg border border-book-200">
                  <p className="text-sm text-book-700 mb-2">Like what you see?</p>
                  <Button
                    variant="outline"
                    onClick={handleViewSellerProfile}
                    className="text-book-600 border-book-300 hover:bg-book-100"
                  >
                    Check their profile for more books like this
                  </Button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {!book.sold && !isOwner && (
                  <>
                    <Button
                      onClick={handleBuyNow}
                      size="lg"
                      className="bg-book-600 hover:bg-book-700"
                    >
                      Buy Now for R{book.price}
                    </Button>
                    <Button
                      onClick={handleAddToCart}
                      size="lg"
                      variant="outline"
                      className="border-book-600 text-book-600 hover:bg-book-50"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </>
                )}
                
                {!isOwner && (
                  <ReportBookDialog
                    bookId={book.id}
                    bookTitle={book.title}
                    sellerId={book.seller.id}
                    sellerName={book.seller.name}
                  />
                )}
              </div>

              {isOwner && (
                <div className="mt-4 p-4 bg-book-50 rounded-lg border border-book-200">
                  <p className="text-book-800 font-medium">
                    This is your listing. You can manage it from your profile.
                  </p>
                </div>
              )}

              {book.sold && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700 font-medium">
                    This book has already been sold.
                  </p>
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
