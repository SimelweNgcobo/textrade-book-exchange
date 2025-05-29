
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Trash2, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { getNotifications, markNotificationAsRead } from '@/services/notificationService';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      const userNotifications = getNotifications(user.id);
      setNotifications(userNotifications);
    }
  }, [user]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const markAsRead = (id: string) => {
    markNotificationAsRead(id);
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast.success('Notification deleted');
  };

  const markAllAsRead = () => {
    notifications.forEach(notif => {
      if (!notif.read) {
        markNotificationAsRead(notif.id);
      }
    });
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast.success('All notifications marked as read');
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    localStorage.setItem('notificationCount', unreadCount.toString());
    window.dispatchEvent(new CustomEvent('notificationUpdate', { detail: unreadCount }));
  }, [unreadCount]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="flex items-center flex-wrap">
            <Bell className="h-6 w-6 text-book-600 mr-2 flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl font-bold text-book-800">Notifications</h1>
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                {unreadCount}
              </span>
            )}
          </div>
          
          {notifications.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={markAllAsRead} 
                disabled={unreadCount === 0}
                className="w-full sm:w-auto text-sm"
                size="sm"
              >
                Mark All Read
              </Button>
              <Button 
                variant="outline" 
                onClick={clearAll}
                className="w-full sm:w-auto text-sm"
                size="sm"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12 sm:py-16">
              <Bell className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No notifications</h3>
              <p className="text-gray-500 text-sm sm:text-base px-4">
                You're all caught up! We'll notify you when something new happens.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                <CardHeader className="pb-3 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="flex-shrink-0 mt-0.5">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg leading-tight pr-2">
                          {notification.title}
                        </CardTitle>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-2 flex-shrink-0">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm px-2 sm:px-3"
                        >
                          Mark Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-700 p-1 sm:p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 p-4 sm:p-6 sm:pt-0">
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words">
                    {notification.message}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notifications;
