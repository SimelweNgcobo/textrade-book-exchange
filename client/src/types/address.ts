
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
