import { University } from "@/types/university";

export const COMPREHENSIVE_UNIVERSITIES: University[] = [
  {
    id: "nwu",
    name: "North-West University",
    abbreviation: "NWU",
    fullName: "North-West University (NWU)",
    location: "Potchefstroom/Mafikeng/Vaal Triangle",
    province: "North West",
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=80&h=80&fit=crop&crop=center",
    overview:
      "A comprehensive university with three campuses offering diverse academic programs with strong focus on research and community engagement.",
    website: "https://www.nwu.ac.za",
    studentPortal: "https://students.nwu.ac.za",
    admissionsContact: "admissions@nwu.ac.za",
    faculties: [
      {
        id: "economic",
        name: "Faculty of Economic and Management Sciences",
        description:
          "Business and economic education with focus on African economic development.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Professional accounting education with focus on African business contexts.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Management Accountant",
              "Tax Consultant",
              "Auditor",
            ],
          },
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 28,
            description:
              "Business management with entrepreneurship and small business development focus.",
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
              "Small Business Owner",
            ],
          },
        ],
      },
      {
        id: "education",
        name: "Faculty of Education",
        description:
          "Teacher education with focus on multilingual and multicultural education.",
        degrees: [
          {
            id: "bed-foundation",
            name: "BEd Foundation Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 24,
            description:
              "Teacher training for Grade R to Grade 3 with multilingual education focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Foundation Phase Teacher",
              "Early Childhood Development Specialist",
              "Educational Consultant",
              "Curriculum Developer",
            ],
          },
        ],
      },
      {
        id: "natural",
        name: "Faculty of Natural and Agricultural Sciences",
        description:
          "Natural sciences and agriculture with focus on sustainable development.",
        degrees: [
          {
            id: "bsc-agriculture",
            name: "BSc Agriculture",
            faculty: "Natural Sciences",
            duration: "4 years",
            apsRequirement: 28,
            description:
              "Agricultural science with sustainable farming and rural development focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Agricultural Scientist",
              "Farm Manager",
              "Extension Officer",
              "Rural Development Specialist",
              "Agricultural Consultant",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "nmu",
    name: "Nelson Mandela University",
    abbreviation: "NMU",
    fullName: "Nelson Mandela University (NMU)",
    location: "Port Elizabeth",
    province: "Eastern Cape",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "A comprehensive university committed to social justice and transformation, offering diverse programs with strong community engagement focus.",
    website: "https://www.mandela.ac.za",
    studentPortal: "https://students.mandela.ac.za",
    admissionsContact: "admissions@mandela.ac.za",
    faculties: [
      {
        id: "business",
        name: "Faculty of Business and Economic Sciences",
        description:
          "Business education with focus on entrepreneurship and economic development.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Business",
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
              "Public Sector Accountant",
              "Auditor",
              "Tax Consultant",
            ],
          },
        ],
      },
      {
        id: "engineering",
        name: "Faculty of Engineering, the Built Environment and Technology",
        description:
          "Engineering and technology education with focus on sustainable development.",
        degrees: [
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 35,
            description:
              "Civil engineering with infrastructure development and sustainability focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Civil Engineer",
              "Infrastructure Engineer",
              "Environmental Engineer",
              "Project Manager",
              "Construction Manager",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "univen",
    name: "University of Venda",
    abbreviation: "UNIVEN",
    fullName: "University of Venda (UNIVEN)",
    location: "Thohoyandou",
    province: "Limpopo",
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=80&h=80&fit=crop&crop=center",
    overview:
      "A comprehensive university serving the northern regions of South Africa with focus on rural development and community engagement.",
    website: "https://www.univen.ac.za",
    studentPortal: "https://students.univen.ac.za",
    admissionsContact: "admissions@univen.ac.za",
    faculties: [
      {
        id: "management",
        name: "School of Management Sciences",
        description:
          "Management education with focus on rural development and entrepreneurship.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Management",
            duration: "3 years",
            apsRequirement: 28,
            description:
              "Accounting education with focus on rural and small business contexts.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Accountant",
              "Small Business Financial Manager",
              "Community Development Financial Officer",
              "Auditor",
              "Tax Practitioner",
            ],
          },
        ],
      },
      {
        id: "agriculture",
        name: "School of Agriculture",
        description:
          "Agricultural education with focus on subsistence and sustainable farming.",
        degrees: [
          {
            id: "bsc-agriculture",
            name: "BSc Agriculture",
            faculty: "Agriculture",
            duration: "4 years",
            apsRequirement: 26,
            description:
              "Agricultural science with focus on rural development and subsistence farming.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Agricultural Extension Officer",
              "Rural Development Specialist",
              "Farm Manager",
              "Agricultural Consultant",
              "Food Security Specialist",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ul",
    name: "University of Limpopo",
    abbreviation: "UL",
    fullName: "University of Limpopo (UL)",
    location: "Polokwane",
    province: "Limpopo",
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=80&h=80&fit=crop&crop=center",
    overview:
      "A comprehensive university committed to providing quality education and addressing the development needs of the Limpopo province and beyond.",
    website: "https://www.ul.ac.za",
    studentPortal: "https://students.ul.ac.za",
    admissionsContact: "admissions@ul.ac.za",
    faculties: [
      {
        id: "economic",
        name: "Faculty of Economic and Management Sciences",
        description:
          "Business and economic education with focus on rural economic development.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 28,
            description:
              "Accounting education with focus on rural business and development contexts.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Accountant",
              "Financial Manager",
              "Rural Development Financial Officer",
              "Government Accountant",
              "Small Business Advisor",
            ],
          },
        ],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Health sciences education with focus on rural and primary healthcare.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 38,
            description:
              "Medical education with strong rural health and primary healthcare focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Medical Doctor",
              "Rural Health Practitioner",
              "Primary Healthcare Physician",
              "Community Health Officer",
              "Public Health Professional",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "unisa",
    name: "University of South Africa",
    abbreviation: "UNISA",
    fullName: "University of South Africa (UNISA)",
    location: "Pretoria",
    province: "Gauteng",
    logo: "https://images.unsplash.com/photo-1599582909646-0685d46f5510?w=80&h=80&fit=crop&crop=center",
    overview:
      "Africa's largest distance education university, offering flexible study options and comprehensive academic programs to students across the continent.",
    website: "https://www.unisa.ac.za",
    studentPortal: "https://students.unisa.ac.za",
    admissionsContact: "admissions@unisa.ac.za",
    faculties: [
      {
        id: "economic",
        name: "College of Economic and Management Sciences",
        description:
          "Distance learning business education with flexible study options.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 26,
            description:
              "Distance learning accounting education with flexible study schedules.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Bookkeeper",
              "Tax Practitioner",
              "Financial Analyst",
            ],
          },
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 24,
            description:
              "Distance learning business management with flexible study options.",
            subjects: [
              { name: "Mathematics", level: 3, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Business Manager",
              "Operations Manager",
              "Project Manager",
              "Administrative Manager",
              "Small Business Owner",
            ],
          },
        ],
      },
      {
        id: "education",
        name: "College of Education",
        description:
          "Distance learning teacher education with flexible study schedules.",
        degrees: [
          {
            id: "bed-foundation",
            name: "BEd Foundation Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 22,
            description:
              "Distance learning teacher training for Grade R to Grade 3.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Foundation Phase Teacher",
              "Early Childhood Development Practitioner",
              "Educational Assistant",
              "Tutor",
              "Learning Support Specialist",
            ],
          },
        ],
      },
      {
        id: "law",
        name: "College of Law",
        description:
          "Distance learning legal education with comprehensive law programs.",
        degrees: [
          {
            id: "llb",
            name: "LLB Law",
            faculty: "Law",
            duration: "4 years",
            apsRequirement: 30,
            description:
              "Distance learning legal education with flexible study schedules.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Attorney",
              "Legal Advisor",
              "Paralegal",
              "Prosecutor",
              "Legal Researcher",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ufh",
    name: "University of Fort Hare",
    abbreviation: "UFH",
    fullName: "University of Fort Hare (UFH)",
    location: "Alice",
    province: "Eastern Cape",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "A historic university known as the 'Oxford of Africa', with a proud tradition of producing African leaders and promoting social transformation.",
    website: "https://www.ufh.ac.za",
    studentPortal: "https://students.ufh.ac.za",
    admissionsContact: "admissions@ufh.ac.za",
    faculties: [
      {
        id: "management",
        name: "Faculty of Management and Commerce",
        description:
          "Business education with focus on African leadership and social transformation.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Management",
            duration: "3 years",
            apsRequirement: 28,
            description:
              "Accounting education with focus on African business contexts and transformation.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Government Accountant",
              "Development Finance Officer",
              "Auditor",
            ],
          },
        ],
      },
      {
        id: "social",
        name: "Faculty of Social Sciences and Humanities",
        description:
          "Social sciences and humanities with focus on African philosophy and development.",
        degrees: [
          {
            id: "ba-social-work",
            name: "BA Social Work",
            faculty: "Social Sciences",
            duration: "4 years",
            apsRequirement: 24,
            description:
              "Social work education with focus on community development and social transformation.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Social Worker",
              "Community Development Officer",
              "Child Protection Officer",
              "NGO Manager",
              "Policy Advocate",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ump",
    name: "University of Mpumalanga",
    abbreviation: "UMP",
    fullName: "University of Mpumalanga (UMP)",
    location: "Nelspruit",
    province: "Mpumalanga",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "A young, dynamic university committed to transforming communities through accessible higher education and research.",
    website: "https://www.ump.ac.za",
    studentPortal: "https://students.ump.ac.za",
    admissionsContact: "admissions@ump.ac.za",
    faculties: [
      {
        id: "education",
        name: "Faculty of Education",
        description:
          "Comprehensive teacher training and educational development programs.",
        degrees: [
          {
            id: "bed-foundation",
            name: "BEd Foundation Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 24,
            description:
              "Foundation phase teacher training focusing on early childhood development.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Foundation Phase Teacher",
              "Early Childhood Development Specialist",
              "Educational Coordinator",
              "Curriculum Developer",
              "Education Administrator",
            ],
          },
        ],
      },
      {
        id: "agriculture",
        name: "Faculty of Agriculture and Natural Sciences",
        description:
          "Agricultural education focusing on sustainable development and food security.",
        degrees: [
          {
            id: "bsc-agriculture",
            name: "BSc Agriculture",
            faculty: "Agriculture and Natural Sciences",
            duration: "4 years",
            apsRequirement: 28,
            description:
              "Comprehensive agricultural science program with focus on sustainable farming.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "Life Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Agricultural Scientist",
              "Farm Manager",
              "Extension Officer",
              "Agricultural Consultant",
              "Research Officer",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "spu",
    name: "Sol Plaatje University",
    abbreviation: "SPU",
    fullName: "Sol Plaatje University (SPU)",
    location: "Kimberley",
    province: "Northern Cape",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "South Africa's newest comprehensive university, established in 2014, committed to excellence in teaching, learning and research.",
    website: "https://www.spu.ac.za",
    studentPortal: "https://students.spu.ac.za",
    admissionsContact: "admissions@spu.ac.za",
    faculties: [
      {
        id: "humanities",
        name: "Faculty of Humanities",
        description:
          "Comprehensive humanities education with focus on African scholarship.",
        degrees: [
          {
            id: "ba-english",
            name: "BA English Studies",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 26,
            description:
              "English studies program with emphasis on African literature and language development.",
            subjects: [{ name: "English", level: 5, isRequired: true }],
            careerProspects: [
              "Teacher",
              "Writer",
              "Editor",
              "Journalist",
              "Language Practitioner",
            ],
          },
        ],
      },
      {
        id: "natural",
        name: "Faculty of Natural and Agricultural Sciences",
        description: "Science education with focus on sustainable development.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science and Information Systems",
            faculty: "Natural and Agricultural Sciences",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Computer science program with focus on information systems and technology solutions.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Software Developer",
              "Systems Analyst",
              "IT Specialist",
              "Database Administrator",
              "Web Developer",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "smu",
    name: "Sefako Makgatho Health Sciences University",
    abbreviation: "SMU",
    fullName: "Sefako Makgatho Health Sciences University (SMU)",
    location: "Pretoria",
    province: "Gauteng",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "A dedicated health sciences university committed to training healthcare professionals for Africa.",
    website: "https://www.smu.ac.za",
    studentPortal: "https://students.smu.ac.za",
    admissionsContact: "admissions@smu.ac.za",
    faculties: [
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Comprehensive health sciences education with focus on African health challenges.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description:
              "Medical degree with strong focus on primary healthcare and community medicine.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Medical Doctor",
              "Specialist Physician",
              "Public Health Officer",
              "Medical Researcher",
              "Community Health Practitioner",
            ],
          },
          {
            id: "bpharm",
            name: "BPharm Pharmacy",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 35,
            description:
              "Comprehensive pharmacy education focusing on pharmaceutical care.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Pharmacist",
              "Clinical Pharmacist",
              "Hospital Pharmacist",
              "Pharmaceutical Researcher",
              "Drug Safety Specialist",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "wsu",
    name: "Walter Sisulu University",
    abbreviation: "WSU",
    fullName: "Walter Sisulu University (WSU)",
    location: "Mthatha",
    province: "Eastern Cape",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "A comprehensive university committed to providing quality higher education that responds to the development needs of its communities.",
    website: "https://www.wsu.ac.za",
    studentPortal: "https://students.wsu.ac.za",
    admissionsContact: "admissions@wsu.ac.za",
    faculties: [
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Health sciences education serving rural and underserved communities.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 40,
            description:
              "Medical degree with focus on rural healthcare and community medicine.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Medical Doctor",
              "Rural Health Practitioner",
              "Public Health Officer",
              "Community Health Worker",
              "Medical Researcher",
            ],
          },
        ],
      },
      {
        id: "education",
        name: "Faculty of Education",
        description:
          "Teacher training with focus on rural and disadvantaged communities.",
        degrees: [
          {
            id: "bed-foundation",
            name: "BEd Foundation Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 24,
            description:
              "Foundation phase teacher training with community development focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Foundation Phase Teacher",
              "Education Coordinator",
              "Community Education Developer",
              "Curriculum Specialist",
              "Educational Support Officer",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "unizulu",
    name: "University of Zululand",
    abbreviation: "UniZulu",
    fullName: "University of Zululand (UniZulu)",
    location: "KwaDlangezwa",
    province: "KwaZulu-Natal",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "A comprehensive university rooted in African values and committed to academic excellence and community engagement.",
    website: "https://www.unizulu.ac.za",
    studentPortal: "https://students.unizulu.ac.za",
    admissionsContact: "admissions@unizulu.ac.za",
    faculties: [
      {
        id: "arts",
        name: "Faculty of Arts",
        description: "Comprehensive humanities and social sciences education.",
        degrees: [
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Arts",
            duration: "3 years",
            apsRequirement: 26,
            description:
              "Psychology program with focus on African psychological perspectives.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: false },
            ],
            careerProspects: [
              "Psychologist",
              "Counselor",
              "Social Worker",
              "Human Resources Specialist",
              "Research Assistant",
            ],
          },
        ],
      },
      {
        id: "science",
        name: "Faculty of Science and Agriculture",
        description: "Science and agricultural education with community focus.",
        degrees: [
          {
            id: "bsc-agriculture",
            name: "BSc Agriculture",
            faculty: "Science and Agriculture",
            duration: "4 years",
            apsRequirement: 28,
            description:
              "Agricultural science program focusing on sustainable farming practices.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "Life Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Agricultural Scientist",
              "Farm Manager",
              "Extension Officer",
              "Agricultural Researcher",
              "Rural Development Officer",
            ],
          },
        ],
      },
    ],
  },
];
