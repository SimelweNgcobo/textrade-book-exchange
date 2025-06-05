
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
    // Since delivery_options table doesn't exist, return mock data
    const mockOptions: DeliveryOption[] = [
      {
        id: '1',
        name: 'Fastway',
        base_url: 'https://fastway.co.za',
        is_active: true
      },
      {
        id: '2',
        name: 'Courier Guy',
        base_url: 'https://courierguy.co.za',
        is_active: true
      }
    ];

    return mockOptions;
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
    // Since delivery fields don't exist in books table, we'll store this info in a comment or description
    const { error } = await supabase
      .from('books')
      .update({
        description: `${deliveryMethod} via ${courierName} - R${deliveryCost}`
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
