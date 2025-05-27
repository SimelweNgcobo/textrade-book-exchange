
import { supabase } from '@/integrations/supabase/client';

interface Address {
  complex: string;
  unitNumber: string;
  streetAddress: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  [key: string]: string; // This makes it compatible with Json type
}

export const saveUserAddresses = async (
  userId: string,
  pickupAddress: Address,
  shippingAddress: Address,
  addressesSame: boolean
) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      pickup_address: pickupAddress as any,
      shipping_address: shippingAddress as any,
      addresses_same: addressesSame,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select();

  if (error) {
    console.error('Error saving addresses:', error);
    throw error;
  }

  return data;
};

export const getUserAddresses = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('pickup_address, shipping_address, addresses_same')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }

  return data;
};
