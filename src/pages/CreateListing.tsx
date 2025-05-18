
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createBook } from '@/services/bookService';
import { BookFormData } from '@/types/book';
import { toast } from 'sonner';
import { ArrowLeft, Upload } from 'lucide-react';

const CreateListing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    description: '',
    price: 0,
    condition: 'Good',
    category: '',
    imageUrl: 'https://source.unsplash.com/random/300x400/?textbook'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    'Like New',
    'Very Good',
    'Good',
    'Acceptable',
    'Poor'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' ? parseFloat(value) || 0 : value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.category) newErrors.category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (!user) {
        throw new Error('You must be logged in to create a listing');
      }

      const newBook = await createBook(
        formData,
        user.id,
        user.name,
        user.email
      );

      toast.success('Book listing created successfully!');
      navigate(`/books/${newBook.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-book-800 mb-6">Sell Your Textbook</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title" className="text-base font-medium">
                    Book Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter the title of your textbook"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                </div>

                {/* Author */}
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

                {/* Price */}
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

                {/* Category */}
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

                {/* Condition */}
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
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Description */}
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

                {/* Image Upload (Simulated) */}
                <div>
                  <Label className="text-base font-medium">
                    Book Image
                  </Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex justify-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Drag and drop an image here, or click to select a file
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG or GIF up to 5MB
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4 border-book-600 text-book-600"
                      onClick={() => toast.info('Image upload functionality would be implemented here')}
                    >
                      Upload Image
                    </Button>
                    <p className="text-xs text-gray-500 mt-4">
                      For demo purposes, a placeholder image will be used
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commission notice */}
            <div className="p-4 bg-book-50 rounded-lg border border-book-200 mt-6">
              <p className="text-book-800">
                <strong>Please note:</strong> A commission fee of R15 will be deducted from the sale price when your book is sold.
              </p>
            </div>

            {/* Submit button */}
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
    </Layout>
  );
};

export default CreateListing;
