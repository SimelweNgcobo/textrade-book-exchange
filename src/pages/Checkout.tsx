
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getBookById } from '@/services/bookService';
import { Book } from '@/types/book';
import { toast } from 'sonner';
import { ArrowLeft, CreditCard, ShieldCheck, Truck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Add Paystack script to the document
const loadPaystackScript = () => {
  return new Promise((resolve) => {
    if (window.PaystackPop) {
      resolve(window.PaystackPop);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => resolve(window.PaystackPop);
    document.head.appendChild(script);
  });
};

const Checkout = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  useEffect(() => {
    const loadBook = async () => {
      if (!id) return;
      
      try {
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
      } catch (error) {
        console.error('Error loading book:', error);
        toast.error('Failed to load book details');
        navigate('/books');
      } finally {
        setIsLoading(false);
      }
    };

    loadBook();
  }, [id, navigate]);

  // Load user's email when component mounts
  useEffect(() => {
    if (user?.email) {
      setShippingInfo(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredFields = ['fullName', 'email', 'address', 'city', 'postalCode', 'phone'];
    
    for (const field of requiredFields) {
      if (!shippingInfo[field as keyof typeof shippingInfo].trim()) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    return true;
  };

  const initializePayment = async () => {
    if (!book || !user) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('paystack-payment', {
        body: {
          amount: book.price,
          email: shippingInfo.email,
          bookId: book.id,
          buyerId: user.id,
          metadata: {
            shipping_info: shippingInfo,
            book_title: book.title,
            book_author: book.author
          }
        }
      });

      if (error) {
        console.error('Payment initialization error:', error);
        toast.error('Failed to initialize payment');
        return;
      }

      return data;
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error('Failed to initialize payment');
    }
  };

  const verifyPayment = async (reference: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-paystack-payment', {
        body: { reference }
      });

      if (error) {
        console.error('Payment verification error:', error);
        toast.error('Payment verification failed');
        return false;
      }

      return data.verified;
    } catch (error) {
      console.error('Payment verification error:', error);
      toast.error('Payment verification failed');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!book || !user) return;
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    try {
      // Load Paystack script
      await loadPaystackScript();
      
      // Initialize payment
      const paymentData = await initializePayment();
      
      if (!paymentData) {
        setIsProcessing(false);
        return;
      }

      // Create Paystack popup
      const handler = window.PaystackPop.setup({
        key: 'pk_test_8da15fc8b9880e3479419f8d858739cb3588f25f',
        email: shippingInfo.email,
        amount: book.price * 100, // Convert to kobo
        currency: 'ZAR',
        ref: paymentData.reference,
        onClose: function() {
          setIsProcessing(false);
          toast.info('Payment cancelled');
        },
        callback: async function(response: any) {
          console.log('Payment successful:', response.reference);
          
          // Verify payment
          const verified = await verifyPayment(response.reference);
          
          if (verified) {
            toast.success('Payment successful! You will receive a confirmation email shortly.');
            navigate('/profile');
          } else {
            toast.error('Payment verification failed. Please contact support.');
          }
          
          setIsProcessing(false);
        }
      });

      handler.openIframe();
      
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error('Payment failed. Please try again.');
      setIsProcessing(false);
    }
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

  if (!book) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Book not found</h2>
            <Button onClick={() => navigate('/books')}>Browse Books</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const totalAmount = book.price;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <img 
                    src={book.imageUrl} 
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">{book.title}</h3>
                    <p className="text-gray-600 text-sm">{book.author}</p>
                    <Badge variant="outline" className="mt-1">{book.condition}</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Book Price</span>
                    <span>R{book.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>R{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="bg-book-50 p-3 rounded-lg">
                  <div className="flex items-center text-book-700 text-sm">
                    <Truck className="mr-2 h-4 w-4" />
                    <span>Free delivery within 3-7 business days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Cape Town"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="8001"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+27 12 345 6789"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment with Paystack
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center text-green-700 text-sm">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      <span>Secure payment powered by Paystack. Your payment information is encrypted and secure.</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>• Pay with your credit/debit card</p>
                    <p>• Bank transfer</p>
                    <p>• Mobile money</p>
                    <p>• All major South African banks supported</p>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-book-600 hover:bg-book-700 text-lg py-6"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  `Pay with Paystack - R${totalAmount.toFixed(2)}`
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Declare Paystack global
declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default Checkout;
