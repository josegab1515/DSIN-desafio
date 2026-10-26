import React, { useState } from 'react';
import {
  DistrictRisk,
  HourlyRiskPrediction,
  EquipmentFailurePrediction,
  AnomalyDetection,
  PredictiveRecommendation
} from '../../types/predictive';
import { RiskHeatmapView } from './RiskHeatmapView';
import { MaintenancePredictor } from './MaintenancePredictor';
import { AnomalyDetector } from './AnomalyDetector';
import { RecommendationPanel } from './RecommendationPanel';
import { Cpu, TrendingUp, Wrench, Zap, Sparkles } from 'lucide-react';

interface PredictiveDashboardProps {
  districtRisks: DistrictRisk[];
  hourlyPredictions: HourlyRiskPrediction[];
  failurePredictions: EquipmentFailurePrediction[];
  anomalies: AnomalyDetection[];
  recommendations: PredictiveRecommendation[];
  onApplyRecommendation: (id: string) => void;
  onOpenOrder: (equipId: string) => void;
  onSelectDistrict?: (district: string) => void;
}

export const PredictiveDashboard: React.FC<PredictiveDashboardProps> = ({
  districtRisks,
  hourlyPredictions,
  failurePredictions,
  anomalies,
  recommendations,
  onApplyRecommendation,
  onOpenOrder,
  onSelectDistrict
}) => {
  const [activeTab, setActiveTab] = useState<'todos' | 'risco' | 'manutencao' | 'anomalias' | 'recomendacoes'>('todos');

  return (
    <div className="space-y-4">
      {/* Subnav Pills */}
      <div className="pixel-box bg-slate-900/90 p-2.5 flex items-center justify-between flex-wrap gap-2">
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
                ? 'bg-purple-950 border-purple-400 text-purple-200'
                : 'bg-slate-950 border-slate-700 text-slate-400'
            }`}
          >
            VISÃO INTEGRADA (TODOS)
          </button>
          <button
            onClick={() => setActiveTab('risco')}
            className={`px-2.5 py-1 font-pixel text-[10px] border transition-all ${
              activeTab === 'risco'
                ? 'bg-purple-950 border-purple-400 text-purple-200'
                : 'bg-slate-950 border-slate-700 text-slate-400'
            }`}
          >
            RISCO 24H & BAIRROS
          </button>
          <button
            onClick={() => setActiveTab('manutencao')}
            className={`px-2.5 py-1 font-pixel text-[10px] border transition-all ${
              activeTab === 'manutencao'
                ? 'bg-purple-950 border-purple-400 text-purple-200'
                : 'bg-slate-950 border-slate-700 text-slate-400'
            }`}
          >
            FALHAS MTBF ({failurePredictions.filter((f) => f.probabilidadeFalha15Dias >= 60).length})
          </button>
          <button
            onClick={() => setActiveTab('anomalias')}
            className={`px-2.5 py-1 font-pixel text-[10px] border transition-all ${
              activeTab === 'anomalias'
                ? 'bg-purple-950 border-purple-400 text-purple-200'
                : 'bg-slate-950 border-slate-700 text-slate-400'
            }`}
          >
            ANOMALIAS ({anomalies.length})
          </button>
          <button
            onClick={() => setActiveTab('recomendacoes')}
            className={`px-2.5 py-1 font-pixel text-[10px] border transition-all ${
              activeTab === 'recomendacoes'
                ? 'bg-purple-950 border-purple-400 text-purple-200'
                : 'bg-slate-950 border-slate-700 text-slate-400'
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
          districtRisks={districtRisks}
          hourlyPredictions={hourlyPredictions}
          onSelectDistrict={onSelectDistrict}
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
    </div>
  );
};
