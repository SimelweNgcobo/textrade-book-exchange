
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import ProfileHeader from '@/components/ProfileHeader';
import ShareProfileDialog from '@/components/ShareProfileDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import ProfileEditDialog from '@/components/ProfileEditDialog';
import ChangePasswordDialog from '@/components/ChangePasswordDialog';
import AddressForm from '@/components/AddressForm';
import UserProfileTabs from '@/components/profile/UserProfileTabs';
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
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
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

  const handleShareProfile = () => {
    setIsShareDialogOpen(true);
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
    id: user.id,
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
        
        {/* Profile Tabs */}
        <UserProfileTabs
          activeListings={activeListings}
          isLoading={isLoadingListings}
          onEditBook={handleEditBook}
          onDeleteBook={handleDeleteBook}
          profile={profile}
          addressData={addressData}
          isOwnProfile={true}
          userId={user.id}
          userName={profile.name || 'Anonymous User'}
          onSaveAddresses={handleSaveAddresses}
          isLoadingAddress={isLoadingAddress}
        />

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

        <ShareProfileDialog
          isOpen={isShareDialogOpen}
          onClose={() => setIsShareDialogOpen(false)}
          userId={user.id}
          userName={profile.name || 'Anonymous User'}
          isOwnProfile={true}
        />
      </div>
    </Layout>
  );
};

export default Profile;
