import React from 'react';
import { ModelCardInfo } from '../../types/predictive';
import { PredictiveEngine } from '../../services/predictiveEngine';
import { X, ShieldCheck, Cpu, Database, Award, ArrowRight, Activity } from 'lucide-react';

interface ModelCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelCardsModal: React.FC<ModelCardsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const cards = PredictiveEngine.getModelCards();

  return (
    <div className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#0b0e17] border-2 border-purple-500/80 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-none shadow-[0_0_40px_rgba(168,85,247,0.3)] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-purple-500/40 bg-slate-950 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-purple-950 border border-purple-500 text-purple-400">
              <Cpu size={20} />
            </div>
            <div>
              <h2 className="font-pixel text-xs sm:text-sm text-purple-300">
                PROMETHEUS XAI // TRANSPARÊNCIA DOS MODELOS PREDITIVOS
              </h2>
              <p className="text-[11px] text-slate-400 font-hud">
                Fichas técnicas explicativas conforme exigência do DSIN CoderChallenge 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-700 hover:border-slate-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-xs text-slate-300">
          {/* Banner Metodológico */}
          <div className="p-3.5 bg-purple-950/30 border border-purple-500/50 flex items-start gap-3">
            <Award className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-pixel text-xs text-purple-300 mb-1">
                COMPROMISSO COM A INTELIGÊNCIA EXPLICÁVEL (EXPLAINABLE AI)
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Nenhum modelo do PROTOCOLO PROMETHEUS opera como "caixa preta". Cada previsão tem suas
                variáveis de entrada (features), algoritmos estatísticos aplicados e o impacto prático
                na tomada de decisão documentados de forma auditável e transparente para gestores e banca avaliadora.
              </p>
            </div>
          </div>

          {/* Cards dos 4 Modelos */}
          <div className="space-y-4">
            {cards.map((card, idx) => (
              <div
                key={card.id}
                className="p-4 bg-slate-950/90 border border-slate-800 hover:border-purple-500/60 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-[10px] bg-purple-900/80 text-purple-200 px-2 py-0.5 border border-purple-600">
                      MODELO #{idx + 1} • {card.id}
                    </span>
                    <h3 className="font-bold text-sm text-slate-100">{card.nome}</h3>
                  </div>

                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 border border-emerald-600">
                    Acurácia: {card.precisaoAcuracia}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  {/* O que é previsto */}
                  <div className="space-y-1 bg-slate-900/40 p-2.5 border border-slate-800">
                    <span className="font-pixel text-[9px] text-sky-400 block">
                      1. O QUE ESTÁ SENDO PREVISTO (TARGET)
                    </span>
                    <p className="text-[11px] text-slate-200 leading-relaxed font-semibold">
                      {card.objetivo}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono block pt-1">
                      Horizonte Temporal: <strong className="text-slate-300">{card.horizonteTemporal}</strong>
                    </span>
                  </div>

                  {/* Algoritmo Aplicado */}
                  <div className="space-y-1 bg-slate-900/40 p-2.5 border border-slate-800">
                    <span className="font-pixel text-[9px] text-amber-400 block">
                      2. ALGORITMO & METODOLOGIA CIENTÍFICA
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                      {card.algoritmoPrincipal}
                    </p>
                  </div>
                </div>

                {/* Features Consideradas */}
                <div className="bg-slate-900/40 p-2.5 border border-slate-800">
                  <span className="font-pixel text-[9px] text-purple-400 block mb-1">
                    3. QUAIS INFORMAÇÕES E DADOS FORAM CONSIDERADOS (FEATURES)
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-300">
                    {card.featuresUtilizadas.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-1.5">
                        <span className="text-purple-400">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Como Ajuda na Tomada de Decisão */}
                <div className="p-2.5 bg-emerald-950/20 border border-emerald-600/40">
                  <span className="font-pixel text-[9px] text-emerald-400 block mb-0.5">
                    4. COMO ESSA PREVISÃO AJUDA NA TOMADA DE DECISÃO DOS GESTORES
                  </span>
                  <p className="text-[11px] text-emerald-300 leading-relaxed">
                    {card.impactoGestao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-purple-700 hover:bg-purple-600 text-white font-pixel text-xs transition-colors"
          >
            FECHAR FICHA TÉCNICA
          </button>
        </div>
      </div>
    </div>
  );
};
