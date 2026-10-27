import React, { useState } from 'react';
import { AnomalyDetection } from '../../types/predictive';
import { Zap, AlertTriangle, Activity, Thermometer, Radio, CheckCircle, Filter, Info } from 'lucide-react';

interface AnomalyDetectorProps {
  anomalies: AnomalyDetection[];
}

export const AnomalyDetector: React.FC<AnomalyDetectorProps> = ({ anomalies }) => {
  const [filterType, setFilterType] = useState<string>('todos');

  const filtered = anomalies.filter((a) => {
    if (filterType === 'todos') return true;
    return a.tipo === filterType;
  });

  return (
    <div className="space-y-4">
      {/* Header com Visualização Gráfica do Z-Score e Distribuição Gaussiana */}
      <div className="pixel-box bg-slate-900/90 border-slate-800 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="font-pixel text-xs text-red-400 flex items-center gap-1.5">
              <Zap size={15} />
              <span>DETECÇÃO DE ANOMALIAS ESTATÍSTICAS EM TEMPO REAL (Z-SCORE)</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-hud">
              Identificação algorítmica de comportamentos fora do padrão que indicam colisão, queima ou interrupção
            </p>
          </div>
          <div className="text-right">
            <span className="font-pixel text-[10px] text-red-400 block animate-pulse">
              LIMIAR DE DISPARO: |Z| &gt; 2.5σ
            </span>
            <span className="font-mono text-[10px] text-slate-400">Intervalo de Confiança 99.3%</span>
          </div>
        </div>

        {/* Curva de Distribuição Normal (Gaussiana) Explicativa */}
        <div className="p-3 bg-slate-950 border border-slate-800 rounded space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-purple-300 font-pixel">
              <Activity size={12} />
              <span>DISTRIBUIÇÃO DE NORMALIDADE DOS SENSORES (DESVIOS-PADRÃO):</span>
            </span>
            <span className="text-emerald-400 font-bold">Zona Nominal: -2σ a +2σ</span>
          </div>

          <div className="relative h-20 w-full bg-[#07090e] border border-slate-800 rounded flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 600 80" className="w-full h-full">
              {/* Curva Gaussiana */}
              <path
                d="M 50 75 Q 200 70 260 30 Q 300 5 340 30 Q 400 70 550 75"
                stroke="#38bdf8"
                strokeWidth="2"
                fill="none"
              />
              {/* Área Normal Verde */}
              <path
                d="M 180 75 L 180 50 Q 300 5 420 50 L 420 75 Z"
                fill="#22c55e"
                opacity="0.12"
              />
              {/* Linhas de desvio padrão */}
              <line x1="300" y1="10" x2="300" y2="75" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
              <line x1="180" y1="50" x2="180" y2="75" stroke="#22c55e" strokeWidth="1" />
              <line x1="420" y1="50" x2="420" y2="75" stroke="#22c55e" strokeWidth="1" />
              <line x1="100" y1="70" x2="100" y2="75" stroke="#ef4444" strokeWidth="2" />
              <line x1="500" y1="70" x2="500" y2="75" stroke="#ef4444" strokeWidth="2" />

              {/* Rótulos */}
              <text x="300" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">Média (μ)</text>
              <text x="180" y="72" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">-2σ</text>
              <text x="420" y="72" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">+2σ</text>
              <text x="90" y="65" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="monospace">Queda de Fluxo (-4.1σ)</text>
              <text x="510" y="65" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="monospace">Térmica (+3.4σ)</text>

              {/* Pontos de Anomalia Pulsantes */}
              <circle cx="95" cy="71" r="5" fill="#ef4444" className="animate-ping" />
              <circle cx="95" cy="71" r="4" fill="#ef4444" />
              <circle cx="505" cy="71" r="5" fill="#ef4444" className="animate-ping" />
              <circle cx="505" cy="71" r="4" fill="#ef4444" />
            </svg>
          </div>
        </div>
      </div>

      {/* Lista de Anomalias Detectadas com Filtros */}
      <div className="pixel-box bg-slate-900/90 border-slate-800 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-pixel text-xs text-slate-200">
              ANOMALIAS IDENTIFICADAS PELO MOTOR PROMETHEUS ({filtered.length})
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] font-pixel flex-wrap">
            <button
              onClick={() => setFilterType('todos')}
              className={`px-2 py-0.5 border rounded ${
                filterType === 'todos' ? 'bg-purple-950 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              TODAS ({anomalies.length})
            </button>
            <button
              onClick={() => setFilterType('temperatura_alta')}
              className={`px-2 py-0.5 border rounded ${
                filterType === 'temperatura_alta' ? 'bg-purple-950 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              TÉRMICAS
            </button>
            <button
              onClick={() => setFilterType('queda_fluxo_subita')}
              className={`px-2 py-0.5 border rounded ${
                filterType === 'queda_fluxo_subita' ? 'bg-purple-950 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              TRÁFEGO / BLOQUEIO
            </button>
            <button
              onClick={() => setFilterType('sinal_iot_degradado')}
              className={`px-2 py-0.5 border rounded ${
                filterType === 'sinal_iot_degradado' ? 'bg-purple-950 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              ENLACE IoT
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {filtered.length === 0 ? (
            <div className="p-5 text-center text-slate-500 font-hud text-xs border border-dashed border-slate-800 rounded">
              Nenhuma anomalia estatística ativa para a categoria selecionada.
            </div>
          ) : (
            filtered.map((anom) => (
              <div
                key={anom.id}
                className="p-3 bg-slate-950 border border-red-500/60 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-sm hover:border-red-400 transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 bg-red-950/60 border border-red-500 text-red-400 mt-0.5 rounded">
                    {anom.tipo === 'temperatura_alta' ? (
                      <Thermometer size={16} />
                    ) : anom.tipo === 'queda_fluxo_subita' ? (
                      <AlertTriangle size={16} />
                    ) : (
                      <Radio size={16} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-100 text-sm">{anom.descricao}</span>
                      <span className="font-mono text-[10px] text-sky-400 bg-slate-900 px-1.5 py-0.2 border border-slate-800 rounded">
                        ID: {anom.equipamentoId}
                      </span>
                      <span className="font-pixel text-[8px] bg-red-950 text-red-300 border border-red-700 px-1.5 py-0.5 rounded">
                        Z-SCORE: {anom.desvioPadraoZScore > 0 ? `+${anom.desvioPadraoZScore}σ` : `${anom.desvioPadraoZScore}σ`}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 mt-1">
                      <strong>Local:</strong> {anom.localizacao} • <span className="font-mono text-slate-400">{anom.dataHora}</span>
                    </p>

                    <p className="text-[10px] text-amber-300 mt-0.5 font-hud">
                      <strong className="text-amber-400">Impacto Operacional:</strong> {anom.impactoOperacional}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end font-mono text-[11px] pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="text-right">
                    <span className="text-slate-500 block text-[9px]">Leitura vs Esperado:</span>
                    <span className="text-red-400 font-bold">{anom.valorDetectado}</span>
                    <span className="text-slate-400"> (Esperado: {anom.valorEsperado})</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
