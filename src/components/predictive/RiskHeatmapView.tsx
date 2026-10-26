import React, { useState } from 'react';
import { DistrictRisk, HourlyRiskPrediction } from '../../types/predictive';
import { Shield, AlertTriangle, TrendingUp, Clock, Users, ArrowUpRight } from 'lucide-react';

interface RiskHeatmapViewProps {
  districtRisks: DistrictRisk[];
  hourlyPredictions: HourlyRiskPrediction[];
  onSelectDistrict?: (district: string) => void;
}

export const RiskHeatmapView: React.FC<RiskHeatmapViewProps> = ({
  districtRisks,
  hourlyPredictions,
  onSelectDistrict
}) => {
  const [selectedHour, setSelectedHour] = useState<string>('17:30');

  const currentHourData =
    hourlyPredictions.find((h) => h.hora === selectedHour) || hourlyPredictions[0];

  return (
    <div className="space-y-4">
      {/* 24h Hourly Timeline Curve */}
      <div className="pixel-box bg-slate-900/90 border-slate-800 p-4">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
          <div>
            <h3 className="font-pixel text-xs text-purple-400 flex items-center gap-1.5">
              <Clock size={15} />
              <span>LINHA DO TEMPO PREDITIVA 24H: CURVA DE RISCO URBANO</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-hud">
              Projeção horária baseada em dados históricos de tráfego, clima e sinistros
            </p>
          </div>
          <div className="text-right">
            <span className="font-pixel text-[10px] text-amber-400 block">
              PICO CRÍTICO ESTIMADO
            </span>
            <span className="font-mono text-xs text-slate-300">17:30 - 19:00 (Centro & Fragata)</span>
          </div>
        </div>

        {/* Timeline Bar selector */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 pt-2">
          {hourlyPredictions.map((h) => {
            const isSelected = h.hora === selectedHour;
            const barHeight = Math.max(15, (h.indiceRiscoGeral / 100) * 60);

            let colorBg = 'bg-emerald-500';
            if (h.indiceRiscoGeral >= 75) colorBg = 'bg-red-500';
            else if (h.indiceRiscoGeral >= 50) colorBg = 'bg-amber-500';

            return (
              <button
                key={h.hora}
                onClick={() => setSelectedHour(h.hora)}
                className={`flex flex-col items-center justify-end p-1.5 border transition-all ${
                  isSelected
                    ? 'border-purple-400 bg-purple-950/40 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <span className="font-mono text-[9px] text-slate-400 mb-1">{h.hora}</span>
                <div className="w-full flex items-end justify-center h-16 bg-slate-900">
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
          <div className="mt-3 p-3 bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-sm text-purple-400 font-bold">
                {currentHourData.hora}
              </span>
              <span className="text-slate-400">
                Setor com maior vulnerabilidade estimada:{' '}
                <strong className="text-amber-400 font-semibold">{currentHourData.bairroMaisCritico}</strong>
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px] text-slate-300">
              <span>
                Volume Previsto: <strong className="text-sky-300">{currentHourData.volumeEsperadoVeiculos.toLocaleString()} veíc/h</strong>
              </span>
              <span>
                Índice de Risco Global: <strong className="text-red-400">{currentHourData.indiceRiscoGeral}%</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* District Risk Heatmap & Reinforcement Ranking */}
      <div className="pixel-box bg-slate-900/90 border-slate-800 p-4">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
          <div>
            <h3 className="font-pixel text-xs text-sky-400 flex items-center gap-1.5">
              <TrendingUp size={15} />
              <span>MATRIZ PREDITIVA DE RISCO URBANO (IRU) POR BAIRRO</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-hud">
              Índice ponderado: probabilidade de sinistro, retenção viária e déficit de segurança
            </p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Algoritmo Preditivo PROMETHEUS v2.0
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {districtRisks.map((d, index) => {
            const riskColor =
              d.nivelRisco === 'critico'
                ? 'text-red-400 border-red-500/70 bg-red-950/20'
                : d.nivelRisco === 'alto'
                ? 'text-amber-400 border-amber-500/70 bg-amber-950/20'
                : d.nivelRisco === 'moderado'
                ? 'text-yellow-300 border-yellow-500/40 bg-slate-950'
                : 'text-emerald-400 border-emerald-500/40 bg-slate-950';

            return (
              <div
                key={d.bairro}
                className={`p-3 border flex flex-col justify-between transition-all hover:scale-[1.01] ${riskColor}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-xs text-slate-500">#{index + 1}</span>
                      <h4 className="font-bold text-sm text-slate-100">{d.bairro}</h4>
                    </div>
                    <div className="text-right">
                      <span className="font-pixel text-base font-bold">{d.indiceRiscoAtual}%</span>
                      <span className="block font-pixel text-[8px] uppercase tracking-wider">
                        Risco {d.nivelRisco}
                      </span>
                    </div>
                  </div>

                  {/* Probabilidades de Acidente e Congestionamento */}
                  <div className="space-y-1.5 my-2.5">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                        <span>Probab. de Acidente / Sinistro:</span>
                        <strong className="font-mono text-red-300">{d.probabilidadeAcidente}%</strong>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 border border-slate-800">
                        <div
                          className="bg-red-500 h-full"
                          style={{ width: `${d.probabilidadeAcidente}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                        <span>Probab. de Congestionamento / Trava:</span>
                        <strong className="font-mono text-amber-300">{d.probabilidadeCongestionamento}%</strong>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 border border-slate-800">
                        <div
                          className="bg-amber-500 h-full"
                          style={{ width: `${d.probabilidadeCongestionamento}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fatores Determinantes */}
                  <div className="text-[11px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-800/80">
                    <span className="text-[10px] font-pixel text-slate-500 block">FATORES ANALISADOS:</span>
                    {d.principaisFatores.map((f, i) => (
                      <div key={i} className="flex items-start gap-1">
                        <span className="text-slate-600">•</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recomendação de Viaturas */}
                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Users size={13} className="text-sky-400" />
                    <span className="text-slate-300">
                      Ronda Atual: <strong>{d.viaturasAtuais}</strong> / Ideal:{' '}
                      <strong className="text-sky-300">{d.viaturasRecomendadas}</strong>
                    </span>
                  </div>

                  {d.deficitViaturas > 0 ? (
                    <span className="font-pixel text-[9px] text-red-400 font-bold bg-red-950/80 px-1.5 py-0.5 border border-red-500/50">
                      DÉFICIT: -{d.deficitViaturas} EQUIPE(S)
                    </span>
                  ) : (
                    <span className="font-pixel text-[9px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 border border-emerald-500/50">
                      COBERTURA OK
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
