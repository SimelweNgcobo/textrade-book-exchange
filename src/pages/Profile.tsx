import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Plus, 
  Star, 
  BookIcon, 
  Calendar, 
  Edit,
  MapPin,
  Package,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';
import AddressForm from '@/components/AddressForm';
import BookNotSellingHelp from '@/components/BookNotSellingHelp';
import ShareProfileDialog from '@/components/ShareProfileDialog';
import ProfileEditDialog from '@/components/ProfileEditDialog';
import { saveUserAddresses, getUserAddresses } from '@/services/addressService';

const Profile = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("listings");
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState({
    pickup_address: null,
    shipping_address: null,
    addresses_same: false
  });

  // Mock data for listings - in real app this would come from your book service
  const mockListings = [
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
  ];

  useEffect(() => {
    if (user?.id) {
      loadUserAddresses();
    }
  }, [user?.id]);

  const loadUserAddresses = async () => {
    if (!user?.id) return;
    
    try {
      const addresses = await getUserAddresses(user.id);
      setUserAddresses(addresses);
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };

  const handleSaveAddresses = async (pickupAddress: any, shippingAddress: any, addressesSame: boolean) => {
    if (!user?.id) {
      toast.error('User not authenticated');
      return;
    }

    setIsLoadingAddresses(true);
    try {
      await saveUserAddresses(user.id, pickupAddress, shippingAddress, addressesSame);
      setUserAddresses({
        pickup_address: pickupAddress,
        shipping_address: shippingAddress,
        addresses_same: addressesSame
      });
      toast.success('Addresses updated successfully!');
    } catch (error) {
      console.error('Error saving addresses:', error);
      toast.error('Failed to update addresses');
      throw error;
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const handleEditProfile = () => {
    setIsEditDialogOpen(true);
  };

  const handleShareProfile = () => {
    setIsShareDialogOpen(true);
  };

  const handleUpdateAddresses = () => {
    setActiveTab('addresses');
  };

  if (!user || !profile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">Please log in to view your profile.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-book-600 to-book-800 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white rounded-full p-3 mr-4">
                  <User className="h-10 w-10 text-book-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{profile.name || 'User'}</h1>
                  <p className="text-book-100">{profile.email || user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className="bg-book-500 text-white border-0">
                  Active Seller
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Action Buttons Section */}
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={handleEditProfile}
                className="bg-book-600 hover:bg-book-700 text-white rounded-xl px-4 py-2 text-sm shadow border-0"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              
              <Button 
                onClick={handleShareProfile}
                variant="outline"
                className="border-book-600 text-book-600 hover:bg-book-50 rounded-xl px-4 py-2 text-sm"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Profile
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full mb-6">
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="listings">
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Your Book Listings</CardTitle>
                      <Button 
                        onClick={() => navigate('/create-listing')} 
                        className="bg-book-600 hover:bg-book-700"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Listing
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {mockListings.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex justify-end mb-4">
                          <BookNotSellingHelp />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {mockListings.map((listing) => (
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
                                  <div className="absolute inset-0">
                                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                                    <div className="absolute top-4 -left-8 bg-book-600 text-white text-sm font-bold py-1 px-8 transform rotate-[-45deg] shadow-lg">
                                      SOLD
                                    </div>
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
                                  <div className="space-x-2">
                                    <Button 
                                      variant="link" 
                                      size="sm"
                                      className="p-0 h-auto text-book-600"
                                      onClick={() => navigate(`/books/${listing.id}`)}
                                    >
                                      View
                                    </Button>
                                    <Button 
                                      variant="link" 
                                      size="sm"
                                      className="p-0 h-auto text-book-600"
                                    >
                                      <Edit className="h-3 w-3 mr-1" />
                                      Edit
                                    </Button>
                                  </div>
                                </div>
                                {!listing.sold && (
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
                        <p className="text-gray-500 mb-4">You haven't listed any books yet</p>
                        <Button onClick={() => navigate('/create-listing')} className="bg-book-600 hover:bg-book-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Your First Listing
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Your Addresses</CardTitle>
                    <p className="text-gray-600">
                      Set up your pickup address for selling books and shipping address for purchases.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <AddressForm
                      pickupAddress={userAddresses.pickup_address}
                      shippingAddress={userAddresses.shipping_address}
                      addressesSame={userAddresses.addresses_same}
                      onSave={handleSaveAddresses}
                      isLoading={isLoadingAddresses}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <p className="text-gray-900">{profile.name || 'Not set'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <p className="text-gray-900">{profile.email || user.email}</p>
                      </div>
                      <Button 
                        onClick={handleEditProfile}
                        className="bg-book-600 hover:bg-book-700 text-white rounded-xl px-4 py-2 text-sm shadow border-0"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Address Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Package className="h-5 w-5 text-book-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Pickup Address</p>
                            <p className="text-sm text-gray-600">
                              {userAddresses.pickup_address ? 
                                `${userAddresses.pickup_address.streetAddress}, ${userAddresses.pickup_address.suburb}` : 
                                'Not set'
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-book-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Shipping Address</p>
                            <p className="text-sm text-gray-600">
                              {userAddresses.addresses_same ? 'Same as pickup address' :
                                userAddresses.shipping_address ? 
                                  `${userAddresses.shipping_address.streetAddress}, ${userAddresses.shipping_address.suburb}` : 
                                  'Not set'
                              }
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={handleUpdateAddresses}
                          className="border-book-600 text-book-600 hover:bg-book-50 rounded-xl px-4 py-2 text-sm"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Update Addresses
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {user && (
        <>
          <ShareProfileDialog
            isOpen={isShareDialogOpen}
            onClose={() => setIsShareDialogOpen(false)}
            userId={user.id}
            userName={profile?.name || 'User'}
            isOwnProfile={true}
          />
          
          <ProfileEditDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
          />
        </>
      )}
    </Layout>
  );
};

export default Profile;
