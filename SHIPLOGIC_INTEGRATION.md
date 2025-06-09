# ShipLogic Integration Documentation

This document describes the complete ShipLogic integration implemented in the ReBooked Solutions platform, alongside the existing Courier Guy service.

## Overview

The ShipLogic integration provides a comprehensive shipping solution with multiple service levels, real-time tracking, professional waybill generation, and full API integration. Users can now choose between Courier Guy and ShipLogic for their shipping needs.

## Features Implemented

### 🚀 Core Functionality

- **Multiple Service Levels**: Economy, Standard, Express, and Overnight delivery options
- **Real-time Rate Quotes**: Get accurate shipping costs based on addresses and package details
- **Shipment Creation**: Create shipments with professional waybills
- **Advanced Tracking**: Track shipments with detailed event history
- **Address Validation**: Validate South African addresses before shipping
- **Professional Waybills**: Generate and download PDF waybills

### 🔧 Technical Implementation

- **TypeScript Support**: Full type safety with comprehensive interfaces
- **React Components**: Reusable UI components following the project's design system
- **Error Handling**: Robust error handling with user-friendly messages
- **API Integration**: Direct integration with ShipLogic v2 API
- **Responsive Design**: Mobile-first responsive design using Tailwind CSS

## File Structure

```
src/
├── components/
│   ├── shiplogic/
│   │   ├── ShipLogicShipmentForm.tsx       # Full shipment creation form
│   │   ├── ShipLogicTracker.tsx            # Comprehensive tracking interface
│   │   ├── ShipLogicTrackingOnly.tsx       # Simple tracking widget
│   │   └── ShipLogicRateQuote.tsx          # Rate quote component
│   ├── ShippingDashboard.tsx               # Unified shipping dashboard
│   └── ShippingComparison.tsx              # Provider comparison widget
├── services/
│   └── shipLogicService.ts                 # Core ShipLogic API service
├── types/
│   └── shiplogic.ts                        # TypeScript type definitions
├── utils/
│   └── shippingUtils.ts                    # Shipping utilities and helpers
└── pages/
    └── Shipping.tsx                        # Updated shipping page
```

## API Configuration

### Environment Setup

The ShipLogic API key is currently hardcoded in the service file. For production, move this to environment variables:

```typescript
// In shipLogicService.ts
const SHIPLOGIC_API_KEY =
  process.env.VITE_SHIPLOGIC_API_KEY || "09c881d9d88b450e8440f3e22e4d40ab";
```

### API Endpoints Used

- `POST /rates` - Get shipping rate quotes
- `POST /shipments` - Create new shipments
- `GET /shipments/{id}` - Track shipments
- `GET /shipments/notes/external` - Get shipment notes
- `PUT /shipments/{id}/cancel` - Cancel shipments
- `GET /service-levels` - Get available service levels

## Components Usage

### 1. ShipLogicShipmentForm

Complete form for creating new shipments with all required details.

```typescript
import ShipLogicShipmentForm from "@/components/shiplogic/ShipLogicShipmentForm";

<ShipLogicShipmentForm
  onShipmentCreated={(shipment) => console.log("Shipment created:", shipment)}
  initialData={{
    collectionName: "John Doe",
    deliveryCity: "Cape Town",
    // ... other initial values
  }}
/>
```

### 2. ShipLogicTracker

Comprehensive tracking interface with full shipment details.

```typescript
import ShipLogicTracker from "@/components/shiplogic/ShipLogicTracker";

<ShipLogicTracker initialShipmentId="SHIP123456" />
```

### 3. ShipLogicTrackingOnly

Simple tracking widget for embedded use.

```typescript
import ShipLogicTrackingOnly from "@/components/shiplogic/ShipLogicTrackingOnly";

<ShipLogicTrackingOnly
  placeholder="Enter tracking number"
  showBranding={false}
/>
```

### 4. ShipLogicRateQuote

Get rate quotes based on addresses and package details.

```typescript
import ShipLogicRateQuote from "@/components/shiplogic/ShipLogicRateQuote";

<ShipLogicRateQuote
  onRateSelected={(rate) => console.log("Selected rate:", rate)}
  initialData={{
    fromAddress: { city: "Johannesburg", ... },
    toAddress: { city: "Cape Town", ... },
    parcel: { weight: 1.5, ... }
  }}
/>
```

### 5. ShippingDashboard

Unified dashboard for both Courier Guy and ShipLogic.

```typescript
import ShippingDashboard from "@/components/ShippingDashboard";

<ShippingDashboard
  defaultTab="track"
  defaultProvider="shipLogic"
/>
```

### 6. ShippingComparison

Compare rates and options between providers.

```typescript
import ShippingComparison from "@/components/ShippingComparison";

<ShippingComparison
  request={{
    fromCity: "Johannesburg",
    toCity: "Cape Town",
    weight: 1.5
  }}
  onProviderSelect={(provider) => console.log("Selected:", provider)}
  autoLoad={true}
/>
```

## Service Functions

### Rate Quotes

```typescript
import { getShipLogicRates, getShipLogicQuickQuote } from "@/services/shipLogicService";

// Get detailed rates
const rates = await getShipLogicRates({
  fromAddress: { street: "123 Main St", city: "JHB", ... },
  toAddress: { street: "456 Oak Ave", city: "CPT", ... },
  parcel: { weight: 1.5, length: 25, width: 20, height: 5, ... }
});

// Get quick quote
const quote = await getShipLogicQuickQuote("Johannesburg", "Cape Town", 1.5);
```

### Shipment Creation

```typescript
import { createShipLogicShipment } from "@/services/shipLogicService";

const shipment = await createShipLogicShipment({
  collectionName: "Seller Name",
  collectionPhone: "0821234567",
  collectionEmail: "seller@example.com",
  // ... all required fields
});
```

### Tracking

```typescript
import { trackShipLogicShipment } from "@/services/shipLogicService";

const tracking = await trackShipLogicShipment("SHIP123456");
console.log("Current status:", tracking.tracking.status);
```

## Service Levels

ShipLogic offers 4 service levels:

1. **Economy (ECO)**: 3-5 business days, cost-effective
2. **Standard (STD)**: 2-3 business days, reliable
3. **Express (EXP)**: 1-2 business days, fast delivery
4. **Overnight (OVN)**: Next business day, premium service

## Address Validation

Both components include South African address validation:

```typescript
import { validateShipLogicAddress } from "@/services/shipLogicService";

const validation = validateShipLogicAddress({
  street: "123 Main Street",
  suburb: "City Centre",
  city: "Cape Town",
  province: "Western Cape",
  postalCode: "8000",
});

if (!validation.isValid) {
  console.log("Errors:", validation.errors);
}
```

## Error Handling

All service functions include comprehensive error handling:

- Network errors are caught and displayed to users
- API errors are parsed and shown with meaningful messages
- Fallback quotes are provided when API calls fail
- Loading states are managed consistently

## Mobile Responsiveness

All components are fully responsive and work well on mobile devices:

- Touch-friendly form controls
- Responsive grid layouts
- Mobile-optimized tracking displays
- Collapsible sections for small screens

## Integration with Existing System

### Checkout Integration

The shipping comparison can be integrated into the checkout process:

```typescript
// In checkout page
<ShippingComparison
  request={{
    fromCity: sellerCity,
    toCity: buyerCity,
    weight: bookWeight
  }}
  onProviderSelect={(provider) => setSelectedShippingProvider(provider)}
  autoLoad={true}
/>
```

### Profile Integration

Users can set preferred shipping providers in their profiles and use saved addresses for quick shipment creation.

### Order Management

Shipment tracking can be integrated into order management, allowing automatic tracking updates for purchased books.

## Testing

### Test Data

Use these test addresses for development:

```typescript
// Johannesburg
{
  street: "123 Main Street",
  suburb: "Sandton",
  city: "Johannesburg",
  province: "Gauteng",
  postalCode: "2000"
}

// Cape Town
{
  street: "456 Long Street",
  suburb: "City Bowl",
  city: "Cape Town",
  province: "Western Cape",
  postalCode: "8000"
}
```

### Test Scenarios

1. **Rate Quotes**: Test with different cities and weights
2. **Shipment Creation**: Test with valid and invalid addresses
3. **Tracking**: Test with various shipment IDs
4. **Error Handling**: Test with network failures and invalid data

## Future Enhancements

### Potential Features

1. **Bulk Shipments**: Create multiple shipments at once
2. **Scheduled Pickups**: Schedule collection dates in advance
3. **Insurance Options**: Add insurance coverage for valuable items
4. **Delivery Notifications**: SMS/email notifications for tracking updates
5. **Return Labels**: Generate return shipping labels
6. **International Shipping**: Extend to international destinations

### API Optimizations

1. **Caching**: Cache rate quotes for similar routes
2. **Webhooks**: Implement webhook handlers for automatic tracking updates
3. **Batch Operations**: Batch multiple API calls for better performance

## Troubleshooting

### Common Issues

1. **Rate Quote Failures**: Check address format and API key
2. **Shipment Creation Errors**: Verify all required fields are provided
3. **Tracking Not Found**: Ensure shipment ID is correct and shipment exists
4. **Address Validation**: Check postal code format (4 digits for SA)

### Debug Mode

Enable debug logging by checking browser console for detailed API request/response logs.

## Support

For issues or questions about the ShipLogic integration:

1. Check the browser console for error messages
2. Verify API key is valid and has proper permissions
3. Test with known working addresses and shipment IDs
4. Review the ShipLogic API documentation for additional details

## Conclusion

The ShipLogic integration provides a comprehensive shipping solution that enhances the ReBooked Solutions platform with professional shipping capabilities, multiple service options, and excellent user experience. The modular design allows for easy maintenance and future enhancements while maintaining compatibility with the existing Courier Guy integration.
