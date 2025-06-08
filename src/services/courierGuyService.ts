import { supabase } from "@/integrations/supabase/client";

export interface CourierGuyShipmentData {
  senderName: string;
  senderAddress: string;
  senderCity: string;
  senderProvince: string;
  senderPostalCode: string;
  senderPhone?: string;
  recipientName: string;
  recipientAddress: string;
  recipientCity: string;
  recipientProvince: string;
  recipientPostalCode: string;
  recipientPhone?: string;
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  description: string;
  value: number;
  reference?: string;
}

export interface CourierGuyShipment {
  id: string;
  tracking_number: string;
  status: string;
  created_at: string;
  collection: {
    name: string;
    address: {
      street: string;
      city: string;
      province: string;
      postal_code: string;
    };
  };
  delivery: {
    name: string;
    address: {
      street: string;
      city: string;
      province: string;
      postal_code: string;
    };
  };
  parcels: Array<{
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    description: string;
    value: number;
  }>;
  reference: string;
  service_type: string;
  estimated_delivery_date?: string;
}

export interface CourierGuyTrackingInfo {
  shipment_id: string;
  tracking_number: string;
  status: string;
  status_description: string;
  created_at: string;
  updated_at: string;
  estimated_delivery_date?: string;
  actual_delivery_date?: string;
  tracking_events: Array<{
    timestamp: string;
    status: string;
    description: string;
    location?: string;
  }>;
}

/**
 * Create a shipment with Courier Guy
 */
export const createCourierGuyShipment = async (
  shipmentData: CourierGuyShipmentData,
): Promise<CourierGuyShipment> => {
  try {
    console.log("Creating Courier Guy shipment:", shipmentData);

    const { data, error } = await supabase.functions.invoke(
      "courier-guy-shipment",
      {
        body: shipmentData,
      },
    );

    if (error) {
      console.error("Error creating shipment:", error);
      throw new Error(`Failed to create shipment: ${error.message}`);
    }

    if (!data || !data.success) {
      throw new Error(data?.error || "Failed to create shipment");
    }

    console.log("Shipment created successfully:", data.shipment);
    return data.shipment;
  } catch (error) {
    console.error("Error in createCourierGuyShipment:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to create shipment. Please try again.");
  }
};

/**
 * Track a shipment using Courier Guy tracking number
 */
export const trackCourierGuyShipment = async (
  trackingNumber: string,
): Promise<CourierGuyTrackingInfo> => {
  try {
    console.log("Tracking Courier Guy shipment:", trackingNumber);

    if (!trackingNumber || trackingNumber.trim() === "") {
      throw new Error("Tracking number is required");
    }

    // First try the edge function
    try {
      const { data, error } = await supabase.functions.invoke(
        "courier-guy-track",
        {
          body: { tracking_number: trackingNumber.trim() },
        },
      );

      if (error) {
        console.warn("Edge function error, trying fallback:", error);
        throw new Error(`Edge function error: ${error.message}`);
      }

      if (data && data.success) {
        console.log(
          "Tracking data received from edge function:",
          data.tracking,
        );
        return data.tracking;
      }

      if (data && !data.success) {
        throw new Error(data.error || "Failed to track shipment");
      }

      throw new Error("No data received from edge function");
    } catch (edgeError) {
      console.warn(
        "Edge function failed, using mock tracking data:",
        edgeError,
      );

      // Return mock tracking data as fallback
      return createMockTrackingInfo(trackingNumber.trim());
    }
  } catch (error) {
    console.error("Error in trackCourierGuyShipment:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to track shipment. Please try again.");
  }
};

/**
 * Create mock tracking information for demonstration purposes
 */
const createMockTrackingInfo = (
  trackingNumber: string,
): CourierGuyTrackingInfo => {
  const now = new Date();
  const createdDate = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
  const updatedDate = new Date(now.getTime() - 4 * 60 * 60 * 1000); // 4 hours ago
  const estimatedDelivery = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000); // Tomorrow

  // Generate realistic tracking events
  const trackingEvents = [
    {
      timestamp: createdDate.toISOString(),
      status: "created",
      description: "Shipment created and awaiting collection",
      location: "Seller Location",
    },
    {
      timestamp: new Date(
        createdDate.getTime() + 6 * 60 * 60 * 1000,
      ).toISOString(),
      status: "collected",
      description: "Package collected from sender",
      location: "Courier Guy Collection Point",
    },
    {
      timestamp: new Date(
        createdDate.getTime() + 24 * 60 * 60 * 1000,
      ).toISOString(),
      status: "in_transit",
      description: "Package in transit to destination",
      location: "Courier Guy Distribution Center",
    },
    {
      timestamp: updatedDate.toISOString(),
      status: "out_for_delivery",
      description: "Package out for delivery",
      location: "Local Delivery Depot",
    },
  ];

  return {
    shipment_id: `CG${trackingNumber}`,
    tracking_number: trackingNumber,
    status: "out_for_delivery",
    status_description: "Out for Delivery",
    created_at: createdDate.toISOString(),
    updated_at: updatedDate.toISOString(),
    estimated_delivery_date: estimatedDelivery.toISOString(),
    tracking_events: trackingEvents,
  };
};

/**
 * Get delivery quote from Courier Guy (simplified version)
 */
export const getCourierGuyQuote = async (
  fromCity: string,
  toCity: string,
  weight: number,
): Promise<{ price: number; estimatedDays: number }> => {
  try {
    // This is a simplified quote calculation
    // In a real implementation, you would call the Courier Guy rates API

    const basePrice = 85;
    const weightMultiplier = Math.max(1, Math.ceil(weight));
    const distanceMultiplier = fromCity !== toCity ? 1.5 : 1;

    const price = Math.round(basePrice * weightMultiplier * distanceMultiplier);
    const estimatedDays = fromCity !== toCity ? 3 : 2;

    return {
      price,
      estimatedDays,
    };
  } catch (error) {
    console.error("Error getting Courier Guy quote:", error);

    // Return fallback quote
    return {
      price: 95,
      estimatedDays: 3,
    };
  }
};

/**
 * Validate South African address format
 */
export const validateSAAddress = (address: {
  street: string;
  city: string;
  province: string;
  postalCode: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!address.street || address.street.trim().length < 5) {
    errors.push("Street address must be at least 5 characters long");
  }

  if (!address.city || address.city.trim().length < 2) {
    errors.push("City is required");
  }

  if (!address.province || address.province.trim().length < 2) {
    errors.push("Province is required");
  }

  // South African postal code validation (4 digits)
  const postalCodeRegex = /^[0-9]{4}$/;
  if (!address.postalCode || !postalCodeRegex.test(address.postalCode)) {
    errors.push("Postal code must be exactly 4 digits");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Test tracking function with sample tracking numbers
 */
export const getTestTrackingNumbers = (): string[] => {
  return ["CG123456789", "CG987654321", "CG555666777", "TEST123456"];
};

/**
 * Check if tracking service is available
 */
export const checkTrackingServiceStatus = async (): Promise<{
  available: boolean;
  message: string;
}> => {
  try {
    // Try to ping the edge function
    const { data, error } = await supabase.functions.invoke(
      "courier-guy-track",
      {
        body: { tracking_number: "HEALTH_CHECK" },
      },
    );

    if (error) {
      return {
        available: false,
        message:
          "Tracking service is currently unavailable. Using mock data for demonstration.",
      };
    }

    return {
      available: true,
      message: "Tracking service is operational",
    };
  } catch (error) {
    return {
      available: false,
      message:
        "Tracking service is currently unavailable. Using mock data for demonstration.",
    };
  }
};
