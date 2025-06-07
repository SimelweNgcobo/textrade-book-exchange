import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Package,
  Info,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Truck,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { validateUserShipmentEligibility } from "@/services/automaticShipmentService";
import CourierGuyTracker from "./CourierGuyTracker";

const CourierGuyTrackingOnly = () => {
  const { user } = useAuth();
  const [eligibility, setEligibility] = useState<{
    canSell: boolean;
    canBuy: boolean;
    errors: string[];
  }>({ canSell: false, canBuy: false, errors: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadEligibilityData();
    } else {
      setEligibility({ canSell: false, canBuy: false, errors: [] });
    }
  }, [user?.id]);

  const loadEligibilityData = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const userEligibility = await validateUserShipmentEligibility(user.id);
      setEligibility(
        userEligibility || {
          canSell: false,
          canBuy: false,
          errors: ["Error loading eligibility"],
        },
      );
    } catch (error) {
      console.error("Error loading eligibility data:", error);
      setEligibility({
        canSell: false,
        canBuy: false,
        errors: ["Error loading user information"],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in_transit":
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "in_transit":
      case "out_for_delivery":
        return <Truck className="h-4 w-4" />;
      case "pending":
      case "processing":
        return <Clock className="h-4 w-4" />;
      case "failed":
      case "cancelled":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-sm text-gray-600">
                Loading shipping information...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Information Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Automatic Shipping Integration:</strong> When you buy or sell
          books, shipments are automatically created using your saved addresses.
          Sellers' pickup addresses are used as sender information, and buyers'
          delivery addresses are used as recipient information.
        </AlertDescription>
      </Alert>

      {/* User Eligibility Status */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Your Shipping Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Badge
                  className={
                    eligibility.canSell
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {eligibility.canSell ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  )}
                  {eligibility.canSell ? "Can Sell Books" : "Cannot Sell Books"}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  className={
                    eligibility.canBuy
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {eligibility.canBuy ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  )}
                  {eligibility.canBuy ? "Can Buy Books" : "Cannot Buy Books"}
                </Badge>
              </div>
            </div>

            {eligibility.errors.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-red-600 mb-2">
                  Address Requirements:
                </p>
                <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                  {eligibility.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => (window.location.href = "/profile")}
                >
                  Update Addresses in Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* User's Shipments */}
      {user && userShipments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Your Recent Shipments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userShipments.map((shipment, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{shipment.book?.title}</h4>
                      <p className="text-sm text-gray-600">
                        by {shipment.book?.author}
                      </p>
                    </div>
                    <Badge className={getStatusColor(shipment.status)}>
                      {getStatusIcon(shipment.status)}
                      <span className="ml-1">
                        {shipment.status || "Unknown"}
                      </span>
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Tracking:</span>
                      <p className="text-gray-600">
                        {shipment.tracking_number}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Reference:</span>
                      <p className="text-gray-600">{shipment.reference}</p>
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>
                      <p className="text-gray-600">
                        {new Date(shipment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {shipment.seller_id === user.id
                          ? "Selling to"
                          : "Buying from"}
                        :
                        <strong className="ml-1">
                          {shipment.seller_id === user.id
                            ? shipment.buyer?.name
                            : shipment.seller?.name}
                        </strong>
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Scroll to tracking section or open tracking with this number
                          const trackingSection = document.getElementById(
                            "courier-guy-tracker",
                          );
                          if (trackingSection) {
                            trackingSection.scrollIntoView({
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        Track Package
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shipment Creation Disabled Notice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5" />
            Automatic Shipment System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-600">
              Our shipping system automatically creates Courier Guy shipments
              when books are purchased:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4">
              <li>
                <strong>Seller Information:</strong> Automatically uses the book
                seller's saved pickup address and phone number
              </li>
              <li>
                <strong>Buyer Information:</strong> Uses the buyer's delivery
                address (shipping or pickup address based on preference)
              </li>
              <li>
                <strong>Package Details:</strong> Automatically includes book
                title, author, price, and generates reference numbers
              </li>
              <li>
                <strong>Tracking:</strong> Buyers and sellers receive tracking
                numbers to monitor shipment progress
              </li>
            </ul>

            <Alert>
              <Package className="h-4 w-4" />
              <AlertDescription>
                <strong>Note:</strong> Manual shipment creation is currently
                disabled. Shipments are only created automatically during book
                purchases.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Section */}
      <div id="courier-guy-tracker">
        <CourierGuyTracker />
      </div>
    </div>
  );
};

export default CourierGuyTrackingOnly;
