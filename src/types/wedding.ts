export interface RSVPData {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  whatsapp_url?: string;
  presenca: 'confirmado' | 'recusado';
  acompanhantes: number;
  nomes_acompanhantes?: string;
  restricoes_alimentares?: string;
  mensagem?: string;
  created_at?: string;
}

export interface WeddingInfo {
  noiva: string;
  noivo: string;
  data: string; // ISO or formatted
  horario: string;
  local: string;
  endereco: string;
  cidade: string;
  cep: string;
  mapsUrl: string;
  wazeUrl: string;
  telefoneContato: string;
  whatsappMensagemPadrao: string;
  pixChave: string;
  pixNome: string;
}

export const WEDDING_DETAILS: WeddingInfo = {
  noiva: "Scheila Rodrigues Dihl",
  noivo: "Gerson Martins",
  data: "2026-10-17T13:00:00-03:00",
  horario: "13:00",
  local: "Restaurante Coco Bambu - Tatuapé",
  endereco: "Rua Azevedo Soares, 2150 - Tatuapé",
  cidade: "São Paulo - SP",
  cep: "03322-002",
  mapsUrl: "https://maps.google.com/?q=Coco+Bambu+Conceito+Tatuap%C3%A9+Rua+Azevedo+Soares+2150",
  wazeUrl: "https://waze.com/ul?q=Coco+Bambu+Tatuape+Azevedo+Soares",
  telefoneContato: "5511999999999",
  whatsappMensagemPadrao: "Olá Scheila e Gerson! Gostaria de falar sobre o casamento de vocês no dia 17/10/2026.",
  pixChave: "casamento.scheilaegerson@exemplo.com.br",
  pixNome: "Scheila R. Dihl & Gerson Martins",
};
