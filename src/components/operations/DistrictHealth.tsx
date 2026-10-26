import React from 'react';
import { Equipment } from '../../types/equipment';
import { Agent } from '../../types/agent';
import { IncidentAlert } from '../../types/alert';
import { CITY_DISTRICTS } from '../../data/mockData';
import { ShieldCheck, AlertTriangle, AlertOctagon, Activity } from 'lucide-react';

interface DistrictHealthProps {
  equipments: Equipment[];
  agents: Agent[];
  alerts: IncidentAlert[];
  onSelectDistrict: (district: string) => void;
}

export const DistrictHealth: React.FC<DistrictHealthProps> = ({
  equipments,
  agents,
  alerts,
  onSelectDistrict
}) => {
  const districtStats = CITY_DISTRICTS.map((bairro) => {
    const eqInDistrict = equipments.filter((e) => e.localizacao.bairro === bairro);
    const activeAlerts = alerts.filter((a) => a.bairro === bairro && !a.resolvido);
    const activeAgents = agents.filter(
      (ag) => ag.localizacaoAtual.bairro === bairro && ag.status !== 'folga'
    );

    const operationalEq = eqInDistrict.filter((e) => e.situacao === 'operacional').length;
    const failedEq = eqInDistrict.filter(
      (e) => e.situacao === 'mau_funcionamento' || e.situacao === 'furtado'
    ).length;

    let health: 'normal' | 'atencao' | 'critico' = 'normal';
    if (activeAlerts.some((a) => a.severidade === 'critico') || failedEq >= 2) {
      health = 'critico';
    } else if (activeAlerts.length > 0 || failedEq > 0) {
      health = 'atencao';
    }

    return {
      bairro,
      health,
      totalEq: eqInDistrict.length,
      operationalEq,
      failedEq,
      activeAlerts: activeAlerts.length,
      activeAgents: activeAgents.length
    };
  });

  return (
    <div className="pixel-box bg-slate-900/90 border-slate-800">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
        <div>
          <h3 className="font-pixel text-xs text-sky-400">
            SAÚDE OPERACIONAL POR REGIÃO / BAIRRO
          </h3>
          <p className="text-[11px] text-slate-400 font-hud">
            Visão consolidada: identificação imediata de zonas que exigem atenção
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-pixel">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 bg-emerald-400 inline-block"></span> Normal
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2 h-2 bg-amber-400 inline-block"></span> Atenção
          </span>
          <span className="flex items-center gap-1 text-red-400">
            <span className="w-2 h-2 bg-red-400 inline-block animate-pulse"></span> Crítico
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {districtStats.map((item) => {
          const borderClass =
            item.health === 'critico'
              ? 'border-red-500/80 bg-red-950/20 shadow-[0_0_8px_rgba(239,68,68,0.25)]'
              : item.health === 'atencao'
              ? 'border-amber-500/80 bg-amber-950/20'
              : 'border-emerald-500/40 bg-slate-950/60';

          return (
            <div
              key={item.bairro}
              onClick={() => onSelectDistrict(item.bairro)}
              className={`p-2.5 border cursor-pointer hover:scale-[1.02] transition-all flex flex-col justify-between ${borderClass}`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-pixel text-xs text-slate-100 font-bold truncate">
                    {item.bairro}
                  </span>
                  {item.health === 'critico' ? (
                    <AlertOctagon size={14} className="text-red-400 animate-pulse flex-shrink-0" />
                  ) : item.health === 'atencao' ? (
                    <AlertTriangle size={14} className="text-amber-400 flex-shrink-0" />
                  ) : (
                    <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
                  )}
                </div>

                <div className="space-y-1 text-[11px] text-slate-400 font-mono">
                  <div className="flex justify-between">
                    <span>IoT Ativo:</span>
                    <strong className="text-slate-200">
                      {item.operationalEq}/{item.totalEq}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Agentes Ronda:</span>
                    <strong className="text-amber-300">{item.activeAgents}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Alertas:</span>
                    <strong
                      className={
                        item.activeAlerts > 0 ? 'text-red-400 font-bold' : 'text-slate-500'
                      }
                    >
                      {item.activeAlerts}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-800 text-[10px] text-sky-400 font-pixel text-center">
                FILTRAR REGIÃO
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
