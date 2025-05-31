
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book } from '@/types/book';
import { toast } from 'sonner';

interface CartItem extends Book {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalCommission: () => number;
  getSellerTotals: () => Record<string, { total: number; commission: number; net: number; books: CartItem[] }>;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bookstore-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('bookstore-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (book: Book) => {
    if (book.sold) {
      toast.error('This book is no longer available');
      return;
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      if (existingItem) {
        toast.info('Book is already in cart');
        return prevItems;
      }
      
      toast.success('Book added to cart');
      return [...prevItems, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== bookId));
    toast.success('Book removed from cart');
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('bookstore-cart');
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalCommission = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity * 0.1), 0);
  };

  const getSellerTotals = () => {
    const sellerTotals: Record<string, { total: number; commission: number; net: number; books: CartItem[] }> = {};

    items.forEach(item => {
      const sellerId = item.seller.id;
      const itemTotal = item.price * item.quantity;
      const itemCommission = itemTotal * 0.1;
      const itemNet = itemTotal - itemCommission;

      if (!sellerTotals[sellerId]) {
        sellerTotals[sellerId] = {
          total: 0,
          commission: 0,
          net: 0,
          books: []
        };
      }

      sellerTotals[sellerId].total += itemTotal;
      sellerTotals[sellerId].commission += itemCommission;
      sellerTotals[sellerId].net += itemNet;
      sellerTotals[sellerId].books.push(item);
    });

    return sellerTotals;
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalCommission,
        getSellerTotals,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
