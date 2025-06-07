import React, { useState } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Search } from "lucide-react";
import CourierGuyShipmentForm from "@/components/courier-guy/CourierGuyShipmentForm";
import CourierGuyTracker from "@/components/courier-guy/CourierGuyTracker";
import { CourierGuyShipment } from "@/services/courierGuyService";

const Shipping = () => {
  const [activeTab, setActiveTab] = useState("create");

  const handleShipmentCreated = (shipment: CourierGuyShipment) => {
    console.log("Shipment created:", shipment);
    // Optionally switch to tracking tab with the new tracking number
    setActiveTab("track");
  };

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
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Create shipments and track your textbook deliveries with our
              integrated Courier Guy shipping system. Fast, reliable, and secure
              delivery across South Africa.
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="create" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Create Shipment
              </TabsTrigger>
              <TabsTrigger value="track" className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Track Package
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Create New Shipment
                </h2>
                <p className="text-gray-600">
                  Send your textbooks securely with Courier Guy's reliable
                  delivery service.
                </p>
              </div>

              <CourierGuyShipmentForm
                onShipmentCreated={handleShipmentCreated}
              />
            </TabsContent>

            <TabsContent value="track" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Track Your Shipment
                </h2>
                <p className="text-gray-600">
                  Enter your tracking number to get real-time updates on your
                  delivery.
                </p>
              </div>

              <CourierGuyTracker />
            </TabsContent>
          </Tabs>

          {/* Information Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Secure Packaging</h3>
              <p className="text-sm text-gray-600">
                Your textbooks are carefully packaged to ensure they arrive in
                perfect condition.
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Search className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-sm text-gray-600">
                Track your shipment every step of the way with detailed status
                updates.
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mx-auto mb-3">
                2-3
              </div>
              <h3 className="text-lg font-semibold mb-2">Days Delivery</h3>
              <p className="text-sm text-gray-600">
                Fast delivery across South Africa with estimated 2-3 business
                days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
