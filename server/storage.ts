import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";

// Database connection
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client, { schema });

// Storage interface for database operations
export interface IStorage {
  // Legacy user methods for compatibility
  getUser(id: number): Promise<schema.User | undefined>;
  getUserByUsername(username: string): Promise<schema.User | undefined>;
  createUser(user: schema.InsertUser): Promise<schema.User>;
  
  // Profile methods
  getProfile(id: string): Promise<schema.Profile | undefined>;
  getProfileByEmail(email: string): Promise<schema.Profile | undefined>;
  createProfile(profile: schema.InsertProfile): Promise<schema.Profile>;
  updateProfile(id: string, updates: Partial<schema.InsertProfile>): Promise<schema.Profile>;
  
  // Book methods
  getBook(id: string): Promise<schema.Book | undefined>;
  getBooks(filters?: {
    search?: string;
    category?: string;
    condition?: string;
    grade?: string;
    universityYear?: string;
    university?: string;
    sellerId?: string;
    sold?: boolean;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<schema.Book[]>;
  createBook(book: schema.InsertBook): Promise<schema.Book>;
  updateBook(id: string, updates: Partial<schema.InsertBook>): Promise<schema.Book>;
  deleteBook(id: string): Promise<void>;
  
  // Transaction methods
  createTransaction(transaction: schema.InsertTransaction): Promise<schema.Transaction>;
  getTransactionsByUser(userId: string): Promise<schema.Transaction[]>;
  
  // Notification methods
  createNotification(notification: schema.InsertNotification): Promise<schema.Notification>;
  getNotificationsByUser(userId: string): Promise<schema.Notification[]>;
  markNotificationAsRead(id: string): Promise<void>;
  deleteNotification(id: string): Promise<void>;
  
  // Contact message methods
  createContactMessage(message: schema.InsertContactMessage): Promise<schema.ContactMessage>;
  getContactMessages(): Promise<schema.ContactMessage[]>;
  
  // Report methods
  createReport(report: schema.InsertReport): Promise<schema.Report>;
  getReports(): Promise<schema.Report[]>;
  updateReportStatus(id: string, status: string): Promise<void>;
  
  // Broadcast methods
  createBroadcast(broadcast: schema.InsertBroadcast): Promise<schema.Broadcast>;
  getBroadcasts(active?: boolean): Promise<schema.Broadcast[]>;
  updateBroadcast(id: string, updates: Partial<schema.InsertBroadcast>): Promise<schema.Broadcast>;
}

export class DatabaseStorage implements IStorage {
  // Legacy user methods for compatibility
  async getUser(id: number): Promise<schema.User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<schema.User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: schema.InsertUser): Promise<schema.User> {
    const result = await db.insert(schema.users).values(insertUser).returning();
    return result[0];
  }

  // Profile methods
  async getProfile(id: string): Promise<schema.Profile | undefined> {
    const result = await db.select().from(schema.profiles).where(eq(schema.profiles.id, id)).limit(1);
    return result[0];
  }

  async getProfileByEmail(email: string): Promise<schema.Profile | undefined> {
    const result = await db.select().from(schema.profiles).where(eq(schema.profiles.email, email)).limit(1);
    return result[0];
  }

  async createProfile(profile: schema.InsertProfile): Promise<schema.Profile> {
    const result = await db.insert(schema.profiles).values(profile).returning();
    return result[0];
  }

  async updateProfile(id: string, updates: Partial<schema.InsertProfile>): Promise<schema.Profile> {
    const result = await db.update(schema.profiles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.profiles.id, id))
      .returning();
    return result[0];
  }

  // Book methods
  async getBook(id: string): Promise<schema.Book | undefined> {
    const result = await db.select().from(schema.books).where(eq(schema.books.id, id)).limit(1);
    return result[0];
  }

  async getBooks(filters: {
    search?: string;
    category?: string;
    condition?: string;
    grade?: string;
    universityYear?: string;
    university?: string;
    sellerId?: string;
    sold?: boolean;
    minPrice?: number;
    maxPrice?: number;
  } = {}): Promise<schema.Book[]> {
    const conditions = [];
    
    if (filters.search) {
      conditions.push(
        sql`(${schema.books.title} ILIKE ${`%${filters.search}%`} OR ${schema.books.author} ILIKE ${`%${filters.search}%`} OR ${schema.books.description} ILIKE ${`%${filters.search}%`})`
      );
    }
    
    if (filters.category) {
      conditions.push(eq(schema.books.category, filters.category));
    }
    
    if (filters.condition) {
      conditions.push(eq(schema.books.condition, filters.condition));
    }
    
    if (filters.grade) {
      conditions.push(eq(schema.books.grade, filters.grade));
    }
    
    if (filters.universityYear) {
      conditions.push(eq(schema.books.universityYear, filters.universityYear));
    }
    
    if (filters.sellerId) {
      conditions.push(eq(schema.books.sellerId, filters.sellerId));
    }
    
    if (typeof filters.sold === 'boolean') {
      conditions.push(eq(schema.books.sold, filters.sold));
    }
    
    if (filters.minPrice !== undefined) {
      conditions.push(sql`${schema.books.price} >= ${filters.minPrice}`);
    }
    
    if (filters.maxPrice !== undefined) {
      conditions.push(sql`${schema.books.price} <= ${filters.maxPrice}`);
    }
    
    if (conditions.length > 0) {
      return await db.select().from(schema.books).where(and(...conditions)).orderBy(desc(schema.books.createdAt));
    }
    
    return await db.select().from(schema.books).orderBy(desc(schema.books.createdAt));
  }

  async createBook(book: schema.InsertBook): Promise<schema.Book> {
    const result = await db.insert(schema.books).values(book).returning();
    return result[0];
  }

  async updateBook(id: string, updates: Partial<schema.InsertBook>): Promise<schema.Book> {
    const result = await db.update(schema.books)
      .set(updates)
      .where(eq(schema.books.id, id))
      .returning();
    return result[0];
  }

  async deleteBook(id: string): Promise<void> {
    await db.delete(schema.books).where(eq(schema.books.id, id));
  }

  // Transaction methods
  async createTransaction(transaction: schema.InsertTransaction): Promise<schema.Transaction> {
    const result = await db.insert(schema.transactions).values(transaction).returning();
    return result[0];
  }

  async getTransactionsByUser(userId: string): Promise<schema.Transaction[]> {
    return db.select().from(schema.transactions)
      .where(sql`${schema.transactions.buyerId} = ${userId} OR ${schema.transactions.sellerId} = ${userId}`)
      .orderBy(desc(schema.transactions.createdAt));
  }

  // Notification methods
  async createNotification(notification: schema.InsertNotification): Promise<schema.Notification> {
    const result = await db.insert(schema.notifications).values(notification).returning();
    return result[0];
  }

  async getNotificationsByUser(userId: string): Promise<schema.Notification[]> {
    return db.select().from(schema.notifications)
      .where(eq(schema.notifications.userId, userId))
      .orderBy(desc(schema.notifications.createdAt));
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await db.update(schema.notifications)
      .set({ read: true })
      .where(eq(schema.notifications.id, id));
  }

  async deleteNotification(id: string): Promise<void> {
    await db.delete(schema.notifications).where(eq(schema.notifications.id, id));
  }

  // Contact message methods
  async createContactMessage(message: schema.InsertContactMessage): Promise<schema.ContactMessage> {
    const result = await db.insert(schema.contactMessages).values(message).returning();
    return result[0];
  }

  async getContactMessages(): Promise<schema.ContactMessage[]> {
    return db.select().from(schema.contactMessages).orderBy(desc(schema.contactMessages.createdAt));
  }

  // Report methods
  async createReport(report: schema.InsertReport): Promise<schema.Report> {
    const result = await db.insert(schema.reports).values(report).returning();
    return result[0];
  }

  async getReports(): Promise<schema.Report[]> {
    return db.select().from(schema.reports).orderBy(desc(schema.reports.createdAt));
  }

  async updateReportStatus(id: string, status: string): Promise<void> {
    await db.update(schema.reports)
      .set({ status, updatedAt: new Date() })
      .where(eq(schema.reports.id, id));
  }

  // Broadcast methods
  async createBroadcast(broadcast: schema.InsertBroadcast): Promise<schema.Broadcast> {
    const result = await db.insert(schema.broadcasts).values(broadcast).returning();
    return result[0];
  }

  async getBroadcasts(active?: boolean): Promise<schema.Broadcast[]> {
    if (typeof active === 'boolean') {
      return await db.select().from(schema.broadcasts).where(eq(schema.broadcasts.active, active)).orderBy(desc(schema.broadcasts.createdAt));
    }
    
    const result = await db.select().from(schema.broadcasts).orderBy(desc(schema.broadcasts.createdAt));
    return result;
  }

  async updateBroadcast(id: string, updates: Partial<schema.InsertBroadcast>): Promise<schema.Broadcast> {
    const result = await db.update(schema.broadcasts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.broadcasts.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
