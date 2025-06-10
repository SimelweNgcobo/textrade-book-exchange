import { University, Faculty } from "@/types/university";

export const SOUTH_AFRICAN_UNIVERSITIES_SIMPLE = [
  // Traditional Universities
  {
    id: "uct",
    name: "University of Cape Town",
    abbreviation: "UCT",
    fullName: "University of Cape Town (UCT)",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "wits",
    name: "University of the Witwatersrand",
    abbreviation: "Wits",
    fullName: "University of the Witwatersrand (Wits)",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "stellenbosch",
    name: "Stellenbosch University",
    abbreviation: "SU",
    fullName: "Stellenbosch University (SU)",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "up",
    name: "University of Pretoria",
    abbreviation: "UP",
    fullName: "University of Pretoria (UP)",
    logo: "https://images.unsplash.com/photo-1599582909646-0685d46f5510?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "ukzn",
    name: "University of KwaZulu-Natal",
    abbreviation: "UKZN",
    fullName: "University of KwaZulu-Natal (UKZN)",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "rhodes",
    name: "Rhodes University",
    abbreviation: "Rhodes",
    fullName: "Rhodes University",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "uwc",
    name: "University of the Western Cape",
    abbreviation: "UWC",
    fullName: "University of the Western Cape (UWC)",
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "uj",
    name: "University of Johannesburg",
    abbreviation: "UJ",
    fullName: "University of Johannesburg (UJ)",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "ufs",
    name: "University of the Free State",
    abbreviation: "UFS",
    fullName: "University of the Free State (UFS)",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "ul",
    name: "University of Limpopo",
    abbreviation: "UL",
    fullName: "University of Limpopo (UL)",
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "unisa",
    name: "University of South Africa",
    abbreviation: "UNISA",
    fullName: "University of South Africa (UNISA)",
    logo: "https://images.unsplash.com/photo-1599582909646-0685d46f5510?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "unizulu",
    name: "University of Zululand",
    abbreviation: "UniZulu",
    fullName: "University of Zululand (UniZulu)",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "ufh",
    name: "University of Fort Hare",
    abbreviation: "UFH",
    fullName: "University of Fort Hare (UFH)",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
  },

  // Universities of Technology
  {
    id: "cput",
    name: "Cape Peninsula University of Technology",
    abbreviation: "CPUT",
    fullName: "Cape Peninsula University of Technology (CPUT)",
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "dut",
    name: "Durban University of Technology",
    abbreviation: "DUT",
    fullName: "Durban University of Technology (DUT)",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "tut",
    name: "Tshwane University of Technology",
    abbreviation: "TUT",
    fullName: "Tshwane University of Technology (TUT)",
    logo: "https://images.unsplash.com/photo-1599582909646-0685d46f5510?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "vut",
    name: "Vaal University of Technology",
    abbreviation: "VUT",
    fullName: "Vaal University of Technology (VUT)",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "cut",
    name: "Central University of Technology",
    abbreviation: "CUT",
    fullName: "Central University of Technology (CUT)",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "mut",
    name: "Mangosuthu University of Technology",
    abbreviation: "MUT",
    fullName: "Mangosuthu University of Technology (MUT)",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=80&h=80&fit=crop&crop=center",
  },

  // Comprehensive Universities
  {
    id: "nwu",
    name: "North-West University",
    abbreviation: "NWU",
    fullName: "North-West University (NWU)",
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "nmu",
    name: "Nelson Mandela University",
    abbreviation: "NMU",
    fullName: "Nelson Mandela University (NMU)",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "univen",
    name: "University of Venda",
    abbreviation: "UNIVEN",
    fullName: "University of Venda (UNIVEN)",
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "ump",
    name: "University of Mpumalanga",
    abbreviation: "UMP",
    fullName: "University of Mpumalanga (UMP)",
    logo: "https://images.unsplash.com/photo-1599582909646-0685d46f5510?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "spu",
    name: "Sol Plaatje University",
    abbreviation: "SPU",
    fullName: "Sol Plaatje University (SPU)",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "smu",
    name: "Sefako Makgatho Health Sciences University",
    abbreviation: "SMU",
    fullName: "Sefako Makgatho Health Sciences University (SMU)",
    logo: "https://images.unsplash.com/photo-1599582909646-0685d46f5510?w=80&h=80&fit=crop&crop=center",
  },
  {
    id: "wsu",
    name: "Walter Sisulu University",
    abbreviation: "WSU",
    fullName: "Walter Sisulu University (WSU)",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
  },
];

export const SOUTH_AFRICAN_UNIVERSITIES: University[] = [
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
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Business fundamentals including management, marketing, human resources, and strategic planning.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Business Studies", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Business Manager",
              "Project Manager",
              "Marketing Manager",
              "HR Manager",
              "Entrepreneur",
            ],
          },
          {
            id: "bcom-actuarial-science",
            name: "BCom Actuarial Science",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 38,
            description:
              "Mathematical and statistical methods applied to assess risk in insurance and finance industries.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: false },
            ],
            careerProspects: [
              "Actuary",
              "Risk Analyst",
              "Insurance Consultant",
              "Investment Analyst",
              "Pension Fund Manager",
            ],
          },
          {
            id: "bcom-information-systems",
            name: "BCom Information Systems",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 33,
            description:
              "Integration of technology and business processes to solve organizational problems.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Information Technology", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Business Analyst",
              "Systems Analyst",
              "IT Project Manager",
              "Database Administrator",
              "ERP Consultant",
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
          {
            id: "beng-mechanical",
            name: "BEng Mechanical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 39,
            description:
              "Design and manufacture of mechanical systems, machines, and thermal systems.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Mechanical Engineer",
              "Design Engineer",
              "Manufacturing Engineer",
              "Automotive Engineer",
              "HVAC Engineer",
            ],
          },
          {
            id: "beng-chemical",
            name: "BEng Chemical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 40,
            description:
              "Application of chemistry, physics, and mathematics to solve problems involving chemical processes.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chemical Engineer",
              "Process Engineer",
              "Environmental Engineer",
              "Petroleum Engineer",
              "Materials Engineer",
            ],
          },
          {
            id: "beng-industrial",
            name: "BEng Industrial Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Optimization of complex processes, systems, or organizations by developing, improving and implementing integrated systems.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Industrial Engineer",
              "Operations Manager",
              "Supply Chain Manager",
              "Quality Engineer",
              "Logistics Manager",
            ],
          },
          {
            id: "bas-architecture",
            name: "Bachelor of Architectural Studies",
            faculty: "Engineering",
            duration: "3 years",
            apsRequirement: 36,
            description:
              "Foundation program in architectural design, theory, and building technology.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Architect",
              "Urban Planner",
              "Interior Designer",
              "Construction Manager",
              "Heritage Consultant",
            ],
          },
          {
            id: "bsc-construction",
            name: "BSc Construction Studies",
            faculty: "Engineering",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Comprehensive study of construction management, economics, and project management.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Construction Manager",
              "Quantity Surveyor",
              "Project Manager",
              "Property Developer",
              "Building Inspector",
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
          {
            id: "bchd",
            name: "BChD Dental Science",
            faculty: "Health Sciences",
            duration: "5 years",
            apsRequirement: 40,
            description:
              "Training to become a dental practitioner specializing in oral health and dental care.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Dentist",
              "Oral Surgeon",
              "Orthodontist",
              "Dental Researcher",
              "Public Health Dentist",
            ],
          },
          {
            id: "bpharm",
            name: "BPharm Pharmacy",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Study of pharmaceutical sciences, drug development, and patient care.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Pharmacist",
              "Clinical Pharmacist",
              "Industrial Pharmacist",
              "Pharmaceutical Researcher",
              "Regulatory Affairs Specialist",
            ],
          },
          {
            id: "bscn-nursing",
            name: "BSc Nursing",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 32,
            description:
              "Professional nursing training emphasizing patient care and healthcare practices.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Registered Nurse",
              "Nurse Manager",
              "Clinical Nurse Specialist",
              "Nurse Educator",
              "Community Health Nurse",
            ],
          },
          {
            id: "bsc-physiotherapy",
            name: "BSc Physiotherapy",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 36,
            description:
              "Training in physical rehabilitation and movement sciences.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Physiotherapist",
              "Sports Therapist",
              "Rehabilitation Specialist",
              "Clinical Researcher",
              "Private Practice Owner",
            ],
          },
          {
            id: "bsc-occupational-therapy",
            name: "BSc Occupational Therapy",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 34,
            description:
              "Training to help people participate in daily activities through therapeutic intervention.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Occupational Therapist",
              "Rehabilitation Specialist",
              "Pediatric Therapist",
              "Mental Health Therapist",
              "Research Therapist",
            ],
          },
        ],
      },
      {
        id: "humanities",
        name: "Faculty of Humanities",
        description:
          "Comprehensive humanities programs including law, languages, social sciences, and arts.",
        degrees: [
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Study of human behavior, mental processes, and psychological research methods.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
              { name: "Life Sciences", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Psychologist",
              "Clinical Psychologist",
              "Counselor",
              "HR Specialist",
              "Research Psychologist",
            ],
          },
          {
            id: "ba-sociology",
            name: "BA Sociology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 28,
            description:
              "Study of society, social relationships, and social institutions.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Social Researcher",
              "Community Development Officer",
              "Policy Analyst",
              "Social Worker",
              "NGO Manager",
            ],
          },
          {
            id: "ba-english",
            name: "BA English Language and Literature",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Study of English literature, language, and literary criticism.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Writer",
              "Editor",
              "Journalist",
              "Teacher",
              "Content Creator",
              "Publishing Professional",
            ],
          },
          {
            id: "ba-history",
            name: "BA History",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 28,
            description:
              "Study of past events, historical analysis, and research methodology.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Historian",
              "Museum Curator",
              "Archivist",
              "Teacher",
              "Heritage Consultant",
              "Journalist",
            ],
          },
          {
            id: "ba-philosophy",
            name: "BA Philosophy",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Study of fundamental questions about existence, knowledge, values, and reasoning.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Philosopher",
              "Ethics Consultant",
              "Writer",
              "Teacher",
              "Policy Analyst",
              "Legal Professional",
            ],
          },
          {
            id: "ba-social-work",
            name: "BA Social Work",
            faculty: "Humanities",
            duration: "4 years",
            apsRequirement: 28,
            description:
              "Training to help individuals, families, and communities address social challenges.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Social Worker",
              "Community Development Officer",
              "Child Protection Officer",
              "Family Counselor",
              "Policy Advisor",
            ],
          },
          {
            id: "ba-anthropology",
            name: "BA Anthropology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 28,
            description:
              "Study of human societies, cultures, and their development.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Anthropologist",
              "Cultural Researcher",
              "Museum Professional",
              "International Development Worker",
              "Academic Researcher",
            ],
          },
        ],
      },
      {
        id: "science",
        name: "Faculty of Science",
        description:
          "Excellence in natural sciences, mathematics, computer science, and applied mathematics.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Programming, algorithms, software development, and computer systems.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Information Technology", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "System Analyst",
              "IT Consultant",
              "Cybersecurity Specialist",
            ],
          },
          {
            id: "bsc-mathematics",
            name: "BSc Mathematics",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 36,
            description:
              "Pure and applied mathematics, statistics, and mathematical modeling.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: false },
            ],
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
            apsRequirement: 36,
            description:
              "Study of matter, energy, and the fundamental laws of the universe.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Physicist",
              "Research Scientist",
              "Engineering Consultant",
              "Data Scientist",
              "Science Teacher",
            ],
          },
          {
            id: "bsc-chemistry",
            name: "BSc Chemistry",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Study of matter, its properties, composition, and reactions.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chemist",
              "Research Scientist",
              "Quality Control Analyst",
              "Environmental Consultant",
              "Pharmaceutical Researcher",
            ],
          },
          {
            id: "bsc-biology",
            name: "BSc Biological Sciences",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Study of living organisms and their interactions with the environment.",
            subjects: [
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: false },
            ],
            careerProspects: [
              "Biologist",
              "Research Scientist",
              "Biotechnologist",
              "Environmental Consultant",
              "Conservation Scientist",
            ],
          },
          {
            id: "bsc-geology",
            name: "BSc Geology",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 33,
            description: "Study of Earth's materials, processes, and history.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Geologist",
              "Mining Consultant",
              "Environmental Consultant",
              "Petroleum Geologist",
              "Research Scientist",
            ],
          },
          {
            id: "bsc-environmental-science",
            name: "BSc Environmental Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Interdisciplinary study of environmental problems and their solutions.",
            subjects: [
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Geography", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Environmental Scientist",
              "Conservation Specialist",
              "Environmental Consultant",
              "Climate Researcher",
              "Sustainability Manager",
            ],
          },
          {
            id: "bsc-actuarial-science",
            name: "BSc Actuarial Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 38,
            description:
              "Mathematical and statistical methods applied to assess risk in insurance and finance.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: false },
            ],
            careerProspects: [
              "Actuary",
              "Risk Analyst",
              "Insurance Consultant",
              "Investment Analyst",
              "Pension Fund Manager",
            ],
          },
        ],
      },
      {
        id: "law",
        name: "Faculty of Law",
        description:
          "One of Africa's leading law schools with a strong focus on constitutional and international law.",
        degrees: [
          {
            id: "llb",
            name: "LLB Law",
            faculty: "Law",
            duration: "4 years",
            apsRequirement: 36,
            description:
              "Comprehensive legal education covering various areas of law and legal practice.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Attorney",
              "Advocate",
              "Legal Advisor",
              "Prosecutor",
              "Magistrate",
              "Corporate Lawyer",
            ],
          },
          {
            id: "ba-law",
            name: "BA Law",
            faculty: "Law",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Undergraduate foundation in legal studies and jurisprudence.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Legal Assistant",
              "Paralegal",
              "Court Administrator",
              "Legal Researcher",
              "Compliance Officer",
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
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Business fundamentals including management, marketing, human resources, and strategic planning.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Business Studies", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Business Manager",
              "Project Manager",
              "Marketing Manager",
              "HR Manager",
              "Entrepreneur",
            ],
          },
          {
            id: "bcom-economics",
            name: "BCom Economics",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Economic theory and policy analysis with focus on African economies.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Economics", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Economist",
              "Policy Analyst",
              "Banking Professional",
              "Investment Analyst",
              "Development Consultant",
            ],
          },
          {
            id: "llb-law",
            name: "LLB Law",
            faculty: "Commerce",
            duration: "4 years",
            apsRequirement: 36,
            description:
              "Comprehensive legal education with focus on constitutional and commercial law.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Attorney",
              "Advocate",
              "Corporate Lawyer",
              "Legal Advisor",
              "Prosecutor",
            ],
          },
        ],
      },
      {
        id: "engineering",
        name: "School of Engineering",
        description:
          "Renowned engineering programs with strong industry connections and research focus.",
        degrees: [
          {
            id: "beng-mining",
            name: "BEng Mining Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 39,
            description:
              "Specialized program focusing on mineral extraction, mine design, and resource management.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Mining Engineer",
              "Mine Manager",
              "Geological Engineer",
              "Resource Analyst",
              "Mining Consultant",
            ],
          },
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Infrastructure design and construction with focus on African development needs.",
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
              "Electrical systems and power engineering with renewable energy focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Electrical Engineer",
              "Power Systems Engineer",
              "Renewable Energy Specialist",
              "Automation Engineer",
              "Project Manager",
            ],
          },
          {
            id: "beng-mechanical",
            name: "BEng Mechanical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 39,
            description:
              "Mechanical systems design and manufacturing engineering.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
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
            id: "beng-industrial",
            name: "BEng Industrial Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 38,
            description: "Optimization of industrial processes and systems.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Industrial Engineer",
              "Operations Manager",
              "Supply Chain Manager",
              "Quality Engineer",
              "Process Improvement Specialist",
            ],
          },
          {
            id: "beng-computer",
            name: "BEng Computer Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 40,
            description: "Computer hardware and software systems integration.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Computer Engineer",
              "Software Engineer",
              "Systems Engineer",
              "Embedded Systems Developer",
              "IT Consultant",
            ],
          },
        ],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Comprehensive health sciences education including medicine, dentistry, and nursing.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description:
              "Medical education with clinical training at renowned teaching hospitals.",
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
              "Medical Researcher",
              "Public Health Professional",
            ],
          },
          {
            id: "bds-dentistry",
            name: "BDS Dentistry",
            faculty: "Health Sciences",
            duration: "5 years",
            apsRequirement: 40,
            description:
              "Dental education with comprehensive clinical training.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Dentist",
              "Oral Surgeon",
              "Orthodontist",
              "Dental Public Health Specialist",
              "Dental Researcher",
            ],
          },
          {
            id: "bpharm",
            name: "BPharm Pharmacy",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Pharmaceutical sciences with clinical pharmacy focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Pharmacist",
              "Clinical Pharmacist",
              "Hospital Pharmacist",
              "Pharmaceutical Researcher",
              "Regulatory Affairs Manager",
            ],
          },
        ],
      },
      {
        id: "humanities",
        name: "Faculty of Humanities",
        description:
          "Diverse humanities programs including social sciences, languages, and performing arts.",
        degrees: [
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Psychological science with African perspectives and community focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
              { name: "Life Sciences", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Psychologist",
              "Clinical Psychologist",
              "Research Psychologist",
              "HR Professional",
              "Counselor",
            ],
          },
          {
            id: "ba-social-work",
            name: "BA Social Work",
            faculty: "Humanities",
            duration: "4 years",
            apsRequirement: 28,
            description:
              "Professional social work training with community development focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Social Worker",
              "Community Development Officer",
              "Child Protection Specialist",
              "Policy Analyst",
              "NGO Manager",
            ],
          },
          {
            id: "ba-international-relations",
            name: "BA International Relations",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Global politics and diplomacy with African international relations focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Diplomat",
              "International Relations Analyst",
              "Policy Researcher",
              "NGO Professional",
              "Journalist",
            ],
          },
        ],
      },
      {
        id: "science",
        name: "Faculty of Science",
        description:
          "Leading science education and research in natural sciences and mathematics.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Computer science with artificial intelligence and data science focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Information Technology", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "AI Specialist",
              "Cybersecurity Analyst",
              "Research Scientist",
            ],
          },
          {
            id: "bsc-mathematics",
            name: "BSc Mathematics",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 36,
            description:
              "Pure and applied mathematics with statistical modeling.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: false },
            ],
            careerProspects: [
              "Mathematician",
              "Data Scientist",
              "Actuary",
              "Research Scientist",
              "Financial Analyst",
            ],
          },
          {
            id: "bsc-physics",
            name: "BSc Physics",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 36,
            description:
              "Physics with materials science and renewable energy applications.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Physicist",
              "Materials Scientist",
              "Energy Researcher",
              "Engineering Consultant",
              "Science Educator",
            ],
          },
        ],
      },
    ],
  },
];

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
