import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { getUserStats, updateLastActive } from "@/services/userStatsService";
import { isAdminUser } from "@/services/admin/adminAuthService";

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
  userStats: any;
  loadUserStats: () => Promise<void>;
  checkAdminStatus: (userId: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
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
  const [profileLoading, setProfileLoading] = useState(false);
  const [userStats, setUserStats] = useState<any>(null);
  const { handleError } = useErrorHandler();

  const isAuthenticated = !!user;
  const isAdmin = profile?.isAdmin ?? false;

  const fetchProfile = async (
    userId: string,
    retryCount = 0,
  ): Promise<Profile | null> => {
    try {
      setProfileLoading(true);
      console.log(
        `Fetching profile for user: ${userId} (attempt ${retryCount + 1})`,
      );

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          console.log("Profile not found for user:", userId);
          return null;
        }
        throw error;
      }

      const profileData = {
        id: data.id,
        name: data.name || "",
        email: data.email || "",
        isAdmin: data.is_admin || false,
        status: data.status || "active",
        profile_picture_url: data.profile_picture_url,
        bio: data.bio,
      };

      console.log("Profile fetched successfully:", profileData);
      return profileData;
    } catch (error) {
      console.error("Error fetching profile:", error);

      // Retry logic for transient errors
      if (retryCount < 2) {
        console.log(`Retrying profile fetch (${retryCount + 1}/3)...`);
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (retryCount + 1)),
        );
        return fetchProfile(userId, retryCount + 1);
      }

      return null;
    } finally {
      setProfileLoading(false);
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
    let profileFetchTimeout: NodeJS.Timeout;

    const initializeAuth = async () => {
      try {
        console.log("Initializing auth...");
        setIsLoading(true);

        // Set up auth state listener
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
          console.log("Auth state changed:", event, currentSession?.user?.id);

          if (!mounted) return;

          setSession(currentSession);
          setUser(currentSession?.user ?? null);

          if (currentSession?.user) {
            // Clear any existing timeout
            if (profileFetchTimeout) {
              clearTimeout(profileFetchTimeout);
            }

            // Delay profile fetch to avoid race conditions
            profileFetchTimeout = setTimeout(async () => {
              if (mounted) {
                const profileData = await fetchProfile(currentSession.user.id);
                if (mounted) {
                  setProfile(profileData);
                }
              }
            }, 100);
          } else {
            setProfile(null);
            setProfileLoading(false);
          }

          if (mounted && !profileLoading) {
            setIsLoading(false);
          }
        });

        // Check for existing session
        const {
          data: { session: initialSession },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting initial session:", error);
        } else if (initialSession && mounted) {
          console.log("Found existing session");
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
          if (profileFetchTimeout) {
            clearTimeout(profileFetchTimeout);
          }
        };
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      if (profileFetchTimeout) {
        clearTimeout(profileFetchTimeout);
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log("Attempting login for:", email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        console.error("Login error:", error);

        let errorMessage = "Login failed";
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage =
            "Please check your email and click the confirmation link before logging in. Check your spam folder if you don't see it.";
        } else if (error.message.includes("signup_disabled")) {
          errorMessage =
            "Registration is currently disabled. Please contact support.";
        } else if (error.message.includes("Too many requests")) {
          errorMessage = "Too many login attempts. Please try again later.";
        } else {
          errorMessage = error.message;
        }

        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Additional check for email verification
      if (data.user && !data.user.email_confirmed_at) {
        const errorMessage =
          "Please verify your email address before logging in. Check your email for a confirmation link.";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (!data.user) {
        throw new Error("Login failed - no user data returned");
      }

      console.log("Login successful");
      toast.success("Login successful!");
    } catch (error) {
      handleError(error, "Login");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log("Attempting registration for:", email);

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
        console.error("Registration error:", error);

        let errorMessage = "Registration failed";
        if (error.message.includes("already registered")) {
          errorMessage =
            "This email is already registered. Please try logging in instead.";
        } else if (error.message.includes("Password should be")) {
          errorMessage = "Password must be at least 6 characters long";
        } else {
          errorMessage = error.message;
        }

        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (data.user && !data.session) {
        console.log("Registration successful, confirmation email sent");
        toast.success(
          "Registration successful! Please check your email to confirm your account.",
        );
      } else if (data.session) {
        console.log("Registration successful with immediate login");
        toast.success(
          "Registration successful! Welcome to ReBooked Solutions!",
        );
      }
    } catch (error) {
      handleError(error, "Registration");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      console.log("Attempting logout");

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
        toast.error("Logout failed");
        throw error;
      }

      console.log("Logout successful");
      toast.success("Logged out successfully");

      // Clear state immediately
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      handleError(error, "Logout");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserStats = async () => {
    if (!user) return;

    try {
      const stats = await getUserStats(user.id);
      setUserStats(stats);
    } catch (error) {
      console.error("Error loading user stats:", error);
    }
  };

  const checkAdminStatus = async (userId: string): Promise<boolean> => {
    try {
      return await isAdminUser(userId);
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  };

  useEffect(() => {
    if (user && profile) {
      // Update last active timestamp
      updateLastActive(user.id);

      // Load user stats
      loadUserStats();
    }
  }, [user, profile]);

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading: isLoading || profileLoading,
    isAuthenticated,
    isAdmin,
    userStats,
    loadUserStats,
    checkAdminStatus,
    login,
    register,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
