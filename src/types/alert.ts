export type AlertSeverity = 'critico' | 'alerta' | 'informativo';

export type AlertCategory =
  | 'falha_equipamento'
  | 'furto_vandalismo'
  | 'acidente_transito'
  | 'congestionamento_anormal'
  | 'infracao_grave'
  | 'manutencao_urgente'
  | 'alerta_preditivo';

export interface IncidentAlert {
  id: string;
  categoria: AlertCategory;
  severidade: AlertSeverity;
  titulo: string;
  descricao: string;
  bairro: string;
  lat?: number;
  lng?: number;
  equipamentoId?: string;
  agenteId?: string;
  timestamp: string;
  resolvido: boolean;
  resolvidoPor?: string;
  resolvidoEm?: string;
}
