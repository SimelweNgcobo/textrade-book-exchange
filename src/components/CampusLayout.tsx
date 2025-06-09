import { ReactNode } from "react";

interface CampusLayoutProps {
  children: ReactNode;
}

const CampusLayout = ({ children }: CampusLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean, minimal header - optional, can be removed for full focus */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <a href="/" className="hover:text-gray-900 transition-colors">
                ← Back to ReBooked Solutions
              </a>
            </div>
            <div className="text-xs text-gray-400">
              Explore • Compare • Choose
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default CampusLayout;
