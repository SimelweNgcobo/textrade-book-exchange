
export interface UserStats {
  totalListings: number;
  activeSales: number;
  totalSales: number;
  totalEarnings: number;
  completedSales: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  pickup_address: {
    complex?: string;
    unitNumber?: string;
    streetAddress: string;
    suburb?: string;
    city: string;
    province: string;
    postalCode: string;
  };
  shipping_address: {
    complex?: string;
    unitNumber?: string;
    streetAddress: string;
    suburb?: string;
    city: string;
    province: string;
    postalCode: string;
  };
  addresses_same: boolean;
}
