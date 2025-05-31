
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/CartProvider';
import { useNavigate } from 'react-router-dom';

const CartButton = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate('/cart')}
      className="relative flex items-center space-x-2"
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="hidden lg:inline">Cart</span>
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;
