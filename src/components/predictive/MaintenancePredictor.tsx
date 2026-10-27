import React, { useState } from 'react';
import { EquipmentFailurePrediction, EquipmentHealthTrend } from '../../types/predictive';
import { PixelBadge } from '../common/PixelBadge';
import { PixelButton } from '../common/PixelButton';
import { Wrench, AlertTriangle, Cpu, TrendingDown, Clock, ShieldCheck, DollarSign } from 'lucide-react';

interface MaintenancePredictorProps {
  predictions: EquipmentFailurePrediction[];
  onOpenOrder: (equipId: string) => void;
}

export const MaintenancePredictor: React.FC<MaintenancePredictorProps> = ({
  predictions,
  onOpenOrder
}) => {
  const [selectedEquipId, setSelectedEquipId] = useState<string>(
    predictions[0]?.equipamentoId || ''
  );

  const selectedEquip =
    predictions.find((p) => p.equipamentoId === selectedEquipId) || predictions[0];

  // Simulação de curva de degradação das próximas 6 semanas para o equipamento selecionado
  const currentHealth = selectedEquip?.saudeEstimadaPercent || 80;
  const degradationPoints = [
    { label: 'Hoje', health: currentHealth },
    { label: 'Sem 1', health: Math.max(10, currentHealth - 8) },
    { label: 'Sem 2', health: Math.max(8, currentHealth - 18) },
    { label: 'Sem 3', health: Math.max(5, currentHealth - 32) },
    { label: 'Sem 4', health: Math.max(5, currentHealth - 48) },
    { label: 'Sem 5', health: Math.max(2, currentHealth - 65) }
  ];

  return (
    <div className="space-y-4">
      {/* Header com KPI de Confiabilidade */}
      <div className="pixel-box bg-slate-900/90 border-slate-800 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="font-pixel text-xs text-amber-400 flex items-center gap-1.5">
              <Wrench size={15} />
              <span>PREVISÃO DE FALHAS DE HARDWARE IoT & TENDÊNCIAS DE DEGRADAÇÃO</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-hud">
              Modelagem preditiva de Vida Útil Residual (RUL) com base em ciclos térmicos (°C), sinal de rede (dBm) e MTBF
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-[9px] text-slate-500 block">CUSTO CORRETIVO EVITADO:</span>
              <strong className="text-emerald-400 font-pixel text-xs">R$ 28.400 / MÊS</strong>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-500 block">PARADAS IMINENTES:</span>
              <strong className="text-red-400 font-pixel text-xs">
                {predictions.filter((p) => p.urgenciaPreventiva === 'critica').length} EQUIPAMENTOS
              </strong>
            </div>
          </div>
        </div>

        {/* Curva de Degradação Visual do Equipamento Selecionado */}
        {selectedEquip && (
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950 px-2 py-0.5 border border-sky-700">
                  {selectedEquip.numeroSerie}
                </span>
                <span className="text-xs font-bold text-slate-100">{selectedEquip.tipo}</span>
                <span className="text-[10px] text-slate-400 font-hud">({selectedEquip.bairro})</span>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span>
                  Temperatura Chip:{' '}
                  <strong className={selectedEquip.temperaturaAtualC > 48 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                    {selectedEquip.temperaturaAtualC}°C
                  </strong>
                </span>
                <span>
                  Sinal 4G/IoT:{' '}
                  <strong className={selectedEquip.sinalRedeDb < -82 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                    {selectedEquip.sinalRedeDb} dBm
                  </strong>
                </span>
                <span>
                  Saúde do Hardware:{' '}
                  <strong className={selectedEquip.saudeEstimadaPercent < 50 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                    {selectedEquip.saudeEstimadaPercent}%
                  </strong>
                </span>
              </div>
            </div>

            {/* Gráfico de Barras de Projeção de Degradação */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>CURVA DE VIDA ÚTIL RESIDUAL (RUL) NAS PRÓXIMAS SEMANAS:</span>
                <span className="text-red-400">
                  Blackout estimado em: <strong>{selectedEquip.diasEstimadosAteFalha} dias</strong> se não houver manutenção
                </span>
              </div>

              <div className="grid grid-cols-6 gap-2 pt-1">
                {degradationPoints.map((pt, i) => {
                  let barColor = 'bg-emerald-500';
                  if (pt.health <= 30) barColor = 'bg-red-500 animate-pulse';
                  else if (pt.health <= 60) barColor = 'bg-amber-500';

                  return (
                    <div key={i} className="flex flex-col items-center justify-end bg-slate-900/60 p-2 border border-slate-800 rounded">
                      <span className="font-mono text-[9px] text-slate-400 mb-1">{pt.label}</span>
                      <div className="w-full h-16 bg-slate-950 rounded overflow-hidden flex items-end">
                        <div
                          className={`w-full ${barColor} transition-all`}
                          style={{ height: `${pt.health}%` }}
                        />
                      </div>
                      <span className="font-pixel text-[9px] mt-1 text-slate-200">
                        {pt.health}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ação Prescritiva de Manutenção */}
            <div className="p-2.5 bg-purple-950/20 border border-purple-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-pixel text-[9px] text-purple-400 block">
                  DIAGNÓSTICO PREDITIVO PREVENTIVO (IA):
                </span>
                <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                  {selectedEquip.motivoSuspeito}
                </p>
              </div>

              <PixelButton
                variant={selectedEquip.probabilidadeFalha15Dias >= 70 ? 'danger' : 'warning'}
                className="text-[9px] py-1.5 px-3 whitespace-nowrap active:scale-95"
                onClick={() => onOpenOrder(selectedEquip.equipamentoId)}
              >
                <Wrench size={12} />
                <span>GERAR ORDEM DE SERVIÇO IMEDIATA</span>
              </PixelButton>
            </div>
          </div>
        )}
      </div>

      {/* Lista de Equipamentos com Predição de Falha */}
      <div className="pixel-box bg-slate-900/90 border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h4 className="font-pixel text-xs text-slate-300">
            EQUIPAMENTOS COM MAIOR RISCO DE PARADA // PRÓXIMOS 15 DIAS
          </h4>
          <span className="text-[10px] text-slate-500 font-mono">
            Clique para inspecionar a curva RUL
          </span>
        </div>

        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {predictions.map((pred) => {
            const isSelected = selectedEquipId === pred.equipamentoId;
            let cardStyle = 'border-slate-800 bg-slate-950/80 hover:border-slate-700';
            if (pred.urgenciaPreventiva === 'critica') {
              cardStyle = 'border-red-500/70 bg-red-950/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
            } else if (pred.urgenciaPreventiva === 'alta') {
              cardStyle = 'border-amber-500/70 bg-amber-950/20';
            }

            if (isSelected) {
              cardStyle += ' ring-2 ring-purple-400';
            }

            return (
              <div
                key={pred.equipamentoId}
                onClick={() => setSelectedEquipId(pred.equipamentoId)}
                className={`p-3 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer rounded transition-all ${cardStyle}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-sky-400">
                      {pred.numeroSerie}
                    </span>
                    <span className="text-xs text-slate-300 font-semibold">• {pred.tipo}</span>
                    <span className="text-[10px] text-slate-400 font-hud">({pred.bairro})</span>

                    {pred.urgenciaPreventiva === 'critica' && (
                      <span className="font-pixel text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded-sm animate-pulse">
                        PARADA IMINENTE
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    <span className="text-slate-500">Diagnóstico PROMETHEUS:</span> {pred.motivoSuspeito}
                  </p>

                  <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono mt-1.5 flex-wrap">
                    <span>MTBF: {pred.mtbfHoras}h</span>
                    <span>Operação: {pred.horasOperacaoAtual}h</span>
                    <span>
                      Dias até Blackout:{' '}
                      <strong className={pred.diasEstimadosAteFalha <= 3 ? 'text-red-400 font-bold' : 'text-slate-300'}>
                        {pred.diasEstimadosAteFalha} dias
                      </strong>
                    </span>
                    <span>
                      Custo Evitado: <strong className="text-emerald-400 font-bold">R$ {pred.custoParadaEstimadoRs.toLocaleString('pt-BR')}</strong>
                    </span>
                  </div>
                </div>

                {/* Probabilidade e Ação */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                  <div className="text-right">
                    <div className="text-[9px] text-slate-400 font-hud">Probabilidade Falha</div>
                    <div
                      className={`font-pixel text-base font-bold ${
                        pred.probabilidadeFalha15Dias >= 70
                          ? 'text-red-400'
                          : pred.probabilidadeFalha15Dias >= 40
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {pred.probabilidadeFalha15Dias}%
                    </div>
                  </div>

                  <PixelButton
                    variant={pred.probabilidadeFalha15Dias >= 70 ? 'danger' : 'secondary'}
                    className="text-[9px] py-1.5 px-2.5 whitespace-nowrap active:scale-95"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenOrder(pred.equipamentoId);
                    }}
                  >
                    <Wrench size={12} />
                    <span>EMITIR O.S.</span>
                  </PixelButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
