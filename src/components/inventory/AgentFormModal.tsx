import React, { useState, useEffect } from 'react';
import { Agent, AgentCorporation, AgentStatus } from '../../types/agent';
import { PixelButton } from '../common/PixelButton';
import { PixelIcon } from '../common/PixelIcon';
import { CITY_DISTRICTS } from '../../data/mockData';
import { X, Save } from 'lucide-react';

interface AgentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agent: Agent) => void;
  initialAgent?: Agent | null;
}

export const AgentFormModal: React.FC<AgentFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialAgent
}) => {
  const isEditing = Boolean(initialAgent);

  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [corporacao, setCorporacao] = useState<AgentCorporation>('Agente de Trânsito');
  const [cargo, setCargo] = useState('Agente Operacional');
  const [status, setStatus] = useState<AgentStatus>('em_patrulha');
  const [equipeViatura, setEquipeViatura] = useState('');
  const [telefoneRadio, setTelefoneRadio] = useState('Canal 4 - Trânsito');
  const [bairro, setBairro] = useState('Centro');
  const [lat, setLat] = useState(-22.2175);
  const [lng, setLng] = useState(-49.9501);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialAgent) {
      setMatricula(initialAgent.matricula);
      setNome(initialAgent.nome);
      setCorporacao(initialAgent.corporacao);
      setCargo(initialAgent.cargo);
      setStatus(initialAgent.status);
      setEquipeViatura(initialAgent.equipeViatura || '');
      setTelefoneRadio(initialAgent.telefoneRadio);
      setBairro(initialAgent.localizacaoAtual.bairro);
      setLat(initialAgent.localizacaoAtual.lat);
      setLng(initialAgent.localizacaoAtual.lng);
    } else {
      setMatricula(`AG-${Math.floor(1000 + Math.random() * 9000)}`);
      setNome('');
      setEquipeViatura('');
      setErrors({});
    }
  }, [initialAgent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!matricula.trim()) newErrors.matricula = 'Matrícula é obrigatória.';
    if (!nome.trim()) newErrors.nome = 'Nome do agente é obrigatório.';
    if (!cargo.trim()) newErrors.cargo = 'Cargo é obrigatório.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload: Agent = {
      id: initialAgent?.id || `AG-${Date.now().toString().slice(-4)}`,
      matricula: matricula.trim(),
      nome: nome.trim(),
      corporacao,
      cargo: cargo.trim(),
      status,
      equipeViatura: equipeViatura.trim() || undefined,
      telefoneRadio: telefoneRadio.trim(),
      localizacaoAtual: {
        bairro,
        lat: Number(lat),
        lng: Number(lng),
        ultimaAtualizacao: 'Agora mesmo'
      },
      criadoEm: initialAgent?.criadoEm || new Date().toISOString()
    };

    onSave(payload);
    onClose();
  };

  const getCorpIcon = (corp: AgentCorporation) => {
    switch (corp) {
      case 'Agente de Trânsito':
        return 'agente_transito';
      case 'Guarda Municipal':
        return 'guarda_municipal';
      case 'Polícia Militar':
      default:
        return 'policia_militar';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm">
      <div className="pixel-box w-full max-w-xl bg-slate-900 border-2 border-sky-500 shadow-[0_0_30px_rgba(56,189,248,0.3)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <PixelIcon type={getCorpIcon(corporacao) as any} size={26} />
            <div>
              <h3 className="font-pixel text-sm text-sky-400">
                {isEditing ? 'EDITAR AGENTE OPERACIONAL' : 'CADASTRAR NOVO AGENTE'}
              </h3>
              <p className="text-[11px] text-slate-400 font-hud">
                Integração de Segurança e Trânsito F.O.G.O.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 pt-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Corporação / Órgão *</label>
              <select
                value={corporacao}
                onChange={(e) => setCorporacao(e.target.value as AgentCorporation)}
                className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100"
              >
                <option value="Agente de Trânsito">Agente de Trânsito</option>
                <option value="Guarda Municipal">Guarda Municipal</option>
                <option value="Polícia Militar">Polícia Militar</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Matrícula Funcional *</label>
              <input
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Ex: TR-4819"
                className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100 font-mono"
              />
              {errors.matricula && <p className="text-red-400 text-[10px] mt-0.5">{errors.matricula}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1">Nome Completo *</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Carlos Eduardo Mendes"
                className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100"
              />
              {errors.nome && <p className="text-red-400 text-[10px] mt-0.5">{errors.nome}</p>}
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Cargo / Especialidade *</label>
              <input
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Ex: Inspetor de Operações"
                className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Situação / Status Atual *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AgentStatus)}
                className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100 font-semibold"
              >
                <option value="em_patrulha">🟢 Em Patrulha</option>
                <option value="em_atendimento">🟡 Em Atendimento</option>
                <option value="disponivel">🔵 Disponível</option>
                <option value="folga">⚪ Em Folga</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Viatura / Equipe Vinculada</label>
              <input
                type="text"
                value={equipeViatura}
                onChange={(e) => setEquipeViatura(e.target.value)}
                placeholder="Ex: VTR-GM-04, MOTO-07"
                className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Canal de Rádio / Telemetria</label>
              <input
                type="text"
                value={telefoneRadio}
                onChange={(e) => setTelefoneRadio(e.target.value)}
                placeholder="Ex: Canal 4 - Centro"
                className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Bairro de Ronda / Base</label>
              <select
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100"
              >
                {CITY_DISTRICTS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={lat}
                  onChange={(e) => setLat(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 px-2 py-1.5 text-slate-100 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={lng}
                  onChange={(e) => setLng(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 px-2 py-1.5 text-slate-100 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <PixelButton variant="secondary" type="button" onClick={onClose}>
              CANCELAR
            </PixelButton>
            <PixelButton variant="success" type="submit">
              <Save size={14} />
              <span>{isEditing ? 'SALVAR ALTERAÇÕES' : 'CADASTRAR AGENTE'}</span>
            </PixelButton>
          </div>
        </form>
      </div>
    </div>
  );
};
