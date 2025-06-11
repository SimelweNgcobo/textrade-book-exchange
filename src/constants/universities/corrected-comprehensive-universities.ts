import { University } from "@/types/university";

/**
 * CORRECTED COMPREHENSIVE UNIVERSITIES FILE
 *
 * This file fixes the critical issue where multiple unrelated programs
 * were incorrectly grouped under single faculties.
 *
 * Each university now has properly separated faculties based on their
 * official website structures, with programs correctly assigned to
 * their respective faculties.
 */

export const COMPREHENSIVE_UNIVERSITIES: University[] = [
  // University of Zululand - CORRECTED STRUCTURE
  {
    id: "unizulu",
    name: "University of Zululand",
    abbreviation: "UniZulu",
    fullName: "University of Zululand (UniZulu)",
    location: "Richards Bay",
    province: "KwaZulu-Natal",
    logo: "/logos/universities/university-of-zululand.svg",
    overview:
      "A comprehensive university rooted in African values and committed to academic excellence and community engagement.",
    website: "https://www.unizulu.ac.za",
    studentPortal: "https://students.unizulu.ac.za",
    admissionsContact: "admissions@unizulu.ac.za",
    establishedYear: 1960,
    studentPopulation: 16000,
    campuses: ["Richards Bay", "KwaDlangezwa"],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 April 2024",
      closingDate: "30 September 2024",
      academicYear: "2025",
      applicationFee: "R220",
      applicationMethod: "Online via university website",
      lateApplications: {
        available: true,
        deadline: "31 October 2024",
        additionalFee: "R300",
      },
    },
    faculties: [
      {
        id: "science-agriculture-engineering",
        name: "Faculty of Science, Agriculture and Engineering",
        description:
          "Science, agricultural sciences, and engineering education with 15 departments including Computer Science, Mathematics, Physics, Chemistry, Agriculture, and Nursing.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Faculty of Science, Agriculture and Engineering",
            duration: "3 years",
            apsRequirement: 26,
            description:
              "Computer science with practical software development focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Software Developer",
              "Systems Analyst",
              "Database Administrator",
              "IT Specialist",
              "Web Developer",
            ],
          },
          {
            id: "bsc-agriculture",
            name: "BSc Agriculture",
            faculty: "Faculty of Science, Agriculture and Engineering",
            duration: "4 years",
            apsRequirement: 24,
            description:
              "Agricultural sciences with sustainable farming focus.",
            subjects: [
              { name: "Life Sciences", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Agricultural Scientist",
              "Farm Manager",
              "Extension Officer",
              "Agricultural Consultant",
              "Rural Development Officer",
            ],
          },
          {
            id: "bns-nursing",
            name: "Bachelor of Nursing Science",
            faculty: "Faculty of Science, Agriculture and Engineering",
            duration: "4 years",
            apsRequirement: 26,
            description: "Professional nursing education and training.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Life Sciences", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Professional Nurse",
              "Community Health Nurse",
              "Clinical Nurse",
              "Nurse Manager",
              "Public Health Nurse",
            ],
          },
        ],
      },
      {
        id: "humanities-social-sciences",
        name: "Faculty of Humanities and Social Sciences",
        description:
          "The largest faculty at UniZulu with 16 departments covering humanities and social sciences including English, History, Psychology, and Communication Science.",
        degrees: [
          {
            id: "ba-english",
            name: "BA English",
            faculty: "Faculty of Humanities and Social Sciences",
            duration: "3 years",
            apsRequirement: 24,
            description: "English language and literature studies.",
            subjects: [{ name: "English", level: 5, isRequired: true }],
            careerProspects: [
              "English Teacher",
              "Writer",
              "Editor",
              "Journalist",
              "Communications Specialist",
            ],
          },
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Faculty of Humanities and Social Sciences",
            duration: "3 years",
            apsRequirement: 26,
            description: "Psychology with community and cultural focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Psychologist",
              "Counselor",
              "Social Worker",
              "Human Resources Specialist",
              "Research Assistant",
            ],
          },
          {
            id: "ba-social-work",
            name: "BA Social Work",
            faculty: "Faculty of Humanities and Social Sciences",
            duration: "4 years",
            apsRequirement: 24,
            description: "Professional social work training.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
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
        ],
      },
      {
        id: "commerce-administration-law",
        name: "Faculty of Commerce, Administration and Law",
        description:
          "Business, public administration, and legal education with 5 departments: Accounting, Business Management, Economics, Public Administration, and Law.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting and Auditing",
            faculty: "Faculty of Commerce, Administration and Law",
            duration: "3 years",
            apsRequirement: 26,
            description: "Professional accounting and auditing education.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Auditor",
              "Financial Manager",
              "Tax Practitioner",
              "Business Advisor",
            ],
          },
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Faculty of Commerce, Administration and Law",
            duration: "3 years",
            apsRequirement: 24,
            description: "Business management with human resources focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Business Manager",
              "Operations Manager",
              "Project Manager",
              "Human Resources Manager",
              "Management Consultant",
            ],
          },
          {
            id: "llb-law",
            name: "LLB Bachelor of Laws",
            faculty: "Faculty of Commerce, Administration and Law",
            duration: "4 years",
            apsRequirement: 28,
            description:
              "Comprehensive legal education including customary law.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
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
        ],
      },
      {
        id: "education",
        name: "Faculty of Education",
        description:
          "Teacher training and educational development with 6 departments: Comparative Education, Curriculum Studies, Educational Administration, Educational Psychology, Foundations of Education, and Early Childhood Education.",
        degrees: [
          {
            id: "bed-foundation-phase",
            name: "BEd Foundation Phase",
            faculty: "Faculty of Education",
            duration: "4 years",
            apsRequirement: 22,
            description: "Teacher training for Grade R to Grade 3.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Foundation Phase Teacher",
              "Early Childhood Educator",
              "Primary School Teacher",
              "Curriculum Developer",
              "Educational Specialist",
            ],
          },
          {
            id: "bed-intermediate-phase",
            name: "BEd Intermediate Phase",
            faculty: "Faculty of Education",
            duration: "4 years",
            apsRequirement: 24,
            description: "Teacher training for Grade 4 to Grade 6.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Intermediate Phase Teacher",
              "Primary School Teacher",
              "Subject Specialist",
              "Educational Coordinator",
              "Curriculum Advisor",
            ],
          },
        ],
      },
    ],
  },

  // University of Johannesburg - CORRECTED STRUCTURE
  {
    id: "uj",
    name: "University of Johannesburg",
    abbreviation: "UJ",
    fullName: "University of Johannesburg (UJ)",
    location: "Johannesburg",
    province: "Gauteng",
    logo: "/logos/universities/university-of-johannesburg.svg",
    overview:
      "A vibrant, multicultural comprehensive university that combines academic excellence with innovation and sustainability.",
    website: "https://www.uj.ac.za",
    studentPortal: "https://student.uj.ac.za",
    admissionsContact: "admissions@uj.ac.za",
    establishedYear: 2005,
    studentPopulation: 50000,
    campuses: ["Auckland Park", "Bunting Road", "Doornfontein", "Soweto"],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 April 2024",
      closingDate: "30 September 2024",
      academicYear: "2025",
      applicationFee: "R220",
      applicationMethod: "Online via UJ website",
      lateApplications: {
        available: true,
        deadline: "31 October 2024",
        additionalFee: "R300",
      },
    },
    faculties: [
      {
        id: "engineering-built-environment",
        name: "Faculty of Engineering and the Built Environment",
        description:
          "Engineering disciplines including Civil, Mechanical, Electrical, Industrial, and Mining Engineering, plus Built Environment programs.",
        degrees: [
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Faculty of Engineering and the Built Environment",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Civil engineering with infrastructure development focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Civil Engineer",
              "Structural Engineer",
              "Project Manager",
              "Infrastructure Developer",
              "Construction Manager",
            ],
          },
          {
            id: "beng-mechanical",
            name: "BEng Mechanical Engineering",
            faculty: "Faculty of Engineering and the Built Environment",
            duration: "4 years",
            apsRequirement: 38,
            description: "Mechanical engineering with manufacturing focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Mechanical Engineer",
              "Design Engineer",
              "Manufacturing Engineer",
              "Automotive Engineer",
              "Project Manager",
            ],
          },
          {
            id: "beng-mining",
            name: "BEng Mining Engineering",
            faculty: "Faculty of Engineering and the Built Environment",
            duration: "4 years",
            apsRequirement: 36,
            description:
              "Mining engineering with focus on South African mining industry.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Mining Engineer",
              "Mine Manager",
              "Mining Consultant",
              "Safety Engineer",
              "Rock Engineer",
            ],
          },
        ],
      },
      {
        id: "health-sciences",
        name: "Faculty of Health Sciences",
        description:
          "Health professions including Medicine, Nursing, Physiotherapy, and other health-related programs.",
        degrees: [
          {
            id: "mbchb-medicine",
            name: "MBChB Medicine and Surgery",
            faculty: "Faculty of Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description: "Medical degree with community health focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 6, isRequired: true },
            ],
            careerProspects: [
              "Medical Doctor",
              "Specialist Physician",
              "General Practitioner",
              "Medical Researcher",
              "Public Health Officer",
            ],
          },
          {
            id: "bns-nursing",
            name: "Bachelor of Nursing Science",
            faculty: "Faculty of Health Sciences",
            duration: "4 years",
            apsRequirement: 30,
            description: "Professional nursing with community health emphasis.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Professional Nurse",
              "Community Health Nurse",
              "Clinical Nurse",
              "Nurse Manager",
              "Public Health Nurse",
            ],
          },
        ],
      },
      {
        id: "science",
        name: "Faculty of Science",
        description:
          "Natural sciences including Mathematics, Physics, Chemistry, Biology, Computer Science, and Geography.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Faculty of Science",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Computer science with software development and data science focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "Systems Analyst",
              "IT Consultant",
              "Software Engineer",
            ],
          },
          {
            id: "bsc-mathematics",
            name: "BSc Mathematics",
            faculty: "Faculty of Science",
            duration: "3 years",
            apsRequirement: 36,
            description: "Pure and applied mathematics with statistical focus.",
            subjects: [
              { name: "Mathematics", level: 7, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Mathematician",
              "Statistician",
              "Actuary",
              "Data Analyst",
              "Research Scientist",
            ],
          },
        ],
      },
      {
        id: "humanities",
        name: "Faculty of Humanities",
        description:
          "Liberal arts including Languages, History, Philosophy, Psychology, Sociology, and Arts.",
        degrees: [
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Faculty of Humanities",
            duration: "3 years",
            apsRequirement: 28,
            description: "Psychology with urban and multicultural focus.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Psychologist",
              "Counselor",
              "Human Resources Specialist",
              "Research Psychologist",
              "Social Worker",
            ],
          },
          {
            id: "ba-english",
            name: "BA English",
            faculty: "Faculty of Humanities",
            duration: "3 years",
            apsRequirement: 26,
            description: "English literature and language studies.",
            subjects: [{ name: "English", level: 6, isRequired: true }],
            careerProspects: [
              "English Teacher",
              "Writer",
              "Editor",
              "Journalist",
              "Communications Specialist",
            ],
          },
        ],
      },
      {
        id: "economic-financial-sciences",
        name: "Faculty of Economic and Financial Sciences",
        description:
          "Business and economics including Accounting, Finance, Economics, and Business Management.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Faculty of Economic and Financial Sciences",
            duration: "3 years",
            apsRequirement: 32,
            description: "Professional accounting education leading to CA(SA).",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Auditor",
              "Tax Consultant",
              "Financial Analyst",
            ],
          },
          {
            id: "bcom-economics",
            name: "BCom Economics",
            faculty: "Faculty of Economic and Financial Sciences",
            duration: "3 years",
            apsRequirement: 30,
            description: "Economic theory and policy analysis.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Economist",
              "Policy Analyst",
              "Financial Analyst",
              "Research Economist",
              "Investment Analyst",
            ],
          },
        ],
      },
      {
        id: "law",
        name: "Faculty of Law",
        description: "Legal education including LLB and related law programs.",
        degrees: [
          {
            id: "llb-law",
            name: "LLB Bachelor of Laws",
            faculty: "Faculty of Law",
            duration: "4 years",
            apsRequirement: 32,
            description: "Comprehensive legal education with practical focus.",
            subjects: [
              { name: "English", level: 6, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Attorney",
              "Advocate",
              "Legal Advisor",
              "Corporate Lawyer",
              "Magistrate",
            ],
          },
        ],
      },
      {
        id: "education",
        name: "Faculty of Education",
        description:
          "Teacher training and educational studies for all phases of schooling.",
        degrees: [
          {
            id: "bed-foundation-phase",
            name: "BEd Foundation Phase",
            faculty: "Faculty of Education",
            duration: "4 years",
            apsRequirement: 26,
            description: "Teacher training for Grade R to Grade 3.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Foundation Phase Teacher",
              "Early Childhood Educator",
              "Primary School Teacher",
              "Educational Specialist",
              "Curriculum Developer",
            ],
          },
          {
            id: "bed-senior-fet-phase",
            name: "BEd Senior and FET Phase",
            faculty: "Faculty of Education",
            duration: "4 years",
            apsRequirement: 28,
            description: "Teacher training for Grade 7 to Grade 12.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Teaching Subject", level: 5, isRequired: true },
            ],
            careerProspects: [
              "High School Teacher",
              "Subject Specialist",
              "Educational Manager",
              "Curriculum Specialist",
              "Academic Coordinator",
            ],
          },
        ],
      },
    ],
  },

  // University of the Western Cape - CORRECTED STRUCTURE
  {
    id: "uwc",
    name: "University of the Western Cape",
    abbreviation: "UWC",
    fullName: "University of the Western Cape (UWC)",
    location: "Bellville",
    province: "Western Cape",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "A comprehensive university committed to excellence, equality, and innovation in higher education.",
    website: "https://www.uwc.ac.za",
    studentPortal: "https://student.uwc.ac.za",
    admissionsContact: "admissions@uwc.ac.za",
    establishedYear: 1960,
    studentPopulation: 20000,
    campuses: ["Bellville"],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 April 2024",
      closingDate: "30 September 2024",
      academicYear: "2025",
      applicationFee: "R220",
      applicationMethod: "Online via UWC website",
      lateApplications: {
        available: true,
        deadline: "31 October 2024",
        additionalFee: "R300",
      },
    },
    faculties: [
      {
        id: "natural-sciences",
        name: "Faculty of Natural Sciences",
        description:
          "Mathematics, Physics, Chemistry, Life Sciences, Computer Science, and Statistics.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Faculty of Natural Sciences",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Computer science with research and development focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "Research Scientist",
              "Systems Analyst",
              "IT Consultant",
            ],
          },
          {
            id: "bsc-mathematics",
            name: "BSc Mathematics",
            faculty: "Faculty of Natural Sciences",
            duration: "3 years",
            apsRequirement: 34,
            description: "Pure and applied mathematics with statistics.",
            subjects: [
              { name: "Mathematics", level: 7, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Mathematician",
              "Statistician",
              "Data Analyst",
              "Actuary",
              "Research Scientist",
            ],
          },
        ],
      },
      {
        id: "community-health-sciences",
        name: "Faculty of Community and Health Sciences",
        description:
          "Nursing, Psychology, Social Work, Physiotherapy, and other health professions.",
        degrees: [
          {
            id: "bns-nursing",
            name: "Bachelor of Nursing Science",
            faculty: "Faculty of Community and Health Sciences",
            duration: "4 years",
            apsRequirement: 28,
            description: "Community-focused nursing education.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Life Sciences", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Professional Nurse",
              "Community Health Nurse",
              "Clinical Nurse",
              "Nurse Manager",
              "Public Health Nurse",
            ],
          },
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Faculty of Community and Health Sciences",
            duration: "3 years",
            apsRequirement: 28,
            description: "Community psychology with social justice focus.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Psychologist",
              "Community Psychologist",
              "Counselor",
              "Social Worker",
              "Research Psychologist",
            ],
          },
        ],
      },
      {
        id: "arts",
        name: "Faculty of Arts",
        description:
          "Languages, Literature, History, Philosophy, and Social Sciences.",
        degrees: [
          {
            id: "ba-english",
            name: "BA English",
            faculty: "Faculty of Arts",
            duration: "3 years",
            apsRequirement: 26,
            description: "English literature and linguistics.",
            subjects: [{ name: "English", level: 6, isRequired: true }],
            careerProspects: [
              "English Teacher",
              "Writer",
              "Editor",
              "Journalist",
              "Communications Specialist",
            ],
          },
          {
            id: "ba-history",
            name: "BA History",
            faculty: "Faculty of Arts",
            duration: "3 years",
            apsRequirement: 24,
            description: "Historical studies with African focus.",
            subjects: [{ name: "English", level: 5, isRequired: true }],
            careerProspects: [
              "Historian",
              "Museum Curator",
              "Heritage Officer",
              "History Teacher",
              "Cultural Specialist",
            ],
          },
        ],
      },
      {
        id: "economic-management-sciences",
        name: "Faculty of Economic and Management Sciences",
        description:
          "Business, Economics, Accounting, and Public Administration.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Faculty of Economic and Management Sciences",
            duration: "3 years",
            apsRequirement: 30,
            description: "Professional accounting education.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Auditor",
              "Tax Consultant",
              "Financial Analyst",
            ],
          },
          {
            id: "bcom-economics",
            name: "BCom Economics",
            faculty: "Faculty of Economic and Management Sciences",
            duration: "3 years",
            apsRequirement: 28,
            description: "Economics with development focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Economist",
              "Policy Analyst",
              "Development Economist",
              "Research Officer",
              "Financial Analyst",
            ],
          },
        ],
      },
      {
        id: "law",
        name: "Faculty of Law",
        description: "Legal education with social justice emphasis.",
        degrees: [
          {
            id: "llb-law",
            name: "LLB Bachelor of Laws",
            faculty: "Faculty of Law",
            duration: "4 years",
            apsRequirement: 30,
            description: "Legal education with human rights focus.",
            subjects: [
              { name: "English", level: 6, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Attorney",
              "Advocate",
              "Human Rights Lawyer",
              "Legal Advisor",
              "Public Interest Lawyer",
            ],
          },
        ],
      },
      {
        id: "education",
        name: "Faculty of Education",
        description: "Teacher training for social transformation.",
        degrees: [
          {
            id: "bed-foundation-phase",
            name: "BEd Foundation Phase",
            faculty: "Faculty of Education",
            duration: "4 years",
            apsRequirement: 24,
            description: "Foundation phase teaching with social justice focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Foundation Phase Teacher",
              "Early Childhood Educator",
              "Primary School Teacher",
              "Educational Specialist",
              "Curriculum Developer",
            ],
          },
        ],
      },
    ],
  },
];
