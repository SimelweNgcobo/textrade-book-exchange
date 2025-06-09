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
import { addNotification } from "@/services/notificationService";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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

  const isActive = (path: string) => {
    return location.pathname === path;
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
          <div
            style={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Link
              to="/"
              style={{
                alignItems: "center",
                cursor: "pointer",
                display: "flex",
                textDecoration: "none",
              }}
            >
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
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
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
                  color: isActive("/books")
                    ? "rgb(21, 115, 71)"
                    : "rgb(55, 65, 81)",
                  backgroundColor: isActive("/books")
                    ? "rgb(230, 244, 234)"
                    : "transparent",
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
              >
                Browse Books
              </Link>
              <Link
                to="/university-info"
                style={{
                  borderRadius: "10px",
                  color: isActive("/university-info")
                    ? "rgb(21, 115, 71)"
                    : "rgb(55, 65, 81)",
                  backgroundColor: isActive("/university-info")
                    ? "rgb(230, 244, 234)"
                    : "transparent",
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
              >
                <GraduationCap
                  style={{ height: "16px", width: "16px", marginRight: "4px" }}
                />
                ReBooked Campus
              </Link>
              <Link
                to="/shipping"
                style={{
                  borderRadius: "10px",
                  color: isActive("/shipping")
                    ? "rgb(21, 115, 71)"
                    : "rgb(55, 65, 81)",
                  backgroundColor: isActive("/shipping")
                    ? "rgb(230, 244, 234)"
                    : "transparent",
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
              >
                <Truck
                  style={{ height: "16px", width: "16px", marginRight: "4px" }}
                />
                Shipping
              </Link>

              {isAuthenticated ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "24px",
                    gap: "8px",
                  }}
                >
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
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "24px",
                    gap: "8px",
                  }}
                >
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
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              style={{
                alignItems: "center",
                borderRadius: "10px",
                color: "rgb(55, 65, 81)",
                cursor: "pointer",
                display: "inline-flex",
                fontSize: "14px",
                fontWeight: "500",
                gap: "8px",
                height: "36px",
                justifyContent: "center",
                paddingLeft: "12px",
                paddingRight: "12px",
                backgroundColor: "transparent",
                border: "none",
                transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {isMenuOpen ? (
                <X style={{ height: "16px", width: "16px" }} />
              ) : (
                <Menu style={{ height: "16px", width: "16px" }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            style={{
              paddingBottom: "16px",
              paddingTop: "8px",
              borderTop: "1px solid rgb(243, 244, 246)",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Link
                to="/books"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  borderRadius: "10px",
                  color: isActive("/books")
                    ? "rgb(21, 115, 71)"
                    : "rgb(55, 65, 81)",
                  backgroundColor: isActive("/books")
                    ? "rgb(230, 244, 234)"
                    : "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "20px",
                  paddingBottom: "8px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  paddingTop: "8px",
                  textDecoration: "none",
                  textAlign: "left",
                  width: "100%",
                  display: "block",
                }}
              >
                Browse Books
              </Link>
              <Link
                to="/university-info"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  borderRadius: "10px",
                  color: isActive("/university-info")
                    ? "rgb(21, 115, 71)"
                    : "rgb(55, 65, 81)",
                  backgroundColor: isActive("/university-info")
                    ? "rgb(230, 244, 234)"
                    : "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "20px",
                  paddingBottom: "8px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  paddingTop: "8px",
                  textDecoration: "none",
                  textAlign: "left",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <GraduationCap
                  style={{ height: "16px", width: "16px", marginRight: "4px" }}
                />
                ReBooked Campus
              </Link>
              <Link
                to="/shipping"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  borderRadius: "10px",
                  color: isActive("/shipping")
                    ? "rgb(21, 115, 71)"
                    : "rgb(55, 65, 81)",
                  backgroundColor: isActive("/shipping")
                    ? "rgb(230, 244, 234)"
                    : "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "20px",
                  paddingBottom: "8px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  paddingTop: "8px",
                  textDecoration: "none",
                  textAlign: "left",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Truck
                  style={{ height: "16px", width: "16px", marginRight: "4px" }}
                />
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
