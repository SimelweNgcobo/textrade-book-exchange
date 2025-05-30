
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import MultiImageUpload from '@/components/MultiImageUpload';
import { ArrowLeft } from 'lucide-react';
import { getBookById } from '@/services/bookService';
import { updateBook } from '@/services/bookEditService';
import { Book, BookFormData } from '@/types/book';

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    description: '',
    price: 0,
    category: '',
    condition: 'Good',
    imageUrl: '',
    frontCover: '',
    backCover: '',
    insidePages: '',
    grade: '',
    universityYear: ''
  });

  useEffect(() => {
    const loadBook = async () => {
      if (!id) return;
      
      try {
        const bookData = await getBookById(id);
        if (bookData) {
          setBook(bookData);
          setFormData({
            title: bookData.title,
            author: bookData.author,
            description: bookData.description,
            price: bookData.price,
            category: bookData.category,
            condition: bookData.condition,
            imageUrl: bookData.imageUrl,
            frontCover: bookData.frontCover || '',
            backCover: bookData.backCover || '',
            insidePages: bookData.insidePages || '',
            grade: bookData.grade || '',
            universityYear: bookData.universityYear || ''
          });
        } else {
          toast.error('Book not found');
          navigate('/profile');
        }
      } catch (error) {
        console.error('Error loading book:', error);
        toast.error('Failed to load book details');
        navigate('/profile');
      } finally {
        setIsLoading(false);
      }
    };

    loadBook();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsSubmitting(true);
    try {
      await updateBook(id, formData);
      toast.success('Book updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpdate = (images: { frontCover?: string; backCover?: string; insidePages?: string }) => {
    setFormData(prev => ({
      ...prev,
      ...images
    }));
  };

  const handleConditionChange = (value: string) => {
    const validConditions = ["New", "Good", "Better", "Average", "Below Average"] as const;
    if (validConditions.includes(value as any)) {
      setFormData({ ...formData, condition: value as typeof validConditions[number] });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/profile')} 
          className="mb-6 text-book-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-book-800 mb-6">Edit Book Listing</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (R)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select value={formData.condition} onValueChange={handleConditionChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Better">Better</SelectItem>
                    <SelectItem value="Average">Average</SelectItem>
                    <SelectItem value="Below Average">Below Average</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="grade">Grade (optional)</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="universityYear">University Year (optional)</Label>
              <Input
                id="universityYear"
                value={formData.universityYear}
                onChange={(e) => setFormData({ ...formData, universityYear: e.target.value })}
                placeholder="e.g., 1st Year, 2nd Year"
              />
            </div>

            <div>
              <Label>Book Images</Label>
              <MultiImageUpload
                onImagesChange={handleImageUpdate}
                existingImages={{
                  frontCover: formData.frontCover,
                  backCover: formData.backCover,
                  insidePages: formData.insidePages
                }}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Updating...' : 'Update Book'}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditBook;
