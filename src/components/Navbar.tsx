import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Book, User, LogIn, Search, Bell, Flag, AlertTriangle, Shield, Mail } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import AdminAccess from './AdminAccess';

const Navbar = () => {
  const { profile, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Mock notifications for demo purposes
    if (isAuthenticated) {
      // In a real app, you'd fetch these from the database
      const mockNotifications = [
        { id: 1, type: 'message', message: 'You have a new message', read: false },
        { id: 2, type: 'wishlist', message: 'A book on your wishlist is now available', read: false },
        { id: 3, type: 'delivery', message: 'Your book has been marked as delivered', read: true },
      ];
      
      setNotifications(mockNotifications);
      setNotificationCount(mockNotifications.filter(n => !n.read).length);
    }
  }, [isAuthenticated]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setNotificationCount(0);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Book className="h-8 w-8 text-book-600" />
              <span className="ml-2 text-xl font-bold text-book-800">Rebooked</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search books..."
                className="py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-book-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
            <Link to="/books" className="text-gray-700 hover:text-book-600">Browse Books</Link>
            <Link to="/contact" className="text-gray-700 hover:text-book-600 flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/create-listing" className="text-gray-700 hover:text-book-600">Sell a Book</Link>
                
                {/* Notifications Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative">
                      <Bell className="h-5 w-5" />
                      {notificationCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs" variant="destructive">
                          {notificationCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuLabel className="flex justify-between items-center">
                      <span>Notifications</span>
                      {notificationCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={markAllNotificationsAsRead} 
                          className="text-xs text-book-600 hover:text-book-800 px-2 py-1 h-auto"
                        >
                          Mark all as read
                        </Button>
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <DropdownMenuItem key={notification.id} className={`${notification.read ? 'opacity-70' : 'font-medium'}`}>
                          <div className="flex items-start space-x-2">
                            {notification.type === 'message' && <Bell className="h-4 w-4 mt-0.5 text-book-600" />}
                            {notification.type === 'wishlist' && <Book className="h-4 w-4 mt-0.5 text-green-600" />}
                            {notification.type === 'delivery' && <Shield className="h-4 w-4 mt-0.5 text-purple-600" />}
                            <span className="text-sm">{notification.message}</span>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem className="text-sm text-center">No notifications</DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/notifications" className="w-full text-center text-sm text-book-600 hover:text-book-800 cursor-pointer">
                        View all notifications
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Profile Menu */}
                <div className="relative group">
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2"
                    onClick={() => navigate('/profile')}
                  >
                    <User className="h-5 w-5" />
                    <div className="flex items-center">
                      <span>{profile?.name || 'User'}</span>
                      {profile?.isVerified && (
                        <span className="ml-1">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
                            Verified
                          </Badge>
                        </span>
                      )}
                    </div>
                  </Button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-book-100">My Profile</Link>
                    <Link to="/activity" className="block px-4 py-2 text-sm text-gray-700 hover:bg-book-100">Activity History</Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-book-100">My Wishlist</Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => logout()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-book-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                {/* Report Button */}
                <Link to="/report">
                  <Button variant="ghost" className="text-red-600 hover:text-red-800">
                    <Flag className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => navigate('/login')}>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
                <Button onClick={() => navigate('/register')}>Register</Button>
              </div>
            )}
            
            {/* Admin Access Button - Always visible */}
            <AdminAccess />
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-book-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearch} className="relative mb-3">
              <input
                type="text"
                placeholder="Search books..."
                className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-book-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
            <Link
              to="/books"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-book-500"
              onClick={() => setIsOpen(false)}
            >
              Browse Books
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-book-500"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/create-listing"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-book-500"
                  onClick={() => setIsOpen(false)}
                >
                  Sell a Book
                </Link>
                <Link
                  to="/notifications"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-book-500"
                  onClick={() => setIsOpen(false)}
                >
                  Notifications {notificationCount > 0 && `(${notificationCount})`}
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-book-500"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/activity"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-book-500"
                  onClick={() => setIsOpen(false)}
                >
                  Activity History
                </Link>
                <Link
                  to="/wishlist"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-book-100"
                  onClick={() => setIsOpen(false)}
                >
                  My Wishlist
                </Link>
                <Link
                  to="/report"
                  className="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-white hover:bg-red-500"
                  onClick={() => setIsOpen(false)}
                >
                  Report an Issue
                </Link>
                <AdminAccess />
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-book-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-book-500"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-book-500"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Safety Warning for Mobile Devices */}
      {isAuthenticated && (
        <div className="bg-amber-50 p-2 text-xs text-amber-800 text-center border-t border-amber-100 md:hidden">
          <AlertTriangle className="inline-block h-3 w-3 mr-1" />
          Only meet in public places for book exchanges
        </div>
      )}
    </nav>
  );
};

export default Navbar;
