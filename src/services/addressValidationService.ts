
import { supabase } from '@/integrations/supabase/client';

interface Address {
  complex?: string;
  unitNumber?: string;
  streetAddress: string;
  suburb?: string;
  city: string;
  province: string;
  postalCode: string;
  [key: string]: string | undefined;
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
      .from('profiles')
      .select('pickup_address')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error checking if user can list books:', error);
      return false;
    }

    if (!data?.pickup_address) return false;
    
    const pickupAddr = data.pickup_address as any;
    return validateAddress({
      streetAddress: pickupAddr.streetAddress || '',
      city: pickupAddr.city || '',
      province: pickupAddr.province || '',
      postalCode: pickupAddr.postalCode || ''
    });
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
