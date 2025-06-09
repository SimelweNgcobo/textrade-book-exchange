import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  GraduationCap,
  MapPin,
  DollarSign,
  Clock,
  ExternalLink,
  Phone,
  Mail,
  Info,
  Calendar,
  FileText,
  CheckCircle,
  Filter,
} from "lucide-react";
import {
  BURSARIES,
  BURSARY_FIELDS_OF_STUDY,
  PROVINCES,
} from "@/constants/bursaries";
import { Bursary } from "@/types/university";

const BursaryExplorerSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [showFinancialNeedOnly, setShowFinancialNeedOnly] = useState(false);
  const [expandedBursary, setExpandedBursary] = useState<string | null>(null);

  const filteredBursaries = useMemo(() => {
    return BURSARIES.filter((bursary) => {
      const matchesSearch =
        !searchQuery ||
        bursary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bursary.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bursary.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesField =
        selectedField === "all" ||
        bursary.fieldsOfStudy.includes(selectedField) ||
        bursary.fieldsOfStudy.includes("All fields");

      const matchesProvince =
        selectedProvince === "all" ||
        bursary.provinces.includes(selectedProvince) ||
        bursary.provinces.includes("All provinces");

      const matchesFinancialNeed =
        !showFinancialNeedOnly || bursary.requirements.financialNeed === true;

      return (
        matchesSearch && matchesField && matchesProvince && matchesFinancialNeed
      );
    });
  }, [searchQuery, selectedField, selectedProvince, showFinancialNeedOnly]);

  const toggleExpanded = (bursaryId: string) => {
    setExpandedBursary(expandedBursary === bursaryId ? null : bursaryId);
  };

  const getBursaryTypeColor = (bursary: Bursary) => {
    if (bursary.id === "nsfas")
      return "bg-blue-100 text-blue-800 border-blue-200";
    if (
      bursary.provider.includes("Government") ||
      bursary.provider.includes("Department")
    ) {
      return "bg-green-100 text-green-800 border-green-200";
    }
    return "bg-purple-100 text-purple-800 border-purple-200";
  };

  const getFundingLevel = (amount: string) => {
    if (amount.toLowerCase().includes("full")) return "Full Funding";
    if (amount.includes("R40,000") || amount.includes("R80,000"))
      return "Partial Funding";
    return "Comprehensive Funding";
  };

  const getDeadlineUrgency = (deadline: string) => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 0-based to 1-based

    if (deadline.includes("January") || deadline.includes("31 January")) {
      return currentMonth > 1 ? "Closed" : "Urgent";
    }
    if (deadline.includes("March") || deadline.includes("31 March")) {
      return currentMonth > 3
        ? "Closed"
        : currentMonth === 3
          ? "Urgent"
          : "Open";
    }
    if (deadline.includes("April") || deadline.includes("30 April")) {
      return currentMonth > 4
        ? "Closed"
        : currentMonth === 4
          ? "Urgent"
          : "Open";
    }
    return "Open";
  };

  const getDeadlineColor = (urgency: string) => {
    switch (urgency) {
      case "Urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <GraduationCap className="w-8 h-8 text-book-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Bursary & Financial Aid Explorer
          </h2>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover funding opportunities for your higher education journey. Find
          bursaries, scholarships, and financial aid programs that match your
          profile and field of study.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Bursaries</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by bursary name, provider, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger>
                <SelectValue placeholder="Field of Study" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                {BURSARY_FIELDS_OF_STUDY.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedProvince}
              onValueChange={setSelectedProvince}
            >
              <SelectTrigger>
                <SelectValue placeholder="Province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Provinces</SelectItem>
                {PROVINCES.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={showFinancialNeedOnly ? "default" : "outline"}
              onClick={() => setShowFinancialNeedOnly(!showFinancialNeedOnly)}
              className={
                showFinancialNeedOnly
                  ? "bg-book-600 hover:bg-book-700"
                  : "border-book-200 text-book-600 hover:bg-book-50"
              }
            >
              Financial Need Based
            </Button>

            <div className="text-sm text-gray-600 flex items-center">
              Showing {filteredBursaries.length} of {BURSARIES.length} bursaries
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured NSFAS */}
      {filteredBursaries.some((b) => b.id === "nsfas") && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-900">
                  🇿🇦 NSFAS - National Student Financial Aid Scheme
                </CardTitle>
                <CardDescription className="text-blue-700">
                  South Africa's primary government funding for students from
                  disadvantaged backgrounds
                </CardDescription>
              </div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                Government Funding
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <DollarSign className="w-6 h-6 text-blue-600 mb-2" />
                <div className="font-semibold text-blue-900">Full Coverage</div>
                <div className="text-sm text-blue-700">
                  Tuition + Accommodation + Allowances
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                <div className="font-semibold text-blue-900">Deadline</div>
                <div className="text-sm text-blue-700">31 January annually</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <Info className="w-6 h-6 text-blue-600 mb-2" />
                <div className="font-semibold text-blue-900">Eligibility</div>
                <div className="text-sm text-blue-700">
                  Household income ≤ R350,000
                </div>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-blue-800">
                <strong>Priority Application:</strong> NSFAS is the largest
                source of student funding in South Africa. Apply early at{" "}
                <a
                  href="https://www.nsfas.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold"
                >
                  www.nsfas.org.za
                </a>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Bursary Grid */}
      <div className="space-y-6">
        {filteredBursaries.map((bursary) => {
          const isExpanded = expandedBursary === bursary.id;
          const urgency = getDeadlineUrgency(bursary.applicationDeadline);

          return (
            <Card
              key={bursary.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl text-gray-900">
                        {bursary.name}
                      </CardTitle>
                      <Badge className={getBursaryTypeColor(bursary)}>
                        {bursary.provider.includes("Government")
                          ? "Government"
                          : "Corporate"}
                      </Badge>
                      <Badge className={getDeadlineColor(urgency)}>
                        {urgency}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-600">
                      {bursary.provider}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpanded(bursary.id)}
                    className="border-book-200 text-book-600 hover:bg-book-50"
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {bursary.description}
                </p>

                {/* Key Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-book-600" />
                      <span className="font-semibold text-gray-900">
                        Funding
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {getFundingLevel(bursary.amount)}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-book-600" />
                      <span className="font-semibold text-gray-900">
                        Deadline
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {bursary.applicationDeadline}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <GraduationCap className="w-4 h-4 text-book-600" />
                      <span className="font-semibold text-gray-900">
                        Fields
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {bursary.fieldsOfStudy.slice(0, 2).join(", ")}
                      {bursary.fieldsOfStudy.length > 2 && " +more"}
                    </div>
                  </div>
                </div>

                {/* Fields of Study Tags */}
                <div className="flex flex-wrap gap-2">
                  {bursary.fieldsOfStudy.slice(0, 6).map((field, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-book-50 text-book-700"
                    >
                      {field}
                    </Badge>
                  ))}
                  {bursary.fieldsOfStudy.length > 6 && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700"
                    >
                      +{bursary.fieldsOfStudy.length - 6} more
                    </Badge>
                  )}
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <>
                    <Separator />

                    <div className="space-y-6">
                      {/* Detailed Funding */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Funding Details
                        </h4>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-800">{bursary.amount}</p>
                        </div>
                      </div>

                      {/* Eligibility Criteria */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Eligibility Requirements
                        </h4>
                        <div className="space-y-2">
                          {bursary.eligibilityCriteria.map(
                            (criteria, index) => (
                              <div
                                key={index}
                                className="flex items-start space-x-2"
                              >
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">
                                  {criteria}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Application Process */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          How to Apply
                        </h4>
                        <div className="bg-book-50 border border-book-200 rounded-lg p-4">
                          <p className="text-book-800 text-sm">
                            {bursary.applicationProcess}
                          </p>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Contact Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-book-600" />
                            <span className="text-sm text-gray-700">
                              {bursary.contactInfo}
                            </span>
                          </div>
                          {bursary.website && (
                            <div className="flex items-center space-x-2">
                              <ExternalLink className="w-4 h-4 text-book-600" />
                              <a
                                href={bursary.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-book-600 hover:text-book-700 underline"
                              >
                                Visit Website
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  {bursary.website && (
                    <Button
                      onClick={() => window.open(bursary.website, "_blank")}
                      className="bg-book-600 hover:bg-book-700 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => toggleExpanded(bursary.id)}
                    className="border-book-200 text-book-600 hover:bg-book-50"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {isExpanded ? "Hide" : "View"} Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredBursaries.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No bursaries found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find relevant
            funding opportunities.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedField("all");
              setSelectedProvince("all");
              setShowFinancialNeedOnly(false);
            }}
            className="border-book-200 text-book-600 hover:bg-book-50"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Application Tips */}
      <Card className="border-book-200 bg-book-50">
        <CardHeader>
          <CardTitle className="text-book-800">💡 Application Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-book-800 mb-3">
                Before You Apply
              </h4>
              <ul className="space-y-2 text-sm text-book-700">
                <li>• Gather all required documents early</li>
                <li>• Check eligibility criteria carefully</li>
                <li>• Apply to multiple bursaries to increase chances</li>
                <li>• Keep track of deadlines with a calendar</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-book-800 mb-3">
                Increase Your Chances
              </h4>
              <ul className="space-y-2 text-sm text-book-700">
                <li>• Write compelling motivation letters</li>
                <li>• Maintain good academic performance</li>
                <li>• Get involved in community activities</li>
                <li>• Apply early - don't wait for deadlines</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BursaryExplorerSection;
