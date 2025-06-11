import { University } from "@/types/university";
import {
  ENGINEERING_PROGRAMS,
  HEALTH_SCIENCES_PROGRAMS,
  HUMANITIES_PROGRAMS,
  COMMERCE_PROGRAMS,
  LAW_PROGRAMS,
  SCIENCE_PROGRAMS,
  EDUCATION_PROGRAMS,
  INFORMATION_TECHNOLOGY_PROGRAMS,
  AGRICULTURE_PROGRAMS,
  VETERINARY_PROGRAMS,
  THEOLOGY_PROGRAMS,
  DESIGN_PROGRAMS,
  MUSIC_PROGRAMS,
  SPORTS_SCIENCE_PROGRAMS,
  SOCIAL_WORK_PROGRAMS,
  getAllProgramsByFaculty,
} from "./comprehensive-university-programs";

// This file contains the complete programs for universities that need more comprehensive degree offerings

// Template programs that can be used across multiple universities
export const COMMON_DEGREE_TEMPLATES = {
  // Medicine and Health Sciences
  medicine: {
    id: "mbchb-medicine",
    name: "MBChB Medicine and Surgery",
    faculty: "Health Sciences",
    duration: "6 years",
    apsRequirement: 42,
    description:
      "Comprehensive medical training leading to medical doctor qualification.",
    subjects: [
      { name: "Mathematics", level: 6, isRequired: true },
      { name: "Physical Sciences", level: 6, isRequired: true },
      { name: "Life Sciences", level: 6, isRequired: true },
      { name: "English", level: 6, isRequired: true },
    ],
    careerProspects: [
      "Medical Doctor",
      "Specialist Physician",
      "Surgeon",
      "Researcher",
      "Medical Consultant",
    ],
  },

  // Engineering Programs
  mechanicalEngineering: {
    id: "beng-mechanical",
    name: "BEng Mechanical Engineering",
    faculty: "Engineering",
    duration: "4 years",
    apsRequirement: 38,
    description: "Design, manufacture, and maintenance of mechanical systems.",
    subjects: [
      { name: "Mathematics", level: 6, isRequired: true },
      { name: "Physical Sciences", level: 6, isRequired: true },
      { name: "English", level: 5, isRequired: true },
    ],
    careerProspects: [
      "Mechanical Engineer",
      "Design Engineer",
      "Project Manager",
      "Manufacturing Engineer",
      "Consultant Engineer",
    ],
  },

  electricalEngineering: {
    id: "beng-electrical",
    name: "BEng Electrical Engineering",
    faculty: "Engineering",
    duration: "4 years",
    apsRequirement: 38,
    description: "Electrical systems, electronics, and power engineering.",
    subjects: [
      { name: "Mathematics", level: 6, isRequired: true },
      { name: "Physical Sciences", level: 6, isRequired: true },
      { name: "English", level: 5, isRequired: true },
    ],
    careerProspects: [
      "Electrical Engineer",
      "Electronics Engineer",
      "Power Systems Engineer",
      "Control Systems Engineer",
      "Telecommunications Engineer",
    ],
  },

  civilEngineering: {
    id: "beng-civil",
    name: "BEng Civil Engineering",
    faculty: "Engineering",
    duration: "4 years",
    apsRequirement: 36,
    description: "Infrastructure design, construction, and project management.",
    subjects: [
      { name: "Mathematics", level: 6, isRequired: true },
      { name: "Physical Sciences", level: 6, isRequired: true },
      { name: "English", level: 5, isRequired: true },
    ],
    careerProspects: [
      "Civil Engineer",
      "Structural Engineer",
      "Construction Manager",
      "Project Engineer",
      "Municipal Engineer",
    ],
  },

  // Commerce and Business
  bcom: {
    id: "bcom-general",
    name: "BCom General",
    faculty: "Commerce",
    duration: "3 years",
    apsRequirement: 30,
    description: "Broad business education with specialization options.",
    subjects: [
      { name: "Mathematics", level: 4, isRequired: true },
      { name: "English", level: 5, isRequired: true },
    ],
    careerProspects: [
      "Business Analyst",
      "Financial Advisor",
      "Marketing Manager",
      "Human Resources Manager",
      "Entrepreneur",
    ],
  },

  accounting: {
    id: "bcom-accounting",
    name: "BCom Accounting",
    faculty: "Commerce",
    duration: "3 years",
    apsRequirement: 32,
    description: "Professional accounting qualification pathway.",
    subjects: [
      { name: "Mathematics", level: 5, isRequired: true },
      { name: "English", level: 5, isRequired: true },
      { name: "Accounting", level: 5, isRequired: false },
    ],
    careerProspects: [
      "Chartered Accountant",
      "Financial Manager",
      "Auditor",
      "Tax Consultant",
      "Management Accountant",
    ],
  },

  // Law
  law: {
    id: "llb-law",
    name: "LLB Law",
    faculty: "Law",
    duration: "4 years",
    apsRequirement: 34,
    description: "Comprehensive legal education and training.",
    subjects: [
      { name: "English", level: 6, isRequired: true },
      { name: "Mathematics", level: 4, isRequired: true },
    ],
    careerProspects: [
      "Attorney",
      "Advocate",
      "Legal Advisor",
      "Magistrate",
      "Corporate Lawyer",
    ],
  },

  // Education
  education: {
    id: "bed-foundation-phase",
    name: "BEd Foundation Phase Teaching",
    faculty: "Education",
    duration: "4 years",
    apsRequirement: 26,
    description: "Training for foundation phase (Grade R-3) teaching.",
    subjects: [
      { name: "English", level: 5, isRequired: true },
      { name: "Mathematics", level: 4, isRequired: true },
    ],
    careerProspects: [
      "Foundation Phase Teacher",
      "Educational Specialist",
      "Curriculum Developer",
      "School Principal",
      "Education Consultant",
    ],
  },

  // Humanities
  psychology: {
    id: "ba-psychology",
    name: "BA Psychology",
    faculty: "Humanities",
    duration: "3 years",
    apsRequirement: 28,
    description: "Study of human behavior and mental processes.",
    subjects: [
      { name: "English", level: 5, isRequired: true },
      { name: "Mathematics", level: 4, isRequired: true },
    ],
    careerProspects: [
      "Psychologist",
      "Counselor",
      "Human Resources Specialist",
      "Research Assistant",
      "Social Worker",
    ],
  },

  socialWork: {
    id: "bsw-social-work",
    name: "BSW Social Work",
    faculty: "Humanities",
    duration: "4 years",
    apsRequirement: 26,
    description: "Professional social work training and practice.",
    subjects: [
      { name: "English", level: 5, isRequired: true },
      { name: "Mathematics", level: 3, isRequired: true },
    ],
    careerProspects: [
      "Social Worker",
      "Community Development Officer",
      "Child Protection Officer",
      "Family Counselor",
      "NGO Manager",
    ],
  },

  // Science Programs
  computerScience: {
    id: "bsc-computer-science",
    name: "BSc Computer Science",
    faculty: "Science",
    duration: "3 years",
    apsRequirement: 34,
    description: "Programming, algorithms, and computational thinking.",
    subjects: [
      { name: "Mathematics", level: 6, isRequired: true },
      { name: "English", level: 5, isRequired: true },
      { name: "Information Technology", level: 5, isRequired: false },
    ],
    careerProspects: [
      "Software Developer",
      "Data Scientist",
      "Systems Analyst",
      "IT Consultant",
      "Research Scientist",
    ],
  },

  informationSystems: {
    id: "bsc-information-systems",
    name: "BSc Information Systems",
    faculty: "Science",
    duration: "3 years",
    apsRequirement: 32,
    description: "Business-focused IT solutions and systems management.",
    subjects: [
      { name: "Mathematics", level: 5, isRequired: true },
      { name: "English", level: 5, isRequired: true },
      { name: "Information Technology", level: 4, isRequired: false },
    ],
    careerProspects: [
      "IT Manager",
      "Business Analyst",
      "Systems Administrator",
      "Database Administrator",
      "IT Consultant",
    ],
  },

  // Health Sciences (Non-Medicine)
  nursing: {
    id: "bns-nursing",
    name: "BNS Nursing Science",
    faculty: "Health Sciences",
    duration: "4 years",
    apsRequirement: 30,
    description: "Professional nursing training and healthcare practice.",
    subjects: [
      { name: "English", level: 5, isRequired: true },
      { name: "Life Sciences", level: 5, isRequired: true },
      { name: "Mathematics", level: 4, isRequired: true },
      { name: "Physical Sciences", level: 4, isRequired: false },
    ],
    careerProspects: [
      "Professional Nurse",
      "Nurse Manager",
      "Clinical Specialist",
      "Nurse Educator",
      "Healthcare Administrator",
    ],
  },

  pharmacy: {
    id: "bpharm-pharmacy",
    name: "BPharm Pharmacy",
    faculty: "Health Sciences",
    duration: "4 years",
    apsRequirement: 35,
    description: "Pharmaceutical sciences and pharmacy practice.",
    subjects: [
      { name: "Mathematics", level: 5, isRequired: true },
      { name: "Physical Sciences", level: 6, isRequired: true },
      { name: "Life Sciences", level: 5, isRequired: true },
      { name: "English", level: 5, isRequired: true },
    ],
    careerProspects: [
      "Pharmacist",
      "Clinical Pharmacist",
      "Pharmaceutical Researcher",
      "Hospital Pharmacist",
      "Community Pharmacist",
    ],
  },
};

// Function to generate comprehensive faculty structure for universities
export const generateStandardFaculties = (universityName: string) => {
  const comprehensivePrograms = getAllProgramsByFaculty();

  return [
    {
      id: "engineering",
      name: "Faculty of Engineering and Built Environment",
      description: `Comprehensive engineering education and innovation at ${universityName}.`,
      degrees: comprehensivePrograms.engineering,
    },
    {
      id: "health-sciences",
      name: "Faculty of Health Sciences",
      description: `Medical and health sciences education at ${universityName}.`,
      degrees: comprehensivePrograms.healthSciences,
    },
    {
      id: "humanities",
      name: "Faculty of Humanities and Social Sciences",
      description: `Arts, social sciences, and humanities studies at ${universityName}.`,
      degrees: comprehensivePrograms.humanities,
    },
    {
      id: "commerce",
      name: "Faculty of Commerce and Management",
      description: `Business, economics, and management education at ${universityName}.`,
      degrees: comprehensivePrograms.commerce,
    },
    {
      id: "law",
      name: "Faculty of Law",
      description: `Legal education and jurisprudence at ${universityName}.`,
      degrees: comprehensivePrograms.law,
    },
    {
      id: "science",
      name: "Faculty of Science",
      description: `Natural sciences and research education at ${universityName}.`,
      degrees: comprehensivePrograms.science,
    },
    {
      id: "education",
      name: "Faculty of Education",
      description: `Teacher training and educational studies at ${universityName}.`,
      degrees: comprehensivePrograms.education,
    },
    {
      id: "information-technology",
      name: "Faculty of Information Technology",
      description: `Computer science and information technology at ${universityName}.`,
      degrees: comprehensivePrograms.informationTechnology,
    },
  ];
};

// Universities that need program completion - now all will be checked
export const UNIVERSITIES_NEEDING_PROGRAMS = [
  "univen",
  "ul",
  "ump",
  "spu",
  "smu",
  "wsu",
  "unizulu",
  "cput",
  "dut",
  "tut",
  "vut",
  "cut",
  "mut",
  "ufs",
  "uwc",
  "ufh",
  "nmu",
  "uj",
  "unisa",
];
