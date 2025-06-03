
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { getBookById } from '@/services/bookService';
import { getUserAddresses } from '@/services/addressService';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CreditCard, AlertTriangle, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface AddressData {
  complex?: string;
  unitNumber?: string;
  streetAddress?: string;
  suburb?: string;
  city?: string;
  province?: string;
  postalCode?: string;
}

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items: cartItems, clearCart } = useCart();
  
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<any>(null);
  const [selectedAddress, setSelectedAddress] = useState<'pickup' | 'shipping' | 'new'>('new');
  const [shippingAddress, setShippingAddress] = useState({
    complex: '',
    unitNumber: '',
    streetAddress: '',
    suburb: '',
    city: '',
    province: '',
    postalCode: ''
  });

  const isCartCheckout = id === 'cart';
  const cartData = location.state?.cartItems || [];

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) {
        toast.error('Please log in to complete your purchase');
        navigate('/login');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Load saved addresses
        const addresses = await getUserAddresses(user.id);
        setSavedAddresses(addresses);

        // Autofill with saved shipping address if available
        if (addresses?.shipping_address) {
          const shippingAddr = addresses.shipping_address as AddressData;
          setShippingAddress({
            complex: shippingAddr.complex || '',
            unitNumber: shippingAddr.unitNumber || '',
            streetAddress: shippingAddr.streetAddress || '',
            suburb: shippingAddr.suburb || '',
            city: shippingAddr.city || '',
            province: shippingAddr.province || '',
            postalCode: shippingAddr.postalCode || ''
          });
          setSelectedAddress('shipping');
        }

        // Load book data if single book checkout
        if (!isCartCheckout && id) {
          const bookData = await getBookById(id);
          if (!bookData) {
            setError('Book not found');
            return;
          }
          if (bookData.sold) {
            setError('This book has already been sold');
            return;
          }
          if (bookData.seller?.id === user.id) {
            setError('You cannot purchase your own book');
            return;
          }
          setBook(bookData);
        } else if (isCartCheckout && cartData.length === 0) {
          setError('Your cart is empty');
          return;
        }
      } catch (error) {
        console.error('Error loading checkout data:', error);
        setError('Failed to load checkout data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, user?.id, navigate, isCartCheckout, cartData.length]);

  const handleAddressSelection = (type: 'pickup' | 'shipping' | 'new') => {
    setSelectedAddress(type);
    
    if (type === 'pickup' && savedAddresses?.pickup_address) {
      const pickupAddr = savedAddresses.pickup_address as AddressData;
      setShippingAddress({
        complex: pickupAddr.complex || '',
        unitNumber: pickupAddr.unitNumber || '',
        streetAddress: pickupAddr.streetAddress || '',
        suburb: pickupAddr.suburb || '',
        city: pickupAddr.city || '',
        province: pickupAddr.province || '',
        postalCode: pickupAddr.postalCode || ''
      });
    } else if (type === 'shipping' && savedAddresses?.shipping_address) {
      const shippingAddr = savedAddresses.shipping_address as AddressData;
      setShippingAddress({
        complex: shippingAddr.complex || '',
        unitNumber: shippingAddr.unitNumber || '',
        streetAddress: shippingAddr.streetAddress || '',
        suburb: shippingAddr.suburb || '',
        city: shippingAddr.city || '',
        province: shippingAddr.province || '',
        postalCode: shippingAddr.postalCode || ''
      });
    } else if (type === 'new') {
      setShippingAddress({
        complex: '',
        unitNumber: '',
        streetAddress: '',
        suburb: '',
        city: '',
        province: '',
        postalCode: ''
      });
    }
  };

  const calculateTotal = () => {
    if (isCartCheckout) {
      return cartData.reduce((total: number, item: any) => total + item.price, 0);
    }
    return book?.price || 0;
  };

  const validateAddress = () => {
    const requiredFields = ['streetAddress', 'suburb', 'city', 'province', 'postalCode'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field as keyof typeof shippingAddress]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required address fields');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateAddress()) {
      return;
    }

    try {
      // Simulate payment processing
      toast.loading('Processing payment...', { id: 'payment' });
      
      // Simulate payment delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Payment successful! Your order has been placed.', { id: 'payment' });
      
      if (isCartCheckout) {
        clearCart();
      }
      
      navigate('/');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.', { id: 'payment' });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-600"></div>
            <p className="text-gray-600">Loading checkout...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Checkout Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-3 w-full">
              <Button 
                onClick={() => navigate('/books')}
                className="bg-book-600 hover:bg-book-700 w-full min-h-[48px]"
                size="lg"
              >
                Browse Books
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full min-h-[48px]"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const totalAmount = calculateTotal();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 text-book-600 min-h-[44px]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Shipping Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedAddresses && (savedAddresses.pickup_address || savedAddresses.shipping_address) && (
                  <div>
                    <Label className="text-base font-medium">Use saved address</Label>
                    <Select value={selectedAddress} onValueChange={(value: 'pickup' | 'shipping' | 'new') => handleAddressSelection(value)}>
                      <SelectTrigger className="mt-2 min-h-[44px]">
                        <SelectValue placeholder="Select an address" />
                      </SelectTrigger>
                      <SelectContent>
                        {savedAddresses.pickup_address && (
                          <SelectItem value="pickup">Pickup Address</SelectItem>
                        )}
                        {savedAddresses.shipping_address && (
                          <SelectItem value="shipping">Shipping Address</SelectItem>
                        )}
                        <SelectItem value="new">Enter new address</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="complex">Complex/Building</Label>
                    <Input
                      id="complex"
                      value={shippingAddress.complex}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, complex: e.target.value }))}
                      placeholder="Optional"
                      className="w-full min-h-[44px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unitNumber">Unit Number</Label>
                    <Input
                      id="unitNumber"
                      value={shippingAddress.unitNumber}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, unitNumber: e.target.value }))}
                      placeholder="Optional"
                      className="w-full min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="streetAddress">Street Address *</Label>
                  <Input
                    id="streetAddress"
                    value={shippingAddress.streetAddress}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, streetAddress: e.target.value }))}
                    placeholder="123 Main Street"
                    required
                    className="w-full min-h-[44px]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="suburb">Suburb *</Label>
                    <Input
                      id="suburb"
                      value={shippingAddress.suburb}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, suburb: e.target.value }))}
                      placeholder="Suburb"
                      required
                      className="w-full min-h-[44px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="City"
                      required
                      className="w-full min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="province">Province *</Label>
                    <Select value={shippingAddress.province} onValueChange={(value) => setShippingAddress(prev => ({ ...prev, province: value }))}>
                      <SelectTrigger className="w-full min-h-[44px]">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Eastern Cape">Eastern Cape</SelectItem>
                        <SelectItem value="Free State">Free State</SelectItem>
                        <SelectItem value="Gauteng">Gauteng</SelectItem>
                        <SelectItem value="KwaZulu-Natal">KwaZulu-Natal</SelectItem>
                        <SelectItem value="Limpopo">Limpopo</SelectItem>
                        <SelectItem value="Mpumalanga">Mpumalanga</SelectItem>
                        <SelectItem value="Northern Cape">Northern Cape</SelectItem>
                        <SelectItem value="North West">North West</SelectItem>
                        <SelectItem value="Western Cape">Western Cape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                      placeholder="1234"
                      required
                      className="w-full min-h-[44px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {isCartCheckout ? (
                    cartData.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-12 h-16 md:w-16 md:h-20 object-cover rounded flex-shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm md:text-base truncate">{item.title}</h4>
                          <p className="text-xs md:text-sm text-gray-600 truncate">by {item.author}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-sm md:text-base">R{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))
                  ) : book ? (
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <img 
                        src={book.frontCover || book.imageUrl} 
                        alt={book.title} 
                        className="w-12 h-16 md:w-16 md:h-20 object-cover rounded flex-shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm md:text-base truncate">{book.title}</h4>
                        <p className="text-xs md:text-sm text-gray-600 truncate">by {book.author}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-sm md:text-base">R{book.price}</p>
                      </div>
                    </div>
                  ) : null}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-bold">Total</span>
                    <span className="text-base md:text-lg font-bold">R{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full bg-book-600 hover:bg-book-700 text-sm md:text-base py-2 md:py-3 min-h-[48px]"
                  size="lg"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay R{totalAmount.toFixed(2)}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
