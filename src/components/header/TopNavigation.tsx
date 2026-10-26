import React from 'react';
import { PixelIcon } from '../common/PixelIcon';
import { AudioToggle } from '../common/AudioToggle';
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
  Pause,
  Radio,
  Flame
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
  onOpenBriefing?: () => void;
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
  totalAlerts,
  onOpenBriefing
}) => {
  return (
    <header className="border-b border-cyan-500/30 bg-slate-950/95 sticky top-0 z-50 backdrop-blur-md px-4 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.7)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onTabChange('operacoes')}
          >
            <div className="relative p-2 bg-slate-900 border border-orange-500/60 rounded-md shadow-[0_0_15px_rgba(249,115,22,0.4)] group-hover:border-orange-400 transition-all">
              <PixelIcon type="prometheus_logo" size={30} />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-base md:text-lg text-orange-400 font-bold tracking-wider">
                  F.O.G.O.
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-orange-950/60 text-orange-300 border border-orange-500/40 rounded">
                  PROTOCOLO PROMETHEUS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans tracking-tight">
                Ferramenta Onisciente de Gestão e Operações • Marília/SP
              </p>
            </div>
          </div>

          {/* Quick controls on mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <AudioToggle />
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1 border border-slate-800 rounded-lg overflow-x-auto max-w-full">
          <button
            onClick={() => onTabChange('operacoes')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-pixel text-[10px] md:text-xs transition-all ${
              activeTab === 'operacoes'
                ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)] font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <MapPin size={15} className={activeTab === 'operacoes' ? 'text-white' : 'text-cyan-400'} />
            <span>CENTRAL CICC</span>
            {totalAlerts > 0 && (
              <span className="px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full animate-pulse">
                {totalAlerts}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('inventario')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-pixel text-[10px] md:text-xs transition-all ${
              activeTab === 'inventario'
                ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)] font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ClipboardList size={15} className={activeTab === 'inventario' ? 'text-white' : 'text-emerald-400'} />
            <span>INVENTÁRIO IoT</span>
          </button>

          <button
            onClick={() => onTabChange('preditiva')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-pixel text-[10px] md:text-xs transition-all ${
              activeTab === 'preditiva'
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)] font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Cpu size={15} className={activeTab === 'preditiva' ? 'text-white' : 'text-purple-400'} />
            <span>CIDADE PREDITIVA</span>
          </button>

          <button
            onClick={() => onTabChange('documentacao')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-pixel text-[10px] md:text-xs transition-all ${
              activeTab === 'documentacao'
                ? 'bg-amber-600 text-white shadow-[0_0_12px_rgba(245,158,11,0.5)] font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen size={15} className={activeTab === 'documentacao' ? 'text-white' : 'text-amber-400'} />
            <span>MANUAL / IA</span>
          </button>
        </nav>

        {/* Global Toolbar */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Mission Briefing Button */}
          {onOpenBriefing && (
            <button
              onClick={onOpenBriefing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold shadow-[0_0_12px_rgba(249,115,22,0.4)] transition-all hover:scale-105"
              title="Abrir Guia Operacional do Sistema F.O.G.O."
            >
              <span>💡 COMO FUNCIONA</span>
            </button>
          )}

          {/* Live Telemetry Simulation Indicator */}
          <button
            onClick={onToggleSimulation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border transition-all ${
              simulationRunning
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60'
                : 'bg-amber-950/60 border-amber-500/50 text-amber-300 hover:bg-amber-900/60'
            }`}
            title="Alternar simulação em tempo real"
          >
            <span className={`w-2 h-2 rounded-full ${simulationRunning ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
            <span className="font-semibold">{simulationRunning ? 'SIMULAÇÃO VIVA' : 'PAUSADO'}</span>
          </button>

          {/* Theme Mode Switch */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 transition-all"
            title="Alternar entre Design Retro Arcade e Clean High-Tech"
          >
            <Sparkles size={13} className="text-amber-400" />
            <span>{themeMode === 'pixel' ? '🕹️ MODO RETRÔ' : '👔 MODO CLEAN'}</span>
          </button>

          {/* CRT toggle */}
          {themeMode === 'pixel' && (
            <button
              onClick={onToggleCrt}
              className={`px-2 py-1.5 rounded text-xs font-mono border transition-all ${
                crtEnabled
                  ? 'bg-indigo-950 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
              title="Alternar efeito CRT de monitor"
            >
              <Monitor size={14} />
            </button>
          )}

          <div className="hidden lg:flex items-center">
            <AudioToggle />
          </div>

          {/* Data Actions */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 border border-slate-800 rounded">
            <button
              onClick={onExportJson}
              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
              title="Exportar base em JSON"
            >
              <Download size={14} />
            </button>
            <button
              onClick={onImportJson}
              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
              title="Importar base JSON"
            >
              <Upload size={14} />
            </button>
            <button
              onClick={onResetData}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
              title="Restaurar dados padrão de Marília/SP"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
