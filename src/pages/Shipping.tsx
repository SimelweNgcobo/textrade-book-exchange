import React from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Package } from "lucide-react";
import CourierGuyTrackingOnly from "@/components/courier-guy/CourierGuyTrackingOnly";

const Shipping = () => {
  return (
    <Layout>
      <SEO
        title="Shipping & Delivery - ReBooked Solutions"
        description="Create shipments and track deliveries with Courier Guy. Secure and reliable shipping for your textbook orders."
        keywords="shipping, delivery, courier guy, tracking, textbook delivery"
        url="https://www.rebookedsolutions.co.za/shipping"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-book-800 mb-4">
              Shipping & Delivery
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Track your textbook deliveries with our integrated Courier Guy
              shipping system. Shipments are automatically created when you buy
              or sell books using your saved addresses.
            </p>
          </div>

          <CourierGuyTrackingOnly />

          {/* Information Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">
                Automatic Processing
              </h3>
              <p className="text-sm text-gray-600">
                Shipments are automatically created when books are purchased,
                using saved seller and buyer addresses.
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Package className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-sm text-gray-600">
                Track your shipment every step of the way with detailed status
                updates from Courier Guy.
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mx-auto mb-3">
                2-3
              </div>
              <h3 className="text-lg font-semibold mb-2">Days Delivery</h3>
              <p className="text-sm text-gray-600">
                Fast delivery across South Africa with estimated 2-3 business
                days via Courier Guy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
