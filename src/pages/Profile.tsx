
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import ProfileHeader from '@/components/ProfileHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, MapPin } from 'lucide-react';
import ProfileEditDialog from '@/components/ProfileEditDialog';
import ChangePasswordDialog from '@/components/ChangePasswordDialog';
import AddressForm from '@/components/AddressForm';
import AccountInformation from '@/components/profile/AccountInformation';
import SecuritySettings from '@/components/profile/SecuritySettings';
import ListingsSidebar from '@/components/profile/ListingsSidebar';
import MobileListingsView from '@/components/profile/MobileListingsView';
import { saveUserAddresses, getUserAddresses } from '@/services/addressService';
import { getUserBooks } from '@/services/bookService';
import { deleteBook } from '@/services/bookEditService';
import { Book } from '@/types/book';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

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

  const handleUpdateProfilePicture = async (imageUrl: string) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          profile_picture_url: imageUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile picture:', error);
        toast.error('Failed to update profile picture');
        return;
      }

      toast.success('Profile picture updated successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile picture:', error);
      toast.error('Failed to update profile picture');
    }
  };

  const handleUpdateBio = async (bio: string) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          bio: bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating bio:', error);
        toast.error('Failed to update bio');
        return;
      }

      toast.success('Bio updated successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error updating bio:', error);
      toast.error('Failed to update bio');
    }
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

  const handleShareProfile = () => {
    console.log('Share profile clicked');
  };

  const userData = {
    name: profile.name || 'Anonymous User',
    joinDate: new Date().toISOString(),
    isVerified: false
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-6xl">
        {/* Profile Header - Mobile Optimized */}
        <div className="mb-6">
          <ProfileHeader 
            userData={userData}
            isOwnProfile={true}
            onShareProfile={handleShareProfile}
          />
        </div>
        
        {/* Mobile-First Layout */}
        <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
          {/* Main Content - Full width on mobile, 2/3 on desktop */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information Card */}
            <AccountInformation 
              profile={profile}
              onEditProfile={() => setIsEditDialogOpen(true)}
              onUpdateProfilePicture={handleUpdateProfilePicture}
              onUpdateBio={handleUpdateBio}
            />

            {/* Address Section */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
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

            {/* Mobile Listings View */}
            <MobileListingsView
              activeListings={activeListings}
              isLoading={isLoadingListings}
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
            />
          </div>

          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block space-y-6">
            {/* Security Settings */}
            <SecuritySettings 
              onChangePassword={() => setIsChangePasswordDialogOpen(true)}
            />

            {/* Active Listings - Desktop Sidebar */}
            <ListingsSidebar
              activeListings={activeListings}
              isLoading={isLoadingListings}
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
            />
          </div>
        </div>

        {/* Mobile Action Buttons - Fixed at bottom on mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
          <div className="container mx-auto max-w-sm space-y-3">
            <Button
              onClick={() => setIsChangePasswordDialogOpen(true)}
              variant="outline"
              className="w-full"
            >
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </div>
        </div>

        {/* Add bottom padding on mobile to account for fixed buttons */}
        <div className="lg:hidden h-24"></div>

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
