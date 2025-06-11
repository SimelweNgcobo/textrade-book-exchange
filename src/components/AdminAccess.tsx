import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminAccess = () => {
  const { profile, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Only show the Admin Access button if user is authenticated and is an admin
  if (!isAuthenticated || !isAdmin) {
    return null; // Don't render anything for non-admin users
  }

  const handleAdminAccess = () => {
    // Direct access to admin page for authenticated admin users
    navigate("/admin");
  };

  return (
    <Button
      onClick={handleAdminAccess}
      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 font-medium"
    >
      <Shield className="mr-2 h-4 w-4" />
      <span className="hidden sm:inline">Admin Dashboard</span>
      <span className="sm:hidden">Admin</span>
    </Button>
  );
};

export default AdminAccess;
