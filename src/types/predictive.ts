export type ScenarioType =
  | 'hoje'
  | 'amanha'
  | 'chuva_torrencial'
  | 'fim_de_semana'
  | 'dia_pagamento';

export type WeatherCondition = 'limpo' | 'nublado' | 'chuva_moderada' | 'tempestade';

export interface DistrictRisk {
  bairro: string;
  indiceRiscoAtual: number; // 0 - 100
  nivelRisco: 'baixo' | 'moderado' | 'alto' | 'critico';
  probabilidadeAcidente: number; // %
  probabilidadeCongestionamento: number; // %
  principaisFatores: string[];
  viaturasRecomendadas: number;
  viaturasAtuais: number;
  deficitViaturas: number;
  // Campos avançados de transparência XAI
  fatoresImpacto: {
    fator: string;
    pesoPercentual: number;
    tendencia: 'alta' | 'estavel' | 'queda';
  }[];
}

export interface HourlyRiskPrediction {
  hora: string; // "08:00", "12:00", "18:00", etc.
  indiceRiscoGeral: number;
  bairroMaisCritico: string;
  volumeEsperadoVeiculos: number;
  tempoEsperaCruzamentoSeg: number;
  riscoAcidentesHora: number; // %
}

export interface EquipmentFailurePrediction {
  equipamentoId: string;
  numeroSerie: string;
  tipo: string;
  bairro: string;
  probabilidadeFalha15Dias: number; // %
  diasEstimadosAteFalha: number;
  motivoSuspeito: string;
  urgenciaPreventiva: 'baixa' | 'media' | 'alta' | 'critica';
  mtbfHoras: number;
  horasOperacaoAtual: number;
  saudeEstimadaPercent: number; // 0 - 100%
  temperaturaAtualC: number;
  sinalRedeDb: number;
  custoParadaEstimadoRs: number;
}

export interface EquipmentHealthTrend {
  equipamentoId: string;
  numeroSerie: string;
  tipo: string;
  bairro: string;
  saudeAtual: number; // 100%
  saudeProjetadaSemManutencao: number; // ex: 25%
  saudeProjetadaComManutencao: number; // ex: 98%
  diasRestantesVidaUtil: number;
  curvaDegradacao: number[]; // 7 pontos ao longo das próximas semanas
}

export interface AnomalyDetection {
  id: string;
  tipo: 'velocidade_anormal' | 'queda_fluxo_subita' | 'sinal_iot_degradado' | 'temperatura_alta' | 'geofence_violada';
  equipamentoId: string;
  localizacao: string;
  valorDetectado: string;
  valorEsperado: string;
  desvioPadraoZScore: number;
  descricao: string;
  dataHora: string;
  impactoOperacional: string;
  statusRevisao: 'pendente' | 'em_analise' | 'falso_positivo' | 'confirmada';
}

export interface PredictiveRecommendation {
  id: string;
  titulo: string;
  justificativa: string;
  acaoSugerida: string;
  impactoEsperado: string;
  tipoAcao: 'despacho_viatura' | 'manutencao_preventiva' | 'sincronizacao_semaforica' | 'alerta_populacao';
  prioridade: 'alta' | 'media' | 'critica';
  aplicada: boolean;
  bairroAlvo?: string;
  equipamentoAlvoId?: string;
  agenteAlvoId?: string;
  // Campos obrigatórios do Edital: O que foi previsto, quais dados considerados e tomada de decisão
  xaiDetails: {
    cenarioPrevisto: string;
    dadosConsiderados: string[];
    metodoAlgoritmico: string;
    confiancaModelo: number; // ex: 94.8%
    beneficioDecisao: string;
  };
}

export interface SimulationParams {
  scenario: ScenarioType;
  selectedHour: string;
  weather: WeatherCondition;
  simulatedExtraAgents: Record<string, number>; // Bairro -> Viaturas extras simuladas
}

export interface ModelCardInfo {
  id: string;
  nome: string;
  objetivo: string;
  horizonteTemporal: string;
  featuresUtilizadas: string[];
  algoritmoPrincipal: string;
  precisaoAcuracia: string;
  impactoGestao: string;
}
