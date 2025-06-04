
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
      .select('*')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching delivery options:', error);
      // Fallback to mock data if database query fails
      return [
        {
          id: '1',
          name: 'Fastway',
          base_url: 'https://api.fastway.co.za',
          is_active: true
        },
        {
          id: '2',
          name: 'Courier Guy',
          base_url: 'https://api.courierguy.co.za',
          is_active: true
        }
      ];
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
  try {
    // Get delivery option details
    const { data: deliveryOption } = await supabase
      .from('delivery_options')
      .select('*')
      .eq('name', courier)
      .eq('is_active', true)
      .single();

    if (!deliveryOption) {
      throw new Error(`Delivery option ${courier} not found or inactive`);
    }

    // Mock implementation for now - in production you'd call the actual APIs
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

    // Add distance-based pricing variation
    const baseQuote = mockQuotes[courier];
    if (baseQuote) {
      // Simple distance calculation based on provinces
      const isSameProvince = fromAddress?.province === toAddress?.province;
      const distanceMultiplier = isSameProvince ? 1 : 1.5;
      
      return {
        ...baseQuote,
        cost: Math.round(baseQuote.cost * distanceMultiplier * 100) / 100
      };
    }

    return null;
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
        courier_name: courierName,
        delivery_status: 'pending'
      })
      .eq('id', bookId);

    if (error) {
      console.error('Error updating book delivery info:', error);
      throw error;
    }

    console.log('Book delivery info updated successfully');
  } catch (error) {
    console.error('Error in updateBookDeliveryInfo:', error);
    throw error;
  }
};

export const trackDelivery = async (trackingId: string, courier: string) => {
  try {
    // Mock tracking implementation
    const trackingStatuses = [
      'Package collected',
      'In transit',
      'Out for delivery',
      'Delivered'
    ];
    
    const randomStatus = trackingStatuses[Math.floor(Math.random() * trackingStatuses.length)];
    
    return {
      trackingId,
      courier,
      status: randomStatus,
      lastUpdate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    };
  } catch (error) {
    console.error('Error tracking delivery:', error);
    return null;
  }
};
