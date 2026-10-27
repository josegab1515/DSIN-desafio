import { Equipment } from '../types/equipment';
import { Agent } from '../types/agent';
import { IncidentAlert } from '../types/alert';
import { INITIAL_EQUIPMENTS, INITIAL_AGENTS, INITIAL_ALERTS } from '../data/mockData';

const STORAGE_KEYS = {
  EQUIPMENTS: 'fogo_equipments_v2_real_places',
  AGENTS: 'fogo_agents_v2_real_places',
  ALERTS: 'fogo_alerts_v2_real_places',
  THEME_MODE: 'fogo_theme_mode' // 'pixel' | 'modern'
};

export class StorageService {
  public static getEquipments(): Equipment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EQUIPMENTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error loading equipments from localStorage', e);
    }
    this.saveEquipments(INITIAL_EQUIPMENTS);
    return INITIAL_EQUIPMENTS;
  }

  public static saveEquipments(equipments: Equipment[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.EQUIPMENTS, JSON.stringify(equipments));
    } catch (e) {
      console.error('Error saving equipments to localStorage', e);
    }
  }

  public static getAgents(): Agent[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AGENTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error loading agents from localStorage', e);
    }
    this.saveAgents(INITIAL_AGENTS);
    return INITIAL_AGENTS;
  }

  public static saveAgents(agents: Agent[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AGENTS, JSON.stringify(agents));
    } catch (e) {
      console.error('Error saving agents to localStorage', e);
    }
  }

  public static getAlerts(): IncidentAlert[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ALERTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error loading alerts from localStorage', e);
    }
    this.saveAlerts(INITIAL_ALERTS);
    return INITIAL_ALERTS;
  }

  public static saveAlerts(alerts: IncidentAlert[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
    } catch (e) {
      console.error('Error saving alerts to localStorage', e);
    }
  }

  public static getThemeMode(): 'pixel' | 'modern' {
    return (localStorage.getItem(STORAGE_KEYS.THEME_MODE) as 'pixel' | 'modern') || 'pixel';
  }

  public static setThemeMode(mode: 'pixel' | 'modern'): void {
    localStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
  }

  public static resetToDefault(): void {
    localStorage.removeItem(STORAGE_KEYS.EQUIPMENTS);
    localStorage.removeItem(STORAGE_KEYS.AGENTS);
    localStorage.removeItem(STORAGE_KEYS.ALERTS);
    this.saveEquipments(INITIAL_EQUIPMENTS);
    this.saveAgents(INITIAL_AGENTS);
    this.saveAlerts(INITIAL_ALERTS);
  }

  public static exportDatabaseJson(): string {
    const payload = {
      sistema: 'F.O.G.O. - Protocolo PROMETHEUS',
      versao: '2.0.0-PRO',
      exportadoEm: new Date().toISOString(),
      equipamentos: this.getEquipments(),
      agentes: this.getAgents(),
      alertas: this.getAlerts()
    };
    return JSON.stringify(payload, null, 2);
  }

  public static importDatabaseJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.equipamentos)) {
        this.saveEquipments(parsed.equipamentos);
      }
      if (Array.isArray(parsed.agentes)) {
        this.saveAgents(parsed.agentes);
      }
      if (Array.isArray(parsed.alertas)) {
        this.saveAlerts(parsed.alertas);
      }
      return true;
    } catch (e) {
      console.error('Falha ao importar JSON de dados:', e);
      return false;
    }
  }
}
