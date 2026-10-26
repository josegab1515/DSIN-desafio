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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Total IoT */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 to-slate-950 p-3.5 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-md">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="font-mono text-[11px] font-bold tracking-wider text-cyan-400">TOTAL IoT</span>
          <div className="p-1.5 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
            <Activity size={14} />
          </div>
        </div>
        <div className="font-pixel text-xl md:text-2xl text-slate-100 font-bold my-0.5">
          {totalEquipments}
        </div>
        <div className="text-[10px] text-slate-400 font-sans">
          Dispositivos cadastrados
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500/50" />
      </div>

      {/* 2. Disponibilidade */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 to-slate-950 p-3.5 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-md">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="font-mono text-[11px] font-bold tracking-wider text-emerald-400">DISPONIBILIDADE</span>
          <div className="p-1.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
            <Percent size={14} />
          </div>
        </div>
        <div className="font-pixel text-xl md:text-2xl text-emerald-400 font-bold my-0.5">
          {availabilityPercentage}%
        </div>
        <div className="text-[10px] text-slate-400 font-sans">
          {operationalEquipments} operacionais ativos
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500/50" />
      </div>

      {/* 3. Indisponíveis */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 to-slate-950 p-3.5 border border-slate-800 hover:border-red-500/50 transition-all shadow-md">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="font-mono text-[11px] font-bold tracking-wider text-red-400">INDISPONÍVEIS</span>
          <div className="p-1.5 rounded-md bg-red-950/60 border border-red-500/30 text-red-400">
            <AlertOctagon size={14} />
          </div>
        </div>
        <div className="font-pixel text-xl md:text-2xl text-red-400 font-bold my-0.5">
          {unavailableEquipments}
        </div>
        <div className="text-[10px] text-slate-400 font-sans">
          Falhas, furtos ou desat.
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500/50" />
      </div>

      {/* 4. Agentes em Ronda */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 to-slate-950 p-3.5 border border-slate-800 hover:border-amber-500/50 transition-all shadow-md">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="font-mono text-[11px] font-bold tracking-wider text-amber-400">AGENTES CAMPO</span>
          <div className="p-1.5 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-400">
            <Users size={14} />
          </div>
        </div>
        <div className="font-pixel text-xl md:text-2xl text-amber-400 font-bold my-0.5">
          {activeAgents} <span className="text-xs text-slate-500 font-mono">/ {agents.length}</span>
        </div>
        <div className="text-[10px] text-slate-400 font-sans">
          Trânsito, GM e PM
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500/50" />
      </div>

      {/* 5. Manutenções Imediatas */}
      <div className={`relative overflow-hidden rounded-lg p-3.5 border transition-all shadow-md ${
        urgentMaintenance > 0
          ? 'bg-gradient-to-br from-amber-950/40 to-slate-950 border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
          : 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800'
      }`}>
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="font-mono text-[11px] font-bold tracking-wider text-amber-300">MANUT. URGENTE</span>
          <div className="p-1.5 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-400">
            <Wrench size={14} />
          </div>
        </div>
        <div className={`font-pixel text-xl md:text-2xl font-bold my-0.5 ${urgentMaintenance > 0 ? 'text-amber-400 animate-pulse' : 'text-slate-300'}`}>
          {urgentMaintenance}
        </div>
        <div className="text-[10px] text-slate-400 font-sans">
          {urgentMaintenance > 0 ? 'Ação técnica requerida' : 'Nenhuma pendente'}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500/50" />
      </div>

      {/* 6. Alertas Críticos */}
      <div className={`relative overflow-hidden rounded-lg p-3.5 border transition-all shadow-md ${
        criticalAlerts > 0
          ? 'bg-gradient-to-br from-red-950/50 to-slate-950 border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
          : 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800'
      }`}>
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="font-mono text-[11px] font-bold tracking-wider text-red-300">ALERTAS CRÍTICOS</span>
          <div className="p-1.5 rounded-md bg-red-950/60 border border-red-500/30 text-red-400">
            <ShieldAlert size={14} />
          </div>
        </div>
        <div className={`font-pixel text-xl md:text-2xl font-bold my-0.5 ${criticalAlerts > 0 ? 'text-red-400 font-bold' : 'text-slate-300'}`}>
          {criticalAlerts}
        </div>
        <div className="text-[10px] text-slate-400 font-sans">
          {criticalAlerts > 0 ? 'Exigem ação imediata' : 'Situação estável'}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500/50" />
      </div>
    </div>
  );
};
