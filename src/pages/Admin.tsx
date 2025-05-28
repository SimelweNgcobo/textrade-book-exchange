
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book } from '@/types/book';
import { getAllBooks } from '@/services/bookService';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSold, setFilterSold] = useState<'all' | 'available' | 'sold'>('all');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !profile?.isAdmin) {
      navigate('/login');
      return;
    }

    const loadBooks = async () => {
      setIsLoading(true);
      try {
        const allBooks = await getAllBooks(true);
        setBooks(allBooks);
      } catch (error) {
        console.error('Error loading books:', error);
        toast.error('Failed to load books');
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [user, profile?.isAdmin, navigate]);

  const handleDeleteBook = async (bookId: string, bookTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${bookTitle}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(bookId);
    try {
      const { adminDeleteBook } = await import('@/services/bookEditService');
      await adminDeleteBook(bookId);
      
      // Remove the book from the local state
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
      toast.success('Book deleted successfully');
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredBooks = books.filter((book) => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const matchesSearch = searchRegex.test(book.title) || searchRegex.test(book.author);

    let matchesSoldStatus = true;
    if (filterSold === 'available') {
      matchesSoldStatus = !book.sold;
    } else if (filterSold === 'sold') {
      matchesSoldStatus = book.sold;
    }

    return matchesSearch && matchesSoldStatus;
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-600"></div>
        </div>
      </Layout>
    );
  }

  if (!profile?.isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
            <p className="text-gray-600">You do not have permission to view this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-book-800 mb-6">Admin Dashboard</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <Input
              type="text"
              placeholder="Search books..."
              className="md:w-1/3 mb-2 md:mb-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex items-center space-x-2">
              <label htmlFor="filterSold" className="text-sm font-medium text-gray-700">Filter:</label>
              <select
                id="filterSold"
                className="border rounded px-2 py-1 text-sm"
                value={filterSold}
                onChange={(e) => setFilterSold(e.target.value as 'all' | 'available' | 'sold')}
              >
                <option value="all">All Books</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <div key={book.id} className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={book.imageUrl} 
                    alt={book.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{book.title}</h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                    <p className="text-sm text-gray-500">
                      Seller: {book.seller.name} | Price: R{book.price} | 
                      Status: {book.sold ? 'Sold' : 'Available'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/books/${book.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteBook(book.id, book.title)}
                    disabled={isDeleting === book.id}
                  >
                    {isDeleting === book.id ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </div>
                    ) : (
                      'Delete'
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">No books found.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
