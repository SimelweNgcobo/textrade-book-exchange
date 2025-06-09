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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Campus Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Campus Brand */}
            <div className="flex items-center gap-4">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Marketplace
                </Button>
              )}

              <Link to="/university-info" className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
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
                  className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse All Books
                </Button>
              </Link>
              <Link to="/create-listing">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  Sell Books
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Campus Navigation Pills */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-indigo-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <NavPill
              href="#universities"
              icon={<Users className="h-4 w-4" />}
              label="Universities"
            />
            <NavPill
              href="#aps-calculator"
              icon={<Calculator className="h-4 w-4" />}
              label="APS Calculator"
            />
            <NavPill
              href="#degrees"
              icon={<GraduationCap className="h-4 w-4" />}
              label="Degree Finder"
            />
            <NavPill
              href="#bursaries"
              icon={<DollarSign className="h-4 w-4" />}
              label="Bursaries"
            />
            <NavPill
              href="#campus-books"
              icon={<BookOpen className="h-4 w-4" />}
              label="Campus Books"
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Campus Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="font-bold text-lg">ReBooked Campus</span>
              </div>
              <p className="text-indigo-200 text-sm">
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
                  className="block text-indigo-200 hover:text-white transition-colors"
                >
                  University Explorer
                </Link>
                <Link
                  to="/university-info#aps-calculator"
                  className="block text-indigo-200 hover:text-white transition-colors"
                >
                  APS Calculator
                </Link>
                <Link
                  to="/university-info#bursaries"
                  className="block text-indigo-200 hover:text-white transition-colors"
                >
                  Find Bursaries
                </Link>
                <Link
                  to="/books"
                  className="block text-indigo-200 hover:text-white transition-colors"
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
                  className="block text-indigo-200 hover:text-white transition-colors"
                >
                  University Application Guide
                </a>
                <a
                  href="#"
                  className="block text-indigo-200 hover:text-white transition-colors"
                >
                  Bursary Application Tips
                </a>
                <a
                  href="#"
                  className="block text-indigo-200 hover:text-white transition-colors"
                >
                  Study Tips & Resources
                </a>
                <Link
                  to="/contact"
                  className="block text-indigo-200 hover:text-white transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-indigo-200 text-sm">
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

const NavPill = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) => (
  <a
    href={href}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 hover:bg-white/80 text-gray-700 hover:text-indigo-600 transition-all duration-200 text-sm font-medium whitespace-nowrap border border-transparent hover:border-indigo-200"
  >
    {icon}
    {label}
  </a>
);

export default CampusLayout;
