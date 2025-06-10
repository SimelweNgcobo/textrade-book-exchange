import { University } from "@/types/university";

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

// Function to generate common faculty structure for universities
export const generateStandardFaculties = (universityName: string) => [
  {
    id: "science",
    name: "Faculty of Science",
    description: `Advanced scientific education and research at ${universityName}.`,
    degrees: [
      COMMON_DEGREE_TEMPLATES.computerScience,
      COMMON_DEGREE_TEMPLATES.informationSystems,
      {
        ...COMMON_DEGREE_TEMPLATES.computerScience,
        id: "bsc-mathematics",
        name: "BSc Mathematics",
        description: "Pure and applied mathematics with statistical analysis.",
        apsRequirement: 36,
        careerProspects: [
          "Mathematician",
          "Statistician",
          "Actuary",
          "Data Analyst",
          "Research Scientist",
        ],
      },
      {
        id: "bsc-physics",
        name: "BSc Physics",
        faculty: "Science",
        duration: "3 years",
        apsRequirement: 38,
        description: "Study of fundamental laws governing the universe.",
        subjects: [
          { name: "Physical Sciences", level: 6, isRequired: true },
          { name: "Mathematics", level: 7, isRequired: true },
          { name: "English", level: 4, isRequired: true },
        ],
        careerProspects: [
          "Physicist",
          "Research Scientist",
          "Data Analyst",
          "Engineering Physicist",
          "Science Teacher",
        ],
      },
      {
        id: "bsc-chemistry",
        name: "BSc Chemistry",
        faculty: "Science",
        duration: "3 years",
        apsRequirement: 36,
        description: "Study of matter, its properties, and chemical reactions.",
        subjects: [
          { name: "Physical Sciences", level: 6, isRequired: true },
          { name: "Mathematics", level: 6, isRequired: true },
          { name: "English", level: 4, isRequired: true },
        ],
        careerProspects: [
          "Chemist",
          "Pharmaceutical Researcher",
          "Quality Control Analyst",
          "Chemical Engineer",
          "Forensic Scientist",
        ],
      },
      {
        id: "bsc-biology",
        name: "BSc Biological Sciences",
        faculty: "Science",
        duration: "3 years",
        apsRequirement: 35,
        description: "Comprehensive study of living organisms.",
        subjects: [
          { name: "Life Sciences", level: 6, isRequired: true },
          { name: "Mathematics", level: 5, isRequired: true },
          { name: "English", level: 5, isRequired: true },
        ],
        careerProspects: [
          "Biologist",
          "Research Scientist",
          "Conservation Scientist",
          "Biotechnologist",
          "Environmental Consultant",
        ],
      },
      {
        id: "bsc-environmental-science",
        name: "BSc Environmental Science",
        faculty: "Science",
        duration: "3 years",
        apsRequirement: 33,
        description: "Study of environmental systems and sustainability.",
        subjects: [
          { name: "Life Sciences", level: 5, isRequired: true },
          { name: "Mathematics", level: 4, isRequired: true },
          { name: "English", level: 4, isRequired: true },
        ],
        careerProspects: [
          "Environmental Consultant",
          "Conservation Scientist",
          "Environmental Officer",
          "Sustainability Specialist",
          "Climate Change Analyst",
        ],
      },
      {
        id: "bsc-geology",
        name: "BSc Geology",
        faculty: "Science",
        duration: "3 years",
        apsRequirement: 34,
        description: "Study of Earth's structure, composition, and processes.",
        subjects: [
          { name: "Mathematics", level: 5, isRequired: true },
          { name: "Physical Sciences", level: 5, isRequired: true },
          { name: "English", level: 4, isRequired: true },
        ],
        careerProspects: [
          "Geologist",
          "Mining Geologist",
          "Environmental Geologist",
          "Hydrogeologist",
          "Petroleum Geologist",
        ],
      },
      {
        id: "bsc-statistics",
        name: "BSc Statistics",
        faculty: "Science",
        duration: "3 years",
        apsRequirement: 35,
        description: "Statistical analysis and data science methods.",
        subjects: [
          { name: "Mathematics", level: 6, isRequired: true },
          { name: "English", level: 4, isRequired: true },
        ],
        careerProspects: [
          "Statistician",
          "Data Analyst",
          "Market Researcher",
          "Quality Control Analyst",
          "Biostatistician",
        ],
      },
    ],
  },
  {
    id: "commerce",
    name: "Faculty of Commerce",
    description: `Business and economic education at ${universityName}.`,
    degrees: [
      COMMON_DEGREE_TEMPLATES.bcom,
      COMMON_DEGREE_TEMPLATES.accounting,
      {
        ...COMMON_DEGREE_TEMPLATES.bcom,
        id: "bcom-economics",
        name: "BCom Economics",
        description: "Economic theory and policy analysis.",
        apsRequirement: 30,
        careerProspects: [
          "Economist",
          "Policy Analyst",
          "Financial Analyst",
          "Research Officer",
          "Government Advisor",
        ],
      },
      {
        id: "bcom-marketing",
        name: "BCom Marketing",
        faculty: "Commerce",
        duration: "3 years",
        apsRequirement: 28,
        description:
          "Marketing strategy, consumer behavior, and brand management.",
        subjects: [
          { name: "English", level: 5, isRequired: true },
          { name: "Mathematics", level: 4, isRequired: true },
        ],
        careerProspects: [
          "Marketing Manager",
          "Brand Manager",
          "Digital Marketer",
          "Sales Manager",
          "Market Researcher",
        ],
      },
      {
        id: "bcom-finance",
        name: "BCom Finance",
        faculty: "Commerce",
        duration: "3 years",
        apsRequirement: 32,
        description: "Financial management, investment analysis, and banking.",
        subjects: [
          { name: "Mathematics", level: 5, isRequired: true },
          { name: "English", level: 5, isRequired: true },
        ],
        careerProspects: [
          "Financial Analyst",
          "Investment Advisor",
          "Bank Manager",
          "Financial Planner",
          "Portfolio Manager",
        ],
      },
      {
        id: "bcom-management",
        name: "BCom Management",
        faculty: "Commerce",
        duration: "3 years",
        apsRequirement: 26,
        description:
          "Business management, leadership, and organizational behavior.",
        subjects: [
          { name: "English", level: 5, isRequired: true },
          { name: "Mathematics", level: 4, isRequired: true },
        ],
        careerProspects: [
          "Business Manager",
          "Operations Manager",
          "Project Manager",
          "Human Resources Manager",
          "Consultant",
        ],
      },
    ],
  },
  {
    id: "humanities",
    name: "Faculty of Humanities",
    description: `Social sciences and humanities studies at ${universityName}.`,
    degrees: [
      COMMON_DEGREE_TEMPLATES.psychology,
      COMMON_DEGREE_TEMPLATES.socialWork,
      {
        id: "ba-english",
        name: "BA English",
        faculty: "Humanities",
        duration: "3 years",
        apsRequirement: 26,
        description: "Literature, language, and communication studies.",
        subjects: [
          { name: "English", level: 6, isRequired: true },
          { name: "Mathematics", level: 3, isRequired: true },
        ],
        careerProspects: [
          "English Teacher",
          "Editor",
          "Journalist",
          "Writer",
          "Communications Specialist",
        ],
      },
    ],
  },
  {
    id: "education",
    name: "Faculty of Education",
    description: `Teacher training and educational studies at ${universityName}.`,
    degrees: [
      COMMON_DEGREE_TEMPLATES.education,
      {
        ...COMMON_DEGREE_TEMPLATES.education,
        id: "bed-senior-phase",
        name: "BEd Senior Phase Teaching",
        description: "Training for senior phase (Grade 7-9) teaching.",
        apsRequirement: 28,
        careerProspects: [
          "Senior Phase Teacher",
          "Subject Head",
          "Deputy Principal",
          "Education Specialist",
          "Curriculum Advisor",
        ],
      },
    ],
  },
  {
    id: "engineering",
    name: "Faculty of Engineering",
    description: `Engineering education and innovation at ${universityName}.`,
    degrees: [
      COMMON_DEGREE_TEMPLATES.mechanicalEngineering,
      COMMON_DEGREE_TEMPLATES.electricalEngineering,
      COMMON_DEGREE_TEMPLATES.civilEngineering,
      {
        id: "beng-chemical",
        name: "BEng Chemical Engineering",
        faculty: "Engineering",
        duration: "4 years",
        apsRequirement: 38,
        description: "Chemical processes and industrial applications.",
        subjects: [
          { name: "Mathematics", level: 6, isRequired: true },
          { name: "Physical Sciences", level: 6, isRequired: true },
          { name: "English", level: 5, isRequired: true },
        ],
        careerProspects: [
          "Chemical Engineer",
          "Process Engineer",
          "Environmental Engineer",
          "Plant Manager",
          "Research Engineer",
        ],
      },
    ],
  },
  {
    id: "health-sciences",
    name: "Faculty of Health Sciences",
    description: `Health sciences and medical education at ${universityName}.`,
    degrees: [
      COMMON_DEGREE_TEMPLATES.nursing,
      COMMON_DEGREE_TEMPLATES.pharmacy,
      {
        id: "bsc-physiotherapy",
        name: "BSc Physiotherapy",
        faculty: "Health Sciences",
        duration: "4 years",
        apsRequirement: 35,
        description: "Physical therapy and rehabilitation science.",
        subjects: [
          { name: "English", level: 5, isRequired: true },
          { name: "Life Sciences", level: 6, isRequired: true },
          { name: "Mathematics", level: 5, isRequired: true },
          { name: "Physical Sciences", level: 5, isRequired: true },
        ],
        careerProspects: [
          "Physiotherapist",
          "Sports Therapist",
          "Rehabilitation Specialist",
          "Clinical Researcher",
          "Healthcare Manager",
        ],
      },
    ],
  },
  {
    id: "law",
    name: "Faculty of Law",
    description: `Legal education and jurisprudence at ${universityName}.`,
    degrees: [COMMON_DEGREE_TEMPLATES.law],
  },
];

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
