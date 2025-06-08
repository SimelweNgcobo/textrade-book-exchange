import { supabase } from "@/integrations/supabase/client";
import { Book } from "@/types/book";
import { BookFilters, BookQueryResult } from "./bookTypes";
import { mapBookFromDatabase } from "./bookMapper";
import {
  handleBookServiceError,
  logBookServiceError,
} from "./bookErrorHandler";
import { logError, getErrorMessage } from "@/utils/errorUtils";

export const getBooks = async (filters?: BookFilters): Promise<Book[]> => {
  try {
    console.log("Fetching books with filters:", filters);

    // First get books
    let query = supabase
      .from("books")
      .select("*")
      .eq("sold", false)
      .order("created_at", { ascending: false });

    // Apply filters if provided
    if (filters) {
      if (filters.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,author.ilike.%${filters.search}%`,
        );
      }
      if (filters.category) {
        query = query.eq("category", filters.category);
      }
      if (filters.condition) {
        query = query.eq("condition", filters.condition);
      }
      if (filters.grade) {
        query = query.eq("grade", filters.grade);
      }
      if (filters.universityYear) {
        query = query.eq("university_year", filters.universityYear);
      }
      if (filters.university) {
        query = query.eq("university", filters.university);
      }
      if (filters.minPrice !== undefined) {
        query = query.gte("price", filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        query = query.lte("price", filters.maxPrice);
      }
    }

    const { data: booksData, error: booksError } = await query;

    if (booksError) {
      logError("Error fetching books", booksError);
      const errorMessage = logBookServiceError(booksError, "fetch books");
      console.warn("Books query failed:", errorMessage);
      return [];
    }

    if (!booksData || booksData.length === 0) {
      console.log("No books found");
      return [];
    }

    // Get unique seller IDs
    const sellerIds = [...new Set(booksData.map((book) => book.seller_id))];

    // Fetch seller profiles separately
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("id, name, email")
      .in("id", sellerIds);

    if (profilesError) {
      logError("Error fetching profiles", profilesError);
      // Continue without profile data rather than failing completely
    }

    // Create profiles map for efficient lookup
    const profilesMap = new Map();
    if (profilesData) {
      profilesData.forEach((profile) => {
        profilesMap.set(profile.id, profile);
      });
    }

    // Combine books with profile data
    const books: Book[] = booksData.map((book: any) => {
      const profile = profilesMap.get(book.seller_id);
      const bookData: BookQueryResult = {
        ...book,
        profiles: profile
          ? {
              id: profile.id,
              name: profile.name,
              email: profile.email,
            }
          : null,
      };
      return mapBookFromDatabase(bookData);
    });

    console.log("Processed books:", books.length);
    return books;
  } catch (error) {
    logError("Error in getBooks", error);
    const errorMessage = logBookServiceError(error, "fetch books");
    console.warn("getBooks failed:", errorMessage);
    return [];
  }
};

export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    console.log("Fetching book by ID:", id);

    // Get book first
    const { data: bookData, error: bookError } = await supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .single();

    if (bookError) {
      logError("Error fetching book", bookError);
      if (bookError.code === "PGRST116") {
        return null; // Book not found
      }
      handleBookServiceError(bookError, "fetch book by ID");
    }

    if (!bookData) {
      console.log("No book found with ID:", id);
      return null;
    }

    console.log("Found book data:", bookData);

    // Get seller profile separately - handle case where profile might not exist
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, name, email")
      .eq("id", bookData.seller_id)
      .maybeSingle();

    if (profileError) {
      logError("Error fetching seller profile", profileError);
      // Continue without profile data rather than failing
    }

    console.log("Found profile data:", profileData);

    const bookWithProfile: BookQueryResult = {
      ...bookData,
      profiles: profileData
        ? {
            id: profileData.id,
            name: profileData.name,
            email: profileData.email,
          }
        : null,
    };

    const mappedBook = mapBookFromDatabase(bookWithProfile);
    console.log("Final mapped book:", mappedBook);

    return mappedBook;
  } catch (error) {
    logError("Error in getBookById", error);
    handleBookServiceError(error, "fetch book by ID");
    return null; // This line will never be reached due to handleBookServiceError throwing, but TypeScript needs it
  }
};

export const getUserBooks = async (userId: string): Promise<Book[]> => {
  try {
    console.log("Fetching user books for ID:", userId);

    if (!userId) {
      console.log("No userId provided");
      return [];
    }

    // Since there's no foreign key relationship, use separate queries directly
    console.log(
      "Using separate queries (no foreign key relationship available)",
    );
    return await getUserBooksWithFallback(userId);
  } catch (error) {
    console.error("Error in getUserBooks", error);
    // Return fallback data instead of throwing
    return await getUserBooksWithFallback(userId);
  }
};

// Fallback function when join query fails
const getUserBooksWithFallback = async (userId: string): Promise<Book[]> => {
  try {
    // Get books for user
    const { data: booksData, error: booksError } = await supabase
      .from("books")
      .select("*")
      .eq("seller_id", userId)
      .order("created_at", { ascending: false });

    if (booksError) {
      logDatabaseError("getUserBooksWithFallback - books query", booksError, {
        userId,
      });
      return [];
    }

    if (!booksData || booksData.length === 0) {
      return [];
    }

    // Get user profile separately
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, name, email")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) {
      logDatabaseError(
        "getUserBooksWithFallback - profile query",
        profileError,
        { userId },
      );
    }

    return booksData.map((book: any) => {
      const bookData: BookQueryResult = {
        ...book,
        profiles: profileData || {
          id: userId,
          name: "Anonymous",
          email: "",
        },
      };
      return mapBookFromDatabase(bookData);
    });
  } catch (error) {
    console.error("Error in getUserBooksWithFallback", error);
    return [];
  }
};
