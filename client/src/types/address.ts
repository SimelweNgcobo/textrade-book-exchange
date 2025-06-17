
export interface Address {
  complex?: string;
  unitNumber?: string;
  streetAddress: string;
  suburb?: string;
  city: string;
  province: string;
  postalCode: string;
}

// Database address format
export interface DatabaseAddress {
  street: string;
  city: string;  
  postal_code: string;
  province: string;
}

// Additional types that were missing
export interface AddressData {
  street?: string;
  streetAddress?: string;
  city: string;
  postalCode?: string;
  postal_code?: string;
  province: string;
  suburb?: string;
  complex?: string;
  unitNumber?: string;
}

export interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  pickup_address?: DatabaseAddress;
  shipping_address?: DatabaseAddress;
  addresses_same?: boolean;
}

// Convert database address to frontend address
export const convertDatabaseAddress = (dbAddress: DatabaseAddress): Address => {
  return {
    streetAddress: dbAddress.street,
    city: dbAddress.city,
    postalCode: dbAddress.postal_code,
    province: dbAddress.province,
  };
};

// Convert frontend address to database address
export const convertToDatabase = (address: Address): DatabaseAddress => {
  return {
    street: address.streetAddress,
    city: address.city,
    postal_code: address.postalCode,
    province: address.province,
  };
};
