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
];
