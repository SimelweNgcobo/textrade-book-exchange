
import { supabase } from "@/integrations/supabase/client";

export interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
  notified: boolean;
}

export const WaitlistService = {
  async addToWaitlist(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email.toLowerCase())
        .single();

      if (existing) {
        return { 
          success: false, 
          message: "You're already on our waitlist! We'll notify you when we launch." 
        };
      }

      // Add to waitlist
      const { error } = await supabase
        .from('waitlist')
        .insert([{ 
          email: email.toLowerCase(),
          created_at: new Date().toISOString(),
          notified: false 
        }]);

      if (error) {
        console.error('Error adding to waitlist:', error);
        return { 
          success: false, 
          message: "Something went wrong. Please try again." 
        };
      }

      return { 
        success: true, 
        message: "Successfully added to waitlist!" 
      };
    } catch (error) {
      console.error('Waitlist service error:', error);
      return { 
        success: false, 
        message: "Something went wrong. Please try again." 
      };
    }
  },

  async getWaitlistCount(): Promise<number> {
    try {
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });
      
      return count || 0;
    } catch (error) {
      console.error('Error getting waitlist count:', error);
      return 0;
    }
  },

  async getWaitlistEntries(): Promise<WaitlistEntry[]> {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching waitlist:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Waitlist service error:', error);
      return [];
    }
  }
};
