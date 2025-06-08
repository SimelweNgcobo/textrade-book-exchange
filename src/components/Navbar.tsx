import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Menu,
  X,
  Plus,
  User,
  LogOut,
  UserPlus,
  Truck,
} from "lucide-react";
import AdminAccess from "./AdminAccess";
import CartButton from "./CartButton";
import NotificationBadge from "./NotificationBadge";
import { toast } from "sonner";
import { addNotification } from "@/services/notificationService";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const userEmail = user?.email;
      await logout();
      toast.success(`Successfully logged out. Goodbye!`);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-book-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-book-600">
            <BookOpen className="h-8 w-8" />
            <span className="text-xl font-bold">ReBooked Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/books"
              className="text-gray-700 hover:text-book-600 px-3 py-2 transition-colors"
            >
              Browse Books
            </Link>
            <Link
              to="/shipping"
              className="text-gray-700 hover:text-book-600 px-3 py-2 transition-colors flex items-center"
            >
              <Truck className="h-4 w-4 mr-1" />
              Shipping
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/create-listing"
                  className="flex items-center text-gray-700 hover:text-book-600 px-3 py-2 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Sell Book
                </Link>
                <Link
                  to="/notifications"
                  className="flex items-center text-gray-700 hover:text-book-600 px-3 py-2 transition-colors"
                >
                  <NotificationBadge iconSize="h-4 w-4" className="mr-1" />
                  Notifications
                </Link>
                <CartButton />
                <Link
                  to="/profile"
                  className="flex items-center text-gray-700 hover:text-book-600 px-3 py-2 transition-colors"
                >
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </Link>
                <AdminAccess />
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="flex items-center text-gray-700 hover:text-book-600"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-book-600">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-book-600 hover:bg-book-700 text-white">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-700"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-book-200">
            <div className="flex flex-col space-y-2">
              <Link
                to="/books"
                className="text-gray-700 hover:text-book-600 px-3 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Books
              </Link>
              <Link
                to="/shipping"
                className="flex items-center text-gray-700 hover:text-book-600 px-3 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Truck className="h-4 w-4 mr-1" />
                Shipping
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/create-listing"
                    className="flex items-center text-gray-700 hover:text-book-600 px-3 py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Sell Book
                  </Link>
                  <Link
                    to="/notifications"
                    className="flex items-center text-gray-700 hover:text-book-600 px-3 py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <NotificationBadge iconSize="h-4 w-4" className="mr-1" />
                    Notifications
                  </Link>
                  <div className="px-3 py-2">
                    <CartButton />
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center text-gray-700 hover:text-book-600 px-3 py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-1" />
                    Profile
                  </Link>
                  <div className="px-3 py-2">
                    <AdminAccess />
                  </div>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="justify-start text-gray-700 hover:text-book-600 w-full"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-book-600 px-3 py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center text-gray-700 hover:text-book-600 px-3 py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
