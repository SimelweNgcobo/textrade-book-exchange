
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, MapPin } from 'lucide-react';
import { Book } from '@/types/book';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  book: Book;
  isOwner?: boolean;
  onEdit?: (bookId: string) => void;
  onDelete?: (bookId: string, bookTitle: string) => void;
  className?: string;
}

const BookCard = ({ 
  book, 
  isOwner = false, 
  onEdit, 
  onDelete,
  className = ""
}: BookCardProps) => {
  const navigate = useNavigate();

  const handleViewBook = () => {
    // Ensure we have a valid book ID before navigating
    if (book.id) {
      console.log('Navigating to book:', book.id);
      navigate(`/books/${book.id}`);
    } else {
      console.error('Book ID is missing:', book);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit && book.id) {
      onEdit(book.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && book.id) {
      onDelete(book.id, book.title);
    }
  };

  const getImageUrl = () => {
    // Prioritize frontCover, then fall back to imageUrl
    return book.frontCover || book.imageUrl || '/placeholder.svg';
  };

  return (
    <div className={`bg-white border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 cursor-pointer ${className}`}>
      <div onClick={handleViewBook}>
        <div className="relative">
          <img
            src={getImageUrl()}
            alt={book.title}
            className="w-full h-24 sm:h-32 object-cover rounded mb-3"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          {book.sold && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
              <span className="text-white font-semibold text-sm">SOLD</span>
            </div>
          )}
        </div>
        
        <h4 className="font-semibold text-sm truncate mb-1" title={book.title}>
          {book.title}
        </h4>
        <p className="text-xs text-gray-600 truncate mb-1" title={`by ${book.author}`}>
          by {book.author}
        </p>
        
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-book-600">R{book.price}</p>
          {book.condition && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {book.condition}
            </span>
          )}
        </div>

        {book.category && (
          <p className="text-xs text-gray-500 mb-2">{book.category}</p>
        )}
      </div>
      
      <div className="mt-3 space-y-2" onClick={(e) => e.stopPropagation()}>
        <Button
          onClick={handleViewBook}
          variant="outline"
          size="sm"
          className="w-full text-xs hover:bg-book-50 hover:border-book-300"
          disabled={!book.id}
        >
          <Eye className="h-3 w-3 mr-1" />
          View Details
        </Button>
        
        {isOwner && onEdit && onDelete && !book.sold && (
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleEdit}
              variant="outline"
              size="sm"
              className="text-xs hover:bg-blue-50 hover:border-blue-300"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              size="sm"
              className="text-xs"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
