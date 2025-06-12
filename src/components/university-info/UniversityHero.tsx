import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Search,
  Book,
  Calculator,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  Star,
} from "lucide-react";
import UniversityStats from "./UniversityStats";
import { SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";

interface UniversityHeroProps {
  onSearch?: (query: string) => void;
  onNavigateToTool?: (tool: string) => void;
}

const UniversityHero = ({
  onSearch,
  onNavigateToTool,
}: UniversityHeroProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        // Use the parent component's search handler
        onSearch(searchQuery);
      } else {
        // Fallback: navigate to search page with query
        navigate(
          `/university-info?tool=search&search=${encodeURIComponent(searchQuery)}`,
        );
      }
    }
  };

  const handleToolNavigation = (tool: string) => {
    if (onNavigateToTool) {
      // Map the quick action tools to the actual tab names
      const toolMap: Record<string, string> = {
        aps: "aps-calculator",
        bursaries: "bursaries",
        books: "books",
      };
      onNavigateToTool(toolMap[tool] || tool);
    } else {
      // Fallback navigation
      const toolMap: Record<string, string> = {
        aps: "aps-calculator",
        bursaries: "bursaries",
        books: "books",
      };
      navigate(`/university-info?tool=${toolMap[tool] || tool}`);
    }
  };

  const quickActions = [
    {
      icon: Calculator,
      title: "APS Calculator",
      description: "Calculate your Admission Point Score instantly",
      tool: "aps",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      icon: GraduationCap,
      title: "Find Bursaries",
      description: "Discover funding opportunities for your studies",
      tool: "bursaries",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      icon: Book,
      title: "Buy Textbooks",
      description: "Find affordable textbooks from students",
      tool: "books",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-book-50 to-white py-12 md:py-20 overflow-hidden">
      {/* Background Study Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=800&fit=crop&crop=center"
          alt="Students studying with books"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-book-50/90 to-white/90" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 md:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-book-100 rounded-full text-book-700 text-xs md:text-sm font-medium">
            <Star className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">
              South Africa's Complete University Guide
            </span>
            <span className="sm:hidden">Complete University Guide</span>
          </div>

          {/* Main Hero Content */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 px-2">
              <span className="text-book-600">Discover Your</span>
              <br />
              <span className="text-gray-900">University Journey</span>
            </h1>

            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              <span className="hidden md:inline">
                Explore comprehensive information about all South African
                universities, calculate your APS, find bursaries, and connect
                with students selling textbooks. Your complete guide to higher
                education success.
              </span>
              <span className="md:hidden">
                Find your perfect university, calculate your APS, discover
                bursaries, and buy textbooks. Your complete guide to higher
                education.
              </span>
            </p>
          </div>

          {/* Search Bar - Mobile optimized */}
          <div className="max-w-2xl mx-auto px-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search universities, programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 md:pl-12 pr-16 md:pr-20 py-3 md:py-4 text-sm md:text-lg border-2 border-book-200 rounded-xl md:rounded-2xl focus:border-book-400 focus:ring-4 focus:ring-book-100 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <Button
                type="submit"
                className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-book-600 hover:bg-book-700 text-white px-3 md:px-6 py-1.5 md:py-2 rounded-lg md:rounded-xl text-sm md:text-base"
              >
                <span className="hidden md:inline">Search</span>
                <Search className="w-4 h-4 md:hidden" />
              </Button>
            </form>
          </div>

          {/* Quick Stats */}
          <UniversityStats
            totalUniversities={SOUTH_AFRICAN_UNIVERSITIES.length}
            className="mb-8 md:mb-12"
          />

          {/* Quick Actions - Mobile responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto px-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card
                  key={index}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/80 backdrop-blur-sm border-white/20"
                  onClick={() => handleToolNavigation(action.tool)}
                >
                  <div className="p-4 md:p-6 text-center">
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 ${action.color} ${action.hoverColor} rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 transition-colors shadow-lg`}
                    >
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-book-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 px-1">
                      {action.description}
                    </p>
                    <div className="flex items-center justify-center text-book-600 font-medium group-hover:text-book-700 transition-colors text-sm md:text-base">
                      <span className="hidden md:inline">Get Started</span>
                      <span className="md:hidden">Start</span>
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversityHero;
