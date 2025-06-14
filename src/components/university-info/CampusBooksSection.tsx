import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, ExternalLink, Plus } from "lucide-react";
import { SOUTH_AFRICAN_UNIVERSITIES_SIMPLE } from "@/constants/universities";

interface CampusBooksSectionProps {
  selectedUniversity?: string;
  selectedDegree?: string;
}

const CampusBooksSection = ({
  selectedUniversity,
  selectedDegree,
}: CampusBooksSectionProps) => {
  const navigate = useNavigate();
  const [university, setUniversity] = useState(selectedUniversity || "");
  const [degree, setDegree] = useState(selectedDegree || "");

  useEffect(() => {
    if (selectedUniversity) {
      setUniversity(selectedUniversity);
    }
    if (selectedDegree) {
      setDegree(selectedDegree);
    }
  }, [selectedUniversity, selectedDegree]);

  const handleViewBooks = () => {
    const params = new URLSearchParams();
    if (university) params.set("university", university);
    if (degree) params.set("degree", degree);
    navigate(`/books?${params.toString()}`);
  };

  const handleSellBooks = () => {
    navigate("/create-listing");
  };

  return (
    <Card className="border-book-200 bg-gradient-to-br from-book-50 to-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2 text-book-800">
          <BookOpen className="h-5 w-5 text-book-600" />
          Campus Books
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Find and sell textbooks from students at your university. Save money
          and help fellow students by trading books directly.
        </p>

        <div className="space-y-3 mb-4">
          <div>
            <Select
              value={university}
              onValueChange={setUniversity}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your university" />
              </SelectTrigger>
              <SelectContent>
                {SOUTH_AFRICAN_UNIVERSITIES_SIMPLE.map((uni) => (
                  <SelectItem key={uni.id} value={uni.id}>
                    {uni.abbreviation} - {uni.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={degree}
              onValueChange={setDegree}
              disabled={!university}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your degree (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bcom">BCom - Commerce</SelectItem>
                <SelectItem value="bsc">BSc - Science</SelectItem>
                <SelectItem value="ba">BA - Arts</SelectItem>
                <SelectItem value="llb">LLB - Law</SelectItem>
                <SelectItem value="mbchb">MBChB - Medicine</SelectItem>
                <SelectItem value="beng">BEng - Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={handleViewBooks}
            className="bg-book-600 hover:bg-book-700 flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Browse Books
          </Button>
          <Button
            onClick={handleSellBooks}
            variant="outline"
            className="border-book-200 text-book-700 hover:bg-book-50 flex-1"
          >
            <Plus className="h-4 w-4 mr-2" />
            Sell Your Books
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-book-50 text-book-700 border-book-200">
            Save up to 70%
          </Badge>
          <Badge variant="outline" className="bg-book-50 text-book-700 border-book-200">
            Student to Student
          </Badge>
          <Badge variant="outline" className="bg-book-50 text-book-700 border-book-200">
            All Subjects
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampusBooksSection;
