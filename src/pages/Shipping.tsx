import React from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import ShippingDashboard from "@/components/ShippingDashboard";

const Shipping = () => {
  return (
    <Layout>
      <SEO
        title="Shipping & Delivery - ReBooked Solutions"
        description="Create shipments and track deliveries with Courier Guy and ShipLogic. Multiple shipping providers for your textbook orders with real-time tracking."
        keywords="shipping, delivery, courier guy, shiplogic, tracking, textbook delivery, multiple carriers"
        url="https://www.rebookedsolutions.co.za/shipping"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-book-800 mb-4">
              Shipping & Delivery Hub
            </h1>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              Choose between multiple shipping providers for your textbook
              deliveries. Track shipments, create new ones, and get instant
              quotes with our integrated Courier Guy and ShipLogic systems.
            </p>
          </div>

          <ShippingDashboard defaultTab="track" />
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
