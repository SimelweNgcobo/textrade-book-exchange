import { University } from "@/types/university";

export const TRADITIONAL_UNIVERSITIES: University[] = [
  {
    id: "uct",
    name: "University of Cape Town",
    abbreviation: "UCT",
    fullName: "University of Cape Town (UCT)",
    location: "Cape Town",
    province: "Western Cape",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=80&h=80&fit=crop&crop=center",
    overview:
      "Africa's leading university, UCT is renowned for its research excellence and beautiful campus situated beneath Table Mountain. It consistently ranks as the top university in Africa.",
    website: "https://www.uct.ac.za",
    studentPortal: "https://students.uct.ac.za",
    admissionsContact: "admissions@uct.ac.za",
    faculties: [
      {
        id: "commerce",
        name: "Faculty of Commerce",
        description:
          "Leading business education with programs in accounting, finance, economics, and management.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Comprehensive accounting program covering financial accounting, management accounting, auditing, and taxation.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Auditor",
              "Tax Advisor",
              "Financial Analyst",
            ],
          },
          {
            id: "bcom-finance",
            name: "BCom Finance",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Specialized finance program focusing on corporate finance, investments, and financial markets.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Investment Banker",
              "Financial Analyst",
              "Portfolio Manager",
              "Risk Manager",
              "Financial Planner",
            ],
          },
          {
            id: "bcom-economics",
            name: "BCom Economics",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Study of economic theory, policy, and analysis for understanding market dynamics and policy making.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Economics", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Economist",
              "Policy Analyst",
              "Financial Consultant",
              "Research Analyst",
              "Banking Professional",
            ],
          },
        ],
      },
      {
        id: "engineering",
        name: "Faculty of Engineering & the Built Environment",
        description:
          "World-class engineering programs including civil, electrical, mechanical, and chemical engineering.",
        degrees: [
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Design and construction of infrastructure including buildings, bridges, roads, and water systems.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Civil Engineer",
              "Structural Engineer",
              "Project Manager",
              "Construction Manager",
              "Infrastructure Planner",
            ],
          },
          {
            id: "beng-electrical",
            name: "BEng Electrical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 40,
            description:
              "Study of electrical systems, electronics, power generation, and control systems.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Electrical Engineer",
              "Electronics Engineer",
              "Power Systems Engineer",
              "Control Systems Engineer",
              "Telecommunications Engineer",
            ],
          },
        ],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Prestigious medical and health sciences programs including MBChB, pharmacy, and health rehabilitation.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description:
              "Comprehensive medical education to become a medical doctor.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Medical Doctor",
              "Specialist Physician",
              "Surgeon",
              "General Practitioner",
              "Medical Researcher",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "wits",
    name: "University of the Witwatersrand",
    abbreviation: "Wits",
    fullName: "University of the Witwatersrand (Wits)",
    location: "Johannesburg",
    province: "Gauteng",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=80&h=80&fit=crop&crop=center",
    overview:
      "A world-class African university that is internationally distinguished for its excellent research and teaching. Known for producing leaders in business, politics, and academia.",
    website: "https://www.wits.ac.za",
    studentPortal: "https://students.wits.ac.za",
    admissionsContact: "admissions@wits.ac.za",
    faculties: [
      {
        id: "commerce",
        name: "Faculty of Commerce, Law and Management",
        description:
          "Africa's leading business school offering undergraduate and postgraduate business programs.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Professional accounting education with focus on South African accounting standards.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Auditor",
              "Tax Consultant",
              "Financial Analyst",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ufs",
    name: "University of the Free State",
    abbreviation: "UFS",
    fullName: "University of the Free State (UFS)",
    location: "Bloemfontein",
    province: "Free State",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "A comprehensive university with a strong focus on academic excellence and community engagement. Known for its research in health sciences and agriculture.",
    website: "https://www.ufs.ac.za",
    studentPortal: "https://students.ufs.ac.za",
    admissionsContact: "admissions@ufs.ac.za",
    faculties: [
      {
        id: "economic",
        name: "Faculty of Economic and Management Sciences",
        description:
          "Comprehensive business education with strong industry partnerships.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Professional accounting education with CTA preparation focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Auditor",
              "Tax Consultant",
              "Management Accountant",
            ],
          },
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Business management with entrepreneurship and leadership focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Business Studies", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Business Manager",
              "Entrepreneur",
              "Operations Manager",
              "Project Manager",
              "Strategic Planner",
            ],
          },
          {
            id: "bcom-economics",
            name: "BCom Economics",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 33,
            description:
              "Economic theory and policy with development economics focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Economics", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Economist",
              "Policy Analyst",
              "Banking Professional",
              "Development Economist",
              "Research Analyst",
            ],
          },
        ],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Comprehensive health sciences education with focus on rural health.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 40,
            description:
              "Medical education with strong rural health and community medicine focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Medical Doctor",
              "Rural Health Practitioner",
              "Family Medicine Physician",
              "Public Health Professional",
              "Medical Researcher",
            ],
          },
          {
            id: "bchd",
            name: "BChD Dental Science",
            faculty: "Health Sciences",
            duration: "5 years",
            apsRequirement: 38,
            description: "Dental education with community dental health focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Dentist",
              "Community Dental Officer",
              "Oral Health Specialist",
              "Dental Public Health Professional",
              "Private Practice Owner",
            ],
          },
          {
            id: "bpharm",
            name: "BPharm Pharmacy",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 36,
            description:
              "Pharmaceutical sciences with clinical pharmacy and community health focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Pharmacist",
              "Clinical Pharmacist",
              "Community Pharmacist",
              "Hospital Pharmacist",
              "Pharmaceutical Researcher",
            ],
          },
        ],
      },
      {
        id: "natural",
        name: "Faculty of Natural and Agricultural Sciences",
        description:
          "Excellence in natural sciences, mathematics, and agricultural sciences.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Natural Sciences",
            duration: "3 years",
            apsRequirement: 33,
            description:
              "Computer science with software development and information systems focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Information Technology", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Software Developer",
              "Systems Analyst",
              "Database Administrator",
              "IT Consultant",
              "Web Developer",
            ],
          },
          {
            id: "bsc-agriculture",
            name: "BSc Agricultural Sciences",
            faculty: "Natural Sciences",
            duration: "4 years",
            apsRequirement: 30,
            description:
              "Agricultural science with sustainable farming and food security focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Agricultural Scientist",
              "Farm Manager",
              "Extension Officer",
              "Agricultural Consultant",
              "Food Security Specialist",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "uwc",
    name: "University of the Western Cape",
    abbreviation: "UWC",
    fullName: "University of the Western Cape (UWC)",
    location: "Cape Town",
    province: "Western Cape",
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=80&h=80&fit=crop&crop=center",
    overview:
      "A historically disadvantaged university that has transformed into a leading institution known for social justice, community engagement, and academic excellence.",
    website: "https://www.uwc.ac.za",
    studentPortal: "https://students.uwc.ac.za",
    admissionsContact: "admissions@uwc.ac.za",
    faculties: [
      {
        id: "economic",
        name: "Faculty of Economic and Management Sciences",
        description:
          "Business and economic education with focus on social development and transformation.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Accounting education with focus on transformation and social responsibility.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Auditor",
              "Public Sector Accountant",
              "Non-Profit Financial Manager",
            ],
          },
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 28,
            description:
              "Business management with social entrepreneurship and community development focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Business Studies", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Social Entrepreneur",
              "Community Development Manager",
              "NGO Manager",
              "Public Sector Manager",
              "Project Manager",
            ],
          },
        ],
      },
      {
        id: "dentistry",
        name: "Faculty of Dentistry",
        description:
          "Dental education with focus on community oral health and primary healthcare.",
        degrees: [
          {
            id: "bchd",
            name: "BChD Dental Science",
            faculty: "Dentistry",
            duration: "5 years",
            apsRequirement: 38,
            description:
              "Dental education with strong community oral health and primary healthcare focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Dentist",
              "Community Dental Officer",
              "Public Health Dentist",
              "Oral Health Educator",
              "Private Practice Owner",
            ],
          },
        ],
      },
      {
        id: "natural",
        name: "Faculty of Natural Sciences",
        description:
          "Natural sciences with focus on biodiversity, biotechnology, and environmental science.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Natural Sciences",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Computer science with software development and information systems focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Information Technology", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Software Developer",
              "Systems Analyst",
              "Web Developer",
              "Database Administrator",
              "IT Support Specialist",
            ],
          },
          {
            id: "bsc-biotechnology",
            name: "BSc Biotechnology",
            faculty: "Natural Sciences",
            duration: "3 years",
            apsRequirement: 33,
            description:
              "Biotechnology with focus on medical and agricultural applications.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Biotechnologist",
              "Research Scientist",
              "Quality Control Analyst",
              "Biomedical Researcher",
              "Pharmaceutical Researcher",
            ],
          },
        ],
      },
    ],
  },
];
