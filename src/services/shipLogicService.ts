import axios, { AxiosInstance } from "axios";
import {
  ShipLogicRateRequest,
  ShipLogicRateResponse,
  ShipLogicShipmentRequest,
  ShipLogicShipmentResponse,
  ShipLogicTrackingResponse,
  ShipLogicShipmentFormData,
  ShipLogicQuoteRequest,
  ShipLogicRate,
  ShipLogicServiceLevel,
  ShipLogicAddress,
  ShipLogicParcel,
  ShipLogicContact,
} from "@/types/shiplogic";

const SHIPLOGIC_BASE_URL = "https://api.shiplogic.com/v2";
const SHIPLOGIC_API_KEY = "09c881d9d88b450e8440f3e22e4d40ab";

// Create axios client for ShipLogic API
const shiplogicClient: AxiosInstance = axios.create({
  baseURL: SHIPLOGIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${SHIPLOGIC_API_KEY}`,
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
});

// Add request/response interceptors for logging and error handling
shiplogicClient.interceptors.request.use(
  (config) => {
    console.log("ShipLogic API Request:", {
      url: config.url,
      method: config.method,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("ShipLogic API Request Error:", error);
    return Promise.reject(error);
  },
);

shiplogicClient.interceptors.response.use(
  (response) => {
    console.log("ShipLogic API Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("ShipLogic API Response Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  },
);

/**
 * Available service levels for ShipLogic
 */
export const SHIPLOGIC_SERVICE_LEVELS: ShipLogicServiceLevel[] = [
  {
    code: "ECO",
    name: "Economy",
    description: "Standard delivery service (3-5 business days)",
    features: ["Cost-effective", "Standard tracking", "3-5 business days"],
  },
  {
    code: "STD",
    name: "Standard",
    description: "Reliable delivery service (2-3 business days)",
    features: ["Faster delivery", "Enhanced tracking", "2-3 business days"],
  },
  {
    code: "EXP",
    name: "Express",
    description: "Fast delivery service (1-2 business days)",
    features: ["Next-day delivery", "Priority handling", "1-2 business days"],
  },
  {
    code: "OVN",
    name: "Overnight",
    description: "Next business day delivery",
    features: ["Guaranteed next day", "Premium service", "1 business day"],
  },
];

/**
 * Convert form data to ShipLogic address format
 */
const convertToShipLogicAddress = (
  street: string,
  suburb: string,
  city: string,
  province: string,
  postalCode: string,
  company?: string,
): ShipLogicAddress => ({
  type: company ? "business" : "residential",
  company: company || "",
  street_address: street,
  local_area: suburb,
  city: city,
  zone: province,
  country: "ZA",
  code: postalCode,
});

/**
 * Convert form data to ShipLogic contact format
 */
const convertToShipLogicContact = (
  name: string,
  phone: string,
  email: string,
): ShipLogicContact => ({
  name,
  mobile_number: phone,
  email,
});

/**
 * Convert form data to ShipLogic parcel format
 */
const convertToShipLogicParcel = (
  weight: number,
  length: number,
  width: number,
  height: number,
  description: string,
): ShipLogicParcel => ({
  packaging: "BookBox",
  parcel_description: description,
  submitted_length_cm: length,
  submitted_width_cm: width,
  submitted_height_cm: height,
  submitted_weight_kg: weight,
});

/**
 * Get shipping rate quotes from ShipLogic
 */
export const getShipLogicRates = async (
  request: ShipLogicQuoteRequest,
): Promise<ShipLogicRate[]> => {
  try {
    const collectionAddress = convertToShipLogicAddress(
      request.fromAddress.street,
      request.fromAddress.suburb,
      request.fromAddress.city,
      request.fromAddress.province,
      request.fromAddress.postalCode,
    );

    const deliveryAddress = convertToShipLogicAddress(
      request.toAddress.street,
      request.toAddress.suburb,
      request.toAddress.city,
      request.toAddress.province,
      request.toAddress.postalCode,
    );

    const parcel = convertToShipLogicParcel(
      request.parcel.weight,
      request.parcel.length,
      request.parcel.width,
      request.parcel.height,
      request.parcel.description,
    );

    // Set collection date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const collectionDate = tomorrow.toISOString();

    const rateRequest: ShipLogicRateRequest = {
      collection_address: collectionAddress,
      delivery_address: deliveryAddress,
      parcels: [parcel],
      declared_value: request.parcel.value || 100,
      collection_min_date: collectionDate,
      collection_after: "08:00",
      collection_before: "16:00",
      delivery_after: "10:00",
      delivery_before: "17:00",
      service_level_code: "ECO", // Default service level for quotes
    };

    console.log("Getting ShipLogic rates with request:", rateRequest);

    const response = await shiplogicClient.post<ShipLogicRateResponse>(
      "/rates",
      rateRequest,
    );

    if (response.data.errors && response.data.errors.length > 0) {
      throw new Error(
        `ShipLogic rate error: ${response.data.errors.join(", ")}`,
      );
    }

    console.log("ShipLogic rates received:", response.data.rates);
    return response.data.rates || [];
  } catch (error) {
    console.error("Error fetching ShipLogic rates:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
      throw new Error(`Failed to get shipping rates: ${errorMessage}`);
    }

    throw new Error("Failed to get shipping rates. Please try again.");
  }
};

/**
 * Create a shipment with ShipLogic
 */
export const createShipLogicShipment = async (
  formData: ShipLogicShipmentFormData,
): Promise<ShipLogicShipmentResponse> => {
  try {
    const collectionAddress = convertToShipLogicAddress(
      formData.collectionStreet,
      formData.collectionSuburb,
      formData.collectionCity,
      formData.collectionProvince,
      formData.collectionPostalCode,
      formData.collectionCompany,
    );

    const deliveryAddress = convertToShipLogicAddress(
      formData.deliveryStreet,
      formData.deliverySuburb,
      formData.deliveryCity,
      formData.deliveryProvince,
      formData.deliveryPostalCode,
      formData.deliveryCompany,
    );

    const collectionContact = convertToShipLogicContact(
      formData.collectionName,
      formData.collectionPhone,
      formData.collectionEmail,
    );

    const deliveryContact = convertToShipLogicContact(
      formData.deliveryName,
      formData.deliveryPhone,
      formData.deliveryEmail,
    );

    const parcel = convertToShipLogicParcel(
      formData.weight,
      formData.length,
      formData.width,
      formData.height,
      formData.description,
    );

    const shipmentRequest: ShipLogicShipmentRequest = {
      collection_address: collectionAddress,
      collection_contact: collectionContact,
      delivery_address: deliveryAddress,
      delivery_contact: deliveryContact,
      parcels: [parcel],
      declared_value: formData.value,
      collection_min_date: formData.collectionDate,
      collection_after: formData.collectionAfter,
      collection_before: formData.collectionBefore,
      delivery_after: formData.deliveryAfter,
      delivery_before: formData.deliveryBefore,
      service_level_code: formData.serviceLevelCode,
      customer_reference: formData.reference || "",
      mute_notifications: false,
    };

    console.log("Creating ShipLogic shipment with request:", shipmentRequest);

    const response = await shiplogicClient.post<ShipLogicShipmentResponse>(
      "/shipments",
      shipmentRequest,
    );

    if (response.data.errors && response.data.errors.length > 0) {
      throw new Error(
        `ShipLogic shipment error: ${response.data.errors.join(", ")}`,
      );
    }

    console.log("ShipLogic shipment created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating ShipLogic shipment:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
      throw new Error(`Failed to create shipment: ${errorMessage}`);
    }

    throw new Error("Failed to create shipment. Please try again.");
  }
};

/**
 * Track a shipment using ShipLogic shipment ID
 */
export const trackShipLogicShipment = async (
  shipmentId: string,
): Promise<ShipLogicTrackingResponse> => {
  try {
    console.log("Tracking ShipLogic shipment:", shipmentId);

    const response = await shiplogicClient.get<ShipLogicTrackingResponse>(
      `/shipments/${shipmentId}`,
    );

    if (response.data.errors && response.data.errors.length > 0) {
      throw new Error(
        `ShipLogic tracking error: ${response.data.errors.join(", ")}`,
      );
    }

    console.log("ShipLogic tracking data received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error tracking ShipLogic shipment:", error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Shipment not found. Please check your shipment ID.");
      }

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
      throw new Error(`Failed to track shipment: ${errorMessage}`);
    }

    throw new Error("Failed to track shipment. Please try again.");
  }
};

/**
 * Get shipment notes from ShipLogic
 */
export const getShipLogicShipmentNotes = async (
  shipmentId: string,
): Promise<Record<string, unknown>> => {
  try {
    console.log("Getting ShipLogic shipment notes:", shipmentId);

    const response = await shiplogicClient.get(
      `/shipments/notes/external?shipment_id=${shipmentId}`,
    );

    console.log("ShipLogic shipment notes received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting ShipLogic shipment notes:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
      throw new Error(`Failed to get shipment notes: ${errorMessage}`);
    }

    throw new Error("Failed to get shipment notes. Please try again.");
  }
};

/**
 * Cancel a ShipLogic shipment
 */
export const cancelShipLogicShipment = async (
  shipmentId: string,
): Promise<Record<string, unknown>> => {
  try {
    console.log("Cancelling ShipLogic shipment:", shipmentId);

    const response = await shiplogicClient.put(
      `/shipments/${shipmentId}/cancel`,
    );

    console.log("ShipLogic shipment cancelled:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error cancelling ShipLogic shipment:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
      throw new Error(`Failed to cancel shipment: ${errorMessage}`);
    }

    throw new Error("Failed to cancel shipment. Please try again.");
  }
};

/**
 * Get available service levels from ShipLogic
 */
export const getShipLogicServiceLevels = async (): Promise<
  ShipLogicServiceLevel[]
> => {
  try {
    console.log("Getting ShipLogic service levels");

    const response = await shiplogicClient.get("/service-levels");

    console.log("ShipLogic service levels received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting ShipLogic service levels:", error);

    // Return default service levels if API call fails
    return SHIPLOGIC_SERVICE_LEVELS;
  }
};

/**
 * Validate South African address format for ShipLogic
 */
export const validateShipLogicAddress = (address: {
  street: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!address.street || address.street.trim().length < 5) {
    errors.push("Street address must be at least 5 characters long");
  }

  if (!address.suburb || address.suburb.trim().length < 2) {
    errors.push("Suburb/Local area is required");
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
 * Get a simplified quote for quick estimates
 */
export const getShipLogicQuickQuote = async (
  fromCity: string,
  toCity: string,
  weight: number,
): Promise<{ price: number; estimatedDays: number; serviceName: string }> => {
  try {
    // Create a simplified request for quick quotes
    const quickRequest: ShipLogicQuoteRequest = {
      fromAddress: {
        street: "123 Main Street",
        suburb: "City Centre",
        city: fromCity,
        province: "Gauteng", // Default province
        postalCode: "2000", // Default postal code
      },
      toAddress: {
        street: "123 Main Street",
        suburb: "City Centre",
        city: toCity,
        province: "Western Cape", // Default province
        postalCode: "8000", // Default postal code
      },
      parcel: {
        weight: weight,
        length: 25, // Default book dimensions
        width: 20,
        height: 5,
        description: "Textbook",
        value: 100,
      },
    };

    const rates = await getShipLogicRates(quickRequest);

    if (rates.length > 0) {
      // Return the first (usually cheapest) rate
      const rate = rates[0];
      return {
        price: Math.round(rate.total_charge_value),
        estimatedDays: rate.transit_days,
        serviceName: rate.service_level_name,
      };
    } else {
      // Fallback calculation if no rates returned
      const basePrice = 95;
      const weightMultiplier = Math.max(1, Math.ceil(weight));
      const distanceMultiplier = fromCity !== toCity ? 1.3 : 1;

      return {
        price: Math.round(basePrice * weightMultiplier * distanceMultiplier),
        estimatedDays: fromCity !== toCity ? 3 : 2,
        serviceName: "Economy",
      };
    }
  } catch (error) {
    console.error("Error getting ShipLogic quick quote:", error);

    // Return fallback quote
    const basePrice = 95;
    const weightMultiplier = Math.max(1, Math.ceil(weight));
    const distanceMultiplier = fromCity !== toCity ? 1.3 : 1;

    return {
      price: Math.round(basePrice * weightMultiplier * distanceMultiplier),
      estimatedDays: fromCity !== toCity ? 3 : 2,
      serviceName: "Economy",
    };
  }
};
