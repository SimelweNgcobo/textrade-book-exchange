
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import ProfileHeader from '@/components/ProfileHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lock, User, Mail, MapPin, BookIcon, Calendar, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ProfileEditDialog from '@/components/ProfileEditDialog';
import ChangePasswordDialog from '@/components/ChangePasswordDialog';
import AddressForm from '@/components/AddressForm';
import BookNotSellingHelp from '@/components/BookNotSellingHelp';
import { saveUserAddresses, getUserAddresses } from '@/services/addressService';
import { getUserBooks } from '@/services/bookService';
import { deleteBook } from '@/services/bookEditService';
import { Book } from '@/types/book';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [addressData, setAddressData] = useState<any>(null);
  const [activeListings, setActiveListings] = useState<Book[]>([]);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isLoadingListings, setIsLoadingListings] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadUserAddresses();
      loadActiveListings();
    }
  }, [user?.id]);

  const loadUserAddresses = async () => {
    if (!user?.id) return;
    
    try {
      const data = await getUserAddresses(user.id);
      setAddressData(data);
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };

  const loadActiveListings = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoadingListings(true);
      const books = await getUserBooks(user.id);
      // Filter for only active (not sold) listings
      const activeBooks = books.filter(book => !book.sold);
      setActiveListings(activeBooks);
    } catch (error) {
      console.error('Error loading active listings:', error);
      toast.error('Failed to load active listings');
    } finally {
      setIsLoadingListings(false);
    }
  };

  const handleSaveAddresses = async (pickup: any, shipping: any, same: boolean) => {
    if (!user?.id) return;
    
    setIsLoadingAddress(true);
    try {
      await saveUserAddresses(user.id, pickup, shipping, same);
      await loadUserAddresses();
    } catch (error) {
      console.error('Error saving addresses:', error);
      throw error;
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const handleEditBook = (bookId: string) => {
    navigate(`/edit-book/${bookId}`);
  };

  const handleDeleteBook = async (bookId: string, bookTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${bookTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteBook(bookId);
      toast.success('Book deleted successfully');
      await loadActiveListings(); // Reload listings
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    }
  };

  if (!profile || !user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleShareProfile = () => {
    console.log('Share profile clicked');
  };

  // Convert profile to userData format expected by ProfileHeader (without rating and deliveries)
  const userData = {
    name: profile.name || 'Anonymous User',
    joinDate: new Date().toISOString(),
    isVerified: false
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ProfileHeader 
          userData={userData}
          isOwnProfile={true}
          onShareProfile={handleShareProfile}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-gray-900">{profile.name || 'Not set'}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500 flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </p>
                    <p className="text-gray-900">{profile.email}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center pt-4">
                  <Button
                    onClick={() => setIsEditDialogOpen(true)}
                    className="bg-book-600 hover:bg-book-700"
                  >
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Address Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Address Information
                </CardTitle>
                <p className="text-sm text-gray-600">Manage your pickup and shipping addresses</p>
              </CardHeader>
              <CardContent>
                <AddressForm
                  pickupAddress={addressData?.pickup_address}
                  shippingAddress={addressData?.shipping_address}
                  addressesSame={addressData?.addresses_same}
                  onSave={handleSaveAddresses}
                  isLoading={isLoadingAddress}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Password</p>
                    <p className="text-sm text-gray-500 mb-3">
                      Keep your account secure with a strong password
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsChangePasswordDialogOpen(true)}
                      className="w-full"
                    >
                      Change Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Listings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <BookIcon className="h-5 w-5 mr-2" />
                    Active Listings
                  </span>
                  <Badge variant="secondary">{activeListings.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingListings ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-book-600 mx-auto"></div>
                  </div>
                ) : activeListings.length > 0 ? (
                  <div className="space-y-3">
                    {/* Book Not Selling Help Button */}
                    <div className="mb-4">
                      <BookNotSellingHelp />
                    </div>
                    
                    {activeListings.slice(0, 3).map((book) => (
                      <div 
                        key={book.id}
                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <img 
                          src={book.frontCover || book.imageUrl} 
                          alt={book.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {book.title}
                          </p>
                          <p className="text-sm text-gray-500">R{book.price}</p>
                          <div className="flex items-center text-xs text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(book.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditBook(book.id)}
                            className="text-book-600 hover:text-book-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBook(book.id, book.title)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {activeListings.length > 3 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/user-profile')}
                        className="w-full mt-3"
                      >
                        View All ({activeListings.length})
                      </Button>
                    )}
                    
                    <Button
                      onClick={() => navigate('/create-listing')}
                      className="w-full bg-book-600 hover:bg-book-700 text-white"
                      size="sm"
                    >
                      Create New Listing
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <BookIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-3">No active listings</p>
                    <Button
                      onClick={() => navigate('/create-listing')}
                      className="bg-book-600 hover:bg-book-700 text-white"
                      size="sm"
                    >
                      Create Your First Listing
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <ProfileEditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
        />

        <ChangePasswordDialog
          open={isChangePasswordDialogOpen}
          onOpenChange={setIsChangePasswordDialogOpen}
        />
      </div>
    </Layout>
  );
};

export default Profile;
