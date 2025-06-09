import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Calculator,
  BookOpen,
  DollarSign,
  Users,
  TrendingUp,
  ArrowRight,
  Star,
} from "lucide-react";

import UniversityDirectory from "@/components/university-info/UniversityDirectory";
import APSCalculator from "@/components/university-info/APSCalculator";
import DegreeMatching from "@/components/university-info/DegreeMatching";
import BursaryListing from "@/components/university-info/BursaryListing";
import CampusBooks from "@/components/university-info/CampusBooks";

import { University, APSCalculation } from "@/types/university";

const UniversityInfo = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [apsCalculation, setApsCalculation] = useState<APSCalculation | null>(
    null,
  );

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university);
    setActiveTab("university-details");
  };

  const handleAPSCalculationComplete = (calculation: APSCalculation) => {
    setApsCalculation(calculation);
    setActiveTab("degree-matching");
  };

  const handleViewBooks = (universityId: string, degreeId?: string) => {
    const params = new URLSearchParams();
    params.set("university", universityId);
    if (degreeId) {
      // You could add degree-specific filtering here
      params.set("search", degreeId);
    }
    navigate(`/books?${params.toString()}`);
  };

  const handleNavigateToSection = (section: string) => {
    setActiveTab(section);
  };

  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "University Directory",
      description:
        "Explore 23+ South African universities with detailed information about programs, faculties, and admission requirements.",
      action: () => setActiveTab("university-directory"),
      count: "23+ Universities",
    },
    {
      icon: <Calculator className="h-8 w-8 text-green-600" />,
      title: "APS Calculator",
      description:
        "Calculate your Admission Point Score and discover which degree programs you qualify for based on your NSC results.",
      action: () => setActiveTab("aps-calculator"),
      count: "Instant Results",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-purple-600" />,
      title: "Bursary Portal",
      description:
        "Find financial assistance with comprehensive listings of bursaries, scholarships, and funding opportunities.",
      action: () => setActiveTab("bursaries"),
      count: "10+ Bursaries",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-600" />,
      title: "Campus Books",
      description:
        "Browse textbooks specifically from your university and connect with fellow students selling course materials.",
      action: () => setActiveTab("campus-books"),
      count: "Your Campus",
    },
  ];

  return (
    <Layout>
      <SEO
        title="ReBooked Campus - University Info & Student Resources"
        description="Your complete guide to South African universities. Calculate APS scores, explore degree programs, find bursaries, and buy textbooks from fellow students."
        keywords="South African universities, APS calculator, degree programs, university bursaries, student textbooks, UCT, Wits, Stellenbosch"
        url="https://www.rebookedsolutions.co.za/university-info"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-12 w-12 text-book-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-book-800">
              ReBooked Campus
            </h1>
          </div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your complete student hub for South African universities. Calculate
            your APS score, explore degree programs, find bursaries, and connect
            with students selling textbooks.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="text-sm">
              University Guide
            </Badge>
            <Badge variant="secondary" className="text-sm">
              APS Calculator
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Bursary Portal
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Student Marketplace
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="university-directory"
              className="text-xs sm:text-sm"
            >
              Universities
            </TabsTrigger>
            <TabsTrigger value="aps-calculator" className="text-xs sm:text-sm">
              APS Calculator
            </TabsTrigger>
            <TabsTrigger value="bursaries" className="text-xs sm:text-sm">
              Bursaries
            </TabsTrigger>
            <TabsTrigger value="campus-books" className="text-xs sm:text-sm">
              Campus Books
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={feature.action}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-semibold text-book-800 group-hover:text-book-600 transition-colors">
                          {feature.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {feature.count}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">
                      {feature.description}
                    </CardDescription>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:bg-book-50 group-hover:border-book-200"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-book-600">23+</div>
                  <div className="text-sm text-gray-600">Universities</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">100+</div>
                  <div className="text-sm text-gray-600">Degree Programs</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-600">10+</div>
                  <div className="text-sm text-gray-600">Bursary Options</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    1000+
                  </div>
                  <div className="text-sm text-gray-600">Student Books</div>
                </CardContent>
              </Card>
            </div>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center text-book-800">
                  How ReBooked Campus Works
                </CardTitle>
                <CardDescription className="text-center">
                  Your journey from high school to university success in 4
                  simple steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Calculator className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">1. Calculate APS</h3>
                    <p className="text-sm text-gray-600">
                      Enter your NSC marks to calculate your Admission Point
                      Score
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <GraduationCap className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold">2. Find Programs</h3>
                    <p className="text-sm text-gray-600">
                      Discover degree programs you qualify for at different
                      universities
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold">3. Apply for Funding</h3>
                    <p className="text-sm text-gray-600">
                      Find and apply for bursaries that match your profile
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <BookOpen className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold">4. Get Textbooks</h3>
                    <p className="text-sm text-gray-600">
                      Buy affordable textbooks from students at your university
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-book-800">
                Ready to Start Your University Journey?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of students who have used ReBooked Campus to make
                informed decisions about their education.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  onClick={() => setActiveTab("aps-calculator")}
                  className="bg-book-600 hover:bg-book-700"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate Your APS
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setActiveTab("university-directory")}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Explore Universities
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* University Directory Tab */}
          <TabsContent value="university-directory">
            <UniversityDirectory
              onUniversitySelect={handleUniversitySelect}
              onViewBooks={handleViewBooks}
            />
          </TabsContent>

          {/* University Details Tab */}
          <TabsContent value="university-details">
            {selectedUniversity ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("university-directory")}
                  >
                    ← Back to Directory
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-book-800">
                      {selectedUniversity.name}
                    </CardTitle>
                    <CardDescription>
                      {selectedUniversity.location},{" "}
                      {selectedUniversity.province}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-700">
                      {selectedUniversity.overview}
                    </p>

                    {/* Faculties */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Faculties & Schools
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedUniversity.faculties.map((faculty) => (
                          <Card key={faculty.id} className="p-4">
                            <h4 className="font-medium text-book-800">
                              {faculty.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {faculty.description}
                            </p>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleViewBooks(selectedUniversity.id)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Campus Books
                      </Button>
                      {selectedUniversity.website && (
                        <Button variant="outline" asChild>
                          <a
                            href={selectedUniversity.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  Select a university from the directory to view details.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("university-directory")}
                  className="mt-4"
                >
                  Browse Universities
                </Button>
              </div>
            )}
          </TabsContent>

          {/* APS Calculator Tab */}
          <TabsContent value="aps-calculator">
            <APSCalculator
              onCalculationComplete={handleAPSCalculationComplete}
            />
          </TabsContent>

          {/* Degree Matching Tab */}
          <TabsContent value="degree-matching">
            {apsCalculation ? (
              <DegreeMatching
                calculation={apsCalculation}
                onViewBooks={handleViewBooks}
              />
            ) : (
              <div className="text-center py-12">
                <Calculator className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Calculate Your APS First
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete the APS calculator to see which degree programs you
                  qualify for.
                </p>
                <Button onClick={() => setActiveTab("aps-calculator")}>
                  Go to APS Calculator
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Bursaries Tab */}
          <TabsContent value="bursaries">
            <BursaryListing />
          </TabsContent>

          {/* Campus Books Tab */}
          <TabsContent value="campus-books">
            <CampusBooks
              onNavigateToFullMarketplace={() => navigate("/books")}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UniversityInfo;
