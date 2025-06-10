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
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-book-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-book-600">
                ReBooked Solutions
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/books"
              className={`text-sm font-medium transition-colors hover:text-book-600 ${
                isActive("/books") ? "text-book-600" : "text-gray-700"
              }`}
            >
              Browse Books
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
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <CartButton />
                <Link
                  to="/notifications"
                  className="relative p-2 text-gray-600 hover:text-book-600 transition-colors"
                  title="View notifications"
                >
                  <NotificationBadge />
                </Link>

                <Link to="/create-listing">
                  <Button
                    size="sm"
                    className="bg-book-600 hover:bg-book-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Sell Book
                  </Button>
                </Link>

                <div className="flex items-center space-x-2">
                  <Link to="/profile">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 hover:text-book-600"
                    >
                      <User className="w-4 h-4 mr-1" />
                      Profile
                    </Button>
                  </Link>

                  <AdminAccess />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600"
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
                    size="sm"
                    className="text-gray-700 hover:text-book-600"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-book-600 hover:bg-book-700 text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="space-y-3">
              <Link
                to="/books"
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
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
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname.startsWith("/university")
                    ? "bg-book-50 text-book-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-book-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Campus</span>
              </Link>

              <Link
                to="/shipping"
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive("/shipping")
                    ? "bg-book-50 text-book-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-book-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Truck className="w-4 h-4" />
                <span>Shipping</span>
              </Link>

              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <Link
                      to="/create-listing"
                      className="block px-3 py-2 text-sm font-medium text-white bg-book-600 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Plus className="w-4 h-4 mr-1 inline" />
                      Sell Book
                    </Link>
                  </div>

                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-book-600 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-1 inline" />
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md"
                  >
                    <LogOut className="w-4 h-4 mr-1 inline" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="border-t border-gray-100 pt-3 mt-3 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-book-600 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-sm font-medium text-white bg-book-600 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="w-4 h-4 mr-1 inline" />
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
