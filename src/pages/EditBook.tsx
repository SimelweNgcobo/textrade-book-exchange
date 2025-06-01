
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookSchema, BookInput } from '@/schemas/bookSchema';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';
import MultiImageUpload from '@/components/MultiImageUpload';
import { getBookById } from '@/services/book/bookQueries';
import { updateBook } from '@/services/book/bookMutations';
import { categories } from '@/constants/categories';
import { ArrowLeft } from 'lucide-react';

const EditBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookInput>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      title: '',
      author: '',
      description: '',
      price: 0,
      categoryId: '',
      frontCover: '',
      backCover: '',
      insidePages: ''
    },
    mode: "onChange"
  });

  useEffect(() => {
    const loadBookData = async () => {
      if (!bookId) {
        toast.error('Book ID is missing');
        navigate('/profile');
        return;
      }

      try {
        console.log('Loading book with ID:', bookId);
        setIsLoading(true);
        const bookData = await getBookById(bookId);
        
        if (bookData) {
          console.log('Book data loaded:', bookData);
          const formattedData = {
            title: bookData.title,
            author: bookData.author,
            description: bookData.description,
            price: bookData.price,
            categoryId: bookData.category,
            frontCover: bookData.frontCover || '',
            backCover: bookData.backCover || '',
            insidePages: bookData.insidePages || ''
          };
          
          form.reset(formattedData);
        } else {
          toast.error('Book not found');
          navigate('/profile');
        }
      } catch (error) {
        console.error('Error loading book data:', error);
        toast.error('Failed to load book data');
        navigate('/profile');
      } finally {
        setIsLoading(false);
      }
    };

    loadBookData();
  }, [bookId, form, navigate]);

  const onSubmit = async (values: BookInput) => {
    try {
      if (!bookId) {
        toast.error('Book ID is missing');
        return;
      }
      
      console.log('Updating book with values:', values);
      setIsSubmitting(true);
      
      const updatedBook = await updateBook(bookId, values);
      
      if (updatedBook) {
        toast.success('Book updated successfully!');
        navigate('/profile');
      } else {
        toast.error('Failed to update book');
      }
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
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
          <h1 className="text-2xl font-bold mb-6">Edit Book</h1>
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
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
        <h1 className="text-2xl font-bold mb-6">Edit Book</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Book title" {...field} />
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
                    <Input placeholder="Book author" {...field} />
                  </FormControl>
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
                      placeholder="Book description"
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <MultiImageUpload
                onImagesChange={(images) => {
                  form.setValue('frontCover', images.frontCover || '');
                  form.setValue('backCover', images.backCover || '');
                  form.setValue('insidePages', images.insidePages || '');
                }}
                currentImages={{
                  frontCover: form.watch('frontCover'),
                  backCover: form.watch('backCover'),
                  insidePages: form.watch('insidePages')
                }}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/profile')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-book-600 hover:bg-book-700"
              >
                {isSubmitting ? 'Updating...' : 'Update Book'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default EditBook;
