
interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

const NOTIFICATIONS_KEY = 'rebooked_notifications';

export const getNotifications = (userId: string): Notification[] => {
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  const allNotifications: Notification[] = stored ? JSON.parse(stored) : [];
  return allNotifications.filter(notification => notification.userId === userId);
};

export const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>): void => {
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  const allNotifications: Notification[] = stored ? JSON.parse(stored) : [];
  
  const newNotification: Notification = {
    ...notification,
    id: `notification_${Date.now()}_${Math.random()}`,
    createdAt: new Date().toISOString()
  };
  
  allNotifications.push(newNotification);
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(allNotifications));
};

export const markNotificationAsRead = (notificationId: string): void => {
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  const allNotifications: Notification[] = stored ? JSON.parse(stored) : [];
  
  const notification = allNotifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(allNotifications));
  }
};

export const sendBookRemovalNotification = (userId: string, bookTitle: string): void => {
  addNotification({
    userId,
    title: 'Book Listing Removed',
    message: `Your book listing for "${bookTitle}" was removed because it did not have a clear image or enough detail. Try uploading it again with a better image or description 😉`,
    type: 'warning',
    read: false
  });
};
