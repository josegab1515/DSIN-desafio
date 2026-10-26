import React from 'react';
import { EquipmentType, EquipmentStatus } from '../../types/equipment';
import { CITY_DISTRICTS } from '../../data/mockData';
import { Filter, Eye, AlertTriangle, ShieldCheck, MapPin, Wrench } from 'lucide-react';

interface FilterBarProps {
  showEquipments: boolean;
  onToggleEquipments: () => void;
  showAgents: boolean;
  onToggleAgents: () => void;
  showAlerts: boolean;
  onToggleAlerts: () => void;
  highlightMaintenance: boolean;
  onToggleHighlightMaintenance: () => void;

  selectedDistrict: string;
  onChangeDistrict: (district: string) => void;
  selectedType: string;
  onChangeType: (type: string) => void;
  selectedStatus: string;
  onChangeStatus: (status: string) => void;
  selectedAgency: string;
  onChangeAgency: (agency: string) => void;

  totalEquipments: number;
  totalAgents: number;
  totalAlerts: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  showEquipments,
  onToggleEquipments,
  showAgents,
  onToggleAgents,
  showAlerts,
  onToggleAlerts,
  highlightMaintenance,
  onToggleHighlightMaintenance,

  selectedDistrict,
  onChangeDistrict,
  selectedType,
  onChangeType,
  selectedStatus,
  onChangeStatus,
  selectedAgency,
  onChangeAgency,

  totalEquipments,
  totalAgents,
  totalAlerts
}) => {
  return (
    <div className="pixel-box bg-slate-900/90 p-3 space-y-2.5">
      {/* Camadas Rápidas do Mapa */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-pixel text-slate-300">
          <Eye size={13} className="text-sky-400" />
          <span>CAMADAS VISÍVEIS NO MAPA:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={onToggleEquipments}
            className={`px-2 py-1 text-xs font-pixel flex items-center gap-1.5 border transition-all ${
              showEquipments
                ? 'bg-sky-950 border-sky-400 text-sky-200'
                : 'bg-slate-950 border-slate-700 text-slate-500'
            }`}
          >
            <span>📡 IoT ({totalEquipments})</span>
          </button>

          <button
            onClick={onToggleAgents}
            className={`px-2 py-1 text-xs font-pixel flex items-center gap-1.5 border transition-all ${
              showAgents
                ? 'bg-amber-950 border-amber-400 text-amber-200'
                : 'bg-slate-950 border-slate-700 text-slate-500'
            }`}
          >
            <span>👮 AGENTES ({totalAgents})</span>
          </button>

          <button
            onClick={onToggleAlerts}
            className={`px-2 py-1 text-xs font-pixel flex items-center gap-1.5 border transition-all ${
              showAlerts
                ? 'bg-red-950 border-red-400 text-red-200'
                : 'bg-slate-950 border-slate-700 text-slate-500'
            }`}
          >
            <span>⚠️ ALERTAS ({totalAlerts})</span>
          </button>

          <button
            onClick={onToggleHighlightMaintenance}
            className={`px-2 py-1 text-xs font-pixel flex items-center gap-1.5 border transition-all ${
              highlightMaintenance
                ? 'bg-yellow-950 border-yellow-400 text-yellow-200 shadow-[0_0_8px_rgba(234,179,8,0.5)]'
                : 'bg-slate-950 border-slate-700 text-slate-500'
            }`}
          >
            <Wrench size={12} className={highlightMaintenance ? 'text-yellow-400' : ''} />
            <span>DESTAQUE MANUTENÇÃO</span>
          </button>
        </div>
      </div>

      {/* Dropdown Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div>
          <label className="block text-[10px] text-slate-400 mb-0.5 font-hud">BAIRRO / REGIÃO</label>
          <select
            value={selectedDistrict}
            onChange={(e) => onChangeDistrict(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-200"
          >
            <option value="all">Todos os Bairros</option>
            {CITY_DISTRICTS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-slate-400 mb-0.5 font-hud">TIPO DE DISPOSITIVO</label>
          <select
            value={selectedType}
            onChange={(e) => onChangeType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-200"
          >
            <option value="all">Todos os Tipos</option>
            <option value="radar_velocidade">Radares de Velocidade</option>
            <option value="radar_semaforo">Radares de Semáforo</option>
            <option value="camera_monitoramento">Câmeras de Monitoramento</option>
            <option value="balanca_caminhao">Balanças de Caminhão</option>
            <option value="patinete_eletrico">Patinetes Elétricos</option>
            <option value="viatura_gm">Viaturas Guarda Municipal</option>
            <option value="viatura_pm">Viaturas Polícia Militar</option>
            <option value="moto_transito">Motos de Trânsito</option>
            <option value="drone_vigilancia">Drones de Vigilância</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-slate-400 mb-0.5 font-hud">SITUAÇÃO</label>
          <select
            value={selectedStatus}
            onChange={(e) => onChangeStatus(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-200"
          >
            <option value="all">Todas as Situações</option>
            <option value="operacional">Operacional</option>
            <option value="mau_funcionamento">Mau Funcionamento</option>
            <option value="em_manutencao">Em Manutenção</option>
            <option value="furtado">Furtado / Vandalizado</option>
            <option value="ainda_nao_instalado">Ainda Não Instalado</option>
            <option value="desativado">Desativado</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-slate-400 mb-0.5 font-hud">ÓRGÃO RESPONSÁVEL</label>
          <select
            value={selectedAgency}
            onChange={(e) => onChangeAgency(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-200"
          >
            <option value="all">Todos os Órgãos</option>
            <option value="Secretaria de Trânsito">Secretaria de Trânsito</option>
            <option value="Guarda Municipal">Guarda Municipal</option>
            <option value="Polícia Militar">Polícia Militar</option>
            <option value="Mobilidade Urbana (Parcerias)">Mobilidade Urbana</option>
          </select>
        </div>
      </div>
    </div>
  );
};
