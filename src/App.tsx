import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Equipment } from './types/equipment';
import { Agent } from './types/agent';
import { IncidentAlert } from './types/alert';
import {
  DistrictRisk,
  HourlyRiskPrediction,
  EquipmentFailurePrediction,
  AnomalyDetection,
  PredictiveRecommendation
} from './types/predictive';

import { StorageService } from './services/storageService';
import { soundService } from './services/soundService';
import { telemetrySimulator } from './services/telemetrySimulator';
import { PredictiveEngine } from './services/predictiveEngine';

import { TopNavigation, ActiveTab } from './components/header/TopNavigation';
import { CrtOverlay } from './components/common/CrtOverlay';
import { KpiSummary } from './components/operations/KpiSummary';
import { OperationsMap } from './components/operations/OperationsMap';
import { FilterBar } from './components/operations/FilterBar';
import { AlertFeed } from './components/operations/AlertFeed';
import { DistrictHealth } from './components/operations/DistrictHealth';
import { DetailDrawer } from './components/operations/DetailDrawer';

import { EquipmentList } from './components/inventory/EquipmentList';
import { EquipmentFormModal } from './components/inventory/EquipmentFormModal';
import { AgentList } from './components/inventory/AgentList';
import { AgentFormModal } from './components/inventory/AgentFormModal';

import { PredictiveDashboard } from './components/predictive/PredictiveDashboard';
import { ProtocolDocumentation } from './components/documentation/ProtocolDocumentation';

export function App() {
  // Theme and UI States
  const [themeMode, setThemeMode] = useState<'pixel' | 'modern'>(() => StorageService.getThemeMode());
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('operacoes');
  const [simulationRunning, setSimulationRunning] = useState(true);

  // Data Collections
  const [equipments, setEquipments] = useState<Equipment[]>(() => StorageService.getEquipments());
  const [agents, setAgents] = useState<Agent[]>(() => StorageService.getAgents());
  const [alerts, setAlerts] = useState<IncidentAlert[]>(() => StorageService.getAlerts());

  // Inventory Sub-tab: 'equipamentos' | 'agentes'
  const [inventorySubTab, setInventorySubTab] = useState<'equipamentos' | 'agentes'>('equipamentos');

  // Drawer & Modals Selection State
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [equipmentToEdit, setEquipmentToEdit] = useState<Equipment | null>(null);

  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState<Agent | null>(null);

  // Map Filter States
  const [showEquipments, setShowEquipments] = useState(true);
  const [showAgents, setShowAgents] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);
  const [highlightMaintenance, setHighlightMaintenance] = useState(false);

  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedAgency, setSelectedAgency] = useState<string>('all');

  // File Input for JSON import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize and Subscribe to Telemetry Simulator
  useEffect(() => {
    telemetrySimulator.start(equipments, agents);

    const unsubscribe = telemetrySimulator.subscribe((data) => {
      setEquipments(data.equipments);
      setAgents(data.agents);
    });

    return () => {
      unsubscribe();
      telemetrySimulator.stop();
    };
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    StorageService.saveEquipments(equipments);
  }, [equipments]);

  useEffect(() => {
    StorageService.saveAgents(agents);
  }, [agents]);

  useEffect(() => {
    StorageService.saveAlerts(alerts);
  }, [alerts]);

  // Handle Theme Change
  const handleToggleTheme = () => {
    const next = themeMode === 'pixel' ? 'modern' : 'pixel';
    setThemeMode(next);
    StorageService.setThemeMode(next);
    soundService.playClick();
  };

  // Handle Simulation Toggle
  const handleToggleSimulation = () => {
    const isRunning = telemetrySimulator.toggle();
    setSimulationRunning(isRunning);
    soundService.playClick();
  };

  // Reset to Factory Default Data
  const handleResetData = () => {
    if (window.confirm('Deseja restaurar todos os equipamentos, agentes e alertas para a base padrão de Marília/SP?')) {
      StorageService.resetToDefault();
      setEquipments(StorageService.getEquipments());
      setAgents(StorageService.getAgents());
      setAlerts(StorageService.getAlerts());
      setSelectedEquipment(null);
      setSelectedAgent(null);
      soundService.playSuccess();
    }
  };

  // Export JSON Database
  const handleExportJson = () => {
    const jsonStr = StorageService.exportDatabaseJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prometheus_fogo_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    soundService.playSuccess();
  };

  // Import JSON Database
  const handleImportJson = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (StorageService.importDatabaseJson(content)) {
        setEquipments(StorageService.getEquipments());
        setAgents(StorageService.getAgents());
        setAlerts(StorageService.getAlerts());
        soundService.playSuccess();
        alert('Base de dados importada com sucesso!');
      } else {
        soundService.playAlert();
        alert('Arquivo JSON inválido para a estrutura do F.O.G.O.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Predictive Engine Calculations
  const districtRisks = useMemo(() => {
    return PredictiveEngine.calculateDistrictRisks(equipments, alerts, agents);
  }, [equipments, alerts, agents]);

  const hourlyPredictions = useMemo(() => {
    return PredictiveEngine.predictHourlyRiskCurve();
  }, []);

  const failurePredictions = useMemo(() => {
    return PredictiveEngine.predictEquipmentFailures(equipments);
  }, [equipments]);

  const anomalies = useMemo(() => {
    return PredictiveEngine.detectAnomalies(equipments);
  }, [equipments]);

  const [recommendations, setRecommendations] = useState<PredictiveRecommendation[]>(() => {
    const risks = PredictiveEngine.calculateDistrictRisks(
      StorageService.getEquipments(),
      StorageService.getAlerts(),
      StorageService.getAgents()
    );
    const failures = PredictiveEngine.predictEquipmentFailures(StorageService.getEquipments());
    return PredictiveEngine.generateRecommendations(risks, failures);
  });

  // Filtered Equipments for Map & Operations
  const mapFilteredEquipments = useMemo(() => {
    return equipments.filter((eq) => {
      if (selectedDistrict !== 'all' && eq.localizacao.bairro !== selectedDistrict) return false;
      if (selectedType !== 'all' && eq.tipo !== selectedType) return false;
      if (selectedStatus !== 'all' && eq.situacao !== selectedStatus) return false;
      if (selectedAgency !== 'all' && eq.orgaoResponsavel !== selectedAgency) return false;
      if (highlightMaintenance && eq.necessidadeManutencao !== 'imediata' && eq.necessidadeManutencao !== 'agendada_periodica') {
        return false;
      }
      return true;
    });
  }, [equipments, selectedDistrict, selectedType, selectedStatus, selectedAgency, highlightMaintenance]);

  // Filtered Agents for Map & Operations
  const mapFilteredAgents = useMemo(() => {
    return agents.filter((ag) => {
      if (selectedDistrict !== 'all' && ag.localizacaoAtual.bairro !== selectedDistrict) return false;
      return true;
    });
  }, [agents, selectedDistrict]);

  // Filtered Alerts for Map
  const mapFilteredAlerts = useMemo(() => {
    return alerts.filter((al) => {
      if (selectedDistrict !== 'all' && al.bairro !== selectedDistrict) return false;
      return true;
    });
  }, [alerts, selectedDistrict]);

  // Equipments and Agents Handlers
  const handleSaveEquipment = (eq: Equipment) => {
    setEquipments((prev) => {
      const idx = prev.findIndex((e) => e.id === eq.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = eq;
        return copy;
      }
      return [eq, ...prev];
    });
    soundService.playSuccess();
  };

  const handleDeleteEquipment = (id: string) => {
    if (window.confirm('Deseja realmente remover este equipamento do inventário?')) {
      setEquipments((prev) => prev.filter((e) => e.id !== id));
      if (selectedEquipment?.id === id) setSelectedEquipment(null);
      soundService.playAlert();
    }
  };

  const handleSaveAgent = (agent: Agent) => {
    setAgents((prev) => {
      const idx = prev.findIndex((a) => a.id === agent.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = agent;
        return copy;
      }
      return [agent, ...prev];
    });
    soundService.playSuccess();
  };

  const handleDeleteAgent = (id: string) => {
    if (window.confirm('Deseja realmente remover este agente operacional?')) {
      setAgents((prev) => prev.filter((a) => a.id !== id));
      if (selectedAgent?.id === id) setSelectedAgent(null);
      soundService.playAlert();
    }
  };

  // Alert Handlers
  const handleResolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((al) => (al.id === id ? { ...al, resolvido: true, resolvidoEm: new Date().toISOString() } : al))
    );
    soundService.playSuccess();
  };

  const handleSimulateIncident = () => {
    const newAlert = telemetrySimulator.triggerRandomIncident(equipments);
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const handleFocusAlertOnMap = (alert: IncidentAlert) => {
    setActiveTab('operacoes');
    if (alert.equipamentoId) {
      const eq = equipments.find((e) => e.id === alert.equipamentoId);
      if (eq) setSelectedEquipment(eq);
    }
  };

  // Actions from Drawer
  const handleRequestMaintenance = (eq: Equipment) => {
    const updated: Equipment = {
      ...eq,
      situacao: 'mau_funcionamento',
      necessidadeManutencao: 'imediata',
      dataProximaManutencao: new Date().toISOString().slice(0, 10),
      descricaoProblema: 'Chamado emergencial aberto diretamente pelo painel CICC de operações.'
    };
    handleSaveEquipment(updated);
    setSelectedEquipment(updated);
  };

  // Apply AI Recommendation
  const handleApplyRecommendation = (recId: string) => {
    setRecommendations((prev) =>
      prev.map((r) => {
        if (r.id === recId) {
          return { ...r, aplicada: true };
        }
        return r;
      })
    );

    // Efeito colateral da recomendação
    const rec = recommendations.find((r) => r.id === recId);
    if (rec?.tipoAcao === 'despacho_viatura' && rec.bairroAlvo) {
      // Mover agentes para o bairro alvo
      setAgents((prev) =>
        prev.map((ag, i) => (i < 2 ? { ...ag, localizacaoAtual: { ...ag.localizacaoAtual, bairro: rec.bairroAlvo! } } : ag))
      );
    } else if (rec?.tipoAcao === 'manutencao_preventiva' && rec.equipamentoAlvoId) {
      setEquipments((prev) =>
        prev.map((eq) =>
          eq.id === rec.equipamentoAlvoId
            ? { ...eq, necessidadeManutencao: 'agendada_periodica', dataProximaManutencao: '2026-10-27' }
            : eq
        )
      );
    }
  };

  const unresolvedAlertsCount = useMemo(() => alerts.filter((a) => !a.resolvido).length, [alerts]);

  return (
    <div className={`min-h-screen flex flex-col bg-[#07090e] text-slate-100 ${themeMode === 'modern' ? 'theme-modern' : ''}`}>
      {/* CRT Scanline effect (Pixel Art theme) */}
      <CrtOverlay enabled={themeMode === 'pixel' && crtEnabled} />

      {/* Hidden File Input for JSON Backup */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
        style={{ display: 'none' }}
      />

      {/* Top Header Navigation Bar */}
      <TopNavigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          soundService.playClick();
        }}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled(!crtEnabled)}
        simulationRunning={simulationRunning}
        onToggleSimulation={handleToggleSimulation}
        onResetData={handleResetData}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        totalAlerts={unresolvedAlertsCount}
      />

      {/* Main App Content Body */}
      <main className="flex-1 p-3 md:p-5 max-w-7xl w-full mx-auto space-y-4">
        {/* TAB 1: 2ª PARTE - CENTRAL DE OPERAÇÕES */}
        {activeTab === 'operacoes' && (
          <div className="space-y-4">
            {/* KPI Summary Cards */}
            <KpiSummary
              equipments={equipments}
              agents={agents}
              alerts={alerts}
            />

            {/* Quick Filter Bar */}
            <FilterBar
              showEquipments={showEquipments}
              onToggleEquipments={() => setShowEquipments(!showEquipments)}
              showAgents={showAgents}
              onToggleAgents={() => setShowAgents(!showAgents)}
              showAlerts={showAlerts}
              onToggleAlerts={() => setShowAlerts(!showAlerts)}
              highlightMaintenance={highlightMaintenance}
              onToggleHighlightMaintenance={() => setHighlightMaintenance(!highlightMaintenance)}
              selectedDistrict={selectedDistrict}
              onChangeDistrict={setSelectedDistrict}
              selectedType={selectedType}
              onChangeType={setSelectedType}
              selectedStatus={selectedStatus}
              onChangeStatus={setSelectedStatus}
              selectedAgency={selectedAgency}
              onChangeAgency={setSelectedAgency}
              totalEquipments={mapFilteredEquipments.length}
              totalAgents={mapFilteredAgents.length}
              totalAlerts={mapFilteredAlerts.length}
            />

            {/* Map and Alert Feed Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <OperationsMap
                  equipments={mapFilteredEquipments}
                  agents={mapFilteredAgents}
                  alerts={mapFilteredAlerts}
                  selectedEquipment={selectedEquipment}
                  selectedAgent={selectedAgent}
                  onSelectEquipment={(eq) => {
                    setSelectedEquipment(eq);
                    setSelectedAgent(null);
                    soundService.playClick();
                  }}
                  onSelectAgent={(ag) => {
                    setSelectedAgent(ag);
                    setSelectedEquipment(null);
                    soundService.playClick();
                  }}
                  themeMode={themeMode}
                  showEquipments={showEquipments}
                  showAgents={showAgents}
                  showAlerts={showAlerts}
                  highlightMaintenance={highlightMaintenance}
                />
              </div>

              <div className="lg:col-span-1">
                <AlertFeed
                  alerts={alerts}
                  onResolveAlert={handleResolveAlert}
                  onSimulateIncident={handleSimulateIncident}
                  onFocusAlertOnMap={handleFocusAlertOnMap}
                />
              </div>
            </div>

            {/* Consolidated District Health Board */}
            <DistrictHealth
              equipments={equipments}
              agents={agents}
              alerts={alerts}
              onSelectDistrict={(bairro) => setSelectedDistrict(bairro)}
            />
          </div>
        )}

        {/* TAB 2: 1ª PARTE - INVENTÁRIO INTELIGENTE */}
        {activeTab === 'inventario' && (
          <div className="space-y-4">
            {/* Sub-tab switcher: Equipamentos vs Agentes */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setInventorySubTab('equipamentos')}
                className={`pixel-btn text-xs py-1.5 px-3 ${
                  inventorySubTab === 'equipamentos' ? 'bg-sky-600' : 'pixel-btn-secondary'
                }`}
              >
                📡 EQUIPAMENTOS IoT ({equipments.length})
              </button>
              <button
                onClick={() => setInventorySubTab('agentes')}
                className={`pixel-btn text-xs py-1.5 px-3 ${
                  inventorySubTab === 'agentes' ? 'bg-sky-600' : 'pixel-btn-secondary'
                }`}
              >
                👮 AGENTES DE CAMPO ({agents.length})
              </button>
            </div>

            {inventorySubTab === 'equipamentos' ? (
              <EquipmentList
                equipments={equipments}
                onSelectEquipment={(eq) => {
                  setSelectedEquipment(eq);
                  setSelectedAgent(null);
                }}
                onEditEquipment={(eq) => {
                  setEquipmentToEdit(eq);
                  setIsEquipmentModalOpen(true);
                }}
                onDeleteEquipment={handleDeleteEquipment}
                onAddNew={() => {
                  setEquipmentToEdit(null);
                  setIsEquipmentModalOpen(true);
                }}
              />
            ) : (
              <AgentList
                agents={agents}
                onAddNew={() => {
                  setAgentToEdit(null);
                  setIsAgentModalOpen(true);
                }}
                onEditAgent={(ag) => {
                  setAgentToEdit(ag);
                  setIsAgentModalOpen(true);
                }}
                onDeleteAgent={handleDeleteAgent}
              />
            )}
          </div>
        )}

        {/* TAB 3: 3ª PARTE - CIDADE PREDITIVA */}
        {activeTab === 'preditiva' && (
          <PredictiveDashboard
            districtRisks={districtRisks}
            hourlyPredictions={hourlyPredictions}
            failurePredictions={failurePredictions}
            anomalies={anomalies}
            recommendations={recommendations}
            onApplyRecommendation={handleApplyRecommendation}
            onOpenOrder={(eqId) => {
              const eq = equipments.find((e) => e.id === eqId);
              if (eq) {
                handleRequestMaintenance(eq);
                alert(`Ordem de Serviço Preventiva gerada para o equipamento ${eq.numeroSerie}!`);
              }
            }}
            onSelectDistrict={(bairro) => setSelectedDistrict(bairro)}
          />
        )}

        {/* TAB 4: MANUAL / MEMORIAL DESCRITIVO / DECLARAÇÃO DE IA */}
        {activeTab === 'documentacao' && <ProtocolDocumentation />}
      </main>

      {/* Technical Detail Drawer */}
      <DetailDrawer
        equipment={selectedEquipment}
        agent={selectedAgent}
        onClose={() => {
          setSelectedEquipment(null);
          setSelectedAgent(null);
        }}
        onRequestMaintenance={handleRequestMaintenance}
        onOpenEditEquipment={(eq) => {
          setEquipmentToEdit(eq);
          setIsEquipmentModalOpen(true);
        }}
      />

      {/* Equipment Add/Edit Modal */}
      <EquipmentFormModal
        isOpen={isEquipmentModalOpen}
        onClose={() => setIsEquipmentModalOpen(false)}
        onSave={handleSaveEquipment}
        initialEquipment={equipmentToEdit}
      />

      {/* Agent Add/Edit Modal */}
      <AgentFormModal
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
        onSave={handleSaveAgent}
        initialAgent={agentToEdit}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-3 text-center text-xs text-slate-500 font-hud">
        <p>
          PROTOCOLO PROMETHEUS // SISTEMA F.O.G.O. • DSIN CODERCHALLENGE 2026 • CIDADE DE MARÍLIA/SP
        </p>
      </footer>
    </div>
  );
}

export default App;
