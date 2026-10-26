import { Equipment } from '../types/equipment';
import { Agent } from '../types/agent';
import { IncidentAlert } from '../types/alert';
import {
  DistrictRisk,
  HourlyRiskPrediction,
  EquipmentFailurePrediction,
  AnomalyDetection,
  PredictiveRecommendation
} from '../types/predictive';
import { CITY_DISTRICTS } from '../data/mockData';

export class PredictiveEngine {
  /**
   * Calcula o Índice de Risco Urbano (IRU) de cada bairro com base em equipamentos,
   * incidentes históricos, presença de agentes e telemetria.
   */
  public static calculateDistrictRisks(
    equipments: Equipment[],
    alerts: IncidentAlert[],
    agents: Agent[]
  ): DistrictRisk[] {
    return CITY_DISTRICTS.map((bairro) => {
      const eqInDistrict = equipments.filter((e) => e.localizacao.bairro === bairro);
      const alertsInDistrict = alerts.filter((a) => a.bairro === bairro && !a.resolvido);
      const agentsInDistrict = agents.filter(
        (ag) => ag.localizacaoAtual.bairro === bairro && ag.status !== 'folga'
      );

      const failedEq = eqInDistrict.filter(
        (e) => e.situacao === 'mau_funcionamento' || e.situacao === 'furtado'
      ).length;

      // Cálculo de pontuação base
      let score = 20; // Risco basal urbano
      score += alertsInDistrict.length * 15;
      score += failedEq * 12;

      // Se não há agentes no bairro e há alertas
      const viaturasRecomendadas = Math.max(1, Math.ceil((alertsInDistrict.length * 1.5) + (eqInDistrict.length * 0.3)));
      const viaturasAtuais = agentsInDistrict.length;
      const deficit = Math.max(0, viaturasRecomendadas - viaturasAtuais);
      score += deficit * 10;

      // Bairros naturalmente densos
      if (bairro === 'Centro' || bairro === 'Fragata') score += 10;
      if (bairro === 'Distrito Industrial') score += 5;

      const finalScore = Math.min(98, Math.max(8, score));

      let nivelRisco: DistrictRisk['nivelRisco'] = 'baixo';
      if (finalScore >= 75) nivelRisco = 'critico';
      else if (finalScore >= 50) nivelRisco = 'alto';
      else if (finalScore >= 30) nivelRisco = 'moderado';

      const probAcidente = Math.min(95, Math.round(finalScore * 0.92));
      const probCongestionamento = Math.min(99, Math.round(finalScore * 1.05));

      const fatores: string[] = [];
      if (failedEq > 0) fatores.push(`${failedEq} equipamento(s) IoT com falha ou avaria`);
      if (deficit > 0) fatores.push(`Déficit de ${deficit} equipe(s) operacional(is) em ronda`);
      if (alertsInDistrict.length > 0) fatores.push(`${alertsInDistrict.length} ocorrência(s) ativa(s) no setor`);
      if (bairro === 'Centro') fatores.push('Alta densidade comercial e confluência de corredores viários');
      if (bairro === 'Distrito Industrial') fatores.push('Tráfego intenso de veículos pesados e carretas');
      if (fatores.length === 0) fatores.push('Operação nominal estabilizada dentro dos limites');

      return {
        bairro,
        indiceRiscoAtual: finalScore,
        nivelRisco,
        probabilidadeAcidente: probAcidente,
        probabilidadeCongestionamento: probCongestionamento,
        principaisFatores: fatores,
        viaturasRecomendadas,
        viaturasAtuais,
        deficitViaturas: deficit
      };
    }).sort((a, b) => b.indiceRiscoAtual - a.indiceRiscoAtual);
  }

  /**
   * Previsão da curva horária de risco das próximas 24 horas
   */
  public static predictHourlyRiskCurve(): HourlyRiskPrediction[] {
    const hours = [
      { hora: '06:00', risk: 28, critical: 'Distrito Industrial', vol: 4200 },
      { hora: '07:30', risk: 82, critical: 'Centro', vol: 15400 },
      { hora: '09:00', risk: 64, critical: 'Centro', vol: 11200 },
      { hora: '11:30', risk: 71, critical: 'Centro', vol: 12800 },
      { hora: '13:00', risk: 58, critical: 'Campus Universitário', vol: 9600 },
      { hora: '15:00', risk: 45, critical: 'Fragata', vol: 8100 },
      { hora: '17:30', risk: 94, critical: 'Centro', vol: 18900 },
      { hora: '19:00', risk: 88, critical: 'Fragata', vol: 16500 },
      { hora: '21:00', risk: 52, critical: 'Cascata', vol: 7200 },
      { hora: '23:00', risk: 36, critical: 'Distrito Industrial', vol: 3800 },
      { hora: '02:00', risk: 22, critical: 'Palmital', vol: 1400 },
      { hora: '05:00', risk: 25, critical: 'Distrito Industrial', vol: 2900 }
    ];

    return hours.map((h) => ({
      hora: h.hora,
      indiceRiscoGeral: h.risk,
      bairroMaisCritico: h.critical,
      volumeEsperadoVeiculos: h.vol
    }));
  }

  /**
   * Predição de Falhas de Equipamentos nos próximos 15 dias (MTBF & Telemetria)
   */
  public static predictEquipmentFailures(equipments: Equipment[]): EquipmentFailurePrediction[] {
    return equipments
      .map((eq) => {
        let prob = 10;
        let motivo = 'Operação nominal com parâmetros térmicos e de sinal estáveis.';
        let dias = 45;

        const temp = eq.telemetria?.temperaturaChipC || 35;
        const sinal = eq.telemetria?.sinalRedeDb || -60;

        if (eq.situacao === 'mau_funcionamento') {
          prob = 95;
          dias = 1;
          motivo = 'Equipamento já apresenta inconsistência crítica de sensor e laço.';
        } else if (eq.situacao === 'em_manutencao') {
          prob = 80;
          dias = 2;
          motivo = 'Interrupção de sinal de fibra óptica ou hardware em bancada.';
        } else if (temp > 50) {
          prob = 78;
          dias = 4;
          motivo = `Sobreaquecimento térmico contínuo (${temp}°C) acelerando degradação do circuito.`;
        } else if (sinal < -85) {
          prob = 65;
          dias = 7;
          motivo = `Atenuação crítica do sinal 4G/IoT (${sinal} dBm) sujeita a blackout de telemetria.`;
        } else if (eq.necessidadeManutencao === 'agendada_periodica') {
          prob = 48;
          dias = 12;
          motivo = 'Ciclo de calibração periódica próximo ao vencimento regulatório.';
        } else {
          prob = Math.floor(Math.random() * 15) + 8;
          dias = Math.floor(Math.random() * 30) + 30;
        }

        let urgencia: EquipmentFailurePrediction['urgenciaPreventiva'] = 'baixa';
        if (prob >= 75) urgencia = 'critica';
        else if (prob >= 60) urgencia = 'alta';
        else if (prob >= 40) urgencia = 'media';

        return {
          equipamentoId: eq.id,
          numeroSerie: eq.numeroSerie,
          tipo: eq.tipo.replace('_', ' ').toUpperCase(),
          bairro: eq.localizacao.bairro,
          probabilidadeFalha15Dias: prob,
          diasEstimadosAteFalha: dias,
          motivoSuspeito: motivo,
          urgenciaPreventiva: urgencia,
          mtbfHoras: 8760, // 1 ano médio
          horasOperacaoAtual: Math.floor(Math.random() * 4000) + 3000
        };
      })
      .sort((a, b) => b.probabilidadeFalha15Dias - a.probabilidadeFalha15Dias);
  }

  /**
   * Detecção de anomalias estatísticas em tempo real
   */
  public static detectAnomalies(equipments: Equipment[]): AnomalyDetection[] {
    const anomalies: AnomalyDetection[] = [];

    equipments.forEach((eq) => {
      const tel = eq.telemetria;
      if (!tel) return;

      if (tel.temperaturaChipC > 52) {
        anomalies.push({
          id: `ANOM-T-${eq.id}`,
          tipo: 'temperatura_alta',
          equipamentoId: eq.id,
          localizacao: `${eq.localizacao.rua} (${eq.localizacao.bairro})`,
          valorDetectado: `${tel.temperaturaChipC}°C`,
          valorEsperado: '32°C a 42°C',
          desvioPadraoZScore: 3.4,
          descricao: 'Temperatura de circuito ultrapassou o limiar de alerta térmico.',
          dataHora: 'Hoje às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        });
      }

      if (tel.sinalRedeDb < -88 && eq.situacao !== 'furtado') {
        anomalies.push({
          id: `ANOM-S-${eq.id}`,
          tipo: 'sinal_iot_degradado',
          equipamentoId: eq.id,
          localizacao: `${eq.localizacao.rua} (${eq.localizacao.bairro})`,
          valorDetectado: `${tel.sinalRedeDb} dBm`,
          valorEsperado: '>-75 dBm',
          desvioPadraoZScore: 2.8,
          descricao: 'Degradação severa de enlace de rádio/telemetria com a nuvem PROMETHEUS.',
          dataHora: 'Hoje às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        });
      }
    });

    return anomalies;
  }

  /**
   * Gera Recomendações Automáticas Inteligentes do PROMETHEUS
   */
  public static generateRecommendations(
    districtRisks: DistrictRisk[],
    failurePredictions: EquipmentFailurePrediction[]
  ): PredictiveRecommendation[] {
    const recommendations: PredictiveRecommendation[] = [];

    // Recomendações baseadas nos bairros mais críticos
    const topRisk = districtRisks[0];
    if (topRisk && topRisk.deficitViaturas > 0) {
      recommendations.push({
        id: 'REC-DISP-01',
        titulo: `Despacho Preventivo de Viaturas para o ${topRisk.bairro}`,
        justificativa: `O bairro ${topRisk.bairro} está com Índice de Risco de ${topRisk.indiceRiscoAtual}% e déficit de ${topRisk.deficitViaturas} equipe(s). Probabilidade de gargalo: ${topRisk.probabilidadeCongestionamento}%.`,
        acaoSugerida: `Redirecionar 1 viatura da Guarda Municipal e 1 moto de trânsito em patrulha para cobrir os principais cruzamentos do ${topRisk.bairro}.`,
        impactoEsperado: 'Redução estimada de 34% no tempo de resposta e mitigação de risco de acidentes em 41%.',
        tipoAcao: 'despacho_viatura',
        prioridade: 'critica',
        aplicada: false,
        bairroAlvo: topRisk.bairro
      });
    }

    // Recomendações de manutenção preventiva
    const topFailure = failurePredictions.find((f) => f.probabilidadeFalha15Dias >= 70);
    if (topFailure) {
      recommendations.push({
        id: 'REC-MANUT-02',
        titulo: `Manutenção Preventiva Prioritária: ${topFailure.numeroSerie}`,
        justificativa: `Equipamento ${topFailure.numeroSerie} (${topFailure.tipo}) apresenta ${topFailure.probabilidadeFalha15Dias}% de probabilidade de parada completa em até ${topFailure.diasEstimadosAteFalha} dias.`,
        acaoSugerida: `Emitir Ordem de Serviço preventiva imediata para calibração e verificação de hardware em campo.`,
        impactoEsperado: 'Evita a interrupção da fiscalização e perda estimada de dados telemétricos essenciais.',
        tipoAcao: 'manutencao_preventiva',
        prioridade: 'alta',
        aplicada: false,
        equipamentoAlvoId: topFailure.equipamentoId
      });
    }

    // Recomendações de sincronização semafórica preventiva
    recommendations.push({
      id: 'REC-SEM-03',
      titulo: 'Ativação de Plano Semafórico "Onda Verde - Horário de Pico"',
      justificativa: 'Algoritmo preditivo antecipa aumento de 45% no fluxo de saída do Centro pela Av. Sampaio Vidal e Av. Tiradentes entre 17h20 e 18h40.',
      acaoSugerida: 'Expandir o ciclo de tempo verde dos semáforos correlatos em +18 segundos no sentido Centro-Bairro.',
      impactoEsperado: 'Aumento de 26% na fluidez média da via e redução da retenção nos cruzamentos transversais.',
      tipoAcao: 'sincronizacao_semaforica',
      prioridade: 'alta',
      aplicada: false,
      bairroAlvo: 'Centro'
    });

    return recommendations;
  }
}
