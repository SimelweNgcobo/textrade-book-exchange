import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

/**
 * Safe version of useAuth that returns null values when outside AuthProvider
 * instead of throwing an error. Useful for components that might render
 * before AuthProvider is fully initialized.
 */
export const useSafeAuth = () => {
  try {
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
        initError: null,
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
  } catch (error) {
    console.error("useSafeAuth: Error accessing AuthContext", error);
    return {
      user: null,
      profile: null,
      session: null,
      isLoading: false,
      isAuthenticated: false,
      isAdmin: false,
      userStats: null,
      initError: `Auth error: ${error instanceof Error ? error.message : "Unknown error"}`,
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
};
