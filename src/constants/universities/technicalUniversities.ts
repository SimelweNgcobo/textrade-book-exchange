import { University } from "@/types/university";

export const UNIVERSITIES_OF_TECHNOLOGY: University[] = [
  {
    id: "cput",
    name: "Cape Peninsula University of Technology",
    abbreviation: "CPUT",
    fullName: "Cape Peninsula University of Technology (CPUT)",
    location: "Cape Town",
    province: "Western Cape",
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=80&h=80&fit=crop&crop=center",
    overview:
      "A leading university of technology offering career-focused education and applied research. Known for strong industry partnerships and practical skills development.",
    website: "https://www.cput.ac.za",
    studentPortal: "https://students.cput.ac.za",
    admissionsContact: "admissions@cput.ac.za",
    faculties: [
      {
        id: "engineering",
        name: "Faculty of Engineering",
        description:
          "Practical engineering education with strong industry connections and hands-on training.",
        degrees: [
          {
            id: "btech-civil",
            name: "BTech Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 32,
            description:
              "Practical civil engineering with focus on construction technology and project management.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Civil Technologist",
              "Construction Manager",
              "Project Manager",
              "Site Engineer",
              "Municipal Engineer",
            ],
          },
          {
            id: "btech-electrical",
            name: "BTech Electrical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 34,
            description:
              "Electrical engineering technology with focus on power systems and industrial automation.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Electrical Technologist",
              "Power Systems Technician",
              "Automation Specialist",
              "Maintenance Engineer",
              "Control Systems Technician",
            ],
          },
          {
            id: "btech-mechanical",
            name: "BTech Mechanical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 33,
            description:
              "Mechanical engineering technology with manufacturing and automotive focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Mechanical Technologist",
              "Manufacturing Engineer",
              "Maintenance Manager",
              "Quality Control Manager",
              "Production Supervisor",
            ],
          },
        ],
      },
      {
        id: "informatics",
        name: "Faculty of Informatics and Design",
        description:
          "Information technology and design education with creative and technical focus.",
        degrees: [
          {
            id: "btech-it",
            name: "BTech Information Technology",
            faculty: "Informatics",
            duration: "4 years",
            apsRequirement: 30,
            description:
              "Information technology with software development and systems administration focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Information Technology", level: 4, isRequired: false },
            ],
            careerProspects: [
              "IT Specialist",
              "Software Developer",
              "Systems Administrator",
              "Database Administrator",
              "Web Developer",
            ],
          },
          {
            id: "btech-graphic-design",
            name: "BTech Graphic Design",
            faculty: "Informatics",
            duration: "4 years",
            apsRequirement: 26,
            description:
              "Graphic design with digital media and brand communication focus.",
            subjects: [
              { name: "English", level: 4, isRequired: true },
              { name: "Mathematics", level: 3, isRequired: true },
            ],
            careerProspects: [
              "Graphic Designer",
              "Creative Director",
              "Brand Designer",
              "Digital Artist",
              "UI/UX Designer",
            ],
          },
        ],
      },
      {
        id: "health",
        name: "Faculty of Health and Wellness Sciences",
        description:
          "Health sciences education with focus on community health and wellness.",
        degrees: [
          {
            id: "btech-nursing",
            name: "BTech Nursing",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 28,
            description:
              "Nursing education with community health and primary healthcare focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Registered Nurse",
              "Community Health Nurse",
              "Primary Healthcare Nurse",
              "Occupational Health Nurse",
              "Clinic Manager",
            ],
          },
          {
            id: "btech-emergency-medical-care",
            name: "BTech Emergency Medical Care",
            faculty: "Health Sciences",
            duration: "4 years",
            apsRequirement: 30,
            description:
              "Emergency medical care with pre-hospital emergency medicine focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Life Sciences", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Emergency Medical Technician",
              "Paramedic",
              "Emergency Care Practitioner",
              "Ambulance Service Manager",
              "Emergency Department Coordinator",
            ],
          },
        ],
      },
      {
        id: "business",
        name: "Faculty of Business and Management Sciences",
        description:
          "Business education with practical management and entrepreneurship focus.",
        degrees: [
          {
            id: "btech-management",
            name: "BTech Management",
            faculty: "Business",
            duration: "4 years",
            apsRequirement: 26,
            description:
              "Management with entrepreneurship and small business development focus.",
            subjects: [
              { name: "Mathematics", level: 3, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Business Studies", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Operations Manager",
              "Small Business Owner",
              "Project Manager",
              "Retail Manager",
              "Human Resources Officer",
            ],
          },
          {
            id: "btech-marketing",
            name: "BTech Marketing",
            faculty: "Business",
            duration: "4 years",
            apsRequirement: 25,
            description:
              "Marketing with digital marketing and brand management focus.",
            subjects: [
              { name: "Mathematics", level: 3, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Marketing Coordinator",
              "Digital Marketing Specialist",
              "Brand Manager",
              "Social Media Manager",
              "Sales Manager",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dut",
    name: "Durban University of Technology",
    abbreviation: "DUT",
    fullName: "Durban University of Technology (DUT)",
    location: "Durban",
    province: "KwaZulu-Natal",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=80&h=80&fit=crop&crop=center",
    overview:
      "A dynamic university of technology with strong focus on innovation, entrepreneurship, and practical skills development. Leading in engineering and business education.",
    website: "https://www.dut.ac.za",
    studentPortal: "https://students.dut.ac.za",
    admissionsContact: "admissions@dut.ac.za",
    faculties: [
      {
        id: "engineering",
        name: "Faculty of Engineering and the Built Environment",
        description:
          "Engineering education with industrial focus and strong industry partnerships.",
        degrees: [
          {
            id: "btech-civil",
            name: "BTech Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 32,
            description:
              "Civil engineering technology with construction and infrastructure focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Civil Technologist",
              "Construction Manager",
              "Quantity Surveyor",
              "Project Manager",
              "Municipal Engineer",
            ],
          },
          {
            id: "btech-mechanical",
            name: "BTech Mechanical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 33,
            description:
              "Mechanical engineering with manufacturing and automotive industry focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Mechanical Technologist",
              "Manufacturing Engineer",
              "Automotive Technician",
              "Maintenance Manager",
              "Production Engineer",
            ],
          },
          {
            id: "btech-electrical",
            name: "BTech Electrical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 34,
            description:
              "Electrical engineering with power systems and industrial automation focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Electrical Technologist",
              "Power Systems Engineer",
              "Automation Specialist",
              "Electrical Contractor",
              "Maintenance Engineer",
            ],
          },
        ],
      },
      {
        id: "management",
        name: "Faculty of Management Sciences",
        description:
          "Business and management education with entrepreneurship and innovation focus.",
        degrees: [
          {
            id: "btech-entrepreneurship",
            name: "BTech Entrepreneurship",
            faculty: "Management",
            duration: "4 years",
            apsRequirement: 26,
            description:
              "Entrepreneurship development with small business management and innovation focus.",
            subjects: [
              { name: "Mathematics", level: 3, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Business Studies", level: 4, isRequired: false },
            ],
            careerProspects: [
              "Entrepreneur",
              "Small Business Owner",
              "Business Development Manager",
              "Innovation Consultant",
              "Start-up Founder",
            ],
          },
          {
            id: "btech-marketing",
            name: "BTech Marketing",
            faculty: "Management",
            duration: "4 years",
            apsRequirement: 25,
            description:
              "Marketing with digital marketing and customer relationship management focus.",
            subjects: [
              { name: "Mathematics", level: 3, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Marketing Manager",
              "Digital Marketing Specialist",
              "Brand Manager",
              "Customer Relationship Manager",
              "Sales Manager",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tut",
    name: "Tshwane University of Technology",
    abbreviation: "TUT",
    fullName: "Tshwane University of Technology (TUT)",
    location: "Pretoria",
    province: "Gauteng",
    logo: "https://images.unsplash.com/photo-1599582909646-0685d46f5510?w=80&h=80&fit=crop&crop=center",
    overview:
      "One of the largest universities of technology in South Africa, offering career-focused education with strong industry partnerships and practical training.",
    website: "https://www.tut.ac.za",
    studentPortal: "https://students.tut.ac.za",
    admissionsContact: "admissions@tut.ac.za",
    faculties: [
      {
        id: "engineering",
        name: "Faculty of Engineering and the Built Environment",
        description:
          "Engineering education with focus on practical skills and industry readiness.",
        degrees: [
          {
            id: "btech-civil",
            name: "BTech Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 32,
            description:
              "Civil engineering technology with construction management and infrastructure focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Civil Technologist",
              "Construction Manager",
              "Site Engineer",
              "Project Coordinator",
              "Building Inspector",
            ],
          },
          {
            id: "btech-electrical",
            name: "BTech Electrical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 34,
            description:
              "Electrical engineering with power systems and renewable energy focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Electrical Technologist",
              "Power Systems Technician",
              "Renewable Energy Specialist",
              "Electrical Contractor",
              "Maintenance Supervisor",
            ],
          },
        ],
      },
      {
        id: "ict",
        name: "Faculty of Information and Communication Technology",
        description:
          "ICT education with software development and network administration focus.",
        degrees: [
          {
            id: "btech-it",
            name: "BTech Information Technology",
            faculty: "ICT",
            duration: "4 years",
            apsRequirement: 30,
            description:
              "Information technology with software development and database management focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
              { name: "Information Technology", level: 4, isRequired: false },
            ],
            careerProspects: [
              "IT Specialist",
              "Software Developer",
              "Database Administrator",
              "Network Administrator",
              "Systems Analyst",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "vut",
    name: "Vaal University of Technology",
    abbreviation: "VUT",
    fullName: "Vaal University of Technology (VUT)",
    location: "Vanderbijlpark",
    province: "Gauteng",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center",
    overview:
      "A comprehensive university of technology focused on engineering, technology, and applied sciences with strong industrial partnerships.",
    website: "https://www.vut.ac.za",
    studentPortal: "https://students.vut.ac.za",
    admissionsContact: "admissions@vut.ac.za",
    faculties: [
      {
        id: "engineering",
        name: "Faculty of Engineering and Technology",
        description:
          "Engineering technology education with focus on industrial applications.",
        degrees: [
          {
            id: "btech-mechanical",
            name: "BTech Mechanical Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 33,
            description:
              "Mechanical engineering technology with manufacturing and maintenance focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Mechanical Technologist",
              "Manufacturing Engineer",
              "Maintenance Manager",
              "Quality Control Officer",
              "Production Supervisor",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cut",
    name: "Central University of Technology",
    abbreviation: "CUT",
    fullName: "Central University of Technology (CUT)",
    location: "Bloemfontein",
    province: "Free State",
    logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=80&h=80&fit=crop&crop=center",
    overview:
      "A technology-focused university offering career-oriented education with emphasis on practical skills and innovation.",
    website: "https://www.cut.ac.za",
    studentPortal: "https://students.cut.ac.za",
    admissionsContact: "admissions@cut.ac.za",
    faculties: [
      {
        id: "engineering",
        name: "Faculty of Engineering and Information Technology",
        description:
          "Engineering and IT education with practical applications and industry focus.",
        degrees: [
          {
            id: "btech-civil",
            name: "BTech Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 30,
            description:
              "Civil engineering technology with construction and project management focus.",
            subjects: [
              { name: "Mathematics", level: 5, isRequired: true },
              { name: "Physical Sciences", level: 5, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Civil Technologist",
              "Construction Supervisor",
              "Project Coordinator",
              "Building Inspector",
              "Site Manager",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mut",
    name: "Mangosuthu University of Technology",
    abbreviation: "MUT",
    fullName: "Mangosuthu University of Technology (MUT)",
    location: "Umlazi",
    province: "KwaZulu-Natal",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=80&h=80&fit=crop&crop=center",
    overview:
      "A historically disadvantaged university of technology focused on advancing technology education and community development.",
    website: "https://www.mut.ac.za",
    studentPortal: "https://students.mut.ac.za",
    admissionsContact: "admissions@mut.ac.za",
    faculties: [
      {
        id: "engineering",
        name: "Faculty of Engineering",
        description:
          "Engineering education with community development and practical skills focus.",
        degrees: [
          {
            id: "btech-civil",
            name: "BTech Civil Engineering",
            faculty: "Engineering",
            duration: "4 years",
            apsRequirement: 28,
            description:
              "Civil engineering technology with infrastructure development focus.",
            subjects: [
              { name: "Mathematics", level: 4, isRequired: true },
              { name: "Physical Sciences", level: 4, isRequired: true },
              { name: "English", level: 4, isRequired: true },
            ],
            careerProspects: [
              "Civil Technologist",
              "Construction Technician",
              "Project Assistant",
              "Municipal Technician",
              "Building Inspector",
            ],
          },
        ],
      },
    ],
  },
];
