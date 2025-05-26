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
  Check, 
  Shield,
  AlertTriangle, 
  MessageCircle, 
  Flag,
  Share2,
  Copy,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';
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
  const [activeTab, setActiveTab] = useState("listings");
  const [isLoading, setIsLoading] = useState(true);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    // Determine if this is the user's own profile
    setIsOwnProfile(userId === user?.id || !userId);
    
    // In a real app, you'd fetch this from your database
    setTimeout(() => {
      // Mock user data
      const mockUser = {
        id: userId || user?.id,
        name: isOwnProfile ? profile?.name || 'Current User' : 'Jane Smith',
        email: isOwnProfile ? profile?.email : 'jane.smith@example.com',
        joinDate: '2024-11-15T00:00:00',
        isVerified: isOwnProfile ? profile?.isVerified : true,
        rating: 4.8,
        successfulDeliveries: 12,
        listings: [
          {
            id: 'book-1',
            title: 'Introduction to Psychology',
            price: 450,
            imageUrl: 'https://source.unsplash.com/random/300x400/?textbook-1',
            condition: 'Good',
            createdAt: '2025-04-10T10:30:00',
            sold: false
          },
          {
            id: 'book-2',
            title: 'Calculus Made Easy',
            price: 350,
            imageUrl: 'https://source.unsplash.com/random/300x400/?textbook-2',
            condition: 'New',
            createdAt: '2025-03-15T14:20:00',
            sold: true
          }
        ],
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
      setIsLoading(false);
    }, 1000);
  }, [userId, user, profile, isOwnProfile]);

  const handleRateUser = () => {
    setIsRatingDialogOpen(true);
  };

  const handleShareProfile = () => {
    setIsShareDialogOpen(true);
  };

  const copyProfileLink = () => {
    const profileUrl = `${window.location.origin}/user/${userData?.id}`;
    navigator.clipboard.writeText(profileUrl);
    toast.success('Profile link copied to clipboard!');
  };

  const shareToSocial = (platform: string) => {
    const profileUrl = `${window.location.origin}/user/${userData?.id}`;
    const text = `Check out ${userData?.name}'s textbook listings on ReBooked Solutions!`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + profileUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const submitRating = async () => {
    if (!reviewComment.trim()) {
      toast.error('Please provide a comment with your rating');
      return;
    }
    
    setIsSubmittingRating(true);
    
    try {
      // In a real app, you would call your API to submit the rating
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Update local state to reflect the new rating
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
        // Recalculate average rating
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
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

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-book-600 to-book-800 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white rounded-full p-3 mr-4">
                  <User className="h-10 w-10 text-book-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-book-100">Member since {formatDate(userData.joinDate)}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-start md:items-end">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.round(userData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-book-200'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">{userData.rating.toFixed(1)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {userData.isVerified && (
                    <Badge className="bg-green-500 text-white border-0 flex items-center">
                      <Shield className="h-3 w-3 mr-1" /> Verified Seller
                    </Badge>
                  )}
                  <Badge className="bg-blue-500 text-white border-0">
                    {userData.successfulDeliveries} Deliveries
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="bg-white border-book-600 text-book-600 hover:bg-book-50"
              onClick={handleShareProfile}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </Button>
            
            {!isOwnProfile && (
              <>
                <Button 
                  variant="outline" 
                  className="bg-white border-book-600 text-book-600 hover:bg-book-50"
                  onClick={() => toast.info('Message feature coming soon')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                
                <Button 
                  variant="outline" 
                  className="bg-white"
                  onClick={handleRateUser}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Rate User
                </Button>
                
                <Button 
                  variant="outline" 
                  className="bg-white border-red-600 text-red-600 hover:bg-red-50 ml-auto"
                  onClick={() => navigate('/report')}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </Button>
                
                {isAdmin && (
                  <Button 
                    variant="destructive"
                    onClick={() => toast.info('Admin action coming soon')}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Admin Actions
                  </Button>
                )}
              </>
            )}
          </div>
          
          {/* Tabs Content */}
          <div className="p-6">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full mb-6">
                <TabsTrigger value="listings">Listings</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                {isOwnProfile && (
                  <TabsTrigger value="settings">Account Settings</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="listings">
                {userData.listings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userData.listings.map((listing: any) => (
                      <div 
                        key={listing.id}
                        className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-48">
                          <img 
                            src={listing.imageUrl} 
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                          {listing.sold && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <Badge className="bg-red-600 text-white border-0 text-lg py-1 px-3">SOLD</Badge>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-lg mb-1 line-clamp-1">{listing.title}</h3>
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-bold text-book-600">R{listing.price}</p>
                            <Badge variant="outline">{listing.condition}</Badge>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(listing.createdAt).toLocaleDateString()}
                            </div>
                            <Button 
                              variant="link" 
                              size="sm"
                              className="p-0 h-auto"
                              onClick={() => navigate(`/books/${listing.id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <BookIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No listings found</p>
                    {isOwnProfile && (
                      <Button 
                        variant="outline" 
                        className="mt-4"
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
                      {/* Account settings would go here */}
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
                        <Button onClick={() => toast.info('2FA coming soon')}>
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
      </div>

      {/* Share Profile Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Share2 className="h-5 w-5 text-book-600 mr-2" />
              Share Profile
            </DialogTitle>
            <DialogDescription>
              Share {isOwnProfile ? 'your' : `${userData?.name}'s`} profile with others
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Profile Link</Label>
              <div className="flex items-center space-x-2">
                <Input
                  readOnly
                  value={`${window.location.origin}/user/${userData?.id}`}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyProfileLink}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Share on Social Media</Label>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => shareToSocial('twitter')}
                  className="flex-1"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  onClick={() => shareToSocial('facebook')}
                  className="flex-1"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  onClick={() => shareToSocial('whatsapp')}
                  className="flex-1"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
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
            <Button onClick={submitRating} disabled={isSubmittingRating}>
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
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default UserProfile;
