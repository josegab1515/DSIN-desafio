import React, { useState, useMemo } from 'react';
import {
  DistrictRisk,
  HourlyRiskPrediction,
  EquipmentFailurePrediction,
  AnomalyDetection,
  PredictiveRecommendation,
  SimulationParams
} from '../../types/predictive';
import { Equipment } from '../../types/equipment';
import { Agent } from '../../types/agent';
import { IncidentAlert } from '../../types/alert';
import { PredictiveEngine } from '../../services/predictiveEngine';
import { ScenarioSimulator } from './ScenarioSimulator';
import { ModelCardsModal } from './ModelCardsModal';
import { PredictiveReportModal } from './PredictiveReportModal';
import { RiskHeatmapView } from './RiskHeatmapView';
import { MaintenancePredictor } from './MaintenancePredictor';
import { AnomalyDetector } from './AnomalyDetector';
import { RecommendationPanel } from './RecommendationPanel';
import { Cpu, TrendingUp, Wrench, Zap, Sparkles, FileText, HelpCircle, Layers } from 'lucide-react';

interface PredictiveDashboardProps {
  districtRisks: DistrictRisk[];
  hourlyPredictions: HourlyRiskPrediction[];
  failurePredictions: EquipmentFailurePrediction[];
  anomalies: AnomalyDetection[];
  recommendations: PredictiveRecommendation[];
  onApplyRecommendation: (id: string) => void;
  onOpenOrder: (equipId: string) => void;
  onSelectDistrict?: (district: string) => void;
  equipments?: Equipment[];
  agents?: Agent[];
  alerts?: IncidentAlert[];
}

export const PredictiveDashboard: React.FC<PredictiveDashboardProps> = ({
  districtRisks,
  hourlyPredictions,
  failurePredictions,
  anomalies,
  recommendations,
  onApplyRecommendation,
  onOpenOrder,
  onSelectDistrict,
  equipments,
  agents,
  alerts
}) => {
  const [activeTab, setActiveTab] = useState<'todos' | 'risco' | 'manutencao' | 'anomalias' | 'recomendacoes'>('todos');

  // Parâmetros do Simulador "What-If" (O que acontece amanhã?)
  const [simParams, setSimParams] = useState<SimulationParams>({
    scenario: 'hoje',
    selectedHour: '17:30',
    weather: 'limpo',
    simulatedExtraAgents: {}
  });

  const [isModelCardsOpen, setIsModelCardsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Recalcula riscos e previsões quando os parâmetros da simulação mudam
  const currentDistrictRisks = useMemo(() => {
    if (equipments && alerts && agents) {
      return PredictiveEngine.calculateDistrictRisks(equipments, alerts, agents, simParams);
    }
    return districtRisks;
  }, [equipments, alerts, agents, simParams, districtRisks]);

  const currentHourlyPredictions = useMemo(() => {
    return PredictiveEngine.predictHourlyRiskCurve(simParams.scenario, simParams.weather);
  }, [simParams.scenario, simParams.weather]);

  const handleSimulateReinforcement = (bairro: string) => {
    const current = simParams.simulatedExtraAgents[bairro] || 0;
    setSimParams({
      ...simParams,
      simulatedExtraAgents: {
        ...simParams.simulatedExtraAgents,
        [bairro]: current + 1
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Interactive What-If Scenario Simulator: O QUE PODE ACONTECER AMANHÃ? */}
      <ScenarioSimulator
        simParams={simParams}
        onChangeParams={setSimParams}
        onOpenModelCards={() => setIsModelCardsOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        totalAgentsAvailable={agents ? agents.length : 10}
      />

      {/* Subnav Pills */}
      <div className="pixel-box bg-slate-900/90 p-2.5 flex items-center justify-between flex-wrap gap-2 border-slate-800">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-purple-400" />
          <span className="font-pixel text-xs text-purple-400">
            CIDADE PREDITIVA // PROTOCOLO PROMETHEUS
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <button
            onClick={() => setActiveTab('todos')}
            className={`px-2.5 py-1 font-pixel text-[10px] border transition-all ${
              activeTab === 'todos'
                ? 'bg-purple-950 border-purple-400 text-purple-200 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            VISÃO INTEGRADA (TODOS)
          </button>
          <button
            onClick={() => setActiveTab('risco')}
            className={`px-2.5 py-1 font-pixel text-[10px] border transition-all ${
              activeTab === 'risco'
                ? 'bg-purple-950 border-purple-400 text-purple-200 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            RISCO 24H & BAIRROS
          </button>
          <button
            onClick={() => setActiveTab('manutencao')}
            className={`px-2.5 py-1 font-pixel text-[10px] border transition-all ${
              activeTab === 'manutencao'
                ? 'bg-purple-950 border-purple-400 text-purple-200 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            FALHAS & MTBF ({failurePredictions.filter((f) => f.probabilidadeFalha15Dias >= 60).length})
          </button>
          <button
            onClick={() => setActiveTab('anomalias')}
            className={`px-2.5 py-1 font-pixel text-[10px] border transition-all ${
              activeTab === 'anomalias'
                ? 'bg-purple-950 border-purple-400 text-purple-200 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            ANOMALIAS ({anomalies.length})
          </button>
          <button
            onClick={() => setActiveTab('recomendacoes')}
            className={`px-2.5 py-1 font-pixel text-[10px] border transition-all ${
              activeTab === 'recomendacoes'
                ? 'bg-purple-950 border-purple-400 text-purple-200 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            DECISÕES IA ({recommendations.filter((r) => !r.aplicada).length})
          </button>
        </div>
      </div>

      {/* Recommendations Banner always prominent */}
      {(activeTab === 'todos' || activeTab === 'recomendacoes') && (
        <RecommendationPanel
          recommendations={recommendations}
          onApplyRecommendation={onApplyRecommendation}
        />
      )}

      {/* Risk and 24h Timeline */}
      {(activeTab === 'todos' || activeTab === 'risco') && (
        <RiskHeatmapView
          districtRisks={currentDistrictRisks}
          hourlyPredictions={currentHourlyPredictions}
          onSelectDistrict={onSelectDistrict}
          onSimulateVtrReinforcement={handleSimulateReinforcement}
        />
      )}

      {/* Grid: MTBF and Anomalies */}
      {(activeTab === 'todos' || activeTab === 'manutencao') && (
        <MaintenancePredictor
          predictions={failurePredictions}
          onOpenOrder={onOpenOrder}
        />
      )}

      {(activeTab === 'todos' || activeTab === 'anomalias') && (
        <AnomalyDetector anomalies={anomalies} />
      )}

      {/* Modal de Fichas Técnicas dos Modelos de IA (XAI) */}
      <ModelCardsModal
        isOpen={isModelCardsOpen}
        onClose={() => setIsModelCardsOpen(false)}
      />

      {/* Modal de Boletim Executivo Preditivo */}
      <PredictiveReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        districtRisks={currentDistrictRisks}
        hourlyPredictions={currentHourlyPredictions}
        failurePredictions={failurePredictions}
        recommendations={recommendations}
        simParams={simParams}
      />
    </div>
  );
};
