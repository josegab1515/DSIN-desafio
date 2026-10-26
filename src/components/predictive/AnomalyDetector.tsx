import React from 'react';
import { AnomalyDetection } from '../../types/predictive';
import { Zap, AlertTriangle, Activity, Thermometer, Radio } from 'lucide-react';

interface AnomalyDetectorProps {
  anomalies: AnomalyDetection[];
}

export const AnomalyDetector: React.FC<AnomalyDetectorProps> = ({ anomalies }) => {
  return (
    <div className="pixel-box bg-slate-900/90 border-slate-800 p-4 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h3 className="font-pixel text-xs text-red-400 flex items-center gap-1.5">
            <Zap size={15} />
            <span>DETECÇÃO DE ANOMALIAS ESTRUTURAIS & COMPORTAMENTO ATÍPICO</span>
          </h3>
          <p className="text-[11px] text-slate-400 font-hud">
            Identificação em tempo real de variações que excedem 2.5 desvios-padrão (Z-Score)
          </p>
        </div>
        <span className="font-pixel text-[10px] text-slate-400">
          ANOMALIAS ATIVAS: <strong className="text-red-400">{anomalies.length}</strong>
        </span>
      </div>

      <div className="space-y-2">
        {anomalies.length === 0 ? (
          <div className="p-4 text-center text-slate-500 font-hud text-xs border border-dashed border-slate-800">
            Nenhum comportamento fora do padrão detectado pelos sensores nas últimas 6 horas.
          </div>
        ) : (
          anomalies.map((anom) => (
            <div
              key={anom.id}
              className="p-3 bg-slate-950 border border-red-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-red-950/40 border border-red-500/60 text-red-400 mt-0.5">
                  {anom.tipo === 'temperatura_alta' ? (
                    <Thermometer size={16} />
                  ) : (
                    <Radio size={16} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100">{anom.descricao}</span>
                    <span className="font-mono text-[10px] text-sky-400">
                      ID: {anom.equipamentoId}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Local: {anom.localizacao} • {anom.dataHora}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end font-mono text-[11px] pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="text-right">
                  <span className="text-slate-500 block text-[9px]">Detectado / Esperado:</span>
                  <span className="text-red-400 font-bold">{anom.valorDetectado}</span>
                  <span className="text-slate-400"> vs {anom.valorEsperado}</span>
                </div>
                <div className="px-2 py-1 bg-red-950 border border-red-600 text-red-300 font-bold text-[10px]">
                  Z-Score: +{anom.desvioPadraoZScore}σ
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
