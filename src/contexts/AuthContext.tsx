
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Profile {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isVerified?: boolean;
  successfulDeliveries?: number;
  isBanned?: boolean;
  banReason?: string;
  rating?: number;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, enable2FA?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Defer profile fetching to avoid Supabase deadlock
        if (currentSession?.user) {
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Existing session check:', currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      }
    });

    setIsLoading(false);
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        console.log('Profile data retrieved:', data);
        // Check if this is the admin email and ensure admin status
        const isAdminEmail = data.email === 'AdminSimnLi@gmail.com';
        
        setProfile({
          id: data.id,
          name: data.name || '',
          email: data.email || '',
          isAdmin: isAdminEmail || !!data.is_admin, // Force admin status for admin email
          isVerified: false,
          successfulDeliveries: 0,
          isBanned: false,
          banReason: '',
          rating: 0
        });

        // Update admin status in database if needed for the specific admin email
        if (isAdminEmail && !data.is_admin) {
          await supabase
            .from('profiles')
            .update({ is_admin: true })
            .eq('id', userId);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with email:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        console.error('Login error:', error.message);
        // Provide more specific error messages
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        }
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Please confirm your email address before logging in. Check your inbox for a confirmation link.');
        }
        throw error;
      }

      console.log('Login successful:', data.user?.email);
      toast.success('Logged in successfully');
    } catch (error: any) {
      console.error('Login error caught:', error.message);
      toast.error(error.message || 'Failed to login');
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, enable2FA = false) => {
    try {
      console.log('Attempting registration with email:', email);
      
      // Create the confirm URL with proper domain
      const confirmUrl = `${window.location.origin}/confirm`;
      console.log('Confirm URL:', confirmUrl);
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
            enable_2fa: enable2FA
          },
          emailRedirectTo: confirmUrl
        }
      });

      if (error) {
        console.error('Registration error:', error.message);
        if (error.message.includes('User already registered')) {
          throw new Error('An account with this email already exists. Please try logging in instead.');
        }
        throw error;
      }

      console.log('Registration response:', data);
      
      // Create profile record if user was created
      if (data.user && !data.user.identities?.length) {
        console.log('User already exists, profile should exist');
      } else if (data.user) {
        console.log('Creating profile for new user');
        // Check if this is the admin email
        const isAdminEmail = email.trim() === 'AdminSimnLi@gmail.com';
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name: name.trim(),
            email: email.trim(),
            is_admin: isAdminEmail // Set admin status for admin email
          });
          
        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't throw here as the user was created successfully
        }
      }
      
      if (data.user && !data.session) {
        toast.success('Registration successful! Please check your email to confirm your account before logging in.');
      } else if (data.session) {
        toast.success('Registration successful! You are now logged in.');
      }
    } catch (error: any) {
      console.error('Registration error caught:', error.message);
      toast.error(error.message || 'Failed to register');
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      // Map our Profile interface fields to the database fields
      const dbUpdates: any = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.email !== undefined) dbUpdates.email = updates.email;
      
      // Only proceed if we have updates to make
      if (Object.keys(dbUpdates).length === 0) {
        return;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state
      if (profile) {
        setProfile({ ...profile, ...updates });
      }
      
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      setProfile(null);
      setSession(null);
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isAuthenticated: !!session,
        isAdmin: !!profile?.isAdmin,
        isLoading,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
