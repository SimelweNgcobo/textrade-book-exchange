
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  profile_picture_url: string | null;
  pickup_address: any;
  shipping_address: any;
  addresses_same: boolean | null;
  created_at: string;
  updated_at: string;
  status: string | null;
  suspended_at: string | null;
  suspension_reason: string | null;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userStats: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}
