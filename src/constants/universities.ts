import { University, Faculty } from "@/types/university";

export const SOUTH_AFRICAN_UNIVERSITIES_SIMPLE = [
  {
    id: "uct",
    name: "University of Cape Town",
    abbreviation: "UCT",
    fullName: "University of Cape Town (UCT)",
  },
  {
    id: "wits",
    name: "University of the Witwatersrand",
    abbreviation: "Wits",
    fullName: "University of the Witwatersrand (Wits)",
  },
  {
    id: "stellenbosch",
    name: "Stellenbosch University",
    abbreviation: "SU",
    fullName: "Stellenbosch University (SU)",
  },
  {
    id: "up",
    name: "University of Pretoria",
    abbreviation: "UP",
    fullName: "University of Pretoria (UP)",
  },
  {
    id: "ukzn",
    name: "University of KwaZulu-Natal",
    abbreviation: "UKZN",
    fullName: "University of KwaZulu-Natal (UKZN)",
  },
  {
    id: "rhodes",
    name: "Rhodes University",
    abbreviation: "Rhodes",
    fullName: "Rhodes University",
  },
  {
    id: "uwc",
    name: "University of the Western Cape",
    abbreviation: "UWC",
    fullName: "University of the Western Cape (UWC)",
  },
  {
    id: "uj",
    name: "University of Johannesburg",
    abbreviation: "UJ",
    fullName: "University of Johannesburg (UJ)",
  },
  {
    id: "nmu",
    name: "Nelson Mandela University",
    abbreviation: "NMU",
    fullName: "Nelson Mandela University (NMU)",
  },
  {
    id: "unisa",
    name: "University of South Africa",
    abbreviation: "UNISA",
    fullName: "University of South Africa (UNISA)",
  },
  {
    id: "nwu",
    name: "North-West University",
    abbreviation: "NWU",
    fullName: "North-West University (NWU)",
  },
  {
    id: "ufs",
    name: "University of the Free State",
    abbreviation: "UFS",
    fullName: "University of the Free State (UFS)",
  },
  {
    id: "cput",
    name: "Cape Peninsula University of Technology",
    abbreviation: "CPUT",
    fullName: "Cape Peninsula University of Technology (CPUT)",
  },
  {
    id: "dut",
    name: "Durban University of Technology",
    abbreviation: "DUT",
    fullName: "Durban University of Technology (DUT)",
  },
  {
    id: "tut",
    name: "Tshwane University of Technology",
    abbreviation: "TUT",
    fullName: "Tshwane University of Technology (TUT)",
  },
  {
    id: "vut",
    name: "Vaal University of Technology",
    abbreviation: "VUT",
    fullName: "Vaal University of Technology (VUT)",
  },
  {
    id: "cut",
    name: "Central University of Technology",
    abbreviation: "CUT",
    fullName: "Central University of Technology (CUT)",
  },
  {
    id: "mut",
    name: "Mangosuthu University of Technology",
    abbreviation: "MUT",
    fullName: "Mangosuthu University of Technology (MUT)",
  },
  {
    id: "spu",
    name: "Sol Plaatje University",
    abbreviation: "SPU",
    fullName: "Sol Plaatje University (SPU)",
  },
  {
    id: "ump",
    name: "University of Mpumalanga",
    abbreviation: "UMP",
    fullName: "University of Mpumalanga (UMP)",
  },
  {
    id: "smu",
    name: "Sefako Makgatho Health Sciences University",
    abbreviation: "SMU",
    fullName: "Sefako Makgatho Health Sciences University (SMU)",
  },
  {
    id: "wsu",
    name: "Walter Sisulu University",
    abbreviation: "WSU",
    fullName: "Walter Sisulu University (WSU)",
  },
  {
    id: "unizulu",
    name: "University of Zululand",
    abbreviation: "UniZulu",
    fullName: "University of Zululand (UniZulu)",
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
        degrees: [],
      },
      {
        id: "engineering",
        name: "Faculty of Engineering & the Built Environment",
        description:
          "World-class engineering programs including civil, electrical, mechanical, and chemical engineering.",
        degrees: [],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Prestigious medical and health sciences programs including MBChB, pharmacy, and health rehabilitation.",
        degrees: [],
      },
      {
        id: "humanities",
        name: "Faculty of Humanities",
        description:
          "Comprehensive humanities programs including law, languages, social sciences, and arts.",
        degrees: [],
      },
      {
        id: "science",
        name: "Faculty of Science",
        description:
          "Excellence in natural sciences, mathematics, computer science, and applied mathematics.",
        degrees: [],
      },
      {
        id: "law",
        name: "Faculty of Law",
        description:
          "One of Africa's leading law schools with a strong focus on constitutional and international law.",
        degrees: [],
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
    overview:
      "A world-class African university that is internationally distinguished for its excellent research and teaching. Known for producing leaders in business, politics, and academia.",
    website: "https://www.wits.ac.za",
    studentPortal: "https://students.wits.ac.za",
    admissionsContact: "admissions@wits.ac.za",
    faculties: [
      {
        id: "commerce",
        name: "Wits Business School",
        description:
          "Africa's leading business school offering undergraduate and postgraduate business programs.",
        degrees: [],
      },
      {
        id: "engineering",
        name: "School of Engineering",
        description:
          "Renowned engineering programs with strong industry connections and research focus.",
        degrees: [],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Comprehensive health sciences education including medicine, dentistry, and nursing.",
        degrees: [],
      },
      {
        id: "humanities",
        name: "Faculty of Humanities",
        description:
          "Diverse humanities programs including social sciences, languages, and performing arts.",
        degrees: [],
      },
      {
        id: "science",
        name: "Faculty of Science",
        description:
          "Leading science education and research in natural sciences and mathematics.",
        degrees: [],
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
        degrees: [],
      },
      {
        id: "engineering",
        name: "Faculty of Engineering",
        description:
          "Innovative engineering programs with a focus on sustainable development.",
        degrees: [],
      },
      {
        id: "medicine",
        name: "Faculty of Medicine and Health Sciences",
        description:
          "Leading medical education and research in sub-Saharan Africa.",
        degrees: [],
      },
      {
        id: "arts",
        name: "Faculty of Arts and Social Sciences",
        description:
          "Rich humanities and social sciences programs with multilingual education.",
        degrees: [],
      },
      {
        id: "science",
        name: "Faculty of Science",
        description:
          "Excellence in natural sciences, mathematics, and technology.",
        degrees: [],
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
        degrees: [],
      },
      {
        id: "engineering",
        name: "Faculty of Engineering, Built Environment and Information Technology",
        description:
          "Comprehensive engineering and IT programs with strong industry connections.",
        degrees: [],
      },
      {
        id: "health",
        name: "Faculty of Health Sciences",
        description:
          "Comprehensive health sciences education including medicine, dentistry, and veterinary science.",
        degrees: [],
      },
      {
        id: "humanities",
        name: "Faculty of Humanities",
        description:
          "Diverse humanities programs including languages, social work, and theology.",
        degrees: [],
      },
      {
        id: "law",
        name: "Faculty of Law",
        description:
          "Prestigious law programs with a focus on constitutional and commercial law.",
        degrees: [],
      },
      {
        id: "natural",
        name: "Faculty of Natural and Agricultural Sciences",
        description:
          "Excellence in natural sciences, mathematics, and agricultural sciences.",
        degrees: [],
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
    overview:
      "A premier research university in Africa, committed to academic excellence and social responsiveness. Known for its diverse student body and strong research output.",
    website: "https://www.ukzn.ac.za",
    studentPortal: "https://students.ukzn.ac.za",
    admissionsContact: "admissions@ukzn.ac.za",
    faculties: [
      {
        id: "management",
        name: "School of Management, IT and Governance",
        description:
          "Comprehensive business and management programs with a focus on African contexts.",
        degrees: [],
      },
      {
        id: "engineering",
        name: "School of Engineering",
        description:
          "Innovation-focused engineering programs addressing African development challenges.",
        degrees: [],
      },
      {
        id: "medicine",
        name: "School of Clinical Medicine",
        description:
          "Leading medical education serving the healthcare needs of KwaZulu-Natal.",
        degrees: [],
      },
      {
        id: "humanities",
        name: "School of Social Sciences",
        description:
          "Rich humanities and social sciences programs with African perspectives.",
        degrees: [],
      },
      {
        id: "science",
        name: "School of Mathematics, Statistics and Computer Science",
        description:
          "Strong programs in mathematical and computational sciences.",
        degrees: [],
      },
    ],
  },
];

export const UNIVERSITY_YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "Masters",
  "Doctorate",
];

// Both SOUTH_AFRICAN_UNIVERSITIES_SIMPLE and SOUTH_AFRICAN_UNIVERSITIES are available for import
