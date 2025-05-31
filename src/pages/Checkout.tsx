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
import { ArrowLeft, CreditCard } from 'lucide-react';
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
        navigate('/login');
        return;
      }

      setIsLoading(true);
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
            toast.error('Book not found');
            navigate('/books');
            return;
          }
          if (bookData.sold) {
            toast.error('This book has already been sold');
            navigate('/books');
            return;
          }
          setBook(bookData);
        }
      } catch (error) {
        console.error('Error loading checkout data:', error);
        toast.error('Failed to load checkout data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, user?.id, navigate, isCartCheckout]);

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
      return cartData.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
    }
    return book?.price || 0;
  };

  const calculateCommission = () => {
    return calculateTotal() * 0.1;
  };

  const handlePayment = async () => {
    // Validate shipping address
    const requiredFields = ['streetAddress', 'suburb', 'city', 'province', 'postalCode'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field as keyof typeof shippingAddress]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required address fields');
      return;
    }

    try {
      // Here you would integrate with your payment system
      toast.success('Payment successful! Your order has been placed.');
      
      if (isCartCheckout) {
        clearCart();
      }
      
      navigate('/');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-600"></div>
        </div>
      </Layout>
    );
  }

  const totalAmount = calculateTotal();
  const commission = calculateCommission();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedAddresses && (savedAddresses.pickup_address || savedAddresses.shipping_address) && (
                  <div>
                    <Label className="text-base font-medium">Use saved address</Label>
                    <Select value={selectedAddress} onValueChange={(value: 'pickup' | 'shipping' | 'new') => handleAddressSelection(value)}>
                      <SelectTrigger className="mt-2">
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="complex">Complex/Building</Label>
                    <Input
                      id="complex"
                      value={shippingAddress.complex}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, complex: e.target.value }))}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unitNumber">Unit Number</Label>
                    <Input
                      id="unitNumber"
                      value={shippingAddress.unitNumber}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, unitNumber: e.target.value }))}
                      placeholder="Optional"
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
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="suburb">Suburb *</Label>
                    <Input
                      id="suburb"
                      value={shippingAddress.suburb}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, suburb: e.target.value }))}
                      placeholder="Suburb"
                      required
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
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="province">Province *</Label>
                    <Select value={shippingAddress.province} onValueChange={(value) => setShippingAddress(prev => ({ ...prev, province: value }))}>
                      <SelectTrigger>
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
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isCartCheckout ? (
                  cartData.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img src={item.imageUrl} alt={item.title} className="w-16 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600">by {item.author}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                ) : book ? (
                  <div className="flex items-center gap-4">
                    <img src={book.frontCover || book.imageUrl} alt={book.title} className="w-16 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-semibold">{book.title}</h4>
                      <p className="text-sm text-gray-600">by {book.author}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">R{book.price}</p>
                    </div>
                  </div>
                ) : null}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Platform fee (10%)</span>
                    <span>R{commission.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>R{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full bg-book-600 hover:bg-book-700"
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
