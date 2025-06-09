import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  trackShipLogicShipment,
  getShipLogicShipmentNotes,
} from "@/services/shipLogicService";
import {
  ShipLogicTrackingInfo,
  ShipLogicTrackingEvent,
} from "@/types/shiplogic";

interface ShipLogicTrackerProps {
  initialShipmentId?: string;
}

const ShipLogicTracker = ({ initialShipmentId }: ShipLogicTrackerProps) => {
  const [shipmentId, setShipmentId] = useState(initialShipmentId || "");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingInfo, setTrackingInfo] =
    useState<ShipLogicTrackingInfo | null>(null);
  const [shipmentNotes, setShipmentNotes] = useState<any>(null);

  const getStatusColor = (status: string): string => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("delivered")) return "bg-green-100 text-green-800";
    if (lowerStatus.includes("transit") || lowerStatus.includes("collection"))
      return "bg-blue-100 text-blue-800";
    if (lowerStatus.includes("pending") || lowerStatus.includes("created"))
      return "bg-yellow-100 text-yellow-800";
    if (lowerStatus.includes("cancelled") || lowerStatus.includes("failed"))
      return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("delivered"))
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (lowerStatus.includes("transit"))
      return <Package className="h-4 w-4 text-blue-600" />;
    if (lowerStatus.includes("cancelled") || lowerStatus.includes("failed"))
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    return <Clock className="h-4 w-4 text-gray-600" />;
  };

  const handleTrack = async () => {
    if (!shipmentId.trim()) {
      toast.error("Please enter a shipment ID");
      return;
    }

    setIsLoading(true);
    setTrackingInfo(null);
    setShipmentNotes(null);

    try {
      // Get tracking information
      const trackingResponse = await trackShipLogicShipment(shipmentId.trim());
      setTrackingInfo(trackingResponse.tracking);

      // Try to get shipment notes (optional)
      try {
        const notesResponse = await getShipLogicShipmentNotes(
          shipmentId.trim(),
        );
        setShipmentNotes(notesResponse);
      } catch (notesError) {
        // Notes are optional, don't show error to user
        console.log("Could not fetch shipment notes:", notesError);
      }

      toast.success("Tracking information retrieved successfully!");
    } catch (error) {
      console.error("Error tracking shipment:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to track shipment";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const formatDateOnly = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Track ShipLogic Shipment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="shipmentId">Shipment ID or Waybill Number</Label>
              <Input
                id="shipmentId"
                value={shipmentId}
                onChange={(e) => setShipmentId(e.target.value)}
                placeholder="Enter shipment ID or waybill number"
                onKeyPress={(e) => e.key === "Enter" && handleTrack()}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleTrack}
                disabled={isLoading || !shipmentId.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Track
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Results */}
      {trackingInfo && (
        <div className="space-y-6">
          {/* Shipment Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Shipment Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Shipment ID</Label>
                  <p className="text-sm bg-gray-100 p-2 rounded">
                    {trackingInfo.shipment_id}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Waybill Number</Label>
                  <p className="text-sm bg-gray-100 p-2 rounded">
                    {trackingInfo.waybill_number}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Service Level</Label>
                  <p className="text-sm bg-gray-100 p-2 rounded">
                    {trackingInfo.service_level_code}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Current Status</Label>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(trackingInfo.status)}
                    <Badge className={getStatusColor(trackingInfo.status)}>
                      {trackingInfo.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Collection Date</Label>
                  <p className="text-sm bg-gray-100 p-2 rounded">
                    {formatDateOnly(trackingInfo.collection_date)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Estimated Delivery
                  </Label>
                  <p className="text-sm bg-gray-100 p-2 rounded">
                    {formatDateOnly(trackingInfo.estimated_delivery_date)}
                  </p>
                </div>
              </div>

              {trackingInfo.actual_delivery_date && (
                <div className="mt-4">
                  <Label className="text-sm font-medium">
                    Actual Delivery Date
                  </Label>
                  <p className="text-sm bg-green-100 text-green-800 p-2 rounded font-medium">
                    {formatDate(trackingInfo.actual_delivery_date)}
                  </p>
                </div>
              )}

              {trackingInfo.status_description && (
                <div className="mt-4">
                  <Label className="text-sm font-medium">
                    Status Description
                  </Label>
                  <p className="text-sm bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                    {trackingInfo.status_description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tracking Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Tracking History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {trackingInfo.tracking_events &&
              trackingInfo.tracking_events.length > 0 ? (
                <div className="space-y-4">
                  {trackingInfo.tracking_events.map(
                    (event: ShipLogicTrackingEvent, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                            {getStatusIcon(event.status)}
                          </div>
                          {index < trackingInfo.tracking_events.length - 1 && (
                            <div className="w-px h-8 bg-gray-300 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {formatDate(event.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm font-medium">
                            {event.description}
                          </p>
                          {event.location && (
                            <p className="text-xs text-gray-600 mt-1 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.location}
                            </p>
                          )}
                          {event.comment && (
                            <p className="text-xs text-gray-600 mt-1">
                              {event.comment}
                            </p>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No tracking events available yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipment Notes */}
          {shipmentNotes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Shipment Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500">
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(shipmentNotes, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle>Shipment Timestamps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Created At</Label>
                  <p className="text-sm bg-gray-100 p-2 rounded">
                    {formatDate(trackingInfo.created_at)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Updated</Label>
                  <p className="text-sm bg-gray-100 p-2 rounded">
                    {formatDate(trackingInfo.updated_at)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ShipLogicTracker;
