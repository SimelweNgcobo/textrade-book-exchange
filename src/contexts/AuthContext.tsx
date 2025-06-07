import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { getUserStats, updateLastActive } from "@/services/userStatsService";
import { isAdminUser } from "@/services/admin/adminAuthService";
import {
  loginUser,
  registerUser,
  logoutUser,
  fetchUserProfile,
  Profile,
} from "@/services/authOperations";
import { UserStats } from "@/types/address";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userStats: UserStats | null;
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const { handleError } = useErrorHandler();

  const isAuthenticated = !!user;
  const isAdmin = profile?.isAdmin || false;

  const initializeAuth = useCallback(async () => {
    try {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      console.log(
        "Initial session check:",
        currentSession ? "Found session" : "No session",
      );

      if (currentSession) {
        await handleAuthStateChange(currentSession);
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      handleError(error, "Initialize Authentication");
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  const setupAuthListener = () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(
        "Auth state changed:",
        event,
        session ? "Session exists" : "No session",
      );

      if (event === "SIGNED_OUT") {
        handleSignOut();
      } else if (session) {
        await handleAuthStateChange(session);
      }

      setIsLoading(false);
    });

    return () => {
      console.log("Cleaning up auth listener");
      subscription.unsubscribe();
    };
  };

  const handleAuthStateChange = async (session: Session) => {
    try {
      setSession(session);
      setUser(session.user);

      if (session.user) {
        const userProfile = await fetchUserProfile(session.user);
        setProfile(userProfile);
        console.log("Auth state updated successfully");
      }
    } catch (error) {
      console.error("Error handling auth state change:", error);
      handleError(error, "Authentication State Change");
    }
  };

  const handleSignOut = () => {
    console.log("Handling sign out");
    setUser(null);
    setProfile(null);
    setSession(null);
    setUserStats(null);
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await loginUser(email, password);
      toast.success("Login successful!");
    } catch (error: unknown) {
      console.error("Login failed:", error);

      let errorMessage = "Login failed. Please try again.";
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage =
          "Invalid email or password. Please check your credentials.";
      } else if (error.message?.includes("Email not confirmed")) {
        errorMessage =
          "Please check your email and click the confirmation link.";
      }

      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      await registerUser(name, email, password);
      toast.success(
        "Registration successful! Please check your email to confirm your account.",
      );
    } catch (error: unknown) {
      console.error("Registration failed:", error);

      let errorMessage = "Registration failed. Please try again.";
      if (error.message?.includes("already registered")) {
        errorMessage = "An account with this email already exists.";
      }

      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (!user) return;

    try {
      const userProfile = await fetchUserProfile(user);
      setProfile(userProfile);
      console.log("Profile refreshed successfully");
    } catch (error) {
      console.error("Error refreshing profile:", error);
      handleError(error, "Refresh Profile");
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

  const updateUserActivity = async () => {
    if (!user) return;

    try {
      await updateLastActive(user.id);
    } catch (error) {
      console.error("Error updating last active:", error);
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

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
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
