import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ArrowLeft,
  Calculator,
  GraduationCap,
  Search,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CampusNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/university-info" && location.pathname === "/university-info")
      return true;
    if (path.includes("aps-calculator") && location.search.includes("tool=aps"))
      return true;
    if (
      path.includes("bursaries") &&
      location.search.includes("tool=bursaries")
    )
      return true;
    if (path.includes("campus-books") && location.search.includes("tool=books"))
      return true;
    return false;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-book-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation("/university-info")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-book-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-book-600">
                ReBooked Campus
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={() => handleNavigation("/university-info")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("/university-info")
                  ? "bg-book-50 text-book-600"
                  : "text-gray-600 hover:text-book-600 hover:bg-book-50"
              }`}
            >
              <Search className="w-4 h-4 mr-2" />
              Home
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation("/university-info?tool=aps")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("aps-calculator")
                  ? "bg-book-50 text-book-600"
                  : "text-gray-600 hover:text-book-600 hover:bg-book-50"
              }`}
            >
              <Calculator className="w-4 h-4 mr-2" />
              APS Calculator
            </Button>

            <Button
              variant="ghost"
              onClick={() =>
                handleNavigation("/university-info?tool=bursaries")
              }
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("bursaries")
                  ? "bg-book-50 text-book-600"
                  : "text-gray-600 hover:text-book-600 hover:bg-book-50"
              }`}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Bursaries
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation("/university-info?tool=books")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("campus-books")
                  ? "bg-book-50 text-book-600"
                  : "text-gray-600 hover:text-book-600 hover:bg-book-50"
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Campus & Books
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation("/study-resources")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("/study-resources")
                  ? "bg-book-50 text-book-600"
                  : "text-gray-600 hover:text-book-600 hover:bg-book-50"
              }`}
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Study Tips
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation("/add-program")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("/add-program")
                  ? "bg-book-50 text-book-600"
                  : "text-gray-600 hover:text-book-600 hover:bg-book-50"
              }`}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Program
            </Button>
          </div>

          {/* Back to Marketplace Button */}
          <div className="hidden md:flex items-center">
            <Button
              onClick={() => handleNavigation("/books")}
              className="bg-book-600 hover:bg-book-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-book-600 hover:bg-book-50"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-book-200">
            <div className="py-4 space-y-2">
              <Button
                variant="ghost"
                onClick={() => handleNavigation("/university-info")}
                className={`w-full justify-start px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive("/university-info")
                    ? "bg-book-50 text-book-600"
                    : "text-gray-600"
                }`}
              >
                <Search className="w-4 h-4 mr-2" />
                Home
              </Button>

              <Button
                variant="ghost"
                onClick={() => handleNavigation("/university-info?tool=aps")}
                className={`w-full justify-start px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive("aps-calculator")
                    ? "bg-book-50 text-book-600"
                    : "text-gray-600"
                }`}
              >
                <Calculator className="w-4 h-4 mr-2" />
                APS Calculator
              </Button>

              <Button
                variant="ghost"
                onClick={() =>
                  handleNavigation("/university-info?tool=bursaries")
                }
                className={`w-full justify-start px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive("bursaries")
                    ? "bg-book-50 text-book-600"
                    : "text-gray-600"
                }`}
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Bursaries
              </Button>

              <Button
                variant="ghost"
                onClick={() => handleNavigation("/university-info?tool=books")}
                className={`w-full justify-start px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive("campus-books")
                    ? "bg-book-50 text-book-600"
                    : "text-gray-600"
                }`}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Campus & Books
              </Button>

              <div className="border-t border-book-200 pt-4 mt-4">
                <Button
                  onClick={() => handleNavigation("/books")}
                  className="w-full bg-book-600 hover:bg-book-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Marketplace
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CampusNavbar;
