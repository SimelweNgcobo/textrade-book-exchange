
export interface Broadcast {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  priority: "low" | "medium" | "normal" | "high" | "urgent"; // Updated to include 'normal' and 'urgent'
  active: boolean; // Changed from isActive to active
  createdAt: string;
  updatedAt?: string; // Added updatedAt
  expiresAt?: string;
  targetAudience?: "all" | "users" | "admin"; // Made type more specific
  createdBy?: string;
}

