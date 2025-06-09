import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  BookOpen,
  ArrowLeft,
  Calculator,
  DollarSign,
  Users,
  Search,
} from "lucide-react";

interface CampusLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
}

const CampusLayout = ({
  children,
  showBackButton = false,
}: CampusLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Campus Header */}
      <header className="bg-white shadow-lg border-b border-book-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Campus Brand */}
            <div className="flex items-center gap-4">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="text-gray-600 hover:text-book-600"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Marketplace
                </Button>
              )}

              <Link to="/university-info" className="flex items-center gap-3">
                <div className="p-2 bg-book-600 rounded-xl">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-book-800">
                    ReBooked Campus
                  </h1>
                  <p className="text-sm text-gray-600">
                    Your University Journey Starts Here
                  </p>
                </div>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/books">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-book-600 border-book-200 hover:bg-book-50"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse All Books
                </Button>
              </Link>
              <Link to="/create-listing">
                <Button
                  size="sm"
                  className="bg-book-600 hover:bg-book-700 text-white"
                >
                  Sell Books
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Campus Footer */}
      <footer className="bg-book-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="font-bold text-lg">ReBooked Campus</span>
              </div>
              <p className="text-book-200 text-sm">
                Empowering South African students with comprehensive university
                information, APS calculations, bursary opportunities, and
                affordable textbooks.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link
                  to="/university-info"
                  className="block text-book-200 hover:text-white transition-colors"
                >
                  University Explorer
                </Link>
                <Link
                  to="/university-info#aps-calculator"
                  className="block text-book-200 hover:text-white transition-colors"
                >
                  APS Calculator
                </Link>
                <Link
                  to="/university-info#bursaries"
                  className="block text-book-200 hover:text-white transition-colors"
                >
                  Find Bursaries
                </Link>
                <Link
                  to="/books"
                  className="block text-book-200 hover:text-white transition-colors"
                >
                  Browse Textbooks
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2 text-sm">
                <a
                  href="#"
                  className="block text-book-200 hover:text-white transition-colors"
                >
                  University Application Guide
                </a>
                <a
                  href="#"
                  className="block text-book-200 hover:text-white transition-colors"
                >
                  Bursary Application Tips
                </a>
                <a
                  href="#"
                  className="block text-book-200 hover:text-white transition-colors"
                >
                  Study Tips & Resources
                </a>
                <Link
                  to="/contact"
                  className="block text-book-200 hover:text-white transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-book-700 mt-8 pt-8 text-center text-book-200 text-sm">
            <p>
              &copy; 2024 ReBooked Solutions. Empowering student success across
              South Africa.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CampusLayout;
