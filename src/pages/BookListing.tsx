import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getBooks } from '@/services/bookService';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { BookOpen, Filter, Search, School, GraduationCap } from 'lucide-react';

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
  
  // Available filter options
  const categories = ['Computer Science', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Economics', 'Psychology'];
  const conditions = ['New', 'Good', 'Better', 'Average', 'Below Average'];
  const grades = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
    'Grade 11', 'Grade 12'
  ];
  const universityYears = [
    '1st Year', '2nd Year', '3rd Year', '4th Year', 'Masters', 'Doctorate'
  ];
  
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
      
      // Create a filters object based on current search params and state
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
      
      // Only add price filters if they've been adjusted
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
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };
  
  const handleConditionChange = (condition: string) => {
    setSelectedCondition(condition === selectedCondition ? '' : condition);
  };

  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade === selectedGrade ? '' : grade);
    if (grade && grade !== selectedGrade) {
      setSelectedUniversityYear('');
      setBookType('school');
    }
  };

  const handleUniversityYearChange = (year: string) => {
    setSelectedUniversityYear(year === selectedUniversityYear ? '' : year);
    if (year && year !== selectedUniversityYear) {
      setSelectedGrade('');
      setBookType('university');
    }
  };

  const handleBookTypeChange = (type: 'all' | 'school' | 'university') => {
    setBookType(type);
    if (type === 'school') {
      setSelectedUniversityYear('');
    } else if (type === 'university') {
      setSelectedGrade('');
    }
  };
  
  const updateFilters = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedGrade) params.set('grade', selectedGrade);
    if (selectedUniversityYear) params.set('universityYear', selectedUniversityYear);
    
    setSearchParams(params);
    
    // Call loadBooks with all filters
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
          {/* Filters Section - Mobile Toggle */}
          <div className="lg:hidden mb-4">
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          {/* Filters Section */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-book-800">Filters</h2>
                <Button 
                  variant="link" 
                  onClick={clearFilters}
                  className="text-book-600 p-0 h-auto"
                >
                  Clear All
                </Button>
              </div>
              
              {/* Search Filter */}
              <form onSubmit={handleSearch} className="mb-6">
                <Label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</Label>
                <div className="relative">
                  <Input
                    id="search"
                    placeholder="Search by title, author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <button 
                    type="submit" 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Search className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </form>

              {/* Book Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Book Type</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={bookType === 'all' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleBookTypeChange('all')}
                    className="flex items-center"
                  >
                    <BookOpen className="mr-1 h-4 w-4" />
                    All
                  </Button>
                  <Button 
                    variant={bookType === 'school' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleBookTypeChange('school')}
                    className="flex items-center"
                  >
                    <School className="mr-1 h-4 w-4" />
                    School
                  </Button>
                  <Button 
                    variant={bookType === 'university' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleBookTypeChange('university')}
                    className="flex items-center"
                  >
                    <GraduationCap className="mr-1 h-4 w-4" />
                    University
                  </Button>
                </div>
              </div>
              
              {/* Grade Filter - Show only if bookType is 'school' or 'all' */}
              {(bookType === 'school' || bookType === 'all') && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Grade</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {grades.map((grade) => (
                      <div key={grade} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`grade-${grade}`}
                          checked={selectedGrade === grade}
                          onChange={() => handleGradeChange(grade)}
                          className="h-4 w-4 text-book-600 focus:ring-book-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`grade-${grade}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {grade}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* University Year Filter - Show only if bookType is 'university' or 'all' */}
              {(bookType === 'university' || bookType === 'all') && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">University Year</h3>
                  <div className="space-y-2">
                    {universityYears.map((year) => (
                      <div key={year} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`year-${year}`}
                          checked={selectedUniversityYear === year}
                          onChange={() => handleUniversityYearChange(year)}
                          className="h-4 w-4 text-book-600 focus:ring-book-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`year-${year}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {year}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-book-600 focus:ring-book-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Condition Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Condition</h3>
                <div className="space-y-2">
                  {conditions.map((condition) => (
                    <div key={condition} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`condition-${condition}`}
                        checked={selectedCondition === condition}
                        onChange={() => handleConditionChange(condition)}
                        className="h-4 w-4 text-book-600 focus:ring-book-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`condition-${condition}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                <div className="mt-4">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>R{priceRange[0]}</span>
                    <span>R{priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={updateFilters}
                className="w-full bg-book-600 hover:bg-book-700"
              >
                Apply Filters
              </Button>
            </div>
          </div>
          
          {/* Books Grid */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-600"></div>
              </div>
            ) : books.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-book-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No books found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
                <Button 
                  onClick={clearFilters}
                  variant="outline"
                  className="border-book-600 text-book-600"
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
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
                      {/* Fix: Show price only once in the top right corner */}
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
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookListing;
