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
}

export interface HourlyRiskPrediction {
  hora: string; // "08:00", "12:00", "18:00", etc.
  indiceRiscoGeral: number;
  bairroMaisCritico: string;
  volumeEsperadoVeiculos: number;
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
}

export interface AnomalyDetection {
  id: string;
  tipo: 'velocidade_anormal' | 'queda_fluxo_subita' | 'sinal_iot_degradado' | 'temperatura_alta';
  equipamentoId: string;
  localizacao: string;
  valorDetectado: string;
  valorEsperado: string;
  desvioPadraoZScore: number;
  descricao: string;
  dataHora: string;
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
}
