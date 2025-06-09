import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Loader2,
  Package,
  Truck,
  CalendarIcon,
  Download,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  createShipLogicShipment,
  validateShipLogicAddress,
  SHIPLOGIC_SERVICE_LEVELS,
} from "@/services/shipLogicService";
import {
  ShipLogicShipmentFormData,
  ShipLogicShipmentResponse,
} from "@/types/shiplogic";

interface ShipLogicShipmentFormProps {
  onShipmentCreated?: (shipment: ShipLogicShipmentResponse) => void;
  initialData?: Partial<ShipLogicShipmentFormData>;
}

const ShipLogicShipmentForm = ({
  onShipmentCreated,
  initialData,
}: ShipLogicShipmentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shipmentResponse, setShipmentResponse] =
    useState<ShipLogicShipmentResponse | null>(null);
  const [collectionDate, setCollectionDate] = useState<Date | undefined>(
    initialData?.collectionDate
      ? new Date(initialData.collectionDate)
      : undefined,
  );

  const [formData, setFormData] = useState<ShipLogicShipmentFormData>({
    // Collection details
    collectionName: initialData?.collectionName || "",
    collectionPhone: initialData?.collectionPhone || "",
    collectionEmail: initialData?.collectionEmail || "",
    collectionStreet: initialData?.collectionStreet || "",
    collectionSuburb: initialData?.collectionSuburb || "",
    collectionCity: initialData?.collectionCity || "",
    collectionProvince: initialData?.collectionProvince || "",
    collectionPostalCode: initialData?.collectionPostalCode || "",
    collectionCompany: initialData?.collectionCompany || "",

    // Delivery details
    deliveryName: initialData?.deliveryName || "",
    deliveryPhone: initialData?.deliveryPhone || "",
    deliveryEmail: initialData?.deliveryEmail || "",
    deliveryStreet: initialData?.deliveryStreet || "",
    deliverySuburb: initialData?.deliverySuburb || "",
    deliveryCity: initialData?.deliveryCity || "",
    deliveryProvince: initialData?.deliveryProvince || "",
    deliveryPostalCode: initialData?.deliveryPostalCode || "",
    deliveryCompany: initialData?.deliveryCompany || "",

    // Parcel details
    weight: initialData?.weight || 1,
    length: initialData?.length || 25,
    width: initialData?.width || 20,
    height: initialData?.height || 5,
    description: initialData?.description || "Textbook",
    value: initialData?.value || 100,
    reference: initialData?.reference || "",

    // Service options
    serviceLevelCode: initialData?.serviceLevelCode || "ECO",
    collectionDate: initialData?.collectionDate || "",
    collectionAfter: initialData?.collectionAfter || "08:00",
    collectionBefore: initialData?.collectionBefore || "16:00",
    deliveryAfter: initialData?.deliveryAfter || "10:00",
    deliveryBefore: initialData?.deliveryBefore || "17:00",
  });

  const handleInputChange = (
    field: keyof ShipLogicShipmentFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    // Validate collection address
    const collectionValidation = validateShipLogicAddress({
      street: formData.collectionStreet,
      suburb: formData.collectionSuburb,
      city: formData.collectionCity,
      province: formData.collectionProvince,
      postalCode: formData.collectionPostalCode,
    });

    if (!collectionValidation.isValid) {
      toast.error(
        `Collection address errors: ${collectionValidation.errors.join(", ")}`,
      );
      return false;
    }

    // Validate delivery address
    const deliveryValidation = validateShipLogicAddress({
      street: formData.deliveryStreet,
      suburb: formData.deliverySuburb,
      city: formData.deliveryCity,
      province: formData.deliveryProvince,
      postalCode: formData.deliveryPostalCode,
    });

    if (!deliveryValidation.isValid) {
      toast.error(
        `Delivery address errors: ${deliveryValidation.errors.join(", ")}`,
      );
      return false;
    }

    // Validate contact details
    if (!formData.collectionName.trim()) {
      toast.error("Collection contact name is required");
      return false;
    }

    if (!formData.collectionPhone.trim()) {
      toast.error("Collection contact phone is required");
      return false;
    }

    if (!formData.collectionEmail.trim()) {
      toast.error("Collection contact email is required");
      return false;
    }

    if (!formData.deliveryName.trim()) {
      toast.error("Delivery contact name is required");
      return false;
    }

    if (!formData.deliveryPhone.trim()) {
      toast.error("Delivery contact phone is required");
      return false;
    }

    if (!formData.deliveryEmail.trim()) {
      toast.error("Delivery contact email is required");
      return false;
    }

    // Validate parcel details
    if (!formData.description.trim()) {
      toast.error("Package description is required");
      return false;
    }

    if (formData.weight <= 0) {
      toast.error("Weight must be greater than 0");
      return false;
    }

    if (formData.length <= 0 || formData.width <= 0 || formData.height <= 0) {
      toast.error("All dimensions must be greater than 0");
      return false;
    }

    if (formData.value <= 0) {
      toast.error("Package value must be greater than 0");
      return false;
    }

    if (!formData.collectionDate) {
      toast.error("Collection date is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const shipmentData = {
        ...formData,
        collectionDate: collectionDate
          ? collectionDate.toISOString()
          : formData.collectionDate,
      };

      const response = await createShipLogicShipment(shipmentData);
      setShipmentResponse(response);
      toast.success("Shipment created successfully!");

      if (onShipmentCreated) {
        onShipmentCreated(response);
      }
    } catch (error) {
      console.error("Error creating shipment:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create shipment";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (shipmentResponse) {
    const { shipment, waybill_pdf_url } = shipmentResponse;

    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center text-green-600">
            <Package className="mr-2 h-5 w-5" />
            Shipment Created Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Shipment ID</Label>
                <p className="text-sm bg-gray-100 p-2 rounded">{shipment.id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Waybill Number</Label>
                <p className="text-sm bg-gray-100 p-2 rounded">
                  {shipment.waybill_number}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <p className="text-sm bg-blue-100 text-blue-800 p-2 rounded">
                  {shipment.status}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Service Level</Label>
                <p className="text-sm bg-gray-100 p-2 rounded">
                  {SHIPLOGIC_SERVICE_LEVELS.find(
                    (s) => s.code === shipment.service_level_code,
                  )?.name || shipment.service_level_code}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Collection Date</Label>
                <p className="text-sm bg-gray-100 p-2 rounded">
                  {new Date(shipment.collection_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">
                  Estimated Delivery
                </Label>
                <p className="text-sm bg-gray-100 p-2 rounded">
                  {new Date(
                    shipment.estimated_delivery_date,
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            {shipment.customer_reference && (
              <div>
                <Label className="text-sm font-medium">Reference</Label>
                <p className="text-sm bg-gray-100 p-2 rounded">
                  {shipment.customer_reference}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {waybill_pdf_url && (
                <Button
                  onClick={() => window.open(waybill_pdf_url, "_blank")}
                  variant="outline"
                  className="flex items-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Waybill
                </Button>
              )}

              {shipment.tracking_url && (
                <Button
                  onClick={() => window.open(shipment.tracking_url, "_blank")}
                  variant="outline"
                  className="flex items-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Track Shipment
                </Button>
              )}

              <Button
                onClick={() => setShipmentResponse(null)}
                variant="outline"
                className="flex-1"
              >
                Create Another Shipment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="mr-2 h-5 w-5" />
          Create ShipLogic Shipment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Collection Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Collection Information
            </h3>

            {/* Collection Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="collectionName">Contact Name *</Label>
                <Input
                  id="collectionName"
                  value={formData.collectionName}
                  onChange={(e) =>
                    handleInputChange("collectionName", e.target.value)
                  }
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="collectionPhone">Phone Number *</Label>
                <Input
                  id="collectionPhone"
                  value={formData.collectionPhone}
                  onChange={(e) =>
                    handleInputChange("collectionPhone", e.target.value)
                  }
                  placeholder="e.g., 0821234567"
                  required
                />
              </div>
              <div>
                <Label htmlFor="collectionEmail">Email Address *</Label>
                <Input
                  id="collectionEmail"
                  type="email"
                  value={formData.collectionEmail}
                  onChange={(e) =>
                    handleInputChange("collectionEmail", e.target.value)
                  }
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            {/* Collection Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="collectionCompany">Company (Optional)</Label>
                <Input
                  id="collectionCompany"
                  value={formData.collectionCompany}
                  onChange={(e) =>
                    handleInputChange("collectionCompany", e.target.value)
                  }
                  placeholder="Company name"
                />
              </div>
              <div></div>
              <div className="md:col-span-2">
                <Label htmlFor="collectionStreet">Street Address *</Label>
                <Input
                  id="collectionStreet"
                  value={formData.collectionStreet}
                  onChange={(e) =>
                    handleInputChange("collectionStreet", e.target.value)
                  }
                  placeholder="Street address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="collectionSuburb">Suburb *</Label>
                <Input
                  id="collectionSuburb"
                  value={formData.collectionSuburb}
                  onChange={(e) =>
                    handleInputChange("collectionSuburb", e.target.value)
                  }
                  placeholder="Suburb/Area"
                  required
                />
              </div>
              <div>
                <Label htmlFor="collectionCity">City *</Label>
                <Input
                  id="collectionCity"
                  value={formData.collectionCity}
                  onChange={(e) =>
                    handleInputChange("collectionCity", e.target.value)
                  }
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <Label htmlFor="collectionProvince">Province *</Label>
                <Input
                  id="collectionProvince"
                  value={formData.collectionProvince}
                  onChange={(e) =>
                    handleInputChange("collectionProvince", e.target.value)
                  }
                  placeholder="Province"
                  required
                />
              </div>
              <div>
                <Label htmlFor="collectionPostalCode">Postal Code *</Label>
                <Input
                  id="collectionPostalCode"
                  value={formData.collectionPostalCode}
                  onChange={(e) =>
                    handleInputChange("collectionPostalCode", e.target.value)
                  }
                  placeholder="4-digit postal code"
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Delivery Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Truck className="mr-2 h-4 w-4" />
              Delivery Information
            </h3>

            {/* Delivery Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="deliveryName">Contact Name *</Label>
                <Input
                  id="deliveryName"
                  value={formData.deliveryName}
                  onChange={(e) =>
                    handleInputChange("deliveryName", e.target.value)
                  }
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="deliveryPhone">Phone Number *</Label>
                <Input
                  id="deliveryPhone"
                  value={formData.deliveryPhone}
                  onChange={(e) =>
                    handleInputChange("deliveryPhone", e.target.value)
                  }
                  placeholder="e.g., 0821234567"
                  required
                />
              </div>
              <div>
                <Label htmlFor="deliveryEmail">Email Address *</Label>
                <Input
                  id="deliveryEmail"
                  type="email"
                  value={formData.deliveryEmail}
                  onChange={(e) =>
                    handleInputChange("deliveryEmail", e.target.value)
                  }
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deliveryCompany">Company (Optional)</Label>
                <Input
                  id="deliveryCompany"
                  value={formData.deliveryCompany}
                  onChange={(e) =>
                    handleInputChange("deliveryCompany", e.target.value)
                  }
                  placeholder="Company name"
                />
              </div>
              <div></div>
              <div className="md:col-span-2">
                <Label htmlFor="deliveryStreet">Street Address *</Label>
                <Input
                  id="deliveryStreet"
                  value={formData.deliveryStreet}
                  onChange={(e) =>
                    handleInputChange("deliveryStreet", e.target.value)
                  }
                  placeholder="Street address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="deliverySuburb">Suburb *</Label>
                <Input
                  id="deliverySuburb"
                  value={formData.deliverySuburb}
                  onChange={(e) =>
                    handleInputChange("deliverySuburb", e.target.value)
                  }
                  placeholder="Suburb/Area"
                  required
                />
              </div>
              <div>
                <Label htmlFor="deliveryCity">City *</Label>
                <Input
                  id="deliveryCity"
                  value={formData.deliveryCity}
                  onChange={(e) =>
                    handleInputChange("deliveryCity", e.target.value)
                  }
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <Label htmlFor="deliveryProvince">Province *</Label>
                <Input
                  id="deliveryProvince"
                  value={formData.deliveryProvince}
                  onChange={(e) =>
                    handleInputChange("deliveryProvince", e.target.value)
                  }
                  placeholder="Province"
                  required
                />
              </div>
              <div>
                <Label htmlFor="deliveryPostalCode">Postal Code *</Label>
                <Input
                  id="deliveryPostalCode"
                  value={formData.deliveryPostalCode}
                  onChange={(e) =>
                    handleInputChange("deliveryPostalCode", e.target.value)
                  }
                  placeholder="4-digit postal code"
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Package Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Package Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) =>
                    handleInputChange("weight", parseFloat(e.target.value) || 0)
                  }
                  placeholder="1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="length">Length (cm) *</Label>
                <Input
                  id="length"
                  type="number"
                  min="1"
                  value={formData.length}
                  onChange={(e) =>
                    handleInputChange("length", parseFloat(e.target.value) || 0)
                  }
                  placeholder="25"
                  required
                />
              </div>
              <div>
                <Label htmlFor="width">Width (cm) *</Label>
                <Input
                  id="width"
                  type="number"
                  min="1"
                  value={formData.width}
                  onChange={(e) =>
                    handleInputChange("width", parseFloat(e.target.value) || 0)
                  }
                  placeholder="20"
                  required
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm) *</Label>
                <Input
                  id="height"
                  type="number"
                  min="1"
                  value={formData.height}
                  onChange={(e) =>
                    handleInputChange("height", parseFloat(e.target.value) || 0)
                  }
                  placeholder="5"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Mathematics Textbook Grade 12"
                  required
                />
              </div>
              <div>
                <Label htmlFor="value">Value (ZAR) *</Label>
                <Input
                  id="value"
                  type="number"
                  min="1"
                  value={formData.value}
                  onChange={(e) =>
                    handleInputChange("value", parseFloat(e.target.value) || 0)
                  }
                  placeholder="250"
                  required
                />
              </div>
              <div>
                <Label htmlFor="reference">Reference</Label>
                <Input
                  id="reference"
                  value={formData.reference}
                  onChange={(e) =>
                    handleInputChange("reference", e.target.value)
                  }
                  placeholder="Order #123"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Service Options */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="serviceLevelCode">Service Level *</Label>
                <Select
                  value={formData.serviceLevelCode}
                  onValueChange={(value) =>
                    handleInputChange("serviceLevelCode", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service level" />
                  </SelectTrigger>
                  <SelectContent>
                    {SHIPLOGIC_SERVICE_LEVELS.map((service) => (
                      <SelectItem key={service.code} value={service.code}>
                        <div className="flex flex-col">
                          <span className="font-medium">{service.name}</span>
                          <span className="text-xs text-gray-500">
                            {service.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Collection Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !collectionDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {collectionDate
                        ? format(collectionDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={collectionDate}
                      onSelect={(date) => {
                        setCollectionDate(date);
                        if (date) {
                          handleInputChange(
                            "collectionDate",
                            date.toISOString(),
                          );
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div></div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="collectionAfter">Collection After</Label>
                  <Input
                    id="collectionAfter"
                    type="time"
                    value={formData.collectionAfter}
                    onChange={(e) =>
                      handleInputChange("collectionAfter", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="collectionBefore">Collection Before</Label>
                  <Input
                    id="collectionBefore"
                    type="time"
                    value={formData.collectionBefore}
                    onChange={(e) =>
                      handleInputChange("collectionBefore", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="deliveryAfter">Delivery After</Label>
                  <Input
                    id="deliveryAfter"
                    type="time"
                    value={formData.deliveryAfter}
                    onChange={(e) =>
                      handleInputChange("deliveryAfter", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryBefore">Delivery Before</Label>
                  <Input
                    id="deliveryBefore"
                    type="time"
                    value={formData.deliveryBefore}
                    onChange={(e) =>
                      handleInputChange("deliveryBefore", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Shipment...
              </>
            ) : (
              <>
                <Package className="mr-2 h-4 w-4" />
                Create ShipLogic Shipment
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShipLogicShipmentForm;
