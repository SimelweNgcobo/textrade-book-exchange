
export interface Profile {
  id: string;
  email: string | null;
  name: string | null;
  bio: string | null;
  is_admin: boolean;
  status: string;
  pickup_address: any;
  shipping_address: any;
  addresses_same: boolean;
  profile_picture_url: string | null;
  created_at: string;
  updated_at: string;
}
