
import { supabase } from '@/integrations/supabase/client';

interface DeliveryOption {
  id: string;
  name: string;
  base_url: string;
  is_active: boolean;
}

interface DeliveryQuote {
  courier: string;
  cost: number;
  eta: string;
  service_type: string;
}

export const getDeliveryOptions = async (): Promise<DeliveryOption[]> => {
  try {
    const { data, error } = await supabase
      .from('delivery_options')
      .select('id, name, base_url, is_active')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching delivery options:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getDeliveryOptions:', error);
    return [];
  }
};

export const calculateDeliveryQuote = async (
  courier: string,
  fromAddress: any,
  toAddress: any
): Promise<DeliveryQuote | null> => {
  // This is a mock implementation - in production you'd call the actual APIs
  try {
    const mockQuotes: Record<string, DeliveryQuote> = {
      'Fastway': {
        courier: 'Fastway',
        cost: 89.99,
        eta: '2-3 business days',
        service_type: 'Standard'
      },
      'Courier Guy': {
        courier: 'Courier Guy',
        cost: 95.50,
        eta: '1-2 business days',
        service_type: 'Express'
      }
    };

    return mockQuotes[courier] || null;
  } catch (error) {
    console.error('Error calculating delivery quote:', error);
    return null;
  }
};

export const updateBookDeliveryInfo = async (
  bookId: string,
  deliveryMethod: string,
  deliveryCost: number,
  courierName: string
) => {
  try {
    const { error } = await supabase
      .from('books')
      .update({
        delivery_method: deliveryMethod,
        delivery_cost: deliveryCost,
        courier_name: courierName
      })
      .eq('id', bookId);

    if (error) {
      console.error('Error updating book delivery info:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateBookDeliveryInfo:', error);
    throw error;
  }
};
