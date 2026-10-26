import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Equipment } from '../../types/equipment';
import { Agent } from '../../types/agent';
import { IncidentAlert } from '../../types/alert';
import { PixelBadge } from '../common/PixelBadge';
import { PixelButton } from '../common/PixelButton';
import { Maximize2, Layers } from 'lucide-react';

interface OperationsMapProps {
  equipments: Equipment[];
  agents: Agent[];
  alerts: IncidentAlert[];
  selectedEquipment: Equipment | null;
  selectedAgent: Agent | null;
  onSelectEquipment: (eq: Equipment) => void;
  onSelectAgent: (ag: Agent) => void;
  themeMode: 'pixel' | 'modern';
  showEquipments: boolean;
  showAgents: boolean;
  showAlerts: boolean;
  highlightMaintenance: boolean;
}

// Subcomponente para centralizar o mapa quando um item é selecionado
const MapRecenter: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView([lat, lng], 16, { animate: true });
  }, [lat, lng, map]);
  return null;
};

export const OperationsMap: React.FC<OperationsMapProps> = ({
  equipments,
  agents,
  alerts,
  selectedEquipment,
  selectedAgent,
  onSelectEquipment,
  onSelectAgent,
  themeMode,
  showEquipments,
  showAgents,
  showAlerts,
  highlightMaintenance
}) => {
  // Centro de Marília/SP (sede da DSIN)
  const defaultCenter: [number, number] = [-22.2175, -49.9501];

  // Gerador de ícones HTML customizados para equipamentos
  const createEquipmentIcon = (eq: Equipment) => {
    let statusColor = '#22c55e'; // verde
    let isPulsing = false;

    if (eq.situacao === 'mau_funcionamento') statusColor = '#eab308';
    if (eq.situacao === 'em_manutencao') statusColor = '#a855f7';
    if (eq.situacao === 'furtado') {
      statusColor = '#ef4444';
      isPulsing = true;
    }
    if (eq.situacao === 'ainda_nao_instalado' || eq.situacao === 'desativado') statusColor = '#64748b';

    if (highlightMaintenance && eq.necessidadeManutencao === 'imediata') {
      statusColor = '#ef4444';
      isPulsing = true;
    }

    const html = `
      <div class="custom-pixel-marker ${isPulsing ? 'pulse-critical' : ''}">
        <div class="marker-inner" style="border-color: ${statusColor}; box-shadow: 0 0 10px ${statusColor}66;">
          <div style="width: 18px; height: 18px; display: flex; align-items: center; justify-content: center;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="${statusColor}">
              <rect x="4" y="4" width="16" height="16" />
              <rect x="7" y="7" width="10" height="10" fill="#090d16" />
              <rect x="10" y="10" width="4" height="4" fill="${statusColor}" />
            </svg>
          </div>
          <div class="marker-status-indicator" style="background-color: ${statusColor};"></div>
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18]
    });
  };

  // Gerador de ícones HTML para agentes
  const createAgentIcon = (ag: Agent) => {
    const isPm = ag.corporacao === 'Polícia Militar';
    const isGm = ag.corporacao === 'Guarda Municipal';
    const corpColor = isPm ? '#38bdf8' : isGm ? '#3b82f6' : '#f59e0b';

    const html = `
      <div class="custom-pixel-marker">
        <div class="marker-inner marker-inner-agent" style="border-color: ${corpColor}; background-color: #0f172a; box-shadow: 0 0 12px ${corpColor}88;">
          <div style="font-size: 14px; line-height: 1;">
            ${isPm ? '👮' : isGm ? '🛡️' : '🚦'}
          </div>
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18]
    });
  };

  // Ícone para incidentes críticos
  const createAlertIcon = (alert: IncidentAlert) => {
    const html = `
      <div class="custom-pixel-marker pulse-critical">
        <div style="width: 28px; height: 28px; background: #dc2626; border: 2px solid #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(239,68,68,0.9);">
          <span style="font-size: 14px;">⚠️</span>
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: '',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -16]
    });
  };

  return (
    <div className="pixel-box p-0 relative h-[560px] w-full overflow-hidden border-2 border-slate-800">
      <MapContainer
        center={defaultCenter}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* Recenter no elemento selecionado */}
        {selectedEquipment && (
          <MapRecenter
            lat={selectedEquipment.localizacao.lat}
            lng={selectedEquipment.localizacao.lng}
          />
        )}
        {selectedAgent && (
          <MapRecenter
            lat={selectedAgent.localizacaoAtual.lat}
            lng={selectedAgent.localizacaoAtual.lng}
          />
        )}

        {/* Camada de mapa OpenStreetMap com filtro temático Dark/Cyber */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className={themeMode === 'pixel' ? 'map-tiles-cyber' : 'map-tiles-modern'}
        />

        {/* Círculos de cobertura de radar em torno do Centro */}
        <Circle
          center={defaultCenter}
          radius={800}
          pathOptions={{
            color: '#38bdf8',
            fillColor: '#38bdf8',
            fillOpacity: 0.05,
            dashArray: '4, 8'
          }}
        />

        {/* Marcadores de Equipamentos IoT */}
        {showEquipments &&
          equipments.map((eq) => (
            <Marker
              key={eq.id}
              position={[eq.localizacao.lat, eq.localizacao.lng]}
              icon={createEquipmentIcon(eq)}
              eventHandlers={{
                click: () => onSelectEquipment(eq)
              }}
            >
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-pixel text-[10px] text-sky-400 font-bold">
                      {eq.tipo.replace('_', ' ').toUpperCase()}
                    </span>
                    <PixelBadge type="status" value={eq.situacao} />
                  </div>
                  <div className="font-bold text-xs text-slate-100">{eq.numeroSerie}</div>
                  <div className="text-[11px] text-slate-300 mt-1">{eq.localizacao.rua}</div>
                  <div className="text-[10px] text-slate-400 font-hud">
                    {eq.localizacao.referencia} ({eq.localizacao.bairro})
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                    <PixelBadge type="manutencao" value={eq.necessidadeManutencao} />
                    <PixelButton
                      variant="primary"
                      className="text-[9px] py-1 px-2"
                      onClick={() => onSelectEquipment(eq)}
                    >
                      DETALHES
                    </PixelButton>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Marcadores de Agentes */}
        {showAgents &&
          agents.map((ag) => (
            <Marker
              key={ag.id}
              position={[ag.localizacaoAtual.lat, ag.localizacaoAtual.lng]}
              icon={createAgentIcon(ag)}
              eventHandlers={{
                click: () => onSelectAgent(ag)
              }}
            >
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-pixel text-[10px] text-amber-400 font-bold">
                      {ag.corporacao.toUpperCase()}
                    </span>
                    <PixelBadge type="agent" value={ag.status} />
                  </div>
                  <div className="font-bold text-xs text-slate-100">{ag.nome}</div>
                  <div className="text-[11px] text-slate-300">{ag.cargo}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    {ag.telefoneRadio} • {ag.equipeViatura || 'Patrulha a pé'}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-700/60 flex justify-end">
                    <PixelButton
                      variant="primary"
                      className="text-[9px] py-1 px-2"
                      onClick={() => onSelectAgent(ag)}
                    >
                      DETALHES
                    </PixelButton>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Marcadores de Incidentes Críticos */}
        {showAlerts &&
          alerts
            .filter((a) => !a.resolvido && a.lat && a.lng)
            .map((al) => (
              <Marker
                key={al.id}
                position={[al.lat!, al.lng!]}
                icon={createAlertIcon(al)}
              >
                <Popup>
                  <div className="p-1 min-w-[220px]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-pixel text-[10px] text-red-400 font-bold">
                        ⚠️ ALERTA EM TEMPO REAL
                      </span>
                      <PixelBadge type="severidade" value={al.severidade} />
                    </div>
                    <div className="font-bold text-xs text-slate-100">{al.titulo}</div>
                    <div className="text-[11px] text-slate-300 mt-1">{al.descricao}</div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">
                      Bairro: {al.bairro} ({al.timestamp})
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
      </MapContainer>

      {/* Mini Legenda Flutuante Retrô */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-slate-950/90 border border-slate-700 p-2 text-[10px] font-pixel text-slate-300 space-y-1 backdrop-blur-sm pointer-events-auto">
        <div className="text-slate-400 font-bold mb-1 border-b border-slate-800 pb-0.5">LEGENDA DO CICC</div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-500 inline-block"></span>
          <span>Operacional</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-yellow-500 inline-block"></span>
          <span>Mau Funcionamento</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-purple-500 inline-block"></span>
          <span>Em Manutenção</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-500 inline-block animate-pulse"></span>
          <span>Furtado / Vandalizado</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-sky-400 inline-block rounded-full"></span>
          <span>Agente / Viatura</span>
        </div>
      </div>
    </div>
  );
};
