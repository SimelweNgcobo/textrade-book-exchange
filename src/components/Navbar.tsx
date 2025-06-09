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
  GraduationCap,
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
    <nav
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        boxShadow:
          "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
        position: "sticky",
        top: "0px",
        zIndex: "50",
      }}
    >
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1280px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: "64px",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link to="/" style={{
            alignItems: "center",
            cursor: "pointer",
            display: "flex",
            textDecoration: "none",
          }}>
            <div
              style={{
                alignItems: "center",
                backgroundColor: "rgb(21, 115, 71)",
                borderRadius: "12px",
                cursor: "pointer",
                display: "flex",
                height: "32px",
                justifyContent: "center",
                width: "32px",
              }}
            >
              <span
                style={{
                  color: "rgb(255, 255, 255)",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "700",
                  lineHeight: "28px",
                }}
              >
                R
              </span>
            </div>
            <span
              style={{
                color: "rgb(21, 115, 71)",
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "700",
                lineHeight: "28px",
                marginLeft: "8px",
              }}
            >
              ReBooked Solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: window.innerWidth >= 768 ? "block" : "none" }}>
            <div
              style={{
                alignItems: "baseline",
                display: "flex",
                marginLeft: "40px",
              }}
            >
              <Link
                to="/books"
                style={{
                  borderRadius: "10px",
                  color: "rgb(55, 65, 81)",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "20px",
                  paddingBottom: "8px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  paddingTop: "8px",
                  textDecoration: "none",
                  transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "rgb(21, 115, 71)";
                  e.target.style.backgroundColor = "rgb(230, 244, 234)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "rgb(55, 65, 81)";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Browse Books
              </Link>
              <Link
                to="/university-info"
                style={{
                  borderRadius: "10px",
                  color: "rgb(55, 65, 81)",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "20px",
                  marginLeft: "16px",
                  paddingBottom: "8px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  paddingTop: "8px",
                  textDecoration: "none",
                  transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "rgb(21, 115, 71)";
                  e.target.style.backgroundColor = "rgb(230, 244, 234)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "rgb(55, 65, 81)";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                <GraduationCap style={{ height: "16px", width: "16px", marginRight: "4px" }} />
                ReBooked Campus
              </Link>
              <Link
                to="/shipping"
                style={{
                  borderRadius: "10px",
                  color: "rgb(55, 65, 81)",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "20px",
                  marginLeft: "16px",
                  paddingBottom: "8px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  paddingTop: "8px",
                  textDecoration: "none",
                  transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "rgb(21, 115, 71)";
                  e.target.style.backgroundColor = "rgb(230, 244, 234)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "rgb(55, 65, 81)";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                <Truck style={{ height: "16px", width: "16px", marginRight: "4px" }} />
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
                to="/university-info"
                className="flex items-center text-gray-700 hover:text-book-600 px-3 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <GraduationCap className="h-4 w-4 mr-1" />
                ReBooked Campus
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