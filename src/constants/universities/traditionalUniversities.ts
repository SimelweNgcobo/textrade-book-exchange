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
        id: "science",
        name: "Faculty of Science",
        description:
          "Leading scientific education and research with state-of-the-art facilities.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 42,
            description:
              "Comprehensive computer science program with strong theoretical foundation and practical applications.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: false },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "Systems Analyst",
              "Research Scientist",
              "AI Specialist",
            ],
          },
          {
            id: "bsc-biological-sciences",
            name: "BSc Biological Sciences",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Comprehensive study of living organisms from molecular to ecosystem levels.",
            subjects: [
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
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
            id: "bsc-chemistry",
            name: "BSc Chemistry",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 36,
            description:
              "Study of matter, its properties, and chemical reactions with practical laboratory experience.",
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
            id: "bsc-physics",
            name: "BSc Physics",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 38,
            description:
              "Study of fundamental laws governing the universe from subatomic to cosmic scales.",
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
            id: "bsc-environmental-science",
            name: "BSc Environmental Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 33,
            description:
              "Interdisciplinary study of environmental problems and solutions.",
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
              "Climate Researcher",
            ],
          },
          {
            id: "bsc-mathematical-sciences",
            name: "BSc Mathematical Sciences",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 40,
            description:
              "Pure and applied mathematics with focus on problem-solving and analytical thinking.",
            subjects: [
              { name: "Mathematics", level: 7, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: false },
            ],
            careerProspects: [
              "Mathematician",
              "Statistician",
              "Data Scientist",
              "Actuary",
              "Financial Analyst",
            ],
          },
        ],
      },
      {
        id: "humanities",
        name: "Faculty of Humanities",
        description:
          "Leading humanities education with focus on critical thinking and social understanding.",
        degrees: [
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Study of human behavior, mental processes, and psychological principles.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
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
          {
            id: "ba-sociology",
            name: "BA Sociology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Study of society, social relationships, and social institutions.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "History", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Sociologist",
              "Social Researcher",
              "Community Development Worker",
              "Policy Analyst",
              "NGO Worker",
            ],
          },
          {
            id: "ba-political-science",
            name: "BA Political Science",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 33,
            description:
              "Study of government systems, political behavior, and public policy.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "History", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Political Analyst",
              "Policy Researcher",
              "Government Official",
              "Diplomat",
              "Journalist",
            ],
          },
          {
            id: "ba-history",
            name: "BA History",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Study of past events, societies, and their impact on the present.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "History", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Historian",
              "Museum Curator",
              "Archivist",
              "Teacher",
              "Heritage Specialist",
            ],
          },
          {
            id: "ba-english",
            name: "BA English Literature",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Study of literature, language, and communication with focus on critical analysis.",
            subjects: [{ name: "English", level: 5, isRequired: true }],
            careerProspects: [
              "Writer",
              "Editor",
              "Journalist",
              "Teacher",
              "Communications Specialist",
            ],
          },
          {
            id: "ba-philosophy",
            name: "BA Philosophy",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 31,
            description:
              "Study of fundamental questions about existence, knowledge, and ethics.",
            subjects: [{ name: "English", level: 4, isRequired: true }],
            careerProspects: [
              "Philosopher",
              "Ethics Consultant",
              "Writer",
              "Teacher",
              "Policy Analyst",
            ],
          },
          {
            id: "ba-media-communication",
            name: "BA Media and Communication",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 33,
            description:
              "Study of media systems, communication theory, and digital journalism.",
            subjects: [{ name: "English", level: 5, isRequired: true }],
            careerProspects: [
              "Journalist",
              "Media Producer",
              "Communications Specialist",
              "Digital Marketer",
              "Film Maker",
            ],
          },
          {
            id: "bsw-social-work",
            name: "Bachelor of Social Work",
            faculty: "Humanities",
            duration: "4 years",
            apsRequirement: 30,
            description:
              "Professional training for social work practice with vulnerable populations.",
            subjects: [{ name: "English", level: 4, isRequired: true }],
            careerProspects: [
              "Social Worker",
              "Community Development Worker",
              "Family Counselor",
              "NGO Manager",
              "Policy Advocate",
            ],
          },
          {
            id: "bfa-fine-art",
            name: "Bachelor of Fine Art",
            faculty: "Humanities",
            duration: "4 years",
            apsRequirement: 28,
            description:
              "Creative arts education with focus on visual arts and artistic expression.",
            subjects: [{ name: "English", level: 4, isRequired: true }],
            careerProspects: [
              "Artist",
              "Art Teacher",
              "Gallery Curator",
              "Art Therapist",
              "Creative Director",
            ],
          },
        ],
      },
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
            apsRequirement: 36,
            description:
              "Comprehensive accounting program covering financial accounting, management accounting, auditing, and taxation.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 5, isRequired: true },
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
            id: "bcom-economics",
            name: "BCom Economics",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Study of economic theory, policy, and analysis for understanding market dynamics.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Economist",
              "Policy Analyst",
              "Research Analyst",
              "Investment Analyst",
              "Development Economist",
            ],
          },
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Comprehensive business management education covering strategy, operations, and leadership.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Business Manager",
              "Management Consultant",
              "Project Manager",
              "Entrepreneur",
              "Operations Manager",
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
              { name: "English", level: 5, isRequired: true },
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
            id: "bcom-marketing",
            name: "BCom Marketing",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 33,
            description:
              "Marketing strategy, consumer behavior, and digital marketing in the modern economy.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Marketing Manager",
              "Brand Manager",
              "Digital Marketer",
              "Market Researcher",
              "Sales Manager",
            ],
          },
          {
            id: "bcom-hr-management",
            name: "BCom Human Resource Management",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Human resource management, organizational behavior, and employment relations.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "HR Manager",
              "Recruitment Specialist",
              "Training Coordinator",
              "Labor Relations Officer",
              "Compensation Analyst",
            ],
          },
        ],
      },
      {
        id: "engineering",
        name: "Faculty of Engineering",
        description:
          "World-class engineering education with cutting-edge research facilities.",
        degrees: [
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 42,
            description:
              "Comprehensive civil engineering program covering structural, water, and transportation engineering.",
            subjects: [
              { name: "Mathematics", level: 7, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
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
            id: "beng-mechanical",
            name: "BEng Mechanical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 42,
            description:
              "Mechanical systems design, thermodynamics, and manufacturing processes.",
            subjects: [
              { name: "Mathematics", level: 7, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Mechanical Engineer",
              "Design Engineer",
              "Manufacturing Engineer",
              "Automotive Engineer",
              "Aerospace Engineer",
            ],
          },
          {
            id: "beng-electrical",
            name: "BEng Electrical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 42,
            description:
              "Electrical systems, electronics, and power engineering with modern applications.",
            subjects: [
              { name: "Mathematics", level: 7, isRequired: true },
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
          {
            id: "beng-chemical",
            name: "BEng Chemical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 42,
            description:
              "Chemical processes, materials science, and process design for industry.",
            subjects: [
              { name: "Mathematics", level: 7, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Chemical Engineer",
              "Process Engineer",
              "Materials Engineer",
              "Environmental Engineer",
              "Petroleum Engineer",
            ],
          },
          {
            id: "beng-industrial",
            name: "BEng Industrial Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 40,
            description:
              "Optimization of complex systems, operations research, and manufacturing processes.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Industrial Engineer",
              "Operations Research Analyst",
              "Quality Engineer",
              "Supply Chain Manager",
              "Process Improvement Specialist",
            ],
          },
        ],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Premier medical education with world-class clinical training facilities.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description:
              "Comprehensive medical degree preparing students for medical practice with global health electives.",
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
          {
            id: "bnurs-nursing",
            name: "BCur/BNurs Nursing",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 32,
            description:
              "Comprehensive nursing education with clinical training in major hospitals.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Registered Nurse",
              "Clinical Nurse Specialist",
              "Nurse Manager",
              "Community Health Nurse",
              "Critical Care Nurse",
            ],
          },
          {
            id: "bsc-physiotherapy",
            name: "BSc Physiotherapy",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Physical therapy education with focus on rehabilitation and movement disorders.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Physiotherapist",
              "Sports Physiotherapist",
              "Rehabilitation Specialist",
              "Private Practice Owner",
              "Hospital Physiotherapist",
            ],
          },
          {
            id: "bsc-occupational-therapy",
            name: "BSc Occupational Therapy",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 36,
            description:
              "Occupational therapy focusing on helping people participate in daily activities.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Occupational Therapist",
              "Rehabilitation Specialist",
              "Mental Health Therapist",
              "Pediatric Therapist",
              "Community Health Worker",
            ],
          },
          {
            id: "bsc-dietetics",
            name: "BSc Dietetics and Nutrition",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 34,
            description:
              "Nutrition science and dietetic practice for health promotion and disease prevention.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Dietitian",
              "Sports Nutritionist",
              "Clinical Dietitian",
              "Community Nutritionist",
              "Food Service Manager",
            ],
          },
          {
            id: "bsc-medical-laboratory",
            name: "BSc Medical Laboratory Sciences",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 35,
            description:
              "Laboratory medicine and diagnostic testing for disease diagnosis.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Medical Laboratory Scientist",
              "Clinical Laboratory Technologist",
              "Research Technician",
              "Quality Control Analyst",
              "Laboratory Manager",
            ],
          },
        ],
      },
      {
        id: "law",
        name: "Faculty of Law",
        description:
          "Premier legal education with strong focus on constitutional and human rights law.",
        degrees: [
          {
            id: "llb",
            name: "LLB Bachelor of Laws",
            faculty: "Law",
            duration: "4 years",
            apsRequirement: 36,
            description:
              "Comprehensive legal education covering all major areas of law.",
            subjects: [
              { name: "English", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Advocate",
              "Attorney",
              "Legal Advisor",
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
              "Foundation legal studies as preparation for LLB degree.",
            subjects: [{ name: "English", level: 5, isRequired: true }],
            careerProspects: [
              "Paralegal",
              "Legal Assistant",
              "Court Administrator",
              "Legal Researcher",
              "Compliance Officer",
            ],
          },
        ],
      },
      {
        id: "education",
        name: "Faculty of Education",
        description: "Teacher training and educational development programs.",
        degrees: [
          {
            id: "bed-foundation",
            name: "BEd Foundation Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 30,
            description: "Foundation phase teacher training for Grades R-3.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Foundation Phase Teacher",
              "Early Childhood Development Specialist",
              "Educational Coordinator",
              "Curriculum Developer",
              "Education Administrator",
            ],
          },
          {
            id: "bed-intermediate",
            name: "BEd Intermediate Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 30,
            description: "Intermediate phase teacher training for Grades 4-7.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Intermediate Phase Teacher",
              "Subject Specialist",
              "Educational Coordinator",
              "Curriculum Developer",
              "Academic Support Teacher",
            ],
          },
          {
            id: "bed-senior-fet",
            name: "BEd Senior and FET Phase",
            faculty: "Education",
            duration: "4 years",
            apsRequirement: 32,
            description:
              "Senior and Further Education and Training phase teacher training for Grades 8-12.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "High School Teacher",
              "Subject Head",
              "Educational Manager",
              "Curriculum Specialist",
              "Education Department Official",
            ],
          },
          {
            id: "pgce",
            name: "PGCE (Postgraduate Certificate in Education)",
            faculty: "Education",
            duration: "1 year",
            apsRequirement: 30,
            description:
              "Postgraduate teacher training for graduates with subject expertise.",
            subjects: [{ name: "English", level: 4, isRequired: true }],
            careerProspects: [
              "Teacher",
              "Educational Consultant",
              "Training Coordinator",
              "Educational Technology Specialist",
              "Curriculum Developer",
            ],
          },
        ],
      },
      {
        id: "information-technology",
        name: "Faculty of Information Technology",
        description: "Cutting-edge technology education and research.",
        degrees: [
          {
            id: "bit",
            name: "Bachelor of Information Technology",
            faculty: "Information Technology",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Comprehensive IT education covering software development, networks, and systems.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "IT Specialist",
              "Software Developer",
              "Network Administrator",
              "Database Administrator",
              "IT Consultant",
            ],
          },
          {
            id: "bsc-information-systems",
            name: "BSc Information Systems",
            faculty: "Information Technology",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Information systems design and management for business applications.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Systems Analyst",
              "Business Analyst",
              "IT Project Manager",
              "Database Designer",
              "Information Security Specialist",
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
      "A leading research university in Africa, known for its academic excellence and contribution to South Africa's development.",
    website: "https://www.wits.ac.za",
    studentPortal: "https://students.wits.ac.za",
    admissionsContact: "admissions@wits.ac.za",
    faculties: [
      {
        id: "science",
        name: "Faculty of Science",
        description: "Excellence in scientific research and education.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 38,
            description:
              "Comprehensive computer science education with strong research component.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "Systems Analyst",
              "Research Scientist",
              "AI Specialist",
            ],
          },
          {
            id: "bsc-biological-sciences",
            name: "BSc Biological Sciences",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 33,
            description:
              "Study of living organisms with focus on African biodiversity.",
            subjects: [
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
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
            id: "bsc-chemistry",
            name: "BSc Chemistry",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Chemical sciences with focus on materials and analytical chemistry.",
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
              "Materials Scientist",
            ],
          },
          {
            id: "bsc-physics",
            name: "BSc Physics",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 37,
            description:
              "Physics education with strong emphasis on theoretical and experimental physics.",
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
            id: "bsc-mathematical-sciences",
            name: "BSc Mathematical Sciences",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 39,
            description:
              "Pure and applied mathematics with computational focus.",
            subjects: [
              { name: "Mathematics", level: 7, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Mathematician",
              "Statistician",
              "Data Scientist",
              "Actuary",
              "Financial Analyst",
            ],
          },
        ],
      },
      {
        id: "humanities",
        name: "Faculty of Humanities",
        description: "Humanities education with focus on African perspectives.",
        degrees: [
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 32,
            description:
              "Psychological studies with focus on South African contexts.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
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
          {
            id: "ba-sociology",
            name: "BA Sociology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Study of South African society and social transformation.",
            subjects: [{ name: "English", level: 4, isRequired: true }],
            careerProspects: [
              "Sociologist",
              "Social Researcher",
              "Community Development Worker",
              "Policy Analyst",
              "NGO Worker",
            ],
          },
          {
            id: "ba-political-science",
            name: "BA Political Science",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 31,
            description:
              "Political studies with focus on African governance and democracy.",
            subjects: [{ name: "English", level: 4, isRequired: true }],
            careerProspects: [
              "Political Analyst",
              "Policy Researcher",
              "Government Official",
              "Diplomat",
              "Journalist",
            ],
          },
          {
            id: "ba-english",
            name: "BA English Literature",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "English literature with focus on African and postcolonial writing.",
            subjects: [{ name: "English", level: 5, isRequired: true }],
            careerProspects: [
              "Writer",
              "Editor",
              "Journalist",
              "Teacher",
              "Communications Specialist",
            ],
          },
        ],
      },
      {
        id: "commerce",
        name: "Faculty of Commerce, Law and Management",
        description:
          "Business and management education with strong industry connections.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Commerce, Law and Management",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Professional accounting education with CA(SA) pathway.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 5, isRequired: true },
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
            id: "bcom-economics",
            name: "BCom Economics",
            faculty: "Commerce, Law and Management",
            duration: "3 years",
            apsRequirement: 33,
            description:
              "Economic analysis with focus on development economics.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Economist",
              "Policy Analyst",
              "Research Analyst",
              "Investment Analyst",
              "Development Economist",
            ],
          },
          {
            id: "bcom-business-management",
            name: "BCom Business Management",
            faculty: "Commerce, Law and Management",
            duration: "3 years",
            apsRequirement: 32,
            description: "Business management with entrepreneurship focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Business Manager",
              "Management Consultant",
              "Project Manager",
              "Entrepreneur",
              "Operations Manager",
            ],
          },
        ],
      },
      {
        id: "engineering",
        name: "Faculty of Engineering and the Built Environment",
        description:
          "Engineering excellence with focus on African development challenges.",
        degrees: [
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Engineering and the Built Environment",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Civil engineering with focus on infrastructure development.",
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
            id: "beng-mechanical",
            name: "BEng Mechanical Engineering",
            faculty: "Engineering and the Built Environment",
            duration: "4 years",
            apsRequirement: 38,
            description:
              "Mechanical engineering with focus on mining and manufacturing.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Mechanical Engineer",
              "Mining Engineer",
              "Manufacturing Engineer",
              "Automotive Engineer",
              "Energy Engineer",
            ],
          },
          {
            id: "beng-electrical",
            name: "BEng Electrical Engineering",
            faculty: "Engineering and the Built Environment",
            duration: "4 years",
            apsRequirement: 38,
            description: "Electrical engineering with power systems focus.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Electrical Engineer",
              "Power Systems Engineer",
              "Control Systems Engineer",
              "Electronics Engineer",
              "Telecommunications Engineer",
            ],
          },
        ],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Medical education with focus on African health challenges.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description:
              "Medical degree with strong community medicine component.",
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
          {
            id: "bnurs-nursing",
            name: "BCur/BNurs Nursing",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 30,
            description: "Nursing education with community health focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Registered Nurse",
              "Clinical Nurse Specialist",
              "Nurse Manager",
              "Community Health Nurse",
              "Critical Care Nurse",
            ],
          },
        ],
      },
      {
        id: "law",
        name: "School of Law",
        description:
          "Legal education with focus on constitutional and human rights law.",
        degrees: [
          {
            id: "llb",
            name: "LLB Bachelor of Laws",
            faculty: "Law",
            duration: "4 years",
            apsRequirement: 35,
            description:
              "Comprehensive legal education with constitutional law focus.",
            subjects: [{ name: "English", level: 5, isRequired: true }],
            careerProspects: [
              "Advocate",
              "Attorney",
              "Legal Advisor",
              "Magistrate",
              "Corporate Lawyer",
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
      "A comprehensive university committed to quality education and research excellence.",
    website: "https://www.ufs.ac.za",
    studentPortal: "https://students.ufs.ac.za",
    admissionsContact: "admissions@ufs.ac.za",
    faculties: [
      {
        id: "science",
        name: "Faculty of Natural and Agricultural Sciences",
        description:
          "Scientific education with focus on agricultural sciences.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Natural and Agricultural Sciences",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Computer science education with practical applications.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "Systems Analyst",
              "IT Consultant",
              "Database Administrator",
            ],
          },
          {
            id: "bsc-agriculture",
            name: "BSc Agriculture",
            faculty: "Natural and Agricultural Sciences",
            duration: "4 years",
            apsRequirement: 28,
            description: "Comprehensive agricultural science program.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
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
          {
            id: "bsc-animal-science",
            name: "BSc Animal Science",
            faculty: "Natural and Agricultural Sciences",
            duration: "4 years",
            apsRequirement: 26,
            description: "Animal production and management science.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Animal Scientist",
              "Livestock Manager",
              "Veterinary Technician",
              "Animal Nutritionist",
              "Research Technician",
            ],
          },
        ],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Health sciences education serving rural and urban communities.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 40,
            description: "Medical education with rural health focus.",
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
              "Medical Researcher",
              "Hospital Administrator",
            ],
          },
        ],
      },
      {
        id: "commerce",
        name: "Faculty of Economic and Management Sciences",
        description: "Business and economic education.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economic and Management Sciences",
            duration: "3 years",
            apsRequirement: 32,
            description: "Professional accounting education.",
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
              "Management Accountant",
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
    logo: "https://images.unsplash.com/photo-1562274267-4c9c9c6a02c5?w=80&h=80&fit=crop&crop=center",
    overview:
      "A university committed to social justice and academic excellence.",
    website: "https://www.uwc.ac.za",
    studentPortal: "https://students.uwc.ac.za",
    admissionsContact: "admissions@uwc.ac.za",
    faculties: [
      {
        id: "science",
        name: "Faculty of Natural Sciences",
        description: "Scientific excellence with community engagement.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Natural Sciences",
            duration: "3 years",
            apsRequirement: 32,
            description: "Computer science with focus on social applications.",
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
          {
            id: "bsc-biotechnology",
            name: "BSc Biotechnology",
            faculty: "Natural Sciences",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Biotechnology with applications in health and agriculture.",
            subjects: [
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Biotechnologist",
              "Research Scientist",
              "Quality Control Analyst",
              "Biomedical Researcher",
              "Laboratory Technician",
            ],
          },
        ],
      },
      {
        id: "commerce",
        name: "Faculty of Economic and Management Sciences",
        description: "Business education with social development focus.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economic and Management Sciences",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Accounting education with community development perspective.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Chartered Accountant",
              "Financial Manager",
              "Auditor",
              "Tax Consultant",
              "Development Finance Specialist",
            ],
          },
        ],
      },
      {
        id: "dentistry",
        name: "Faculty of Dentistry",
        description: "Dental education with community health focus.",
        degrees: [
          {
            id: "bchd",
            name: "BChD Dentistry",
            faculty: "Dentistry",
            duration: "5 years",
            apsRequirement: 38,
            description:
              "Comprehensive dental education with community outreach.",
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
              "Dental Researcher",
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
        id: "science",
        name: "Faculty of Science",
        description: "Excellence in scientific research and education.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 38,
            description:
              "Computer science with strong mathematical foundation.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "Systems Analyst",
              "Research Scientist",
              "AI Specialist",
            ],
          },
          {
            id: "bsc-mathematical-sciences",
            name: "BSc Mathematical Sciences",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 40,
            description: "Pure and applied mathematics excellence.",
            subjects: [
              { name: "Mathematics", level: 7, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Mathematician",
              "Statistician",
              "Data Scientist",
              "Actuary",
              "Financial Analyst",
            ],
          },
        ],
      },
      {
        id: "economic",
        name: "Faculty of Economic and Management Sciences",
        description: "Leading business and economic education.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economic and Management Sciences",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Professional accounting education with CA(SA) pathway.",
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
        ],
      },
      {
        id: "medicine",
        name: "Faculty of Medicine and Health Sciences",
        description:
          "Premier medical education with excellent clinical facilities.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Medicine and Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description:
              "Comprehensive medical education with international recognition.",
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
        name: "Faculty of AgriSciences",
        description: "Leading agricultural and food sciences education.",
        degrees: [
          {
            id: "bsc-agriculture",
            name: "BSc Agriculture",
            faculty: "AgriSciences",
            duration: "4 years",
            apsRequirement: 28,
            description: "Comprehensive agricultural science education.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
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
          {
            id: "bsc-viticulture",
            name: "BSc Viticulture and Oenology",
            faculty: "AgriSciences",
            duration: "4 years",
            apsRequirement: 26,
            description: "Wine making and grape growing specialization.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "Life Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Viticulturist",
              "Winemaker",
              "Wine Quality Controller",
              "Vineyard Manager",
              "Wine Industry Consultant",
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
        id: "science",
        name: "Faculty of Natural and Agricultural Sciences",
        description: "Scientific excellence and agricultural innovation.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Natural and Agricultural Sciences",
            duration: "3 years",
            apsRequirement: 36,
            description: "Computer science with strong industry connections.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "Systems Analyst",
              "IT Consultant",
              "Research Scientist",
            ],
          },
          {
            id: "bis-information-science",
            name: "BIS Information Science",
            faculty: "Natural and Agricultural Sciences",
            duration: "3 years",
            apsRequirement: 34,
            description:
              "Information science in publishing and multimedia (UP specialty).",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 5, isRequired: true },
            ],
            careerProspects: [
              "Information Specialist",
              "Digital Media Manager",
              "Content Manager",
              "Publishing Specialist",
              "Information Architect",
            ],
          },
        ],
      },
      {
        id: "ems",
        name: "Faculty of Economic and Management Sciences",
        description: "Leading business and economic education.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Economic and Management Sciences",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Professional accounting education with strong industry connections.",
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
        id: "health",
        name: "Faculty of Health Sciences",
        description: "Comprehensive health sciences education.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description: "Medical education with excellent clinical training.",
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
        id: "veterinary",
        name: "Faculty of Veterinary Science",
        description: "Premier veterinary education at Onderstepoort campus.",
        degrees: [
          {
            id: "bvsc",
            name: "BVSc Veterinary Science",
            faculty: "Veterinary Science",
            duration: "6 years",
            apsRequirement: 38,
            description:
              "Comprehensive veterinary education at the famous Onderstepoort campus (UP specialty).",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 6, isRequired: true },
              { name: "Life Sciences", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Veterinarian",
              "Animal Health Specialist",
              "Wildlife Veterinarian",
              "Veterinary Researcher",
              "Animal Welfare Officer",
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
        id: "science",
        name: "College of Agriculture, Engineering and Science",
        description: "Scientific and agricultural excellence.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Agriculture, Engineering and Science",
            duration: "3 years",
            apsRequirement: 35,
            description:
              "Computer science with focus on African technological solutions.",
            subjects: [
              { name: "Mathematics", level: 6, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "Systems Analyst",
              "IT Consultant",
              "Research Scientist",
            ],
          },
          {
            id: "bsc-agriculture",
            name: "BSc Agriculture",
            faculty: "Agriculture, Engineering and Science",
            duration: "4 years",
            apsRequirement: 30,
            description:
              "Agricultural science with focus on sustainable farming.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
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
        ],
      },
      {
        id: "health",
        name: "College of Health Sciences",
        description: "Comprehensive health sciences education.",
        degrees: [
          {
            id: "mbchb",
            name: "MBChB Medicine",
            faculty: "Health Sciences",
            duration: "6 years",
            apsRequirement: 42,
            description:
              "Medical education with strong focus on African health challenges.",
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
          {
            id: "bnurs-nursing",
            name: "BCur/BNurs Nursing",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 30,
            description: "Nursing education with community health focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "Mathematics", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Registered Nurse",
              "Clinical Nurse Specialist",
              "Nurse Manager",
              "Community Health Nurse",
              "Critical Care Nurse",
            ],
          },
        ],
      },
      {
        id: "humanities",
        name: "College of Humanities",
        description: "Humanities with African perspectives.",
        degrees: [
          {
            id: "ba-psychology",
            name: "BA Psychology",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Psychology with focus on African psychological perspectives.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
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
        id: "science",
        name: "Faculty of Science",
        description: "Excellence in scientific research and education.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 32,
            description: "Computer science with strong theoretical foundation.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
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
              "English studies with focus on literature and language.",
            subjects: [{ name: "English", level: 5, isRequired: true }],
            careerProspects: [
              "Teacher",
              "Writer",
              "Editor",
              "Journalist",
              "Communications Specialist",
            ],
          },
          {
            id: "ba-journalism",
            name: "BA Journalism and Media Studies",
            faculty: "Humanities",
            duration: "3 years",
            apsRequirement: 28,
            description: "Journalism education with practical media training.",
            subjects: [{ name: "English", level: 5, isRequired: true }],
            careerProspects: [
              "Journalist",
              "Media Producer",
              "Editor",
              "Communications Specialist",
              "Documentary Maker",
            ],
          },
        ],
      },
      {
        id: "commerce",
        name: "Faculty of Commerce",
        description: "Business education with personalized attention.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Commerce",
            duration: "3 years",
            apsRequirement: 30,
            description: "Accounting education with small class sizes.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
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
        id: "science",
        name: "Faculty of Science",
        description: "Scientific excellence and innovation.",
        degrees: [
          {
            id: "bsc-computer-science",
            name: "BSc Computer Science",
            faculty: "Science",
            duration: "3 years",
            apsRequirement: 34,
            description: "Computer science with industry partnerships.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Software Developer",
              "Data Scientist",
              "Systems Analyst",
              "IT Consultant",
              "Web Developer",
            ],
          },
        ],
      },
      {
        id: "engineering",
        name: "Faculty of Engineering and the Built Environment",
        description: "Engineering education with industry focus.",
        degrees: [
          {
            id: "beng-civil",
            name: "BEng Civil Engineering",
            faculty: "Engineering and the Built Environment",
            duration: "4 years",
            apsRequirement: 37,
            description:
              "Civil engineering with focus on infrastructure development.",
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
            id: "bengtech",
            name: "BEngTech Engineering Technology",
            faculty: "Engineering and the Built Environment",
            duration: "4 years",
            apsRequirement: 32,
            description:
              "Bachelor of Engineering Technology - newer program (UJ specialty).",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Engineering Technologist",
              "Technical Specialist",
              "Project Coordinator",
              "Quality Assurance Officer",
              "Technical Manager",
            ],
          },
        ],
      },
      {
        id: "management",
        name: "College of Business and Economics",
        description: "Business education with entrepreneurship focus.",
        degrees: [
          {
            id: "bcom-accounting",
            name: "BCom Accounting",
            faculty: "Business and Economics",
            duration: "3 years",
            apsRequirement: 33,
            description: "Accounting education with practical focus.",
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
          {
            id: "bachelor-logistics",
            name: "Bachelor in Logistics and Transportation Management",
            faculty: "Business and Economics",
            duration: "3 years",
            apsRequirement: 30,
            description:
              "Specialized logistics and transportation program (UJ specialty).",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Logistics Manager",
              "Transportation Coordinator",
              "Supply Chain Analyst",
              "Distribution Manager",
              "Operations Manager",
            ],
          },
        ],
      },
    ],
  },
];
