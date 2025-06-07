export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  streetAddress?: string; // For backend compatibility
}

export interface AddressData {
  pickup_address?: Address;
  shipping_address?: Address;
  addresses_same?: boolean;
}

export interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  avatar_url?: string;
  bio?: string;
  university?: string;
}

export interface UserStats {
  totalListings: number;
  activeSales: number;
  totalSales: number;
  totalEarnings: number;
  completedSales: number;
  rating?: number;
  lastActive?: string;
}

export interface DebugInfo {
  url: string;
  hash: string;
  search: string;
  hasSession: boolean;
  sessionUser: string;
  timestamp: string;
}

export interface DatabaseTestResult {
  type: "error" | "success" | "info" | "data";
  content: string | unknown[];
}
