import { Bell } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuth } from "@/contexts/AuthContext";

interface NotificationBadgeProps {
  className?: string;
  iconSize?: string;
  showCount?: boolean;
}

const NotificationBadge = ({
  className = "h-5 w-5",
  iconSize = "h-5 w-5",
  showCount = true,
}: NotificationBadgeProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Always call hooks at the top level
  let unreadCount = 0;
  try {
    const notifications = useNotifications();
    unreadCount = notifications.unreadCount;
  } catch (error) {
    console.error("[NotificationBadge] Error loading notifications:", error);
  }

  // Don't show count if auth is still loading or user not authenticated
  const shouldShowCount =
    !isLoading && isAuthenticated && showCount && unreadCount > 0;

  return (
    <div className={`relative ${className}`}>
      <Bell className={iconSize} />
      {shouldShowCount && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBadge;
