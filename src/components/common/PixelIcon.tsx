import React from 'react';
import { EquipmentType } from '../../types/equipment';

interface PixelIconProps {
  type: EquipmentType | 'agente_transito' | 'guarda_municipal' | 'policia_militar' | 'prometheus_logo' | 'alerta';
  size?: number;
  className?: string;
  color?: string;
}

export const PixelIcon: React.FC<PixelIconProps> = ({
  type,
  size = 24,
  className = '',
  color
}) => {
  const pixelSize = size;

  switch (type) {
    case 'radar_velocidade':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="7" y="3" width="10" height="9" fill={color || "#38bdf8"} />
          <rect x="9" y="5" width="6" height="5" fill="#0f172a" />
          <rect x="11" y="7" width="2" height="2" fill="#ef4444" />
          <rect x="11" y="12" width="2" height="9" fill="#94a3b8" />
          <rect x="8" y="21" width="8" height="2" fill="#64748b" />
          <rect x="3" y="6" width="3" height="3" fill="#facc15" />
        </svg>
      );

    case 'radar_semaforo':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="8" y="2" width="8" height="15" fill="#334155" />
          <rect x="10" y="4" width="4" height="3" fill="#ef4444" />
          <rect x="10" y="8" width="4" height="3" fill="#eab308" />
          <rect x="10" y="12" width="4" height="3" fill="#22c55e" />
          <rect x="11" y="17" width="2" height="6" fill="#94a3b8" />
        </svg>
      );

    case 'radar_conversao':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="4" y="4" width="16" height="16" fill="#0f172a" stroke={color || "#f97316"} strokeWidth="2" />
          <rect x="8" y="10" width="3" height="6" fill="#f97316" />
          <rect x="11" y="8" width="5" height="3" fill="#f97316" />
          <rect x="14" y="11" width="3" height="5" fill="#f97316" />
          <line x1="6" y1="18" x2="18" y2="6" stroke="#ef4444" strokeWidth="2" />
        </svg>
      );

    case 'camera_monitoramento':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="5" y="6" width="12" height="7" fill={color || "#38bdf8"} />
          <polygon points="17,7 21,4 21,15 17,12" fill={color || "#0284c7"} />
          <rect x="7" y="8" width="3" height="3" fill="#ef4444" />
          <rect x="9" y="13" width="3" height="6" fill="#64748b" />
          <rect x="7" y="19" width="7" height="2" fill="#475569" />
        </svg>
      );

    case 'balanca_caminhao':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="16" width="18" height="4" fill="#64748b" />
          <rect x="6" y="8" width="12" height="6" fill={color || "#eab308"} />
          <rect x="14" y="9" width="3" height="3" fill="#0f172a" />
          <rect x="6" y="18" width="3" height="3" fill="#000" />
          <rect x="15" y="18" width="3" height="3" fill="#000" />
        </svg>
      );

    case 'veiculo_autonomo_rotativo':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="10" y="3" width="4" height="3" fill="#06b6d4" />
          <rect x="4" y="9" width="16" height="7" fill={color || "#38bdf8"} />
          <rect x="6" y="6" width="12" height="4" fill="#0284c7" />
          <rect x="6" y="16" width="4" height="4" fill="#0f172a" />
          <rect x="14" y="16" width="4" height="4" fill="#0f172a" />
          <rect x="18" y="11" width="2" height="2" fill="#facc15" />
        </svg>
      );

    case 'cancela_automatizada':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="4" y="8" width="5" height="13" fill="#64748b" />
          <rect x="9" y="9" width="12" height="3" fill="#ef4444" />
          <rect x="12" y="9" width="3" height="3" fill="#ffffff" />
          <rect x="18" y="9" width="3" height="3" fill="#ffffff" />
          <circle cx="6.5" cy="11.5" r="1.5" fill="#22c55e" />
        </svg>
      );

    case 'veiculo_transporte':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="7" width="18" height="10" fill={color || "#facc15"} />
          <rect x="6" y="9" width="4" height="3" fill="#0f172a" />
          <rect x="12" y="9" width="4" height="3" fill="#0f172a" />
          <rect x="5" y="17" width="4" height="4" fill="#1e293b" />
          <rect x="15" y="17" width="4" height="4" fill="#1e293b" />
        </svg>
      );

    case 'totem_rotativo':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="7" y="4" width="10" height="17" fill="#334155" />
          <rect x="9" y="6" width="6" height="5" fill="#38bdf8" />
          <rect x="10" y="13" width="4" height="2" fill="#22c55e" />
          <rect x="9" y="17" width="6" height="2" fill="#1e293b" />
        </svg>
      );

    case 'patinete_eletrico':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="6" y="17" width="12" height="2" fill={color || "#22c55e"} />
          <rect x="15" y="5" width="2" height="13" fill="#64748b" />
          <rect x="13" y="4" width="6" height="2" fill="#38bdf8" />
          <circle cx="6" cy="18" r="2.5" fill="#0f172a" stroke="#22c55e" strokeWidth="1" />
          <circle cx="17" cy="18" r="2.5" fill="#0f172a" stroke="#22c55e" strokeWidth="1" />
        </svg>
      );

    case 'moto_transito':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="5" cy="16" r="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="19" cy="16" r="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <polygon points="5,16 11,10 16,10 19,16 13,16" fill={color || "#facc15"} />
          <rect x="12" y="7" width="4" height="3" fill="#0284c7" />
        </svg>
      );

    case 'viatura_gm':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="8" width="18" height="8" fill="#1e3a8a" />
          <rect x="6" y="5" width="11" height="4" fill="#2563eb" />
          <rect x="10" y="3" width="3" height="2" fill="#ef4444" />
          <rect x="5" y="16" width="4" height="4" fill="#0f172a" />
          <rect x="15" y="16" width="4" height="4" fill="#0f172a" />
          <rect x="9" y="10" width="6" height="3" fill="#ffffff" />
        </svg>
      );

    case 'viatura_pm':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="8" width="18" height="8" fill="#334155" />
          <rect x="6" y="5" width="11" height="4" fill="#94a3b8" />
          <rect x="9" y="3" width="2" height="2" fill="#ef4444" />
          <rect x="13" y="3" width="2" height="2" fill="#38bdf8" />
          <rect x="5" y="16" width="4" height="4" fill="#0f172a" />
          <rect x="15" y="16" width="4" height="4" fill="#0f172a" />
        </svg>
      );

    case 'drone_vigilancia':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="9" y="9" width="6" height="6" fill={color || "#a855f7"} />
          <rect x="11" y="11" width="2" height="2" fill="#22c55e" />
          <line x1="4" y1="5" x2="10" y2="10" stroke="#94a3b8" strokeWidth="2" />
          <line x1="20" y1="5" x2="14" y2="10" stroke="#94a3b8" strokeWidth="2" />
          <line x1="4" y1="19" x2="10" y2="14" stroke="#94a3b8" strokeWidth="2" />
          <line x1="20" y1="19" x2="14" y2="14" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="4" cy="5" r="2" fill="#38bdf8" />
          <circle cx="20" cy="5" r="2" fill="#38bdf8" />
          <circle cx="4" cy="19" r="2" fill="#38bdf8" />
          <circle cx="20" cy="19" r="2" fill="#38bdf8" />
        </svg>
      );

    case 'agente_transito':
    case 'guarda_municipal':
    case 'policia_militar':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="8" y="2" width="8" height="5" fill="#f59e0b" />
          <rect x="9" y="7" width="6" height="6" fill="#fed7aa" />
          <rect x="10" y="9" width="2" height="2" fill="#0f172a" />
          <rect x="14" y="9" width="2" height="2" fill="#0f172a" />
          <rect x="6" y="13" width="12" height="8" fill={type === 'guarda_municipal' ? '#1e3a8a' : type === 'policia_militar' ? '#334155' : '#0284c7'} />
          <rect x="10" y="14" width="4" height="2" fill="#facc15" />
        </svg>
      );

    case 'prometheus_logo':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          {/* Pixel flame core */}
          <rect x="10" y="2" width="4" height="4" fill="#ef4444" />
          <rect x="8" y="6" width="8" height="5" fill="#f97316" />
          <rect x="6" y="11" width="12" height="7" fill="#f59e0b" />
          <rect x="9" y="9" width="6" height="6" fill="#fef08a" />
          <rect x="10" y="11" width="4" height="4" fill="#ffffff" />
          <rect x="5" y="18" width="14" height="3" fill="#1e293b" />
        </svg>
      );

    case 'alerta':
    default:
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none" className={className}>
          <polygon points="12,2 22,20 2,20" fill="#ef4444" />
          <rect x="11" y="8" width="2" height="6" fill="#ffffff" />
          <rect x="11" y="16" width="2" height="2" fill="#ffffff" />
        </svg>
      );
  }
};
