
import { supabase } from "@/integrations/supabase/client";
import { createBook } from "@/services/book/bookMutations";
import { addNotification } from "@/services/notificationService";
import { ActivityService } from "@/services/activityService";
import { generateFakeBooks, generateFakeNotifications, generateFakeActivities } from "@/utils/fakeDataGenerator";
import { toast } from "sonner";

export class FakeDataService {
  /**
   * Create fake books for the current user
   */
  static async createFakeBooks(count: number = 10): Promise<{
    success: boolean;
    created: number;
    errors: string[];
  }> {
    const result = {
      success: false,
      created: 0,
      errors: [] as string[]
    };

    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        result.errors.push("User not authenticated");
        return result;
      }

      console.log(`Creating ${count} fake books...`);
      
      const fakeBooks = generateFakeBooks(count);
      
      for (let i = 0; i < fakeBooks.length; i++) {
        try {
          const bookData = {
            ...fakeBooks[i],
            imageUrl: fakeBooks[i].frontCover || `https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop&auto=format`
          };
          
          await createBook(bookData);
          result.created++;
          
          console.log(`✅ Created fake book: ${bookData.title}`);
          
          // Small delay to avoid overwhelming the database
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          console.error(`❌ Error creating book ${fakeBooks[i].title}:`, error);
          result.errors.push(`Failed to create "${fakeBooks[i].title}": ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      result.success = result.created > 0;
      
      console.log(`📊 Fake books creation summary: ${result.created}/${fakeBooks.length} created`);
      
    } catch (error) {
      console.error("Error in createFakeBooks:", error);
      result.errors.push(`Service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  /**
   * Create fake notifications for the current user
   */
  static async createFakeNotifications(count: number = 15): Promise<{
    success: boolean;
    created: number;
    errors: string[];
  }> {
    const result = {
      success: false,
      created: 0,
      errors: [] as string[]
    };

    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        result.errors.push("User not authenticated");
        return result;
      }

      console.log(`Creating ${count} fake notifications...`);
      
      const fakeNotifications = generateFakeNotifications(user.id, count);
      
      for (let i = 0; i < fakeNotifications.length; i++) {
        try {
          await addNotification({
            userId: user.id,
            ...fakeNotifications[i]
          });
          
          result.created++;
          console.log(`✅ Created notification: ${fakeNotifications[i].title}`);
          
          // Small delay to avoid overwhelming the database
          await new Promise(resolve => setTimeout(resolve, 50));
          
        } catch (error) {
          console.error(`❌ Error creating notification:`, error);
          result.errors.push(`Failed to create notification "${fakeNotifications[i].title}": ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      result.success = result.created > 0;
      
      console.log(`📊 Fake notifications creation summary: ${result.created}/${fakeNotifications.length} created`);
      
    } catch (error) {
      console.error("Error in createFakeNotifications:", error);
      result.errors.push(`Service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  /**
   * Create fake activity logs for the current user
   */
  static async createFakeActivityLogs(count: number = 25): Promise<{
    success: boolean;
    created: number;
    errors: string[];
  }> {
    const result = {
      success: false,
      created: 0,
      errors: [] as string[]
    };

    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        result.errors.push("User not authenticated");
        return result;
      }

      console.log(`Creating ${count} fake activity logs...`);
      
      const fakeActivities = generateFakeActivities(user.id, count);
      
      for (let i = 0; i < fakeActivities.length; i++) {
        try {
          const activity = fakeActivities[i];
          
          await ActivityService.logActivity(
            user.id,
            activity.type,
            activity.title,
            activity.description,
            activity.metadata
          );
          
          result.created++;
          console.log(`✅ Created activity log: ${activity.title}`);
          
          // Small delay to avoid overwhelming the database
          await new Promise(resolve => setTimeout(resolve, 30));
          
        } catch (error) {
          console.error(`❌ Error creating activity log:`, error);
          result.errors.push(`Failed to create activity "${fakeActivities[i].title}": ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      result.success = result.created > 0;
      
      console.log(`📊 Fake activity logs creation summary: ${result.created}/${fakeActivities.length} created`);
      
    } catch (error) {
      console.error("Error in createFakeActivityLogs:", error);
      result.errors.push(`Service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  /**
   * Create all fake data at once
   */
  static async createAllFakeData(options?: {
    books?: number;
    notifications?: number;
    activities?: number;
  }): Promise<{
    success: boolean;
    summary: {
      books: { created: number; errors: string[] };
      notifications: { created: number; errors: string[] };
      activities: { created: number; errors: string[] };
    };
  }> {
    const opts = {
      books: 15,
      notifications: 20,
      activities: 30,
      ...options
    };

    console.log("🚀 Starting comprehensive fake data creation...");
    
    // Create books first
    const booksResult = await this.createFakeBooks(opts.books);
    
    // Create notifications
    const notificationsResult = await this.createFakeNotifications(opts.notifications);
    
    // Create activity logs
    const activitiesResult = await this.createFakeActivityLogs(opts.activities);
    
    const totalCreated = booksResult.created + notificationsResult.created + activitiesResult.created;
    const totalErrors = booksResult.errors.length + notificationsResult.errors.length + activitiesResult.errors.length;
    
    console.log(`🎉 Fake data creation completed! Created ${totalCreated} items with ${totalErrors} errors.`);
    
    return {
      success: totalCreated > 0,
      summary: {
        books: { created: booksResult.created, errors: booksResult.errors },
        notifications: { created: notificationsResult.created, errors: notificationsResult.errors },
        activities: { created: activitiesResult.created, errors: activitiesResult.errors }
      }
    };
  }

  /**
   * Clear all fake data (for cleanup)
   */
  static async clearFakeData(): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { success: false, message: "User not authenticated" };
      }

      // Note: We don't actually delete data here since it could be mixed with real data
      // Instead, we just return a message about manual cleanup
      return {
        success: true,
        message: "To clear fake data, please use the admin panel or delete items manually through the UI"
      };
      
    } catch (error) {
      return {
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}

export default FakeDataService;
