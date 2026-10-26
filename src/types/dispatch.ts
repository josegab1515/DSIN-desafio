export interface RadioLog {
  id: string;
  timestamp: string;
  origem: string;
  callsign: string;
  mensagem: string;
  tipo: 'alerta' | 'despacho' | 'patrulha' | 'predicao' | 'urgente';
}

export interface DispatchUnitOption {
  agentId: string;
  matricula: string;
  nome: string;
  corporacao: string;
  callsign: string;
  status: string;
  distanciaKm: number;
  etaMinutos: number;
  bairroAtual: string;
}
