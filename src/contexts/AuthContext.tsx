import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchUserProfile,
  fetchUserProfileQuick,
  logoutUser,
  loginUser,
  registerUser,
  Profile,
} from "@/services/authOperations";
import { addNotification } from "@/services/notificationService";
import { logError, getErrorMessage } from "@/utils/errorUtils";

// Import debug utilities for development
if (process.env.NODE_ENV === "development") {
  import("@/utils/debugHelpers");
}

interface UserStats {
  totalBooks: number;
  soldBooks: number;
  totalEarnings: number;
}

export interface UserProfile extends Profile {
  totalBooks?: number;
  soldBooks?: number;
  totalEarnings?: number;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  userStats: UserStats | null;
  authInitialized: boolean;
  initError: string | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ user: User | null; error: string | null }>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ user: User | null; error: string | null }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Add more context for debugging and improve HMR resilience
    const error = new Error("useAuth must be used within an AuthProvider");
    error.name = "AuthContextError";

    // In development, provide additional debugging info
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[AuthContext] useAuth hook called outside of AuthProvider:",
        {
          timestamp: new Date().toISOString(),
          stack: error.stack,
          hint: "This might be caused by Hot Module Replacement (HMR) or component rendering outside AuthProvider",
        },
      );
    }

    throw error;
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
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
  const handleError = useCallback((error: unknown, context: string) => {
    logError(`AuthContext - ${context}`, error);
  }, []);

  // Handle sign out state
  const handleSignOut = useCallback(() => {
    setUser(null);
    setProfile(null);
    setSession(null);
    setUserStats(null);
  }, []);

  // Profile health check to upgrade fallback profiles
  const upgradeProfileIfNeeded = useCallback(
    async (currentUser: User) => {
      if (!profile || (!profile.bio && !profile.profile_picture_url)) {
        console.log("[AuthContext] Attempting to upgrade basic profile...");
        try {
          const fullProfile = await fetchUserProfileQuick(currentUser);
          if (
            fullProfile &&
            (fullProfile.bio ||
              fullProfile.profile_picture_url ||
              fullProfile.isAdmin)
          ) {
            setProfile(fullProfile);
            console.log("[AuthContext] Profile upgraded successfully");
          }
        } catch (error) {
          console.log(
            "[AuthContext] Profile upgrade failed, keeping current profile",
          );
        }
      }
    },
    [profile],
  );

  // Handle auth state changes with improved error handling
  const handleAuthStateChange = useCallback(
    async (session: Session, event?: string) => {
      try {
        if (import.meta.env.DEV) {
          console.log("[AuthContext] Handling auth state change:", {
            event,
            userId: session.user?.id,
          });
        }
        setSession(session);
        setUser(session.user);

        if (session.user) {
          // Create immediate fallback profile first
          const fallbackProfile = {
            id: session.user.id,
            name:
              session.user.user_metadata?.name ||
              session.user.email?.split("@")[0] ||
              "User",
            email: session.user.email || "",
            isAdmin: false,
            status: "active",
            profile_picture_url: session.user.user_metadata?.avatar_url,
            bio: undefined,
          };

          // Set fallback profile immediately so user can use the app
          setProfile(fallbackProfile);
          console.log(
            "[AuthContext] Using immediate fallback profile while loading...",
          );

          try {
            // Try to load full profile with reasonable timeout
            const userProfile = await fetchUserProfileQuick(session.user);

            if (userProfile) {
              setProfile(userProfile as UserProfile);
              console.log("[AuthContext] Full profile loaded successfully");
            }

            // Add login notification for authenticated users (non-blocking)
            // Only add notification for actual sign-in events, not session restoration
            if (event === "SIGNED_IN" && !isInitializing) {
              // Check if we already sent a login notification recently to prevent duplicates
              const lastLoginKey = `lastLogin_${session.user.id}`;
              const lastLogin = sessionStorage.getItem(lastLoginKey);
              const now = Date.now();

              // Only send notification if last login was more than 5 minutes ago
              if (!lastLogin || (now - parseInt(lastLogin)) > 300000) {
                sessionStorage.setItem(lastLoginKey, now.toString());

                addNotification({
                  userId: session.user.id,
                  title: "Welcome back!",
                  message: `You have successfully logged in at ${new Date().toLocaleString()}`,
                  type: "success",
                  read: false,
                }).catch((notifError) => {
                  console.warn(
                    "[AuthContext] Failed to create login notification:",
                    {
                      message:
                        notifError instanceof Error
                          ? notifError.message
                          : String(notifError),
                    },
                  );
                });
              }
            }
          } catch (profileError) {
            // Log the timeout but don't treat it as a critical error since we have fallback
            const isTimeoutError =
              profileError instanceof Error &&
              (profileError.message.includes("timeout") ||
                (profileError as Error & { isTimeout?: boolean }).isTimeout);

            if (isTimeoutError) {
              console.log(
                "[AuthContext] Profile fetch timed out, continuing with fallback profile",
              );
            } else {
              console.warn("[AuthContext] Profile fetch failed:", {
                message:
                  profileError instanceof Error
                    ? profileError.message
                    : String(profileError),
                type:
                  profileError instanceof Error
                    ? profileError.constructor.name
                    : typeof profileError,
              });
            }

            // Fallback profile is already set, no need for notification spam
            if (isTimeoutError) {
              // Skip notification for timeout - user can continue normally
              console.log("[AuthContext] Profile will load in background");
            }
          }

          // Always start background profile loading with full retry logic
          setTimeout(() => {
            console.log(
              "[AuthContext] Starting background profile loading with retries...",
            );
            fetchUserProfile(session.user)
              .then((profile) => {
            if (userProfile) {
              setProfile(userProfile as UserProfile);
              console.log("✅ [AuthContext] Full profile loaded successfully");
            } else {
              console.log("ℹ️ [AuthContext] Using fallback profile (normal for new users)");
            }

          // Set up periodic profile upgrade check (every 30 seconds)
          const upgradeInterval = setInterval(() => {
            if (session?.user) {
              upgradeProfileIfNeeded(session.user);
            }
          }, 30000);

          // Clean up interval when component unmounts or user changes
          return () => clearInterval(upgradeInterval);
        }
      } catch (error) {
        console.error("[AuthContext] Auth state change failed:", {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          type: error instanceof Error ? error.constructor.name : typeof error,
        });
        handleError(error, "Auth State Change");
      }
    },
    [handleError, upgradeProfileIfNeeded],
  );

  // Initialize auth with better error handling
  const initializeAuth = useCallback(async () => {
    if (authInitialized) {
      return;
    }

    try {
      setIsLoading(true);
      setInitError(null);

      console.log("[AuthContext] Starting auth initialization...");

      // Get initial session with network error handling
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("[AuthContext] Failed to get session:", {
          message: error.message,
          code: error.name,
        });
        setInitError(
          getErrorMessage(error, "Failed to initialize authentication"),
        );
        return;
      }

      if (session) {
        console.log("[AuthContext] Found existing session");
        await handleAuthStateChange(session);
      } else {
        console.log("[AuthContext] No existing session found");
      }

      setAuthInitialized(true);
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        "Failed to initialize authentication",
      );
      console.error("[AuthContext] Auth initialization failed:", {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        type: error instanceof Error ? error.constructor.name : typeof error,
        online: navigator.onLine,
      });
      setInitError(errorMessage);
      handleError(error, "Initialize Auth");
    } finally {
      setIsLoading(false);
    }
  }, [authInitialized, handleAuthStateChange, handleError]);

  // Refresh profile function
  const refreshProfile = useCallback(async () => {
    if (!user) return;

    try {
      // First try quick fetch for immediate response
      let updatedProfile = await fetchUserProfileQuick(user);

      if (updatedProfile) {
        setProfile(updatedProfile);
        console.log("[AuthContext] Profile refreshed successfully (quick)");
      } else {
        // If quick fetch fails, try full fetch in background
        console.log("[AuthContext] Quick refresh failed, trying full fetch...");
        updatedProfile = await fetchUserProfile(user);
        if (updatedProfile) {
          setProfile(updatedProfile);
          console.log("[AuthContext] Profile refreshed successfully (full)");
        }
      }
    } catch (error) {
      console.error("[AuthContext] Failed to refresh profile:", {
        message: error instanceof Error ? error.message : String(error),
      });
      handleError(error, "Refresh Profile");
    }
  }, [user, handleError]);

  // Login function
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await loginUser(email, password);
        console.log("[AuthContext] Login successful");
        return result;
      } catch (error) {
        console.error("[AuthContext] Login failed:", {
          message: error instanceof Error ? error.message : String(error),
          code: error instanceof Error ? error.name : undefined,
        });
        handleError(error, "Login");
        throw error;
      }
    },
    [handleError],
  );

  // Register function
  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const result = await registerUser(name, email, password);
        console.log("[AuthContext] Registration successful");
        return result;
      } catch (error) {
        console.error("[AuthContext] Registration failed:", {
          message: error instanceof Error ? error.message : String(error),
          code: error instanceof Error ? error.name : undefined,
        });
        handleError(error, "Register");
        throw error;
      }
    },
    [handleError],
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      await logoutUser();
      handleSignOut();
      console.log("[AuthContext] Logout successful");
    } catch (error) {
      console.error("[AuthContext] Logout failed:", {
        message: error instanceof Error ? error.message : String(error),
      });
      handleError(error, "Logout");
      // Force sign out even if logout fails
      handleSignOut();
    }
  }, [handleSignOut, handleError]);

  // Set up auth listener
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[AuthContext] Auth state changed:", event);

      if (event === "SIGNED_OUT" || !session) {
        handleSignOut();
        setIsLoading(false);
        return;
      }

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        await handleAuthStateChange(session, event);
      }

      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [handleAuthStateChange, handleSignOut]);

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      console.log("[AuthContext] Network connection restored");
      if (!authInitialized && !isLoading) {
        initializeAuth();
      }
    };

    const handleOffline = () => {
      console.log("[AuthContext] Network connection lost");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [authInitialized, isLoading, initializeAuth]);

  const value: AuthContextType = {
    user,
    profile,
    session,
    isAuthenticated,
    isAdmin,
    isLoading,
    userStats,
    authInitialized,
    initError,
    login,
    register,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};