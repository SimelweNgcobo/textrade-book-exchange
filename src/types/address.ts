
export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressFormData {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface AddressData {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface GoogleMapsAddress {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
}
