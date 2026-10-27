import React from 'react';
import { IncidentAlert } from '../../types/alert';
import { PixelBadge } from '../common/PixelBadge';
import { PixelButton } from '../common/PixelButton';
import { soundService } from '../../services/soundService';
import {
  CheckCircle,
  Flame,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

interface AlertFeedProps {
  alerts: IncidentAlert[];
  onResolveAlert: (id: string) => void;
  onSimulateIncident: () => void;
  onFocusAlertOnMap: (alert: IncidentAlert) => void;
}

export const AlertFeed: React.FC<AlertFeedProps> = ({
  alerts,
  onResolveAlert,
  onSimulateIncident,
  onFocusAlertOnMap
}) => {
  const unresolvedAlerts = alerts.filter((a) => !a.resolvido);

  const handleSimulate = () => {
    soundService.playAlert();
    onSimulateIncident();
  };

  return (
    <div className="pixel-box bg-[#090d16] flex flex-col h-full border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-red-400 animate-pulse" />
          <h3 className="font-pixel text-xs text-red-400">ALERTAS & OCORRÊNCIAS // CICC</h3>
        </div>
        <button
          onClick={handleSimulate}
          className="px-2.5 py-1 bg-red-600/80 hover:bg-red-500 text-white font-pixel text-[9px] rounded shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-all flex items-center gap-1 active:scale-95"
          title="Disparar novo alerta de incidente na cidade"
        >
          <AlertTriangle size={11} />
          <span>SIMULAR ALERTA</span>
        </button>
      </div>

      {/* Feed List */}
      <div className="space-y-2.5 mt-2.5 overflow-y-auto max-h-[460px] pr-1">
        {unresolvedAlerts.length === 0 ? (
          <div className="p-6 text-center text-slate-500 font-hud text-xs border border-dashed border-slate-800 rounded">
            Nenhuma ocorrência crítica pendente no momento. Malha urbana operando em estado nominal.
          </div>
        ) : (
          unresolvedAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 border rounded transition-all ${
                alert.severidade === 'critico'
                  ? 'bg-red-950/30 border-red-500/70 shadow-[0_0_10px_rgba(239,68,68,0.25)]'
                  : 'bg-slate-950 border-amber-500/50'
              }`}
            >
              <div className="flex items-start justify-between gap-1.5 mb-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <PixelBadge type="severidade" value={alert.severidade} />
                  <span className="font-mono text-[10px] text-slate-400">
                    {alert.timestamp}
                  </span>
                </div>
                <span className="font-pixel text-[9px] text-sky-400 bg-slate-900 px-1.5 py-0.5 border border-slate-800 rounded">
                  {alert.bairro}
                </span>
              </div>

              <h4 className="font-bold text-xs text-slate-100 mt-1 leading-snug">
                {alert.titulo}
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                {alert.descricao}
              </p>

              {/* Action Buttons: Focar no Mapa & Resolver */}
              <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-xs gap-2">
                {alert.lat && alert.lng ? (
                  <button
                    onClick={() => onFocusAlertOnMap(alert)}
                    className="px-2.5 py-1 text-[10px] text-sky-400 hover:text-white bg-slate-900 hover:bg-sky-950 border border-sky-600/60 rounded font-pixel flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                    title="Focar no mapa"
                  >
                    <ExternalLink size={12} />
                    <span>VER NO MAPA</span>
                  </button>
                ) : (
                  <span />
                )}

                <button
                  onClick={() => onResolveAlert(alert.id)}
                  className="px-2.5 py-1 text-[10px] text-emerald-400 hover:text-white bg-slate-900 hover:bg-emerald-950 border border-emerald-600/60 rounded font-pixel flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                  title="Finalizar ocorrência"
                >
                  <CheckCircle size={12} />
                  <span>RESOLVER</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
