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
import { logError, getErrorMessage } from "@/utils/errorUtils";
import { ActivityService } from "@/services/activityService";
import { addNotification } from "@/services/notificationService";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userStats: UserStats | null;
  initError: string | null;
  loadUserStats: () => Promise<void>;
  checkAdminStatus: (userId: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// Safe hook that doesn't throw when outside provider
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Safe hook that returns null values when outside provider
export function useSafeAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    return {
      user: null,
      profile: null,
      session: null,
      isLoading: false,
      isAuthenticated: false,
      isAdmin: false,
      userStats: null,
      initError: "AuthProvider not available",
      loadUserStats: async () => {},
      checkAdminStatus: async () => false,
      login: async () => {
        throw new Error("AuthProvider not available");
      },
      register: async () => {
        throw new Error("AuthProvider not available");
      },
      logout: async () => {
        throw new Error("AuthProvider not available");
      },
      refreshProfile: async () => {
        throw new Error("AuthProvider not available");
      },
    };
  }
  return context;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  const isAuthenticated = !!user;
  const isAdmin = profile?.isAdmin || false;

  // Safe error handler
  const handleError = useCallback((error: any, context: string) => {
    logError(`AuthContext - ${context}`, error);
  }, []);

  // Handle sign out state
  const handleSignOut = useCallback(() => {
    setUser(null);
    setProfile(null);
    setSession(null);
    setUserStats(null);
  }, []);

  // Handle auth state changes
  const handleAuthStateChange = useCallback(
    async (session: Session, event?: string) => {
      try {
        setSession(session);
        setUser(session.user);

        if (session.user) {
          try {
            const userProfile = await fetchUserProfile(session.user);
            setProfile(userProfile);

            // Add login notification for authenticated users
            if (event === "SIGNED_IN") {
              try {
                await addNotification({
                  userId: session.user.id,
                  title: "Welcome back!",
                  message: `You have successfully logged in at ${new Date().toLocaleString()}`,
                  type: "success",
                  read: false,
                });
              } catch (error) {
                // Silently fail notification creation
              }
            }
          } catch (profileError) {
            handleError(profileError, "Fetch Profile");
            // Don't throw here, allow login to continue without profile
          }
        }
      } catch (error) {
        handleError(error, "Auth State Change");
      }
    },
    [handleError],
  );

  // Initialize auth
  const initializeAuth = useCallback(async () => {
    if (authInitialized) {
      return;
    }

    try {
      setIsLoading(true);
      setInitError(null);

      const {
        data: { session: currentSession },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      if (currentSession) {
        await handleAuthStateChange(currentSession);
      }

      setAuthInitialized(true);
    } catch (error) {
      handleError(error, "Initialize Authentication");
      setInitError(
        `Authentication initialization failed: ${getErrorMessage(error)}`,
      );
      setAuthInitialized(true); // Set to true even on error to prevent infinite loading
    } finally {
      setIsLoading(false);
    }
  }, [authInitialized, handleAuthStateChange, handleError]);

  // Set up auth listener
  const setupAuthListener = useCallback(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === "SIGNED_OUT") {
          handleSignOut();
        } else if (session) {
          await handleAuthStateChange(session, event);
        }

        if (authInitialized) {
          setIsLoading(false);
        }
      } catch (error) {
        handleError(error, "Auth State Change Handler");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [authInitialized, handleAuthStateChange, handleSignOut, handleError]);

  // Auth operations
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Use the basic login function to avoid circular dependencies
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Enhanced error handling
        let errorMessage = "Login failed. Please try again.";
        const errorMsg = getErrorMessage(error);

        if (errorMsg.includes("Invalid login credentials")) {
          // Check if user might need email verification
          try {
            const { data: profile } = await supabase
              .from("profiles")
              .select("created_at")
              .eq("email", email)
              .single();

            if (profile) {
              const createdAt = new Date(profile.created_at);
              const now = new Date();
              const daysSinceCreation =
                (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

              if (daysSinceCreation <= 7) {
                errorMessage =
                  "Your email address may not be verified yet. Please check your email and click the verification link.";
              } else {
                errorMessage =
                  "Incorrect email or password. Please check your credentials and try again.";
              }
            } else {
              errorMessage =
                "No account found with this email address. Please register first.";
            }
          } catch (profileError) {
            errorMessage =
              "Invalid email or password. Please check your credentials.";
          }
        } else if (errorMsg.includes("Email not confirmed")) {
          errorMessage =
            "Please check your email and click the confirmation link to verify your account.";
        } else if (errorMsg.includes("Too many requests")) {
          errorMessage =
            "Too many login attempts. Please wait a few minutes before trying again.";
        }

        toast.error(errorMessage, { duration: 3000 });
        throw error;
      }

      if (data.session) {
        toast.success("Login successful!", { duration: 2000 });

        // Log the login activity
        try {
          const loginResult = await ActivityService.logLogin(
            data.session.user.id,
          );
          if (!loginResult.success) {
            // Silently fail activity logging
          }
        } catch (activityError) {
          // Silently fail activity logging
        }

        // The auth state change handler will update the context
        return data;
      }
    } catch (error: unknown) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        setIsLoading(true);
        await registerUser(name, email, password);
        toast.success(
          "Registration successful! Please check your email to confirm your account.",
          { duration: 4000 },
        );
      } catch (error: unknown) {
        logError("Registration failed", error);

        let errorMessage = "Registration failed. Please try again.";
        const errorMsg = getErrorMessage(error);

        if (errorMsg.includes("already registered")) {
          errorMessage = "An account with this email already exists.";
        }

        toast.error(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      toast.success("Successfully logged out. See you next time!", {
        duration: 2000,
      });
    } catch (error) {
      logError("Logout failed", error);
      toast.error("Logout failed. Please try again.", { duration: 3000 });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;

    try {
      const userProfile = await fetchUserProfile(user);
      setProfile(userProfile);
    } catch (error) {
      logError("Error refreshing profile", error);
      handleError(error, "Refresh Profile");
    }
  }, [user, handleError]);

  const loadUserStats = useCallback(async () => {
    if (!user) return;

    try {
      const stats = await getUserStats(user.id);
      if (stats) {
        setUserStats({
          totalListings: stats.totalBooksListed,
          activeSales: stats.totalBooksSold,
          totalSales: stats.totalBooksSold,
          totalEarnings: 0,
          completedSales: stats.totalBooksSold,
          ...stats,
        });
      }
    } catch (error) {
      logError("Error loading user stats", error);
    }
  }, [user]);

  const updateUserActivity = useCallback(async () => {
    if (!user) return;

    try {
      await updateLastActive(user.id);
    } catch (error) {
      logError("Error updating last active", error);
    }
  }, [user]);

  const checkAdminStatus = useCallback(
    async (userId: string): Promise<boolean> => {
      try {
        if (!userId) {
          return false;
        }

        const adminStatus = await isAdminUser(userId);
        return adminStatus;
      } catch (error) {
        logError("AuthContext admin status check failed", error);
        return false;
      }
    },
    [],
  );

  // Initialize auth and set up listener on mount
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      try {
        await initializeAuth();
        cleanup = setupAuthListener();
      } catch (error) {
        handleError(error, "AuthProvider Setup");
        setInitError(`Authentication setup failed: ${getErrorMessage(error)}`);
        setIsLoading(false);
        setAuthInitialized(true);
      }
    };

    setup();

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []); // Empty dependency array - only run once on mount

  // Load user stats and update activity when user/profile changes
  useEffect(() => {
    if (user && profile && authInitialized) {
      loadUserStats();
      updateUserActivity();
    }
  }, [user, profile, authInitialized, loadUserStats, updateUserActivity]);

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
    isAuthenticated,
    isAdmin,
    userStats,
    initError,
    loadUserStats,
    checkAdminStatus,
    login,
    register,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
