
import { createContext, useContext, useState, useEffect } from 'react';
import {
  Session,
  User as SupabaseUser,
  AuthError
} from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/profile';

interface AuthContextType {
  user: SupabaseUser | null;
  profile: Profile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      setUser(session?.user || null);
      setSession(session || null);
      setIsAuthenticated(!!session);

      if (session?.user) {
        await fetchProfile(session.user.id);
      }

      setLoading(false);
    };

    loadSession();

    supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      setSession(session || null);
      setIsAuthenticated(!!session);

      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
    });
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setIsAdmin(false);
      } else {
        setProfile(profileData);
        setIsAdmin(profileData?.is_admin || false);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign-in error:', error);
        return { error };
      }

      setUser(data.user);
      setSession(data.session);
      setIsAuthenticated(true);
      await fetchProfile(data.user?.id as string);

      return { error: null };
    } catch (error) {
      console.error('Sign-in error:', error);
      return { error: error as AuthError };
    }
  };

  const login = async (email: string, password: string) => {
    const { error } = await signIn(email, password);
    if (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        console.error('Sign-up error:', error);
        return { error };
      }

      setUser(data.user);
      setSession(data.session);
      setIsAuthenticated(true);

      // Create user profile
      if (data.user) {
        await supabase
          .from('profiles')
          .insert([{ id: data.user.id, email: data.user.email, name }]);
      }

      await fetchProfile(data.user?.id as string);

      return { error: null };
    } catch (error) {
      console.error('Sign-up error:', error);
      return { error: error as AuthError };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    const { error } = await signUp(email, password, name);
    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) {
        console.error('No user to update profile for.');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    isAuthenticated,
    isAdmin,
    loading,
    isLoading: loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    login,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
