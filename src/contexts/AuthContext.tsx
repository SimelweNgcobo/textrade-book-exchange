
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useErrorHandler } from '@/hooks/useErrorHandler';

interface Profile {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  status: string;
  profile_picture_url?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handleError } = useErrorHandler();

  const isAuthenticated = !!user;
  const isAdmin = profile?.isAdmin ?? false;

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('Profile not found for user:', userId);
          return null;
        }
        throw error;
      }

      return {
        id: data.id,
        name: data.name || '',
        email: data.email || '',
        isAdmin: data.is_admin || false,
        status: data.status || 'active',
        profile_picture_url: data.profile_picture_url,
        bio: data.bio,
      };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, currentSession) => {
            console.log('Auth state changed:', event, currentSession?.user?.id);
            
            if (!mounted) return;

            setSession(currentSession);
            setUser(currentSession?.user ?? null);

            if (currentSession?.user) {
              // Fetch profile data for authenticated user
              setTimeout(async () => {
                if (mounted) {
                  const profileData = await fetchProfile(currentSession.user.id);
                  if (mounted) {
                    setProfile(profileData);
                  }
                }
              }, 0);
            } else {
              setProfile(null);
            }

            if (mounted) {
              setIsLoading(false);
            }
          }
        );

        // Check for existing session
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
        } else if (initialSession && mounted) {
          setSession(initialSession);
          setUser(initialSession.user);
          
          const profileData = await fetchProfile(initialSession.user.id);
          if (mounted) {
            setProfile(profileData);
          }
        }

        if (mounted) {
          setIsLoading(false);
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting login for:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        console.error('Login error:', error);
        
        let errorMessage = 'Login failed';
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link';
        } else {
          errorMessage = error.message;
        }
        
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (!data.user) {
        throw new Error('Login failed - no user data returned');
      }

      console.log('Login successful');
      toast.success('Login successful!');
    } catch (error) {
      handleError(error, 'Login');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting registration for:', email);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            name: name.trim(),
          },
          emailRedirectTo: `${window.location.origin}/confirm`,
        },
      });

      if (error) {
        console.error('Registration error:', error);
        
        let errorMessage = 'Registration failed';
        if (error.message.includes('already registered')) {
          errorMessage = 'This email is already registered. Please try logging in instead.';
        } else {
          errorMessage = error.message;
        }
        
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (data.user && !data.session) {
        console.log('Registration successful, confirmation email sent');
        toast.success('Registration successful! Please check your email to confirm your account.');
      } else if (data.session) {
        console.log('Registration successful with immediate login');
        toast.success('Registration successful! Welcome to ReBooked Solutions!');
      }
    } catch (error) {
      handleError(error, 'Registration');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      console.log('Attempting logout');

      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast.error('Logout failed');
        throw error;
      }

      console.log('Logout successful');
      toast.success('Logged out successfully');
      
      // Clear state immediately
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      handleError(error, 'Logout');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
