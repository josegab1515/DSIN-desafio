import React, { useState } from 'react';
import { Agent } from '../../types/agent';
import { IncidentAlert } from '../../types/alert';
import { PixelBadge } from '../common/PixelBadge';
import { PixelButton } from '../common/PixelButton';
import { soundService } from '../../services/soundService';
import {
  Siren,
  X,
  Radio,
  Navigation,
  Shield,
  Clock,
  MapPin,
  CheckCircle2,
  AlertOctagon
} from 'lucide-react';

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: IncidentAlert | null;
  agents: Agent[];
  onConfirmDispatch: (agentId: string, alertId: string) => void;
}

export const DispatchModal: React.FC<DispatchModalProps> = ({
  isOpen,
  onClose,
  alert,
  agents,
  onConfirmDispatch
}) => {
  if (!isOpen || !alert) return null;

  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    agents.find((a) => a.status === 'em_patrulha' || a.status === 'disponivel')?.id || agents[0]?.id || ''
  );

  // Calcula distância aproximada em km usando latitude e longitude
  const calculateDistanceKm = (agent: Agent) => {
    if (!alert.lat || !alert.lng) return 1.5;
    const dLat = (agent.localizacaoAtual.lat - alert.lat) * 111;
    const dLng = (agent.localizacaoAtual.lng - alert.lng) * 111 * Math.cos((alert.lat * Math.PI) / 180);
    const dist = Math.sqrt(dLat * dLat + dLng * dLng);
    return Number(dist.toFixed(1));
  };

  const handleDispatch = () => {
    if (!selectedAgentId) return;
    soundService.playDispatchTone();
    onConfirmDispatch(selectedAgentId, alert.id);
    onClose();
  };

  const availableUnits = agents.map((agent) => {
    const dist = calculateDistanceKm(agent);
    const eta = Math.max(1, Math.round(dist * 2.2));
    const isPm = agent.corporacao === 'Polícia Militar';
    const isGm = agent.corporacao === 'Guarda Municipal';

    const callsign = isPm ? `ÁGUIA-PM` : isGm ? `TATICO-GM` : `TRANSITO-ROTA`;

    return {
      agent,
      dist,
      eta,
      callsign
    };
  }).sort((a, b) => a.dist - b.dist);

  return (
    <div className="fixed inset-0 z-[2500] flex items-center justify-center p-3 bg-black/85 backdrop-blur-md">
      <div className="pixel-box w-full max-w-2xl bg-[#090d16] border-2 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-red-500/40 bg-red-950/30 px-3 py-2 -mx-4 -mt-4 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-red-600 rounded text-white animate-pulse">
              <Siren size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs text-red-400 font-bold tracking-wider">
                  SISTEMA DE DESPACHO OPERACIONAL // CÓDIGO 3
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.2 bg-red-900 border border-red-500 text-white rounded">
                  PRIORIDADE MÁXIMA
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-mono">
                COPOM / CICC CENTRAL DE OPERAÇÕES • PROTOCOLO PROMETHEUS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Incident Summary Card */}
        <div className="bg-slate-950 p-3 border border-red-500/50 mb-3 space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[10px] text-red-400 font-bold">
              [OCORRÊNCIA # {alert.id}]
            </span>
            <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 border border-slate-800">
              {alert.timestamp}
            </span>
          </div>
          <h4 className="font-bold text-sm text-slate-100">{alert.titulo}</h4>
          <p className="text-slate-300 text-[11px]">{alert.descricao}</p>
          <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono pt-1">
            <span className="flex items-center gap-1 text-sky-400">
              <MapPin size={11} /> Bairro: {alert.bairro}
            </span>
            {alert.lat && alert.lng && (
              <span>
                GPS: {alert.lat.toFixed(4)}, {alert.lng.toFixed(4)}
              </span>
            )}
          </div>
        </div>

        {/* Units Selection List */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span className="font-pixel text-[10px] text-slate-300 flex items-center gap-1">
              <Radio size={12} className="text-emerald-400 animate-pulse" />
              SELECIONE A UNIDADE OPERACIONAL PARA DESPACHO:
            </span>
            <span className="text-[10px]">{availableUnits.length} viaturas monitoradas</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {availableUnits.map(({ agent, dist, eta, callsign }) => {
              const isSelected = selectedAgentId === agent.id;
              const isBusy = agent.status === 'folga';

              return (
                <div
                  key={agent.id}
                  onClick={() => !isBusy && setSelectedAgentId(agent.id)}
                  className={`p-2.5 border rounded cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-red-950/40 border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  } ${isBusy ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="dispatchUnit"
                      checked={isSelected}
                      disabled={isBusy}
                      onChange={() => setSelectedAgentId(agent.id)}
                      className="accent-red-500 w-4 h-4"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-sky-300">
                          [{callsign}] {agent.equipeViatura || agent.matricula}
                        </span>
                        <span className="text-[10px] text-slate-400">• {agent.nome}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                        <span>{agent.corporacao}</span>
                        <span>• Setor Atual: {agent.localizacaoAtual.bairro}</span>
                        <span>• Rádio: {agent.telefoneRadio}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-emerald-400 font-bold text-xs flex items-center justify-end gap-1">
                      <Clock size={11} /> ETA: ~{eta} min
                    </div>
                    <div className="text-slate-400 text-[10px]">{dist} km do local</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700 rounded transition-colors"
          >
            CANCELAR
          </button>

          <button
            onClick={handleDispatch}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-pixel text-xs tracking-wider font-bold rounded shadow-[0_0_20px_rgba(239,68,68,0.6)] flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Siren size={16} />
            <span>CONFIRMAR DESPACHO IMEDIATO (CÓDIGO 3)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
