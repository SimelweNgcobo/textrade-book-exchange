
import { supabase } from '@/integrations/supabase/client';

interface Address {
  complex?: string;
  unitNumber?: string;
  streetAddress: string;
  suburb?: string;
  city: string;
  province: string;
  postalCode: string;
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
    const { data, error } = await supabase
      .rpc('can_user_list_books', { user_id: userId });

    if (error) {
      console.error('Error checking if user can list books:', error);
      return false;
    }

    return data || false;
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
        pickup_address: pickupAddress,
        shipping_address: shippingAddress,
        addresses_same: addressesSame,
        address_validated: canList,
        can_list_books: canList,
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
