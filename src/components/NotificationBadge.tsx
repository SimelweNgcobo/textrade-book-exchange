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

  // Don't render notification badge if auth is still loading or user not authenticated
  if (isLoading || !isAuthenticated) {
    return (
      <div className={`relative ${className}`}>
        <Bell className={iconSize} />
      </div>
    );
  }

  try {
    const { unreadCount } = useNotifications();

    return (
      <div className={`relative ${className}`}>
        <Bell className={iconSize} />
        {showCount && unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>
    );
  } catch (error) {
    console.error("[NotificationBadge] Error:", error);
    // Fallback to basic bell icon if notifications fail to load
    return (
      <div className={`relative ${className}`}>
        <Bell className={iconSize} />
      </div>
    );
  }
};

export default NotificationBadge;
