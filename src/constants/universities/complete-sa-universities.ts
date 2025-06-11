import { University } from "@/types/university";

/**
 * COMPLETE AUDIT: ALL 26 PUBLIC UNIVERSITIES IN SOUTH AFRICA
 *
 * This file contains the complete, official list of all 26 public universities
 * in South Africa as recognized by the Department of Higher Education and Training.
 *
 * Classification:
 * - 11 Traditional Universities (research-focused)
 * - 6 Universities of Technology (applied sciences and technology)
 * - 6 Comprehensive Universities (both traditional and technological programs)
 * - 3 Specialized Universities (single focus institutions)
 *
 * Application data updated for 2025 intake (2026 academic year)
 * Source: South African Department of Higher Education and Training
 */

// Base faculty structure for consistent application
const createBaseFaculty = (id: string, name: string, description: string) => ({
  id,
  name,
  description,
  degrees: [],
});

// TRADITIONAL UNIVERSITIES (11)
export const COMPLETE_TRADITIONAL_UNIVERSITIES: University[] = [
  {
    id: "uct",
    name: "University of Cape Town",
    abbreviation: "UCT",
    fullName: "University of Cape Town",
    location: "Cape Town",
    province: "Western Cape",
    logo: "/logos/universities/uct.svg",
    overview:
      "Africa's leading research university, ranked #1 in Africa. Known for academic excellence and research innovation.",
    website: "https://www.uct.ac.za",
    studentPortal: "https://students.uct.ac.za",
    admissionsContact: "admissions@uct.ac.za",
    establishedYear: 1829,
    studentPopulation: 29000,
    faculties: [
      createBaseFaculty(
        "commerce",
        "Commerce",
        "Business and economic sciences programs",
      ),
      createBaseFaculty(
        "engineering",
        "Engineering & Built Environment",
        "Engineering and construction programs",
      ),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Medical and health-related programs",
      ),
      createBaseFaculty(
        "humanities",
        "Humanities",
        "Arts, languages, and social sciences",
      ),
      createBaseFaculty("law", "Law", "Legal studies and jurisprudence"),
      createBaseFaculty(
        "science",
        "Science",
        "Natural sciences and mathematics",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "2 April 2025",
      closingDate: "31 July 2025",
      academicYear: "2026",
      applicationFee: "R100 (South Africans), R300 (International)",
      applicationMethod: "Online via UCT Student Portal",
      lateApplications: {
        available: false,
        deadline: "31 July 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "wits",
    name: "University of the Witwatersrand",
    abbreviation: "Wits",
    fullName: "University of the Witwatersrand, Johannesburg",
    location: "Johannesburg",
    province: "Gauteng",
    logo: "/logos/universities/university-of-witwatersrand.svg",
    overview:
      "Leading research university known for engineering, medicine, and business programs. Strong industry connections.",
    website: "https://www.wits.ac.za",
    studentPortal: "https://students.wits.ac.za",
    admissionsContact: "admissions@wits.ac.za",
    establishedYear: 1922,
    studentPopulation: 40000,
    faculties: [
      createBaseFaculty(
        "commerce",
        "Commerce, Law & Management",
        "Business, law, and management programs",
      ),
      createBaseFaculty(
        "engineering",
        "Engineering & Built Environment",
        "Engineering and construction programs",
      ),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Medical and health-related programs",
      ),
      createBaseFaculty(
        "humanities",
        "Humanities",
        "Arts, languages, and social sciences",
      ),
      createBaseFaculty(
        "science",
        "Science",
        "Natural sciences and mathematics",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 March 2025",
      closingDate: "30 June 2025 (select programs), 30 September 2025 (others)",
      academicYear: "2026",
      applicationFee: "R100 (South African), R700 (International)",
      applicationMethod: "Online via Wits Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 September 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "stellenbosch",
    name: "Stellenbosch University",
    abbreviation: "SU",
    fullName: "Stellenbosch University",
    location: "Stellenbosch",
    province: "Western Cape",
    logo: "/logos/universities/stellenbosch-university.svg",
    overview:
      "Premier research university known for agriculture, engineering, and medical programs. Beautiful campus in wine country.",
    website: "https://www.sun.ac.za",
    studentPortal: "https://students.sun.ac.za",
    admissionsContact: "admissions@sun.ac.za",
    establishedYear: 1918,
    studentPopulation: 32000,
    faculties: [
      createBaseFaculty(
        "agriculture",
        "AgriSciences",
        "Agricultural and food sciences",
      ),
      createBaseFaculty(
        "arts",
        "Arts & Social Sciences",
        "Humanities and social sciences",
      ),
      createBaseFaculty(
        "economic",
        "Economic & Management Sciences",
        "Business and economics",
      ),
      createBaseFaculty(
        "education",
        "Education",
        "Teacher training and educational studies",
      ),
      createBaseFaculty(
        "engineering",
        "Engineering",
        "Engineering and technology",
      ),
      createBaseFaculty("law", "Law", "Legal studies"),
      createBaseFaculty(
        "medicine",
        "Medicine & Health Sciences",
        "Medical and health programs",
      ),
      createBaseFaculty(
        "science",
        "Science",
        "Natural sciences and mathematics",
      ),
      createBaseFaculty("theology", "Theology", "Religious studies"),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 April 2025",
      closingDate: "31 July 2025",
      academicYear: "2026",
      applicationFee: "R100",
      applicationMethod: "Online via SU Application Portal",
      lateApplications: {
        available: false,
        deadline: "31 July 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "up",
    name: "University of Pretoria",
    abbreviation: "UP",
    fullName: "University of Pretoria",
    location: "Pretoria",
    province: "Gauteng",
    logo: "/logos/universities/university-of-pretoria.svg",
    overview:
      "One of South Africa's largest universities, offering comprehensive programs across all disciplines.",
    website: "https://www.up.ac.za",
    studentPortal: "https://students.up.ac.za",
    admissionsContact: "admissions@up.ac.za",
    establishedYear: 1908,
    studentPopulation: 53000,
    faculties: [
      createBaseFaculty(
        "economic",
        "Economic & Management Sciences",
        "Business and economics",
      ),
      createBaseFaculty(
        "education",
        "Education",
        "Teacher training and educational studies",
      ),
      createBaseFaculty(
        "engineering",
        "Engineering, Built Environment & IT",
        "Engineering and technology",
      ),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Medical and health programs",
      ),
      createBaseFaculty("humanities", "Humanities", "Arts and social sciences"),
      createBaseFaculty("law", "Law", "Legal studies"),
      createBaseFaculty(
        "natural-agriculture",
        "Natural & Agricultural Sciences",
        "Science and agriculture",
      ),
      createBaseFaculty("theology", "Theology & Religion", "Religious studies"),
      createBaseFaculty(
        "veterinary",
        "Veterinary Science",
        "Animal health and veterinary medicine",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "2 April 2025",
      closingDate: "31 May 2025 (Veterinary Science), 30 June 2025 (others)",
      academicYear: "2026",
      applicationFee: "R300",
      applicationMethod: "Online via UP Student Portal",
      lateApplications: {
        available: false,
        deadline: "30 June 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "ukzn",
    name: "University of KwaZulu-Natal",
    abbreviation: "UKZN",
    fullName: "University of KwaZulu-Natal",
    location: "Durban",
    province: "KwaZulu-Natal",
    logo: "/logos/universities/ukzn.svg",
    overview:
      "Major research university with multiple campuses, strong in medicine, engineering, and social sciences.",
    website: "https://www.ukzn.ac.za",
    studentPortal: "https://students.ukzn.ac.za",
    admissionsContact: "admissions@ukzn.ac.za",
    establishedYear: 2004,
    studentPopulation: 47000,
    faculties: [
      createBaseFaculty(
        "agriculture",
        "Agriculture, Engineering & Science",
        "Agriculture, engineering, and science",
      ),
      createBaseFaculty(
        "education",
        "Education",
        "Teacher training and educational studies",
      ),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Medical and health programs",
      ),
      createBaseFaculty(
        "humanities",
        "Humanities, Development & Social Sciences",
        "Arts and social sciences",
      ),
      createBaseFaculty(
        "law",
        "Law & Management Studies",
        "Law and management",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "TBC",
      closingDate: "30 June 2025 (Medicine), 30 September 2025 (others)",
      academicYear: "2026",
      applicationFee: "Between R210 and R490 depending on applicant type",
      applicationMethod: "Online via UKZN Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 September 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "ru",
    name: "Rhodes University",
    abbreviation: "RU",
    fullName: "Rhodes University",
    location: "Grahamstown",
    province: "Eastern Cape",
    logo: "/logos/universities/rhodes.svg",
    overview:
      "Prestigious small university known for high academic standards and excellent student experience.",
    website: "https://www.ru.ac.za",
    studentPortal: "https://students.ru.ac.za",
    admissionsContact: "admissions@ru.ac.za",
    establishedYear: 1904,
    studentPopulation: 8500,
    faculties: [
      createBaseFaculty("commerce", "Commerce", "Business and commerce"),
      createBaseFaculty("education", "Education", "Teacher training"),
      createBaseFaculty("humanities", "Humanities", "Arts and humanities"),
      createBaseFaculty("law", "Law", "Legal studies"),
      createBaseFaculty("pharmacy", "Pharmacy", "Pharmaceutical sciences"),
      createBaseFaculty("science", "Science", "Natural sciences"),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 May 2025",
      closingDate: "30 September 2025",
      academicYear: "2026",
      applicationFee: "R100",
      applicationMethod: "Online via Rhodes Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 September 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "nwu",
    name: "North-West University",
    abbreviation: "NWU",
    fullName: "North-West University",
    location: "Potchefstroom",
    province: "North West",
    logo: "/logos/universities/university-of-north-west.svg",
    overview:
      "Multi-campus university offering comprehensive programs with strong community engagement.",
    website: "https://www.nwu.ac.za",
    studentPortal: "https://students.nwu.ac.za",
    admissionsContact: "admissions@nwu.ac.za",
    establishedYear: 2004,
    studentPopulation: 38000,
    faculties: [
      createBaseFaculty(
        "commerce",
        "Economic & Management Sciences",
        "Business and economics",
      ),
      createBaseFaculty("education", "Education", "Teacher training"),
      createBaseFaculty("engineering", "Engineering", "Engineering programs"),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Medical and health programs",
      ),
      createBaseFaculty("humanities", "Humanities", "Arts and humanities"),
      createBaseFaculty("law", "Law", "Legal studies"),
      createBaseFaculty(
        "natural",
        "Natural & Agricultural Sciences",
        "Science and agriculture",
      ),
      createBaseFaculty("theology", "Theology", "Religious studies"),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "2 April 2025",
      closingDate: "28 June 2025 (select programs), 30 August 2025 (others)",
      academicYear: "2026",
      applicationFee: "Free",
      applicationMethod: "Online via NWU Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 August 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "ufs",
    name: "University of the Free State",
    abbreviation: "UFS",
    fullName: "University of the Free State",
    location: "Bloemfontein",
    province: "Free State",
    logo: "/logos/universities/ufs.svg",
    overview:
      "Central university known for agriculture, medicine, and social sciences with multi-campus structure.",
    website: "https://www.ufs.ac.za",
    studentPortal: "https://students.ufs.ac.za",
    admissionsContact: "admissions@ufs.ac.za",
    establishedYear: 1904,
    studentPopulation: 37000,
    faculties: [
      createBaseFaculty(
        "agriculture",
        "Natural & Agricultural Sciences",
        "Agriculture and natural sciences",
      ),
      createBaseFaculty(
        "economic",
        "Economic & Management Sciences",
        "Business and economics",
      ),
      createBaseFaculty("education", "Education", "Teacher training"),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Medical and health programs",
      ),
      createBaseFaculty("humanities", "Humanities", "Arts and humanities"),
      createBaseFaculty("law", "Law", "Legal studies"),
      createBaseFaculty("theology", "Theology & Religion", "Religious studies"),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 April 2025",
      closingDate: "30 September 2025",
      academicYear: "2026",
      applicationFee: "Free",
      applicationMethod: "Online via UFS Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 September 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "uwc",
    name: "University of the Western Cape",
    abbreviation: "UWC",
    fullName: "University of the Western Cape",
    location: "Cape Town",
    province: "Western Cape",
    logo: "/logos/universities/uwc.svg",
    overview:
      "Historically disadvantaged university with strong academic programs and community engagement.",
    website: "https://www.uwc.ac.za",
    studentPortal: "https://students.uwc.ac.za",
    admissionsContact: "admissions@uwc.ac.za",
    establishedYear: 1960,
    studentPopulation: 24000,
    faculties: [
      createBaseFaculty("arts", "Arts", "Humanities and social sciences"),
      createBaseFaculty(
        "community",
        "Community & Health Sciences",
        "Health and community programs",
      ),
      createBaseFaculty("dentistry", "Dentistry", "Dental sciences"),
      createBaseFaculty(
        "economic",
        "Economic & Management Sciences",
        "Business and economics",
      ),
      createBaseFaculty("education", "Education", "Teacher training"),
      createBaseFaculty("law", "Law", "Legal studies"),
      createBaseFaculty(
        "natural",
        "Natural Sciences",
        "Science and mathematics",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "2 April 2025",
      closingDate: "30 August 2025 (Dentistry), 30 September 2025 (others)",
      academicYear: "2026",
      applicationFee: "Free",
      applicationMethod: "Online via UWC Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 September 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "ufh",
    name: "University of Fort Hare",
    abbreviation: "UFH",
    fullName: "University of Fort Hare",
    location: "Alice",
    province: "Eastern Cape",
    logo: "/logos/universities/ufh.svg",
    overview:
      "Historic university known for producing many African leaders, strong in humanities and social sciences.",
    website: "https://www.ufh.ac.za",
    studentPortal: "https://students.ufh.ac.za",
    admissionsContact: "admissions@ufh.ac.za",
    establishedYear: 1916,
    studentPopulation: 13000,
    faculties: [
      createBaseFaculty(
        "education",
        "Education",
        "Teacher training and educational studies",
      ),
      createBaseFaculty(
        "humanities",
        "Social Sciences & Humanities",
        "Arts and social sciences",
      ),
      createBaseFaculty("law", "Law", "Legal studies"),
      createBaseFaculty(
        "management",
        "Management & Commerce",
        "Business and commerce",
      ),
      createBaseFaculty(
        "science",
        "Science & Agriculture",
        "Natural sciences and agriculture",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 March 2025",
      closingDate: "30 September 2025",
      academicYear: "2026",
      applicationFee: "Free (online), R120 (manual SA), R500 (International)",
      applicationMethod: "Online via UFH Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 September 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "ul",
    name: "University of Limpopo",
    abbreviation: "UL",
    fullName: "University of Limpopo",
    location: "Polokwane",
    province: "Limpopo",
    logo: "/logos/universities/ul.svg",
    overview:
      "Rural university serving the northern provinces with programs focused on health sciences and agriculture.",
    website: "https://www.ul.ac.za",
    studentPortal: "https://students.ul.ac.za",
    admissionsContact: "admissions@ul.ac.za",
    establishedYear: 2005,
    studentPopulation: 19000,
    faculties: [
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Medical and health programs",
      ),
      createBaseFaculty("humanities", "Humanities", "Arts and social sciences"),
      createBaseFaculty("management", "Management & Law", "Business and law"),
      createBaseFaculty(
        "science",
        "Science & Agriculture",
        "Natural sciences and agriculture",
      ),
    ],
    applicationInfo: {
      isOpen: false,
      openingDate: "Dates to be confirmed",
      closingDate: "TBC",
      academicYear: "2026",
      applicationFee: "R200 (SA), R750 (International)",
      applicationMethod: "Online via UL Application Portal",
      lateApplications: {
        available: false,
        deadline: "TBC",
        additionalFee: "N/A",
      },
    },
  },
];

// UNIVERSITIES OF TECHNOLOGY (6)
export const COMPLETE_UNIVERSITIES_OF_TECHNOLOGY: University[] = [
  {
    id: "cput",
    name: "Cape Peninsula University of Technology",
    abbreviation: "CPUT",
    fullName: "Cape Peninsula University of Technology",
    location: "Cape Town",
    province: "Western Cape",
    logo: "/logos/universities/cput.svg",
    overview:
      "Leading university of technology offering career-focused programs in engineering, business, and applied sciences.",
    website: "https://www.cput.ac.za",
    studentPortal: "https://students.cput.ac.za",
    admissionsContact: "admissions@cput.ac.za",
    establishedYear: 2005,
    studentPopulation: 32000,
    faculties: [
      createBaseFaculty(
        "applied-sciences",
        "Applied Sciences",
        "Applied sciences and biotechnology",
      ),
      createBaseFaculty(
        "business",
        "Business & Management Sciences",
        "Business and management",
      ),
      createBaseFaculty(
        "education",
        "Education & Social Work",
        "Education and social work",
      ),
      createBaseFaculty(
        "engineering",
        "Engineering & Built Environment",
        "Engineering and construction",
      ),
      createBaseFaculty(
        "health",
        "Health & Wellness Sciences",
        "Health and wellness programs",
      ),
      createBaseFaculty(
        "informatics",
        "Informatics & Design",
        "IT and design programs",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "13 May 2025",
      closingDate: "30 September 2025",
      academicYear: "2026",
      applicationFee: "Free (online), R200 (manual)",
      applicationMethod: "Online via CPUT Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 September 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "dut",
    name: "Durban University of Technology",
    abbreviation: "DUT",
    fullName: "Durban University of Technology",
    location: "Durban",
    province: "KwaZulu-Natal",
    logo: "/logos/universities/dut.svg",
    overview:
      "Major university of technology with strong industry partnerships and applied research focus.",
    website: "https://www.dut.ac.za",
    studentPortal: "https://students.dut.ac.za",
    admissionsContact: "admissions@dut.ac.za",
    establishedYear: 2002,
    studentPopulation: 31000,
    faculties: [
      createBaseFaculty(
        "accounting",
        "Accounting & Informatics",
        "Accounting and IT programs",
      ),
      createBaseFaculty(
        "applied-sciences",
        "Applied Sciences",
        "Applied sciences and technology",
      ),
      createBaseFaculty("arts", "Arts & Design", "Creative arts and design"),
      createBaseFaculty(
        "engineering",
        "Engineering & Built Environment",
        "Engineering and construction",
      ),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Health and medical technology",
      ),
      createBaseFaculty(
        "management",
        "Management Sciences",
        "Business and management",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 April 2025",
      closingDate: "30 September 2025",
      academicYear: "2026",
      applicationFee: "R250 (SA), R300 (International)",
      applicationMethod: "Online via DUT Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 September 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "tut",
    name: "Tshwane University of Technology",
    abbreviation: "TUT",
    fullName: "Tshwane University of Technology",
    location: "Pretoria",
    province: "Gauteng",
    logo: "/logos/universities/tshwane-university-of-technology.svg",
    overview:
      "Largest university of technology in SA, offering comprehensive technical and professional programs.",
    website: "https://www.tut.ac.za",
    studentPortal: "https://students.tut.ac.za",
    admissionsContact: "admissions@tut.ac.za",
    establishedYear: 2004,
    studentPopulation: 60000,
    faculties: [
      createBaseFaculty("arts", "Arts & Design", "Creative arts and design"),
      createBaseFaculty(
        "economic",
        "Economic & Finance Sciences",
        "Business and finance",
      ),
      createBaseFaculty("education", "Education", "Educational sciences"),
      createBaseFaculty(
        "engineering",
        "Engineering & Built Environment",
        "Engineering and construction",
      ),
      createBaseFaculty(
        "humanities",
        "Humanities",
        "Humanities and social sciences",
      ),
      createBaseFaculty(
        "ict",
        "Information & Communication Technology",
        "ICT and computing",
      ),
      createBaseFaculty(
        "management",
        "Management Sciences",
        "Management and administration",
      ),
      createBaseFaculty("science", "Science", "Applied sciences"),
    ],
    applicationInfo: {
      isOpen: false,
      openingDate: "Typically around April (to be confirmed officially)",
      closingDate: "Typically around September (to be confirmed officially)",
      academicYear: "2026",
      applicationFee:
        "R240 (South Africans), R300–R600 (International, depending on status)",
      applicationMethod: "Online via TUT Application Portal",
      lateApplications: {
        available: false,
        deadline: "TBC",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "vut",
    name: "Vaal University of Technology",
    abbreviation: "VUT",
    fullName: "Vaal University of Technology",
    location: "Vanderbijlpark",
    province: "Gauteng",
    logo: "/logos/universities/vut.svg",
    overview:
      "Technology-focused university serving the Vaal Triangle region with industry-relevant programs.",
    website: "https://www.vut.ac.za",
    studentPortal: "https://students.vut.ac.za",
    admissionsContact: "admissions@vut.ac.za",
    establishedYear: 1966,
    studentPopulation: 21000,
    faculties: [
      createBaseFaculty(
        "applied",
        "Applied & Computer Sciences",
        "Applied sciences and computing",
      ),
      createBaseFaculty(
        "engineering",
        "Engineering Technology",
        "Engineering and technology",
      ),
      createBaseFaculty(
        "human",
        "Human Sciences",
        "Humanities and social sciences",
      ),
      createBaseFaculty(
        "management",
        "Management Sciences",
        "Business and management",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 May 2025",
      closingDate: "1 September 2025",
      academicYear: "2026",
      applicationFee: "R100",
      applicationMethod: "Online via VUT Application Portal",
      lateApplications: {
        available: false,
        deadline: "1 September 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "cut",
    name: "Central University of Technology",
    abbreviation: "CUT",
    fullName: "Central University of Technology, Free State",
    location: "Bloemfontein",
    province: "Free State",
    logo: "/logos/universities/cut.svg",
    overview:
      "Multi-campus technology university serving central South Africa with practical and applied programs.",
    website: "https://www.cut.ac.za",
    studentPortal: "https://students.cut.ac.za",
    admissionsContact: "admissions@cut.ac.za",
    establishedYear: 1981,
    studentPopulation: 15000,
    faculties: [
      createBaseFaculty(
        "engineering",
        "Engineering & Information Technology",
        "Engineering and IT programs",
      ),
      createBaseFaculty(
        "health",
        "Health & Environmental Sciences",
        "Health and environmental sciences",
      ),
      createBaseFaculty(
        "humanities",
        "Humanities",
        "Humanities and social sciences",
      ),
      createBaseFaculty(
        "management",
        "Management Sciences",
        "Business and management",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "27 March 2025",
      closingDate: "30 September 2025",
      academicYear: "2026",
      applicationFee: "Free",
      applicationMethod: "Online via CUT Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 September 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "mut",
    name: "Mangosuthu University of Technology",
    abbreviation: "MUT",
    fullName: "Mangosuthu University of Technology",
    location: "Umlazi",
    province: "KwaZulu-Natal",
    logo: "/logos/universities/mut.svg",
    overview:
      "Technology university focusing on addressing skills shortages in engineering and natural sciences.",
    website: "https://www.mut.ac.za",
    studentPortal: "https://students.mut.ac.za",
    admissionsContact: "admissions@mut.ac.za",
    establishedYear: 1979,
    studentPopulation: 13000,
    faculties: [
      createBaseFaculty("engineering", "Engineering", "Engineering sciences"),
      createBaseFaculty(
        "management",
        "Management Sciences",
        "Business and management",
      ),
      createBaseFaculty(
        "natural",
        "Natural Sciences",
        "Natural and applied sciences",
      ),
    ],
    applicationInfo: {
      isOpen: false,
      openingDate: "Dates to be confirmed",
      closingDate: "30 September 2025",
      academicYear: "2026",
      applicationFee: "R250 (SA), R300 (International)",
      applicationMethod: "Online via MUT Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 September 2025",
        additionalFee: "N/A",
      },
    },
  },
];

// COMPREHENSIVE UNIVERSITIES (6)
export const COMPLETE_COMPREHENSIVE_UNIVERSITIES: University[] = [
  {
    id: "uj",
    name: "University of Johannesburg",
    abbreviation: "UJ",
    fullName: "University of Johannesburg",
    location: "Johannesburg",
    province: "Gauteng",
    logo: "/logos/universities/university-of-johannesburg.svg",
    overview:
      "Dynamic comprehensive university combining academic excellence with practical application in urban setting.",
    website: "https://www.uj.ac.za",
    studentPortal: "https://students.uj.ac.za",
    admissionsContact: "admissions@uj.ac.za",
    establishedYear: 2005,
    studentPopulation: 50000,
    faculties: [
      createBaseFaculty(
        "art",
        "Art, Design & Architecture",
        "Creative arts and architecture",
      ),
      createBaseFaculty(
        "education",
        "Education",
        "Teacher training and educational studies",
      ),
      createBaseFaculty(
        "engineering",
        "Engineering & Built Environment",
        "Engineering and construction",
      ),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Health and medical programs",
      ),
      createBaseFaculty("humanities", "Humanities", "Arts and humanities"),
      createBaseFaculty("law", "Law", "Legal studies"),
      createBaseFaculty("management", "Management", "Business and management"),
      createBaseFaculty("science", "Science", "Natural sciences"),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 April 2025",
      closingDate: "1 October 2025",
      academicYear: "2026",
      applicationFee: "Free (online), R200 (paper-based)",
      applicationMethod: "Online via UJ Application Portal",
      lateApplications: {
        available: false,
        deadline: "1 October 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "unizulu",
    name: "University of Zululand",
    abbreviation: "Unizulu",
    fullName: "University of Zululand",
    location: "Richards Bay",
    province: "KwaZulu-Natal",
    logo: "/logos/universities/university-of-zululand.svg",
    overview:
      "Comprehensive university serving rural KwaZulu-Natal with programs in multiple languages.",
    website: "https://www.unizulu.ac.za",
    studentPortal: "https://students.unizulu.ac.za",
    admissionsContact: "admissions@unizulu.ac.za",
    establishedYear: 1960,
    studentPopulation: 16000,
    faculties: [
      createBaseFaculty("arts", "Arts", "Humanities and social sciences"),
      createBaseFaculty(
        "commerce",
        "Commerce, Administration & Law",
        "Business, administration, and law",
      ),
      createBaseFaculty("education", "Education", "Teacher training"),
      createBaseFaculty(
        "science",
        "Science & Agriculture",
        "Natural sciences and agriculture",
      ),
    ],
    applicationInfo: {
      isOpen: false,
      openingDate: "Dates to be confirmed",
      closingDate: "TBC",
      academicYear: "2026",
      applicationFee: "R100",
      applicationMethod: "Online via Unizulu Application Portal",
      lateApplications: {
        available: false,
        deadline: "TBC",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "wsu",
    name: "Walter Sisulu University",
    abbreviation: "WSU",
    fullName: "Walter Sisulu University",
    location: "Mthatha",
    province: "Eastern Cape",
    logo: "/logos/universities/wsu.svg",
    overview:
      "Comprehensive university serving the Eastern Cape with multiple campuses and community focus.",
    website: "https://www.wsu.ac.za",
    studentPortal: "https://students.wsu.ac.za",
    admissionsContact: "admissions@wsu.ac.za",
    establishedYear: 2005,
    studentPopulation: 28000,
    faculties: [
      createBaseFaculty(
        "business",
        "Business, Management Sciences & Law",
        "Business and law",
      ),
      createBaseFaculty(
        "education",
        "Education",
        "Teacher training and educational studies",
      ),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Health and medical programs",
      ),
      createBaseFaculty(
        "humanities",
        "Humanities & Social Sciences",
        "Arts and social sciences",
      ),
      createBaseFaculty(
        "science",
        "Science, Engineering & Technology",
        "Science and technology",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "2 April 2025",
      closingDate:
        "30 September 2025 (Health Sciences), 31 October 2025 (others)",
      academicYear: "2026",
      applicationFee: "Free",
      applicationMethod: "Online via WSU Application Portal",
      lateApplications: {
        available: false,
        deadline: "31 October 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "univen",
    name: "University of Venda",
    abbreviation: "Univen",
    fullName: "University of Venda",
    location: "Thohoyandou",
    province: "Limpopo",
    logo: "/logos/universities/university-of-venda.svg",
    overview:
      "Comprehensive university serving the northern regions with strong agricultural and health science programs.",
    website: "https://www.univen.ac.za",
    studentPortal: "https://students.univen.ac.za",
    admissionsContact: "admissions@univen.ac.za",
    establishedYear: 1982,
    studentPopulation: 15000,
    faculties: [
      createBaseFaculty("agriculture", "Agriculture", "Agricultural sciences"),
      createBaseFaculty("education", "Education", "Teacher training"),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Health and medical programs",
      ),
      createBaseFaculty(
        "humanities",
        "Humanities, Social Sciences & Education",
        "Arts and social sciences",
      ),
      createBaseFaculty("law", "Law", "Legal studies"),
      createBaseFaculty(
        "management",
        "Management Sciences",
        "Business and management",
      ),
      createBaseFaculty(
        "science",
        "Science, Engineering & Agriculture",
        "Science and engineering",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "2 May 2025",
      closingDate: "26 September 2025",
      academicYear: "2026",
      applicationFee: "R100",
      applicationMethod: "Online via Univen Application Portal",
      lateApplications: {
        available: false,
        deadline: "26 September 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "ump",
    name: "University of Mpumalanga",
    abbreviation: "UMP",
    fullName: "University of Mpumalanga",
    location: "Nelspruit",
    province: "Mpumalanga",
    logo: "/logos/universities/university-of-mpumalanga.svg",
    overview:
      "Newest public university, focusing on addressing skills needs in agriculture, health, and education.",
    website: "https://www.ump.ac.za",
    studentPortal: "https://students.ump.ac.za",
    admissionsContact: "admissions@ump.ac.za",
    establishedYear: 2014,
    studentPopulation: 4000,
    faculties: [
      createBaseFaculty(
        "agriculture",
        "Agriculture & Natural Sciences",
        "Agriculture and environmental sciences",
      ),
      createBaseFaculty(
        "education",
        "Education",
        "Teacher training and educational studies",
      ),
      createBaseFaculty(
        "health-sciences",
        "Medical & Health Sciences",
        "Health and medical programs",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 April 2025",
      closingDate: "1 November 2025",
      academicYear: "2026",
      applicationFee: "R150 (RSA/SADC), R350 (Rest of Africa), R500 (Others)",
      applicationMethod: "Online via UMP Application Portal",
      lateApplications: {
        available: false,
        deadline: "1 November 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "spu",
    name: "Sol Plaatje University",
    abbreviation: "SPU",
    fullName: "Sol Plaatje University",
    location: "Kimberley",
    province: "Northern Cape",
    logo: "/logos/universities/spu.svg",
    overview:
      "New comprehensive university established to serve the Northern Cape region with innovative programs.",
    website: "https://www.spu.ac.za",
    studentPortal: "https://students.spu.ac.za",
    admissionsContact: "admissions@spu.ac.za",
    establishedYear: 2014,
    studentPopulation: 2500,
    faculties: [
      createBaseFaculty(
        "education",
        "Education & Humanities",
        "Education and humanities",
      ),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Health and medical programs",
      ),
      createBaseFaculty(
        "natural",
        "Natural & Applied Sciences",
        "Natural and applied sciences",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 April 2025",
      closingDate: "30 September 2025",
      academicYear: "2026",
      applicationFee: "Free",
      applicationMethod: "Online via SPU Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 September 2025",
        additionalFee: "N/A",
      },
    },
  },
];

// SPECIALIZED UNIVERSITIES (3)
export const COMPLETE_SPECIALIZED_UNIVERSITIES: University[] = [
  {
    id: "unisa",
    name: "University of South Africa",
    abbreviation: "UNISA",
    fullName: "University of South Africa",
    location: "Pretoria",
    province: "Gauteng",
    logo: "/logos/universities/unisa.svg",
    overview:
      "Africa's largest distance education university, offering flexible learning across all disciplines.",
    website: "https://www.unisa.ac.za",
    studentPortal: "https://students.unisa.ac.za",
    admissionsContact: "admissions@unisa.ac.za",
    establishedYear: 1873,
    studentPopulation: 400000,
    faculties: [
      createBaseFaculty(
        "agriculture",
        "Agriculture & Environmental Sciences",
        "Agriculture and environmental studies",
      ),
      createBaseFaculty(
        "economic",
        "Economic & Management Sciences",
        "Business and economics",
      ),
      createBaseFaculty(
        "education",
        "Education",
        "Teacher training and educational studies",
      ),
      createBaseFaculty(
        "engineering",
        "Science, Engineering & Technology",
        "Science and engineering",
      ),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Health and medical programs",
      ),
      createBaseFaculty("humanities", "Humanities", "Arts and humanities"),
      createBaseFaculty("law", "Law", "Legal studies"),
      createBaseFaculty("theology", "Theology & Religion", "Religious studies"),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 September 2025",
      closingDate: "1 January 2026",
      academicYear: "2026",
      applicationFee: "R135",
      applicationMethod: "Online via UNISA Application Portal",
      lateApplications: {
        available: false,
        deadline: "1 January 2026",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "smu",
    name: "Sefako Makgatho Health Sciences University",
    abbreviation: "SMU",
    fullName: "Sefako Makgatho Health Sciences University",
    location: "Pretoria",
    province: "Gauteng",
    logo: "/logos/universities/smu.svg",
    overview:
      "Specialized health sciences university focusing on medical education, research, and healthcare delivery.",
    website: "https://www.smu.ac.za",
    studentPortal: "https://students.smu.ac.za",
    admissionsContact: "admissions@smu.ac.za",
    establishedYear: 2015,
    studentPopulation: 4000,
    faculties: [
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Medical and health sciences programs",
      ),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "2 April 2025",
      closingDate: "31 July 2025 (Undergrad), 30 August 2025 (Postgrad)",
      academicYear: "2026",
      applicationFee: "R300",
      applicationMethod: "Online via SMU Application Portal",
      lateApplications: {
        available: false,
        deadline: "30 August 2025",
        additionalFee: "N/A",
      },
    },
  },
  {
    id: "nmu",
    name: "Nelson Mandela University",
    abbreviation: "NMU",
    fullName: "Nelson Mandela University",
    location: "Port Elizabeth",
    province: "Eastern Cape",
    logo: "/logos/universities/nmu.svg",
    overview:
      "Comprehensive university combining academic excellence with social impact and innovation.",
    website: "https://www.mandela.ac.za",
    studentPortal: "https://students.mandela.ac.za",
    admissionsContact: "admissions@mandela.ac.za",
    establishedYear: 2005,
    studentPopulation: 27000,
    faculties: [
      createBaseFaculty("arts", "Arts", "Arts and humanities"),
      createBaseFaculty(
        "business",
        "Business & Economic Sciences",
        "Business and economics",
      ),
      createBaseFaculty("education", "Education", "Teacher training"),
      createBaseFaculty(
        "engineering",
        "Engineering, Built Environment & Technology",
        "Engineering and technology",
      ),
      createBaseFaculty(
        "health-sciences",
        "Health Sciences",
        "Health and medical programs",
      ),
      createBaseFaculty("law", "Law", "Legal studies"),
      createBaseFaculty("science", "Science", "Natural sciences"),
    ],
    applicationInfo: {
      isOpen: true,
      openingDate: "1 April 2025",
      closingDate: "Closing dates vary by program",
      academicYear: "2026",
      applicationFee:
        "Free for South Africans, R500 for international students",
      applicationMethod: "Online via NMU Application Portal",
      lateApplications: {
        available: false,
        deadline: "Varies by program",
        additionalFee: "N/A",
      },
    },
  },
];

// Combine all universities
export const COMPLETE_SA_UNIVERSITIES: University[] = [
  ...COMPLETE_TRADITIONAL_UNIVERSITIES,
  ...COMPLETE_UNIVERSITIES_OF_TECHNOLOGY,
  ...COMPLETE_COMPREHENSIVE_UNIVERSITIES,
  ...COMPLETE_SPECIALIZED_UNIVERSITIES,
];

// Legacy export for backward compatibility
export const ALL_26_SA_UNIVERSITIES = COMPLETE_SA_UNIVERSITIES;

// University count summary for verification
export const UNIVERSITY_COUNT_SUMMARY = {
  traditional: COMPLETE_TRADITIONAL_UNIVERSITIES.length,
  technology: COMPLETE_UNIVERSITIES_OF_TECHNOLOGY.length,
  comprehensive: COMPLETE_COMPREHENSIVE_UNIVERSITIES.length,
  specialized: COMPLETE_SPECIALIZED_UNIVERSITIES.length,
  total: COMPLETE_SA_UNIVERSITIES.length,
};

// Export for type safety and external use
export { createBaseFaculty };

export default COMPLETE_SA_UNIVERSITIES;
