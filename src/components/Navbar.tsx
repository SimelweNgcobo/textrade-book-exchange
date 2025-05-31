
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Menu, X, User, Settings, LogOut, Shield, Bell, ShoppingCart, Plus } from 'lucide-react';
import CartButton from '@/components/CartButton';
import { useBroadcastMessages } from '@/hooks/useBroadcastMessages';
import BroadcastPopup from '@/components/BroadcastPopup';

const Navbar = () => {
  const { user, profile, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const { 
    currentMessage, 
    showPopup, 
    isLoading, 
    handleClosePopup 
  } = useBroadcastMessages();

  useEffect(() => {
    if (user?.id) {
      fetchUnreadNotifications();
    }
  }, [user?.id]);

  const fetchUnreadNotifications = async () => {
    if (!user?.id) return;

    try {
      const { count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('read', false);

      setUnreadCount(count || 0);
    } catch (error) {
      console.error('Error fetching unread notifications:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-xl text-gray-800 hidden sm:block">ReBooked Solutions</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/books" className="text-gray-700 hover:text-green-600 transition-colors">
                Browse Books
              </Link>
              {isAuthenticated && (
                <Button 
                  onClick={() => navigate('/create-listing')} 
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Sell Book
                </Button>
              )}
              <Button
                onClick={() => navigate('/notifications')}
                variant="ghost"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {unreadCount}
                  </span>
                )}
                <span className="ml-2 hidden lg:inline">Notifications</span>
              </Button>
              <CartButton />
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Mobile Cart Button */}
              <div className="md:hidden">
                <CartButton />
              </div>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline">Profile</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{profile?.name || 'User'}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/notifications')} className="relative">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                      {unreadCount > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                          {unreadCount}
                        </span>
                      )}
                    </DropdownMenuItem>
                    {profile?.is_admin && (
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/register')} className="bg-green-600 hover:bg-green-700">
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-3">
                <Link to="/books" className="text-gray-700 hover:text-green-600 px-2 py-1" onClick={closeMenu}>
                  Browse Books
                </Link>
                {isAuthenticated && (
                  <Button 
                    onClick={() => { navigate('/create-listing'); closeMenu(); }}
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 mx-2 flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Sell Book
                  </Button>
                )}
                <Button
                  onClick={() => { navigate('/notifications'); closeMenu(); }}
                  variant="ghost"
                  className="mx-2 flex items-center justify-center relative"
                >
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {unreadCount}
                    </span>
                  )}
                </Button>
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                    <Button variant="ghost" onClick={() => { navigate('/login'); closeMenu(); }}>
                      Sign In
                    </Button>
                    <Button onClick={() => { navigate('/register'); closeMenu(); }} className="bg-green-600 hover:bg-green-700">
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Broadcast Popup */}
      {currentMessage && (
        <BroadcastPopup
          message={currentMessage}
          isOpen={showPopup}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default Navbar;
