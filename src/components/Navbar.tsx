import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  GraduationCap,
} from "lucide-react";
import AdminAccess from "./AdminAccess";
import CartButton from "./CartButton";
import NotificationBadge from "./NotificationBadge";
import { toast } from "sonner";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center min-w-0">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-book-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-book-600 truncate">
                <span className="hidden sm:inline">ReBooked Solutions</span>
                <span className="sm:hidden">ReBooked Solutions</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link
              to="/books"
              className={`text-sm font-medium transition-colors hover:text-book-600 ${
                isActive("/books") ? "text-book-600" : "text-gray-700"
              }`}
            >
              <span className="hidden lg:inline">Browse Books</span>
              <span className="lg:hidden">Books</span>
            </Link>

            <Link
              to="/university-info"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-book-600 ${
                location.pathname.startsWith("/university")
                  ? "text-book-600"
                  : "text-gray-700"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Campus</span>
            </Link>

            <Link
              to="/shipping"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-book-600 ${
                isActive("/shipping") ? "text-book-600" : "text-gray-700"
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Shipping</span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {isAuthenticated ? (
              <>
                <CartButton />
                <Link
                  to="/notifications"
                  className="relative p-2 text-gray-600 hover:text-book-600 transition-colors"
                  title="View notifications"
                >
                  <NotificationBadge
                    allowRetry={true}
                    showErrorIndicator={true}
                  />
                </Link>

                <Link to="/create-listing">
                  <Button className="bg-book-600 hover:bg-book-700 text-white px-3 lg:px-4 h-10 text-sm">
                    <Plus className="w-4 h-4" />
                    <span className="ml-1 lg:ml-2 hidden lg:inline">
                      Sell Book
                    </span>
                    <span className="ml-1 lg:hidden">Sell</span>
                  </Button>
                </Link>

                <div className="flex items-center space-x-1 lg:space-x-2">
                  <Link to="/profile">
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-book-600 px-2 lg:px-3 h-10 text-sm"
                    >
                      <User className="w-4 h-4" />
                      <span className="ml-1 lg:ml-2 hidden lg:inline">
                        Profile
                      </span>
                    </Button>
                  </Link>

                  <AdminAccess />

                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 px-2 lg:px-3 h-10 min-w-[44px]"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-book-600 px-4 h-10"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-book-600 hover:bg-book-700 text-white px-4 h-10">
                    <UserPlus className="w-4 h-4" />
                    <span className="ml-2">Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3">
            <div className="space-y-1">
              <Link
                to="/books"
                className={`block px-4 py-3 text-base font-medium rounded-md transition-colors min-h-[44px] flex items-center ${
                  isActive("/books")
                    ? "bg-book-50 text-book-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-book-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Books
              </Link>

              <Link
                to="/university-info"
                className={`flex items-center space-x-3 px-4 py-3 text-base font-medium rounded-md transition-colors min-h-[44px] ${
                  location.pathname.startsWith("/university")
                    ? "bg-book-50 text-book-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-book-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Campus</span>
              </Link>

              <Link
                to="/shipping"
                className={`flex items-center space-x-3 px-4 py-3 text-base font-medium rounded-md transition-colors min-h-[44px] ${
                  isActive("/shipping")
                    ? "bg-book-50 text-book-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-book-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Truck className="w-5 h-5" />
                <span>Shipping</span>
              </Link>

              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <Link
                      to="/create-listing"
                      className="flex items-center px-4 py-3 text-base font-medium text-white bg-book-600 rounded-md min-h-[44px]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Sell Book
                    </Link>
                  </div>

                  <Link
                    to="/notifications"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-book-600 rounded-md min-h-[44px]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <NotificationBadge
                      className="mr-3"
                      iconSize="w-5 h-5"
                      allowRetry={true}
                      showErrorIndicator={true}
                    />
                    <span>Notifications</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-book-600 rounded-md min-h-[44px]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md min-h-[44px]"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="border-t border-gray-100 pt-3 mt-3 space-y-2">
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-book-600 rounded-md min-h-[44px]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center px-4 py-3 text-base font-medium text-white bg-book-600 rounded-md min-h-[44px]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
