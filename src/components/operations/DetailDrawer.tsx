import React from 'react';
import { Equipment } from '../../types/equipment';
import { Agent } from '../../types/agent';
import { PixelBadge } from '../common/PixelBadge';
import { PixelIcon } from '../common/PixelIcon';
import { PixelButton } from '../common/PixelButton';
import {
  X,
  MapPin,
  Calendar,
  Wrench,
  Activity,
  Cpu,
  Wifi,
  Zap,
  Shield,
  Radio,
  Clock,
  Video
} from 'lucide-react';

interface DetailDrawerProps {
  equipment: Equipment | null;
  agent: Agent | null;
  onClose: () => void;
  onRequestMaintenance?: (eq: Equipment) => void;
  onChangeEquipmentStatus?: (eq: Equipment, newStatus: Equipment['situacao']) => void;
  onOpenEditEquipment?: (eq: Equipment) => void;
  onOpen3DViewer?: (eq: Equipment) => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({
  equipment,
  agent,
  onClose,
  onRequestMaintenance,
  onChangeEquipmentStatus,
  onOpenEditEquipment,
  onOpen3DViewer
}) => {
  if (!equipment && !agent) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[2000] w-full sm:w-[440px] bg-slate-950/95 border-l-2 border-sky-500 shadow-[-10px_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md flex flex-col justify-between overflow-y-auto">
      {/* Header */}
      <div>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            {equipment && <PixelIcon type={equipment.tipo} size={26} />}
            {agent && (
              <PixelIcon
                type={
                  agent.corporacao === 'Guarda Municipal'
                    ? 'guarda_municipal'
                    : agent.corporacao === 'Polícia Militar'
                    ? 'policia_militar'
                    : 'agente_transito'
                }
                size={26}
              />
            )}
            <div>
              <span className="font-pixel text-[11px] text-sky-400 font-bold block">
                {equipment ? 'DETALHES DO DISPOSITIVO IoT' : 'DETALHES DO AGENTE OPERACIONAL'}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                {equipment?.numeroSerie || agent?.matricula}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content for Equipment */}
        {equipment && (
          <div className="p-4 space-y-4 text-xs">
            {/* Status and Title */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base text-slate-100">
                  {equipment.marca} {equipment.modelo}
                </h3>
                <PixelBadge type="status" value={equipment.situacao} />
              </div>
              <p className="text-slate-400 font-hud">
                Tipo: <strong className="text-slate-200">{equipment.tipo.replace('_', ' ').toUpperCase()}</strong>
              </p>
              <p className="text-slate-400 font-hud">
                Responsável: <strong className="text-slate-200">{equipment.orgaoResponsavel}</strong>
              </p>
            </div>

            {/* 3D Hologram, Live CCTV & Street View Action Button */}
            {onOpen3DViewer && (
              <button
                type="button"
                onClick={() => onOpen3DViewer(equipment)}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 border border-cyan-400 hover:border-cyan-300 hover:bg-cyan-900/40 text-cyan-300 hover:text-white font-pixel text-[10px] font-bold rounded shadow-[0_0_15px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
              >
                <Video size={16} className="text-cyan-400 animate-pulse" />
                <span>📹 VER VISÃO 3D & TRANSMISSÃO AO VIVO</span>
              </button>
            )}

            {/* Localização Detalhada */}
            <div className="pixel-box bg-slate-900/60 p-3 space-y-1.5 border-slate-800">
              <div className="flex items-center gap-1.5 font-pixel text-[10px] text-sky-400 mb-1">
                <MapPin size={13} />
                <span>LOCALIZAÇÃO DE INSTALAÇÃO</span>
              </div>
              <p className="text-slate-200">
                <span className="text-slate-500">Rua:</span> {equipment.localizacao.rua}
              </p>
              <p className="text-slate-300">
                <span className="text-slate-500">Referência:</span> {equipment.localizacao.referencia}
              </p>
              <p className="text-slate-300">
                <span className="text-slate-500">Bairro:</span> {equipment.localizacao.bairro} -{' '}
                {equipment.localizacao.cidade}/{equipment.localizacao.uf} (CEP: {equipment.localizacao.cep})
              </p>
              <div className="pt-1 font-mono text-[10px] text-slate-400">
                GPS: {equipment.localizacao.lat.toFixed(5)}, {equipment.localizacao.lng.toFixed(5)}
              </div>
            </div>

            {/* Telemetria em Tempo Real */}
            {equipment.telemetria && (
              <div className="pixel-box bg-slate-900/60 p-3 space-y-2 border-slate-800">
                <div className="flex items-center justify-between font-pixel text-[10px] text-emerald-400 mb-1">
                  <div className="flex items-center gap-1.5">
                    <Activity size={13} />
                    <span>TELEMETRIA IoT AO VIVO</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {equipment.telemetria.ultimaLeitura}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="bg-slate-950 p-2 border border-slate-800">
                    <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                      <Cpu size={11} /> TEMP
                    </div>
                    <div className="text-amber-400 font-bold text-xs mt-0.5">
                      {equipment.telemetria.temperaturaChipC}°C
                    </div>
                  </div>

                  <div className="bg-slate-950 p-2 border border-slate-800">
                    <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                      <Zap size={11} /> TENSÃO
                    </div>
                    <div className="text-sky-400 font-bold text-xs mt-0.5">
                      {equipment.telemetria.voltagemV}V
                    </div>
                  </div>

                  <div className="bg-slate-950 p-2 border border-slate-800">
                    <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                      <Wifi size={11} /> SINAL
                    </div>
                    <div className="text-emerald-400 font-bold text-xs mt-0.5">
                      {equipment.telemetria.sinalRedeDb} dBm
                    </div>
                  </div>
                </div>

                {equipment.telemetria.veiculosDetectadosHoje !== undefined && (
                  <div className="bg-slate-950 p-2 border border-slate-800 flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400">Veículos Detectados Hoje:</span>
                    <strong className="text-sky-300">
                      {equipment.telemetria.veiculosDetectadosHoje.toLocaleString()}
                    </strong>
                  </div>
                )}
              </div>
            )}

            {/* Manutenção & Diagnóstico */}
            <div className="pixel-box bg-slate-900/60 p-3 space-y-1.5 border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-pixel text-[10px] text-amber-400 flex items-center gap-1.5">
                  <Wrench size={13} />
                  <span>SITUAÇÃO DE MANUTENÇÃO</span>
                </span>
                <PixelBadge type="manutencao" value={equipment.necessidadeManutencao} />
              </div>

              {equipment.dataProximaManutencao && (
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Calendar size={13} className="text-slate-400" />
                  <span>
                    Próxima Manutenção: <strong className="font-mono text-amber-300">{equipment.dataProximaManutencao}</strong>
                  </span>
                </div>
              )}

              {equipment.descricaoProblema && (
                <div className="p-2 bg-red-950/30 border border-red-500/40 text-red-200 text-xs mt-2">
                  <strong className="block text-[10px] text-red-400 font-pixel">RELATO DO PROBLEMA:</strong>
                  {equipment.descricaoProblema}
                </div>
              )}
            </div>

            {/* Características Particulares */}
            <div className="pixel-box bg-slate-900/60 p-3 space-y-1 border-slate-800 text-[11px]">
              <span className="font-pixel text-[10px] text-purple-400 block mb-1.5">
                PROPRIEDADES ESPECÍFICAS
              </span>
              {Object.entries(equipment.especificas).map(([key, val]) => (
                <div key={key} className="flex justify-between py-0.5 border-b border-slate-800/60 font-mono">
                  <span className="text-slate-400">{key}:</span>
                  <span className="text-slate-200 font-semibold">{String(val)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content for Agent */}
        {agent && (
          <div className="p-4 space-y-4 text-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base text-slate-100">{agent.nome}</h3>
                <PixelBadge type="agent" value={agent.status} />
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Shield size={14} className="text-amber-400" />
                <span className="font-bold">{agent.corporacao}</span>
                <span>• {agent.cargo}</span>
              </div>
            </div>

            <div className="pixel-box bg-slate-900/60 p-3 space-y-2 border-slate-800">
              <div className="flex items-center gap-1.5 font-pixel text-[10px] text-sky-400">
                <Radio size={13} />
                <span>TELEMETRIA & COMUNICAÇÃO</span>
              </div>
              <p className="text-slate-300">
                <span className="text-slate-500">Canal Rádio:</span>{' '}
                <strong className="text-emerald-400 font-mono">{agent.telefoneRadio}</strong>
              </p>
              {agent.equipeViatura && (
                <p className="text-slate-300">
                  <span className="text-slate-500">Viatura/Equipe:</span>{' '}
                  <strong className="text-sky-300 font-mono">{agent.equipeViatura}</strong>
                </p>
              )}
            </div>

            <div className="pixel-box bg-slate-900/60 p-3 space-y-1.5 border-slate-800">
              <div className="flex items-center gap-1.5 font-pixel text-[10px] text-emerald-400">
                <MapPin size={13} />
                <span>POSIÇÃO EM TEMPO REAL</span>
              </div>
              <p className="text-slate-300">
                <span className="text-slate-500">Setor/Bairro:</span>{' '}
                <strong className="text-slate-100">{agent.localizacaoAtual.bairro}</strong>
              </p>
              <div className="font-mono text-[10px] text-slate-400">
                GPS: {agent.localizacaoAtual.lat.toFixed(5)}, {agent.localizacaoAtual.lng.toFixed(5)}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 pt-1">
                <Clock size={11} />
                <span>Atualizado: {agent.localizacaoAtual.ultimaAtualizacao}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drawer Action Buttons */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between gap-2">
        {equipment && onOpenEditEquipment && (
          <PixelButton
            variant="secondary"
            onClick={() => onOpenEditEquipment(equipment)}
            className="text-[10px]"
          >
            EDITAR DADOS
          </PixelButton>
        )}

        {equipment && onRequestMaintenance && (
          <PixelButton
            variant={equipment.necessidadeManutencao === 'imediata' ? 'secondary' : 'danger'}
            onClick={() => onRequestMaintenance(equipment)}
            className="text-[10px]"
          >
            {equipment.necessidadeManutencao === 'imediata'
              ? 'MANUTENÇÃO JÁ SOLICITADA'
              : 'ACIONAR MANUTENÇÃO IMEDIATA'}
          </PixelButton>
        )}

        <PixelButton variant="primary" onClick={onClose} className="text-[10px]">
          FECHAR
        </PixelButton>
      </div>
    </div>
  );
};
