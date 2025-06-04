
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
    // For now, just log to console since admin_actions table doesn't exist in types yet
    console.log('Admin action:', {
      admin_id: adminId,
      action_type: actionType,
      target_id: targetId,
      target_type: targetType,
      description: description,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in admin action logging:', error);
  }
};
