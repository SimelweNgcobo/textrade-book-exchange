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

    if (error) throw error;

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
    console.error("Error fetching study tips:", error);
    throw new Error("Failed to fetch study tips");
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

    if (error) throw error;

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
    console.error("Error fetching study resources:", error);
    throw new Error("Failed to fetch study resources");
  }
};

// Combined function to get all study content (tips + resources)
export const getAllStudyContent = async (): Promise<{
  tips: StudyTip[];
  resources: StudyResource[];
}> => {
  try {
    const [tips, resources] = await Promise.all([
      getAllStudyTips(),
      getAllStudyResources(),
    ]);

    return { tips, resources };
  } catch (error) {
    console.error("Error fetching study content:", error);
    throw new Error("Failed to fetch study content");
  }
};
