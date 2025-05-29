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
const BROADCAST_QUEUE_KEY = 'broadcastQueue';

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

// New function to queue broadcast messages for offline users
export const queueBroadcastMessage = (message: string): void => {
  const queue = JSON.parse(localStorage.getItem(BROADCAST_QUEUE_KEY) || '[]');
  queue.push({
    message,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem(BROADCAST_QUEUE_KEY, JSON.stringify(queue));
};

// Function to clear old broadcast messages from queue (after they've been shown as popups)
export const clearOldBroadcastMessages = (): void => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  
  const queue = JSON.parse(localStorage.getItem(BROADCAST_QUEUE_KEY) || '[]');
  const filtered = queue.filter((msg: any) => new Date(msg.timestamp) > oneDayAgo);
  localStorage.setItem(BROADCAST_QUEUE_KEY, JSON.stringify(filtered));
};

// New function to queue global broadcast messages for all users (logged in and visitors)
export const queueGlobalBroadcastMessage = (message: string): void => {
  const globalQueue = JSON.parse(localStorage.getItem('globalBroadcastQueue') || '[]');
  globalQueue.push({
    message,
    timestamp: new Date().toISOString(),
    id: `global_broadcast_${Date.now()}`,
    isGlobal: true
  });
  localStorage.setItem('globalBroadcastQueue', JSON.stringify(globalQueue));
  
  // Trigger global update event
  window.dispatchEvent(new CustomEvent('globalBroadcastUpdate'));
};

// Function to clear old global broadcast messages
export const clearOldGlobalBroadcastMessages = (): void => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  
  const queue = JSON.parse(localStorage.getItem('globalBroadcastQueue') || '[]');
  const filtered = queue.filter((msg: any) => new Date(msg.timestamp) > oneDayAgo);
  localStorage.setItem('globalBroadcastQueue', JSON.stringify(filtered));
};
