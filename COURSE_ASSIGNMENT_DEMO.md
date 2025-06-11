# Course Assignment System - Implementation Guide

This document demonstrates how to use the comprehensive course assignment system that processes inclusion/exclusion rules and assigns courses to universities.

## 🎯 **System Overview**

The course assignment system implements the requirements you specified:

1. ✅ **"All" assignments** - Course added to every university
2. ✅ **"Exclude" assignments** - Course added to all universities except those listed
3. ✅ **"Include only" assignments** - Course added only to specified universities
4. ✅ **University-specific APS scores** - Different APS requirements per university
5. ✅ **Faculty-based organization** - Courses properly assigned to correct faculties

## 📊 **Implementation Details**

### **Course Template Structure**

```typescript
interface CourseTemplate {
  id: string; // Unique course identifier
  name: string; // Course display name
  faculty: string; // Faculty category
  duration: string; // Course duration
  baseApsRequirement: number; // Default APS requirement
  description: string; // Course description
  subjects: Subject[]; // Required subjects
  careerProspects: string[]; // Career opportunities
  assignmentRule: AssignmentRule; // University assignment rule
  universitySpecificAps?: Record<string, number>; // Custom APS per university
}
```

### **Assignment Rule Examples**

**1. All Universities:**

```typescript
// Construction Management — all
{
  assignmentRule: {
    type: "all";
  }
}
// Result: Added to all 26 universities
```

**2. Exclude Specific Universities:**

```typescript
// Civil Engineering — (exclude: UWC, UNISA, UFH)
{
  assignmentRule: {
    type: "exclude",
    universities: ["uwc", "unisa", "ufh"]
  }
}
// Result: Added to 23 universities (all except UWC, UNISA, UFH)
```

**3. Include Only Specific Universities:**

```typescript
// Transport Engineering — (exclude: Most except TUT, DUT)
{
  assignmentRule: {
    type: "include_only",
    universities: ["tut", "dut"]
  }
}
// Result: Added only to TUT and DUT
```

**4. University-Specific APS Requirements:**

```typescript
// MBChB with different APS scores per university
{
  baseApsRequirement: 40,
  universitySpecificAps: {
    "uct": 45,    // UCT requires 45 APS
    "wits": 44,   // Wits requires 44 APS
    "up": 42,     // UP requires 42 APS
    "ukzn": 40,   // UKZN requires 40 APS
  }
}
```

## 🔧 **Usage Examples**

### **1. Get Courses for a Specific University**

```typescript
import { getAllCoursesForUniversity } from "@/services/universityCourseAssignmentService";

// Get all courses assigned to UCT
const uctCourses = getAllCoursesForUniversity("uct");
console.log(`UCT has ${uctCourses.length} assigned courses`);
```

### **2. Check if Course is Available at University**

```typescript
import { isCourseAvailableAtUniversity } from "@/services/universityCourseAssignmentService";

// Check if Civil Engineering is available at UWC (should be false)
const isAvailable = isCourseAvailableAtUniversity("bsc-eng-civil", "uwc");
console.log(`Civil Engineering at UWC: ${isAvailable}`); // false
```

### **3. Get APS Requirement for Course at Specific University**

```typescript
import { getCourseApsForUniversity } from "@/services/universityCourseAssignmentService";

// Get MBChB APS requirement at different universities
const uctAps = getCourseApsForUniversity("mbchb", "uct"); // 45
const ukznAps = getCourseApsForUniversity("mbchb", "ukzn"); // 40
const ufsAps = getCourseApsForUniversity("mbchb", "ufs"); // 38
```

### **4. Enhance University with Assigned Courses**

```typescript
import { enhanceUniversityWithCourses } from "@/services/universityCourseAssignmentService";
import { ALL_SOUTH_AFRICAN_UNIVERSITIES } from "@/constants/universities";

// Enhance a specific university with all assigned courses
const originalUCT = ALL_SOUTH_AFRICAN_UNIVERSITIES.find((u) => u.id === "uct");
const enhancedUCT = enhanceUniversityWithCourses(originalUCT!);

console.log(`Original UCT faculties: ${originalUCT.faculties.length}`);
console.log(`Enhanced UCT faculties: ${enhancedUCT.faculties.length}`);
```

### **5. Generate Assignment Statistics**

```typescript
import { getGlobalCourseAssignmentStats } from "@/services/universityCourseAssignmentService";

const stats = getGlobalCourseAssignmentStats();
console.log(`Total courses: ${stats.totalCourses}`);
console.log(`Assignment types:`, stats.assignmentTypeStats);
console.log(`Courses per university:`, stats.universityStats);
```

## 📋 **Comprehensive Course Coverage**

### **Engineering Faculty**

- ✅ Civil Engineering (excludes: UWC, UNISA, UFH)
- ✅ Mechanical Engineering (excludes: UWC, UNISA, UFH)
- ✅ Electrical Engineering (excludes: UWC, UNISA, UFH)
- ✅ Chemical Engineering (excludes: UJ, UNISA, UFH)
- ✅ Industrial Engineering (excludes: UWC, UNISA)
- ✅ Computer Engineering (excludes: UCT, UP, UNISA)
- ✅ Mining Engineering (excludes: UWC, UNISA, UFH, RU)
- ✅ Construction Management (all universities)
- ✅ Quantity Surveying (all universities)
- ✅ Architecture (excludes: UNISA, UFH, MUT)

### **Health Sciences Faculty**

- ✅ MBChB (all universities, custom APS per university)
- ✅ BDS (excludes: UNISA, UFH, MUT)
- ✅ BPharm (all universities)
- ✅ BSc Physiotherapy (all universities)
- ✅ BSc Occupational Therapy (all universities)
- ✅ Bachelor of Nursing Science (all universities)
- ✅ BEMC (include only: DUT, TUT)

### **Humanities Faculty**

- ✅ BA English (all universities)
- ✅ BA History (all universities)
- ✅ BA Psychology (all universities)
- ✅ BA Sociology (all universities)
- ✅ BA Political Science (all universities)
- ✅ BA Fine Arts (excludes: UFH)
- ✅ BA Journalism (all universities)

### **Commerce Faculty**

- ✅ BCom Accounting (all universities)
- ✅ BCom Finance (all universities)
- ✅ BCom Economics (all universities)
- ✅ BCom Marketing (all universities)
- ✅ BCom Business Management (all universities)
- ✅ BCom Actuarial Science (excludes: UFH, MUT)

### **Law Faculty**

- ✅ LLB (all universities)
- ✅ Bachelor of Criminal Justice (all universities)
- ✅ BSc Forensic Science (excludes: UFH, MUT)

### **Science Faculty**

- ✅ BSc Computer Science (all universities)
- ✅ BSc Mathematics (all universities)
- ✅ BSc Physics (all universities)
- ✅ BSc Chemistry (all universities)
- ✅ BSc Biological Sciences (all universities)
- ✅ BSc Environmental Science (all universities)
- ✅ BSc Astronomy (include only: UCT, RU)

### **Education Faculty**

- ✅ BEd Foundation Phase (all universities)
- ✅ BEd Intermediate Phase (all universities)
- ✅ BEd Senior Phase (all universities)
- ✅ BEd FET Phase (all universities)

### **Agriculture Faculty**

- ✅ BSc Agriculture (all universities)
- ✅ BSc Animal Science (all universities)
- ✅ BSc Viticulture and Oenology (include only: SU, UCT)

### **Information Technology Faculty**

- ✅ BIT (all universities)
- ✅ BSc Software Engineering (all universities)
- ✅ BSc Cybersecurity (all universities)
- ✅ BSc Data Science (all universities)

### **Technical/Vocational Programs**

- ✅ National Diploma in Engineering (include only: TUT, DUT, MUT, VUT)
- ✅ National Diploma in IT (include only: TUT, DUT, MUT, VUT)
- ✅ National Diploma in Business Studies (include only: TUT, DUT, MUT, VUT)

## 🧪 **Testing and Validation**

### **Run Validation Tests**

```typescript
import { DEBUG_UTILS } from "@/utils/courseAssignmentIntegration";

// Validate all course assignments
const validation = DEBUG_UTILS.validateAllAssignments();

// Test specific university assignments
DEBUG_UTILS.logCourseAssignments("uct");
DEBUG_UTILS.logCourseAssignments("tut");

// Generate full report
const report = DEBUG_UTILS.generateFullReport();
```

### **Test Scenarios**

```typescript
import { TEST_SCENARIOS } from "@/utils/courseAssignmentIntegration";

// Test that "all" assignments work correctly
const allTest = TEST_SCENARIOS.testAllAssignment();

// Test that exclusions work correctly
const excludeTest = TEST_SCENARIOS.testExcludeAssignment();

// Test that include-only assignments work correctly
const includeOnlyTest = TEST_SCENARIOS.testIncludeOnlyAssignment();

// Test custom APS requirements
const apsTest = TEST_SCENARIOS.testCustomApsRequirements();
```

## ⚡ **Performance**

The system efficiently processes:

- **100+ course templates** with assignment rules
- **26 universities** with appropriate course assignments
- **Custom APS requirements** for specific university-course combinations
- **Faculty-based organization** with proper course placement
- **Real-time validation** and assignment checking

## 🎯 **Benefits**

1. **Accurate Course Distribution**: Courses are only assigned to universities that actually offer them
2. **Flexible Assignment Rules**: Support for all, exclude, and include-only patterns
3. **University-Specific Requirements**: Different APS scores per university
4. **Proper Faculty Organization**: Courses assigned to correct academic faculties
5. **Validation and Testing**: Comprehensive validation to ensure data integrity
6. **Performance Optimized**: Efficient processing for large datasets

This system ensures that the university data accurately reflects the real course offerings and admission requirements of South African higher education institutions.
