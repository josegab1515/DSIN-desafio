import React from 'react';
import { Equipment } from '../../types/equipment';
import { Agent } from '../../types/agent';
import { IncidentAlert } from '../../types/alert';
import {
  Activity,
  CheckCircle2,
  AlertOctagon,
  Users,
  Wrench,
  Percent,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

interface KpiSummaryProps {
  equipments: Equipment[];
  agents: Agent[];
  alerts: IncidentAlert[];
}

export const KpiSummary: React.FC<KpiSummaryProps> = ({
  equipments,
  agents,
  alerts
}) => {
  const totalEquipments = equipments.length;

  const operationalEquipments = equipments.filter(
    (e) => e.situacao === 'operacional'
  ).length;

  const unavailableEquipments = equipments.filter(
    (e) =>
      e.situacao === 'mau_funcionamento' ||
      e.situacao === 'furtado' ||
      e.situacao === 'em_manutencao' ||
      e.situacao === 'desativado'
  ).length;

  const availabilityPercentage =
    totalEquipments > 0
      ? ((operationalEquipments / totalEquipments) * 100).toFixed(1)
      : '0.0';

  const activeAgents = agents.filter(
    (a) => a.status === 'em_patrulha' || a.status === 'em_atendimento'
  ).length;

  const urgentMaintenance = equipments.filter(
    (e) => e.necessidadeManutencao === 'imediata'
  ).length;

  const criticalAlerts = alerts.filter(
    (a) => !a.resolvido && a.severidade === 'critico'
  ).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
      {/* Total de Equipamentos */}
      <div className="pixel-box bg-slate-900/80 p-3 border-slate-800">
        <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
          <span className="font-hud font-semibold">TOTAL IoT</span>
          <Activity size={14} className="text-sky-400" />
        </div>
        <div className="font-pixel text-xl text-sky-400">{totalEquipments}</div>
        <div className="text-[10px] text-slate-400 mt-1 font-mono">Dispositivos em rede</div>
      </div>

      {/* Disponibilidade % */}
      <div className="pixel-box bg-slate-900/80 p-3 border-slate-800">
        <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
          <span className="font-hud font-semibold">DISPONIBILIDADE</span>
          <Percent size={14} className="text-emerald-400" />
        </div>
        <div className="font-pixel text-xl text-emerald-400">{availabilityPercentage}%</div>
        <div className="text-[10px] text-emerald-400/80 mt-1 font-mono">
          {operationalEquipments} operacionais
        </div>
      </div>

      {/* Indisponíveis / Anomalia */}
      <div className="pixel-box bg-slate-900/80 p-3 border-slate-800">
        <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
          <span className="font-hud font-semibold">INDISPONÍVEIS</span>
          <AlertOctagon size={14} className="text-red-400" />
        </div>
        <div className="font-pixel text-xl text-red-400">{unavailableEquipments}</div>
        <div className="text-[10px] text-slate-400 mt-1 font-mono">Falhas, furtos ou desat.</div>
      </div>

      {/* Agentes em Campo */}
      <div className="pixel-box bg-slate-900/80 p-3 border-slate-800">
        <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
          <span className="font-hud font-semibold">AGENTES EM CAMPO</span>
          <Users size={14} className="text-amber-400" />
        </div>
        <div className="font-pixel text-xl text-amber-400">
          {activeAgents} <span className="text-xs text-slate-500 font-mono">/ {agents.length}</span>
        </div>
        <div className="text-[10px] text-slate-400 mt-1 font-mono">Trânsito, GM e PM</div>
      </div>

      {/* Manutenções Imediatas */}
      <div className={`pixel-box p-3 ${urgentMaintenance > 0 ? 'pixel-box-alert bg-red-950/20' : 'bg-slate-900/80 border-slate-800'}`}>
        <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
          <span className="font-hud font-semibold">MANUT. IMEDIATA</span>
          <Wrench size={14} className="text-amber-400" />
        </div>
        <div className={`font-pixel text-xl ${urgentMaintenance > 0 ? 'text-red-400 animate-pulse' : 'text-slate-300'}`}>
          {urgentMaintenance}
        </div>
        <div className="text-[10px] text-slate-400 mt-1 font-mono">Intervenção urgente</div>
      </div>

      {/* Alertas Críticos Ativos */}
      <div className={`pixel-box p-3 ${criticalAlerts > 0 ? 'pixel-box-alert bg-red-950/30' : 'bg-slate-900/80 border-slate-800'}`}>
        <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
          <span className="font-hud font-semibold">ALERTAS CRÍTICOS</span>
          <ShieldAlert size={14} className="text-red-400" />
        </div>
        <div className={`font-pixel text-xl ${criticalAlerts > 0 ? 'text-red-400 font-bold' : 'text-slate-300'}`}>
          {criticalAlerts}
        </div>
        <div className="text-[10px] text-slate-400 mt-1 font-mono">Exigem ação imediata</div>
      </div>
    </div>
  );
};
