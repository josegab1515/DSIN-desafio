import React from 'react';
import { IncidentAlert } from '../../types/alert';
import { PixelBadge } from '../common/PixelBadge';
import { PixelButton } from '../common/PixelButton';
import { soundService } from '../../services/soundService';
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Flame,
  Radio,
  ExternalLink
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
    <div className="pixel-box bg-slate-900/90 flex flex-col h-full border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-red-400 animate-pulse" />
          <h3 className="font-pixel text-xs text-red-400">ALERTAS & OCORRÊNCIAS EM TEMPO REAL</h3>
        </div>
        <PixelButton
          variant="danger"
          className="text-[9px] py-1 px-2"
          onClick={handleSimulate}
          title="Disparar um novo incidente aleatório na cidade para testar telemetria"
        >
          <span>SIMULAR INCIDENTE</span>
        </PixelButton>
      </div>

      {/* Feed List */}
      <div className="space-y-2 mt-2.5 overflow-y-auto max-h-[380px] pr-1">
        {unresolvedAlerts.length === 0 ? (
          <div className="p-6 text-center text-slate-500 font-hud text-xs border border-dashed border-slate-800">
            Nenhuma ocorrência crítica ativa no momento. Cidade operando em estado nominal.
          </div>
        ) : (
          unresolvedAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-2.5 border transition-all ${
                alert.severidade === 'critico'
                  ? 'bg-red-950/30 border-red-500/70 shadow-[0_0_8px_rgba(239,68,68,0.2)]'
                  : 'bg-slate-950/70 border-amber-500/50'
              }`}
            >
              <div className="flex items-start justify-between gap-1.5 mb-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <PixelBadge type="severidade" value={alert.severidade} />
                  <span className="font-mono text-[10px] text-slate-400">
                    {alert.timestamp}
                  </span>
                </div>
                <span className="font-pixel text-[9px] text-sky-400 bg-slate-900 px-1 py-0.5 border border-slate-800">
                  {alert.bairro}
                </span>
              </div>

              <h4 className="font-bold text-xs text-slate-100 mt-1 leading-snug">
                {alert.titulo}
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                {alert.descricao}
              </p>

              <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {alert.lat && alert.lng ? (
                  <button
                    onClick={() => onFocusAlertOnMap(alert)}
                    className="text-[10px] text-sky-400 hover:text-sky-300 font-pixel flex items-center gap-1"
                  >
                    <ExternalLink size={11} />
                    <span>VER NO MAPA</span>
                  </button>
                ) : (
                  <span />
                )}

                <PixelButton
                  variant="success"
                  className="text-[9px] py-0.5 px-2"
                  onClick={() => onResolveAlert(alert.id)}
                >
                  <CheckCircle size={11} />
                  <span>RESOLVER</span>
                </PixelButton>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
