import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  RefreshCw,
  Info,
} from "lucide-react";
import CourierGuyTracker from "./CourierGuyTracker";
import {
  validateUserShipmentEligibility,
  getUserShipments,
} from "@/services/automaticShipmentService";
import { checkTrackingServiceStatus } from "@/services/courierGuyService";

const CourierGuyTrackingOnly = () => {
  const { user } = useAuth();
  const [userShipments, setUserShipments] = useState<any[]>([]);
  const [userEligibility, setUserEligibility] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serviceStatus, setServiceStatus] = useState<{
    available: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      loadUserData();
      checkServiceStatus();
    }
  }, [user]);

  const checkServiceStatus = async () => {
    try {
      const status = await checkTrackingServiceStatus();
      setServiceStatus(status);
    } catch (error) {
      console.error("Error checking service status:", error);
      setServiceStatus({
        available: false,
        message: "Service status check failed. Using demonstration mode.",
      });
    }
  };

  const loadUserData = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // Check user eligibility for shipping
      const userEligibility = await validateUserShipmentEligibility(user.id);
      setUserEligibility(userEligibility);

      // Get user shipments (returns empty array since table doesn't exist yet)
      const shipments = await getUserShipments(user.id);
      setUserShipments(shipments);

      console.log("User shipping data loaded:", { userEligibility, shipments });
    } catch (error) {
      console.error("Error loading user shipping data:", error);
      setError("Failed to load shipping information");
      // Set empty data to prevent loading loops
      setUserEligibility({
        canShip: false,
        reason: "Unable to verify eligibility",
      });
      setUserShipments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadUserData();
    checkServiceStatus();
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Authentication Required
          </h3>
          <p className="text-gray-600">
            Please log in to access shipment tracking features.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Service Status */}
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

      {/* User Eligibility Status */}
      {userEligibility && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Shipping Eligibility
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                <span>Checking eligibility...</span>
              </div>
            ) : error ? (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {userEligibility.canShip ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Eligible for Shipping
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Setup Required
                    </Badge>
                  )}
                </div>

                {!userEligibility.canShip && (
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-700">
                      <strong>Action Required:</strong> {userEligibility.reason}
                      <br />
                      <span className="text-sm">
                        Please complete your profile setup to enable automatic
                        shipping features.
                      </span>
                    </AlertDescription>
                  </Alert>
                )}

                {userEligibility.canShip && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">
                        Pickup Address
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {userEligibility.pickupAddress
                          ? "✓ Configured"
                          : "✗ Not set"}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">
                        Delivery Address
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {userEligibility.deliveryAddress
                          ? "✓ Configured"
                          : "✗ Not set"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* User Shipments */}
      {userShipments.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Your Shipments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userShipments.map((shipment) => (
                <div key={shipment.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        {shipment.tracking_number}
                      </div>
                      <div className="text-sm text-gray-600">
                        {shipment.description}
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {shipment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Shipments Found</h3>
            <p className="text-gray-600 mb-4">
              You don't have any shipments yet. When you buy or sell books,
              tracking information will appear here.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tracking Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Track Any Shipment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CourierGuyTracker />
        </CardContent>
      </Card>

      {/* Help Information */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Info className="mr-2 h-4 w-4" />
            Shipping Information
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">For Sellers:</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  • Shipments are created automatically when orders are placed
                </li>
                <li>• You'll receive tracking numbers to share with buyers</li>
                <li>
                  • Ensure your pickup address is accurate in your profile
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">For Buyers:</h4>
              <ul className="space-y-1 text-xs">
                <li>• Track your orders using the tracking numbers provided</li>
                <li>• Updates appear within 24-48 hours of shipment</li>
                <li>• Contact sellers if you don't receive tracking info</li>
              </ul>
            </div>
          </div>

          {!serviceStatus?.available && (
            <Alert className="border-blue-200 bg-blue-50 mt-4">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700 text-xs">
                <strong>Development Note:</strong> Currently showing
                demonstration functionality. In production, this would integrate
                with the actual Courier Guy tracking API.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourierGuyTrackingOnly;
