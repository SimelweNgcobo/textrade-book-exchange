
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import ProfileHeader from '@/components/ProfileHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileEditDialog from '@/components/ProfileEditDialog';
import ChangePasswordDialog from '@/components/ChangePasswordDialog';
import AddressForm from '@/components/AddressForm';
import AccountInformation from '@/components/profile/AccountInformation';
import ShareProfileDialog from '@/components/ShareProfileDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { saveUserAddresses, getUserAddresses } from '@/services/addressService';
import { getUserBooks } from '@/services/bookService';
import { deleteBook } from '@/services/bookEditService';
import { Book } from '@/types/book';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Edit, Trash2, Eye } from 'lucide-react';

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
      toast.success('Addresses saved successfully');
    } catch (error) {
      console.error('Error saving addresses:', error);
      toast.error('Failed to save addresses');
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
      await loadActiveListings();
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    }
  };

  const handleViewBook = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/user/${user?.id}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      toast.success('Profile link copied to clipboard!');
    });
  };

  if (!profile || !user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const userData = {
    name: profile.name || 'Anonymous User',
    joinDate: new Date().toISOString(),
    isVerified: false
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-6xl">
        <div className="mb-6">
          <ProfileHeader 
            userData={userData}
            isOwnProfile={true}
            onShareProfile={handleShareProfile}
          />
        </div>
        
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings">Active Listings</TabsTrigger>
            <TabsTrigger value="addresses">Saved Addresses</TabsTrigger>
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Your Active Listings ({activeListings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingListings ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-book-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading your listings...</p>
                  </div>
                ) : activeListings.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-600 mb-4">You haven't listed any books yet</p>
                    <Button onClick={() => navigate('/create-listing')} className="bg-book-600 hover:bg-book-700">
                      Create Your First Listing
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeListings.map((book) => (
                      <div key={book.id} className="border rounded-lg p-4">
                        <img
                          src={book.imageUrl}
                          alt={book.title}
                          className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{book.title}</h3>
                        <p className="text-gray-600 mb-2">{book.author}</p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xl font-bold text-book-600">R{book.price}</span>
                          <Badge variant="outline">{book.condition}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewBook(book.id)}
                            className="flex-1"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditBook(book.id)}
                            className="flex-1"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteBook(book.id, book.title)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
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
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <AccountInformation 
              profile={profile}
              onEditProfile={() => setIsEditDialogOpen(true)}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setIsChangePasswordDialogOpen(true)}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ProfileEditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
        />

        <ChangePasswordDialog
          open={isChangePasswordDialogOpen}
          onOpenChange={setIsChangePasswordDialogOpen}
        />

        <ShareProfileDialog
          userId={user.id}
          userName={userData.name}
        />
      </div>
    </Layout>
  );
};

export default Profile;
