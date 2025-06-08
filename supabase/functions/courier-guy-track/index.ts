import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body to get tracking number
    let trackingId: string;

    try {
      const body = await req.json();

      // Handle health check
      if (body.tracking_number === "HEALTH_CHECK") {
        return new Response(
          JSON.stringify({
            success: true,
            message: "Tracking service is operational",
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          },
        );
      }

      trackingId = body.tracking_number;
    } catch (parseError) {
      // Try to get from URL path as fallback
      const url = new URL(req.url);
      trackingId = url.pathname.split("/").pop() || "";
    }

    if (!trackingId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Tracking number is required",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    console.log("Tracking shipment:", trackingId);

    // Check if API key is configured
    const COURIER_GUY_API_KEY = Deno.env.get("COURIER_GUY_API_KEY");

    if (!COURIER_GUY_API_KEY) {
      console.warn("Courier Guy API key not configured, returning mock data");

      // Return mock tracking data for demonstration
      const mockTrackingData = {
        shipment_id: `CG${trackingId}`,
        tracking_number: trackingId,
        status: "out_for_delivery",
        status_description: "Out for Delivery",
        created_at: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        estimated_delivery_date: new Date(
          Date.now() + 1 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        tracking_events: [
          {
            timestamp: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            status: "created",
            description: "Shipment created and awaiting collection",
            location: "Seller Location",
          },
          {
            timestamp: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000,
            ).toISOString(),
            status: "collected",
            description: "Package collected from sender",
            location: "Courier Guy Collection Point",
          },
          {
            timestamp: new Date(
              Date.now() - 1 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            status: "in_transit",
            description: "Package in transit to destination",
            location: "Courier Guy Distribution Center",
          },
          {
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            status: "out_for_delivery",
            description: "Package out for delivery",
            location: "Local Delivery Depot",
          },
        ],
      };

      return new Response(
        JSON.stringify({
          success: true,
          tracking: mockTrackingData,
          note: "Mock data - API key not configured",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    // Try to call the actual Courier Guy API
    try {
      const response = await fetch(
        `https://api.courierguy.co.za/v1/shipments/${trackingId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${COURIER_GUY_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Courier Guy tracking API error:", errorText);

        if (response.status === 404) {
          return new Response(
            JSON.stringify({
              success: false,
              error: "Shipment not found",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 404,
            },
          );
        }

        throw new Error(
          `Courier Guy API error: ${response.status} - ${errorText}`,
        );
      }

      const trackingData = await response.json();
      console.log("Tracking data received from Courier Guy API:", trackingData);

      return new Response(
        JSON.stringify({
          success: true,
          tracking: trackingData,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    } catch (apiError) {
      console.error("Courier Guy API call failed:", apiError);

      // Return mock data as fallback when API fails
      const fallbackTrackingData = {
        shipment_id: `CG${trackingId}`,
        tracking_number: trackingId,
        status: "in_transit",
        status_description: "In Transit",
        created_at: new Date(
          Date.now() - 1 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        estimated_delivery_date: new Date(
          Date.now() + 2 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        tracking_events: [
          {
            timestamp: new Date(
              Date.now() - 1 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            status: "created",
            description: "Shipment created",
            location: "Origin",
          },
          {
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            status: "in_transit",
            description: "Package in transit",
            location: "Distribution Center",
          },
        ],
      };

      return new Response(
        JSON.stringify({
          success: true,
          tracking: fallbackTrackingData,
          note: "Fallback data - API temporarily unavailable",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }
  } catch (error) {
    console.error("Error in tracking function:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Internal server error",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
