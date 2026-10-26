import React from 'react';
import { EquipmentStatus, MaintenanceNeed } from '../../types/equipment';
import { AgentStatus } from '../../types/agent';
import { AlertSeverity } from '../../types/alert';

interface PixelBadgeProps {
  type?: 'status' | 'manutencao' | 'agent' | 'severidade' | 'custom';
  value: EquipmentStatus | MaintenanceNeed | AgentStatus | AlertSeverity | string;
  className?: string;
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  type = 'status',
  value,
  className = ''
}) => {
  let colorClass = 'pixel-badge-gray';
  let label = String(value);

  // Status de Equipamento
  if (value === 'operacional') {
    colorClass = 'pixel-badge-green';
    label = 'Operacional';
  } else if (value === 'mau_funcionamento') {
    colorClass = 'pixel-badge-yellow';
    label = 'Falha / Anomalia';
  } else if (value === 'em_manutencao') {
    colorClass = 'pixel-badge-purple';
    label = 'Em Manutenção';
  } else if (value === 'furtado') {
    colorClass = 'pixel-badge-red pulse-critical';
    label = 'Furtado / Vandalizado';
  } else if (value === 'ainda_nao_instalado') {
    colorClass = 'pixel-badge-gray';
    label = 'Não Instalado';
  } else if (value === 'desativado') {
    colorClass = 'pixel-badge-gray';
    label = 'Desativado';
  }

  // Necessidade de Manutenção
  if (value === 'imediata') {
    colorClass = 'pixel-badge-red pulse-critical';
    label = 'Manutenção Imediata';
  } else if (value === 'agendada_periodica') {
    colorClass = 'pixel-badge-yellow';
    label = 'Agendada / Periódica';
  } else if (value === 'nenhuma') {
    colorClass = 'pixel-badge-green';
    label = 'Em Dia';
  }

  // Agentes
  if (value === 'em_patrulha') {
    colorClass = 'pixel-badge-green';
    label = 'Em Patrulha';
  } else if (value === 'em_atendimento') {
    colorClass = 'pixel-badge-yellow';
    label = 'Em Atendimento';
  } else if (value === 'disponivel') {
    colorClass = 'pixel-badge-green';
    label = 'Disponível';
  } else if (value === 'folga') {
    colorClass = 'pixel-badge-gray';
    label = 'Em Folga';
  }

  // Severidade de Alerta
  if (value === 'critico') {
    colorClass = 'pixel-badge-red pulse-critical';
    label = 'CRÍTICO';
  } else if (value === 'alerta') {
    colorClass = 'pixel-badge-yellow';
    label = 'ALERTA';
  } else if (value === 'informativo') {
    colorClass = 'pixel-badge-gray';
    label = 'INFO';
  }

  return (
    <span className={`pixel-badge ${colorClass} ${className}`}>
      <span className="w-1.5 h-1.5 bg-current inline-block" />
      {label}
    </span>
  );
};
