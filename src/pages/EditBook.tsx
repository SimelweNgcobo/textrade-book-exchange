
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { getBookById } from '@/services/bookService';
import { updateBook, deleteBook } from '@/services/bookEditService';
import MultiImageUpload from '@/components/MultiImageUpload';
import { useAuth } from '@/contexts/AuthContext';

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [frontCover, setFrontCover] = useState('');
  const [backCover, setBackCover] = useState('');
  const [insidePages, setInsidePages] = useState('');

  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', id],
    queryFn: () => getBookById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
      setPrice(book.price.toString());
      setCategory(book.category);
      setCondition(book.condition);
      setFrontCover(book.frontCover || '');
      setBackCover(book.backCover || '');
      setInsidePages(book.insidePages || '');
    }
  }, [book]);

  // Check if user owns this book
  useEffect(() => {
    if (book && user && book.seller.id !== user.id) {
      toast.error('You can only edit your own listings');
      navigate('/profile');
    }
  }, [book, user, navigate]);

  const handleImageUpload = (images: { frontCover: string; backCover: string; insidePages: string }) => {
    setFrontCover(images.frontCover);
    setBackCover(images.backCover);
    setInsidePages(images.insidePages);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    // Validate required fields
    if (!title.trim() || !author.trim() || !description.trim() || !price || !category || !condition) {
      toast.error('Please fill in all required fields');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    setIsUpdating(true);
    try {
      await updateBook(id, {
        title: title.trim(),
        author: author.trim(),
        description: description.trim(),
        price: priceNum,
        category,
        condition,
        frontCover,
        backCover,
        insidePages
      });
      
      toast.success('Book updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    setIsDeleting(true);
    try {
      await deleteBook(id);
      toast.success('Book deleted successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
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

  if (error || !book) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Book Not Found</h2>
            <p className="text-gray-600 mb-4">The book you're looking for doesn't exist or you don't have permission to edit it.</p>
            <Button onClick={() => navigate('/profile')}>Back to Profile</Button>
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Edit Book Listing
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Book Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter book title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the book condition, contents, etc."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (R) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="condition">Condition *</Label>
                    <Select value={condition} onValueChange={setCondition} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
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

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Textbooks">Textbooks</SelectItem>
                      <SelectItem value="Fiction">Fiction</SelectItem>
                      <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                      <SelectItem value="Reference">Reference</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <Label className="flex items-center mb-2">
                  <Upload className="h-4 w-4 mr-2" />
                  Update Book Images
                </Label>
                <MultiImageUpload 
                  onImagesUpload={handleImageUpload}
                  existingImages={{
                    frontCover,
                    backCover,
                    insidePages
                  }}
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  'Update Book Listing'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Book Listing</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete "{book.title}"? This action cannot be undone.</p>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default EditBook;
