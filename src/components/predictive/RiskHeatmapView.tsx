import React, { useState } from 'react';
import { DistrictRisk, HourlyRiskPrediction } from '../../types/predictive';
import { Shield, AlertTriangle, TrendingUp, Clock, Users, ArrowUpRight, MapPin, Eye, Sparkles } from 'lucide-react';

interface RiskHeatmapViewProps {
  districtRisks: DistrictRisk[];
  hourlyPredictions: HourlyRiskPrediction[];
  onSelectDistrict?: (district: string) => void;
  onSimulateVtrReinforcement?: (district: string) => void;
}

export const RiskHeatmapView: React.FC<RiskHeatmapViewProps> = ({
  districtRisks,
  hourlyPredictions,
  onSelectDistrict,
  onSimulateVtrReinforcement
}) => {
  const [selectedHour, setSelectedHour] = useState<string>('17:30');
  const [highlightedDistrict, setHighlightedDistrict] = useState<string | null>(null);

  const currentHourData =
    hourlyPredictions.find((h) => h.hora === selectedHour) || hourlyPredictions[0];

  // Coordenadas topológicas para o Mini Mapa de Calor Vetorial de Marília
  const districtMapNodes: Record<
    string,
    { x: number; y: number; r: number; label: string }
  > = {
    'Centro': { x: 250, y: 150, r: 42, label: 'CENTRO' },
    'Fragata': { x: 260, y: 220, r: 38, label: 'FRAGATA' },
    'Cascata': { x: 330, y: 210, r: 35, label: 'CASCATA' },
    'Alto Cafezal': { x: 180, y: 140, r: 32, label: 'ALTO CAFEZAL' },
    'Palmital': { x: 240, y: 70, r: 36, label: 'PALMITAL' },
    'Distrito Industrial': { x: 370, y: 140, r: 40, label: 'DISTRITO IND.' },
    'Campus Universitário': { x: 120, y: 180, r: 34, label: 'UNIV. / CAMPUS' },
    'Nova Marília': { x: 230, y: 275, r: 32, label: 'NOVA MARÍLIA' }
  };

  return (
    <div className="space-y-4">
      {/* 24h Hourly Timeline Curve */}
      <div className="pixel-box bg-slate-900/90 border-slate-800 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 mb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="font-pixel text-xs text-purple-400 flex items-center gap-1.5">
              <Clock size={15} />
              <span>LINHA DO TEMPO PREDITIVA 24H: CURVA DE RISCO & FLUXO VEICULAR</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-hud">
              Projeção horária baseada em laços indutivos semafóricos, clima e sazonalidade histórica
            </p>
          </div>
          <div className="text-right">
            <span className="font-pixel text-[10px] text-red-400 block animate-pulse">
              PICO CRÍTICO: 17:30 - 19:00
            </span>
            <span className="font-mono text-xs text-slate-300">Gargalo no Corredor Centro x Fragata</span>
          </div>
        </div>

        {/* Timeline Bar selector */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 pt-2">
          {hourlyPredictions.map((h) => {
            const isSelected = h.hora === selectedHour;
            const barHeight = Math.max(16, (h.indiceRiscoGeral / 100) * 58);

            let colorBg = 'bg-emerald-500';
            if (h.indiceRiscoGeral >= 75) colorBg = 'bg-red-500';
            else if (h.indiceRiscoGeral >= 50) colorBg = 'bg-amber-500';

            return (
              <button
                key={h.hora}
                onClick={() => setSelectedHour(h.hora)}
                className={`flex flex-col items-center justify-end p-1.5 border transition-all ${
                  isSelected
                    ? 'border-purple-400 bg-purple-950/40 shadow-[0_0_12px_rgba(168,85,247,0.5)] scale-[1.03]'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <span className="font-mono text-[9px] text-slate-400 mb-1">{h.hora}</span>
                <div className="w-full flex items-end justify-center h-16 bg-slate-900 rounded-sm overflow-hidden">
                  <div
                    className={`w-4/5 ${colorBg} transition-all`}
                    style={{ height: `${barHeight}px` }}
                  />
                </div>
                <span
                  className={`font-pixel text-[9px] mt-1 ${
                    h.indiceRiscoGeral >= 75 ? 'text-red-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  {h.indiceRiscoGeral}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Hour Details Box */}
        {currentHourData && (
          <div className="mt-3 p-3 bg-slate-950 border border-purple-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="font-pixel text-sm text-purple-400 font-bold bg-purple-950/80 px-2 py-0.5 border border-purple-600">
                {currentHourData.hora}
              </span>
              <span className="text-slate-300">
                Ponto de Maior Vulnerabilidade Previsto:{' '}
                <strong className="text-amber-400 font-bold">{currentHourData.bairroMaisCritico}</strong>
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px] text-slate-300 flex-wrap">
              <span>
                Volume Previsto: <strong className="text-sky-300">{currentHourData.volumeEsperadoVeiculos.toLocaleString()} veíc/h</strong>
              </span>
              <span>
                Espera Semáforo: <strong className="text-amber-300">{currentHourData.tempoEsperaCruzamentoSeg}s</strong>
              </span>
              <span>
                Risco Sinistro: <strong className="text-red-400 font-bold">{currentHourData.riscoAcidentesHora}%</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Mini Mapa Topológico de Calor (Spatial Heatmap) + Matriz de Risco */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Painel Esquerdo: Mini Mapa Vetorial de Calor Espacial */}
        <div className="lg:col-span-1 pixel-box bg-slate-900/90 border-slate-800 p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-red-400" />
                <h4 className="font-pixel text-[11px] text-slate-100">
                  MAPA DE CALOR GEOGRÁFICO // MARÍLIA
                </h4>
              </div>
              <span className="font-pixel text-[8px] text-purple-400 bg-purple-950 px-1.5 py-0.5 border border-purple-600">
                HEATMAP
              </span>
            </div>

            <p className="text-[10px] text-slate-400 font-hud mb-2">
              Manchas térmicas radiais proporcionais à densidade de risco e probabilidade de sinistro
            </p>

            {/* SVG Heatmap */}
            <div className="relative w-full h-[310px] bg-[#070a12] border border-slate-800 rounded overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 500 350" className="w-full h-full">
                {/* Linhas viárias conectando as regiões */}
                <path d="M 250 70 L 250 150 L 260 220 L 230 275" stroke="#1e293b" strokeWidth="3" strokeDasharray="4 4" fill="none" />
                <path d="M 180 140 L 250 150 L 370 140" stroke="#1e293b" strokeWidth="3" strokeDasharray="4 4" fill="none" />
                <path d="M 120 180 L 180 140" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M 260 220 L 330 210" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" fill="none" />

                {/* Nós / Manchas de Calor por Bairro */}
                {Object.entries(districtMapNodes).map(([bairro, node]) => {
                  const dRisk = districtRisks.find((d) => d.bairro === bairro);
                  const riskVal = dRisk?.indiceRiscoAtual || 30;

                  let color = '#22c55e'; // verde
                  let pulseClass = '';
                  if (riskVal >= 75) {
                    color = '#ef4444'; // vermelho
                    pulseClass = 'animate-ping opacity-30';
                  } else if (riskVal >= 50) {
                    color = '#f59e0b'; // amarelo
                  }

                  const isHovered = highlightedDistrict === bairro;

                  return (
                    <g
                      key={bairro}
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHighlightedDistrict(bairro)}
                      onMouseLeave={() => setHighlightedDistrict(null)}
                      onClick={() => onSelectDistrict && onSelectDistrict(bairro)}
                    >
                      {/* Mancha de calor radial pulsante */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r * (riskVal / 45)}
                        fill={color}
                        opacity={riskVal >= 75 ? 0.35 : 0.2}
                        className={pulseClass}
                      />

                      {/* Círculo central do bairro */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isHovered ? node.r * 0.75 : node.r * 0.65}
                        fill="#0b0f19"
                        stroke={color}
                        strokeWidth={isHovered ? 3 : 2}
                      />

                      {/* Rótulo do Bairro e Risco */}
                      <text
                        x={node.x}
                        y={node.y - 3}
                        textAnchor="middle"
                        fill="#f8fafc"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {node.label}
                      </text>
                      <text
                        x={node.x}
                        y={node.y + 10}
                        textAnchor="middle"
                        fill={color}
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {riskVal}%
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legenda do Mapa Térmico */}
              <div className="absolute bottom-2 left-2 bg-slate-950/90 border border-slate-800 p-1.5 text-[8px] font-mono text-slate-300 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse"></span>
                  <span>Crítico (≥75%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                  <span>Atenção (50-74%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  <span>Nominal (&lt;50%)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-slate-400 font-hud text-center">
            Passe o mouse ou clique no mapa para destacar o setor
          </div>
        </div>

        {/* Painel Direito: Cards dos Bairros com Fatores XAI e Ação de Reforço */}
        <div className="lg:col-span-2 pixel-box bg-slate-900/90 border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="font-pixel text-xs text-sky-400 flex items-center gap-1.5">
                <TrendingUp size={15} />
                <span>MATRIZ PREDITIVA DE RISCO URBANO (IRU) POR BAIRRO</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-hud">
                Índice ponderado com decomposição de fatores de impacto e dimensionamento de efetivo
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
              Algoritmo Preditivo PROMETHEUS v2.5
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
            {districtRisks.map((d, index) => {
              const isHovered = highlightedDistrict === d.bairro;
              const riskColor =
                d.nivelRisco === 'critico'
                  ? 'border-red-500/70 bg-red-950/20'
                  : d.nivelRisco === 'alto'
                  ? 'border-amber-500/70 bg-amber-950/20'
                  : d.nivelRisco === 'moderado'
                  ? 'border-yellow-500/40 bg-slate-950'
                  : 'border-emerald-500/40 bg-slate-950';

              return (
                <div
                  key={d.bairro}
                  onMouseEnter={() => setHighlightedDistrict(d.bairro)}
                  onMouseLeave={() => setHighlightedDistrict(null)}
                  className={`p-3 border flex flex-col justify-between transition-all rounded ${riskColor} ${
                    isHovered ? 'ring-2 ring-purple-400 scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-pixel text-xs text-slate-500">#{index + 1}</span>
                        <h4 className="font-bold text-sm text-slate-100">{d.bairro}</h4>
                      </div>
                      <div className="text-right">
                        <span className="font-pixel text-base font-bold text-slate-100">
                          {d.indiceRiscoAtual}%
                        </span>
                        <span
                          className={`block font-pixel text-[8px] uppercase tracking-wider ${
                            d.nivelRisco === 'critico'
                              ? 'text-red-400'
                              : d.nivelRisco === 'alto'
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          Risco {d.nivelRisco}
                        </span>
                      </div>
                    </div>

                    {/* Probabilidades de Acidente e Congestionamento */}
                    <div className="space-y-1.5 my-2">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                          <span>Probabilidade de Acidente / Sinistro:</span>
                          <strong className="font-mono text-red-300">{d.probabilidadeAcidente}%</strong>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 border border-slate-800 rounded overflow-hidden">
                          <div
                            className="bg-red-500 h-full"
                            style={{ width: `${d.probabilidadeAcidente}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                          <span>Probabilidade de Congestionamento / Trava:</span>
                          <strong className="font-mono text-amber-300">{d.probabilidadeCongestionamento}%</strong>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 border border-slate-800 rounded overflow-hidden">
                          <div
                            className="bg-amber-500 h-full"
                            style={{ width: `${d.probabilidadeCongestionamento}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Decomposição dos Fatores XAI */}
                    <div className="text-[10px] text-slate-400 space-y-1 pt-1.5 border-t border-slate-800/80">
                      <span className="font-pixel text-[9px] text-purple-300 block">
                        COMPOSIÇÃO DO RISCO (XAI):
                      </span>
                      {d.fatoresImpacto && d.fatoresImpacto.map((f, i) => (
                        <div key={i} className="flex items-center justify-between font-mono text-[10px]">
                          <span className="text-slate-300">{f.fator}</span>
                          <span className="text-purple-300 font-bold">{f.pesoPercentual}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dimensionamento de Viaturas e Botão de Reforço */}
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Users size={12} className="text-sky-400" />
                      <span className="text-slate-300 text-[11px]">
                        Ronda: <strong>{d.viaturasAtuais}</strong> / Ideal:{' '}
                        <strong className="text-sky-300">{d.viaturasRecomendadas}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {d.deficitViaturas > 0 ? (
                        <span className="font-pixel text-[8px] text-red-400 font-bold bg-red-950/80 px-1.5 py-0.5 border border-red-500/50 rounded">
                          DÉFICIT: -{d.deficitViaturas} VTR
                        </span>
                      ) : (
                        <span className="font-pixel text-[8px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 border border-emerald-500/50 rounded">
                          COBERTURA OK
                        </span>
                      )}

                      {onSimulateVtrReinforcement && (
                        <button
                          onClick={() => onSimulateVtrReinforcement(d.bairro)}
                          className="px-2 py-0.5 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-500/60 text-emerald-200 font-pixel text-[8px] rounded flex items-center gap-1 active:scale-95"
                          title="Simular reforço imediato de viatura neste setor"
                        >
                          <Sparkles size={9} />
                          <span>+1 VTR</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
