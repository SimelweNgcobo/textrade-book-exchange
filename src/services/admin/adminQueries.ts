import { supabase } from "@/integrations/supabase/client";
import { logError, logDatabaseError, logQueryDebug } from "@/utils/errorUtils";

export interface AdminStats {
  totalUsers: number;
  activeListings: number;
  booksSold: number;
  reportedIssues: number;
  newUsersThisWeek: number;
  salesThisMonth: number;
  weeklyCommission: number;
  monthlyCommission: number;
  pendingReports: number;
  unreadMessages: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: string;
  listingsCount: number;
  createdAt: string;
}

export interface AdminListing {
  id: string;
  title: string;
  author: string;
  price: number;
  status: string;
  user: string;
  sellerId: string;
}

export const getUserProfile = async (userId: string): Promise<AdminUser> => {
  try {
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .select("id, name, email, status, created_at")
      .eq("id", userId)
      .single();

    if (userError) {
      logError("Error fetching user profile", userError);
      throw userError;
    }

    if (!user) {
      throw new Error("User not found");
    }

    // Get book count for this user
    const { count } = await supabase
      .from("books")
      .select("*", { count: "exact", head: true })
      .eq("seller_id", userId);

    return {
      id: user.id,
      name: user.name || "Anonymous",
      email: user.email || "",
      status: user.status || "active",
      listingsCount: count || 0,
      createdAt: user.created_at,
    };
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    throw new Error("Failed to fetch user profile");
  }
};

export const getAdminStats = async (): Promise<AdminStats> => {
  try {
    // Get total registered users count from auth.users (actual registered accounts)
    const { count: totalUsers, error: userCountError } = await supabase
      .from("profiles") // We use profiles as a proxy since auth.users is not directly accessible
      .select("id", { count: "exact", head: true });

    if (userCountError) {
      console.error("Error fetching user count:", userCountError);
    }

    // Alternative: Get count from auth admin API if available
    // For now, we'll use profiles count which should match auth users

    // Get active listings count
    const { count: activeListings } = await supabase
      .from("books")
      .select("id", { count: "exact", head: true })
      .eq("sold", false);

    // Get sold books count
    const { count: booksSold } = await supabase
      .from("books")
      .select("*", { count: "exact", head: true })
      .eq("sold", true);

    // Get pending reports count
    const { count: pendingReports } = await supabase
      .from("reports")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    // Get unread contact messages count
    const { count: unreadMessages } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("status", "unread");

    // Get new registered users this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { count: newUsersThisWeek } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", oneWeekAgo.toISOString());

    // Get sales this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);

    const { count: salesThisMonth } = await supabase
      .from("transactions")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString());

    // Calculate commissions (mock data for now)
    const weeklyCommission = (salesThisMonth || 0) * 0.1 * 50; // 10% commission, avg R50 per book
    const monthlyCommission = weeklyCommission * 4;

    return {
      totalUsers: totalUsers || 0,
      activeListings: activeListings || 0,
      booksSold: booksSold || 0,
      reportedIssues: pendingReports || 0,
      newUsersThisWeek: newUsersThisWeek || 0,
      salesThisMonth: salesThisMonth || 0,
      weeklyCommission,
      monthlyCommission,
      pendingReports: pendingReports || 0,
      unreadMessages: unreadMessages || 0,
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    throw new Error("Failed to fetch admin statistics");
  }
};

export const getAllUsers = async (): Promise<AdminUser[]> => {
  try {
    const { data: users, error: usersError } = await supabase
      .from("profiles")
      .select("id, name, email, status, created_at")
      .neq("status", "deleted")
      .order("created_at", { ascending: false });

    if (usersError) {
      console.error("Error fetching users:", usersError);
      throw usersError;
    }

    if (!users) return [];

    // Get book counts for each user in batches to avoid overwhelming the server
    const usersWithCounts = await Promise.all(
      users.map(async (user) => {
        try {
          const { count } = await supabase
            .from("books")
            .select("*", { count: "exact", head: true })
            .eq("seller_id", user.id);

          return {
            id: user.id,
            name: user.name || "Anonymous",
            email: user.email || "",
            status: user.status || "active",
            listingsCount: count || 0,
            createdAt: user.created_at,
          };
        } catch (error) {
          console.error(
            `Error fetching book count for user ${user.id}:`,
            error,
          );
          return {
            id: user.id,
            name: user.name || "Anonymous",
            email: user.email || "",
            status: user.status || "active",
            listingsCount: 0,
            createdAt: user.created_at,
          };
        }
      }),
    );

    return usersWithCounts;
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw new Error("Failed to fetch users");
  }
};

export const getAllListings = async (): Promise<AdminListing[]> => {
  try {
    console.log(
      "Getting all listings with separate queries (no foreign key available)",
    );

    // Since there's no foreign key relationship, use separate queries directly
    return await getAllListingsFallback();
  } catch (error) {
    console.error("Error in getAllListings:", error);
    // Fallback to separate queries
    return await getAllListingsFallback();
  }
};

// Fallback function for when the join query fails
const getAllListingsFallback = async (): Promise<AdminListing[]> => {
  try {
    // First, get all books
    const { data: books, error: booksError } = await supabase
      .from("books")
      .select("id, title, author, price, sold, seller_id")
      .order("created_at", { ascending: false });

    if (booksError) {
      logDatabaseError("getAllListingsFallback - books query", booksError);
      throw booksError;
    }

    if (!books || books.length === 0) return [];

    // Get unique seller IDs
    const sellerIds = [...new Set(books.map((book) => book.seller_id))];

    // Fetch seller profiles
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, name")
      .in("id", sellerIds);

    if (profilesError) {
      logDatabaseError(
        "getAllListingsFallback - profiles query",
        profilesError,
      );
      // Continue without profiles rather than failing completely
    }

    // Create a map for quick profile lookup
    const profileMap = new Map();
    if (profiles) {
      profiles.forEach((profile) => {
        profileMap.set(profile.id, profile.name || "Anonymous");
      });
    }

    // Combine books with seller names
    return books.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      status: book.sold ? "sold" : "active",
      user: profileMap.get(book.seller_id) || "Anonymous",
      sellerId: book.seller_id,
    }));
  } catch (error) {
    console.error("Error in getAllListingsFallback:", error);
    throw new Error("Failed to fetch listings");
  }
};
