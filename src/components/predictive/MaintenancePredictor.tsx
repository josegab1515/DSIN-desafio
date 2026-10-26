import React from 'react';
import { EquipmentFailurePrediction } from '../../types/predictive';
import { PixelBadge } from '../common/PixelBadge';
import { PixelButton } from '../common/PixelButton';
import { Wrench, AlertTriangle, Cpu, CheckCircle2, ShieldAlert } from 'lucide-react';

interface MaintenancePredictorProps {
  predictions: EquipmentFailurePrediction[];
  onOpenOrder: (equipId: string) => void;
}

export const MaintenancePredictor: React.FC<MaintenancePredictorProps> = ({
  predictions,
  onOpenOrder
}) => {
  return (
    <div className="pixel-box bg-slate-900/90 border-slate-800 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h3 className="font-pixel text-xs text-amber-400 flex items-center gap-1.5">
            <Wrench size={15} />
            <span>PREVISÃO DE FALHAS DE HARDWARE IoT (MTBF & ANÁLISE TÉRMICA)</span>
          </h3>
          <p className="text-[11px] text-slate-400 font-hud">
            Cálculo preditivo de probabilidade de indisponibilidade nos próximos 15 dias
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-[10px] text-slate-400 font-mono">
            Modelagem baseada em telemetria, ciclos térmicos e MTBF
          </span>
        </div>
      </div>

      {/* Predictions Table / Cards */}
      <div className="space-y-2.5">
        {predictions.slice(0, 6).map((pred) => {
          let cardStyle = 'border-slate-800 bg-slate-950/80';
          if (pred.urgenciaPreventiva === 'critica') {
            cardStyle = 'border-red-500/70 bg-red-950/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
          } else if (pred.urgenciaPreventiva === 'alta') {
            cardStyle = 'border-amber-500/70 bg-amber-950/20';
          }

          return (
            <div
              key={pred.equipamentoId}
              className={`p-3 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${cardStyle}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-sky-400">
                    {pred.numeroSerie}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">• {pred.tipo}</span>
                  <span className="text-[10px] text-slate-400 font-hud">({pred.bairro})</span>

                  {pred.urgenciaPreventiva === 'critica' && (
                    <span className="font-pixel text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded-sm animate-pulse">
                      PARADA IMINENTE
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  <span className="text-slate-500">Diagnóstico PROMETHEUS:</span> {pred.motivoSuspeito}
                </p>

                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono mt-1.5">
                  <span>MTBF Nominal: {pred.mtbfHoras}h</span>
                  <span>Operação Atual: {pred.horasOperacaoAtual}h</span>
                  <span>
                    Dias Estimados até Blackout:{' '}
                    <strong className={pred.diasEstimadosAteFalha <= 3 ? 'text-red-400 font-bold' : 'text-slate-300'}>
                      {pred.diasEstimadosAteFalha} dias
                    </strong>
                  </span>
                </div>
              </div>

              {/* Probabilidade e Ação */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-hud">Probabilidade 15 Dias</div>
                  <div
                    className={`font-pixel text-base font-bold ${
                      pred.probabilidadeFalha15Dias >= 70
                        ? 'text-red-400'
                        : pred.probabilidadeFalha15Dias >= 40
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {pred.probabilidadeFalha15Dias}%
                  </div>
                </div>

                <PixelButton
                  variant={pred.probabilidadeFalha15Dias >= 70 ? 'danger' : 'secondary'}
                  className="text-[9px] py-1.5 px-2.5"
                  onClick={() => onOpenOrder(pred.equipamentoId)}
                >
                  <Wrench size={12} />
                  <span>EMITIR O.S. PREVENTIVA</span>
                </PixelButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
