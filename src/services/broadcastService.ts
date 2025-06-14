
import { supabase } from "@/integrations/supabase/client";
import { Broadcast } from "@/types/broadcast";

export const broadcastService = {
  // Create a new broadcast
  createBroadcast: async (broadcastData: Omit<Broadcast, 'id' | 'createdAt'>): Promise<Broadcast> => {
    try {
      const { data, error } = await supabase
        .from('broadcasts')
        .insert([{
          title: broadcastData.title,
          message: broadcastData.message,
          type: broadcastData.type,
          priority: broadcastData.priority,
          target_audience: broadcastData.targetAudience,
          active: broadcastData.active,
          created_by: broadcastData.createdBy,
          expires_at: broadcastData.expiresAt,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating broadcast:', error);
        throw new Error(`Failed to create broadcast: ${error.message}`);
      }

      return {
        id: data.id,
        title: data.title,
        message: data.message,
        type: data.type,
        priority: data.priority,
        targetAudience: data.target_audience,
        active: data.active,
        createdBy: data.created_by,
        createdAt: data.created_at,
        expiresAt: data.expires_at,
      };
    } catch (error) {
      console.error('Broadcast creation failed:', error);
      throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
  },

  // Get all broadcasts
  getBroadcasts: async (): Promise<Broadcast[]> => {
    try {
      const { data, error } = await supabase
        .from('broadcasts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching broadcasts:', error);
        return [];
      }

      return data?.map(broadcast => ({
        id: broadcast.id,
        title: broadcast.title,
        message: broadcast.message,
        type: broadcast.type,
        priority: broadcast.priority,
        targetAudience: broadcast.target_audience,
        active: broadcast.active,
        createdBy: broadcast.created_by,
        createdAt: broadcast.created_at,
        expiresAt: broadcast.expires_at,
      })) || [];
    } catch (error) {
      console.error('Failed to fetch broadcasts:', error);
      return [];
    }
  },

  // Get active broadcasts
  getActiveBroadcasts: async (): Promise<Broadcast[]> => {
    try {
      const { data, error } = await supabase
        .from('broadcasts')
        .select('*')
        .eq('active', true)
        .or('expires_at.is.null,expires_at.gt.now()')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching active broadcasts:', error);
        return [];
      }

      return data?.map(broadcast => ({
        id: broadcast.id,
        title: broadcast.title,
        message: broadcast.message,
        type: broadcast.type,
        priority: broadcast.priority,
        targetAudience: broadcast.target_audience,
        active: broadcast.active,
        createdBy: broadcast.created_by,
        createdAt: broadcast.created_at,
        expiresAt: broadcast.expires_at,
      })) || [];
    } catch (error) {
      console.error('Failed to fetch active broadcasts:', error);
      return [];
    }
  },

  // Update a broadcast
  updateBroadcast: async (id: string, updates: Partial<Omit<Broadcast, 'id' | 'createdAt'>>): Promise<Broadcast> => {
    try {
      const updateData: any = {};
      
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.message !== undefined) updateData.message = updates.message;
      if (updates.type !== undefined) updateData.type = updates.type;
      if (updates.priority !== undefined) updateData.priority = updates.priority;
      if (updates.targetAudience !== undefined) updateData.target_audience = updates.targetAudience;
      if (updates.active !== undefined) updateData.active = updates.active;
      if (updates.expiresAt !== undefined) updateData.expires_at = updates.expiresAt;

      const { data, error } = await supabase
        .from('broadcasts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating broadcast:', error);
        throw new Error(`Failed to update broadcast: ${error.message}`);
      }

      return {
        id: data.id,
        title: data.title,
        message: data.message,
        type: data.type,
        priority: data.priority,
        targetAudience: data.target_audience,
        active: data.active,
        createdBy: data.created_by,
        createdAt: data.created_at,
        expiresAt: data.expires_at,
      };
    } catch (error) {
      console.error('Broadcast update failed:', error);
      throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
  },

  // Delete a broadcast
  deleteBroadcast: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('broadcasts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting broadcast:', error);
        throw new Error(`Failed to delete broadcast: ${error.message}`);
      }
    } catch (error) {
      console.error('Broadcast deletion failed:', error);
      throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
  },
};

// Named exports for backward compatibility
export const {
  createBroadcast,
  getBroadcasts,
  getActiveBroadcasts,
  updateBroadcast,
  deleteBroadcast,
} = broadcastService;
