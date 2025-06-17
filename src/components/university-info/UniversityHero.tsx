
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, GraduationCap } from "lucide-react";

interface UniversityHeroProps {
  onSearch?: (query: string) => void;
}

const UniversityHero = ({ onSearch }: UniversityHeroProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
      <div className="container mx-auto text-center">
        <GraduationCap className="h-16 w-16 mx-auto mb-6" />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find Your Perfect University
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Explore South African universities, compare programs, and make informed decisions about your future.
        </p>
        
        {onSearch && (
          <div className="max-w-md mx-auto flex gap-2">
            <Input
              placeholder="Search universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-black"
            />
            <Button onClick={handleSearch} variant="secondary">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityHero;
