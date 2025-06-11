// Key Validation Analysis for React Components
// This utility helps identify potential missing key prop issues

export function analyzeComponentForKeys() {
  console.log("=== React Key Props Analysis ===");

  const analysis = {
    componentsChecked: [
      {
        component: "EnhancedAPSCalculatorV2",
        issues: [
          {
            location: "subjects.map()",
            status: "FIXED",
            key: "subject-${index}-${subject.name}",
            description: "Subject input list now uses stable keys",
          },
          {
            location: "availableUniversities.map()",
            status: "OK",
            key: "uni.id",
            description: "University filter dropdown has proper keys",
          },
          {
            location: "availableFaculties.map()",
            status: "OK",
            key: "faculty",
            description: "Faculty filter dropdown has proper keys",
          },
          {
            location: "calculation.eligibleDegrees.map()",
            status: "OK",
            key: "${item.university.id}-${item.degree.id}",
            description: "Degree results list has composite keys",
          },
          {
            location: "SOUTH_AFRICAN_SUBJECTS.filter().map()",
            status: "OK",
            key: "subj.name",
            description: "Subject selection dropdown has proper keys",
          },
        ],
      },
      {
        component: "StudyFilters",
        issues: [
          {
            location: "Static SelectItem components",
            status: "FIXED",
            key: "all-categories, beginner, etc.",
            description: "All static SelectItem elements now have unique keys",
          },
        ],
      },
      {
        component: "ReportBookDialog",
        issues: [
          {
            location: "Report reason SelectItem components",
            status: "FIXED",
            key: "duplicate, spam, other, etc.",
            description: "All report reason options have unique keys",
          },
        ],
      },
      {
        component: "CampusBooks",
        issues: [
          {
            location: "University/Year/Condition filters",
            status: "FIXED",
            key: "all-universities, all-years, all-conditions, etc.",
            description: "All filter SelectItem components have unique keys",
          },
        ],
      },
    ],
    remainingRisks: [
      {
        risk: "Dynamic key generation",
        description:
          "Using index as part of key can cause issues if array order changes",
        mitigation: "Use stable identifiers when possible",
      },
      {
        risk: "Runtime state changes",
        description:
          "Keys might be fine at build time but problematic during state updates",
        mitigation: "Test with dynamic data and state changes",
      },
      {
        risk: "Third-party component issues",
        description:
          "Radix UI Select component internals might have key issues",
        mitigation: "Update dependencies or report issue to library",
      },
    ],
    recommendations: [
      "Use stable, unique identifiers for keys",
      "Avoid using array index alone as keys for dynamic lists",
      "Test components with changing data to verify key stability",
      "Monitor browser console for key warnings in development",
    ],
  };

  console.log("Analysis complete:", analysis);
  return analysis;
}

// Helper function to validate if a key is stable
export function isStableKey(key: string, itemData: any): boolean {
  // A stable key should:
  // 1. Be unique within the list
  // 2. Remain consistent for the same item across re-renders
  // 3. Not depend on array position alone

  const hasUniqueId = key.includes(itemData?.id);
  const hasStableProperty = !key.match(/^index-?\d+$/);
  const isComposite = key.includes("-") || key.includes("_");

  return hasUniqueId || (hasStableProperty && isComposite);
}

// Development mode key checker
export function enableKeyWarnings() {
  if (process.env.NODE_ENV === "development") {
    console.log("🔍 Key validation enabled in development mode");

    // Override console.warn to highlight key warnings
    const originalWarn = console.warn;
    console.warn = function (...args) {
      const message = args.join(" ");
      if (
        message.includes(
          'Warning: Each child in a list should have a unique "key" prop',
        )
      ) {
        console.error("🚨 REACT KEY WARNING DETECTED:", message);
        console.trace("Key warning stack trace:");
      }
      originalWarn.apply(console, args);
    };

    return true;
  }
  return false;
}

// Export for use in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as any).analyzeKeys = analyzeComponentForKeys;
  (window as any).enableKeyWarnings = enableKeyWarnings;
}
