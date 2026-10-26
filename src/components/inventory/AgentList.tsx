import React from 'react';
import { Agent } from '../../types/agent';
import { PixelBadge } from '../common/PixelBadge';
import { PixelIcon } from '../common/PixelIcon';
import { PixelButton } from '../common/PixelButton';
import { Plus, Radio, Shield, MapPin, Edit, Trash2 } from 'lucide-react';

interface AgentListProps {
  agents: Agent[];
  onAddNew: () => void;
  onEditAgent: (agent: Agent) => void;
  onDeleteAgent: (id: string) => void;
}

export const AgentList: React.FC<AgentListProps> = ({
  agents,
  onAddNew,
  onEditAgent,
  onDeleteAgent
}) => {
  const getCorpIcon = (corp: Agent['corporacao']) => {
    switch (corp) {
      case 'Agente de Trânsito':
        return 'agente_transito';
      case 'Guarda Municipal':
        return 'guarda_municipal';
      case 'Polícia Militar':
      default:
        return 'policia_militar';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="pixel-box flex items-center justify-between gap-3 bg-slate-900/90">
        <div>
          <h3 className="font-pixel text-sm text-sky-400">AGENTES OPERACIONAIS DE CAMPO</h3>
          <p className="text-xs text-slate-400 font-hud">
            Equipes integradas de Trânsito, Guarda Municipal e Polícia Militar
          </p>
        </div>
        <PixelButton variant="primary" onClick={onAddNew}>
          <Plus size={14} />
          <span>NOVO AGENTE</span>
        </PixelButton>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {agents.map((ag) => (
          <div key={ag.id} className="pixel-box hover:pixel-box-glow flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-950 border border-slate-700">
                    <PixelIcon type={getCorpIcon(ag.corporacao) as any} size={26} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">{ag.nome}</h4>
                    <p className="font-mono text-[10px] text-sky-400">
                      Matrícula: {ag.matricula}
                    </p>
                  </div>
                </div>
                <PixelBadge type="agent" value={ag.status} />
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 py-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Shield size={13} className="text-amber-400" />
                  <span className="font-semibold">{ag.corporacao}</span>
                  <span className="text-[11px] text-slate-400">• {ag.cargo}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <Radio size={13} className="text-emerald-400" />
                  <span>{ag.telefoneRadio}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin size={13} className="text-sky-400" />
                  <span>
                    Bairro: <strong className="text-slate-200">{ag.localizacaoAtual.bairro}</strong> (
                    {ag.localizacaoAtual.ultimaAtualizacao})
                  </span>
                </div>

                {ag.equipeViatura && (
                  <div className="text-[11px] text-slate-400 font-mono bg-slate-950 p-1 border border-slate-800">
                    Viatura / Posto: <span className="text-sky-300">{ag.equipeViatura}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500 font-mono">ID: {ag.id}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditAgent(ag)}
                  className="p-1 hover:bg-slate-800 text-slate-300 hover:text-amber-400"
                  title="Editar Agente"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => onDeleteAgent(ag.id)}
                  className="p-1 hover:bg-slate-800 text-slate-400 hover:text-red-400"
                  title="Remover Agente"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
