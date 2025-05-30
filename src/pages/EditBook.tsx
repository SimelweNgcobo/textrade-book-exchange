
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookSchema, BookInput } from '@/schemas/bookSchema';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
import { getBook, updateBook } from '@/services/bookService';
import { categories } from '@/constants/categories';

const EditBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();
  const [formData, setFormData] = useState<BookInput>({
    title: '',
    author: '',
    description: '',
    price: 0,
    categoryId: '',
    frontCover: '',
    backCover: '',
    insidePages: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<BookInput>({
    resolver: zodResolver(BookSchema),
    defaultValues: formData,
    mode: "onChange"
  });

  useEffect(() => {
    if (bookId) {
      loadBookData(bookId);
    }
  }, [bookId]);

  const loadBookData = async (id: string) => {
    setIsLoading(true);
    try {
      const bookData = await getBook(id);
      if (bookData) {
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
        setFormData(formattedData);
        form.reset(formattedData);
      } else {
        toast.error('Book not found');
        navigate('/admin/books');
      }
    } catch (error) {
      console.error('Error loading book data:', error);
      toast.error('Failed to load book data');
      navigate('/admin/books');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: BookInput) => {
    try {
      if (!bookId) {
        toast.error('Book ID is missing');
        return;
      }
      await updateBook(bookId, values);
      toast.success('Book updated successfully!');
      navigate('/admin/books');
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
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
                      className="resize-none"
                      {...field}
                    />
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
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Book price"
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
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Images
                </label>
                <MultiImageUpload
                  onImagesChange={(images) => {
                    setFormData(prev => ({
                      ...prev,
                      frontCover: images.frontCover || '',
                      backCover: images.backCover || '',
                      insidePages: images.insidePages || ''
                    }));
                    // Update form values as well
                    form.setValue('frontCover', images.frontCover || '');
                    form.setValue('backCover', images.backCover || '');
                    form.setValue('insidePages', images.insidePages || '');
                  }}
                  currentImages={{
                    frontCover: formData.frontCover,
                    backCover: formData.backCover,
                    insidePages: formData.insidePages
                  }}
                />
                {(formData.frontCover || formData.backCover || formData.insidePages) && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Current images:</p>
                    <div className="flex gap-2 flex-wrap">
                      {formData.frontCover && (
                        <div className="relative">
                          <img 
                            src={formData.frontCover} 
                            alt="Front Cover" 
                            className="w-20 h-20 object-cover rounded border"
                          />
                          <p className="text-xs text-center mt-1">Front</p>
                        </div>
                      )}
                      {formData.backCover && (
                        <div className="relative">
                          <img 
                            src={formData.backCover} 
                            alt="Back Cover" 
                            className="w-20 h-20 object-cover rounded border"
                          />
                          <p className="text-xs text-center mt-1">Back</p>
                        </div>
                      )}
                      {formData.insidePages && (
                        <div className="relative">
                          <img 
                            src={formData.insidePages} 
                            alt="Inside Pages" 
                            className="w-20 h-20 object-cover rounded border"
                          />
                          <p className="text-xs text-center mt-1">Inside</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit">Update Book</Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default EditBook;
