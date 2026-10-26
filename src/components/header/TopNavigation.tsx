import React from 'react';
import { PixelIcon } from '../common/PixelIcon';
import { AudioToggle } from '../common/AudioToggle';
import { PixelButton } from '../common/PixelButton';
import {
  MapPin,
  ClipboardList,
  Cpu,
  BookOpen,
  Sparkles,
  Monitor,
  RotateCcw,
  Download,
  Upload,
  Play,
  Pause
} from 'lucide-react';

export type ActiveTab = 'operacoes' | 'inventario' | 'preditiva' | 'documentacao';

interface TopNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  themeMode: 'pixel' | 'modern';
  onToggleTheme: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  simulationRunning: boolean;
  onToggleSimulation: () => void;
  onResetData: () => void;
  onExportJson: () => void;
  onImportJson: () => void;
  totalAlerts: number;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab,
  onTabChange,
  themeMode,
  onToggleTheme,
  crtEnabled,
  onToggleCrt,
  simulationRunning,
  onToggleSimulation,
  onResetData,
  onExportJson,
  onImportJson,
  totalAlerts
}) => {
  return (
    <header className="border-b-2 border-slate-800 bg-slate-950/95 sticky top-0 z-50 backdrop-blur-md px-3 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo and System Brand */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onTabChange('operacoes')}>
            <div className="p-1.5 bg-slate-900 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
              <PixelIcon type="prometheus_logo" size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-sm md:text-base text-amber-400 font-bold tracking-wider">
                  F.O.G.O.
                </span>
                <span className="font-hud text-xs text-slate-400 px-1.5 py-0.5 bg-slate-900 border border-slate-700">
                  PROTOCOLO PROMETHEUS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-hud tracking-tight hidden sm:block">
                Ferramenta Onisciente de Gestão e Operações Urbanas
              </p>
            </div>
          </div>

          {/* Quick Simulation Indicator on mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <AudioToggle />
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <nav className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0">
          <button
            onClick={() => onTabChange('operacoes')}
            className={`pixel-btn text-xs py-1.5 px-3 flex items-center gap-1.5 transition-all ${
              activeTab === 'operacoes' ? 'bg-sky-600 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]' : 'pixel-btn-secondary opacity-80'
            }`}
          >
            <MapPin size={14} className="text-sky-400" />
            <span className="font-pixel text-[10px]">2ª PARTE: CENTRAL</span>
            {totalAlerts > 0 && (
              <span className="px-1.5 py-0.2 bg-red-500 text-white text-[9px] font-bold rounded-sm animate-pulse">
                {totalAlerts}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('inventario')}
            className={`pixel-btn text-xs py-1.5 px-3 flex items-center gap-1.5 transition-all ${
              activeTab === 'inventario' ? 'bg-sky-600 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]' : 'pixel-btn-secondary opacity-80'
            }`}
          >
            <ClipboardList size={14} className="text-emerald-400" />
            <span className="font-pixel text-[10px]">1ª PARTE: INVENTÁRIO</span>
          </button>

          <button
            onClick={() => onTabChange('preditiva')}
            className={`pixel-btn text-xs py-1.5 px-3 flex items-center gap-1.5 transition-all ${
              activeTab === 'preditiva' ? 'bg-sky-600 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]' : 'pixel-btn-secondary opacity-80'
            }`}
          >
            <Cpu size={14} className="text-purple-400" />
            <span className="font-pixel text-[10px]">3ª PARTE: PREDITIVA</span>
          </button>

          <button
            onClick={() => onTabChange('documentacao')}
            className={`pixel-btn text-xs py-1.5 px-3 flex items-center gap-1.5 transition-all ${
              activeTab === 'documentacao' ? 'bg-amber-600 border-amber-400' : 'pixel-btn-secondary opacity-80'
            }`}
          >
            <BookOpen size={14} className="text-amber-400" />
            <span className="font-pixel text-[10px]">MANUAL / IA</span>
          </button>
        </nav>

        {/* Global Controls & Theme Toggles */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Simulation Toggle */}
          <button
            onClick={onToggleSimulation}
            className={`pixel-btn text-xs py-1 px-2.5 flex items-center gap-1.5 ${
              simulationRunning ? 'pixel-btn-success' : 'pixel-btn-warning'
            }`}
            title="Alternar simulação em tempo real de tráfego e patrulhas"
          >
            {simulationRunning ? <Pause size={13} /> : <Play size={13} />}
            <span className="font-pixel text-[9px]">
              {simulationRunning ? 'SIMULAÇÃO: ON' : 'SIMULAÇÃO: OFF'}
            </span>
          </button>

          {/* Theme Switch */}
          <button
            onClick={onToggleTheme}
            className="pixel-btn pixel-btn-secondary text-xs py-1 px-2.5 flex items-center gap-1.5"
            title="Alternar entre Design Pixel Art Retrô e Design Moderno Corporativo"
          >
            <Sparkles size={13} className="text-amber-400" />
            <span className="font-pixel text-[9px]">
              {themeMode === 'pixel' ? '🕹️ RETRÔ' : '👔 CLEAN'}
            </span>
          </button>

          {/* CRT Switch (Visible in pixel mode) */}
          {themeMode === 'pixel' && (
            <button
              onClick={onToggleCrt}
              className={`pixel-btn text-xs py-1 px-2 flex items-center gap-1 ${
                crtEnabled ? 'bg-indigo-900 border-indigo-500' : 'pixel-btn-secondary'
              }`}
              title="Ativar/Desativar efeito de monitor CRT retro"
            >
              <Monitor size={13} />
              <span className="font-pixel text-[9px]">CRT</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-1.5">
            <AudioToggle />
          </div>

          {/* Backup / Restore Menu */}
          <div className="flex items-center gap-1">
            <button
              onClick={onExportJson}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded"
              title="Exportar base completa em JSON"
            >
              <Download size={13} />
            </button>
            <button
              onClick={onImportJson}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded"
              title="Importar base de dados JSON"
            >
              <Upload size={13} />
            </button>
            <button
              onClick={onResetData}
              className="p-1.5 bg-slate-900 hover:bg-red-950/60 border border-slate-700 hover:border-red-800 text-slate-400 hover:text-red-400 rounded"
              title="Restaurar dados de fábrica (Demo Marília/SP)"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
