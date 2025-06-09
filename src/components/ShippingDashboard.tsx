import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Truck,
  Search,
  Calculator,
  Clock,
  CheckCircle,
  Zap,
  Globe,
} from "lucide-react";

// Import CourierGuy components
import CourierGuyShipmentForm from "@/components/courier-guy/CourierGuyShipmentForm";
import CourierGuyTracker from "@/components/courier-guy/CourierGuyTracker";
import CourierGuyTrackingOnly from "@/components/courier-guy/CourierGuyTrackingOnly";

// Import ShipLogic components
import ShipLogicShipmentForm from "@/components/shiplogic/ShipLogicShipmentForm";
import ShipLogicTracker from "@/components/shiplogic/ShipLogicTracker";
import ShipLogicRateQuote from "@/components/shiplogic/ShipLogicRateQuote";

interface ShippingDashboardProps {
  defaultTab?: string;
  defaultProvider?: "courierGuy" | "shipLogic";
}

const ShippingDashboard = ({
  defaultTab = "track",
  defaultProvider = "courierGuy",
}: ShippingDashboardProps) => {
  const [selectedProvider, setSelectedProvider] = useState<
    "courierGuy" | "shipLogic"
  >(defaultProvider);

  const providers = [
    {
      id: "courierGuy",
      name: "Courier Guy",
      logo: "🚚",
      description: "Established local courier service",
      features: [
        "Local South African courier",
        "Reliable tracking",
        "Cost-effective for local deliveries",
        "2-3 business days standard",
      ],
      color: "blue",
    },
    {
      id: "shipLogic",
      name: "ShipLogic",
      logo: "📦",
      description: "Advanced logistics platform",
      features: [
        "Multiple service levels",
        "Real-time tracking",
        "Professional waybills",
        "Comprehensive API integration",
      ],
      color: "green",
    },
  ];

  const currentProvider = providers.find((p) => p.id === selectedProvider);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Provider Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Choose Shipping Provider
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedProvider === provider.id
                    ? provider.color === "blue"
                      ? "border-blue-500 bg-blue-50"
                      : "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() =>
                  setSelectedProvider(provider.id as "courierGuy" | "shipLogic")
                }
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{provider.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{provider.name}</h3>
                      {selectedProvider === provider.id && (
                        <Badge
                          variant="default"
                          className={
                            provider.color === "blue"
                              ? "bg-blue-600"
                              : "bg-green-600"
                          }
                        >
                          Selected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {provider.description}
                    </p>
                    <ul className="space-y-1">
                      {provider.features.map((feature, index) => (
                        <li
                          key={index}
                          className="text-xs text-gray-500 flex items-center"
                        >
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Provider-specific Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="text-2xl mr-2">{currentProvider?.logo}</div>
            {currentProvider?.name} Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="track" className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Track Shipment
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Create Shipment
              </TabsTrigger>
              {selectedProvider === "shipLogic" && (
                <TabsTrigger value="quote" className="flex items-center">
                  <Calculator className="mr-2 h-4 w-4" />
                  Get Quote
                </TabsTrigger>
              )}
              {selectedProvider === "courierGuy" && (
                <TabsTrigger value="quote" className="flex items-center">
                  <Calculator className="mr-2 h-4 w-4" />
                  Quick Quote
                </TabsTrigger>
              )}
            </TabsList>

            {/* Tracking Tab */}
            <TabsContent value="track" className="mt-6">
              {selectedProvider === "courierGuy" ? (
                <CourierGuyTrackingOnly />
              ) : (
                <ShipLogicTracker />
              )}
            </TabsContent>

            {/* Create Shipment Tab */}
            <TabsContent value="create" className="mt-6">
              {selectedProvider === "courierGuy" ? (
                <CourierGuyShipmentForm />
              ) : (
                <ShipLogicShipmentForm />
              )}
            </TabsContent>

            {/* Quote Tab */}
            <TabsContent value="quote" className="mt-6">
              {selectedProvider === "shipLogic" ? (
                <ShipLogicRateQuote />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calculator className="mr-2 h-5 w-5" />
                      Courier Guy Quick Quote
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                      <h3 className="text-lg font-semibold mb-2">
                        Quick Quote Estimation
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Courier Guy provides competitive rates for textbook
                        delivery
                      </p>
                      <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto">
                        <div className="text-2xl font-bold text-blue-600">
                          R85 - R150
                        </div>
                        <div className="text-sm text-gray-600">
                          Typical range for textbook delivery
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Final rates depend on distance, weight, and service
                          level
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Service Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Service Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                🚚 Courier Guy
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Delivery Time</span>
                  <Badge variant="outline">2-3 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Coverage</span>
                  <Badge variant="outline">South Africa</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tracking</span>
                  <Badge variant="outline">Basic</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Best For</span>
                  <Badge variant="outline">Local deliveries</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">📦 ShipLogic</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Delivery Time</span>
                  <Badge variant="outline">1-5 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Service Levels</span>
                  <Badge variant="outline">4 options</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tracking</span>
                  <Badge variant="outline">Advanced</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Best For</span>
                  <Badge variant="outline">Flexible needs</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help & Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Shipping Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Package className="h-8 w-8 text-gray-600 mx-auto mb-3" />
              <h3 className="text-sm font-semibold mb-2">
                Automatic Processing
              </h3>
              <p className="text-xs text-gray-600">
                Shipments are created automatically when books are purchased
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Truck className="h-8 w-8 text-gray-600 mx-auto mb-3" />
              <h3 className="text-sm font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-xs text-gray-600">
                Track your shipment every step of the way with detailed updates
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Zap className="h-8 w-8 text-gray-600 mx-auto mb-3" />
              <h3 className="text-sm font-semibold mb-2">Multiple Options</h3>
              <p className="text-xs text-gray-600">
                Choose between different providers and service levels
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingDashboard;
