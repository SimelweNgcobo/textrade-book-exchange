
import { supabase } from '@/integrations/supabase/client';

interface PaymentData {
  bookId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  deliveryMethod?: string;
  deliveryCost?: number;
}

interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export const calculateCommission = (amount: number): number => {
  return Math.round(amount * 0.1 * 100) / 100; // 10% commission
};

export const calculateSellerEarnings = (amount: number, deliveryCost: number = 0): number => {
  const commission = calculateCommission(amount);
  return Math.round((amount - commission - deliveryCost) * 100) / 100;
};

export const initializePayment = async (paymentData: PaymentData): Promise<string> => {
  try {
    const commission = calculateCommission(paymentData.amount);
    const sellerEarnings = calculateSellerEarnings(paymentData.amount, paymentData.deliveryCost);
    
    // Get buyer and seller details
    const { data: buyer } = await supabase
      .from('profiles')
      .select('email, name')
      .eq('id', paymentData.buyerId)
      .single();

    const { data: book } = await supabase
      .from('books')
      .select('title')
      .eq('id', paymentData.bookId)
      .single();

    if (!buyer || !book) {
      throw new Error('Buyer or book not found');
    }

    // Create transaction record with enhanced schema
    const reference = `RB_${Date.now()}_${paymentData.bookId.slice(0, 8)}`;
    
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        book_id: paymentData.bookId,
        book_title: book.title,
        buyer_id: paymentData.buyerId,
        seller_id: paymentData.sellerId,
        price: paymentData.amount,
        commission: commission,
        delivery_method: paymentData.deliveryMethod,
        delivery_cost: paymentData.deliveryCost || 0,
        platform_commission: commission,
        seller_earnings: sellerEarnings,
        payment_status: 'pending',
        paystack_reference: reference
      });

    if (transactionError) {
      console.error('Error creating transaction:', transactionError);
      throw new Error('Failed to create transaction record');
    }

    // Mock Paystack initialization - in production, call actual Paystack API
    const mockResponse: PaystackResponse = {
      status: true,
      message: 'Authorization URL created',
      data: {
        authorization_url: `https://checkout.paystack.com/${reference}`,
        access_code: `access_${reference}`,
        reference: reference
      }
    };

    return mockResponse.data.authorization_url;
  } catch (error) {
    console.error('Error initializing payment:', error);
    throw error;
  }
};

export const verifyPayment = async (reference: string): Promise<boolean> => {
  try {
    // Mock verification - in production, call Paystack verification API
    const isSuccessful = Math.random() > 0.1; // 90% success rate for testing

    if (isSuccessful) {
      // Update transaction status
      await supabase
        .from('transactions')
        .update({ payment_status: 'completed' })
        .eq('paystack_reference', reference);

      // Mark book as sold
      const bookIdMatch = reference.match(/RB_\d+_(.+)/);
      if (bookIdMatch) {
        const bookId = bookIdMatch[1];
        await supabase
          .from('books')
          .update({ sold: true })
          .eq('id', bookId);
      }
    } else {
      // Update transaction status to failed
      await supabase
        .from('transactions')
        .update({ payment_status: 'failed' })
        .eq('paystack_reference', reference);
    }

    return isSuccessful;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};

export const getTransactionHistory = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getTransactionHistory:', error);
    return [];
  }
};
