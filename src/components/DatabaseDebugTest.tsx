import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { logDatabaseError } from "@/utils/debugUtils";

/**
 * Debug component to test database queries and identify issues
 * Only visible in development mode
 */
export const DatabaseDebugTest = () => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const testSimpleBookQuery = async () => {
    setIsLoading(true);
    setResults([]);

    try {
      console.log("🧪 Testing simple books query...");

      const { data, error } = await supabase
        .from("books")
        .select("id, title, author, price, seller_id")
        .limit(5);

      if (error) {
        logDatabaseError("Simple books query", error);
        setResults([{ type: "error", content: `Error: ${error.message}` }]);
      } else {
        console.log("✅ Simple books query successful:", data?.length, "books");
        setResults([
          { type: "success", content: `Found ${data?.length || 0} books` },
          { type: "data", content: data?.slice(0, 3) || [] },
        ]);
      }
    } catch (error) {
      console.error("🔴 Unexpected error:", error);
      setResults([{ type: "error", content: `Unexpected error: ${error}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const testProfilesQuery = async () => {
    setIsLoading(true);
    setResults([]);

    try {
      console.log("🧪 Testing profiles query...");

      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email")
        .limit(5);

      if (error) {
        logDatabaseError("Profiles query", error);
        setResults([{ type: "error", content: `Error: ${error.message}` }]);
      } else {
        console.log("✅ Profiles query successful:", data?.length, "profiles");
        setResults([
          { type: "success", content: `Found ${data?.length || 0} profiles` },
          { type: "data", content: data?.slice(0, 3) || [] },
        ]);
      }
    } catch (error) {
      console.error("🔴 Unexpected error:", error);
      setResults([{ type: "error", content: `Unexpected error: ${error}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const testJoinQuery = async () => {
    setIsLoading(true);
    setResults([]);

    try {
      console.log("🧪 Testing books with profiles join...");

      const { data, error } = await supabase
        .from("books")
        .select(
          `
          id,
          title,
          author,
          seller_id,
          profiles!seller_id (
            id,
            name
          )
        `,
        )
        .limit(3);

      if (error) {
        logDatabaseError("Books with profiles join", error);
        setResults([
          { type: "error", content: `Join error: ${error.message}` },
          {
            type: "info",
            content:
              "This confirms no foreign key relationship exists between books and profiles tables.",
          },
          { type: "info", content: "Using separate queries instead..." },
        ]);
      } else {
        console.log(
          "✅ Join query successful:",
          data?.length,
          "books with profiles",
        );
        setResults([
          {
            type: "success",
            content: `Join successful: ${data?.length || 0} books`,
          },
          { type: "data", content: data || [] },
        ]);
      }
    } catch (error) {
      console.error("🔴 Unexpected join error:", error);
      setResults([
        { type: "error", content: `Unexpected join error: ${error}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const testTableStructure = async () => {
    setIsLoading(true);
    setResults([]);

    try {
      console.log("🧪 Testing table structure and relationships...");

      // Test books table columns
      const { data: booksData, error: booksError } = await supabase
        .from("books")
        .select("id, seller_id, title")
        .limit(1);

      // Test profiles table columns
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, name, email")
        .limit(1);

      // Test notifications table existence
      const { data: notificationsData, error: notificationsError } =
        await supabase.from("notifications").select("id").limit(1);

      const results = [];

      if (booksError) {
        results.push({
          type: "error",
          content: `Books table error: ${booksError.message}`,
        });
      } else {
        results.push({
          type: "success",
          content: `Books table accessible (${booksData?.length || 0} sample records)`,
        });
      }

      if (profilesError) {
        results.push({
          type: "error",
          content: `Profiles table error: ${profilesError.message}`,
        });
      } else {
        results.push({
          type: "success",
          content: `Profiles table accessible (${profilesData?.length || 0} sample records)`,
        });
      }

      if (notificationsError) {
        if (notificationsError.code === "42P01") {
          results.push({
            type: "error",
            content: "Notifications table does not exist",
          });
        } else {
          results.push({
            type: "error",
            content: `Notifications table error: ${notificationsError.message}`,
          });
        }
      } else {
        results.push({
          type: "success",
          content: "Notifications table accessible",
        });
      }

      setResults(results);
    } catch (error) {
      console.error("🔴 Table structure test error:", error);
      setResults([
        { type: "error", content: `Table structure test error: ${error}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>🔍 Database Debug Test (Development Only)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={testSimpleBookQuery}
            disabled={isLoading}
            variant="outline"
          >
            Test Books Query
          </Button>
          <Button
            onClick={testProfilesQuery}
            disabled={isLoading}
            variant="outline"
          >
            Test Profiles Query
          </Button>
          <Button
            onClick={testJoinQuery}
            disabled={isLoading}
            variant="outline"
          >
            Test Join Query
          </Button>
          <Button
            onClick={testTableStructure}
            disabled={isLoading}
            variant="outline"
          >
            Test Table Structure
          </Button>
        </div>

        {isLoading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">
              Testing database query...
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Results:</h4>
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded text-sm ${
                  result.type === "error"
                    ? "bg-red-100 text-red-800"
                    : result.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {result.type === "data" ? (
                  <pre className="whitespace-pre-wrap overflow-auto text-xs">
                    {JSON.stringify(result.content, null, 2)}
                  </pre>
                ) : (
                  result.content
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseDebugTest;
