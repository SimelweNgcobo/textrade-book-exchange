
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users } from "lucide-react";
import { University } from "@/types/university";

export interface PopularUniversitiesProps {
  onUniversitySelect?: (university: University) => void;
  showViewAll?: boolean;
}

const PopularUniversities: React.FC<PopularUniversitiesProps> = ({ 
  onUniversitySelect,
  showViewAll = true 
}) => {
  // Mock popular universities data
  const popularUniversities: Partial<University>[] = [
    {
      id: "uct",
      name: "University of Cape Town",
      abbreviation: "UCT",
      location: "Cape Town",
      province: "Western Cape",
      logo: "/placeholder.svg",
      establishedYear: 1829,
      studentPopulation: 28000,
    },
    {
      id: "wits",
      name: "University of the Witwatersrand",
      abbreviation: "Wits",
      location: "Johannesburg", 
      province: "Gauteng",
      logo: "/placeholder.svg",
      establishedYear: 1922,
      studentPopulation: 40000,
    },
    {
      id: "sun",
      name: "Stellenbosch University",
      abbreviation: "SUN",
      location: "Stellenbosch",
      province: "Western Cape", 
      logo: "/placeholder.svg",
      establishedYear: 1918,
      studentPopulation: 32000,
    }
  ];

  const handleUniversityClick = (university: Partial<University>) => {
    if (onUniversitySelect && university.id) {
      onUniversitySelect(university as University);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Popular Universities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {popularUniversities.map((university) => (
            <div
              key={university.id}
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => handleUniversityClick(university)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{university.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {university.location}, {university.province}
                  </p>
                </div>
                <Badge variant="secondary">{university.abbreviation}</Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Est. {university.establishedYear}</span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {university.studentPopulation?.toLocaleString()} students
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {showViewAll && (
          <Button variant="outline" className="w-full mt-4">
            View All Universities
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PopularUniversities;
