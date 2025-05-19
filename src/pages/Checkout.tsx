import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getBookById, purchaseBook } from '@/services/bookService';
import { Book } from '@/types/book';
import { toast } from 'sonner';
import { ArrowLeft, CreditCard, AlertCircle } from 'lucide-react';

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form state
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  // Credit card form state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  useEffect(() => {
    const loadBook = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const bookData = await getBookById(id);
        if (!bookData) {
          setError('Book not found');
        } else if (bookData.sold) {
          setError('This book has already been sold');
        } else if (bookData.seller.id === user?.id) {
          setError('You cannot purchase your own book');
        } else {
          setBook(bookData);
        }
      } catch (error) {
        console.error('Error loading book:', error);
        setError('Failed to load book details');
      } finally {
        setIsLoading(false);
      }
    };

    loadBook();
  }, [id, user]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    try {
      if (!book || !user) {
        throw new Error('Missing book or user information');
      }

      // In a real app, this would connect to a payment gateway
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate payment processing
      
      // Process the book purchase
      const result = await purchaseBook(book.id, user.id);
      
      if (result.success) {
        toast.success('Payment successful! The book is now yours.');
        navigate('/profile'); // Redirect to profile page or order confirmation
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const validateForm = () => {
    if (paymentMethod === 'credit-card') {
      if (!cardName.trim()) {
        toast.error('Please enter the name on your card');
        return false;
      }
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error('Please enter a valid 16-digit card number');
        return false;
      }
      if (!cardExpiry.trim() || !cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        toast.error('Please enter a valid expiry date (MM/YY)');
        return false;
      }
      if (!cardCvc.trim() || !cardCvc.match(/^\d{3,4}$/)) {
        toast.error('Please enter a valid CVC code');
        return false;
      }
    }
    return true;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    setCardExpiry(value);
  };

  const calculateTotal = () => {
    if (!book) return 0;
    return book.price;
  };

  const calculateCommission = () => {
    return 15; // R15 fixed commission
  };

  const calculateSellerReceives = () => {
    if (!book) return 0;
    return book.price - calculateCommission();
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

  if (error || !book) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <h3 className="text-xl font-semibold mb-2">Error</h3>
            <p className="text-gray-500 mb-6">{error || 'An error occurred during checkout'}</p>
            <Button onClick={() => navigate('/books')} className="bg-book-600 hover:bg-book-700">
              Browse other books
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold text-book-800 mb-6">Order Summary</h2>

            <div className="flex mb-6 border-b pb-6">
              <div className="w-1/3">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div className="w-2/3 pl-4">
                <h3 className="font-bold text-lg text-book-800">{book.title}</h3>
                <p className="text-gray-600 mb-2">{book.author}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-book-100 text-book-800 px-2 py-1 rounded text-xs font-medium">
                    {book.condition}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                    {book.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Book Price:</span>
                <span className="font-medium">R{book.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Commission:</span>
                <span className="font-medium">R{calculateCommission().toFixed(2)}</span>
              </div>
              <div className="border-t border-dashed border-gray-200 my-2 pt-2"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-book-600">R{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 my-2 pt-2">
                <div className="text-sm text-gray-500">
                  <p>Seller receives: R{calculateSellerReceives().toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-book-800 mb-6">Payment Details</h2>

            <form onSubmit={handlePayment}>
              <div className="mb-6">
                <Label htmlFor="payment-method" className="text-base font-medium mb-2 block">
                  Payment Method
                </Label>
                <RadioGroup
                  id="payment-method"
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit / Debit Card
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === 'credit-card' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-name" className="text-base font-medium">
                      Name on Card
                    </Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="card-number" className="text-base font-medium">
                      Card Number
                    </Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-base font-medium">
                        Expiry Date (MM/YY)
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc" className="text-base font-medium">
                        CVC
                      </Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <Button
                  type="submit"
                  className="w-full bg-book-600 hover:bg-book-700"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay R${calculateTotal().toFixed(2)}`
                  )}
                </Button>
              </div>

              <div className="mt-4 text-center text-sm text-gray-500">
                <p>This is a demo application. No real payment will be processed.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
