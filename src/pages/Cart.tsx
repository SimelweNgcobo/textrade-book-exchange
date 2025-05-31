
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '@/components/CartProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Cart = () => {
  const { items, removeFromCart, clearCart, getTotalPrice, getTotalCommission, getSellerTotals } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const totalPrice = getTotalPrice();
  const totalCommission = getTotalCommission();
  const sellerTotals = getSellerTotals();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/cart-checkout');
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate('/books')} className="mb-6 text-green-600">
            <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
          </Button>
          
          <div className="text-center py-20">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start browsing books to add them to your cart</p>
            <Button onClick={() => navigate('/books')} className="bg-green-600 hover:bg-green-700">
              Browse Books
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/books')} className="mb-6 text-green-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Shopping Cart ({items.length} items)</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear Cart
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.author}</p>
                      <p className="text-gray-600 text-sm">Seller: {item.seller.name}</p>
                      <p className="text-lg font-bold text-green-600 mt-2">R{item.price.toFixed(2)}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Platform Fee (10%)</span>
                    <span>R{totalCommission.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>R{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                >
                  Proceed to Checkout
                </Button>

                {/* Seller Breakdown */}
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-sm">Seller Breakdown:</h4>
                  {Object.entries(sellerTotals).map(([sellerId, totals]) => (
                    <div key={sellerId} className="text-xs bg-gray-50 p-3 rounded">
                      <p className="font-medium">{totals.books[0].seller.name}</p>
                      <p>Books: {totals.books.length}</p>
                      <p>Total: R{totals.total.toFixed(2)}</p>
                      <p>Will receive: R{totals.net.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
