import React from 'react';
import { PredictiveRecommendation } from '../../types/predictive';
import { PixelBadge } from '../common/PixelBadge';
import { PixelButton } from '../common/PixelButton';
import { PixelIcon } from '../common/PixelIcon';
import { soundService } from '../../services/soundService';
import { Sparkles, Check, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

interface RecommendationPanelProps {
  recommendations: PredictiveRecommendation[];
  onApplyRecommendation: (id: string) => void;
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  recommendations,
  onApplyRecommendation
}) => {
  const handleApply = (id: string) => {
    soundService.playPowerUp();
    onApplyRecommendation(id);
  };

  return (
    <div className="pixel-box bg-slate-900/90 border-slate-800 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1 bg-amber-500/20 border border-amber-500">
            <PixelIcon type="prometheus_logo" size={24} />
          </div>
          <div>
            <h3 className="font-pixel text-xs text-amber-400">
              PROMETHEUS DECISION CORE // RECOMENDAÇÕES PREDITIVAS
            </h3>
            <p className="text-[11px] text-slate-400 font-hud">
              Decisões prescritivas geradas para antecipar ocorrências críticas antes que se agravem
            </p>
          </div>
        </div>
        <span className="font-pixel text-[9px] text-emerald-400 bg-emerald-950/60 px-2 py-1 border border-emerald-500">
          IA ATIVA E OPERANTE
        </span>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className={`p-3.5 border transition-all ${
              rec.aplicada
                ? 'bg-slate-950/40 border-slate-800 opacity-70'
                : 'bg-slate-950 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.5 font-bold uppercase">
                  {rec.prioridade}
                </span>
                <h4 className="font-bold text-sm text-slate-100">{rec.titulo}</h4>
              </div>

              {rec.aplicada ? (
                <span className="font-pixel text-[9px] text-emerald-400 flex items-center gap-1 bg-emerald-950 px-2 py-1 border border-emerald-600">
                  <Check size={12} /> APLICADA PELO GESTOR
                </span>
              ) : (
                <PixelButton
                  variant="warning"
                  className="text-[9px] py-1 px-3 whitespace-nowrap"
                  onClick={() => handleApply(rec.id)}
                >
                  <Sparkles size={12} />
                  <span>EXECUTAR AÇÃO SUGERIDA</span>
                </PixelButton>
              )}
            </div>

            {/* Triad of Clarification required by the challenge:
                1. O que foi previsto / Justificativa
                2. Ação operacional sugerida
                3. Impacto esperado na tomada de decisão */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mt-3 pt-2.5 border-t border-slate-800/80 text-xs">
              <div className="bg-slate-900/60 p-2.5 border border-slate-800">
                <span className="font-pixel text-[9px] text-sky-400 block mb-1">
                  1. CENÁRIO PREVISTO
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{rec.justificativa}</p>
              </div>

              <div className="bg-slate-900/60 p-2.5 border border-slate-800">
                <span className="font-pixel text-[9px] text-amber-400 block mb-1">
                  2. AÇÃO PRESCRITIVA
                </span>
                <p className="text-slate-200 text-[11px] leading-relaxed font-semibold">
                  {rec.acaoSugerida}
                </p>
              </div>

              <div className="bg-slate-900/60 p-2.5 border border-slate-800">
                <span className="font-pixel text-[9px] text-emerald-400 block mb-1">
                  3. IMPACTO ESPERADO
                </span>
                <p className="text-emerald-300 text-[11px] leading-relaxed">
                  {rec.impactoEsperado}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
