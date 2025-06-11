import { University, Faculty } from "@/types/university";
import {
  ALL_SOUTH_AFRICAN_UNIVERSITIES,
  SOUTH_AFRICAN_UNIVERSITIES_SIMPLE as SIMPLE_LIST,
} from "./universities/index";

// Export the simplified list for basic operations
export const SOUTH_AFRICAN_UNIVERSITIES_SIMPLE = SIMPLE_LIST;

// Export the complete detailed universities array from modular files
export const SOUTH_AFRICAN_UNIVERSITIES: University[] =
  ALL_SOUTH_AFRICAN_UNIVERSITIES;

// Export the complete list as well for backward compatibility
export { ALL_SOUTH_AFRICAN_UNIVERSITIES };

export const UNIVERSITY_YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
  "6th Year",
  "Masters",
  "Doctorate",
];

// Both SOUTH_AFRICAN_UNIVERSITIES_SIMPLE and SOUTH_AFRICAN_UNIVERSITIES are available for import
