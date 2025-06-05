
import { supabase } from '@/integrations/supabase/client';

export const isAdminUser = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', userId)
      .eq('email', 'AdminSimnLi@gmail.com')
      .single();

    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in admin check:', error);
    return false;
  }
};

export const logAdminAction = async (
  adminId: string,
  actionType: string,
  targetId?: string,
  targetType?: string,
  description?: string
) => {
  try {
    // Since admin_actions table doesn't exist, we'll log to notifications instead
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: adminId,
        title: `Admin Action: ${actionType}`,
        message: description || `Admin performed ${actionType} on ${targetType}: ${targetId}`,
        type: 'admin_action'
      });

    if (error) {
      console.error('Error logging admin action:', error);
    }
  } catch (error) {
    console.error('Error in admin action logging:', error);
  }
};
