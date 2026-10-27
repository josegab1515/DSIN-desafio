import { Equipment } from '../types/equipment';
import { Agent } from '../types/agent';
import { IncidentAlert } from '../types/alert';

export const INITIAL_EQUIPMENTS: Equipment[] = [
  {
    id: 'EQ-001',
    tipo: 'radar_velocidade',
    numeroSerie: 'RAD-VEL-9921',
    marca: 'FiscalTech IoT',
    modelo: 'SpeedGuard Pro 200',
    localizacao: {
      cep: '17500-010',
      bairro: 'Centro',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Av. Sampaio Vidal',
      referencia: 'Av. Sampaio Vidal, nº 1181 (Próximo à Prefeitura e cruzamento semafórico com Rua Bahia)',
      lat: -22.21494,
      lng: -49.94936
    },
    situacao: 'operacional',
    necessidadeManutencao: 'nenhuma',
    dataProximaManutencao: '2026-11-20',
    orgaoResponsavel: 'Secretaria de Trânsito',
    especificas: {
      velocidadeMaxima: 50,
      faixasMonitoradas: 3,
      tipoInfracao: 'velocidade'
    },
    telemetria: {
      ultimaLeitura: 'Há 2 minutos',
      temperaturaChipC: 41.2,
      voltagemV: 12.4,
      sinalRedeDb: -64,
      veiculosDetectadosHoje: 8420,
      infracoesRegistradasHoje: 14
    },
    criadoEm: '2026-08-10T10:00:00Z',
    atualizadoEm: '2026-10-26T08:30:00Z'
  },
  {
    id: 'EQ-002',
    tipo: 'camera_monitoramento',
    numeroSerie: 'CAM-4K-1082',
    marca: 'Intelbras Vision',
    modelo: 'VIP 9420 LPR DarkFighter',
    localizacao: {
      cep: '17501-000',
      bairro: 'Centro',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Av. Sampaio Vidal x Rua Nove de Julho',
      referencia: 'Cruzamento Central com Conjunto Semafórico de 4 Tempos e Câmera LPR',
      lat: -22.2155,
      lng: -49.9483
    },
    situacao: 'operacional',
    necessidadeManutencao: 'agendada_periodica',
    dataProximaManutencao: '2026-10-30',
    orgaoResponsavel: 'Guarda Municipal',
    especificas: {
      temVisaoNoturna: true,
      resolucao: '4K',
      tipoCor: 'colorida',
      zoomOtico: '32x',
      iaEmbarcadaLpr: true
    },
    telemetria: {
      ultimaLeitura: 'Há 1 minuto',
      temperaturaChipC: 45.8,
      voltagemV: 48.0,
      sinalRedeDb: -58,
      veiculosDetectadosHoje: 12350
    },
    criadoEm: '2026-07-15T09:00:00Z',
    atualizadoEm: '2026-10-26T09:10:00Z'
  },
  {
    id: 'EQ-003',
    tipo: 'radar_semaforo',
    numeroSerie: 'RAD-SEM-3041',
    marca: 'Consladel IoT',
    modelo: 'RedLight Sentinel X',
    localizacao: {
      cep: '17515-000',
      bairro: 'Fragata',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Av. Tiradentes x Rua das Roseiras',
      referencia: 'Cruzamento Semafórico da Av. Tiradentes (Em frente ao Supermercado Confiança / Mc Donalds)',
      lat: -22.2226,
      lng: -49.9378
    },
    situacao: 'mau_funcionamento',
    necessidadeManutencao: 'imediata',
    dataProximaManutencao: '2026-10-27',
    descricaoProblema: 'Sensor de laço indutivo apresentando leituras intermitentes de avanço.',
    orgaoResponsavel: 'Secretaria de Trânsito',
    especificas: {
      velocidadeMaxima: 60,
      faixasMonitoradas: 2,
      tipoInfracao: 'avanco_semaforo'
    },
    telemetria: {
      ultimaLeitura: 'Há 15 minutos',
      temperaturaChipC: 58.6,
      voltagemV: 10.8,
      sinalRedeDb: -89,
      veiculosDetectadosHoje: 3200,
      infracoesRegistradasHoje: 0
    },
    criadoEm: '2026-06-20T14:30:00Z',
    atualizadoEm: '2026-10-26T07:15:00Z'
  },
  {
    id: 'EQ-004',
    tipo: 'balanca_caminhao',
    numeroSerie: 'BAL-WIM-008',
    marca: 'Toledo do Brasil',
    modelo: 'Highway Weigh-in-Motion 9000',
    localizacao: {
      cep: '17523-000',
      bairro: 'Distrito Industrial',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Rod. Cmte. João Ribeiro de Barros (SP-294)',
      referencia: 'KM 451 - Sentido Bauru',
      lat: -22.2389,
      lng: -49.9142
    },
    situacao: 'operacional',
    necessidadeManutencao: 'agendada_periodica',
    dataProximaManutencao: '2026-11-15',
    orgaoResponsavel: 'Secretaria de Trânsito',
    especificas: {
      capacidadeToneladas: 80,
      pesagemEmMovimento: true
    },
    telemetria: {
      ultimaLeitura: 'Há 4 minutos',
      temperaturaChipC: 38.0,
      voltagemV: 220.0,
      sinalRedeDb: -62,
      veiculosDetectadosHoje: 1450,
      infracoesRegistradasHoje: 8
    },
    criadoEm: '2026-05-12T11:00:00Z',
    atualizadoEm: '2026-10-26T08:00:00Z'
  },
  {
    id: 'EQ-005',
    tipo: 'totem_rotativo',
    numeroSerie: 'TOT-ROT-501',
    marca: 'DigiSat Urbano',
    modelo: 'ParkPay Solar Touch',
    localizacao: {
      cep: '17500-100',
      bairro: 'Centro',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Av. Santo Antônio',
      referencia: 'Em frente ao Banco do Brasil (nº 230)',
      lat: -22.2131,
      lng: -49.9548
    },
    situacao: 'operacional',
    necessidadeManutencao: 'nenhuma',
    dataProximaManutencao: '2026-12-05',
    orgaoResponsavel: 'Mobilidade Urbana (Parcerias)',
    especificas: {
      aceitaPixCartao: true,
      nivelPapel: 85,
      bateriaSolar: true
    },
    telemetria: {
      ultimaLeitura: 'Há 6 minutos',
      temperaturaChipC: 36.4,
      voltagemV: 13.8,
      sinalRedeDb: -55
    },
    criadoEm: '2026-09-01T08:00:00Z',
    atualizadoEm: '2026-10-26T09:05:00Z'
  },
  {
    id: 'EQ-006',
    tipo: 'patinete_eletrico',
    numeroSerie: 'PAT-ELET-042',
    marca: 'Grin & Go Urban',
    modelo: 'Ninebot Max Pro IoT',
    localizacao: {
      cep: '17516-000',
      bairro: 'Cascata',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Av. das Esmeraldas',
      referencia: 'Ponto Ciclovia Esmeraldas - Quiosque 2',
      lat: -22.2341,
      lng: -49.9320
    },
    situacao: 'operacional',
    necessidadeManutencao: 'nenhuma',
    orgaoResponsavel: 'Mobilidade Urbana (Parcerias)',
    especificas: {
      nivelBateriaCombustivel: 92,
      autonomiaKm: 38,
      odometro: 1420
    },
    telemetria: {
      ultimaLeitura: 'Há 3 minutos',
      temperaturaChipC: 28.5,
      voltagemV: 42.0,
      sinalRedeDb: -60
    },
    criadoEm: '2026-08-25T16:00:00Z',
    atualizadoEm: '2026-10-26T09:12:00Z'
  },
  {
    id: 'EQ-007',
    tipo: 'patinete_eletrico',
    numeroSerie: 'PAT-ELET-089',
    marca: 'Grin & Go Urban',
    modelo: 'Ninebot Max Pro IoT',
    localizacao: {
      cep: '17516-100',
      bairro: 'Cascata',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Rua das Roseiras',
      referencia: 'Ao lado do Bosque Municipal',
      lat: -22.2365,
      lng: -49.9298
    },
    situacao: 'furtado',
    necessidadeManutencao: 'imediata',
    descricaoProblema: 'Dispositivo emitiu alerta de violação de perímetro de segurança (Geofence Breach) e GPS estático.',
    orgaoResponsavel: 'Mobilidade Urbana (Parcerias)',
    especificas: {
      nivelBateriaCombustivel: 14,
      autonomiaKm: 5,
      odometro: 2180
    },
    telemetria: {
      ultimaLeitura: 'Há 45 minutos',
      temperaturaChipC: 24.1,
      voltagemV: 34.2,
      sinalRedeDb: -95
    },
    criadoEm: '2026-08-25T16:00:00Z',
    atualizadoEm: '2026-10-26T08:20:00Z'
  },
  {
    id: 'EQ-008',
    tipo: 'viatura_gm',
    numeroSerie: 'VTR-GM-04',
    marca: 'Chevrolet',
    modelo: 'Trailblazer V6 4x4 Policial IoT',
    localizacao: {
      cep: '17500-020',
      bairro: 'Centro',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Av. Sampaio Vidal',
      referencia: 'Em ronda pela área bancária central',
      lat: -22.2185,
      lng: -49.9465
    },
    situacao: 'operacional',
    necessidadeManutencao: 'nenhuma',
    dataProximaManutencao: '2026-11-10',
    orgaoResponsavel: 'Guarda Municipal',
    especificas: {
      nivelBateriaCombustivel: 78,
      autonomiaKm: 420,
      odometro: 34210,
      placa: 'BRA2E19'
    },
    telemetria: {
      ultimaLeitura: 'Há 30 segundos',
      temperaturaChipC: 39.0,
      voltagemV: 14.1,
      sinalRedeDb: -52
    },
    criadoEm: '2026-04-10T08:00:00Z',
    atualizadoEm: '2026-10-26T09:14:00Z'
  },
  {
    id: 'EQ-009',
    tipo: 'viatura_pm',
    numeroSerie: 'VTR-PM-130',
    marca: 'Toyota',
    modelo: 'Corolla Cross Tático 2.0',
    localizacao: {
      cep: '17509-020',
      bairro: 'Alto Cafezal',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Rua Castro Alves',
      referencia: 'Próximo à Praça da Saudade',
      lat: -22.2105,
      lng: -49.9421
    },
    situacao: 'operacional',
    necessidadeManutencao: 'nenhuma',
    orgaoResponsavel: 'Polícia Militar',
    especificas: {
      nivelBateriaCombustivel: 65,
      autonomiaKm: 360,
      odometro: 18900,
      placa: 'PMB8A44'
    },
    telemetria: {
      ultimaLeitura: 'Há 1 minuto',
      temperaturaChipC: 40.2,
      voltagemV: 14.2,
      sinalRedeDb: -55
    },
    criadoEm: '2026-05-18T10:00:00Z',
    atualizadoEm: '2026-10-26T09:13:00Z'
  },
  {
    id: 'EQ-010',
    tipo: 'moto_transito',
    numeroSerie: 'MOTO-TRA-07',
    marca: 'Honda',
    modelo: 'XRE 300 Rally Trânsito',
    localizacao: {
      cep: '17515-050',
      bairro: 'Fragata',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Rua Brigadeiro Eduardo Gomes',
      referencia: 'Em direção ao Aeroporto Estadual',
      lat: -22.2025,
      lng: -49.9280
    },
    situacao: 'operacional',
    necessidadeManutencao: 'nenhuma',
    orgaoResponsavel: 'Secretaria de Trânsito',
    especificas: {
      nivelBateriaCombustivel: 80,
      autonomiaKm: 240,
      odometro: 9840,
      placa: 'MOT9F21'
    },
    telemetria: {
      ultimaLeitura: 'Há 45 segundos',
      temperaturaChipC: 37.1,
      voltagemV: 12.6,
      sinalRedeDb: -58
    },
    criadoEm: '2026-06-01T09:00:00Z',
    atualizadoEm: '2026-10-26T09:15:00Z'
  },
  {
    id: 'EQ-011',
    tipo: 'cancela_automatizada',
    numeroSerie: 'CAN-AUTO-03',
    marca: 'PPA Automatizadores',
    modelo: 'Barrier Gate HighSpeed IoT',
    localizacao: {
      cep: '17525-000',
      bairro: 'Campus Universitário',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Av. Hygino Muzzi Filho',
      referencia: 'Portaria Principal Univem/Unesp (Entrada Sul)',
      lat: -22.2355,
      lng: -49.9650
    },
    situacao: 'operacional',
    necessidadeManutencao: 'agendada_periodica',
    dataProximaManutencao: '2026-11-05',
    orgaoResponsavel: 'Mobilidade Urbana (Parcerias)',
    especificas: {
      aceitaPixCartao: true
    },
    telemetria: {
      ultimaLeitura: 'Há 8 minutos',
      temperaturaChipC: 33.2,
      voltagemV: 220.0,
      sinalRedeDb: -68
    },
    criadoEm: '2026-03-10T14:00:00Z',
    atualizadoEm: '2026-10-26T08:45:00Z'
  },
  {
    id: 'EQ-012',
    tipo: 'veiculo_autonomo_rotativo',
    numeroSerie: 'CAR-AUT-01',
    marca: 'Prometheus Robotics',
    modelo: 'ScanMobile Autonomous Pod v1',
    localizacao: {
      cep: '17500-110',
      bairro: 'Centro',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Rua Nove de Julho',
      referencia: 'Fiscalização de vagas de estacionamento da Zona Azul',
      lat: -22.2162,
      lng: -49.9470
    },
    situacao: 'operacional',
    necessidadeManutencao: 'nenhuma',
    dataProximaManutencao: '2026-11-28',
    orgaoResponsavel: 'Mobilidade Urbana (Parcerias)',
    especificas: {
      nivelBateriaCombustivel: 72,
      autonomiaKm: 110,
      odometro: 3200,
      iaEmbarcadaLpr: true
    },
    telemetria: {
      ultimaLeitura: 'Há 1 minuto',
      temperaturaChipC: 44.5,
      voltagemV: 48.0,
      sinalRedeDb: -50,
      veiculosDetectadosHoje: 890,
      infracoesRegistradasHoje: 22
    },
    criadoEm: '2026-09-15T11:00:00Z',
    atualizadoEm: '2026-10-26T09:12:00Z'
  },
  {
    id: 'EQ-013',
    tipo: 'radar_conversao',
    numeroSerie: 'RAD-CONV-102',
    marca: 'Consladel IoT',
    modelo: 'NoTurn Forbidden Angle 400',
    localizacao: {
      cep: '17503-010',
      bairro: 'Alto Cafezal',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Av. Rio Branco x Av. Santo Antônio',
      referencia: 'Cruzamento semafórico com Av. Santo Antônio (Proibido Retorno / Conversão à Esquerda)',
      lat: -22.2212,
      lng: -49.9510
    },
    situacao: 'operacional',
    necessidadeManutencao: 'nenhuma',
    dataProximaManutencao: '2026-12-10',
    orgaoResponsavel: 'Secretaria de Trânsito',
    especificas: {
      tipoInfracao: 'conversao_proibida',
      faixasMonitoradas: 2
    },
    telemetria: {
      ultimaLeitura: 'Há 5 minutos',
      temperaturaChipC: 39.5,
      voltagemV: 12.2,
      sinalRedeDb: -65,
      veiculosDetectadosHoje: 4500,
      infracoesRegistradasHoje: 5
    },
    criadoEm: '2026-07-22T13:00:00Z',
    atualizadoEm: '2026-10-26T08:50:00Z'
  },
  {
    id: 'EQ-014',
    tipo: 'drone_vigilancia',
    numeroSerie: 'DRN-AIR-02',
    marca: 'DJI Enterprise Matrix',
    modelo: 'Matrice 350 RTK Prometheus AI',
    localizacao: {
      cep: '17516-200',
      bairro: 'Cascata',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Av. Vicente Ferreira',
      referencia: 'Voo estático sobre o Complexo do Bosque / Hemonúcleo',
      lat: -22.2312,
      lng: -49.9360
    },
    situacao: 'operacional',
    necessidadeManutencao: 'nenhuma',
    dataProximaManutencao: '2026-11-08',
    orgaoResponsavel: 'Guarda Municipal',
    especificas: {
      temVisaoNoturna: true,
      resolucao: '4K',
      tipoCor: 'colorida',
      nivelBateriaCombustivel: 84,
      autonomiaKm: 18,
      zoomOtico: '200x'
    },
    telemetria: {
      ultimaLeitura: 'Há 15 segundos',
      temperaturaChipC: 32.1,
      voltagemV: 24.5,
      sinalRedeDb: -42
    },
    criadoEm: '2026-09-05T15:00:00Z',
    atualizadoEm: '2026-10-26T09:14:00Z'
  },
  {
    id: 'EQ-015',
    tipo: 'camera_monitoramento',
    numeroSerie: 'CAM-IND-091',
    marca: 'Axis Communications',
    modelo: 'Q3538-LVE Thermal / Optical',
    localizacao: {
      cep: '17523-010',
      bairro: 'Distrito Industrial',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Av. Antonieta Altenfelder',
      referencia: 'KM 2 da via de acesso secundária às fábricas',
      lat: -22.2420,
      lng: -49.9100
    },
    situacao: 'em_manutencao',
    necessidadeManutencao: 'imediata',
    dataProximaManutencao: '2026-10-26',
    descricaoProblema: 'Cabo de fibra ótica de alimentação de dados rompido por caminhão em manobra.',
    orgaoResponsavel: 'Guarda Municipal',
    especificas: {
      temVisaoNoturna: true,
      resolucao: '1080p',
      tipoCor: 'colorida'
    },
    telemetria: {
      ultimaLeitura: 'Há 3 horas',
      temperaturaChipC: 22.0,
      voltagemV: 0.0,
      sinalRedeDb: -120
    },
    criadoEm: '2026-04-18T16:00:00Z',
    atualizadoEm: '2026-10-26T06:30:00Z'
  },
  {
    id: 'EQ-016',
    tipo: 'veiculo_transporte',
    numeroSerie: 'VAN-ESC-119',
    marca: 'Mercedes-Benz',
    modelo: 'Sprinter Van Escolar Segura IoT',
    localizacao: {
      cep: '17525-100',
      bairro: 'Campus Universitário',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Rua Almirante Barroso',
      referencia: 'Desembarque escolar em frente à ETEC',
      lat: -22.2325,
      lng: -49.9610
    },
    situacao: 'operacional',
    necessidadeManutencao: 'nenhuma',
    orgaoResponsavel: 'Secretaria de Trânsito',
    especificas: {
      nivelBateriaCombustivel: 88,
      autonomiaKm: 510,
      odometro: 54100,
      placa: 'ESC4E90'
    },
    telemetria: {
      ultimaLeitura: 'Há 2 minutos',
      temperaturaChipC: 36.8,
      voltagemV: 13.9,
      sinalRedeDb: -62
    },
    criadoEm: '2026-02-14T08:00:00Z',
    atualizadoEm: '2026-10-26T09:10:00Z'
  },
  {
    id: 'EQ-017',
    tipo: 'radar_velocidade',
    numeroSerie: 'RAD-NOVO-999',
    marca: 'FiscalTech IoT',
    modelo: 'SpeedGuard Pro 200',
    localizacao: {
      cep: '17506-000',
      bairro: 'Palmital',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Av. República',
      referencia: 'Poste 44 - Cruzamento com Rua Bahia',
      lat: -22.2080,
      lng: -49.9580
    },
    situacao: 'ainda_nao_instalado',
    necessidadeManutencao: 'agendada_periodica',
    dataProximaManutencao: '2026-11-01',
    descricaoProblema: 'Aguardando ligação do relógio de energia pela concessionária CPFL.',
    orgaoResponsavel: 'Secretaria de Trânsito',
    especificas: {
      velocidadeMaxima: 50,
      faixasMonitoradas: 2,
      tipoInfracao: 'velocidade'
    },
    criadoEm: '2026-10-20T10:00:00Z',
    atualizadoEm: '2026-10-26T08:00:00Z'
  },
  {
    id: 'EQ-018',
    tipo: 'totem_rotativo',
    numeroSerie: 'TOT-ROT-410',
    marca: 'DigiSat Urbano',
    modelo: 'ParkPay Standard',
    localizacao: {
      cep: '17500-200',
      bairro: 'Centro',
      cidade: 'Marília',
      uf: 'SP',
      rua: 'Rua Prudente de Moraes',
      referencia: 'Em frente ao Teatro Municipal',
      lat: -22.2140,
      lng: -49.9450
    },
    situacao: 'desativado',
    necessidadeManutencao: 'nenhuma',
    descricaoProblema: 'Vagas remodeladas para carga e descarga provisória da Feira de Artesanato.',
    orgaoResponsavel: 'Mobilidade Urbana (Parcerias)',
    especificas: {
      aceitaPixCartao: false,
      nivelPapel: 0
    },
    criadoEm: '2026-01-10T12:00:00Z',
    atualizadoEm: '2026-10-25T18:00:00Z'
  }
];

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'AG-01',
    matricula: 'TR-4819',
    nome: 'Carlos Eduardo Mendes',
    corporacao: 'Agente de Trânsito',
    cargo: 'Inspetor de Operações Viárias',
    status: 'em_patrulha',
    equipeViatura: 'MOTO-TRA-07',
    equipamentoVinculadoId: 'EQ-010',
    telefoneRadio: 'Canal 4 - Trânsito Centro',
    localizacaoAtual: {
      lat: -22.2025,
      lng: -49.9280,
      bairro: 'Fragata',
      ultimaAtualizacao: 'Há 45 segundos'
    },
    criadoEm: '2026-01-15T08:00:00Z'
  },
  {
    id: 'AG-02',
    matricula: 'GM-1092',
    nome: 'Fabiana Souza Ribeiro',
    corporacao: 'Guarda Municipal',
    cargo: 'GCM 1ª Classe - Patrulha Escolar',
    status: 'em_patrulha',
    equipeViatura: 'VTR-GM-04',
    equipamentoVinculadoId: 'EQ-008',
    telefoneRadio: 'Canal 1 - Comando GCM',
    localizacaoAtual: {
      lat: -22.2185,
      lng: -49.9465,
      bairro: 'Centro',
      ultimaAtualizacao: 'Há 30 segundos'
    },
    criadoEm: '2026-02-01T08:00:00Z'
  },
  {
    id: 'AG-03',
    matricula: 'PM-94812',
    nome: 'Sargento Rodrigo Antunes',
    corporacao: 'Polícia Militar',
    cargo: 'Comandante de Pelotão de Trânsito Rodoviário',
    status: 'em_patrulha',
    equipeViatura: 'VTR-PM-130',
    equipamentoVinculadoId: 'EQ-009',
    telefoneRadio: 'Rede Rádio PMESP - Copom',
    localizacaoAtual: {
      lat: -22.2105,
      lng: -49.9421,
      bairro: 'Alto Cafezal',
      ultimaAtualizacao: 'Há 1 minuto'
    },
    criadoEm: '2026-01-20T08:00:00Z'
  },
  {
    id: 'AG-04',
    matricula: 'TR-5022',
    nome: 'Marcos Vinicius Tavares',
    corporacao: 'Agente de Trânsito',
    cargo: 'Agente de Trânsito e Mobilidade',
    status: 'em_atendimento',
    equipeViatura: 'A pé / Ponto Fixo',
    telefoneRadio: 'Canal 4 - Trânsito Centro',
    localizacaoAtual: {
      lat: -22.2152,
      lng: -49.9482,
      bairro: 'Centro',
      ultimaAtualizacao: 'Há 2 minutos'
    },
    criadoEm: '2026-03-10T08:00:00Z'
  },
  {
    id: 'AG-05',
    matricula: 'GM-1144',
    nome: 'Lucas Silveira Neves',
    corporacao: 'Guarda Municipal',
    cargo: 'Operador de Drone e Câmeras CICC',
    status: 'disponivel',
    equipeViatura: 'DRN-AIR-02',
    equipamentoVinculadoId: 'EQ-014',
    telefoneRadio: 'Canal 2 - Suporte Tecnológico GCM',
    localizacaoAtual: {
      lat: -22.2312,
      lng: -49.9360,
      bairro: 'Cascata',
      ultimaAtualizacao: 'Há 15 segundos'
    },
    criadoEm: '2026-04-05T08:00:00Z'
  },
  {
    id: 'AG-06',
    matricula: 'PM-88301',
    nome: 'Cabo Letícia Prado',
    corporacao: 'Polícia Militar',
    cargo: 'Ronda Ostensiva com Motos (ROCAM)',
    status: 'folga',
    telefoneRadio: 'Rede Rádio PMESP',
    localizacaoAtual: {
      lat: -22.2139,
      lng: -49.9458,
      bairro: 'Centro',
      ultimaAtualizacao: 'Ontem'
    },
    criadoEm: '2026-02-15T08:00:00Z'
  }
];

export const INITIAL_ALERTS: IncidentAlert[] = [
  {
    id: 'ALT-101',
    categoria: 'furto_vandalismo',
    severidade: 'critico',
    titulo: 'Patinete Elétrico Fora de Geofence (Suspeita de Furto)',
    descricao: 'Dispositivo PAT-ELET-089 violou a cerca virtual do Bosque e teve sensor de corte de trava acionado.',
    bairro: 'Cascata',
    lat: -22.2365,
    lng: -49.9298,
    equipamentoId: 'EQ-007',
    timestamp: 'Há 12 minutos',
    resolvido: false
  },
  {
    id: 'ALT-102',
    categoria: 'falha_equipamento',
    severidade: 'critico',
    titulo: 'Radar Semafórico Inoperante - Risco de Acidentes',
    descricao: 'Radar RAD-SEM-3041 na Av. Tiradentes x Rua das Roseiras com perda de sincronia de laço indutivo. Semáforo em modo amarelo piscante.',
    bairro: 'Fragata',
    lat: -22.2226,
    lng: -49.9378,
    equipamentoId: 'EQ-003',
    timestamp: 'Há 25 minutos',
    resolvido: false
  },
  {
    id: 'ALT-103',
    categoria: 'manutencao_urgente',
    severidade: 'alerta',
    titulo: 'Cabo Ótico Rompido no Distrito Industrial',
    descricao: 'Câmera térmica CAM-IND-091 offline. Equipe de infraestrutura técnica já notificada.',
    bairro: 'Distrito Industrial',
    lat: -22.2420,
    lng: -49.9100,
    equipamentoId: 'EQ-015',
    timestamp: 'Há 1 hora',
    resolvido: false
  },
  {
    id: 'ALT-104',
    categoria: 'alerta_preditivo',
    severidade: 'alerta',
    titulo: 'PROMETHEUS: Previsão de Gargalo Crítico às 17:30',
    descricao: 'Cruzamento da Av. Sampaio Vidal com Nove de Julho possui 89% de probabilidade de travamento de tráfego nos próximos 40min.',
    bairro: 'Centro',
    lat: -22.2162,
    lng: -49.9470,
    timestamp: 'Há 5 minutos',
    resolvido: false
  }
];

export const CITY_DISTRICTS = [
  'Centro',
  'Fragata',
  'Cascata',
  'Alto Cafezal',
  'Palmital',
  'Distrito Industrial',
  'Campus Universitário',
  'Nova Marília'
];
