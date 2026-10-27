import React, { useState } from 'react';
import { PredictiveRecommendation } from '../../types/predictive';
import { PixelBadge } from '../common/PixelBadge';
import { PixelButton } from '../common/PixelButton';
import { PixelIcon } from '../common/PixelIcon';
import { soundService } from '../../services/soundService';
import { Sparkles, Check, ArrowRight, ShieldAlert, Cpu, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface RecommendationPanelProps {
  recommendations: PredictiveRecommendation[];
  onApplyRecommendation: (id: string) => void;
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  recommendations,
  onApplyRecommendation
}) => {
  const [expandedXaiId, setExpandedXaiId] = useState<string | null>(null);

  const handleApply = (id: string) => {
    soundService.playPowerUp();
    onApplyRecommendation(id);
  };

  const toggleXai = (id: string) => {
    soundService.playClick();
    setExpandedXaiId(expandedXaiId === id ? null : id);
  };

  return (
    <div className="pixel-box bg-slate-900/90 border-slate-800 p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-1 bg-amber-500/20 border border-amber-500 rounded">
            <PixelIcon type="prometheus_logo" size={24} />
          </div>
          <div>
            <h3 className="font-pixel text-xs text-amber-400">
              PROMETHEUS DECISION CORE // RECOMENDAÇÕES PREDITIVAS & PRESCRITIVAS
            </h3>
            <p className="text-[11px] text-slate-400 font-hud">
              Decisões prescritivas auditáveis com transparência total de dados e impacto operacional
            </p>
          </div>
        </div>

        <span className="font-pixel text-[9px] text-emerald-400 bg-emerald-950/60 px-2 py-1 border border-emerald-500 rounded">
          MOTOR PRESCRITIVO ATIVO
        </span>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-3">
        {recommendations.map((rec) => {
          const isXaiExpanded = expandedXaiId === rec.id;

          return (
            <div
              key={rec.id}
              className={`p-3.5 border transition-all rounded ${
                rec.aplicada
                  ? 'bg-slate-950/40 border-slate-800 opacity-75'
                  : 'bg-slate-950 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-pixel text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.5 font-bold uppercase rounded">
                    {rec.prioridade}
                  </span>
                  <h4 className="font-bold text-sm text-slate-100">{rec.titulo}</h4>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <button
                    onClick={() => toggleXai(rec.id)}
                    className="text-[10px] text-purple-300 hover:text-white font-mono flex items-center gap-1 bg-purple-950/60 px-2 py-1 border border-purple-700/60 rounded"
                    title="Ver transparência de dados do modelo"
                  >
                    <HelpCircle size={11} />
                    <span>DADOS DO MODELO</span>
                    {isXaiExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>

                  {rec.aplicada ? (
                    <span className="font-pixel text-[9px] text-emerald-400 flex items-center gap-1 bg-emerald-950 px-2 py-1 border border-emerald-600 rounded">
                      <Check size={12} /> APLICADA PELO GESTOR
                    </span>
                  ) : (
                    <PixelButton
                      variant="warning"
                      className="text-[9px] py-1 px-3 whitespace-nowrap active:scale-95"
                      onClick={() => handleApply(rec.id)}
                    >
                      <Sparkles size={12} />
                      <span>EXECUTAR AÇÃO</span>
                    </PixelButton>
                  )}
                </div>
              </div>

              {/* Triade mandatória do desafio:
                  1. O que está sendo previsto (Cenário)
                  2. Ação operacional sugerida
                  3. Impacto na tomada de decisão */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mt-3 pt-2.5 border-t border-slate-800/80 text-xs">
                <div className="bg-slate-900/60 p-2.5 border border-slate-800 rounded">
                  <span className="font-pixel text-[9px] text-sky-400 block mb-1">
                    1. CENÁRIO PREVISTO (TARGET)
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{rec.justificativa}</p>
                </div>

                <div className="bg-slate-900/60 p-2.5 border border-slate-800 rounded">
                  <span className="font-pixel text-[9px] text-amber-400 block mb-1">
                    2. AÇÃO PRESCRITIVA RECOMENDADA
                  </span>
                  <p className="text-slate-200 text-[11px] leading-relaxed font-semibold">
                    {rec.acaoSugerida}
                  </p>
                </div>

                <div className="bg-slate-900/60 p-2.5 border border-slate-800 rounded">
                  <span className="font-pixel text-[9px] text-emerald-400 block mb-1">
                    3. IMPACTO ESPERADO NA TOMADA DE DECISÃO
                  </span>
                  <p className="text-emerald-300 text-[11px] leading-relaxed">
                    {rec.impactoEsperado}
                  </p>
                </div>
              </div>

              {/* Bloco Expansível XAI (Explainable AI) */}
              {isXaiExpanded && rec.xaiDetails && (
                <div className="mt-3 p-3 bg-purple-950/20 border border-purple-500/50 rounded space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-purple-500/30 pb-1">
                    <span className="font-pixel text-[10px] text-purple-300 flex items-center gap-1.5">
                      <Cpu size={12} />
                      <span>TRANSPARÊNCIA ALGORÍTMICA // MOTOR PROMETHEUS</span>
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">
                      Grau de Confiança: {rec.xaiDetails.confiancaModelo}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <strong className="text-slate-400 block mb-0.5">Quais dados foram considerados:</strong>
                      <ul className="space-y-0.5 text-slate-300">
                        {rec.xaiDetails.dadosConsiderados.map((d, di) => (
                          <li key={di} className="flex items-center gap-1">
                            <span className="text-purple-400">•</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong className="text-slate-400 block mb-0.5">Método / Algoritmo Estatístico:</strong>
                      <p className="font-mono text-purple-200 mb-1">{rec.xaiDetails.metodoAlgoritmico}</p>
                      <strong className="text-slate-400 block mb-0.5">Benefício Direto para o Município:</strong>
                      <p className="text-emerald-300">{rec.xaiDetails.beneficioDecisao}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
