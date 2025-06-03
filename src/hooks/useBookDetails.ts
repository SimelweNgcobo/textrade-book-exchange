
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { getBookById } from '@/services/bookService';
import { Book } from '@/types/book';
import { toast } from 'sonner';

export const useBookDetails = (bookId: string | undefined) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookId) {
      loadBook();
    }
  }, [bookId]);

  const loadBook = async () => {
    if (!bookId) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const bookData = await getBookById(bookId);
      if (!bookData) {
        setError('Book not found');
        toast.error('Book not found');
        navigate('/books');
        return;
      }
      setBook(bookData);
    } catch (error) {
      console.error('Error loading book:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load book details';
      setError(errorMessage);
      toast.error(errorMessage);
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

    navigate(`/checkout/${bookId}`);
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
      toast.success('Book added to cart');
    }
  };

  const handleViewSellerProfile = () => {
    if (book?.seller?.id) {
      navigate(`/user/${book.seller.id}`);
    } else {
      toast.error('Seller profile not available');
    }
  };

  const handleEditBook = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to edit books');
      navigate('/login');
      return;
    }

    if (user?.id !== book?.seller?.id) {
      toast.error('You can only edit your own books');
      return;
    }

    navigate(`/edit-book/${bookId}`);
  };

  return {
    book,
    isLoading,
    error,
    user,
    handleBuyNow,
    handleAddToCart,
    handleViewSellerProfile,
    handleEditBook,
    navigate
  };
};
