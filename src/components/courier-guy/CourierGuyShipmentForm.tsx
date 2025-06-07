import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Package, Truck } from "lucide-react";
import { toast } from "sonner";
import {
  createCourierGuyShipment,
  CourierGuyShipmentData,
  CourierGuyShipment,
  validateSAAddress,
} from "@/services/courierGuyService";

interface CourierGuyShipmentFormProps {
  onShipmentCreated?: (shipment: CourierGuyShipment) => void;
  initialData?: Partial<CourierGuyShipmentData>;
}

const CourierGuyShipmentForm = ({
  onShipmentCreated,
  initialData,
}: CourierGuyShipmentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shipment, setShipment] = useState<CourierGuyShipment | null>(null);
  const [formData, setFormData] = useState<CourierGuyShipmentData>({
    senderName: initialData?.senderName || "",
    senderAddress: initialData?.senderAddress || "",
    senderCity: initialData?.senderCity || "",
    senderProvince: initialData?.senderProvince || "",
    senderPostalCode: initialData?.senderPostalCode || "",
    senderPhone: initialData?.senderPhone || "",
    recipientName: initialData?.recipientName || "",
    recipientAddress: initialData?.recipientAddress || "",
    recipientCity: initialData?.recipientCity || "",
    recipientProvince: initialData?.recipientProvince || "",
    recipientPostalCode: initialData?.recipientPostalCode || "",
    recipientPhone: initialData?.recipientPhone || "",
    weight: initialData?.weight || 1,
    description: initialData?.description || "Textbook",
    value: initialData?.value || 100,
    reference: initialData?.reference || "",
  });

  const handleInputChange = (
    field: keyof CourierGuyShipmentData,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    // Validate sender address
    const senderValidation = validateSAAddress({
      street: formData.senderAddress,
      city: formData.senderCity,
      province: formData.senderProvince,
      postalCode: formData.senderPostalCode,
    });

    if (!senderValidation.isValid) {
      toast.error(
        `Sender address errors: ${senderValidation.errors.join(", ")}`,
      );
      return false;
    }

    // Validate recipient address
    const recipientValidation = validateSAAddress({
      street: formData.recipientAddress,
      city: formData.recipientCity,
      province: formData.recipientProvince,
      postalCode: formData.recipientPostalCode,
    });

    if (!recipientValidation.isValid) {
      toast.error(
        `Recipient address errors: ${recipientValidation.errors.join(", ")}`,
      );
      return false;
    }

    // Validate other required fields
    if (!formData.senderName.trim()) {
      toast.error("Sender name is required");
      return false;
    }

    if (!formData.recipientName.trim()) {
      toast.error("Recipient name is required");
      return false;
    }

    if (!formData.description.trim()) {
      toast.error("Package description is required");
      return false;
    }

    if (formData.weight <= 0) {
      toast.error("Weight must be greater than 0");
      return false;
    }

    if (formData.value <= 0) {
      toast.error("Package value must be greater than 0");
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
      const createdShipment = await createCourierGuyShipment(formData);
      setShipment(createdShipment);
      toast.success("Shipment created successfully!");

      if (onShipmentCreated) {
        onShipmentCreated(createdShipment);
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

  if (shipment) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center text-green-600">
            <Package className="mr-2 h-5 w-5" />
            Shipment Created Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Shipment ID</Label>
                <p className="text-sm bg-gray-100 p-2 rounded">{shipment.id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Tracking Number</Label>
                <p className="text-sm bg-gray-100 p-2 rounded">
                  {shipment.tracking_number}
                </p>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Status</Label>
              <p className="text-sm bg-blue-100 text-blue-800 p-2 rounded">
                {shipment.status}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium">Reference</Label>
              <p className="text-sm bg-gray-100 p-2 rounded">
                {shipment.reference}
              </p>
            </div>

            {shipment.estimated_delivery_date && (
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
            )}

            <Button
              onClick={() => setShipment(null)}
              variant="outline"
              className="w-full"
            >
              Create Another Shipment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="mr-2 h-5 w-5" />
          Create Courier Guy Shipment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sender Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Sender Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="senderName">Full Name *</Label>
                <Input
                  id="senderName"
                  value={formData.senderName}
                  onChange={(e) =>
                    handleInputChange("senderName", e.target.value)
                  }
                  placeholder="Enter sender's full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="senderPhone">Phone Number</Label>
                <Input
                  id="senderPhone"
                  value={formData.senderPhone}
                  onChange={(e) =>
                    handleInputChange("senderPhone", e.target.value)
                  }
                  placeholder="e.g., 0821234567"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="senderAddress">Street Address *</Label>
                <Input
                  id="senderAddress"
                  value={formData.senderAddress}
                  onChange={(e) =>
                    handleInputChange("senderAddress", e.target.value)
                  }
                  placeholder="Enter full street address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="senderCity">City *</Label>
                <Input
                  id="senderCity"
                  value={formData.senderCity}
                  onChange={(e) =>
                    handleInputChange("senderCity", e.target.value)
                  }
                  placeholder="Enter city"
                  required
                />
              </div>
              <div>
                <Label htmlFor="senderProvince">Province *</Label>
                <Input
                  id="senderProvince"
                  value={formData.senderProvince}
                  onChange={(e) =>
                    handleInputChange("senderProvince", e.target.value)
                  }
                  placeholder="e.g., Western Cape"
                  required
                />
              </div>
              <div>
                <Label htmlFor="senderPostalCode">Postal Code *</Label>
                <Input
                  id="senderPostalCode"
                  value={formData.senderPostalCode}
                  onChange={(e) =>
                    handleInputChange("senderPostalCode", e.target.value)
                  }
                  placeholder="4-digit postal code"
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Recipient Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Truck className="mr-2 h-4 w-4" />
              Recipient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipientName">Full Name *</Label>
                <Input
                  id="recipientName"
                  value={formData.recipientName}
                  onChange={(e) =>
                    handleInputChange("recipientName", e.target.value)
                  }
                  placeholder="Enter recipient's full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="recipientPhone">Phone Number</Label>
                <Input
                  id="recipientPhone"
                  value={formData.recipientPhone}
                  onChange={(e) =>
                    handleInputChange("recipientPhone", e.target.value)
                  }
                  placeholder="e.g., 0821234567"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="recipientAddress">Street Address *</Label>
                <Input
                  id="recipientAddress"
                  value={formData.recipientAddress}
                  onChange={(e) =>
                    handleInputChange("recipientAddress", e.target.value)
                  }
                  placeholder="Enter full street address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="recipientCity">City *</Label>
                <Input
                  id="recipientCity"
                  value={formData.recipientCity}
                  onChange={(e) =>
                    handleInputChange("recipientCity", e.target.value)
                  }
                  placeholder="Enter city"
                  required
                />
              </div>
              <div>
                <Label htmlFor="recipientProvince">Province *</Label>
                <Input
                  id="recipientProvince"
                  value={formData.recipientProvince}
                  onChange={(e) =>
                    handleInputChange("recipientProvince", e.target.value)
                  }
                  placeholder="e.g., Gauteng"
                  required
                />
              </div>
              <div>
                <Label htmlFor="recipientPostalCode">Postal Code *</Label>
                <Input
                  id="recipientPostalCode"
                  value={formData.recipientPostalCode}
                  onChange={(e) =>
                    handleInputChange("recipientPostalCode", e.target.value)
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  placeholder="e.g., 1.5"
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
                  placeholder="e.g., 250"
                  required
                />
              </div>
              <div>
                <Label htmlFor="reference">Reference (Optional)</Label>
                <Input
                  id="reference"
                  value={formData.reference}
                  onChange={(e) =>
                    handleInputChange("reference", e.target.value)
                  }
                  placeholder="Your reference number"
                />
              </div>
              <div className="md:col-span-3">
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="e.g., Mathematics Textbook Grade 12"
                  required
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Shipment...
              </>
            ) : (
              <>
                <Package className="mr-2 h-4 w-4" />
                Create Shipment
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourierGuyShipmentForm;
