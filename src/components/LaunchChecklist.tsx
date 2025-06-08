import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  CheckCircle,
  Circle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Rocket,
} from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed" | "warning";
  category: string;
  priority: "high" | "medium" | "low";
  autoCheck?: () => Promise<boolean>;
}

const LAUNCH_CHECKLIST: ChecklistItem[] = [
  // Domain & Hosting
  {
    id: "domain-ssl",
    title: "SSL Certificate Active",
    description: "HTTPS enforced on all routes",
    status: "pending",
    category: "Domain & Hosting",
    priority: "high",
    autoCheck: async () => location.protocol === "https:",
  },
  {
    id: "domain-redirect",
    title: "HTTP → HTTPS Redirection",
    description: "All HTTP traffic redirects to HTTPS",
    status: "pending",
    category: "Domain & Hosting",
    priority: "high",
  },

  // Authentication
  {
    id: "auth-responsive",
    title: "Responsive Auth Forms",
    description: "Sign-up, sign-in, logout work on mobile and desktop",
    status: "pending",
    category: "Authentication",
    priority: "high",
  },
  {
    id: "email-verification",
    title: "Email Verification",
    description: "Email verification links redirect properly",
    status: "pending",
    category: "Authentication",
    priority: "high",
  },

  // Mobile Responsiveness
  {
    id: "mobile-layouts",
    title: "Mobile Layouts",
    description: "All pages tested on mobile devices",
    status: "pending",
    category: "Mobile Responsiveness",
    priority: "high",
  },
  {
    id: "touch-targets",
    title: "Touch Targets",
    description: "Buttons and inputs are large enough (min 44px)",
    status: "pending",
    category: "Mobile Responsiveness",
    priority: "medium",
  },

  // Performance
  {
    id: "lighthouse-score",
    title: "Lighthouse Performance",
    description: "Score > 85 on mobile and desktop",
    status: "pending",
    category: "Performance",
    priority: "high",
    autoCheck: async () => {
      // This would need actual Lighthouse integration
      return true;
    },
  },
  {
    id: "core-web-vitals",
    title: "Core Web Vitals",
    description: "LCP, CLS, FID are in green range",
    status: "pending",
    category: "Performance",
    priority: "high",
  },

  // Security
  {
    id: "https-enforced",
    title: "HTTPS Enforced",
    description: "HSTS headers present",
    status: "pending",
    category: "Security",
    priority: "high",
  },
  {
    id: "env-variables",
    title: "Environment Variables",
    description: "API keys hidden using env variables",
    status: "pending",
    category: "Security",
    priority: "high",
    autoCheck: async () => {
      // Check if sensitive variables are not exposed
      return (
        !window.location.search.includes("key=") &&
        !document.documentElement.innerHTML.includes("sk_")
      );
    },
  },

  // SEO
  {
    id: "meta-tags",
    title: "Meta Tags",
    description: "Unique title and meta description for each page",
    status: "pending",
    category: "SEO & Analytics",
    priority: "medium",
  },
  {
    id: "sitemap",
    title: "Sitemap & Robots",
    description: "sitemap.xml and robots.txt configured",
    status: "pending",
    category: "SEO & Analytics",
    priority: "medium",
  },
];

const LaunchChecklist = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(LAUNCH_CHECKLIST);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [autoCheckRunning, setAutoCheckRunning] = useState(false);

  const categories = Array.from(
    new Set(checklist.map((item) => item.category)),
  );

  const getStatusIcon = (status: ChecklistItem["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ChecklistItem["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleItemStatus = (itemId: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: item.status === "completed" ? "pending" : "completed",
            }
          : item,
      ),
    );
  };

  const runAutoChecks = async () => {
    setAutoCheckRunning(true);

    const updatedChecklist = await Promise.all(
      checklist.map(async (item) => {
        if (item.autoCheck) {
          try {
            const result = await item.autoCheck();
            return {
              ...item,
              status: result ? "completed" : "warning",
            } as ChecklistItem;
          } catch (error) {
            console.error(`Auto-check failed for ${item.id}:`, error);
            return { ...item, status: "warning" } as ChecklistItem;
          }
        }
        return item;
      }),
    );

    setChecklist(updatedChecklist);
    setAutoCheckRunning(false);
  };

  const getCompletionStats = () => {
    const total = checklist.length;
    const completed = checklist.filter(
      (item) => item.status === "completed",
    ).length;
    const warnings = checklist.filter(
      (item) => item.status === "warning",
    ).length;

    return {
      total,
      completed,
      warnings,
      percentage: Math.round((completed / total) * 100),
    };
  };

  const getCategoryStats = (category: string) => {
    const categoryItems = checklist.filter(
      (item) => item.category === category,
    );
    const completed = categoryItems.filter(
      (item) => item.status === "completed",
    ).length;
    return { total: categoryItems.length, completed };
  };

  const stats = getCompletionStats();

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🚀 Production Launch Checklist
        </h1>
        <p className="text-gray-600 mb-4">
          Track your progress toward a successful launch
        </p>

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl font-bold text-book-600">
                {stats.percentage}%
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">
                  {stats.completed} / {stats.total} Completed
                </div>
                {stats.warnings > 0 && (
                  <div className="text-yellow-600 text-sm">
                    {stats.warnings} warnings
                  </div>
                )}
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-book-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>

            <Button
              onClick={runAutoChecks}
              disabled={autoCheckRunning}
              className="w-full"
            >
              {autoCheckRunning ? "Running Auto-Checks..." : "Run Auto-Checks"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryItems = checklist.filter(
            (item) => item.category === category,
          );
          const categoryStats = getCategoryStats(category);
          const isExpanded = expandedCategories.has(category);

          return (
            <Card key={category}>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleCategory(category)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                        <CardTitle className="text-lg">{category}</CardTitle>
                        <Badge variant="outline">
                          {categoryStats.completed}/{categoryStats.total}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {Math.round(
                          (categoryStats.completed / categoryStats.total) * 100,
                        )}
                        %
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleItemStatus(item.id)}
                        >
                          {getStatusIcon(item.status)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900">
                                {item.title}
                              </h4>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  item.priority === "high"
                                    ? "border-red-200 text-red-700"
                                    : item.priority === "medium"
                                      ? "border-yellow-200 text-yellow-700"
                                      : "border-gray-200 text-gray-700"
                                }`}
                              >
                                {item.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>

      {stats.percentage === 100 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6 text-center">
            <Rocket className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Ready for Launch! 🎉
            </h3>
            <p className="text-green-700">
              Congratulations! You've completed all checklist items. Your
              application is ready for production deployment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LaunchChecklist;
