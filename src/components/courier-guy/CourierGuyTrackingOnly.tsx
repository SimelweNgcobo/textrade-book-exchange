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

      {/* User's Shipments - Will be implemented when shipments table is created */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Your Shipments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Shipment history will appear here
              </p>
              <p className="text-sm text-gray-500">
                When automatic shipment creation is enabled, your sent and
                received packages will be displayed here.
              </p>
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
