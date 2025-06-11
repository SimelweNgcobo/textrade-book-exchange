// Temporary debug script to check university data
// Run with: node debug-universities.js

import fs from "fs";

// Simple check for university data structure
try {
  // Read the university index file
  const indexContent = fs.readFileSync(
    "./src/constants/universities/index.ts",
    "utf8",
  );
  console.log("✅ University index file found");

  // Check if ALL_SOUTH_AFRICAN_UNIVERSITIES is exported
  if (indexContent.includes("ALL_SOUTH_AFRICAN_UNIVERSITIES")) {
    console.log("✅ ALL_SOUTH_AFRICAN_UNIVERSITIES export found");
  } else {
    console.log("❌ ALL_SOUTH_AFRICAN_UNIVERSITIES export not found");
  }

  // Read the complete universities file
  const universitiesContent = fs.readFileSync(
    "./src/constants/universities/complete-sa-universities.ts",
    "utf8",
  );
  console.log("✅ Complete universities file found");

  // Check file size to ensure it has content
  console.log(
    `📊 Universities file size: ${(universitiesContent.length / 1024).toFixed(1)}KB`,
  );

  // Look for university objects
  const universityMatches = universitiesContent.match(/id:\s*"[^"]+"/g);
  if (universityMatches) {
    console.log(
      `📚 Found ${universityMatches.length} university ID definitions`,
    );
    console.log("First 5 universities:", universityMatches.slice(0, 5));
  }
} catch (error) {
  console.error("❌ Error checking university data:", error.message);
}
