import { supabase } from "@/integrations/supabase/client";
import { StudyTip, StudyResource } from "@/types/university";

// Study Tips Management
export const createStudyTip = async (
  tip: Omit<StudyTip, "id">,
): Promise<StudyTip> => {
  try {
    const { data, error } = await supabase
      .from("study_tips")
      .insert([
        {
          title: tip.title,
          category: tip.category,
          difficulty: tip.difficulty,
          estimated_time: tip.estimatedTime,
          effectiveness: tip.effectiveness,
          tags: tip.tags,
          content: tip.content,
          author: tip.author,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      category: data.category,
      difficulty: data.difficulty as "Beginner" | "Intermediate" | "Advanced",
      estimatedTime: data.estimated_time,
      effectiveness: data.effectiveness,
      tags: data.tags || [],
      content: data.content,
      author: data.author,
    };
  } catch (error) {
    console.error("Error creating study tip:", error);
    throw new Error("Failed to create study tip");
  }
};

export const updateStudyTip = async (
  id: string,
  updates: Partial<StudyTip>,
): Promise<StudyTip> => {
  try {
    const { data, error } = await supabase
      .from("study_tips")
      .update({
        title: updates.title,
        category: updates.category,
        difficulty: updates.difficulty,
        estimated_time: updates.estimatedTime,
        effectiveness: updates.effectiveness,
        tags: updates.tags,
        content: updates.content,
        author: updates.author,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      category: data.category,
      difficulty: data.difficulty as "Beginner" | "Intermediate" | "Advanced",
      estimatedTime: data.estimated_time,
      effectiveness: data.effectiveness,
      tags: data.tags || [],
      content: data.content,
      author: data.author,
    };
  } catch (error) {
    console.error("Error updating study tip:", error);
    throw new Error("Failed to update study tip");
  }
};

export const deleteStudyTip = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase.from("study_tips").delete().eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting study tip:", error);
    throw new Error("Failed to delete study tip");
  }
};

export const getAllStudyTips = async (): Promise<StudyTip[]> => {
  try {
    const { data, error } = await supabase
      .from("study_tips")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // Check if it's a table doesn't exist error
      if (
        error.code === "PGRST116" ||
        error.message?.includes("relation") ||
        error.message?.includes("does not exist")
      ) {
        console.log(
          "Study tips table does not exist yet, returning empty array",
        );
        return [];
      }
      console.error("Database error fetching study tips:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      throw error;
    }

    if (!data) {
      return [];
    }

    return data.map((tip) => ({
      id: tip.id,
      title: tip.title,
      category: tip.category,
      difficulty: tip.difficulty as "Beginner" | "Intermediate" | "Advanced",
      estimatedTime: tip.estimated_time,
      effectiveness: tip.effectiveness,
      tags: tip.tags || [],
      content: tip.content,
      author: tip.author,
    }));
  } catch (error) {
    console.error("Error fetching study tips:", {
      message: error instanceof Error ? error.message : String(error),
      type: error instanceof Error ? error.constructor.name : typeof error,
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Return empty array instead of throwing to allow app to continue
    return [];
  }
};

// Study Resources Management
export const createStudyResource = async (
  resource: Omit<StudyResource, "id">,
): Promise<StudyResource> => {
  try {
    const { data, error } = await supabase
      .from("study_resources")
      .insert([
        {
          title: resource.title,
          description: resource.description,
          type: resource.type,
          category: resource.category,
          difficulty: resource.difficulty,
          url: resource.url,
          rating: resource.rating,
          provider: resource.provider,
          duration: resource.duration,
          tags: resource.tags,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type as "pdf" | "video" | "website" | "tool" | "course",
      category: data.category,
      difficulty: data.difficulty as "Beginner" | "Intermediate" | "Advanced",
      url: data.url,
      rating: data.rating,
      provider: data.provider,
      duration: data.duration,
      tags: data.tags || [],
    };
  } catch (error) {
    console.error("Error creating study resource:", error);
    throw new Error("Failed to create study resource");
  }
};

export const updateStudyResource = async (
  id: string,
  updates: Partial<StudyResource>,
): Promise<StudyResource> => {
  try {
    const { data, error } = await supabase
      .from("study_resources")
      .update({
        title: updates.title,
        description: updates.description,
        type: updates.type,
        category: updates.category,
        difficulty: updates.difficulty,
        url: updates.url,
        rating: updates.rating,
        provider: updates.provider,
        duration: updates.duration,
        tags: updates.tags,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type as "pdf" | "video" | "website" | "tool" | "course",
      category: data.category,
      difficulty: data.difficulty as "Beginner" | "Intermediate" | "Advanced",
      url: data.url,
      rating: data.rating,
      provider: data.provider,
      duration: data.duration,
      tags: data.tags || [],
    };
  } catch (error) {
    console.error("Error updating study resource:", error);
    throw new Error("Failed to update study resource");
  }
};

export const deleteStudyResource = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("study_resources")
      .delete()
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting study resource:", error);
    throw new Error("Failed to delete study resource");
  }
};

export const getAllStudyResources = async (): Promise<StudyResource[]> => {
  try {
    const { data, error } = await supabase
      .from("study_resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // Check if it's a table doesn't exist error
      if (
        error.code === "PGRST116" ||
        error.message?.includes("relation") ||
        error.message?.includes("does not exist")
      ) {
        console.log(
          "Study resources table does not exist yet, returning empty array",
        );
        return [];
      }
      console.error("Database error fetching study resources:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      throw error;
    }

    if (!data) {
      return [];
    }

    return data.map((resource) => ({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      type: resource.type as "pdf" | "video" | "website" | "tool" | "course",
      category: resource.category,
      difficulty: resource.difficulty as
        | "Beginner"
        | "Intermediate"
        | "Advanced",
      url: resource.url,
      rating: resource.rating,
      provider: resource.provider,
      duration: resource.duration,
      tags: resource.tags || [],
    }));
  } catch (error) {
    console.error("Error fetching study resources:", {
      message: error instanceof Error ? error.message : String(error),
      type: error instanceof Error ? error.constructor.name : typeof error,
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Return empty array instead of throwing to allow app to continue
    return [];
  }
};

// Combined function to get all study content (tips + resources)
export const getAllStudyContent = async (): Promise<{
  tips: StudyTip[];
  resources: StudyResource[];
}> => {
  try {
    // Fetch both types of content, but handle failures gracefully
    const [tips, resources] = await Promise.allSettled([
      getAllStudyTips(),
      getAllStudyResources(),
    ]);

    const successfulTips = tips.status === "fulfilled" ? tips.value : [];
    const successfulResources =
      resources.status === "fulfilled" ? resources.value : [];

    // Log any failures
    if (tips.status === "rejected") {
      console.warn("Failed to fetch study tips:", tips.reason);
    }
    if (resources.status === "rejected") {
      console.warn("Failed to fetch study resources:", resources.reason);
    }

    return {
      tips: successfulTips,
      resources: successfulResources,
    };
  } catch (error) {
    console.error("Error fetching study content:", {
      message: error instanceof Error ? error.message : String(error),
      type: error instanceof Error ? error.constructor.name : typeof error,
    });

    // Return empty arrays to allow app to continue with static content
    return { tips: [], resources: [] };
  }
};
