import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import {
  trackCourierGuyShipment,
  CourierGuyTrackingInfo,
  checkTrackingServiceStatus,
  getTestTrackingNumbers,
} from "@/services/courierGuyService";

const CourierGuyTracker = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingInfo, setTrackingInfo] =
    useState<CourierGuyTrackingInfo | null>(null);
  const [serviceStatus, setServiceStatus] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const [showTestNumbers, setShowTestNumbers] = useState(false);

  useEffect(() => {
    checkServiceStatus();
  }, []);

  const checkServiceStatus = async () => {
    try {
      const status = await checkTrackingServiceStatus();
      setServiceStatus(status);
    } catch (error) {
      setServiceStatus({
        available: false,
        message: "Unable to check service status. Using demonstration mode.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingNumber.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }

    setIsLoading(true);
    setTrackingInfo(null);

    try {
      const info = await trackCourierGuyShipment(trackingNumber.trim());
      setTrackingInfo(info);

      if (!serviceStatus?.available) {
        toast.success("Demonstration tracking data loaded successfully!", {
          description: "This is mock data for demonstration purposes.",
        });
      } else {
        toast.success("Tracking information retrieved successfully!");
      }
    } catch (error) {
      console.error("Error tracking shipment:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to track shipment";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestTrackingNumber = (testNumber: string) => {
    setTrackingNumber(testNumber);
    setShowTestNumbers(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in_transit":
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800";
      case "pending":
      case "processing":
      case "created":
      case "collected":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "in_transit":
      case "out_for_delivery":
        return <Package className="h-4 w-4" />;
      case "pending":
      case "processing":
      case "created":
      case "collected":
        return <Clock className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const testNumbers = getTestTrackingNumbers();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Service Status Alert */}
      {serviceStatus && (
        <Alert
          className={
            serviceStatus.available
              ? "border-green-200 bg-green-50"
              : "border-yellow-200 bg-yellow-50"
          }
        >
          {serviceStatus.available ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <Info className="h-4 w-4 text-yellow-600" />
          )}
          <AlertDescription
            className={
              serviceStatus.available ? "text-green-700" : "text-yellow-700"
            }
          >
            {serviceStatus.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Tracking Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Track Your Shipment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="trackingNumber">Tracking Number</Label>
              <div className="flex space-x-2">
                <Input
                  id="trackingNumber"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter your Courier Guy tracking number"
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Track
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Test Numbers for Demo */}
            {!serviceStatus?.available && (
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTestNumbers(!showTestNumbers)}
                  className="text-xs"
                >
                  {showTestNumbers ? "Hide" : "Show"} Demo Tracking Numbers
                </Button>

                {showTestNumbers && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {testNumbers.map((number) => (
                      <Button
                        key={number}
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTestTrackingNumber(number)}
                        className="text-xs border border-gray-200 hover:bg-gray-50"
                      >
                        {number}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Tracking Results */}
      {trackingInfo && (
        <div className="space-y-6">
          {/* Demo Notice */}
          {!serviceStatus?.available && (
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                <strong>Demo Mode:</strong> This is demonstration data showing
                how tracking would work. In production, this would connect to
                the actual Courier Guy API.
              </AlertDescription>
            </Alert>
          )}

          {/* Shipment Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Shipment Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium">Tracking Number</Label>
                  <p className="text-sm bg-gray-100 p-2 rounded font-mono">
                    {trackingInfo.tracking_number}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(trackingInfo.status)}>
                      {getStatusIcon(trackingInfo.status)}
                      <span className="ml-1">
                        {trackingInfo.status_description}
                      </span>
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p className="text-sm bg-gray-100 p-2 rounded">
                    {new Date(trackingInfo.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Updated</Label>
                  <p className="text-sm bg-gray-100 p-2 rounded">
                    {new Date(trackingInfo.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {trackingInfo.estimated_delivery_date && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Label className="text-sm font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Estimated Delivery
                  </Label>
                  <p className="text-lg font-semibold text-blue-600">
                    {new Date(
                      trackingInfo.estimated_delivery_date,
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}

              {trackingInfo.actual_delivery_date && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Label className="text-sm font-medium flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Delivered On
                  </Label>
                  <p className="text-lg font-semibold text-green-600">
                    {new Date(
                      trackingInfo.actual_delivery_date,
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tracking Timeline */}
          {trackingInfo.tracking_events &&
            trackingInfo.tracking_events.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Tracking Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingInfo.tracking_events
                      .sort(
                        (a, b) =>
                          new Date(b.timestamp).getTime() -
                          new Date(a.timestamp).getTime(),
                      )
                      .map((event, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-shrink-0">
                            <div
                              className={`p-2 rounded-full ${getStatusColor(event.status)}`}
                            >
                              {getStatusIcon(event.status)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium">
                                {event.description}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {event.status.replace("_", " ").toUpperCase()}
                              </Badge>
                            </div>
                            {event.location && (
                              <p className="text-sm text-gray-600 flex items-center mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {event.location}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(event.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-sm text-gray-600">
                Fetching tracking information...
              </p>
              <p className="text-xs text-gray-500 mt-1">
                This may take a few moments
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Info className="mr-2 h-4 w-4" />
            Help & Information
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 space-y-2">
          <p>
            • Tracking numbers are usually provided by the seller after shipment
          </p>
          <p>
            • Updates may take 24-48 hours to appear after shipment creation
          </p>
          <p>
            • Contact the seller if you don't receive a tracking number within 3
            business days
          </p>
          {!serviceStatus?.available && (
            <p className="text-blue-600">
              • Currently showing demonstration data - actual API integration
              pending
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourierGuyTracker;
