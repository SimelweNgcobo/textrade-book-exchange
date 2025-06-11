import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface StudyFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  onClearFilters: () => void;
  categories: string[];
  hasActiveFilters: boolean;
}

const StudyFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedType,
  onTypeChange,
  onClearFilters,
  categories,
  hasActiveFilters,
}: StudyFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="ml-auto text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all-categories" value="all">
              All Categories
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all-levels" value="all">
              All Levels
            </SelectItem>
            <SelectItem key="beginner" value="Beginner">
              Beginner
            </SelectItem>
            <SelectItem key="intermediate" value="Intermediate">
              Intermediate
            </SelectItem>
            <SelectItem key="advanced" value="Advanced">
              Advanced
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all-types" value="all">
              All Types
            </SelectItem>
            <SelectItem key="video" value="video">
              Videos
            </SelectItem>
            <SelectItem key="pdf" value="pdf">
              PDFs
            </SelectItem>
            <SelectItem key="website" value="website">
              Websites
            </SelectItem>
            <SelectItem key="tool" value="tool">
              Tools
            </SelectItem>
            <SelectItem key="course" value="course">
              Courses
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Showing filtered results
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudyFilters;
