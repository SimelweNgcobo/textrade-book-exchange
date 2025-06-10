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
        onSearch(searchQuery);
      } else {
        navigate(
          `/university-info?tool=home&search=${encodeURIComponent(searchQuery)}`,
        );
      }
    }
  };

  const handleToolNavigation = (tool: string) => {
    if (onNavigateToTool) {
      onNavigateToTool(tool);
    } else {
      navigate(`/university-info?tool=${tool}`);
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
    <section className="relative bg-gradient-to-br from-book-50 to-white py-20 overflow-hidden">
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
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-book-100 rounded-full text-book-700 text-sm font-medium">
            <Star className="h-4 w-4" />
            South Africa's Complete University Guide
          </div>

          {/* Main Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              <span className="text-book-600">Discover Your</span>
              <br />
              <span className="text-gray-900">University Journey</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore comprehensive information about all South African
              universities, calculate your APS, find bursaries, and connect with
              students selling textbooks. Your complete guide to higher
              education success.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search universities, programs, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-book-200 rounded-2xl focus:border-book-400 focus:ring-4 focus:ring-book-100 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-book-600 hover:bg-book-700 text-white px-6 py-2 rounded-xl"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Quick Stats */}
          <UniversityStats
            totalUniversities={SOUTH_AFRICAN_UNIVERSITIES.length}
            className="mb-12"
          />

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card
                  key={index}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/80 backdrop-blur-sm border-white/20"
                  onClick={() => handleToolNavigation(action.tool)}
                >
                  <div className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${action.color} ${action.hoverColor} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-book-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {action.description}
                    </p>
                    <div className="flex items-center justify-center text-book-600 font-medium group-hover:text-book-700 transition-colors">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
