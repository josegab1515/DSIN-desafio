import React from 'react';
import { ScenarioType, WeatherCondition, SimulationParams } from '../../types/predictive';
import { PixelBadge } from '../common/PixelBadge';
import { soundService } from '../../services/soundService';
import {
  Calendar,
  Clock,
  CloudRain,
  Sun,
  CloudLightning,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Shield,
  HelpCircle,
  FileText
} from 'lucide-react';

interface ScenarioSimulatorProps {
  simParams: SimulationParams;
  onChangeParams: (params: SimulationParams) => void;
  onOpenModelCards: () => void;
  onOpenReport: () => void;
  totalAgentsAvailable: number;
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({
  simParams,
  onChangeParams,
  onOpenModelCards,
  onOpenReport,
  totalAgentsAvailable
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const playTimerRef = React.useRef<number | null>(null);

  const hoursList = [
    '06:00', '07:30', '09:00', '11:30', '13:00', '15:00',
    '17:30', '19:00', '21:00', '23:00', '02:00', '05:00'
  ];

  const handleScenarioChange = (scenario: ScenarioType) => {
    soundService.playClick();
    let defaultWeather: WeatherCondition = 'limpo';
    if (scenario === 'chuva_torrencial') defaultWeather = 'tempestade';
    onChangeParams({
      ...simParams,
      scenario,
      weather: defaultWeather
    });
  };

  const handleWeatherChange = (weather: WeatherCondition) => {
    soundService.playClick();
    onChangeParams({
      ...simParams,
      weather
    });
  };

  const handleHourChange = (hour: string) => {
    onChangeParams({
      ...simParams,
      selectedHour: hour
    });
  };

  const simParamsRef = React.useRef(simParams);
  React.useEffect(() => {
    simParamsRef.current = simParams;
  }, [simParams]);

  // Autoplay da simulação das 24 horas
  React.useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = window.setInterval(() => {
        const currentParams = simParamsRef.current;
        const currentIndex = hoursList.indexOf(currentParams.selectedHour);
        const nextIndex = (currentIndex + 1) % hoursList.length;
        onChangeParams({
          ...currentParams,
          selectedHour: hoursList[nextIndex]
        });
      }, 1600);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, onChangeParams]);

  const togglePlay = () => {
    soundService.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    soundService.playClick();
    setIsPlaying(false);
    onChangeParams({
      scenario: 'hoje',
      selectedHour: '17:30',
      weather: 'limpo',
      simulatedExtraAgents: {}
    });
  };

  return (
    <div className="pixel-box bg-gradient-to-r from-slate-950 via-[#0e111d] to-slate-950 border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.15)] p-4 space-y-4">
      {/* Header com botões de ação e Transparência XAI */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-500/30 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 bg-purple-950 border border-purple-500 text-purple-400">
              <Sparkles size={16} />
            </span>
            <h3 className="font-pixel text-xs sm:text-sm text-purple-300">
              SIMULADOR DE CENÁRIOS: O QUE PODE ACONTECER AMANHÃ?
            </h3>
          </div>
          <p className="text-[11px] text-slate-300 font-hud mt-0.5">
            Mecanismo preditivo interativo: projete impactos climáticos, sazonais e teste decisões operacionais
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenModelCards}
            className="px-2.5 py-1 bg-slate-900 hover:bg-purple-950 border border-purple-500/60 text-purple-300 hover:text-white font-pixel text-[9px] rounded flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            title="Conheça os dados, variáveis e algoritmos considerados pelo modelo (XAI)"
          >
            <HelpCircle size={12} />
            <span>TRANSPARÊNCIA DA IA (XAI)</span>
          </button>

          <button
            onClick={onOpenReport}
            className="px-2.5 py-1 bg-sky-950/80 hover:bg-sky-900 border border-sky-500/60 text-sky-300 hover:text-white font-pixel text-[9px] rounded flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            title="Exportar boletim executivo preditivo para tomada de decisão"
          >
            <FileText size={12} />
            <span>BOLETIM EXECUTIVO</span>
          </button>
        </div>
      </div>

      {/* Grade de Controles de Simulação */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Controle 1: Cenário / Horizonte de Tempo */}
        <div className="bg-slate-900/70 p-3 border border-slate-800 rounded space-y-2">
          <span className="font-pixel text-[10px] text-purple-400 flex items-center gap-1.5">
            <Calendar size={13} />
            <span>1. HORIZONTE & CONTEXTO URBANO</span>
          </span>

          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button
              onClick={() => handleScenarioChange('hoje')}
              className={`p-1.5 text-left font-pixel text-[9px] border rounded transition-all ${
                simParams.scenario === 'hoje'
                  ? 'bg-purple-950 border-purple-400 text-white shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              📅 Hoje (Tempo Real)
            </button>
            <button
              onClick={() => handleScenarioChange('amanha')}
              className={`p-1.5 text-left font-pixel text-[9px] border rounded transition-all ${
                simParams.scenario === 'amanha'
                  ? 'bg-purple-950 border-purple-400 text-white shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              🔮 Amanhã (Terça-Feira)
            </button>
            <button
              onClick={() => handleScenarioChange('fim_de_semana')}
              className={`p-1.5 text-left font-pixel text-[9px] border rounded transition-all ${
                simParams.scenario === 'fim_de_semana'
                  ? 'bg-purple-950 border-purple-400 text-white shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              🎉 Fim de Semana (Lazer)
            </button>
            <button
              onClick={() => handleScenarioChange('dia_pagamento')}
              className={`p-1.5 text-left font-pixel text-[9px] border rounded transition-all ${
                simParams.scenario === 'dia_pagamento'
                  ? 'bg-purple-950 border-purple-400 text-white shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              💰 Dia de Pagamento
            </button>
          </div>
        </div>

        {/* Controle 2: Condição Meteorológica Simulada */}
        <div className="bg-slate-900/70 p-3 border border-slate-800 rounded space-y-2">
          <span className="font-pixel text-[10px] text-sky-400 flex items-center gap-1.5">
            <CloudRain size={13} />
            <span>2. IMPACTO CLIMÁTICO PREVISTO</span>
          </span>

          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              onClick={() => handleWeatherChange('limpo')}
              className={`p-1.5 flex flex-col items-center justify-center font-pixel text-[9px] border rounded transition-all ${
                simParams.weather === 'limpo'
                  ? 'bg-sky-950 border-sky-400 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Sun size={15} className="text-amber-400 mb-1" />
              <span>Tempo Seco</span>
              <span className="text-[8px] text-slate-500 font-mono">1.0x Risco</span>
            </button>
            <button
              onClick={() => handleWeatherChange('chuva_moderada')}
              className={`p-1.5 flex flex-col items-center justify-center font-pixel text-[9px] border rounded transition-all ${
                simParams.weather === 'chuva_moderada'
                  ? 'bg-sky-950 border-sky-400 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <CloudRain size={15} className="text-sky-400 mb-1" />
              <span>Chuva Leve</span>
              <span className="text-[8px] text-sky-400 font-mono">+25% Risco</span>
            </button>
            <button
              onClick={() => handleWeatherChange('tempestade')}
              className={`p-1.5 flex flex-col items-center justify-center font-pixel text-[9px] border rounded transition-all ${
                simParams.weather === 'tempestade'
                  ? 'bg-red-950 border-red-500 text-white shadow-[0_0_8px_rgba(239,68,68,0.3)]'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <CloudLightning size={15} className="text-red-400 mb-1 animate-pulse" />
              <span>Tempestade</span>
              <span className="text-[8px] text-red-400 font-mono">+55% Risco</span>
            </button>
          </div>
        </div>

        {/* Controle 3: Teste de Intervenção Preventiva (What-If Decision) */}
        <div className="bg-slate-900/70 p-3 border border-slate-800 rounded space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[10px] text-emerald-400 flex items-center gap-1.5">
              <Shield size={13} />
              <span>3. TESTAR DECISÃO DE REFORÇO</span>
            </span>
            <button
              onClick={handleReset}
              className="text-[9px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              title="Restaurar parâmetros padrão"
            >
              <RotateCcw size={10} />
              <span>RESET</span>
            </button>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-[11px] bg-slate-950 p-1.5 border border-slate-800 rounded">
              <span className="text-slate-300 font-pixel text-[9px]">Centro (+1 Vtr)</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    const current = simParams.simulatedExtraAgents['Centro'] || 0;
                    onChangeParams({
                      ...simParams,
                      simulatedExtraAgents: {
                        ...simParams.simulatedExtraAgents,
                        Centro: Math.max(0, current - 1)
                      }
                    });
                  }}
                  className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center rounded font-bold"
                >
                  -
                </button>
                <span className="font-mono text-emerald-400 font-bold w-4 text-center">
                  {simParams.simulatedExtraAgents['Centro'] || 0}
                </span>
                <button
                  onClick={() => {
                    const current = simParams.simulatedExtraAgents['Centro'] || 0;
                    onChangeParams({
                      ...simParams,
                      simulatedExtraAgents: {
                        ...simParams.simulatedExtraAgents,
                        Centro: current + 1
                      }
                    });
                  }}
                  className="w-5 h-5 bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center rounded font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] bg-slate-950 p-1.5 border border-slate-800 rounded">
              <span className="text-slate-300 font-pixel text-[9px]">Fragata (+1 Vtr)</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    const current = simParams.simulatedExtraAgents['Fragata'] || 0;
                    onChangeParams({
                      ...simParams,
                      simulatedExtraAgents: {
                        ...simParams.simulatedExtraAgents,
                        Fragata: Math.max(0, current - 1)
                      }
                    });
                  }}
                  className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center rounded font-bold"
                >
                  -
                </button>
                <span className="font-mono text-emerald-400 font-bold w-4 text-center">
                  {simParams.simulatedExtraAgents['Fragata'] || 0}
                </span>
                <button
                  onClick={() => {
                    const current = simParams.simulatedExtraAgents['Fragata'] || 0;
                    onChangeParams({
                      ...simParams,
                      simulatedExtraAgents: {
                        ...simParams.simulatedExtraAgents,
                        Fragata: current + 1
                      }
                    });
                  }}
                  className="w-5 h-5 bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center rounded font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Régua de Tempo 24 Horas com Botão de Autoplay */}
      <div className="pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className={`px-2 py-1 font-pixel text-[9px] rounded flex items-center gap-1 transition-all ${
                isPlaying
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
            >
              {isPlaying ? <Pause size={11} /> : <Play size={11} />}
              <span>{isPlaying ? 'PAUSAR ANIMAÇÃO' : 'ANIMAR 24H'}</span>
            </button>
            <span className="text-[11px] text-slate-400 font-hud">
              Horário projetado sob análise:{' '}
              <strong className="text-purple-300 font-mono text-sm">{simParams.selectedHour}</strong>
            </span>
          </div>

          <span className="font-mono text-[10px] text-slate-400 hidden sm:inline">
            Clique em qualquer horário para projetar o estado futuro
          </span>
        </div>

        {/* Barra de Seleção Horária */}
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1">
          {hoursList.map((h) => {
            const isSelected = simParams.selectedHour === h;
            return (
              <button
                key={h}
                onClick={() => handleHourChange(h)}
                className={`py-1.5 px-1 font-mono text-[10px] text-center border rounded transition-all ${
                  isSelected
                    ? 'bg-purple-900 border-purple-400 text-white font-bold shadow-[0_0_8px_rgba(168,85,247,0.5)] scale-105'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {h}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
