import React, { useState, useMemo } from 'react';
import { Equipment, EquipmentType, EquipmentStatus, MaintenanceNeed } from '../../types/equipment';
import { PixelBadge } from '../common/PixelBadge';
import { PixelIcon } from '../common/PixelIcon';
import { PixelButton } from '../common/PixelButton';
import { CITY_DISTRICTS } from '../../data/mockData';
import {
  Search,
  Plus,
  Filter,
  Wrench,
  AlertTriangle,
  Eye,
  Trash2,
  Edit,
  Activity,
  Layers
} from 'lucide-react';

interface EquipmentListProps {
  equipments: Equipment[];
  onSelectEquipment: (equipment: Equipment) => void;
  onEditEquipment: (equipment: Equipment) => void;
  onDeleteEquipment: (id: string) => void;
  onAddNew: () => void;
}

export const EquipmentList: React.FC<EquipmentListProps> = ({
  equipments,
  onSelectEquipment,
  onEditEquipment,
  onDeleteEquipment,
  onAddNew
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [onlyMaintenance, setOnlyMaintenance] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredEquipments = useMemo(() => {
    return equipments.filter((eq) => {
      // Busca textual
      const matchesSearch =
        searchTerm === '' ||
        eq.numeroSerie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.localizacao.rua.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.localizacao.referencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.localizacao.bairro.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por tipo
      const matchesType = typeFilter === 'all' || eq.tipo === typeFilter;

      // Filtro por situação
      const matchesStatus = statusFilter === 'all' || eq.situacao === statusFilter;

      // Filtro por bairro
      const matchesDistrict = districtFilter === 'all' || eq.localizacao.bairro === districtFilter;

      // Filtro de manutenção
      const matchesMaintenance =
        !onlyMaintenance ||
        eq.necessidadeManutencao === 'imediata' ||
        eq.necessidadeManutencao === 'agendada_periodica';

      return matchesSearch && matchesType && matchesStatus && matchesDistrict && matchesMaintenance;
    });
  }, [equipments, searchTerm, typeFilter, statusFilter, districtFilter, onlyMaintenance]);

  const typeLabels: Record<EquipmentType, string> = {
    radar_velocidade: 'Radar Velocidade',
    radar_semaforo: 'Radar Semáforo',
    radar_conversao: 'Radar Conversão Proibida',
    camera_monitoramento: 'Câmera Monitoramento',
    balanca_caminhao: 'Balança de Caminhão',
    veiculo_autonomo_rotativo: 'Veículo Autônomo Rotativo',
    cancela_automatizada: 'Cancela Automatizada',
    veiculo_transporte: 'Veículo Transporte',
    totem_rotativo: 'Totem Estacionamento',
    patinete_eletrico: 'Patinete Elétrico',
    moto_transito: 'Moto Trânsito',
    viatura_gm: 'Viatura Guarda Municipal',
    viatura_pm: 'Viatura Polícia Militar',
    drone_vigilancia: 'Drone Vigilância'
  };

  return (
    <div className="space-y-4">
      {/* Action Header and Quick Filter Bar */}
      <div className="pixel-box flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/90">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por série, rua, marca, bairro ou KM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 font-mono"
            />
          </div>

          <PixelButton variant="primary" onClick={onAddNew} className="whitespace-nowrap">
            <Plus size={14} />
            <span>NOVO EQUIPAMENTO</span>
          </PixelButton>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end text-xs">
          {/* Select Type */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs px-2 py-1.5 text-slate-200"
          >
            <option value="all">Todos os Tipos ({equipments.length})</option>
            {Object.entries(typeLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {/* Select Situation */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs px-2 py-1.5 text-slate-200"
          >
            <option value="all">Todas as Situações</option>
            <option value="operacional">Operacional</option>
            <option value="mau_funcionamento">Mau Funcionamento</option>
            <option value="em_manutencao">Em Manutenção</option>
            <option value="furtado">Furtado / Vandalizado</option>
            <option value="ainda_nao_instalado">Ainda Não Instalado</option>
            <option value="desativado">Desativado</option>
          </select>

          {/* Select District */}
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs px-2 py-1.5 text-slate-200"
          >
            <option value="all">Todos os Bairros</option>
            {CITY_DISTRICTS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* Toggle Urgent Maintenance */}
          <button
            onClick={() => setOnlyMaintenance(!onlyMaintenance)}
            className={`px-2.5 py-1.5 border text-xs font-pixel flex items-center gap-1.5 ${
              onlyMaintenance
                ? 'bg-amber-950/70 border-amber-500 text-amber-300'
                : 'bg-slate-950 border-slate-700 text-slate-400'
            }`}
          >
            <Wrench size={12} className={onlyMaintenance ? 'text-amber-400' : ''} />
            <span>{onlyMaintenance ? '🚨 SÓ MANUTENÇÕES' : 'MANUTENÇÃO'}</span>
          </button>
        </div>
      </div>

      {/* Counter and Results Status */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-hud">
        <span>
          Exibindo <strong className="text-sky-400 font-pixel">{filteredEquipments.length}</strong> de{' '}
          {equipments.length} equipamentos IoT catalogados
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1 border ${viewMode === 'table' ? 'bg-sky-950 border-sky-400 text-sky-300' : 'bg-slate-900 border-slate-700 text-slate-500'}`}
            title="Visualização em Tabela"
          >
            <Layers size={13} />
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`p-1 border ${viewMode === 'cards' ? 'bg-sky-950 border-sky-400 text-sky-300' : 'bg-slate-900 border-slate-700 text-slate-500'}`}
            title="Visualização em Grade de Cards"
          >
            <Activity size={13} />
          </button>
        </div>
      </div>

      {/* Main Content: Table or Cards */}
      {viewMode === 'table' ? (
        <div className="pixel-box overflow-x-auto p-0">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-pixel text-[10px]">
                <th className="p-3">EQUIPAMENTO</th>
                <th className="p-3">SÉRIE / MARCA</th>
                <th className="p-3">LOCALIZAÇÃO & REFERÊNCIA</th>
                <th className="p-3">SITUAÇÃO</th>
                <th className="p-3">MANUTENÇÃO</th>
                <th className="p-3">TELEMETRIA</th>
                <th className="p-3 text-right">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEquipments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 font-hud">
                    Nenhum equipamento encontrado para os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredEquipments.map((eq) => (
                  <tr
                    key={eq.id}
                    className="hover:bg-slate-900/50 transition-colors cursor-pointer group"
                    onClick={() => onSelectEquipment(eq)}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-slate-950 border border-slate-700 group-hover:border-sky-500 transition-colors">
                          <PixelIcon type={eq.tipo} size={22} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-200">{typeLabels[eq.tipo]}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{eq.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-sky-300 font-semibold">{eq.numeroSerie}</div>
                      <div className="text-[10px] text-slate-400">
                        {eq.marca} • {eq.modelo}
                      </div>
                    </td>
                    <td className="p-3 max-w-xs">
                      <div className="font-medium text-slate-200">{eq.localizacao.rua}</div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {eq.localizacao.referencia} ({eq.localizacao.bairro})
                      </div>
                    </td>
                    <td className="p-3">
                      <PixelBadge type="status" value={eq.situacao} />
                    </td>
                    <td className="p-3">
                      <PixelBadge type="manutencao" value={eq.necessidadeManutencao} />
                      {eq.dataProximaManutencao && (
                        <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                          Prevista: {eq.dataProximaManutencao}
                        </div>
                      )}
                    </td>
                    <td className="p-3 font-mono text-[11px]">
                      {eq.telemetria ? (
                        <div className="space-y-0.5">
                          <div className="text-slate-300">
                            Temp: <span className="text-amber-400">{eq.telemetria.temperaturaChipC}°C</span>
                          </div>
                          <div className="text-slate-400 text-[10px]">
                            Sinal: <span className="text-emerald-400">{eq.telemetria.sinalRedeDb} dBm</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-500">Offline</span>
                      )}
                    </td>
                    <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectEquipment(eq)}
                          className="p-1 hover:bg-slate-800 text-slate-300 hover:text-sky-400"
                          title="Ver Detalhes e Telemetria"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => onEditEquipment(eq)}
                          className="p-1 hover:bg-slate-800 text-slate-300 hover:text-amber-400"
                          title="Editar Equipamento"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => onDeleteEquipment(eq.id)}
                          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-red-400"
                          title="Remover Equipamento"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Cards Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredEquipments.map((eq) => (
            <div
              key={eq.id}
              onClick={() => onSelectEquipment(eq)}
              className="pixel-box hover:pixel-box-glow cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-slate-950 border border-slate-700">
                      <PixelIcon type={eq.tipo} size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">{typeLabels[eq.tipo]}</h4>
                      <p className="font-mono text-[10px] text-sky-400">{eq.numeroSerie}</p>
                    </div>
                  </div>
                  <PixelBadge type="status" value={eq.situacao} />
                </div>

                <div className="space-y-1 text-xs text-slate-300 my-2 pt-2 border-t border-slate-800">
                  <p>
                    <span className="text-slate-500">Local:</span> {eq.localizacao.rua}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    <span className="text-slate-500">Ref:</span> {eq.localizacao.referencia}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    <span className="text-slate-500">Bairro:</span> {eq.localizacao.bairro} ({eq.localizacao.cidade}/{eq.localizacao.uf})
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <PixelBadge type="manutencao" value={eq.necessidadeManutencao} />
                <span className="font-hud text-[10px] text-slate-400">
                  {eq.orgaoResponsavel}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
