
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Plus, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw,
  Book,
  Bell,
  Activity
} from "lucide-react";
import { toast } from "sonner";
import FakeDataService from "@/services/fakeDataService";
import { useAuth } from "@/contexts/AuthContext";

interface CreationResult {
  success: boolean;
  created: number;
  errors: string[];
}

const FakeDataManager = () => {
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastResults, setLastResults] = useState<{
    books?: CreationResult;
    notifications?: CreationResult;
    activities?: CreationResult;
  }>({});

  const handleCreateBooks = async () => {
    if (!user) {
      toast.error("Please log in to create fake data");
      return;
    }

    setIsCreating(true);
    setProgress(0);
    
    try {
      toast.info("Creating fake books...", { duration: 2000 });
      
      const result = await FakeDataService.createFakeBooks(15);
      setLastResults(prev => ({ ...prev, books: result }));
      
      if (result.success) {
        toast.success(`Created ${result.created} fake books!`);
      } else {
        toast.error(`Failed to create books: ${result.errors.join(', ')}`);
      }
      
      setProgress(100);
    } catch (error) {
      console.error("Error creating fake books:", error);
      toast.error("Error creating fake books");
    } finally {
      setIsCreating(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const handleCreateNotifications = async () => {
    if (!user) {
      toast.error("Please log in to create fake data");
      return;
    }

    setIsCreating(true);
    setProgress(0);
    
    try {
      toast.info("Creating fake notifications...", { duration: 2000 });
      
      const result = await FakeDataService.createFakeNotifications(20);
      setLastResults(prev => ({ ...prev, notifications: result }));
      
      if (result.success) {
        toast.success(`Created ${result.created} fake notifications!`);
      } else {
        toast.error(`Failed to create notifications: ${result.errors.join(', ')}`);
      }
      
      setProgress(100);
    } catch (error) {
      console.error("Error creating fake notifications:", error);
      toast.error("Error creating fake notifications");
    } finally {
      setIsCreating(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const handleCreateActivities = async () => {
    if (!user) {
      toast.error("Please log in to create fake data");
      return;
    }

    setIsCreating(true);
    setProgress(0);
    
    try {
      toast.info("Creating fake activity logs...", { duration: 2000 });
      
      const result = await FakeDataService.createFakeActivityLogs(30);
      setLastResults(prev => ({ ...prev, activities: result }));
      
      if (result.success) {
        toast.success(`Created ${result.created} fake activity logs!`);
      } else {
        toast.error(`Failed to create activities: ${result.errors.join(', ')}`);
      }
      
      setProgress(100);
    } catch (error) {
      console.error("Error creating fake activities:", error);
      toast.error("Error creating fake activities");
    } finally {
      setIsCreating(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const handleCreateAllData = async () => {
    if (!user) {
      toast.error("Please log in to create fake data");
      return;
    }

    setIsCreating(true);
    setProgress(0);
    
    try {
      toast.info("Creating comprehensive fake data...", { duration: 3000 });
      
      const result = await FakeDataService.createAllFakeData({
        books: 15,
        notifications: 20,
        activities: 30
      });
      
      setLastResults({
        books: result.summary.books,
        notifications: result.summary.notifications,
        activities: result.summary.activities
      });
      
      if (result.success) {
        const totalCreated = result.summary.books.created + 
                           result.summary.notifications.created + 
                           result.summary.activities.created;
        toast.success(`Created ${totalCreated} fake data items!`);
      } else {
        toast.error("Failed to create some fake data items");
      }
      
      setProgress(100);
    } catch (error) {
      console.error("Error creating all fake data:", error);
      toast.error("Error creating fake data");
    } finally {
      setIsCreating(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const ResultBadge = ({ result }: { result?: CreationResult }) => {
    if (!result) return null;
    
    return (
      <div className="flex items-center gap-2 mt-2">
        {result.success ? (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            {result.created} created
          </Badge>
        ) : (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )}
        {result.errors.length > 0 && (
          <Badge variant="outline" className="text-yellow-700">
            {result.errors.length} errors
          </Badge>
        )}
      </div>
    );
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">Please log in to manage fake data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Fake Data Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This tool creates fake data for testing and demonstration purposes. 
              Use it to populate your account with sample books, notifications, and activity logs.
            </AlertDescription>
          </Alert>

          {progress > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Creating fake data...</span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Create Books */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Book className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Books</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Create 15 fake book listings
                </p>
                <Button
                  onClick={handleCreateBooks}
                  disabled={isCreating}
                  size="sm"
                  className="w-full"
                >
                  {isCreating ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Create Books
                </Button>
                <ResultBadge result={lastResults.books} />
              </CardContent>
            </Card>

            {/* Create Notifications */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Notifications</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Create 20 fake notifications
                </p>
                <Button
                  onClick={handleCreateNotifications}
                  disabled={isCreating}
                  size="sm"
                  className="w-full"
                  variant="outline"
                >
                  {isCreating ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Create Notifications
                </Button>
                <ResultBadge result={lastResults.notifications} />
              </CardContent>
            </Card>

            {/* Create Activities */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">Activities</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Create 30 fake activity logs
                </p>
                <Button
                  onClick={handleCreateActivities}
                  disabled={isCreating}
                  size="sm"
                  className="w-full"
                  variant="outline"
                >
                  {isCreating ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Create Activities
                </Button>
                <ResultBadge result={lastResults.activities} />
              </CardContent>
            </Card>

            {/* Create All */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-4 w-4 text-orange-600" />
                  <span className="font-medium">Everything</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Create all fake data at once
                </p>
                <Button
                  onClick={handleCreateAllData}
                  disabled={isCreating}
                  size="sm"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  {isCreating ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Create All
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Summary */}
          {Object.keys(lastResults).length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Last Creation Results</h4>
              <div className="space-y-2 text-sm">
                {lastResults.books && (
                  <div className="flex justify-between">
                    <span>Books:</span>
                    <span className={lastResults.books.success ? "text-green-600" : "text-red-600"}>
                      {lastResults.books.created} created, {lastResults.books.errors.length} errors
                    </span>
                  </div>
                )}
                {lastResults.notifications && (
                  <div className="flex justify-between">
                    <span>Notifications:</span>
                    <span className={lastResults.notifications.success ? "text-green-600" : "text-red-600"}>
                      {lastResults.notifications.created} created, {lastResults.notifications.errors.length} errors
                    </span>
                  </div>
                )}
                {lastResults.activities && (
                  <div className="flex justify-between">
                    <span>Activities:</span>
                    <span className={lastResults.activities.success ? "text-green-600" : "text-red-600"}>
                      {lastResults.activities.created} created, {lastResults.activities.errors.length} errors
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FakeDataManager;
