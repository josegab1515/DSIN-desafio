import { Equipment } from '../types/equipment';
import { Agent } from '../types/agent';
import { IncidentAlert } from '../types/alert';

export type SimulationCallback = (data: {
  equipments: Equipment[];
  agents: Agent[];
  newAlert?: IncidentAlert;
}) => void;

class TelemetrySimulator {
  private timer: number | null = null;
  private isRunning: boolean = true;
  private listeners: SimulationCallback[] = [];

  public subscribe(cb: SimulationCallback): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  public start(equipments: Equipment[], agents: Agent[]) {
    if (this.timer) return;
    this.isRunning = true;

    this.timer = window.setInterval(() => {
      if (!this.isRunning) return;

      // Movimentar viaturas e agentes em patrulha ligeiramente (micro-deslocamento realista)
      const updatedAgents = agents.map((agent) => {
        if (agent.status === 'em_patrulha') {
          const deltaLat = (Math.random() - 0.5) * 0.0006;
          const deltaLng = (Math.random() - 0.5) * 0.0006;
          return {
            ...agent,
            localizacaoAtual: {
              ...agent.localizacaoAtual,
              lat: Number((agent.localizacaoAtual.lat + deltaLat).toFixed(5)),
              lng: Number((agent.localizacaoAtual.lng + deltaLng).toFixed(5)),
              ultimaAtualizacao: 'Agora mesmo'
            }
          };
        }
        return agent;
      });

      // Atualizar telemetria dos equipamentos
      const updatedEquipments = equipments.map((eq) => {
        if (!eq.telemetria || eq.situacao !== 'operacional') return eq;

        const deltaVeiculos = Math.floor(Math.random() * 3);
        const deltaTemp = Number(((Math.random() - 0.5) * 0.2).toFixed(1));

        return {
          ...eq,
          telemetria: {
            ...eq.telemetria,
            ultimaLeitura: 'Agora mesmo',
            veiculosDetectadosHoje: (eq.telemetria.veiculosDetectadosHoje || 0) + deltaVeiculos,
            temperaturaChipC: Number((eq.telemetria.temperaturaChipC + deltaTemp).toFixed(1))
          }
        };
      });

      this.listeners.forEach((listener) => {
        listener({
          equipments: updatedEquipments,
          agents: updatedAgents
        });
      });
    }, 3000);
  }

  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.isRunning = false;
  }

  public toggle(): boolean {
    this.isRunning = !this.isRunning;
    return this.isRunning;
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  public triggerRandomIncident(equipments: Equipment[]): IncidentAlert {
    const operationalEq = equipments.filter((e) => e.situacao === 'operacional');
    const targetEq = operationalEq[Math.floor(Math.random() * operationalEq.length)] || equipments[0];

    const incidentTypes = [
      {
        cat: 'infracao_grave' as const,
        sev: 'alerta' as const,
        titulo: `Excesso Crítico de Velocidade (88 km/h em via de 50)`,
        desc: `Veículo flagrado ultrapassando limite em ${targetEq.localizacao.rua} pelo sensor ${targetEq.numeroSerie}.`
      },
      {
        cat: 'congestionamento_anormal' as const,
        sev: 'alerta' as const,
        titulo: `Retenção Súbita de Tráfego Detectada`,
        desc: `Fluxo de veículos na via ${targetEq.localizacao.rua} reduziu em 60% nos últimos 5 minutos.`
      },
      {
        cat: 'falha_equipamento' as const,
        sev: 'critico' as const,
        titulo: `Queda de Tensão Elétrica no Sensor ${targetEq.numeroSerie}`,
        desc: `Telemetria acusa variação brusca de voltagem no equipamento localizado no ${targetEq.localizacao.bairro}.`
      }
    ];

    const chosen = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];

    return {
      id: `ALT-SIM-${Date.now().toString().slice(-4)}`,
      categoria: chosen.cat,
      severidade: chosen.sev,
      titulo: chosen.titulo,
      descricao: chosen.desc,
      bairro: targetEq.localizacao.bairro,
      lat: targetEq.localizacao.lat,
      lng: targetEq.localizacao.lng,
      equipamentoId: targetEq.id,
      timestamp: 'Agora mesmo',
      resolvido: false
    };
  }
}

export const telemetrySimulator = new TelemetrySimulator();
