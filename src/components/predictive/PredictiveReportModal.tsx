import React from 'react';
import {
  DistrictRisk,
  HourlyRiskPrediction,
  EquipmentFailurePrediction,
  PredictiveRecommendation,
  SimulationParams
} from '../../types/predictive';
import { X, Printer, Download, FileText, CheckCircle2, AlertOctagon, TrendingUp, ShieldAlert } from 'lucide-react';

interface PredictiveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  districtRisks: DistrictRisk[];
  hourlyPredictions: HourlyRiskPrediction[];
  failurePredictions: EquipmentFailurePrediction[];
  recommendations: PredictiveRecommendation[];
  simParams: SimulationParams;
}

export const PredictiveReportModal: React.FC<PredictiveReportModalProps> = ({
  isOpen,
  onClose,
  districtRisks,
  hourlyPredictions,
  failurePredictions,
  recommendations,
  simParams
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const criticalFailures = failurePredictions.filter((f) => f.probabilidadeFalha15Dias >= 60);
  const topRisk = districtRisks[0];

  return (
    <div className="fixed inset-0 z-[3000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#0b0e17] border-2 border-sky-500/80 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-none shadow-[0_0_40px_rgba(56,189,248,0.3)] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-sky-500/40 bg-slate-950 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-sky-950 border border-sky-500 text-sky-400">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="font-pixel text-xs sm:text-sm text-sky-300">
                BOLETIM EXECUTIVO PREDITIVO // CICC MARÍLIA/SP
              </h2>
              <p className="text-[11px] text-slate-400 font-hud">
                Relatório de inteligência antecipatória para o Gabinete de Mobilidade e Segurança
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-pixel text-[10px] flex items-center gap-1.5"
            >
              <Printer size={12} />
              <span>IMPRIMIR / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-700"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-6 space-y-6 text-xs text-slate-200 font-sans print:text-black print:bg-white">
          {/* Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-950 border border-slate-800 text-[11px] font-mono">
            <div>
              <span className="text-slate-500 block text-[9px]">DATA DA PROJEÇÃO:</span>
              <strong className="text-sky-300">
                {simParams.scenario === 'amanha'
                  ? 'Amanhã (27/10/2026)'
                  : simParams.scenario === 'fim_de_semana'
                  ? 'Próximo Sábado (Fim de Semana)'
                  : 'Hoje (26/10/2026)'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px]">CONDIÇÃO CLIMÁTICA:</span>
              <strong className="text-amber-400 uppercase">{simParams.weather}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px]">HORÁRIO DE PICO CRÍTICO:</span>
              <strong className="text-red-400">17:30 - 19:00</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px]">ÍNDICE DE RISCO MÁXIMO:</span>
              <strong className="text-red-400">{topRisk ? `${topRisk.indiceRiscoAtual}% (${topRisk.bairro})` : 'N/A'}</strong>
            </div>
          </div>

          {/* Seção 1: Resumo Executivo */}
          <div className="space-y-2">
            <h3 className="font-pixel text-xs text-sky-400 border-b border-slate-800 pb-1">
              1. RESUMO EXECUTIVO // ANÁLISE ANTECIPATÓRIA
            </h3>
            <p className="text-[12px] text-slate-300 leading-relaxed">
              O sistema PROMETHEUS identificou que o corredor central de Marília (Av. Sampaio Vidal e Av. Tiradentes)
              apresenta probabilidade de retenção de <strong>{topRisk?.probabilidadeCongestionamento || 88}%</strong>{' '}
              durante a janela vespertina. O acoplamento entre dados de laços indutivos semafóricos e previsões
              de pluviosidade indica necessidade de intervenção prévia para evitar paradas em cascata.
            </p>
          </div>

          {/* Seção 2: Matriz de Vulnerabilidade por Região */}
          <div className="space-y-2">
            <h3 className="font-pixel text-xs text-amber-400 border-b border-slate-800 pb-1">
              2. RANKING DE VULNERABILIDADE & DÉFICIT DE EQUIPES
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-800 text-[11px]">
                <thead>
                  <tr className="bg-slate-900 text-slate-400 font-pixel text-[9px]">
                    <th className="p-2 border border-slate-800">BAIRRO</th>
                    <th className="p-2 border border-slate-800">IRU (%)</th>
                    <th className="p-2 border border-slate-800">RISCO ACIDENTE</th>
                    <th className="p-2 border border-slate-800">RISCO GARGALO</th>
                    <th className="p-2 border border-slate-800">VIATURAS ATUAIS</th>
                    <th className="p-2 border border-slate-800">DÉFICIT PROJETADO</th>
                  </tr>
                </thead>
                <tbody>
                  {districtRisks.slice(0, 6).map((d) => (
                    <tr key={d.bairro} className="hover:bg-slate-900/60 font-mono">
                      <td className="p-2 border border-slate-800 font-bold text-slate-100">{d.bairro}</td>
                      <td className="p-2 border border-slate-800 text-red-400 font-bold">{d.indiceRiscoAtual}%</td>
                      <td className="p-2 border border-slate-800">{d.probabilidadeAcidente}%</td>
                      <td className="p-2 border border-slate-800">{d.probabilidadeCongestionamento}%</td>
                      <td className="p-2 border border-slate-800">{d.viaturasAtuais}</td>
                      <td className="p-2 border border-slate-800">
                        {d.deficitViaturas > 0 ? (
                          <span className="text-red-400 font-bold">-{d.deficitViaturas} Vtrs</span>
                        ) : (
                          <span className="text-emerald-400">Adequado</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Seção 3: Previsão de Falhas em Hardware IoT */}
          <div className="space-y-2">
            <h3 className="font-pixel text-xs text-red-400 border-b border-slate-800 pb-1">
              3. ALERTA DE MANUTENÇÃO PREVENTIVA (RISCO DE PARADA DE HARDWARE)
            </h3>
            <div className="space-y-2">
              {criticalFailures.slice(0, 3).map((f) => (
                <div key={f.equipamentoId} className="p-2.5 bg-slate-950 border border-slate-800 flex justify-between items-center text-[11px]">
                  <div>
                    <span className="font-bold text-sky-400">{f.numeroSerie}</span> • {f.tipo} ({f.bairro})
                    <p className="text-[10px] text-slate-400 mt-0.5">{f.motivoSuspeito}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-pixel text-red-400 block text-xs">{f.probabilidadeFalha15Dias}% Prob.</span>
                    <span className="text-[9px] text-slate-400">Parada estimada em {f.diasEstimadosAteFalha} dias</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seção 4: Recomendações Prescritivas para o Gestor */}
          <div className="space-y-2">
            <h3 className="font-pixel text-xs text-emerald-400 border-b border-slate-800 pb-1">
              4. AÇÕES PRESCRITIVAS SUGERIDAS PELO PROTOCOLO PROMETHEUS
            </h3>
            <div className="space-y-2">
              {recommendations.map((r, i) => (
                <div key={r.id} className="p-3 bg-slate-950 border border-emerald-500/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100">
                      #{i + 1}. {r.titulo}
                    </span>
                    <span className="font-pixel text-[8px] bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-600">
                      {r.prioridade.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    <strong>Ação sugerida:</strong> {r.acaoSugerida}
                  </p>
                  <p className="text-[10px] text-emerald-400">
                    <strong>Impacto estimado:</strong> {r.impactoEsperado}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex justify-between items-center text-[10px] text-slate-500 font-mono">
          <span>PROTOCOLO PROMETHEUS • SISTEMA F.O.G.O. • CIDADE DE MARÍLIA/SP</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-sky-700 hover:bg-sky-600 text-white font-pixel text-xs transition-colors"
          >
            FECHAR RELATÓRIO
          </button>
        </div>
      </div>
    </div>
  );
};
