
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DeliveryAddress {
  streetAddress: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
}

interface QuoteRequest {
  fromAddress: DeliveryAddress;
  toAddress: DeliveryAddress;
  weight: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { fromAddress, toAddress, weight }: QuoteRequest = await req.json()
    
    console.log("Getting quotes for delivery:", { fromAddress, toAddress, weight });

    const quotes = [];

    // Get Fastway quote
    try {
      const fastwayResponse = await getFastwayQuote(fromAddress, toAddress, weight);
      if (fastwayResponse) {
        quotes.push({
          courier: 'fastway',
          price: fastwayResponse.price,
          estimatedDays: fastwayResponse.estimatedDays,
          serviceName: 'Fastway Standard'
        });
      }
    } catch (error) {
      console.error("Fastway API error:", error);
      // Add fallback quote
      quotes.push({
        courier: 'fastway',
        price: 85,
        estimatedDays: 3,
        serviceName: 'Fastway Standard'
      });
    }

    // Get Courier Guy quote
    try {
      const courierGuyResponse = await getCourierGuyQuote(fromAddress, toAddress, weight);
      if (courierGuyResponse) {
        quotes.push({
          courier: 'courier-guy',
          price: courierGuyResponse.price,
          estimatedDays: courierGuyResponse.estimatedDays,
          serviceName: 'Courier Guy Express'
        });
      }
    } catch (error) {
      console.error("Courier Guy API error:", error);
      // Add fallback quote
      quotes.push({
        courier: 'courier-guy',
        price: 95,
        estimatedDays: 2,
        serviceName: 'Courier Guy Express'
      });
    }

    return new Response(
      JSON.stringify({ quotes }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error("Error in get-delivery-quotes:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        quotes: [
          {
            courier: 'fastway',
            price: 85,
            estimatedDays: 3,
            serviceName: 'Fastway Standard'
          },
          {
            courier: 'courier-guy',
            price: 95,
            estimatedDays: 2,
            serviceName: 'Courier Guy Express'
          }
        ]
      }),
      { 
        status: 200,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})

async function getFastwayQuote(fromAddress: DeliveryAddress, toAddress: DeliveryAddress, weight: number) {
  const apiKey = Deno.env.get('FASTWAY_API_KEY');
  if (!apiKey) {
    throw new Error('Fastway API key not configured');
  }

  console.log("Calling Fastway API with key:", apiKey.substring(0, 8) + "...");

  // This is a placeholder for the actual Fastway API call
  // You'll need to implement the actual API integration based on Fastway's documentation
  const response = await fetch('https://au.api.fastway.org/v4/pudo/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      // Add Fastway-specific payload here
      from_postcode: fromAddress.postalCode,
      to_postcode: toAddress.postalCode,
      weight: weight
    })
  });

  if (!response.ok) {
    console.error("Fastway API response not ok:", response.status, response.statusText);
    throw new Error(`Fastway API error: ${response.status}`);
  }

  const data = await response.json();
  console.log("Fastway response:", data);

  // Parse Fastway response and return standardized format
  return {
    price: 85, // Parse from actual response
    estimatedDays: 3
  };
}

async function getCourierGuyQuote(fromAddress: DeliveryAddress, toAddress: DeliveryAddress, weight: number) {
  const apiKey = Deno.env.get('COURIER_GUY_API_KEY');
  if (!apiKey) {
    throw new Error('Courier Guy API key not configured');
  }

  console.log("Calling Courier Guy API with key:", apiKey.substring(0, 8) + "...");

  // This is a placeholder for the actual Courier Guy API call
  // You'll need to implement the actual API integration based on Courier Guy's documentation
  const response = await fetch('https://api.courierguy.co.za/v1/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      // Add Courier Guy-specific payload here
      collection_address: {
        suburb: fromAddress.suburb,
        city: fromAddress.city,
        postal_code: fromAddress.postalCode
      },
      delivery_address: {
        suburb: toAddress.suburb,
        city: toAddress.city,
        postal_code: toAddress.postalCode
      },
      parcel: {
        weight: weight
      }
    })
  });

  if (!response.ok) {
    console.error("Courier Guy API response not ok:", response.status, response.statusText);
    throw new Error(`Courier Guy API error: ${response.status}`);
  }

  const data = await response.json();
  console.log("Courier Guy response:", data);

  // Parse Courier Guy response and return standardized format
  return {
    price: 95, // Parse from actual response
    estimatedDays: 2
  };
}
