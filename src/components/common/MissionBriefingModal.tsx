import React from 'react';
import { PixelButton } from './PixelButton';
import { PixelIcon } from './PixelIcon';
import {
  HelpCircle,
  X,
  MapPin,
  ClipboardList,
  Cpu,
  Siren,
  Wrench,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface MissionBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: 'operacoes' | 'inventario' | 'preditiva') => void;
}

export const MissionBriefingModal: React.FC<MissionBriefingModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="pixel-box w-full max-w-3xl my-6 bg-slate-950 border-2 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.4)] text-xs text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/40 bg-slate-900/90 px-4 py-3 -mx-4 -mt-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-950 border border-cyan-500/60 rounded">
              <PixelIcon type="prometheus_logo" size={26} />
            </div>
            <div>
              <h2 className="font-pixel text-sm text-cyan-400 font-bold tracking-wider">
                GUIA OPERACIONAL // COMO FUNCIONA O SISTEMA F.O.G.O.
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                Desafio DSIN CoderChallenge • Protocolo PROMETHEUS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Story & Context */}
        <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg mb-4 space-y-1.5 leading-relaxed">
          <span className="font-pixel text-[10px] text-orange-400 block font-bold">
            💡 ENTENDA O CONTEXTO DO PROJETO EM 30 SEGUNDOS:
          </span>
          <p className="text-slate-300">
            Você está operando o <strong>CICC (Centro Integrado de Comando e Controle)</strong> de
            uma cidade inteligente (Marília/SP). A IA do governo, chamada <strong>PROMETHEUS</strong>,
            foi conectada a todos os sensores da cidade (câmeras, radares, viaturas e patinetes).
          </p>
          <p className="text-slate-400 text-[11px]">
            O desafio foi dividido pela DSIN em <strong>3 partes complementares</strong> que se conectam:
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {/* Parte 1 */}
          <div className="p-3 bg-slate-900 border border-emerald-500/40 rounded flex flex-col justify-between hover:border-emerald-500 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-2 text-emerald-400 font-pixel text-[10px] font-bold">
                <ClipboardList size={14} />
                <span>1ª PARTE: INVENTÁRIO</span>
              </div>
              <strong className="block text-slate-100 text-xs mb-1">A Base de Dados da Cidade</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Onde ficam cadastrados todos os <strong>dispositivos IoT</strong> (radares de 50km/h, câmeras 4K, balanças de carga) e os <strong>agentes de campo</strong> (PM, Guarda Municipal e Trânsito).
              </p>
              <div className="mt-2 text-[10px] text-emerald-300 font-mono bg-emerald-950/40 p-1 border border-emerald-800/50 rounded">
                👉 Clique em "NOVO EQUIPAMENTO" para cadastrar ou editar com campos específicos.
              </div>
            </div>
            <button
              onClick={() => {
                onNavigateTab('inventario');
                onClose();
              }}
              className="mt-3 w-full py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-600 rounded font-pixel text-[9px] flex items-center justify-center gap-1"
            >
              <span>IR AO INVENTÁRIO</span>
              <ArrowRight size={10} />
            </button>
          </div>

          {/* Parte 2 */}
          <div className="p-3 bg-slate-900 border border-cyan-500/40 rounded flex flex-col justify-between hover:border-cyan-500 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-2 text-cyan-400 font-pixel text-[10px] font-bold">
                <MapPin size={14} />
                <span>2ª PARTE: CENTRAL CICC</span>
              </div>
              <strong className="block text-slate-100 text-xs mb-1">O Monitoramento em Tempo Real</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Onde você vê o que está acontecendo <strong>AGORA</strong>. Viaturas patrulhando pelo mapa, telemetria viva, radares medindo tráfego e ocorrências de emergência.
              </p>
              <div className="mt-2 text-[10px] text-cyan-300 font-mono bg-cyan-950/40 p-1 border border-cyan-800/50 rounded">
                👉 Clique em "SIMULAR 911" e depois em "DESPACHAR EQUIPE" para enviar uma viatura!
              </div>
            </div>
            <button
              onClick={() => {
                onNavigateTab('operacoes');
                onClose();
              }}
              className="mt-3 w-full py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-600 rounded font-pixel text-[9px] flex items-center justify-center gap-1"
            >
              <span>IR À CENTRAL CICC</span>
              <ArrowRight size={10} />
            </button>
          </div>

          {/* Parte 3 */}
          <div className="p-3 bg-slate-900 border border-purple-500/40 rounded flex flex-col justify-between hover:border-purple-500 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-2 text-purple-400 font-pixel text-[10px] font-bold">
                <Cpu size={14} />
                <span>3ª PARTE: PREDITIVA</span>
              </div>
              <strong className="block text-slate-100 text-xs mb-1">Antecipar o Amanhã</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Onde a IA PROMETHEUS analisa tendências: prevê em quais horários haverá congestionamento, quais radares vão quebrar nos próximos 15 dias e o que fazer.
              </p>
              <div className="mt-2 text-[10px] text-purple-300 font-mono bg-purple-950/40 p-1 border border-purple-800/50 rounded">
                👉 Clique em "EXECUTAR AÇÃO SUGERIDA" para aplicar as decisões prescritivas da IA!
              </div>
            </div>
            <button
              onClick={() => {
                onNavigateTab('preditiva');
                onClose();
              }}
              className="mt-3 w-full py-1.5 bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-600 rounded font-pixel text-[9px] flex items-center justify-center gap-1"
            >
              <span>IR À CIDADE PREDITIVA</span>
              <ArrowRight size={10} />
            </button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded text-[11px] text-slate-400 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-amber-400" />
            <span>
              <strong>Dica:</strong> Clique em qualquer ícone no mapa para ver a telemetria ao vivo ou abrir a edição de dados.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-pixel text-[10px] font-bold rounded shadow transition-all ml-auto"
          >
            ENTENDI! VOLTAR AO SISTEMA
          </button>
        </div>
      </div>
    </div>
  );
};
