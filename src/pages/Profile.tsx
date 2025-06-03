
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import ProfileHeader from '@/components/ProfileHeader';
import ShareProfileDialog from '@/components/ShareProfileDialog';
import { Button } from '@/components/ui/button';
import { Lock, MapPin, User, BookOpen, Plus } from 'lucide-react';
import ProfileEditDialog from '@/components/ProfileEditDialog';
import ChangePasswordDialog from '@/components/ChangePasswordDialog';
import UserProfileTabs from '@/components/profile/UserProfileTabs';
import MobileListingsView from '@/components/profile/MobileListingsView';
import ListingsSidebar from '@/components/profile/ListingsSidebar';
import SecuritySettings from '@/components/profile/SecuritySettings';
import AccountInformation from '@/components/profile/AccountInformation';
import { saveUserAddresses, getUserAddresses } from '@/services/addressService';
import { getUserBooks } from '@/services/book/bookQueries';
import { deleteBook } from '@/services/book/bookMutations';
import { Book } from '@/types/book';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import BookNotSellingHelp from '@/components/BookNotSellingHelp';

const Profile = () => {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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
      console.log('Loading books for user:', user.id);
      const books = await getUserBooks(user.id);
      console.log('User books loaded:', books);
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
    if (!bookId) {
      toast.error('Book ID is missing');
      return;
    }
    console.log('Navigating to edit book:', bookId);
    navigate(`/edit-book/${bookId}`);
  };

  const handleDeleteBook = async (bookId: string, bookTitle: string) => {
    if (!bookId) {
      toast.error('Book ID is missing');
      return;
    }

    if (!confirm(`Are you sure you want to delete "${bookTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      console.log('Deleting book:', bookId);
      await deleteBook(bookId);
      toast.success('Book deleted successfully');
      await loadActiveListings(); // Refresh the listings
    } catch (error: any) {
      console.error('Error deleting book:', error);
      toast.error(error.message || 'Failed to delete book');
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

  if (isMobile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          {/* Mobile Profile Header */}
          <div className="mb-6">
            <ProfileHeader 
              userData={userData}
              isOwnProfile={true}
              onShareProfile={handleShareProfile}
            />
          </div>

          {/* Mobile Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              onClick={() => navigate('/create-listing')}
              className="bg-book-600 hover:bg-book-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Listing
            </Button>
            <Button
              onClick={() => setIsEditDialogOpen(true)}
              variant="outline"
              className="border-book-600 text-book-600"
            >
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Mobile Content */}
          <div className="space-y-6">
            {/* Active Listings */}
            <MobileListingsView
              activeListings={activeListings}
              isLoading={isLoadingListings}
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
            />

            {/* Book Not Selling Help */}
            <div className="px-4">
              <BookNotSellingHelp />
            </div>

            {/* Account Information */}
            <AccountInformation
              profile={profile}
              onEditProfile={() => setIsEditDialogOpen(true)}
            />

            {/* Security Settings */}
            <SecuritySettings
              onChangePassword={() => setIsChangePasswordDialogOpen(true)}
            />
          </div>

          {/* Mobile Dialogs */}
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
  }

  // Desktop Layout
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <ProfileHeader 
            userData={userData}
            isOwnProfile={true}
            onShareProfile={handleShareProfile}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ListingsSidebar
              activeListings={activeListings}
              isLoading={isLoadingListings}
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
            />
            
            <AccountInformation
              profile={profile}
              onEditProfile={() => setIsEditDialogOpen(true)}
            />
            
            <SecuritySettings
              onChangePassword={() => setIsChangePasswordDialogOpen(true)}
            />
          </div>

          {/* Desktop Main Content */}
          <div className="lg:col-span-3">
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
