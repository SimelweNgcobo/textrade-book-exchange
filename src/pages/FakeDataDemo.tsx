
import { useState } from "react";
import Layout from "@/components/Layout";
import FakeDataManager from "@/components/admin/FakeDataManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Database, 
  Info,
  ArrowRight,
  Book,
  Bell,
  Activity,
  Users,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const FakeDataDemo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const demoFeatures = [
    {
      icon: Book,
      title: "Sample Books",
      description: "Generate realistic book listings across various subjects and categories",
      count: "15 books",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Create sample notifications for testing the notification system",
      count: "20 notifications", 
      color: "bg-green-100 text-green-700"
    },
    {
      icon: Activity,
      title: "Activity Logs",
      description: "Generate user activity history for dashboard and analytics testing",
      count: "30 activities",
      color: "bg-purple-100 text-purple-700"
    },
    {
      icon: TrendingUp,
      title: "Complete Data Set",
      description: "Full suite of demo data for comprehensive testing",
      count: "65+ items",
      color: "bg-orange-100 text-orange-700"
    }
  ];

  const quickActions = [
    {
      title: "View Books",
      description: "See generated books in the marketplace",
      path: "/books",
      icon: Book
    },
    {
      title: "Check Notifications", 
      description: "View your notification feed",
      path: "/notifications",
      icon: Bell
    },
    {
      title: "Activity Log",
      description: "Check your activity history",
      path: "/activity",
      icon: Activity
    },
    {
      title: "Your Profile",
      description: "Manage your profile and listings",
      path: "/profile", 
      icon: Users
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Database className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Fake Data Demo</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate realistic sample data to test and demonstrate the platform's features. 
            Perfect for development, testing, and showcasing functionality.
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Demo Purpose:</strong> This page helps developers and testers quickly populate 
            the platform with realistic sample data. All generated data is associated with your account.
          </AlertDescription>
        </Alert>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {demoFeatures.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-full ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                <Badge variant="outline">{feature.count}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Fake Data Manager */}
        <FakeDataManager />

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 text-left justify-start"
                  onClick={() => navigate(action.path)}
                  disabled={!user}
                >
                  <div className="flex items-center gap-3 w-full">
                    <action.icon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {action.description}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">1</Badge>
                <div>
                  <h4 className="font-medium">Choose Your Data Type</h4>
                  <p className="text-sm text-gray-600">
                    Select whether you want to create books, notifications, activities, or everything at once.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">2</Badge>
                <div>
                  <h4 className="font-medium">Click Create</h4>
                  <p className="text-sm text-gray-600">
                    Click the corresponding button to generate the fake data. The process may take a few seconds.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">3</Badge>
                <div>
                  <h4 className="font-medium">View Results</h4>
                  <p className="text-sm text-gray-600">
                    Check the results summary and use the quick actions to navigate to different sections of the app.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FakeDataDemo;
