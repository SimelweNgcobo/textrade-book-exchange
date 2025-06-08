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
    console.error("useAuth called outside of AuthProvider");
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Safe hook that returns null values when outside provider
export function useSafeAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.warn(
      "useSafeAuth: AuthContext not available, returning safe defaults",
    );
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
    console.error(`[AuthContext] ${context}:`, error);
    logError(`AuthContext - ${context}`, error);
  }, []);

  // Handle sign out state
  const handleSignOut = useCallback(() => {
    console.log("🔓 Handling sign out");
    setUser(null);
    setProfile(null);
    setSession(null);
    setUserStats(null);
  }, []);

  // Handle auth state changes
  const handleAuthStateChange = useCallback(
    async (session: Session) => {
      try {
        console.log("🔄 Processing auth state change");
        setSession(session);
        setUser(session.user);

        if (session.user) {
          try {
            const userProfile = await fetchUserProfile(session.user);
            setProfile(userProfile);

            // Log admin status for debugging
            if (userProfile.isAdmin) {
              console.log("🔐 Admin user logged in:", userProfile.email);
            } else {
              console.log("👤 Regular user logged in:", userProfile.email);
            }

            console.log("✅ Auth state updated successfully");
          } catch (profileError) {
            console.error("❌ Error fetching profile:", profileError);
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
      console.log("Auth already initialized, skipping");
      return;
    }

    try {
      console.log("🔧 Initializing authentication...");
      setIsLoading(true);
      setInitError(null);

      const {
        data: { session: currentSession },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      console.log(
        "Initial session check:",
        currentSession ? "Found session" : "No session",
      );

      if (currentSession) {
        await handleAuthStateChange(currentSession);
      }

      setAuthInitialized(true);
      console.log("✅ Authentication initialized successfully");
    } catch (error) {
      console.error("❌ Error initializing auth:", error);
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
    console.log("🔗 Setting up auth state listener");

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(
        "Auth state changed:",
        event,
        session ? "Session exists" : "No session",
      );

      try {
        if (event === "SIGNED_OUT") {
          handleSignOut();
        } else if (session) {
          await handleAuthStateChange(session);
        }

        if (authInitialized) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error in auth state change handler:", error);
        handleError(error, "Auth State Change Handler");
      }
    });

    return () => {
      console.log("🔌 Cleaning up auth listener");
      subscription.unsubscribe();
    };
  }, [authInitialized, handleAuthStateChange, handleSignOut, handleError]);

  // Auth operations
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log("🔐 Starting login for:", email);

      // Use the basic login function to avoid circular dependencies
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("❌ Login error:", error);

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
            console.log("Could not check profile:", profileError);
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

        toast.error(errorMessage);
        throw error;
      }

      if (data.session) {
        console.log("✅ Login successful");
        toast.success("Login successful!");

        // Log the login activity
        try {
          const loginResult = await ActivityService.logLogin(
            data.session.user.id,
          );
          if (!loginResult.success) {
            console.warn("Failed to log login activity:", loginResult.error);
          }
        } catch (activityError) {
          console.warn("Exception logging login activity:", activityError);
        }

        // The auth state change handler will update the context
        return data;
      }
    } catch (error: unknown) {
      console.error("❌ Login failed:", error);
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
      toast.success("Logged out successfully");
    } catch (error) {
      logError("Logout failed", error);
      toast.error("Logout failed. Please try again.");
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
      console.log("Profile refreshed successfully");
    } catch (error) {
      logError("Error refreshing profile", error);
      handleError(error, "Refresh Profile");
    }
  }, [user, handleError]);

  const loadUserStats = useCallback(async () => {
    if (!user) return;

    try {
      const stats = await getUserStats(user.id);
      setUserStats(stats);
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
          console.warn("checkAdminStatus called with empty userId");
          return false;
        }

        console.log("🔍 AuthContext: Checking admin status for:", userId);
        const adminStatus = await isAdminUser(userId);
        console.log("✅ AuthContext: Admin status result:", adminStatus);
        return adminStatus;
      } catch (error) {
        console.error("❌ AuthContext: Admin status check failed");
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
        console.log("🚀 Starting AuthProvider setup");
        await initializeAuth();
        cleanup = setupAuthListener();
        console.log("✅ AuthProvider setup complete");
      } catch (error) {
        console.error("❌ AuthProvider setup failed:", error);
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

// Named exports for Fast Refresh compatibility
export { AuthProvider };
