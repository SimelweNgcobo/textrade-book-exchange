
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { getBookById } from '@/services/bookService';
import { updateBook, deleteBook } from '@/services/bookEditService';
import { useAuth } from '@/contexts/AuthContext';
import { Book } from '@/types/book';
import MultiImageUpload from '@/components/MultiImageUpload';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  condition: z.string().min(1, 'Condition is required'),
});

type BookFormData = z.infer<typeof bookSchema>;

const categories = [
  'Engineering', 'Business', 'Science', 'Arts', 'Law', 'Medicine',
  'Computer Science', 'Mathematics', 'History', 'Literature', 'Other'
];

const conditions = ['New', 'Good', 'Better', 'Average', 'Below Average'];

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [images, setImages] = useState({
    frontCover: '',
    backCover: '',
    insidePages: ''
  });

  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      description: '',
      price: 0,
      category: '',
      condition: '',
    },
  });

  useEffect(() => {
    const loadBook = async () => {
      if (!id) return;

      try {
        const bookData = await getBookById(id);
        if (!bookData) {
          toast.error('Book not found');
          navigate('/profile');
          return;
        }

        if (bookData.seller.id !== user?.id) {
          toast.error('You can only edit your own books');
          navigate('/profile');
          return;
        }

        setBook(bookData);
        form.reset({
          title: bookData.title,
          author: bookData.author,
          description: bookData.description,
          price: bookData.price,
          category: bookData.category,
          condition: bookData.condition,
        });

        // Set initial images if available
        if (bookData.frontCover || bookData.backCover || bookData.insidePages) {
          setImages({
            frontCover: bookData.frontCover || '',
            backCover: bookData.backCover || '',
            insidePages: bookData.insidePages || ''
          });
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
  }, [id, user?.id, navigate, form]);

  const onSubmit = async (data: BookFormData) => {
    if (!book || !user) return;

    setIsSubmitting(true);
    try {
      await updateBook(book.id, {
        ...data,
        frontCover: images.frontCover,
        backCover: images.backCover,
        insidePages: images.insidePages
      });
      
      toast.success('Book updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!book || !user) return;

    setIsDeleting(true);
    try {
      await deleteBook(book.id);
      toast.success('Book deleted successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleImagesChange = (newImages: { frontCover: string; backCover: string; insidePages: string }) => {
    setImages(newImages);
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
            <p className="text-gray-600">Book not found</p>
            <Button onClick={() => navigate('/profile')} className="mt-4">
              Go back to profile
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/profile')} 
          className="mb-6 text-book-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-book-800">Edit Book Listing</h1>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Listing
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Book Listing</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{book.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Book Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter book title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (R)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {conditions.map((condition) => (
                            <SelectItem key={condition} value={condition}>
                              {condition}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the book's condition, content, and any other relevant details..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <MultiImageUpload
                  onImagesChange={handleImagesChange}
                  currentImages={images}
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-book-600 hover:bg-book-700"
                >
                  {isSubmitting ? 'Updating...' : 'Update Book'}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/profile')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default EditBook;
