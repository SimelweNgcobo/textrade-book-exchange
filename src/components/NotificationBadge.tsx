import { Bell } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

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
};

export default NotificationBadge;
