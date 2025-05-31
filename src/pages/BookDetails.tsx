
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { getBookById } from '@/services/bookService';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Flag, ShoppingCart, User } from 'lucide-react';
import { toast } from 'sonner';
import BookImageCarousel from '@/components/BookImageCarousel';
import ReportBookDialog from '@/components/ReportBookDialog';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadBook();
    }
  }, [id]);

  const loadBook = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const bookData = await getBookById(id);
      if (!bookData) {
        toast.error('Book not found');
        navigate('/books');
        return;
      }
      setBook(bookData);
    } catch (error) {
      console.error('Error loading book:', error);
      toast.error('Failed to load book details');
      navigate('/books');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to purchase books');
      navigate('/login');
      return;
    }

    if (book?.sold) {
      toast.error('This book has already been sold');
      return;
    }

    if (user?.id === book?.seller?.id) {
      toast.error('You cannot buy your own book');
      return;
    }

    navigate(`/checkout/${id}`);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add books to cart');
      navigate('/login');
      return;
    }

    if (book?.sold) {
      toast.error('This book has already been sold');
      return;
    }

    if (user?.id === book?.seller?.id) {
      toast.error('You cannot add your own book to cart');
      return;
    }

    if (book) {
      addToCart(book);
    }
  };

  const handleViewSellerProfile = () => {
    if (book?.seller?.id) {
      navigate(`/profile/${book.seller.id}`);
    }
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
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-4">by {book.author}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{book.category}</Badge>
                <Badge variant="outline">{book.condition}</Badge>
                {book.sold && <Badge variant="destructive">Sold</Badge>}
              </div>
            </div>

            {/* Book Details - Moved above price */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-lg">Book Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Category:</span>
                    <p className="text-gray-600">{book.category}</p>
                  </div>
                  <div>
                    <span className="font-medium">Condition:</span>
                    <p className="text-gray-600">{book.condition}</p>
                  </div>
                  {book.universityYear && (
                    <div>
                      <span className="font-medium">University Year:</span>
                      <p className="text-gray-600">{book.universityYear}</p>
                    </div>
                  )}
                  {book.grade && (
                    <div>
                      <span className="font-medium">Grade:</span>
                      <p className="text-gray-600">{book.grade}</p>
                    </div>
                  )}
                </div>
                {book.description && (
                  <div>
                    <span className="font-medium">Description:</span>
                    <p className="text-gray-600 mt-1">{book.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Price */}
            <div className="bg-book-50 p-4 rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-book-600">R{book.price}</p>
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Seller: {book.seller?.name || 'Unknown'}</p>
                    <p className="text-sm text-gray-600">
                      Member since {new Date().getFullYear()}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewSellerProfile}
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    View Profile
                  </Button>
                </div>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    Like what you see? Check their profile for more books like this.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!book.sold && user?.id !== book.seller?.id && (
                <>
                  <Button
                    onClick={handleBuyNow}
                    className="w-full bg-book-600 hover:bg-book-700 text-base md:text-lg py-3"
                    size="lg"
                  >
                    Buy Now
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="w-full text-base md:text-lg py-3"
                    size="lg"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </>
              )}
              
              {book.sold && (
                <Button disabled className="w-full text-base md:text-lg py-3" size="lg">
                  Sold Out
                </Button>
              )}

              {user?.id === book.seller?.id && (
                <Button
                  onClick={() => navigate(`/edit-book/${book.id}`)}
                  variant="outline"
                  className="w-full text-base md:text-lg py-3"
                  size="lg"
                >
                  Edit Book
                </Button>
              )}

              <div className="flex gap-3">
                <ReportBookDialog
                  bookId={book.id}
                  bookTitle={book.title}
                  sellerId={book.seller?.id || ''}
                  sellerName={book.seller?.name || 'Unknown'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetails;
