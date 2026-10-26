import React from 'react';
import { EquipmentType } from '../../types/equipment';

export type AllIconTypes =
  | EquipmentType
  | 'agente_transito'
  | 'guarda_municipal'
  | 'policia_militar'
  | 'prometheus_logo'
  | 'alerta';

/**
 * Retorna o SVG bruto em formato string para ser embutido diretamente
 * em markers do Leaflet (L.divIcon) ou renders dinâmicos.
 */
export function getPixelSvgString(type: AllIconTypes, color?: string, size: number = 24): string {
  switch (type) {
    case 'radar_velocidade':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Base e Poste de Aço -->
          <rect x="11" y="11" width="2" height="11" fill="#475569" />
          <rect x="9" y="21" width="6" height="2" fill="#334155" />
          <rect x="10" y="20" width="4" height="1" fill="#64748b" />
          <!-- Caixa do Radar -->
          <rect x="6" y="2" width="12" height="10" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
          <!-- Viseira / Parasol -->
          <rect x="5" y="1" width="14" height="2" fill="#0284c7" />
          <!-- Lente Principal da Câmera -->
          <rect x="8" y="4" width="4" height="4" fill="#1e293b" />
          <rect x="9" y="5" width="2" height="2" fill="#00f0ff" />
          <!-- Flash Estroboscópico de Velocidade -->
          <rect x="13" y="4" width="3" height="3" fill="#facc15" />
          <rect x="14" y="5" width="1" height="1" fill="#ffffff" />
          <!-- Sensor Laser de Velocidade -->
          <rect x="9" y="9" width="6" height="2" fill="#ef4444" />
        </svg>
      `;

    case 'radar_semaforo':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Carcaça do Semáforo com Viseiras -->
          <rect x="7" y="1" width="10" height="17" fill="#0f172a" stroke="#eab308" stroke-width="1" />
          <!-- Poste Metálico -->
          <rect x="11" y="18" width="2" height="5" fill="#64748b" />
          <!-- Lente Vermelha (Pare) -->
          <rect x="9" y="3" width="6" height="3" fill="#ef4444" />
          <rect x="11" y="4" width="2" height="1" fill="#fca5a5" />
          <!-- Lente Amarela (Atenção) -->
          <rect x="9" y="8" width="6" height="3" fill="#eab308" />
          <rect x="11" y="9" width="2" height="1" fill="#fef08a" />
          <!-- Lente Verde (Siga) -->
          <rect x="9" y="13" width="6" height="3" fill="#22c55e" />
          <rect x="11" y="14" width="2" height="1" fill="#86efac" />
          <!-- Aba Protetora Superior -->
          <rect x="6" y="0" width="12" height="1" fill="#ca8a04" />
        </svg>
      `;

    case 'radar_conversao':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Placa de Trânsito Octogonal/Retangular -->
          <rect x="3" y="2" width="18" height="17" fill="#0f172a" stroke="#f97316" stroke-width="1.5" />
          <rect x="11" y="19" width="2" height="4" fill="#64748b" />
          <!-- Seta Curva Pixelada de Retorno -->
          <rect x="6" y="10" width="3" height="6" fill="#f97316" />
          <rect x="8" y="7" width="8" height="3" fill="#f97316" />
          <rect x="14" y="10" width="3" height="5" fill="#f97316" />
          <!-- Faixa Vermelha de Proibido -->
          <line x1="5" y1="17" x2="19" y2="4" stroke="#ef4444" stroke-width="2.5" />
        </svg>
      `;

    case 'camera_monitoramento':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Suporte de Parede / Poste -->
          <rect x="3" y="14" width="3" height="7" fill="#64748b" />
          <rect x="6" y="16" width="5" height="2" fill="#475569" />
          <!-- Corpo da Câmera Bullet -->
          <polygon points="9,7 18,5 21,7 18,15 9,13" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
          <!-- Lente Frontal 4K DarkFighter -->
          <rect x="18" y="6" width="3" height="8" fill="#1e293b" />
          <rect x="19" y="8" width="2" height="4" fill="#00f0ff" />
          <!-- LED Vermelho de Gravação Ativa -->
          <circle cx="16" cy="13" r="1.5" fill="#ef4444" />
          <!-- Viseira Superior Antirreflexo -->
          <polygon points="7,5 21,3 21,5 8,7" fill="#0284c7" />
        </svg>
      `;

    case 'viatura_pm':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Sirene / Giroflex Bicolor no Teto -->
          <rect x="8" y="3" width="3" height="2" fill="#ef4444" />
          <rect x="11" y="3" width="2" height="2" fill="#ffffff" />
          <rect x="13" y="3" width="3" height="2" fill="#00f0ff" />
          <!-- Teto e Janelas -->
          <polygon points="6,9 9,5 15,5 18,9" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8" />
          <rect x="10" y="6" width="4" height="3" fill="#00f0ff" opacity="0.7" />
          <!-- Carroceria Militar (Cinza/Preto com Faixa) -->
          <rect x="2" y="9" width="20" height="7" fill="#1e293b" />
          <rect x="2" y="12" width="20" height="2" fill="#e2e8f0" />
          <!-- Faróis -->
          <rect x="20" y="10" width="2" height="3" fill="#fef08a" />
          <rect x="2" y="10" width="2" height="2" fill="#ef4444" />
          <!-- Rodas com Calotas -->
          <circle cx="6" cy="17" r="2.5" fill="#000" stroke="#94a3b8" stroke-width="1" />
          <circle cx="17" cy="17" r="2.5" fill="#000" stroke="#94a3b8" stroke-width="1" />
        </svg>
      `;

    case 'viatura_gm':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Giroflex Azul da Guarda Municipal -->
          <rect x="8" y="3" width="8" height="2" fill="#2563eb" />
          <rect x="11" y="3" width="2" height="2" fill="#60a5fa" />
          <!-- Teto e Cabine SUV -->
          <polygon points="5,9 8,5 16,5 19,9" fill="#0f172a" stroke="#2563eb" stroke-width="0.8" />
          <rect x="9" y="6" width="6" height="3" fill="#38bdf8" opacity="0.7" />
          <!-- Carroceria Azul e Branca GCM -->
          <rect x="2" y="9" width="20" height="7" fill="#1e3a8a" />
          <rect x="2" y="12" width="20" height="2" fill="#ffffff" />
          <!-- Brasão / Estrela Dourada GCM -->
          <rect x="11" y="10" width="2" height="2" fill="#facc15" />
          <!-- Faróis e Rodas -->
          <rect x="20" y="10" width="2" height="3" fill="#fef08a" />
          <circle cx="6" cy="17" r="2.5" fill="#000" stroke="#60a5fa" stroke-width="1" />
          <circle cx="17" cy="17" r="2.5" fill="#000" stroke="#60a5fa" stroke-width="1" />
        </svg>
      `;

    case 'moto_transito':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Capacete do Agente de Trânsito -->
          <circle cx="13" cy="5" r="3" fill="#facc15" />
          <rect x="13" y="5" width="3" height="1.5" fill="#0f172a" />
          <!-- Corpo do Agente com Colete Reflexivo -->
          <rect x="11" y="8" width="4" height="5" fill="#0284c7" />
          <rect x="11" y="10" width="4" height="2" fill="#facc15" />
          <!-- Guidão e Farol da Moto -->
          <rect x="16" y="8" width="2" height="4" fill="#38bdf8" />
          <rect x="18" y="10" width="1" height="2" fill="#fef08a" />
          <!-- Chassi da Moto (Rally Trânsito) -->
          <polygon points="6,15 12,12 17,14 14,16" fill="#f59e0b" />
          <!-- Roda Dianteira e Traseira -->
          <circle cx="5" cy="17" r="3" fill="#000" stroke="#94a3b8" stroke-width="1" />
          <circle cx="18" cy="17" r="3" fill="#000" stroke="#94a3b8" stroke-width="1" />
        </svg>
      `;

    case 'patinete_eletrico':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Guidão com Farol LED e Display IoT -->
          <rect x="13" y="3" width="7" height="2" fill="#22c55e" />
          <circle cx="18" cy="4" r="1" fill="#ffffff" />
          <!-- Haste Metálica Principal -->
          <line x1="16" y1="4" x2="8" y2="17" stroke="#475569" stroke-width="2" />
          <!-- Bateria IoT no Tubo -->
          <rect x="11" y="8" width="3" height="5" fill="#22c55e" />
          <!-- Deck / Prancha com LED Verde -->
          <rect x="4" y="17" width="15" height="2.5" fill="#15803d" />
          <rect x="8" y="18" width="6" height="1" fill="#86efac" />
          <!-- Roda Traseira e Dianteira -->
          <circle cx="5" cy="18.5" r="2.5" fill="#000" stroke="#22c55e" stroke-width="1" />
          <circle cx="18" cy="18.5" r="2.5" fill="#000" stroke="#22c55e" stroke-width="1" />
        </svg>
      `;

    case 'drone_vigilancia':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Corpo Central do Drone -->
          <rect x="9" y="9" width="6" height="6" fill="#0f172a" stroke="#a855f7" stroke-width="1" />
          <!-- Gimbal da Câmera com LED -->
          <circle cx="12" cy="12" r="1.5" fill="#22c55e" />
          <!-- 4 Braços em X -->
          <line x1="4" y1="4" x2="9" y2="9" stroke="#64748b" stroke-width="1.8" />
          <line x1="20" y1="4" x2="15" y2="9" stroke="#64748b" stroke-width="1.8" />
          <line x1="4" y1="20" x2="9" y2="15" stroke="#64748b" stroke-width="1.8" />
          <line x1="20" y1="20" x2="15" y2="15" stroke="#64748b" stroke-width="1.8" />
          <!-- 4 Rotores / Hélices em Rotação -->
          <ellipse cx="4" cy="4" rx="3.5" ry="1.5" fill="#a855f7" opacity="0.8" />
          <ellipse cx="20" cy="4" rx="3.5" ry="1.5" fill="#a855f7" opacity="0.8" />
          <ellipse cx="4" cy="20" rx="3.5" ry="1.5" fill="#a855f7" opacity="0.8" />
          <ellipse cx="20" cy="20" rx="3.5" ry="1.5" fill="#a855f7" opacity="0.8" />
        </svg>
      `;

    case 'balanca_caminhao':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Plataforma Rodoviária no Asfalto -->
          <rect x="2" y="17" width="20" height="4" fill="#334155" stroke="#eab308" stroke-width="1" />
          <rect x="4" y="18" width="16" height="1" fill="#facc15" />
          <!-- Cabine do Caminhão Pesado -->
          <rect x="14" y="7" width="6" height="9" fill="#d97706" />
          <rect x="16" y="8" width="4" height="4" fill="#38bdf8" />
          <!-- Baú / Reboque de Carga -->
          <rect x="4" y="5" width="10" height="11" fill="#94a3b8" />
          <!-- Rodas Duplas -->
          <circle cx="7" cy="17" r="2" fill="#000" />
          <circle cx="17" cy="17" r="2" fill="#000" />
        </svg>
      `;

    case 'cancela_automatizada':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Gabinete do Motor com Luz de Status -->
          <rect x="3" y="8" width="6" height="14" fill="#0f172a" stroke="#64748b" stroke-width="1" />
          <circle cx="6" cy="11" r="1.5" fill="#22c55e" />
          <!-- Braço Articulado com Faixas Zebradas Vermelho/Branco -->
          <rect x="8" y="9" width="14" height="3" fill="#ef4444" />
          <rect x="11" y="9" width="2.5" height="3" fill="#ffffff" />
          <rect x="16" y="9" width="2.5" height="3" fill="#ffffff" />
        </svg>
      `;

    case 'totem_rotativo':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Painel Solar no Topo -->
          <rect x="6" y="2" width="12" height="2" fill="#0284c7" />
          <!-- Gabinete do Totem DigiSat -->
          <rect x="7" y="4" width="10" height="18" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
          <!-- Tela Touchscreen Interativa -->
          <rect x="9" y="6" width="6" height="5" fill="#00f0ff" opacity="0.8" />
          <!-- Slot de Cartão / Leitor QR Code Pix -->
          <rect x="9" y="13" width="6" height="2" fill="#22c55e" />
          <!-- Saída de Comprovante de Estacionamento -->
          <rect x="10" y="17" width="4" height="1" fill="#ffffff" />
        </svg>
      `;

    case 'veiculo_transporte':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Van Escolar / Transporte -->
          <rect x="3" y="6" width="18" height="11" fill="#facc15" stroke="#ca8a04" stroke-width="1" />
          <!-- Janelas e Faixa Escolar -->
          <rect x="5" y="8" width="4" height="3" fill="#1e293b" />
          <rect x="11" y="8" width="4" height="3" fill="#1e293b" />
          <rect x="17" y="8" width="3" height="3" fill="#1e293b" />
          <rect x="3" y="12" width="18" height="2" fill="#0f172a" />
          <!-- Rodas -->
          <circle cx="7" cy="18" r="2.5" fill="#000" stroke="#94a3b8" stroke-width="1" />
          <circle cx="17" cy="18" r="2.5" fill="#000" stroke="#94a3b8" stroke-width="1" />
        </svg>
      `;

    case 'veiculo_autonomo_rotativo':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Sensor LiDAR Giratório no Teto -->
          <rect x="10" y="2" width="4" height="3" fill="#00f0ff" />
          <!-- Chassi do Veículo Autônomo -->
          <polygon points="5,9 8,5 16,5 19,9" fill="#0f172a" stroke="#00f0ff" stroke-width="1" />
          <rect x="2" y="9" width="20" height="7" fill="#0284c7" />
          <circle cx="6" cy="17" r="2.5" fill="#000" stroke="#38bdf8" stroke-width="1" />
          <circle cx="17" cy="17" r="2.5" fill="#000" stroke="#38bdf8" stroke-width="1" />
        </svg>
      `;

    case 'policia_militar':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Boina / Cap Militar -->
          <rect x="7" y="2" width="10" height="4" fill="#334155" />
          <rect x="6" y="5" width="12" height="1.5" fill="#0f172a" />
          <!-- Rosto do Policial Militar -->
          <rect x="8" y="6.5" width="8" height="6.5" fill="#fed7aa" />
          <rect x="9" y="8" width="2" height="2" fill="#0f172a" />
          <rect x="13" y="8" width="2" height="2" fill="#0f172a" />
          <!-- Farda Tática com Distintivo Dourado -->
          <rect x="6" y="13" width="12" height="9" fill="#1e293b" />
          <rect x="10" y="14" width="4" height="4" fill="#facc15" />
        </svg>
      `;

    case 'guarda_municipal':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Quepe Azul-Marinho da GCM -->
          <rect x="7" y="2" width="10" height="4" fill="#1e3a8a" />
          <rect x="6" y="5" width="12" height="1.5" fill="#0f172a" />
          <!-- Rosto da Guarda Municipal -->
          <rect x="8" y="6.5" width="8" height="6.5" fill="#fed7aa" />
          <rect x="9" y="8" width="2" height="2" fill="#0f172a" />
          <rect x="13" y="8" width="2" height="2" fill="#0f172a" />
          <!-- Farda Azul com Brasão Dourado -->
          <rect x="6" y="13" width="12" height="9" fill="#1e40af" />
          <rect x="10" y="14" width="4" height="4" fill="#facc15" />
        </svg>
      `;

    case 'agente_transito':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Boné Amarelo/Azul de Trânsito -->
          <rect x="7" y="2" width="10" height="4" fill="#0284c7" />
          <rect x="6" y="5" width="12" height="1.5" fill="#facc15" />
          <!-- Rosto do Agente -->
          <rect x="8" y="6.5" width="8" height="6.5" fill="#fed7aa" />
          <rect x="9" y="8" width="2" height="2" fill="#0f172a" />
          <rect x="13" y="8" width="2" height="2" fill="#0f172a" />
          <!-- Colete Amarelo Fluorescente -->
          <rect x="6" y="13" width="12" height="9" fill="#facc15" />
          <rect x="9" y="13" width="6" height="9" fill="#0284c7" />
        </svg>
      `;

    case 'prometheus_logo':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <!-- Fogo Prometeico em Pixel Art Vibrante -->
          <rect x="11" y="2" width="2" height="3" fill="#ef4444" />
          <rect x="10" y="5" width="4" height="3" fill="#f97316" />
          <rect x="8" y="8" width="8" height="5" fill="#f59e0b" />
          <rect x="9" y="10" width="6" height="5" fill="#fef08a" />
          <rect x="10" y="12" width="4" height="3" fill="#ffffff" />
          <rect x="6" y="17" width="12" height="4" fill="#0f172a" stroke="#f97316" stroke-width="1" />
        </svg>
      `;

    case 'alerta':
    default:
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 22,20 2,20" fill="#ef4444" stroke="#ffffff" stroke-width="1" />
          <rect x="11" y="8" width="2" height="6" fill="#ffffff" />
          <rect x="11" y="16" width="2" height="2" fill="#ffffff" />
        </svg>
      `;
  }
}

interface PixelIconProps {
  type: AllIconTypes;
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
  const svgHtml = getPixelSvgString(type, color, size);
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
};
