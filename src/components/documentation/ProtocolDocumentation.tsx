import React from 'react';
import { PixelIcon } from '../common/PixelIcon';
import { BookOpen, Cpu, ShieldCheck, Terminal, Heart, Award, FileCode } from 'lucide-react';

export const ProtocolDocumentation: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto text-xs leading-relaxed">
      {/* Hero Box */}
      <div className="pixel-box bg-slate-900/90 border-2 border-amber-500/80 p-5 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-amber-500/20 border border-amber-500">
            <PixelIcon type="prometheus_logo" size={32} />
          </div>
          <div>
            <h2 className="font-pixel text-base text-amber-400 font-bold">
              MEMORIAL DESCRITIVO // SISTEMA F.O.G.O.
            </h2>
            <p className="text-xs text-slate-300 font-hud">
              PROTOCOLO PROMETHEUS • DSIN CODERCHALLENGE 2026 (ETAPA BÔNUS)
            </p>
          </div>
        </div>
        <p className="text-slate-300">
          O <strong>F.O.G.O. (Ferramenta Onisciente de Gestão e Operações)</strong> foi concebido
          para entregar à IA PROMETHEUS e aos gestores urbanos uma plataforma unificada de
          monitoramento em tempo real, catalogação avançada de ativos IoT e capacidade preditiva
          prescritiva para mobilidade e segurança pública.
        </p>
      </div>

      {/* Declaração Obrigatória de IA (conforme edital) */}
      <div className="pixel-box bg-slate-900/90 border-2 border-purple-500 p-5">
        <div className="flex items-center gap-2 mb-2 font-pixel text-xs text-purple-400 font-bold">
          <Cpu size={16} />
          <span>DECLARAÇÃO DE TRANSPARÊNCIA: USO DE IA (PROMETHEUS, NÃO TENHA CIÚMES!)</span>
        </div>
        <div className="space-y-2 text-slate-300">
          <p>
            Em total conformidade com o edital do desafio (<em>"Se fizer uso de alguma, mencione qual(is)... demonstre entendimento daquilo que ela construiu"</em>):
          </p>
          <div className="p-3 bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-[11px]">
            <div>
              🤖 <strong>IA Auxiliar:</strong> Antigravity / Gemini 3.8 Flash (DeepMind).
            </div>
            <div>
              🧠 <strong>Papel Humano & Arquitetura:</strong> Engenharia dos requisitos do F.O.G.O.,
              design dos esquemas polimórficos de IoT, definição dos algoritmos preditivos (IRU, MTBF e
              anomalias estatísticas com Z-Score) e estruturação do design system temático em Pixel Art
              com fallback para Clean Dark Mode corporativo.
            </div>
          </div>
        </div>
      </div>

      {/* Resumo da Solução das 3 Partes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="pixel-box bg-slate-900/70 p-4 border-sky-500/60">
          <h3 className="font-pixel text-xs text-sky-400 mb-2">1ª PARTE: INVENTÁRIO IoT</h3>
          <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px]">
            <li>Catalogação completa de 14 tipos de equipamentos e agentes operacionais.</li>
            <li>Polimorfismo dinâmico: campos específicos por classe (LPR, visão noturna, radares, pesagem WIM).</li>
            <li>Visor Holográfico 3D interativo com iluminação e rotação em tempo real.</li>
            <li>CCTV ao vivo simulado (Modos Dia, Visão Noturna IR e Câmera Térmica).</li>
            <li>Google Street View 360° embutido direto no painel com coordenadas reais de Marília.</li>
            <li>Rastreamento de manutenção preventiva e corretiva com datas e O.S.</li>
          </ul>
        </div>

        <div className="pixel-box bg-slate-900/70 p-4 border-emerald-500/60">
          <h3 className="font-pixel text-xs text-emerald-400 mb-2">2ª PARTE: CENTRAL CICC</h3>
          <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px]">
            <li>Mapa dinâmico (Leaflet) calibrado nos cruzamentos semafóricos reais de Marília/SP.</li>
            <li>Marcadores temáticos em Pixel Art com halos pulsantes e aproximação suave (flyTo).</li>
            <li>Simulador de telemetria IoT vivo com micro-deslocamento realista de patrulhas.</li>
            <li>Painel de saúde operacional consolidado por regiões e bairros.</li>
            <li>Feed de alertas e ocorrências em tempo real com foco no mapa e encerramento.</li>
            <li>Síntese sonora chiptune 8-bit nativa via Web Audio API.</li>
          </ul>
        </div>

        <div className="pixel-box bg-slate-900/70 p-4 border-purple-500/60">
          <h3 className="font-pixel text-xs text-purple-400 mb-2">3ª PARTE: CIDADE PREDITIVA</h3>
          <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px]">
            <li>Simulador de Cenários What-If ("O que acontece amanhã?", impacto de chuva e reforço de viaturas).</li>
            <li>Mapa de Calor Geográfico/Topológico interativo de Marília com manchas térmicas radiais.</li>
            <li>Linha do Tempo 24h com animação/autoplay e estimativa de tempo de espera em semáforos.</li>
            <li>Previsão de Falhas MTBF com Curva RUL de degradação e cálculo de custos evitados.</li>
            <li>Detecção de anomalias estatísticas com visualização de Curva Normal Gaussiana e Z-Score.</li>
            <li>Fichas Técnicas dos Modelos (Explainable AI - XAI) e Boletim Executivo para impressão/PDF.</li>
          </ul>
        </div>
      </div>

      {/* Fórmulas Matemáticas Preditivas Utilizadas */}
      <div className="pixel-box bg-slate-900/90 border-slate-800 p-4 space-y-2">
        <h3 className="font-pixel text-xs text-amber-400 flex items-center gap-1.5">
          <Terminal size={14} />
          <span>MODELAGEM MATEMÁTICA & ALGORITMOS PREDITIVOS</span>
        </h3>
        <div className="space-y-2 text-slate-300 text-[11px]">
          <div>
            <strong className="text-slate-100 font-mono">1. Índice de Risco Urbano (IRU):</strong>
            <pre className="bg-slate-950 p-2 border border-slate-800 text-sky-300 font-mono text-[10px] mt-1 overflow-x-auto">
              IRU = Min(98, RiscoBasal(20) + (Alertas * 15) + (EquipFalhos * 12) + (DéficitViaturas * 10) + FatorBairro)
            </pre>
          </div>
          <div>
            <strong className="text-slate-100 font-mono">2. Detecção de Anomalias Estatísticas:</strong>
            <pre className="bg-slate-950 p-2 border border-slate-800 text-purple-300 font-mono text-[10px] mt-1 overflow-x-auto">
              Z = (ValorObservado - MédiaHistórica) / DesvioPadrão &gt; 2.5σ
            </pre>
          </div>
          <div>
            <strong className="text-slate-100 font-mono">3. Previsão de Falha MTBF em 15 Dias:</strong>
            <pre className="bg-slate-950 p-2 border border-slate-800 text-amber-300 font-mono text-[10px] mt-1 overflow-x-auto">
              P_falha = BaseProb + FatorDegradaçãoTérmica(T &gt; 50°C) + AtenuaçãoSinal(dBm &lt; -85) + VencimentoCalibração
            </pre>
          </div>
        </div>
      </div>

      {/* Instruções para Executar de Primeira */}
      <div className="pixel-box bg-slate-900/90 border-slate-800 p-4 space-y-2">
        <h3 className="font-pixel text-xs text-emerald-400 flex items-center gap-1.5">
          <Award size={14} />
          <span>GARANTIA DE "RODAR DE PRIMEIRA COM UM SORRISO NO ROSTO"</span>
        </h3>
        <p className="text-slate-300 text-[11px]">
          O projeto foi desenvolvido em arquitetura web moderna ultra-leve, sem dependência de banco
          externo ou containers pesados que poderiam falhar na máquina do avaliador:
        </p>
        <pre className="bg-slate-950 p-2.5 border border-slate-800 text-emerald-300 font-mono text-[11px] overflow-x-auto">
          npm install
          npm run dev
        </pre>
        <p className="text-slate-400 text-[10px]">
          Ao iniciar, a aplicação carrega automaticamente os dados realistas de Marília/SP
          (sede da DSIN). É possível também exportar, importar ou restaurar a base padrão a qualquer momento.
        </p>
      </div>
    </div>
  );
};
