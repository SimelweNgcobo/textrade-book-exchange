
import { supabase } from '@/integrations/supabase/client';

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: 'unread' | 'read';
  created_at?: string;
}

export const submitContactMessage = async (contactData: Omit<ContactMessage, 'id' | 'created_at' | 'status'>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
        status: 'unread'
      });

    if (error) {
      console.error('Error submitting contact message:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in submitContactMessage:', error);
    throw error;
  }
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getContactMessages:', error);
    throw error;
  }
};
