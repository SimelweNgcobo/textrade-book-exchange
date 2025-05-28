
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  User, 
  Star, 
  BookIcon, 
  Calendar, 
  AlertTriangle, 
  MessageCircle,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';
import ShareProfileDialog from '@/components/ShareProfileDialog';
import BookNotSellingHelp from '@/components/BookNotSellingHelp';
import ProfileHeader from '@/components/ProfileHeader';
import { getUserBooks } from '@/services/bookService';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription, 
} from '@/components/ui/dialog';

const UserProfile = () => {
  const { id: userId } = useParams();
  const { user, profile, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState<any>(null);
  const [userBooks, setUserBooks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("listings");
  const [isLoading, setIsLoading] = useState(true);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      // Check if user is authenticated and if this is their own profile
      const isAuthenticated = !!user;
      const isOwn = isAuthenticated && (userId === user?.id || !userId);
      setIsOwnProfile(isOwn);
      
      try {
        // Load real user books
        const targetUserId = userId || user?.id;
        if (targetUserId) {
          const books = await getUserBooks(targetUserId);
          setUserBooks(books);
        }

        // Set user data
        const mockUser = {
          id: userId || user?.id,
          name: isOwn ? profile?.name || 'Current User' : 'Jane Smith',
          email: isOwn ? profile?.email : 'jane.smith@example.com',
          joinDate: '2024-11-15T00:00:00',
          isVerified: isOwn ? profile?.isVerified : true,
          rating: 4.8,
          successfulDeliveries: 12,
          reviews: [
            {
              id: 1,
              from: 'Bob Smith',
              rating: 5,
              comment: 'Great seller! Book was exactly as described and delivery was prompt.',
              date: '2025-04-25T09:15:00'
            },
            {
              id: 2,
              from: 'Alice Johnson',
              rating: 4,
              comment: 'Good experience overall. Would buy from again.',
              date: '2025-03-20T16:45:00'
            }
          ]
        };
        
        setUserData(mockUser);
      } catch (error) {
        console.error('Error loading user data:', error);
        toast.error('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [userId, user, profile]);

  const handleShareProfile = () => {
    setIsShareDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  const handleRateUser = () => {
    // Check if user is authenticated before allowing rating
    if (!user) {
      toast.error('Please log in to rate this user');
      navigate('/login');
      return;
    }
    setIsRatingDialogOpen(true);
  };

  const handleMessageUser = () => {
    // Check if user is authenticated before allowing messaging
    if (!user) {
      toast.error('Please log in to message this user');
      navigate('/login');
      return;
    }
    toast.info('Message feature coming soon');
  };

  const handleReportUser = () => {
    // Check if user is authenticated before allowing reports
    if (!user) {
      toast.error('Please log in to report this user');
      navigate('/login');
      return;
    }
    navigate('/report');
  };

  const submitRating = async () => {
    if (!reviewComment.trim()) {
      toast.error('Please provide a comment with your rating');
      return;
    }
    
    setIsSubmittingRating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReview = {
        id: Date.now(),
        from: profile?.name || 'Anonymous',
        rating,
        comment: reviewComment,
        date: new Date().toISOString()
      };
      
      setUserData({
        ...userData,
        reviews: [newReview, ...userData.reviews],
        rating: ((userData.rating * userData.reviews.length) + rating) / (userData.reviews.length + 1)
      });
      
      toast.success('Rating submitted successfully');
      setIsRatingDialogOpen(false);
      setRating(5);
      setReviewComment('');
    } catch (error) {
      toast.error('Failed to submit rating');
    } finally {
      setIsSubmittingRating(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-600"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        {/* Profile Header */}
        <ProfileHeader 
          userData={userData}
          isOwnProfile={isOwnProfile}
          onShareProfile={handleShareProfile}
          onRateUser={!isOwnProfile ? handleRateUser : undefined}
          onMessageUser={!isOwnProfile ? handleMessageUser : undefined}
          onReportUser={!isOwnProfile ? handleReportUser : undefined}
        />
        
        <div className="mt-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              {isOwnProfile && (
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="listings">
              {userBooks.length > 0 ? (
                <div className="space-y-4">
                  {isOwnProfile && (
                    <div className="flex justify-end mb-4">
                      <BookNotSellingHelp />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userBooks.map((listing: any) => (
                      <div 
                        key={listing.id}
                        className="border border-book-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="relative h-48">
                          <img 
                            src={listing.imageUrl} 
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                          {listing.sold && (
                            <div className="absolute inset-0">
                              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                              <div className="absolute top-4 -left-8 bg-book-600 text-white text-sm font-bold py-2 px-10 transform rotate-[-45deg] shadow-lg">
                                SOLD
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-lg mb-2 line-clamp-1 text-gray-900">{listing.title}</h3>
                          <div className="flex justify-between items-center mb-3">
                            <p className="font-bold text-book-600 text-xl">R{listing.price}</p>
                            <Badge 
                              variant="outline" 
                              className="border-book-200 text-book-700 bg-book-50"
                            >
                              {listing.condition}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(listing.createdAt).toLocaleDateString()}
                            </div>
                            <Button 
                              variant="link" 
                              size="sm"
                              className="p-0 h-auto text-book-600 hover:text-book-700"
                              onClick={() => navigate(`/books/${listing.id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                          {isOwnProfile && !listing.sold && (
                            <div className="mt-3">
                              <BookNotSellingHelp 
                                bookId={listing.id} 
                                bookTitle={listing.title}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <BookIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No listings found</p>
                  {isOwnProfile && (
                    <Button 
                      variant="outline" 
                      className="mt-4 border-book-300 text-book-600 hover:bg-book-50"
                      onClick={() => navigate('/create-listing')}
                    >
                      Create Your First Listing
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reviews">
              {userData.reviews.length > 0 ? (
                <div className="space-y-6">
                  {userData.reviews.map((review: any) => (
                    <div 
                      key={review.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="mr-3 bg-white p-2 rounded-full">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{review.from}</p>
                            <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Star className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No reviews yet</p>
                </div>
              )}
            </TabsContent>
            
            {isOwnProfile && (
              <TabsContent value="settings">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-xl font-medium mb-4">Account Settings</h3>
                  <div className="space-y-6">
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-800">Important</h4>
                          <p className="text-sm text-amber-700 mt-1">
                            Settings functionality will be available in the next update.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                      <Button 
                        onClick={() => toast.info('2FA coming soon')}
                        className="bg-book-600 hover:bg-book-700"
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Enable 2FA
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <Button 
                        variant="destructive" 
                        onClick={() => toast.info('Account deletion coming soon')}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>

      {userData && (
        <ShareProfileDialog
          isOpen={isShareDialogOpen}
          onClose={() => setIsShareDialogOpen(false)}
          userId={userData.id}
          userName={userData.name}
          isOwnProfile={isOwnProfile}
        />
      )}

      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              Rate {userData.name}
            </DialogTitle>
            <DialogDescription>
              Your feedback helps other users in the community.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Rating</label>
              <div className="flex justify-center my-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star 
                    key={value}
                    className={`h-8 w-8 cursor-pointer ${
                      value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    } transition-colors`}
                    onClick={() => setRating(value)}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="reviewComment" className="text-sm font-medium">
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reviewComment"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience with this user"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRatingDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={submitRating} 
              disabled={isSubmittingRating}
              className="bg-book-600 hover:bg-book-700"
            >
              {isSubmittingRating ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center">
                  <Star className="mr-2 h-4 w-4" />
                  Submit Rating
                </span>
              )}
            </Button>
          </DialogFooter>
        </div>
      </Dialog>
    </Layout>
  );
};

export default UserProfile;
