
import { GoogleMapsAddress, Address } from '@/types/address';

export const parseGoogleMapsAddress = (place: GoogleMapsAddress): Address => {
  const addressComponents = place.address_components;
  
  const getComponent = (type: string) => {
    const component = addressComponents.find(comp => comp.types.includes(type));
    return component ? component.long_name : '';
  };

  return {
    street: `${getComponent('street_number')} ${getComponent('route')}`.trim(),
    city: getComponent('locality') || getComponent('sublocality'),
    province: getComponent('administrative_area_level_1'),
    postalCode: getComponent('postal_code'),
    country: getComponent('country'),
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng,
  };
};

export const formatAddressForDisplay = (address: Address): string => {
  const parts = [address.street, address.city, address.province, address.postalCode];
  return parts.filter(Boolean).join(', ');
};

export const extractProvince = (place: GoogleMapsAddress): string => {
  const component = place.address_components.find(comp => 
    comp.types.includes('administrative_area_level_1')
  );
  return component ? component.long_name : '';
};

export const extractCity = (place: GoogleMapsAddress): string => {
  const component = place.address_components.find(comp => 
    comp.types.includes('locality') || comp.types.includes('sublocality')
  );
  return component ? component.long_name : '';
};

export const extractPostalCode = (place: GoogleMapsAddress): string => {
  const component = place.address_components.find(comp => 
    comp.types.includes('postal_code')
  );
  return component ? component.long_name : '';
};
