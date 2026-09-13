export type Technician = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  specialty: string;
  specialties: string[];
  equipments: string[];
  yearsExperience: number;
  availability: string;
  bio: string;
  rating: number;
};

export type EquipmentCategory = {
  id: string;
  emoji: string;
  name: string;
  description: string;
};

export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  { id: "geladeira", emoji: "🧊", name: "Geladeira", description: "Refrigeração e conservação" },
  { id: "freezer", emoji: "🥶", name: "Freezer", description: "Congelamento e temperatura" },
  { id: "lavadora", emoji: "🧼", name: "Máquina de lavar", description: "Lavanderia e drenagem" },
  { id: "lava-seca", emoji: "🧺", name: "Lava e seca", description: "Lavar e secar roupas" },
  { id: "ar-condicionado", emoji: "❄️", name: "Ar-condicionado", description: "Climatização e refrigeração" },
  { id: "lava-loucas", emoji: "🍽️", name: "Lava-louças", description: "Cozinha e higienização" },
  { id: "fogao", emoji: "🔥", name: "Fogão", description: "Cozimento e gás" },
  { id: "micro-ondas", emoji: "📡", name: "Micro-ondas", description: "Aquecimento e eletrônica" },
  { id: "tv", emoji: "📺", name: "Televisão", description: "Imagem e painel" },
  { id: "notebook", emoji: "💻", name: "Notebook", description: "Hardware e manutenção" },
  { id: "celular", emoji: "📱", name: "Celular", description: "Eletrônica e reparo" },
  { id: "boiler", emoji: "🚿", name: "Boiler", description: "Aquecimento e água" },
];

export const SPECIALTIES = [
  "Refrigeração",
  "Eletrônica",
  "Elétrica residencial",
  "Climatização",
  "Lavanderia",
  "Cozinha",
  "Informática",
  "Smart Home",
  "Celulares",
  "Hidráulica",
  "Manutenção industrial",
  "Assistência premium",
];

export const DEFAULT_TECHNICIANS: Technician[] = [
  {
    id: "t-1",
    name: "Marcos Silva",
    email: "marcos@eletroia.com",
    phone: "(11) 99999-1111",
    city: "São Paulo",
    state: "SP",
    specialty: "Refrigeração",
    specialties: ["Refrigeração", "Elétrica residencial"],
    equipments: ["Geladeira", "Freezer", "Ar-condicionado"],
    yearsExperience: 9,
    availability: "Disponível para emergências",
    bio: "Especialista em refrigeração e manutenção de geladeiras e freezers domésticos.",
    rating: 4.9,
  },
  {
    id: "t-2",
    name: "Larissa Costa",
    email: "larissa@eletroia.com",
    phone: "(21) 98888-2222",
    city: "Rio de Janeiro",
    state: "RJ",
    specialty: "Lavanderia",
    specialties: ["Lavanderia", "Eletrônica"],
    equipments: ["Máquina de lavar", "Lava e seca", "Secadora"],
    yearsExperience: 7,
    availability: "Atende em domicílio e oficina",
    bio: "Técnica focada em máquinas de lavar, drenos e eletrônica de lavanderia.",
    rating: 4.8,
  },
  {
    id: "t-3",
    name: "Eduardo Ramos",
    email: "eduardo@eletroia.com",
    phone: "(31) 97777-3333",
    city: "Belo Horizonte",
    state: "MG",
    specialty: "Climatização",
    specialties: ["Climatização", "Hidráulica"],
    equipments: ["Ar-condicionado", "Boiler", "Purificador"],
    yearsExperience: 11,
    availability: "Disponibilidade de 8h às 18h",
    bio: "Especialista em climatização, manutenção preventiva e correção de vazamentos.",
    rating: 5.0,
  },
];

export const STORAGE_KEY = "eletroia-technicians";

export function loadTechnicians(): Technician[] {
  if (typeof window === "undefined") {
    return DEFAULT_TECHNICIANS;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_TECHNICIANS;
    }

    const parsed = JSON.parse(raw) as Technician[];
    return parsed.length ? parsed : DEFAULT_TECHNICIANS;
  } catch {
    return DEFAULT_TECHNICIANS;
  }
}

export function saveTechnicians(technicians: Technician[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(technicians));
}
