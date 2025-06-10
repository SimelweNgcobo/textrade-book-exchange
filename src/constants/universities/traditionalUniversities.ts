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
  {
    id: "stellenbosch",
    name: "Stellenbosch University",
    abbreviation: "SU",
    fullName: "Stellenbosch University (SU)",
    location: "Stellenbosch",
    province: "Western Cape",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center",
    overview:
      "One of South Africa's leading research universities, known for academic excellence and beautiful campus surrounded by mountains and vineyards.",
    website: "https://www.sun.ac.za",
    studentPortal: "https://students.sun.ac.za",
    admissionsContact: "admissions@sun.ac.za",
    faculties: [
      {
        id: "economic",
        name: "Faculty of Economic and Management Sciences",
        description:
          "Comprehensive business education with programs in accounting, economics, and management.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economic and Management Sciences",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Comprehensive accounting program preparing students for professional practice in the field of accounting.",
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
            id: "bcom-economics",
            name: "BCom Economics",
            faculty: "Economic and Management Sciences",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Study economic theory and policy with focus on South African and global economic issues.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Economist",
              "Policy Analyst",
              "Research Analyst",
              "Investment Analyst",
              "Development Economist",
            ],
          },
        ],
      },
      {
        id: "engineering",
        name: "Faculty of Engineering",
        description:
          "Leading engineering education with strong industry connections.",
        degrees: [
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Comprehensive civil engineering program covering structural, water, and transportation engineering.",
            subjects: [
              { name: "Mathematics", level: 7, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Civil Engineer",
              "Structural Engineer",
              "Water Engineer",
              "Transportation Engineer",
              "Project Manager",
            ],
          },
        ],
      },
      {
        id: "medicine",
        name: "Faculty of Medicine and Health Sciences",
        description:
          "Prestigious medical education with excellent clinical training facilities.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Medicine and Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description:
              "Comprehensive medical degree preparing students for medical practice.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Medical Doctor",
              "Specialist Physician",
              "Surgeon",
              "Medical Researcher",
              "Public Health Officer",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "up",
    name: "University of Pretoria",
    abbreviation: "UP",
    fullName: "University of Pretoria (UP)",
    location: "Pretoria",
    province: "Gauteng",
    logo: "https://images.unsplash.com/photo-1599582909646-0685d46f5510?w=80&h=80&fit=crop&crop=center",
    overview:
      "One of South Africa's top research universities with a proud tradition of academic excellence. Known for its comprehensive range of programs and strong alumni network.",
    website: "https://www.up.ac.za",
    studentPortal: "https://students.up.ac.za",
    admissionsContact: "admissions@up.ac.za",
    faculties: [
      {
        id: "ems",
        name: "Faculty of Economic and Management Sciences",
        description:
          "Leading business and economic education with strong industry connections.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economic and Management Sciences",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Comprehensive accounting program with strong focus on professional practice.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Auditor",
              "Tax Specialist",
              "Management Consultant",
            ],
          },
        ],
      },
      {
        id: "engineering",
        name: "Faculty of Engineering, Built Environment and Information Technology",
        description:
          "Comprehensive engineering education with cutting-edge facilities.",
        degrees: [
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty:
              "Engineering, Built Environment and Information Technology",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Comprehensive civil engineering program with strong practical components.",
            subjects: [
              { name: "Mathematics", level: 7, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Civil Engineer",
              "Structural Engineer",
              "Project Manager",
              "Construction Manager",
              "Consulting Engineer",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ukzn",
    name: "University of KwaZulu-Natal",
    abbreviation: "UKZN",
    fullName: "University of KwaZulu-Natal (UKZN)",
    location: "Durban",
    province: "KwaZulu-Natal",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=80&h=80&fit=crop&crop=center",
    overview:
      "A leading African university positioned for global excellence and African advancement through innovation and collaborative engagement.",
    website: "https://www.ukzn.ac.za",
    studentPortal: "https://students.ukzn.ac.za",
    admissionsContact: "admissions@ukzn.ac.za",
    faculties: [
      {
        id: "health",
        name: "College of Health Sciences",
        description:
          "Comprehensive health sciences education with excellent clinical facilities.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description:
              "Comprehensive medical degree with strong focus on African health challenges.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Medical Doctor",
              "Specialist Physician",
              "Surgeon",
              "Medical Researcher",
              "Public Health Officer",
            ],
          },
        ],
      },
      {
        id: "agriculture",
        name: "School of Agricultural, Earth and Environmental Sciences",
        description:
          "Leading agricultural and environmental sciences education.",
        degrees: [
          {
            id: "bsc-agriculture",
            name: "BSc Agriculture",
            faculty: "Agricultural, Earth and Environmental Sciences",
            duration: "4 years",
            apsRequirement: 30,
            description:
              "Comprehensive agricultural science program focusing on sustainable farming practices.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Agricultural Scientist",
              "Farm Manager",
              "Agricultural Consultant",
              "Extension Officer",
              "Research Scientist",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "rhodes",
    name: "Rhodes University",
    abbreviation: "Rhodes",
    fullName: "Rhodes University",
    location: "Grahamstown (Makhanda)",
    province: "Eastern Cape",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "A small university with a big reputation for academic excellence and vibrant campus life.",
    website: "https://www.ru.ac.za",
    studentPortal: "https://students.ru.ac.za",
    admissionsContact: "admissions@ru.ac.za",
    faculties: [
      {
        id: "humanities",
        name: "Faculty of Humanities",
        description: "Leading humanities education with strong research focus.",
        degrees: [
          {
            id: "ba-english",
            name: "BA English",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 26,
            description:
              "Comprehensive English studies program with focus on literature and language.",
            subjects: [{ name: "English", level: 5, isRequired: true }],
            careerProspects: [
              "Teacher",
              "Writer",
              "Editor",
              "Journalist",
              "Communications Specialist",
            ],
          },
        ],
      },
      {
        id: "science",
        name: "Faculty of Science",
        description:
          "Excellent science education with strong research opportunities.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Comprehensive computer science program with strong theoretical foundation.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: false },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Software Developer",
              "Systems Analyst",
              "Database Administrator",
              "IT Consultant",
              "Research Scientist",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "uj",
    name: "University of Johannesburg",
    abbreviation: "UJ",
    fullName: "University of Johannesburg (UJ)",
    location: "Johannesburg",
    province: "Gauteng",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "A vibrant, cosmopolitan university offering world-class academic programs with a focus on innovation and excellence.",
    website: "https://www.uj.ac.za",
    studentPortal: "https://students.uj.ac.za",
    admissionsContact: "admissions@uj.ac.za",
    faculties: [
      {
        id: "engineering",
        name: "Faculty of Engineering and the Built Environment",
        description:
          "Innovative engineering education with strong industry partnerships.",
        degrees: [
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Engineering and the Built Environment",
            duration: "4 years",
            apsRequirement: 37,
            description:
              "Comprehensive civil engineering program with focus on infrastructure development.",
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
        ],
      },
      {
        id: "management",
        name: "College of Business and Economics",
        description:
          "Leading business education with strong focus on entrepreneurship.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Business and Economics",
            duration: "3 years",
            apsRequirement: 33,
            description:
              "Comprehensive accounting program with practical focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Auditor",
              "Tax Consultant",
              "Business Analyst",
            ],
          },
        ],
      },
    ],
  },
];
