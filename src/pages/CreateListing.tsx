import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createBook, calculateCommission, calculateSellerReceives } from '@/services/bookService';
import { BookFormData } from '@/types/book';
import { toast } from 'sonner';
import { ArrowLeft, School, GraduationCap } from 'lucide-react';
import MultiImageUpload from '@/components/MultiImageUpload';
import FirstUploadSuccessDialog from '@/components/FirstUploadSuccessDialog';
import PostListingSuccessDialog from '@/components/PostListingSuccessDialog';
import ShareProfileDialog from '@/components/ShareProfileDialog';
import { hasCompletedFirstUpload, markFirstUploadCompleted } from '@/services/userPreferenceService';

const CreateListing = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    description: '',
    price: 0,
    condition: 'Good',
    category: '',
    grade: '',
    universityYear: null,
    imageUrl: ''
  });

  const [bookImages, setBookImages] = useState({
    frontCover: '',
    backCover: '',
    insidePages: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookType, setBookType] = useState<'school' | 'university'>('school');
  const [showFirstUploadDialog, setShowFirstUploadDialog] = useState(false);
  const [showPostListingDialog, setShowPostListingDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [createdBookId, setCreatedBookId] = useState<string | null>(null);

  const categories = [
    'Computer Science',
    'Mathematics',
    'Biology',
    'Chemistry',
    'Physics',
    'Economics',
    'Psychology',
    'Literature',
    'History',
    'Philosophy',
    'Engineering',
    'Medicine',
    'Law',
    'Business',
    'Other'
  ];

  const conditions = [
    'New',
    'Good',
    'Better',
    'Average',
    'Below Average'
  ];

  const grades = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
    'Grade 11', 'Grade 12'
  ];

  const universityYears = [
    '1st Year', '2nd Year', '3rd Year', '4th Year', 'Masters', 'Doctorate'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' ? parseFloat(value) || 0 : value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleBookTypeChange = (type: 'school' | 'university') => {
    setBookType(type);
    if (type === 'school') {
      setFormData({ ...formData, universityYear: null });
    } else {
      setFormData({ ...formData, grade: '' });
    }
  };

  const handleImagesChange = (images: { frontCover: string; backCover: string; insidePages: string }) => {
    setBookImages(images);
    setFormData({ ...formData, imageUrl: images.frontCover });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.category) newErrors.category = 'Category is required';
    
    if (bookType === 'school' && !formData.grade) {
      newErrors.grade = 'Grade is required for school books';
    }
    
    if (bookType === 'university' && !formData.universityYear) {
      newErrors.universityYear = 'University year is required for university books';
    }

    if (!bookImages.frontCover) newErrors.frontCover = 'Front cover photo is required';
    if (!bookImages.backCover) newErrors.backCover = 'Back cover photo is required';
    if (!bookImages.insidePages) newErrors.insidePages = 'Inside pages photo is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      if (!bookImages.frontCover || !bookImages.backCover || !bookImages.insidePages) {
        toast.error('Please upload all three required photos before submitting');
      }
      return;
    }

    setIsSubmitting(true);
    try {
      if (!user || !profile) {
        throw new Error('You must be logged in to create a listing');
      }

      // Use the correct createBook function signature
      const newBook = await createBook(formData);

      setCreatedBookId(newBook.id);
      toast.success('Book listing created successfully!');
      console.log('Book created successfully:', newBook);
      
      // Check if this is the user's first upload
      if (!hasCompletedFirstUpload(user.id)) {
        markFirstUploadCompleted(user.id);
        setShowFirstUploadDialog(true);
      } else {
        // Show the "What to Expect Next" dialog for subsequent uploads
        setShowPostListingDialog(true);
      }
    } catch (error) {
      console.error('Error creating book:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFirstUploadClose = () => {
    setShowFirstUploadDialog(false);
    setShowPostListingDialog(true);
  };

  const handlePostListingClose = () => {
    setShowPostListingDialog(false);
    navigate('/profile');
  };

  const handleGoToProfile = () => {
    setShowPostListingDialog(false);
    navigate('/profile');
  };

  const handleShareProfile = () => {
    setShowShareDialog(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-book-800 mb-6">Sell Your Book</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <Label className="text-base font-medium mb-2 block">Book Type</Label>
              <RadioGroup 
                className="flex flex-col sm:flex-row gap-4" 
                defaultValue="school"
                value={bookType}
                onValueChange={(value) => handleBookTypeChange(value as 'school' | 'university')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="school" id="school" />
                  <Label htmlFor="school" className="flex items-center">
                    <School className="mr-2 h-4 w-4" />
                    School Book
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="university" id="university" />
                  <Label htmlFor="university" className="flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    University Book
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-sm text-gray-500 mt-2">
                We have both new and second-hand books available
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-base font-medium">
                    Book Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter the title of your book"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <Label htmlFor="author" className="text-base font-medium">
                    Author <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Enter the author's name"
                    className={errors.author ? 'border-red-500' : ''}
                  />
                  {errors.author && <p className="text-sm text-red-500 mt-1">{errors.author}</p>}
                </div>

                <div>
                  <Label htmlFor="price" className="text-base font-medium">
                    Price (R) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">R</span>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price || ''}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className={`pl-8 ${errors.price ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                </div>

                <div>
                  <Label htmlFor="category" className="text-base font-medium">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
                </div>

                {bookType === 'school' ? (
                  <div>
                    <Label htmlFor="grade" className="text-base font-medium">
                      Grade <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.grade}
                      onValueChange={(value) => handleSelectChange('grade', value)}
                    >
                      <SelectTrigger className={errors.grade ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select a grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {grades.map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.grade && <p className="text-sm text-red-500 mt-1">{errors.grade}</p>}
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="universityYear" className="text-base font-medium">
                      University Year <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.universityYear || ''}
                      onValueChange={(value) => handleSelectChange('universityYear', value)}
                    >
                      <SelectTrigger className={errors.universityYear ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select university year" />
                      </SelectTrigger>
                      <SelectContent>
                        {universityYears.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.universityYear && <p className="text-sm text-red-500 mt-1">{errors.universityYear}</p>}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="description" className="text-base font-medium">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide details about the book's condition, any marks or highlights, edition, etc."
                    className={`min-h-[150px] ${errors.description ? 'border-red-500' : ''}`}
                  />
                  {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                </div>

                <div>
                  <Label htmlFor="condition" className="text-base font-medium">
                    Condition <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => handleSelectChange('condition', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-2">
                    Rate the condition of your book from New to Below Average
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <MultiImageUpload
                onImagesChange={handleImagesChange}
                currentImages={bookImages}
                disabled={isSubmitting}
              />
              {(errors.frontCover || errors.backCover || errors.insidePages) && (
                <p className="text-sm text-red-500 mt-2">All three photos are required</p>
              )}
            </div>

            <div className="p-4 bg-book-50 rounded-lg border border-book-200 mt-6">
              <h3 className="font-semibold text-book-800 mb-2">Commission & Earnings</h3>
              <div className="space-y-2 text-sm">
                <p className="text-book-700">
                  <strong>Book Price:</strong> R{formData.price.toFixed(2)}
                </p>
                <p className="text-orange-600">
                  <strong>ReBooked Commission (10%):</strong> -R{calculateCommission(formData.price).toFixed(2)}
                </p>
                <p className="text-green-600 font-semibold">
                  <strong>You will receive:</strong> R{calculateSellerReceives(formData.price).toFixed(2)}
                </p>
              </div>
              <p className="text-book-600 mt-3 text-sm">
                ReBooked takes a 10% commission from each sale to maintain the platform and provide secure transactions.
              </p>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-book-600 hover:bg-book-700"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Listing...
                  </span>
                ) : (
                  'Create Listing'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <FirstUploadSuccessDialog
        isOpen={showFirstUploadDialog}
        onClose={handleFirstUploadClose}
        onShareProfile={handleShareProfile}
      />

      <PostListingSuccessDialog
        isOpen={showPostListingDialog}
        onClose={handlePostListingClose}
        onGoToProfile={handleGoToProfile}
      />

      {user && profile && (
        <ShareProfileDialog
          isOpen={showShareDialog}
          onClose={() => setShowShareDialog(false)}
          userId={user.id}
          userName={profile.name || 'User'}
          isOwnProfile={true}
        />
      )}
    </Layout>
  );
};

export default CreateListing;
