import { supabase } from "@/integrations/supabase/client";
import { updateAddressValidation } from "./addressValidationService";

interface Address {
  complex: string;
  unitNumber: string;
  streetAddress: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  [key: string]: string | number | boolean | null;
}

export const saveUserAddresses = async (
  userId: string,
  pickupAddress: Address,
  shippingAddress: Address,
  addressesSame: boolean,
) => {
  try {
    const result = await updateAddressValidation(
      userId,
      pickupAddress,
      shippingAddress,
      addressesSame,
    );

    const { data, error } = await supabase
      .from("profiles")
      .select("pickup_address, shipping_address, addresses_same")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching updated addresses:", error);
      throw error;
    }

    return {
      pickup_address: data.pickup_address,
      shipping_address: data.shipping_address,
      addresses_same: data.addresses_same,
      canListBooks: result.canListBooks,
    };
  } catch (error) {
    console.error("Error saving addresses:", error);
    throw error;
  }
};

export const getUserAddresses = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("pickup_address, shipping_address, addresses_same")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }

  return data;
};
