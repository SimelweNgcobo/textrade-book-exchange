
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, School, GraduationCap } from 'lucide-react';
import { Book } from '@/types/book';

interface BookGridProps {
  books: Book[];
  isLoading: boolean;
  onClearFilters: () => void;
}

const BookGrid = ({ books, isLoading, onClearFilters }: BookGridProps) => {
  if (isLoading) {
    return (
      <div className="lg:w-3/4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-600"></div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="lg:w-3/4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-book-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No books found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
          <Button 
            onClick={onClearFilters}
            variant="outline"
            className="border-book-600 text-book-600"
          >
            Clear all filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-3/4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link 
            key={book.id}
            to={`/books/${book.id}`}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200 book-card-hover flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={book.frontCover || book.imageUrl} 
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-book-800">
                R{book.price.toLocaleString()}
              </div>
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-bold text-lg mb-1 text-book-800 line-clamp-1">{book.title}</h3>
              <p className="text-gray-600 mb-2">{book.author}</p>
              <p className="text-gray-500 text-sm mb-auto line-clamp-2">{book.description}</p>
              <div className="flex flex-wrap items-center justify-between mt-4 gap-1">
                <span className="bg-book-100 text-book-800 px-2 py-1 rounded text-xs font-medium">
                  {book.condition}
                </span>
                {book.grade && (
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium flex items-center">
                    <School className="h-3 w-3 mr-1" />
                    {book.grade}
                  </span>
                )}
                {book.universityYear && (
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium flex items-center">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {book.universityYear}
                  </span>
                )}
                <span className="text-gray-500 text-xs">{book.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
