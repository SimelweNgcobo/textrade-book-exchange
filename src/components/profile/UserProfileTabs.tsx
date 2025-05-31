
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, MapPin, User, Edit, Eye, Trash2 } from 'lucide-react';
import { Book as BookType } from '@/types/book';
import { useNavigate } from 'react-router-dom';
import ShareProfileDialog from '@/components/ShareProfileDialog';

interface UserProfileTabsProps {
  activeListings: BookType[];
  isLoading: boolean;
  onEditBook: (bookId: string) => void;
  onDeleteBook: (bookId: string, bookTitle: string) => void;
  profile: any;
  addressData: any;
  isOwnProfile: boolean;
  userId: string;
  userName: string;
}

const UserProfileTabs = ({ 
  activeListings, 
  isLoading, 
  onEditBook, 
  onDeleteBook, 
  profile,
  addressData,
  isOwnProfile,
  userId,
  userName
}: UserProfileTabsProps) => {
  const navigate = useNavigate();
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleViewBook = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="listings">Active Listings</TabsTrigger>
          <TabsTrigger value="addresses">Saved Addresses</TabsTrigger>
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="h-5 w-5 mr-2" />
                Active Listings ({activeListings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-book-600"></div>
                </div>
              ) : activeListings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No active listings</p>
                  {isOwnProfile && (
                    <Button onClick={() => navigate('/create-listing')} className="bg-book-600 hover:bg-book-700">
                      Create Your First Listing
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeListings.map((book) => (
                    <Card key={book.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={book.frontCover || book.imageUrl}
                          alt={book.title}
                          className="w-full h-32 object-cover"
                        />
                        {book.sold && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-bold">SOLD</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-sm truncate">{book.title}</h4>
                        <p className="text-xs text-gray-600 truncate">{book.author}</p>
                        <p className="font-bold text-book-600 mt-1">R{book.price}</p>
                        <div className="flex gap-1 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewBook(book.id)}
                            className="flex-1 text-xs"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          {isOwnProfile && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onEditBook(book.id)}
                                className="flex-1 text-xs"
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onDeleteBook(book.id, book.title)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Saved Addresses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {addressData ? (
                <div className="space-y-4">
                  {addressData.pickup_address && (
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Pickup Address</h4>
                      <div className="text-sm text-gray-600">
                        <p>{addressData.pickup_address.complex} {addressData.pickup_address.unitNumber}</p>
                        <p>{addressData.pickup_address.streetAddress}</p>
                        <p>{addressData.pickup_address.suburb}, {addressData.pickup_address.city}</p>
                        <p>{addressData.pickup_address.province} {addressData.pickup_address.postalCode}</p>
                      </div>
                    </div>
                  )}
                  {addressData.shipping_address && !addressData.addresses_same && (
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Shipping Address</h4>
                      <div className="text-sm text-gray-600">
                        <p>{addressData.shipping_address.complex} {addressData.shipping_address.unitNumber}</p>
                        <p>{addressData.shipping_address.streetAddress}</p>
                        <p>{addressData.shipping_address.suburb}, {addressData.shipping_address.city}</p>
                        <p>{addressData.shipping_address.province} {addressData.shipping_address.postalCode}</p>
                      </div>
                    </div>
                  )}
                  {addressData.addresses_same && (
                    <p className="text-sm text-gray-600">Shipping address is the same as pickup address</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No addresses saved</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="text-gray-900">{profile?.name || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{profile?.email || 'Not provided'}</p>
              </div>
              {profile?.bio && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <p className="text-gray-900">{profile.bio}</p>
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowShareDialog(true)}
                  className="bg-book-600 hover:bg-book-700 text-white"
                >
                  Share Profile
                </Button>
                {isOwnProfile && (
                  <Button variant="outline">
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ShareProfileDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        userId={userId}
        userName={userName}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
};

export default UserProfileTabs;
