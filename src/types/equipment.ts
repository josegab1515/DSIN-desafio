export type EquipmentType =
  | 'radar_velocidade'
  | 'radar_semaforo'
  | 'radar_conversao'
  | 'camera_monitoramento'
  | 'balanca_caminhao'
  | 'veiculo_autonomo_rotativo'
  | 'cancela_automatizada'
  | 'veiculo_transporte'
  | 'totem_rotativo'
  | 'patinete_eletrico'
  | 'moto_transito'
  | 'viatura_gm'
  | 'viatura_pm'
  | 'drone_vigilancia';

export type EquipmentStatus =
  | 'operacional'
  | 'mau_funcionamento'
  | 'em_manutencao'
  | 'ainda_nao_instalado'
  | 'desativado'
  | 'furtado';

export type MaintenanceNeed =
  | 'nenhuma'
  | 'imediata'
  | 'agendada_periodica';

export interface LocationData {
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
  rua: string;
  referencia: string; // Ex: "KM 203", "oposto ao 181", "em frente ao Mercado do Tio"
  lat: number;
  lng: number;
}

export interface EquipmentSpecifics {
  // Câmera
  temVisaoNoturna?: boolean;
  resolucao?: '720p' | '1080p' | '4K';
  tipoCor?: 'colorida' | 'preto_e_branco';
  zoomOtico?: string;
  iaEmbarcadaLpr?: boolean;

  // Radar
  velocidadeMaxima?: number; // km/h
  faixasMonitoradas?: number;
  tipoInfracao?: 'velocidade' | 'avanco_semaforo' | 'conversao_proibida' | 'faixa_exclusiva';

  // Balança
  capacidadeToneladas?: number;
  pesagemEmMovimento?: boolean;

  // Cancela / Totem
  aceitaPixCartao?: boolean;
  nivelPapel?: number; // %
  bateriaSolar?: boolean;

  // Veículos / Patinetes
  nivelBateriaCombustivel?: number; // %
  autonomiaKm?: number;
  odometro?: number;
  placa?: string;
}

export interface TelemetryData {
  ultimaLeitura: string;
  temperaturaChipC: number;
  voltagemV: number;
  sinalRedeDb: number;
  veiculosDetectadosHoje?: number;
  infracoesRegistradasHoje?: number;
}

export interface Equipment {
  id: string;
  tipo: EquipmentType;
  numeroSerie: string;
  marca: string;
  modelo: string;
  localizacao: LocationData;
  situacao: EquipmentStatus;
  necessidadeManutencao: MaintenanceNeed;
  dataProximaManutencao?: string; // YYYY-MM-DD
  descricaoProblema?: string;
  orgaoResponsavel: 'Secretaria de Trânsito' | 'Guarda Municipal' | 'Polícia Militar' | 'Mobilidade Urbana (Parcerias)' | 'Defesa Civil';
  especificas: EquipmentSpecifics;
  telemetria?: TelemetryData;
  criadoEm: string;
  atualizadoEm: string;
}
