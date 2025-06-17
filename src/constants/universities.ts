export interface University {
  id: string;
  name: string;
  abbreviation: string;
  fullName: string;
  logo: string;
  location: string;
  province: string;
  website?: string;
  overview: string;
  studentPopulation?: number;
  faculties?: string[];
  establishedYear?: number;
  established?: string;
  type?: string;
}

export interface SimpleUniversity {
  id: string;
  name: string;
  abbreviation: string;
  fullName: string;
  logo: string;
  code: string;
}

export interface Degree {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  subjects?: string[];
}

export const UNIVERSITY_YEARS = [
  "1st Year",
  "2nd Year", 
  "3rd Year",
  "4th Year",
  "Postgraduate"
];

export const SOUTH_AFRICAN_UNIVERSITIES: University[] = [
  {
    id: "uct",
    name: "University of Cape Town",
    abbreviation: "UCT",
    fullName: "University of Cape Town",
    logo: "/university-logos/uct.png",
    location: "Cape Town",
    province: "Western Cape",
    website: "http://www.uct.ac.za/",
    overview:
      "The University of Cape Town (UCT) is a public research university located in Cape Town, South Africa. It is the oldest university in South Africa and is consistently ranked among the top universities in the world.",
    studentPopulation: 29000,
    faculties: [
      "Commerce",
      "Engineering & the Built Environment",
      "Health Sciences",
      "Humanities",
      "Law",
      "Science",
    ],
    establishedYear: 1829,
    type: "Public Research University",
  },
  {
    id: "wits",
    name: "University of the Witwatersrand",
    abbreviation: "Wits",
    fullName: "University of the Witwatersrand",
    logo: "/university-logos/wits.png",
    location: "Johannesburg",
    province: "Gauteng",
    website: "http://www.wits.ac.za/",
    overview:
      "The University of the Witwatersrand (Wits) is a multi-campus South African public research university situated in the northern areas of central Johannesburg. It is more commonly known as Wits University or Wits.",
    studentPopulation: 40259,
    faculties: [
      "Commerce, Law and Management",
      "Engineering and the Built Environment",
      "Health Sciences",
      "Humanities",
      "Science",
    ],
    establishedYear: 1922,
    type: "Public Research University",
  },
  {
    id: "up",
    name: "University of Pretoria",
    abbreviation: "UP",
    fullName: "University of Pretoria",
    logo: "/university-logos/up.png",
    location: "Pretoria",
    province: "Gauteng",
    website: "http://www.up.ac.za/",
    overview:
      "The University of Pretoria (UP) is a multi-campus public research university in Pretoria, the administrative and de facto capital of South Africa. The university was established in 1908 as the Pretoria campus of the Transvaal University College.",
    studentPopulation: 55000,
    faculties: [
      "Economic and Management Sciences",
      "Education",
      "Engineering, Built Environment and Information Technology",
      "Health Sciences",
      "Humanities",
      "Law",
      "Natural and Agricultural Sciences",
      "Theology and Religion",
      "Veterinary Science",
    ],
    establishedYear: 1908,
    type: "Public Research University",
  },
  {
    id: "stellenbosch",
    name: "Stellenbosch University",
    abbreviation: "SU",
    fullName: "Stellenbosch University",
    logo: "/university-logos/stellenbosch.png",
    location: "Stellenbosch",
    province: "Western Cape",
    website: "http://www.sun.ac.za/",
    overview:
      "Stellenbosch University (SU) is a public research university situated in Stellenbosch, a town in the Western Cape province of South Africa. SU was the first university to be established in South Africa.",
    studentPopulation: 32000,
    faculties: [
      "AgriSciences",
      "Arts and Social Sciences",
      "Economic and Management Sciences",
      "Education",
      "Engineering",
      "Law",
      "Medicine and Health Sciences",
      "Military Science",
      "Science",
      "Theology",
    ],
    establishedYear: 1918,
    type: "Public Research University",
  },
  {
    id: "ukzn",
    name: "University of KwaZulu-Natal",
    abbreviation: "UKZN",
    fullName: "University of KwaZulu-Natal",
    logo: "/university-logos/ukzn.png",
    location: "Durban",
    province: "KwaZulu-Natal",
    website: "http://www.ukzn.ac.za/",
    overview:
      "The University of KwaZulu-Natal (UKZN) is a multi-campus public university in the province of KwaZulu-Natal in South Africa. It was formed on 1 January 2004 after the merger between the University of Durban-Westville and the University of Natal.",
    studentPopulation: 47000,
    faculties: [
      "Agriculture, Engineering and Science",
      "Health Sciences",
      "Humanities",
      "Law and Management Studies",
    ],
    establishedYear: 2004,
    type: "Public University",
  },
  {
    id: "uj",
    name: "University of Johannesburg",
    abbreviation: "UJ",
    fullName: "University of Johannesburg",
    logo: "/university-logos/uj.png",
    location: "Johannesburg",
    province: "Gauteng",
    website: "http://www.uj.ac.za/",
    overview:
      "The University of Johannesburg (UJ) is a public university located in Johannesburg, South Africa. UJ is one of the largest contact universities in South Africa.",
    studentPopulation: 50000,
    faculties: [
      "Art, Design and Architecture",
      "Education",
      "Engineering and the Built Environment",
      "Health Sciences",
      "Humanities",
      "Law",
      "Management",
      "Science",
    ],
    establishedYear: 2005,
    type: "Public University",
  },
  {
    id: "ru",
    name: "Rhodes University",
    abbreviation: "RU",
    fullName: "Rhodes University",
    logo: "/university-logos/rhodes.png",
    location: "Grahamstown",
    province: "Eastern Cape",
    website: "http://www.ru.ac.za/",
    overview:
      "Rhodes University is a public research university located in Makhanda (Grahamstown) in the Eastern Cape Province of South Africa. It is one of four universities in the province.",
    studentPopulation: 8000,
    faculties: [
      "Commerce",
      "Humanities",
      "Law",
      "Pharmacy",
      "Science",
      "Education",
    ],
    establishedYear: 1904,
    type: "Public Research University",
  },
  {
    id: "nwu",
    name: "North-West University",
    abbreviation: "NWU",
    fullName: "North-West University",
    logo: "/university-logos/nwu.png",
    location: "Potchefstroom",
    province: "North West",
    website: "http://www.nwu.ac.za/",
    overview:
      "North-West University (NWU) is a multi-campus public university located in the North West Province of South Africa. The university has three campuses in Potchefstroom, Mahikeng and Vanderbijlpark.",
    studentPopulation: 68000,
    faculties: [
      "Economic and Management Sciences",
      "Education",
      "Engineering",
      "Health Sciences",
      "Humanities",
      "Law",
      "Natural and Agricultural Sciences",
      "Theology",
    ],
    establishedYear: 2004,
    type: "Public University",
  },
  {
    id: "ufs",
    name: "University of the Free State",
    abbreviation: "UFS",
    fullName: "University of the Free State",
    logo: "/university-logos/ufs.png",
    location: "Bloemfontein",
    province: "Free State",
    website: "http://www.ufs.ac.za/",
    overview:
      "The University of the Free State (UFS) is a multi-campus public university in Bloemfontein, the capital of the Free State province in South Africa.",
    studentPopulation: 33000,
    faculties: [
      "Economic and Management Sciences",
      "Education",
      "Health Sciences",
      "Humanities",
      "Law",
      "Natural and Agricultural Sciences",
      "Theology and Religion",
    ],
    establishedYear: 1904,
    type: "Public University",
  },
  {
    id: "unisa",
    name: "University of South Africa",
    abbreviation: "UNISA",
    fullName: "University of South Africa",
    logo: "/university-logos/unisa.png",
    location: "Pretoria",
    province: "Gauteng",
    website: "http://www.unisa.ac.za/",
    overview:
      "The University of South Africa (UNISA), is the largest university system in South Africa by enrollment. It attracts a third of all South African students.",
    studentPopulation: 400000,
    faculties: [
      "Accounting Sciences",
      "Agriculture and Environmental Sciences",
      "Economic and Management Sciences",
      "Education",
      "Graduate School of Business Leadership",
      "Human Sciences",
      "Law",
      "Science, Engineering and Technology",
    ],
    establishedYear: 1873,
    type: "Open Distance Learning University",
  },
  {
    id: "uwc",
    name: "University of the Western Cape",
    abbreviation: "UWC",
    fullName: "University of the Western Cape",
    logo: "/university-logos/uwc.png",
    location: "Cape Town",
    province: "Western Cape",
    website: "http://www.uwc.ac.za/",
    overview:
      "The University of the Western Cape (UWC) is a public university located in Bellville, near Cape Town, South Africa. It was established in 1960 as a university for Coloured people.",
    studentPopulation: 24000,
    faculties: [
      "Arts and Humanities",
      "Community and Health Sciences",
      "Dentistry",
      "Economic and Management Sciences",
      "Education",
      "Law",
      "Natural Sciences",
    ],
    establishedYear: 1960,
    type: "Public University",
  },
  {
    id: "univen",
    name: "University of Venda",
    abbreviation: "UNIVEN",
    fullName: "University of Venda",
    logo: "/university-logos/univen.png",
    location: "Thohoyandou",
    province: "Limpopo",
    website: "http://www.univen.ac.za/",
    overview:
      "The University of Venda is a South African university located in Thohoyandou in the Limpopo province. It was established in 1982.",
    studentPopulation: 12000,
    faculties: [
      "Agriculture, Science and Technology",
      "Education",
      "Human and Social Sciences",
      "Law",
      "Management Sciences",
    ],
    establishedYear: 1982,
    type: "Public University",
  },
  {
    id: "ul",
    name: "University of Limpopo",
    abbreviation: "UL",
    fullName: "University of Limpopo",
    logo: "/university-logos/ul.png",
    location: "Polokwane",
    province: "Limpopo",
    website: "http://www.ul.ac.za/",
    overview:
      "The University of Limpopo is a South African university located in Polokwane in the Limpopo province. It was formed on 1 January 2005, through the merger of the University of the North and the Medical University of South Africa (MEDUNSA).",
    studentPopulation: 20000,
    faculties: [
      "Health Sciences",
      "Humanities",
      "Management and Law",
      "Science and Agriculture",
    ],
    establishedYear: 2005,
    type: "Public University",
  },
  {
    id: "mut",
    name: "Mangosuthu University of Technology",
    abbreviation: "MUT",
    fullName: "Mangosuthu University of Technology",
    logo: "/university-logos/mut.png",
    location: "Durban",
    province: "KwaZulu-Natal",
    website: "http://www.mut.ac.za/",
    overview:
      "Mangosuthu University of Technology is a university of technology in Umlazi, KwaZulu-Natal, South Africa. It was established in 1979.",
    studentPopulation: 12000,
    faculties: [
      "Engineering",
      "Management Sciences",
      "Natural Sciences",
    ],
    establishedYear: 1979,
    type: "University of Technology",
  },
  {
    id: "cput",
    name: "Cape Peninsula University of Technology",
    abbreviation: "CPUT",
    fullName: "Cape Peninsula University of Technology",
    logo: "/university-logos/cput.png",
    location: "Cape Town",
    province: "Western Cape",
    website: "http://www.cput.ac.za/",
    overview:
      "The Cape Peninsula University of Technology (CPUT) is a university in Cape Town, South Africa. It was formed on 1 January 2005, through the merger of the Cape Technikon and the Peninsula Technikon.",
    studentPopulation: 30000,
    faculties: [
      "Applied Sciences",
      "Business and Management Sciences",
      "Education",
      "Engineering and the Built Environment",
      "Health and Wellness Sciences",
    ],
    establishedYear: 2005,
    type: "University of Technology",
  },
];

// Export alias for compatibility
export const ALL_SOUTH_AFRICAN_UNIVERSITIES = SOUTH_AFRICAN_UNIVERSITIES;

export const SOUTH_AFRICAN_UNIVERSITIES_SIMPLE: SimpleUniversity[] = [
  {
    id: "uct",
    name: "University of Cape Town",
    abbreviation: "UCT",
    fullName: "University of Cape Town",
    logo: "/university-logos/uct.png",
    code: "uct"
  },
  {
    id: "wits",
    name: "University of the Witwatersrand", 
    abbreviation: "Wits",
    fullName: "University of the Witwatersrand",
    logo: "/university-logos/wits.png",
    code: "wits"
  },
  {
    id: "up",
    name: "University of Pretoria",
    abbreviation: "UP", 
    fullName: "University of Pretoria",
    logo: "/university-logos/up.png",
    code: "up"
  },
  {
    id: "stellenbosch",
    name: "Stellenbosch University",
    abbreviation: "SU",
    fullName: "Stellenbosch University",
    logo: "/university-logos/stellenbosch.png",
    code: "su"
  },
  {
    id: "ukzn",
    name: "University of KwaZulu-Natal",
    abbreviation: "UKZN",
    fullName: "University of KwaZulu-Natal",
    logo: "/university-logos/ukzn.png",
    code: "ukzn"
  },
  {
    id: "uj",
    name: "University of Johannesburg",
    abbreviation: "UJ",
    fullName: "University of Johannesburg",
    logo: "/university-logos/uj.png",
    code: "uj"
  },
  {
    id: "ru",
    name: "Rhodes University",
    abbreviation: "RU",
    fullName: "Rhodes University",
    logo: "/university-logos/rhodes.png",
    code: "ru"
  },
  {
    id: "nwu",
    name: "North-West University",
    abbreviation: "NWU",
    fullName: "North-West University",
    logo: "/university-logos/nwu.png",
    code: "nwu"
  },
  {
    id: "ufs",
    name: "University of the Free State",
    abbreviation: "UFS",
    fullName: "University of the Free State",
    logo: "/university-logos/ufs.png",
    code: "ufs"
  },
    {
    id: "unisa",
    name: "University of South Africa",
    abbreviation: "UNISA",
    fullName: "University of South Africa",
    logo: "/university-logos/unisa.png",
    code: "unisa"
  },
  {
    id: "uwc",
    name: "University of the Western Cape",
    abbreviation: "UWC",
    fullName: "University of the Western Cape",
    logo: "/university-logos/uwc.png",
    code: "uwc"
  },
  {
    id: "univen",
    name: "University of Venda",
    abbreviation: "UNIVEN",
    fullName: "University of Venda",
    logo: "/university-logos/univen.png",
    code: "univen"
  },
  {
    id: "ul",
    name: "University of Limpopo",
    abbreviation: "UL",
    fullName: "University of Limpopo",
    logo: "/university-logos/ul.png",
    code: "ul"
  },
  {
    id: "mut",
    name: "Mangosuthu University of Technology",
    abbreviation: "MUT",
    fullName: "Mangosuthu University of Technology",
    logo: "/university-logos/mut.png",
    code: "mut"
  },
  {
    id: "cput",
    name: "Cape Peninsula University of Technology",
    abbreviation: "CPUT",
    fullName: "Cape Peninsula University of Technology",
    logo: "/university-logos/cput.png",
    code: "cput"
  },
];

export const COMMON_DEGREES: Degree[] = [
  {
    id: "bcom",
    name: "Bachelor of Commerce",
    code: "bcom",
    category: "Business",
    description: "Business and commerce degree",
    subjects: ["Accounting", "Economics", "Business Management"]
  },
  {
    id: "bsc",
    name: "Bachelor of Science", 
    code: "bsc",
    category: "Science",
    description: "Science degree",
    subjects: ["Mathematics", "Physics", "Chemistry"]
  },
  {
    id: "ba",
    name: "Bachelor of Arts",
    code: "ba",
    category: "Humanities",
    description: "Arts degree",
    subjects: ["Literature", "History", "Philosophy"]
  },
  {
    id: "bed",
    name: "Bachelor of Education",
    code: "bed",
    category: "Education",
    description: "Education degree",
    subjects: ["Curriculum Studies", "Educational Psychology", "Teaching Practice"]
  },
  {
    id: "llb",
    name: "Bachelor of Laws",
    code: "llb",
    category: "Law",
    description: "Law degree",
    subjects: ["Constitutional Law", "Criminal Law", "Contract Law"]
  },
  {
    id: "meng",
    name: "Master of Engineering",
    code: "meng",
    category: "Engineering",
    description: "Engineering degree",
    subjects: ["Civil Engineering", "Electrical Engineering", "Mechanical Engineering"]
  },
  {
    id: "msc",
    name: "Master of Science",
    code: "msc",
    category: "Science",
    description: "Science degree",
    subjects: ["Biology", "Chemistry", "Physics"]
  },
  {
    id: "mba",
    name: "Master of Business Administration",
    code: "mba",
    category: "Business",
    description: "Business degree",
    subjects: ["Finance", "Marketing", "Human Resources"]
  },
  {
    id: "phd",
    name: "Doctor of Philosophy",
    code: "phd",
    category: "Academia",
    description: "Doctoral degree",
    subjects: ["Research", "Thesis", "Dissertation"]
  },
];
