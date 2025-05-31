
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import BookFilters from '@/components/book-listing/BookFilters';
import BookGrid from '@/components/book-listing/BookGrid';
import { getBooks } from '@/services/bookService';
import { Book } from '@/types/book';

const BookListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedUniversityYear, setSelectedUniversityYear] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [bookType, setBookType] = useState<'all' | 'school' | 'university'>('all');
  
  useEffect(() => {
    loadBooks();
  }, [searchParams]);
  
  const loadBooks = async () => {
    setIsLoading(true);
    try {
      const searchQuery = searchParams.get('search') || '';
      const category = searchParams.get('category') || '';
      const grade = searchParams.get('grade') || '';
      const universityYear = searchParams.get('universityYear') || '';
      
      const filters: {
        search?: string;
        category?: string;
        condition?: string;
        grade?: string;
        universityYear?: string;
        minPrice?: number;
        maxPrice?: number;
      } = {};
      
      if (searchQuery) filters.search = searchQuery;
      if (category) filters.category = category;
      if (selectedCondition) filters.condition = selectedCondition;
      if (grade) filters.grade = grade;
      if (universityYear) filters.universityYear = universityYear;
      
      if (priceRange[0] > 0) filters.minPrice = priceRange[0];
      if (priceRange[1] < 1000) filters.maxPrice = priceRange[1];
      
      const loadedBooks = await getBooks(filters);
      console.log('Loaded books:', loadedBooks.length);
      setBooks(loadedBooks);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters();
  };
  
  const updateFilters = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedGrade) params.set('grade', selectedGrade);
    if (selectedUniversityYear) params.set('universityYear', selectedUniversityYear);
    
    setSearchParams(params);
    loadBooks();
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCondition('');
    setSelectedGrade('');
    setSelectedUniversityYear('');
    setPriceRange([0, 1000]);
    setBookType('all');
    setSearchParams({});
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-book-800 mb-8">Browse Books</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <BookFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCondition={selectedCondition}
            setSelectedCondition={setSelectedCondition}
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            selectedUniversityYear={selectedUniversityYear}
            setSelectedUniversityYear={setSelectedUniversityYear}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            bookType={bookType}
            setBookType={setBookType}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            onSearch={handleSearch}
            onUpdateFilters={updateFilters}
            onClearFilters={clearFilters}
          />
          
          <BookGrid
            books={books}
            isLoading={isLoading}
            onClearFilters={clearFilters}
          />
        </div>
      </div>
    </Layout>
  );
};

export default BookListing;
