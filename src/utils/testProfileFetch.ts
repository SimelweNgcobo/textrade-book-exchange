/**
 * Test utility to verify profile fetching works correctly
 * This file can be removed after testing
 */

import { getUserProfileWithAddresses } from "../services/automaticShipmentService";

export const testProfileFetch = async (userId: string) => {
  console.log("🧪 Testing profile fetch for user:", userId);

  try {
    const profile = await getUserProfileWithAddresses(userId);

    if (profile) {
      console.log("✅ Profile fetched successfully:");
      console.log("- ID:", profile.id);
      console.log("- Name:", profile.name);
      console.log("- Email:", profile.email);
      console.log("- Has pickup address:", !!profile.pickup_address);
      console.log("- Has shipping address:", !!profile.shipping_address);
      console.log("- Addresses same:", profile.addresses_same);

      return profile;
    } else {
      console.log("⚠️ Profile not found or error occurred");
      return null;
    }
  } catch (error) {
    console.error("❌ Profile fetch failed:", error);
    return null;
  }
};

// Auto-run test in development if URL has test parameter
if (process.env.NODE_ENV === "development") {
  // Check if we should run the test
  const urlParams = new URLSearchParams(window.location.search);
  const testUserId = urlParams.get("test-profile-fetch");

  if (testUserId) {
    setTimeout(() => {
      testProfileFetch(testUserId);
    }, 2000);
  }
}
