export interface Broadcast {
  id: string;
  message: string;
  title: string;
  createdAt: string;
  isActive: boolean;
  priority: "low" | "normal" | "high" | "urgent";
  expiresAt?: string;
  targetAudience: "all" | "users" | "admin";
  createdBy: string;
}

export interface BroadcastInput {
  message: string;
  title: string;
  priority: "low" | "normal" | "high" | "urgent";
  expiresAt?: string;
  targetAudience: "all" | "users" | "admin";
  createdBy: string;
}

export interface BroadcastView {
  userId: string;
  broadcastId: string;
  viewedAt: string;
  dismissed: boolean;
}
