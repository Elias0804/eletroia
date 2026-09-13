export type Lead = {
  id: string;
  client: string;
  city: string;
  device: string;
  issue: string;
  priority: "Alta" | "Média" | "Baixa";
  value: number;
  status: "Novo" | "Em diagnóstico" | "Agendado" | "Concluído";
};

export type AgendaItem = {
  id: string;
  title: string;
  time: string;
  client: string;
  address: string;
  type: "Visita" | "Chamada" | "Revisão";
};

export const TECHNICAL_LEADS: Lead[] = [
  {
    id: "LD-1042",
    client: "Renata Almeida",
    city: "São Paulo - SP",
    device: "Geladeira inverter",
    issue: "Não resfria e faz ruído forte",
    priority: "Alta",
    value: 420,
    status: "Novo",
  },
  {
    id: "LD-1047",
    client: "Pedro Rocha",
    city: "Rio de Janeiro - RJ",
    device: "Máquina de lavar",
    issue: "Não centrifuga e está vazando água",
    priority: "Média",
    value: 310,
    status: "Agendado",
  },
  {
    id: "LD-1051",
    client: "Marta Nunes",
    city: "Belo Horizonte - MG",
    device: "Ar-condicionado",
    issue: "Falta refrigeração e filtro com odor",
    priority: "Alta",
    value: 520,
    status: "Em diagnóstico",
  },
  {
    id: "LD-1060",
    client: "Tiago Sampaio",
    city: "Curitiba - PR",
    device: "Micro-ondas",
    issue: "Liga mas não aquece a comida",
    priority: "Baixa",
    value: 180,
    status: "Concluído",
  },
];

export const AGENDA: AgendaItem[] = [
  {
    id: "AG-1",
    title: "Manutenção de geladeira",
    time: "Hoje • 09:30",
    client: "Renata Almeida",
    address: "Vila Mariana, São Paulo",
    type: "Visita",
  },
  {
    id: "AG-2",
    title: "Diagnóstico de máquina de lavar",
    time: "Hoje • 14:00",
    client: "Pedro Rocha",
    address: "Copacabana, Rio",
    type: "Chamada",
  },
  {
    id: "AG-3",
    title: "Revisão de ar-condicionado",
    time: "Amanhã • 11:15",
    client: "Marta Nunes",
    address: "Savassi, Belo Horizonte",
    type: "Visita",
  },
];
