
export interface Broadcast {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  priority: "low" | "medium" | "high";
  isActive: boolean;
  createdAt: string;
  expiresAt?: string;
  targetAudience?: string;
}
