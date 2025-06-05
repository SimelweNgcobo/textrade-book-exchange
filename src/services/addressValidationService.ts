
import { supabase } from '@/integrations/supabase/client';

interface Address {
  complex?: string;
  unitNumber?: string;
  streetAddress: string;
  suburb?: string;
  city: string;
  province: string;
  postalCode: string;
  [key: string]: any; // Make it compatible with Json type
}

export const validateAddress = (address: Address): boolean => {
  return !!(
    address.streetAddress &&
    address.city &&
    address.province &&
    address.postalCode
  );
};

export const canUserListBooks = async (userId: string): Promise<boolean> => {
  try {
    // Since the RPC function doesn't exist, we'll check address_validated and can_list_books directly
    const { data, error } = await supabase
      .from('profiles')
      .select('address_validated')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error checking if user can list books:', error);
      return false;
    }

    return data?.address_validated || false;
  } catch (error) {
    console.error('Error in canUserListBooks:', error);
    return false;
  }
};

export const updateAddressValidation = async (
  userId: string,
  pickupAddress: Address,
  shippingAddress: Address,
  addressesSame: boolean
) => {
  try {
    const isPickupValid = validateAddress(pickupAddress);
    const isShippingValid = addressesSame ? isPickupValid : validateAddress(shippingAddress);
    const canList = isPickupValid && isShippingValid;

    const { error } = await supabase
      .from('profiles')
      .update({
        pickup_address: pickupAddress as any,
        shipping_address: shippingAddress as any,
        addresses_same: addressesSame,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating address validation:', error);
      throw error;
    }

    return { canListBooks: canList };
  } catch (error) {
    console.error('Error in updateAddressValidation:', error);
    throw error;
  }
};
