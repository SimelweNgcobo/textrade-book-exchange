import { University, Faculty } from "@/types/university";
import {
  ALL_SOUTH_AFRICAN_UNIVERSITIES,
  SOUTH_AFRICAN_UNIVERSITIES_SIMPLE as SIMPLE_LIST,
} from "./universities";

// Export the simplified list for basic operations
export const SOUTH_AFRICAN_UNIVERSITIES_SIMPLE = SIMPLE_LIST;

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
  {
    id: "stellenbosch",
    name: "Stellenbosch University",
    abbreviation: "SU",
    fullName: "Stellenbosch University (SU)",
    location: "Stellenbosch",
    province: "Western Cape",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center",
    overview:
      "A leading research-intensive university with a 350-year academic tradition. Known for its beautiful campus and strong academic reputation across multiple disciplines.",
    website: "https://www.sun.ac.za",
    studentPortal: "https://students.sun.ac.za",
    admissionsContact: "admissions@sun.ac.za",
    faculties: [
      {
        id: "economic",
        name: "Faculty of Economic and Management Sciences",
        description:
          "Comprehensive business and economic programs with strong industry partnerships.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Professional accounting with focus on IFRS and South African accounting standards.",
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
              "CFO",
            ],
          },
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Strategic business management with entrepreneurship focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Business Studies", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Business Manager",
              "Entrepreneur",
              "Consultant",
              "Project Manager",
              "Strategic Planner",
            ],
          },
          {
            id: "bcom-economics",
            name: "BCom Economics",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 35,
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
              "Development Consultant",
              "Banking Professional",
              "Research Economist",
            ],
          },
          {
            id: "bba",
            name: "BBA Business Administration",
            faculty: "Economic Sciences",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "General business administration with international business focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Business Administrator",
              "Operations Manager",
              "International Business Specialist",
              "Marketing Manager",
              "HR Manager",
            ],
          },
        ],
      },
      {
        id: "engineering",
        name: "Faculty of Engineering",
        description:
          "Innovative engineering programs with a focus on sustainable development.",
        degrees: [
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Civil engineering with sustainable infrastructure focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
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
          {
            id: "beng-electrical",
            name: "BEng Electrical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 40,
            description:
              "Electrical engineering with renewable energy and smart systems focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Electrical Engineer",
              "Power Systems Engineer",
              "Renewable Energy Engineer",
              "Control Systems Engineer",
              "Electronics Engineer",
            ],
          },
          {
            id: "beng-mechanical",
            name: "BEng Mechanical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 39,
            description:
              "Mechanical engineering with focus on manufacturing and design.",
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
            id: "beng-industrial",
            name: "BEng Industrial Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Industrial engineering with operations research and systems optimization.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Industrial Engineer",
              "Operations Manager",
              "Supply Chain Manager",
              "Quality Manager",
              "Process Engineer",
            ],
          },
          {
            id: "beng-chemical",
            name: "BEng Chemical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 40,
            description:
              "Chemical engineering with biotechnology and environmental focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chemical Engineer",
              "Process Engineer",
              "Environmental Engineer",
              "Biotechnology Engineer",
              "Petroleum Engineer",
            ],
          },
        ],
      },
      {
        id: "medicine",
        name: "Faculty of Medicine and Health Sciences",
        description:
          "Leading medical education and research in sub-Saharan Africa.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Medicine",
            duration: "6 years",
            apsRequirement: 42,
            description:
              "Medical education with rural health and African health challenges focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Medical Doctor",
              "Rural Health Practitioner",
              "Specialist Physician",
              "Public Health Professional",
              "Medical Researcher",
            ],
          },
          {
            id: "bsc-physiotherapy",
            name: "BSc Physiotherapy",
            faculty: "Medicine",
            duration: "4 years",
            apsRequirement: 36,
            description:
              "Physiotherapy with sports medicine and rehabilitation focus.",
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
              "Private Practice Owner",
              "Research Physiotherapist",
            ],
          },
          {
            id: "bsc-occupational-therapy",
            name: "BSc Occupational Therapy",
            faculty: "Medicine",
            duration: "4 years",
            apsRequirement: 34,
            description: "Occupational therapy with community health focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Occupational Therapist",
              "Community Health Therapist",
              "Pediatric Therapist",
              "Mental Health Therapist",
              "Rehabilitation Manager",
            ],
          },
          {
            id: "bsc-dietetics",
            name: "BSc Dietetics",
            faculty: "Medicine",
            duration: "4 years",
            apsRequirement: 33,
            description: "Nutrition science and dietetic practice.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Dietitian",
              "Clinical Nutritionist",
              "Sports Nutritionist",
              "Public Health Nutritionist",
              "Research Nutritionist",
            ],
          },
        ],
      },
      {
        id: "arts",
        name: "Faculty of Arts and Social Sciences",
        description:
          "Rich humanities and social sciences programs with multilingual education.",
        degrees: [
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Arts",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Psychological science with multicultural and bilingual focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Psychologist",
              "Research Psychologist",
              "HR Professional",
              "Counselor",
              "Educational Psychologist",
            ],
          },
          {
            id: "ba-sociology",
            name: "BA Sociology",
            faculty: "Arts",
            duration: "3 years",
            apsRequirement: 28,
            description: "Sociology with South African social dynamics focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Sociologist",
              "Social Researcher",
              "Community Development Officer",
              "Policy Analyst",
              "NGO Professional",
            ],
          },
          {
            id: "ba-political-science",
            name: "BA Political Science",
            faculty: "Arts",
            duration: "3 years",
            apsRequirement: 29,
            description:
              "Political science with African governance and democracy studies.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Political Analyst",
              "Policy Researcher",
              "Government Official",
              "Political Journalist",
              "Diplomat",
            ],
          },
          {
            id: "ba-english",
            name: "BA English",
            faculty: "Arts",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "English literature and language with African literature focus.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Writer",
              "Editor",
              "Journalist",
              "Teacher",
              "Literary Critic",
              "Publisher",
            ],
          },
          {
            id: "ba-afrikaans",
            name: "BA Afrikaans and Nederlands",
            faculty: "Arts",
            duration: "3 years",
            apsRequirement: 28,
            description: "Afrikaans and Dutch language and literature studies.",
            subjects: [
              { name: "Afrikaans", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Language Teacher",
              "Translator",
              "Editor",
              "Cultural Officer",
              "Media Professional",
            ],
          },
        ],
      },
      {
        id: "science",
        name: "Faculty of Science",
        description:
          "Excellence in natural sciences, mathematics, and technology.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Computer science with machine learning and cybersecurity focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Information Technology", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "Cybersecurity Specialist",
              "AI Engineer",
              "Systems Analyst",
            ],
          },
          {
            id: "bsc-mathematics",
            name: "BSc Mathematics",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 36,
            description:
              "Pure and applied mathematics with computational mathematics.",
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
              "Quantitative Analyst",
            ],
          },
          {
            id: "bsc-physics",
            name: "BSc Physics",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 36,
            description: "Physics with astronomy and materials science focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Physicist",
              "Astronomer",
              "Materials Scientist",
              "Research Scientist",
              "Engineering Consultant",
            ],
          },
          {
            id: "bsc-chemistry",
            name: "BSc Chemistry",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Chemistry with wine chemistry and polymer science focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chemist",
              "Wine Chemist",
              "Materials Scientist",
              "Environmental Scientist",
              "Quality Control Analyst",
            ],
          },
          {
            id: "bsc-biology",
            name: "BSc Biological Sciences",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 34,
            description: "Biology with biodiversity and conservation focus.",
            subjects: [
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Biologist",
              "Conservation Scientist",
              "Marine Biologist",
              "Biotechnologist",
              "Environmental Consultant",
            ],
          },
        ],
      },
      {
        id: "agrisciences",
        name: "Faculty of AgriSciences",
        description:
          "Agricultural sciences with focus on food security and sustainable farming.",
        degrees: [
          {
            id: "bsc-agriculture",
            name: "BSc Agriculture",
            faculty: "AgriSciences",
            duration: "4 years",
            apsRequirement: 32,
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
              "Agricultural Consultant",
              "Extension Officer",
              "Research Scientist",
            ],
          },
          {
            id: "bsc-viticulture",
            name: "BSc Viticulture and Oenology",
            faculty: "AgriSciences",
            duration: "4 years",
            apsRequirement: 33,
            description:
              "Wine making and grape cultivation - unique program in Africa.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Winemaker",
              "Viticulturist",
              "Wine Quality Manager",
              "Cellar Master",
              "Wine Consultant",
            ],
          },
          {
            id: "bsc-food-science",
            name: "BSc Food Science",
            faculty: "AgriSciences",
            duration: "4 years",
            apsRequirement: 33,
            description: "Food science and technology with food safety focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Food Scientist",
              "Food Safety Manager",
              "Quality Control Manager",
              "Product Development Specialist",
              "Food Inspector",
            ],
          },
        ],
      },
      {
        id: "law",
        name: "Faculty of Law",
        description:
          "Comprehensive legal education with focus on constitutional and commercial law.",
        degrees: [
          {
            id: "llb",
            name: "LLB Law",
            faculty: "Law",
            duration: "4 years",
            apsRequirement: 36,
            description:
              "Legal education with constitutional law and human rights focus.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Attorney",
              "Advocate",
              "Corporate Lawyer",
              "Human Rights Lawyer",
              "Legal Advisor",
            ],
          },
        ],
      },
      {
        id: "education",
        name: "Faculty of Education",
        description: "Teacher education and educational leadership programs.",
        degrees: [
          {
            id: "bed-foundation",
            name: "BEd Foundation Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 26,
            description: "Teacher training for Grade R to Grade 3.",
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
          {
            id: "bed-intermediate",
            name: "BEd Intermediate Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 26,
            description: "Teacher training for Grade 4 to Grade 6.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Intermediate Phase Teacher",
              "Subject Specialist",
              "Educational Consultant",
              "School Principal",
            ],
          },
          {
            id: "bed-senior",
            name: "BEd Senior Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 28,
            description: "Teacher training for Grade 7 to Grade 9.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Senior Phase Teacher",
              "Subject Head",
              "Educational Manager",
              "Curriculum Specialist",
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
          "Leading business education with programs in economics, management, and public administration.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economics",
            duration: "3 years",
            apsRequirement: 34,
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
              "Tax Consultant",
              "Auditor",
              "Financial Analyst",
            ],
          },
          {
            id: "bcom-finance",
            name: "BCom Finance",
            faculty: "Economics",
            duration: "3 years",
            apsRequirement: 35,
            description: "Corporate finance and investment management focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Investment Manager",
              "Corporate Finance Specialist",
              "Risk Manager",
              "Portfolio Manager",
              "Financial Planner",
            ],
          },
          {
            id: "bcom-economics",
            name: "BCom Economics",
            faculty: "Economics",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Economic theory and econometrics with development economics.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Economics", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Economist",
              "Economic Researcher",
              "Policy Analyst",
              "Banking Professional",
              "Development Economist",
            ],
          },
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Economics",
            duration: "3 years",
            apsRequirement: 32,
            description: "Strategic management and organizational behavior.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Business Studies", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Business Manager",
              "Strategic Planner",
              "Operations Manager",
              "HR Manager",
              "Management Consultant",
            ],
          },
          {
            id: "bcom-marketing",
            name: "BCom Marketing Management",
            faculty: "Economics",
            duration: "3 years",
            apsRequirement: 31,
            description: "Marketing strategy and consumer behavior.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Marketing Manager",
              "Brand Manager",
              "Digital Marketing Specialist",
              "Market Researcher",
              "Advertising Executive",
            ],
          },
          {
            id: "bpa",
            name: "BPA Public Administration",
            faculty: "Economics",
            duration: "3 years",
            apsRequirement: 29,
            description: "Public sector management and governance.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Public Administrator",
              "Government Official",
              "Policy Analyst",
              "Municipal Manager",
              "NGO Manager",
            ],
          },
        ],
      },
      {
        id: "engineering",
        name: "Faculty of Engineering, Built Environment and Information Technology",
        description:
          "Comprehensive engineering and IT programs with strong industry connections.",
        degrees: [
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Civil engineering with infrastructure development focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Civil Engineer",
              "Structural Engineer",
              "Transportation Engineer",
              "Water Engineer",
              "Construction Manager",
            ],
          },
          {
            id: "beng-electrical",
            name: "BEng Electrical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 40,
            description:
              "Electrical engineering with power systems and electronics.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Electrical Engineer",
              "Power Systems Engineer",
              "Electronics Engineer",
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
              "Mechanical engineering with thermodynamics and design focus.",
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
              "Energy Engineer",
            ],
          },
          {
            id: "beng-chemical",
            name: "BEng Chemical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 40,
            description:
              "Chemical engineering with process optimization focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chemical Engineer",
              "Process Engineer",
              "Environmental Engineer",
              "Petrochemical Engineer",
              "Materials Engineer",
            ],
          },
          {
            id: "beng-industrial",
            name: "BEng Industrial Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 38,
            description: "Industrial engineering with systems optimization.",
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
            id: "bit",
            name: "BIT Information Technology",
            faculty: "Engineering",
            duration: "3 years",
            apsRequirement: 33,
            description:
              "Information technology with software development focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Information Technology", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Software Developer",
              "Systems Analyst",
              "Database Administrator",
              "IT Project Manager",
              "Cybersecurity Specialist",
            ],
          },
          {
            id: "barch",
            name: "BArch Architecture",
            faculty: "Engineering",
            duration: "5 years",
            apsRequirement: 36,
            description:
              "Architectural design with sustainable architecture focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Architect",
              "Urban Planner",
              "Interior Designer",
              "Heritage Architect",
              "Construction Manager",
            ],
          },
        ],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Comprehensive health sciences education including medicine, dentistry, and veterinary science.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description: "Medical education with academic hospital training.",
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
              "Academic Medicine",
              "Public Health Professional",
            ],
          },
          {
            id: "bchd",
            name: "BChD Dentistry",
            faculty: "Health Sciences",
            duration: "5 years",
            apsRequirement: 40,
            description: "Dental education with oral health focus.",
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
              "Public Health Dentist",
              "Dental Academic",
            ],
          },
          {
            id: "bvsc",
            name: "BVSc Veterinary Science",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 38,
            description:
              "Veterinary medicine with wildlife and livestock focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Veterinarian",
              "Wildlife Veterinarian",
              "Research Veterinarian",
              "Public Health Veterinarian",
              "Private Practice Owner",
            ],
          },
          {
            id: "bsc-nursing",
            name: "BSc Nursing",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 32,
            description: "Professional nursing with community health focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Registered Nurse",
              "Nurse Manager",
              "Community Health Nurse",
              "Clinical Nurse Specialist",
              "Nurse Educator",
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
    location: "Durban/Pietermaritzburg",
    province: "KwaZulu-Natal",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=80&h=80&fit=crop&crop=center",
    overview:
      "A premier research university in Africa, committed to academic excellence and social responsiveness. Known for its diverse student body and strong research output.",
    website: "https://www.ukzn.ac.za",
    studentPortal: "https://students.ukzn.ac.za",
    admissionsContact: "admissions@ukzn.ac.za",
    faculties: [
      {
        id: "agriculture",
        name: "Faculty of Agriculture, Engineering and Science",
        description:
          "Comprehensive programs in agriculture, engineering, and natural sciences.",
        degrees: [
          {
            id: "bsc-agriculture",
            name: "BSc Agriculture",
            faculty: "Agriculture",
            duration: "4 years",
            apsRequirement: 32,
            description:
              "Agricultural science with focus on sustainable farming and food security in Africa.",
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
              "Research Scientist",
            ],
          },
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Agriculture",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Civil engineering with focus on infrastructure development in Africa.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
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
          {
            id: "beng-electrical",
            name: "BEng Electrical Engineering",
            faculty: "Agriculture",
            duration: "4 years",
            apsRequirement: 40,
            description:
              "Electrical engineering with renewable energy and power systems focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Electrical Engineer",
              "Power Systems Engineer",
              "Renewable Energy Engineer",
              "Control Systems Engineer",
              "Project Manager",
            ],
          },
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Agriculture",
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
              "Systems Analyst",
              "IT Consultant",
            ],
          },
          {
            id: "bsc-mathematics",
            name: "BSc Mathematics",
            faculty: "Agriculture",
            duration: "3 years",
            apsRequirement: 36,
            description:
              "Pure and applied mathematics with statistical analysis focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: false },
            ],
            careerProspects: [
              "Mathematician",
              "Statistician",
              "Data Analyst",
              "Actuary",
              "Research Scientist",
            ],
          },
          {
            id: "bsc-physics",
            name: "BSc Physics",
            faculty: "Agriculture",
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
              "Research Scientist",
              "Engineering Consultant",
              "Energy Analyst",
            ],
          },
        ],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Medical and health sciences education serving the healthcare needs of KwaZulu-Natal.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description:
              "Medical education with focus on rural health and African healthcare challenges.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Medical Doctor",
              "Rural Health Practitioner",
              "Specialist Physician",
              "Public Health Professional",
              "Medical Researcher",
            ],
          },
          {
            id: "bsc-nursing",
            name: "BSc Nursing",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 32,
            description:
              "Professional nursing with community and primary healthcare focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Registered Nurse",
              "Community Health Nurse",
              "Clinical Nurse Specialist",
              "Nurse Manager",
              "Public Health Nurse",
            ],
          },
          {
            id: "bpharm",
            name: "BPharm Pharmacy",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Pharmaceutical sciences with clinical pharmacy and pharmaceutical care focus.",
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
              "Community Pharmacist",
              "Pharmaceutical Researcher",
            ],
          },
        ],
      },
      {
        id: "humanities",
        name: "Faculty of Humanities, Development and Social Sciences",
        description:
          "Rich humanities and social sciences programs with African and development perspectives.",
        degrees: [
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Psychological science with African psychology and community mental health focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Psychologist",
              "Community Psychologist",
              "Research Psychologist",
              "Clinical Psychologist",
              "Educational Psychologist",
            ],
          },
          {
            id: "ba-social-work",
            name: "BA Social Work",
            faculty: "Humanities",
            duration: "4 years",
            apsRequirement: 28,
            description:
              "Professional social work with community development and social justice focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Social Worker",
              "Community Development Officer",
              "Child Protection Specialist",
              "Family Counselor",
              "Policy Analyst",
            ],
          },
          {
            id: "ba-development-studies",
            name: "BA Development Studies",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 28,
            description:
              "Development theory and practice with focus on African development challenges.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Development Practitioner",
              "Policy Analyst",
              "NGO Professional",
              "International Development Worker",
              "Research Analyst",
            ],
          },
          {
            id: "ba-political-science",
            name: "BA Political Science",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 29,
            description:
              "Political science with African governance and democratic studies focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Political Analyst",
              "Policy Researcher",
              "Government Official",
              "Political Journalist",
              "International Relations Specialist",
            ],
          },
        ],
      },
      {
        id: "education",
        name: "Faculty of Education",
        description:
          "Teacher education and educational leadership preparing educators for diverse contexts.",
        degrees: [
          {
            id: "bed-foundation",
            name: "BEd Foundation Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 26,
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
          {
            id: "bed-intermediate",
            name: "BEd Intermediate Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 26,
            description:
              "Teacher training for Grade 4 to Grade 6 with subject specialization.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Intermediate Phase Teacher",
              "Subject Specialist",
              "Educational Manager",
              "Curriculum Specialist",
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
    location: "Grahamstown",
    province: "Eastern Cape",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "A prestigious residential university known for academic excellence, small class sizes, and vibrant campus life. Strong liberal arts tradition with excellent research output.",
    website: "https://www.ru.ac.za",
    studentPortal: "https://students.ru.ac.za",
    admissionsContact: "admissions@ru.ac.za",
    faculties: [
      {
        id: "commerce",
        name: "Faculty of Commerce",
        description:
          "Business education with focus on ethical leadership and sustainable business practices.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Professional accounting education with strong ethical foundation.",
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
            id: "bcom-economics",
            name: "BCom Economics",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 35,
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
              "Development Economist",
              "Banking Professional",
              "Research Analyst",
            ],
          },
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 32,
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
              "Management Consultant",
              "Project Manager",
              "Strategic Planner",
            ],
          },
        ],
      },
      {
        id: "humanities",
        name: "Faculty of Humanities",
        description:
          "Liberal arts education with strong tradition in languages, literature, and social sciences.",
        degrees: [
          {
            id: "ba-english",
            name: "BA English Language and Literature",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "English literature and language with creative writing and critical analysis focus.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Writer",
              "Editor",
              "Journalist",
              "Teacher",
              "Literary Critic",
              "Publisher",
            ],
          },
          {
            id: "ba-journalism",
            name: "BA Journalism and Media Studies",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Journalism and media studies with digital media and investigative journalism focus.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Journalist",
              "Media Producer",
              "Content Creator",
              "Communications Manager",
              "Digital Media Specialist",
            ],
          },
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Psychological science with strong research methodology foundation.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Psychologist",
              "Research Psychologist",
              "Clinical Psychologist",
              "Educational Psychologist",
              "HR Professional",
            ],
          },
          {
            id: "ba-political-science",
            name: "BA Politics and International Studies",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 29,
            description:
              "Political science and international relations with African politics focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Political Analyst",
              "Diplomat",
              "Policy Researcher",
              "International Relations Specialist",
              "Government Official",
            ],
          },
          {
            id: "ba-sociology",
            name: "BA Sociology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 28,
            description:
              "Sociological analysis with focus on South African social dynamics.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Sociologist",
              "Social Researcher",
              "Community Development Officer",
              "Policy Analyst",
              "NGO Professional",
            ],
          },
        ],
      },
      {
        id: "science",
        name: "Faculty of Science",
        description:
          "Natural sciences with strong research focus and excellent staff-student ratios.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Computer science with artificial intelligence and software engineering focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Information Technology", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "AI Specialist",
              "Systems Analyst",
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
              "Pure and applied mathematics with strong theoretical foundation.",
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
              "Statistical Analyst",
            ],
          },
          {
            id: "bsc-physics",
            name: "BSc Physics",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 36,
            description:
              "Physics with theoretical physics and materials science focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Physicist",
              "Research Scientist",
              "Materials Scientist",
              "Engineering Consultant",
              "Science Educator",
            ],
          },
          {
            id: "bsc-chemistry",
            name: "BSc Chemistry",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Chemistry with analytical chemistry and environmental applications focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chemist",
              "Analytical Chemist",
              "Environmental Scientist",
              "Quality Control Analyst",
              "Research Scientist",
            ],
          },
          {
            id: "bsc-biology",
            name: "BSc Biological Sciences",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Biology with biodiversity and conservation biology focus.",
            subjects: [
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Biologist",
              "Conservation Scientist",
              "Research Scientist",
              "Environmental Consultant",
              "Marine Biologist",
            ],
          },
        ],
      },
      {
        id: "pharmacy",
        name: "Faculty of Pharmacy",
        description:
          "Pharmaceutical education with clinical pharmacy and pharmaceutical care focus.",
        degrees: [
          {
            id: "bpharm",
            name: "BPharm Pharmacy",
            faculty: "Pharmacy",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Pharmaceutical sciences with clinical pharmacy and community practice focus.",
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
        id: "law",
        name: "Faculty of Law",
        description:
          "Legal education with strong foundation in constitutional law and human rights.",
        degrees: [
          {
            id: "llb",
            name: "LLB Law",
            faculty: "Law",
            duration: "4 years",
            apsRequirement: 36,
            description:
              "Legal education with constitutional law, human rights, and environmental law focus.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Attorney",
              "Advocate",
              "Human Rights Lawyer",
              "Environmental Lawyer",
              "Legal Advisor",
            ],
          },
        ],
      },
      {
        id: "education",
        name: "Faculty of Education",
        description:
          "Teacher education with focus on critical pedagogy and inclusive education.",
        degrees: [
          {
            id: "bed-foundation",
            name: "BEd Foundation Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 26,
            description:
              "Teacher training for Grade R to Grade 3 with inclusive education focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Foundation Phase Teacher",
              "Inclusive Education Specialist",
              "Educational Consultant",
              "Curriculum Developer",
            ],
          },
          {
            id: "bed-intermediate",
            name: "BEd Intermediate Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 26,
            description:
              "Teacher training for Grade 4 to Grade 6 with subject specialization focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Intermediate Phase Teacher",
              "Subject Specialist",
              "Educational Manager",
              "School Principal",
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
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center",
    overview:
      "A dynamic and cosmopolitan university known for innovation and excellence. UJ offers world-class academic programs with a focus on global citizenship and social impact.",
    website: "https://www.uj.ac.za",
    studentPortal: "https://students.uj.ac.za",
    admissionsContact: "admissions@uj.ac.za",
    faculties: [
      {
        id: "engineering",
        name: "Faculty of Engineering and the Built Environment",
        description:
          "Engineering education with focus on innovation and sustainable development.",
        degrees: [
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Civil engineering with urban infrastructure and sustainable construction focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Civil Engineer",
              "Urban Planner",
              "Construction Manager",
              "Infrastructure Engineer",
              "Project Manager",
            ],
          },
          {
            id: "beng-electrical",
            name: "BEng Electrical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 40,
            description:
              "Electrical engineering with smart grid technology and renewable energy focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Electrical Engineer",
              "Power Systems Engineer",
              "Smart Grid Engineer",
              "Renewable Energy Specialist",
              "Automation Engineer",
            ],
          },
          {
            id: "beng-mechanical",
            name: "BEng Mechanical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 39,
            description:
              "Mechanical engineering with manufacturing and automotive focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Mechanical Engineer",
              "Automotive Engineer",
              "Manufacturing Engineer",
              "Design Engineer",
              "Project Manager",
            ],
          },
          {
            id: "beng-industrial",
            name: "BEng Industrial Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Industrial engineering with supply chain management and optimization focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Industrial Engineer",
              "Supply Chain Manager",
              "Operations Manager",
              "Quality Engineer",
              "Logistics Manager",
            ],
          },
        ],
      },
      {
        id: "management",
        name: "Faculty of Management",
        description:
          "Business and management education with focus on African business contexts.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Management",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Professional accounting with international accounting standards focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Accounting", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Management Accountant",
              "Auditor",
              "Tax Consultant",
            ],
          },
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Management",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Business management with entrepreneurship and innovation focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Business Studies", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Business Manager",
              "Entrepreneur",
              "Strategic Planner",
              "Operations Manager",
              "Management Consultant",
            ],
          },
          {
            id: "bcom-marketing",
            name: "BCom Marketing Management",
            faculty: "Management",
            duration: "3 years",
            apsRequirement: 31,
            description:
              "Marketing management with digital marketing and brand management focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Marketing Manager",
              "Brand Manager",
              "Digital Marketing Specialist",
              "Market Research Analyst",
              "Advertising Manager",
            ],
          },
          {
            id: "bba",
            name: "BBA Business Administration",
            faculty: "Management",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Business administration with international business and leadership focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Business Administrator",
              "International Business Manager",
              "Project Manager",
              "Operations Manager",
              "Strategic Planner",
            ],
          },
        ],
      },
      {
        id: "science",
        name: "Faculty of Science",
        description:
          "Natural sciences with focus on innovation and technology transfer.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Computer science with cybersecurity and software engineering focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Information Technology", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Software Developer",
              "Cybersecurity Specialist",
              "Data Scientist",
              "Systems Analyst",
              "IT Project Manager",
            ],
          },
          {
            id: "bsc-mathematics",
            name: "BSc Mathematics",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 36,
            description:
              "Pure and applied mathematics with data science applications.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: false },
            ],
            careerProspects: [
              "Mathematician",
              "Data Scientist",
              "Statistician",
              "Actuary",
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
              "Physics with applied physics and materials science focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Physicist",
              "Materials Scientist",
              "Research Scientist",
              "Engineering Consultant",
              "Technology Developer",
            ],
          },
        ],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Health sciences education with focus on primary healthcare and community health.",
        degrees: [
          {
            id: "bsc-nursing",
            name: "BSc Nursing",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 32,
            description:
              "Professional nursing with primary healthcare and community nursing focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Registered Nurse",
              "Primary Healthcare Nurse",
              "Community Health Nurse",
              "Nurse Manager",
              "Public Health Nurse",
            ],
          },
          {
            id: "bsc-emergency-medical-care",
            name: "BSc Emergency Medical Care",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 33,
            description:
              "Emergency medical care with pre-hospital emergency medicine focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Emergency Medical Practitioner",
              "Paramedic",
              "Emergency Care Technician",
              "Ambulance Service Manager",
              "Emergency Department Coordinator",
            ],
          },
        ],
      },
      {
        id: "humanities",
        name: "Faculty of Humanities",
        description:
          "Humanities education with focus on social justice and transformation.",
        degrees: [
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Psychological science with community psychology and social psychology focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Psychologist",
              "Community Psychologist",
              "Research Psychologist",
              "HR Professional",
              "Social Psychology Specialist",
            ],
          },
          {
            id: "ba-social-work",
            name: "BA Social Work",
            faculty: "Humanities",
            duration: "4 years",
            apsRequirement: 28,
            description:
              "Professional social work with urban social work and community development focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Social Worker",
              "Community Development Officer",
              "Urban Social Worker",
              "Policy Analyst",
              "NGO Manager",
            ],
          },
          {
            id: "ba-english",
            name: "BA English",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "English language and literature with creative writing and media studies focus.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Writer",
              "Editor",
              "Journalist",
              "Content Creator",
              "Communications Manager",
            ],
          },
        ],
      },
      {
        id: "law",
        name: "Faculty of Law",
        description:
          "Legal education with focus on constitutional law and social justice.",
        degrees: [
          {
            id: "llb",
            name: "LLB Law",
            faculty: "Law",
            duration: "4 years",
            apsRequirement: 36,
            description:
              "Legal education with constitutional law, commercial law, and social justice focus.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Attorney",
              "Advocate",
              "Corporate Lawyer",
              "Human Rights Lawyer",
              "Legal Advisor",
            ],
          },
        ],
      },
      {
        id: "art",
        name: "Faculty of Art, Design and Architecture",
        description:
          "Creative arts education with focus on design thinking and innovation.",
        degrees: [
          {
            id: "ba-fine-art",
            name: "BA Fine Art",
            faculty: "Art",
            duration: "3 years",
            apsRequirement: 26,
            description:
              "Fine arts with contemporary art practice and visual culture focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Artist",
              "Curator",
              "Art Teacher",
              "Gallery Manager",
              "Art Therapist",
            ],
          },
          {
            id: "ba-graphic-design",
            name: "BA Graphic Design",
            faculty: "Art",
            duration: "3 years",
            apsRequirement: 28,
            description:
              "Graphic design with digital media and brand identity focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Graphic Designer",
              "Brand Designer",
              "Digital Designer",
              "Creative Director",
              "UI/UX Designer",
            ],
          },
          {
            id: "barch",
            name: "BArch Architecture",
            faculty: "Art",
            duration: "5 years",
            apsRequirement: 36,
            description:
              "Architecture with sustainable design and urban planning focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Architect",
              "Urban Designer",
              "Sustainable Design Specialist",
              "Project Manager",
              "Heritage Architect",
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
