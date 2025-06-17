
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface UniversityHeroProps {
  onSearch?: (query: string) => void;
}

const UniversityHero: React.FC<UniversityHeroProps> = ({ onSearch }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-4">South African Universities</h1>
          <p className="text-xl opacity-90">
            Discover your perfect university and degree program
          </p>
        </div>
        
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search universities or programs..."
            className="pl-10 bg-white text-black"
            onChange={handleSearch}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversityHero;
