export type AgentCorporation =
  | 'Agente de Trânsito'
  | 'Guarda Municipal'
  | 'Polícia Militar';

export type AgentStatus =
  | 'em_patrulha'
  | 'em_atendimento'
  | 'disponivel'
  | 'folga';

export interface Agent {
  id: string;
  matricula: string;
  nome: string;
  corporacao: AgentCorporation;
  cargo: string;
  status: AgentStatus;
  equipeViatura?: string; // ex: "Viatura GM-04", "Moto Trânsito 12"
  equipamentoVinculadoId?: string;
  telefoneRadio: string;
  localizacaoAtual: {
    lat: number;
    lng: number;
    bairro: string;
    ultimaAtualizacao: string;
  };
  criadoEm: string;
}
