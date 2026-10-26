import React, { useState, useEffect } from 'react';
import { Equipment, EquipmentType, EquipmentStatus, MaintenanceNeed } from '../../types/equipment';
import { PixelButton } from '../common/PixelButton';
import { PixelIcon } from '../common/PixelIcon';
import { CITY_DISTRICTS } from '../../data/mockData';
import { X, Save, AlertCircle } from 'lucide-react';

interface EquipmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (equipment: Equipment) => void;
  initialEquipment?: Equipment | null;
}

export const EquipmentFormModal: React.FC<EquipmentFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialEquipment
}) => {
  const isEditing = Boolean(initialEquipment);

  const [tipo, setTipo] = useState<EquipmentType>('radar_velocidade');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [orgaoResponsavel, setOrgaoResponsavel] = useState<Equipment['orgaoResponsavel']>('Secretaria de Trânsito');
  const [situacao, setSituacao] = useState<EquipmentStatus>('operacional');
  const [necessidadeManutencao, setNecessidadeManutencao] = useState<MaintenanceNeed>('nenhuma');
  const [dataProximaManutencao, setDataProximaManutencao] = useState('');
  const [descricaoProblema, setDescricaoProblema] = useState('');

  // Localização
  const [cep, setCep] = useState('17500-010');
  const [bairro, setBairro] = useState('Centro');
  const [cidade, setCidade] = useState('Marília');
  const [uf, setUf] = useState('SP');
  const [rua, setRua] = useState('');
  const [referencia, setReferencia] = useState('');
  const [lat, setLat] = useState(-22.2175);
  const [lng, setLng] = useState(-49.9501);

  // Características Específicas Dinâmicas (Polimorfismo)
  const [temVisaoNoturna, setTemVisaoNoturna] = useState(true);
  const [resolucao, setResolucao] = useState<'720p' | '1080p' | '4K'>('1080p');
  const [tipoCor, setTipoCor] = useState<'colorida' | 'preto_e_branco'>('colorida');
  const [zoomOtico, setZoomOtico] = useState('16x');
  const [iaEmbarcadaLpr, setIaEmbarcadaLpr] = useState(false);

  const [velocidadeMaxima, setVelocidadeMaxima] = useState(50);
  const [faixasMonitoradas, setFaixasMonitoradas] = useState(2);
  const [tipoInfracao, setTipoInfracao] = useState<'velocidade' | 'avanco_semaforo' | 'conversao_proibida' | 'faixa_exclusiva'>('velocidade');

  const [capacidadeToneladas, setCapacidadeToneladas] = useState(60);
  const [pesagemEmMovimento, setPesagemEmMovimento] = useState(true);

  const [aceitaPixCartao, setAceitaPixCartao] = useState(true);
  const [nivelPapel, setNivelPapel] = useState(90);
  const [bateriaSolar, setBateriaSolar] = useState(false);

  const [nivelBateriaCombustivel, setNivelBateriaCombustivel] = useState(85);
  const [autonomiaKm, setAutonomiaKm] = useState(150);
  const [odometro, setOdometro] = useState(12000);
  const [placa, setPlaca] = useState('');

  // Erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialEquipment) {
      setTipo(initialEquipment.tipo);
      setNumeroSerie(initialEquipment.numeroSerie);
      setMarca(initialEquipment.marca);
      setModelo(initialEquipment.modelo);
      setOrgaoResponsavel(initialEquipment.orgaoResponsavel);
      setSituacao(initialEquipment.situacao);
      setNecessidadeManutencao(initialEquipment.necessidadeManutencao);
      setDataProximaManutencao(initialEquipment.dataProximaManutencao || '');
      setDescricaoProblema(initialEquipment.descricaoProblema || '');

      setCep(initialEquipment.localizacao.cep);
      setBairro(initialEquipment.localizacao.bairro);
      setCidade(initialEquipment.localizacao.cidade);
      setUf(initialEquipment.localizacao.uf);
      setRua(initialEquipment.localizacao.rua);
      setReferencia(initialEquipment.localizacao.referencia);
      setLat(initialEquipment.localizacao.lat);
      setLng(initialEquipment.localizacao.lng);

      const esp = initialEquipment.especificas;
      if (esp.temVisaoNoturna !== undefined) setTemVisaoNoturna(esp.temVisaoNoturna);
      if (esp.resolucao) setResolucao(esp.resolucao);
      if (esp.tipoCor) setTipoCor(esp.tipoCor);
      if (esp.zoomOtico) setZoomOtico(esp.zoomOtico);
      if (esp.iaEmbarcadaLpr !== undefined) setIaEmbarcadaLpr(esp.iaEmbarcadaLpr);

      if (esp.velocidadeMaxima) setVelocidadeMaxima(esp.velocidadeMaxima);
      if (esp.faixasMonitoradas) setFaixasMonitoradas(esp.faixasMonitoradas);
      if (esp.tipoInfracao) setTipoInfracao(esp.tipoInfracao);

      if (esp.capacidadeToneladas) setCapacidadeToneladas(esp.capacidadeToneladas);
      if (esp.pesagemEmMovimento !== undefined) setPesagemEmMovimento(esp.pesagemEmMovimento);

      if (esp.aceitaPixCartao !== undefined) setAceitaPixCartao(esp.aceitaPixCartao);
      if (esp.nivelPapel !== undefined) setNivelPapel(esp.nivelPapel);
      if (esp.bateriaSolar !== undefined) setBateriaSolar(esp.bateriaSolar);

      if (esp.nivelBateriaCombustivel !== undefined) setNivelBateriaCombustivel(esp.nivelBateriaCombustivel);
      if (esp.autonomiaKm !== undefined) setAutonomiaKm(esp.autonomiaKm);
      if (esp.odometro !== undefined) setOdometro(esp.odometro);
      if (esp.placa) setPlaca(esp.placa);
    } else {
      // Limpar para novo cadastro
      setNumeroSerie(`EQ-${Math.floor(1000 + Math.random() * 9000)}`);
      setMarca('Intelbras IoT');
      setModelo('SmartCity v2');
      setRua('');
      setReferencia('');
      setErrors({});
    }
  }, [initialEquipment, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!numeroSerie.trim()) newErrors.numeroSerie = 'Número de série é obrigatório.';
    if (!marca.trim()) newErrors.marca = 'Marca é obrigatória.';
    if (!modelo.trim()) newErrors.modelo = 'Modelo é obrigatório.';
    if (!rua.trim()) newErrors.rua = 'Nome da rua é obrigatório.';
    if (!referencia.trim()) newErrors.referencia = 'Ponto de referência é obrigatório.';
    if (isNaN(lat)) newErrors.lat = 'Latitude inválida.';
    if (isNaN(lng)) newErrors.lng = 'Longitude inválida.';

    if (necessidadeManutencao === 'imediata' && !descricaoProblema.trim()) {
      newErrors.descricaoProblema = 'Informe a descrição do problema para manutenção imediata.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const equipmentPayload: Equipment = {
      id: initialEquipment?.id || `EQ-${Date.now().toString().slice(-4)}`,
      tipo,
      numeroSerie: numeroSerie.trim(),
      marca: marca.trim(),
      modelo: modelo.trim(),
      orgaoResponsavel,
      situacao,
      necessidadeManutencao,
      dataProximaManutencao: dataProximaManutencao || undefined,
      descricaoProblema: descricaoProblema.trim() || undefined,
      localizacao: {
        cep: cep.trim(),
        bairro,
        cidade: cidade.trim(),
        uf: uf.trim(),
        rua: rua.trim(),
        referencia: referencia.trim(),
        lat: Number(lat),
        lng: Number(lng)
      },
      especificas: {
        temVisaoNoturna,
        resolucao,
        tipoCor,
        zoomOtico,
        iaEmbarcadaLpr,
        velocidadeMaxima: Number(velocidadeMaxima),
        faixasMonitoradas: Number(faixasMonitoradas),
        tipoInfracao,
        capacidadeToneladas: Number(capacidadeToneladas),
        pesagemEmMovimento,
        aceitaPixCartao,
        nivelPapel: Number(nivelPapel),
        bateriaSolar,
        nivelBateriaCombustivel: Number(nivelBateriaCombustivel),
        autonomiaKm: Number(autonomiaKm),
        odometro: Number(odometro),
        placa: placa.trim() || undefined
      },
      telemetria: initialEquipment?.telemetria || {
        ultimaLeitura: 'Agora mesmo',
        temperaturaChipC: 38.5,
        voltagemV: 12.0,
        sinalRedeDb: -60,
        veiculosDetectadosHoje: 0
      },
      criadoEm: initialEquipment?.criadoEm || new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    };

    onSave(equipmentPayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-3 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="pixel-box w-full max-w-3xl my-8 bg-slate-900 border-2 border-sky-500 shadow-[0_0_40px_rgba(56,189,248,0.5)]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <PixelIcon type={tipo} size={26} />
            <div>
              <h3 className="font-pixel text-sm text-sky-400">
                {isEditing ? 'EDITAR EQUIPAMENTO IoT' : 'CATALOGAR NOVO EQUIPAMENTO'}
              </h3>
              <p className="text-[11px] text-slate-400 font-hud">
                Protocolo PROMETHEUS - Inventário da Mobilidade Urbana
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

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
          {/* Seção 1: Identificação Básica */}
          <div>
            <h4 className="font-pixel text-[11px] text-slate-300 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-sky-400 inline-block" />
              1. IDENTIFICAÇÃO E CLASSIFICAÇÃO
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Tipo de Equipamento *</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as EquipmentType)}
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100"
                >
                  <option value="radar_velocidade">Radar de Fiscalização de Velocidade</option>
                  <option value="radar_semaforo">Radar de Fiscalização de Semáforo</option>
                  <option value="radar_conversao">Radar de Conversão / Retorno Proibido</option>
                  <option value="camera_monitoramento">Câmera de Videomonitoramento</option>
                  <option value="balanca_caminhao">Balança de Caminhão (WIM)</option>
                  <option value="veiculo_autonomo_rotativo">Veículo Autônomo Fiscalização Rotativo</option>
                  <option value="cancela_automatizada">Cancela Automatizada</option>
                  <option value="veiculo_transporte">Veículo de Transporte (Táxi/Escolar)</option>
                  <option value="totem_rotativo">Totem de Estacionamento Rotativo</option>
                  <option value="patinete_eletrico">Patinete Elétrico Compartilhado</option>
                  <option value="moto_transito">Moto do Agente de Trânsito</option>
                  <option value="viatura_gm">Viatura da Guarda Municipal</option>
                  <option value="viatura_pm">Viatura da Polícia Militar</option>
                  <option value="drone_vigilancia">Drone de Vigilância Aérea</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Número de Série *</label>
                <input
                  type="text"
                  value={numeroSerie}
                  onChange={(e) => setNumeroSerie(e.target.value)}
                  placeholder="Ex: RAD-VEL-2026"
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100 font-mono"
                />
                {errors.numeroSerie && <p className="text-red-400 text-[10px] mt-0.5">{errors.numeroSerie}</p>}
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Órgão Responsável *</label>
                <select
                  value={orgaoResponsavel}
                  onChange={(e) => setOrgaoResponsavel(e.target.value as Equipment['orgaoResponsavel'])}
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100"
                >
                  <option value="Secretaria de Trânsito">Secretaria de Trânsito</option>
                  <option value="Guarda Municipal">Guarda Municipal</option>
                  <option value="Polícia Militar">Polícia Militar</option>
                  <option value="Mobilidade Urbana (Parcerias)">Mobilidade Urbana (Parcerias)</option>
                  <option value="Defesa Civil">Defesa Civil</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Marca *</label>
                <input
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  placeholder="Ex: FiscalTech, Intelbras"
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100"
                />
                {errors.marca && <p className="text-red-400 text-[10px] mt-0.5">{errors.marca}</p>}
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Modelo *</label>
                <input
                  type="text"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  placeholder="Ex: SpeedGuard Pro 200"
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100"
                />
                {errors.modelo && <p className="text-red-400 text-[10px] mt-0.5">{errors.modelo}</p>}
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Situação Atual *</label>
                <select
                  value={situacao}
                  onChange={(e) => setSituacao(e.target.value as EquipmentStatus)}
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100 font-semibold"
                >
                  <option value="operacional">🟢 Operacional</option>
                  <option value="mau_funcionamento">🟡 Mau Funcionamento</option>
                  <option value="em_manutencao">🟣 Em Manutenção</option>
                  <option value="furtado">🔴 Furtado / Vandalizado</option>
                  <option value="ainda_nao_instalado">⚪ Ainda Não Instalado</option>
                  <option value="desativado">⚫ Desativado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Seção 2: Localização Completa */}
          <div className="pt-2 border-t border-slate-800">
            <h4 className="font-pixel text-[11px] text-slate-300 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-400 inline-block" />
              2. LOCALIZAÇÃO E COORDENADAS GPS
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <label className="block text-slate-400 mb-1">Nome da Rua / Via *</label>
                <input
                  type="text"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  placeholder="Ex: Av. Sampaio Vidal"
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100"
                />
                {errors.rua && <p className="text-red-400 text-[10px] mt-0.5">{errors.rua}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-400 mb-1">
                  Referência ("KM 203", "oposto ao 181", etc.) *
                </label>
                <input
                  type="text"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                  placeholder="Ex: Em frente ao Mercado do Tio / Oposto ao 181"
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100"
                />
                {errors.referencia && <p className="text-red-400 text-[10px] mt-0.5">{errors.referencia}</p>}
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Bairro *</label>
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

              <div>
                <label className="block text-slate-400 mb-1">CEP</label>
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="17500-000"
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Latitude (GPS) *</label>
                <input
                  type="number"
                  step="any"
                  value={lat}
                  onChange={(e) => setLat(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Longitude (GPS) *</label>
                <input
                  type="number"
                  step="any"
                  value={lng}
                  onChange={(e) => setLng(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Seção 3: Manutenção */}
          <div className="pt-2 border-t border-slate-800">
            <h4 className="font-pixel text-[11px] text-slate-300 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-amber-400 inline-block" />
              3. REGISTRO DE MANUTENÇÃO
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Necessidade de Manutenção</label>
                <select
                  value={necessidadeManutencao}
                  onChange={(e) => setNecessidadeManutencao(e.target.value as MaintenanceNeed)}
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100 font-semibold"
                >
                  <option value="nenhuma">Nenhuma (Equipamento em Dia)</option>
                  <option value="imediata">🚨 Imediata (Falha / Avaria / Urgente)</option>
                  <option value="agendada_periodica">📅 Agendada / Periódica</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Data da Próxima Manutenção</label>
                <input
                  type="date"
                  value={dataProximaManutencao}
                  onChange={(e) => setDataProximaManutencao(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Descrição / Histórico do Chamado</label>
                <input
                  type="text"
                  value={descricaoProblema}
                  onChange={(e) => setDescricaoProblema(e.target.value)}
                  placeholder="Ex: Calibração ou laço rompido"
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-100"
                />
                {errors.descricaoProblema && (
                  <p className="text-red-400 text-[10px] mt-0.5">{errors.descricaoProblema}</p>
                )}
              </div>
            </div>
          </div>

          {/* Seção 4: Características Específicas Polimórficas */}
          <div className="pt-2 border-t border-slate-800 bg-slate-950/40 p-2.5 border border-slate-800">
            <h4 className="font-pixel text-[11px] text-purple-400 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-purple-400 inline-block" />
              4. CARACTERÍSTICAS PARTICULARES DO TIPO ({tipo.toUpperCase()})
            </h4>

            {/* Câmeras */}
            {tipo === 'camera_monitoramento' && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Resolução</label>
                  <select
                    value={resolucao}
                    onChange={(e) => setResolucao(e.target.value as '720p' | '1080p' | '4K')}
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-100"
                  >
                    <option value="720p">720p HD</option>
                    <option value="1080p">1080p Full HD</option>
                    <option value="4K">4K Ultra HD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Tipo de Cor</label>
                  <select
                    value={tipoCor}
                    onChange={(e) => setTipoCor(e.target.value as 'colorida' | 'preto_e_branco')}
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-100"
                  >
                    <option value="colorida">Colorida</option>
                    <option value="preto_e_branco">Preto e Branco</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Zoom Ótico</label>
                  <input
                    type="text"
                    value={zoomOtico}
                    onChange={(e) => setZoomOtico(e.target.value)}
                    placeholder="32x"
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-1 justify-center">
                  <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={temVisaoNoturna}
                      onChange={(e) => setTemVisaoNoturna(e.target.checked)}
                      className="accent-sky-500"
                    />
                    <span>Visão Noturna / IR</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={iaEmbarcadaLpr}
                      onChange={(e) => setIaEmbarcadaLpr(e.target.checked)}
                      className="accent-sky-500"
                    />
                    <span>IA / Leitura de Placas (LPR)</span>
                  </label>
                </div>
              </div>
            )}

            {/* Radares */}
            {(tipo === 'radar_velocidade' || tipo === 'radar_semaforo' || tipo === 'radar_conversao') && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Velocidade Máxima da Via (km/h)</label>
                  <input
                    type="number"
                    value={velocidadeMaxima}
                    onChange={(e) => setVelocidadeMaxima(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Faixas Monitoradas</label>
                  <input
                    type="number"
                    value={faixasMonitoradas}
                    onChange={(e) => setFaixasMonitoradas(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Tipo de Infração Principal</label>
                  <select
                    value={tipoInfracao}
                    onChange={(e) => setTipoInfracao(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-100"
                  >
                    <option value="velocidade">Excesso de Velocidade</option>
                    <option value="avanco_semaforo">Avanço de Sinal Vermelho</option>
                    <option value="conversao_proibida">Conversão / Retorno Proibido</option>
                    <option value="faixa_exclusiva">Invasão de Faixa Exclusiva</option>
                  </select>
                </div>
              </div>
            )}

            {/* Balança */}
            {tipo === 'balanca_caminhao' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Capacidade Máxima (Toneladas)</label>
                  <input
                    type="number"
                    value={capacidadeToneladas}
                    onChange={(e) => setCapacidadeToneladas(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-100 font-mono"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pesagemEmMovimento}
                      onChange={(e) => setPesagemEmMovimento(e.target.checked)}
                      className="accent-sky-500"
                    />
                    <span>Pesagem em Movimento (WIM)</span>
                  </label>
                </div>
              </div>
            )}

            {/* Totem e Cancela */}
            {(tipo === 'totem_rotativo' || tipo === 'cancela_automatizada') && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center">
                  <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aceitaPixCartao}
                      onChange={(e) => setAceitaPixCartao(e.target.checked)}
                      className="accent-sky-500"
                    />
                    <span>Aceita Pagamento Pix / Cartão</span>
                  </label>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Nível de Papel (%)</label>
                  <input
                    type="number"
                    value={nivelPapel}
                    onChange={(e) => setNivelPapel(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-100 font-mono"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bateriaSolar}
                      onChange={(e) => setBateriaSolar(e.target.checked)}
                      className="accent-sky-500"
                    />
                    <span>Alimentação por Painel Solar</span>
                  </label>
                </div>
              </div>
            )}

            {/* Veículos, Motos, Viaturas e Patinetes */}
            {(tipo === 'patinete_eletrico' ||
              tipo === 'moto_transito' ||
              tipo === 'viatura_gm' ||
              tipo === 'viatura_pm' ||
              tipo === 'veiculo_transporte' ||
              tipo === 'veiculo_autonomo_rotativo' ||
              tipo === 'drone_vigilancia') && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Nível Bateria/Combustível (%)</label>
                  <input
                    type="number"
                    value={nivelBateriaCombustivel}
                    onChange={(e) => setNivelBateriaCombustivel(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Autonomia Restante (km)</label>
                  <input
                    type="number"
                    value={autonomiaKm}
                    onChange={(e) => setAutonomiaKm(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Odômetro (km)</label>
                  <input
                    type="number"
                    value={odometro}
                    onChange={(e) => setOdometro(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Placa / Identificador</label>
                  <input
                    type="text"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                    placeholder="BRA2E19"
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1 text-slate-100 font-mono uppercase"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <PixelButton variant="secondary" type="button" onClick={onClose}>
              CANCELAR
            </PixelButton>
            <PixelButton variant="success" type="submit">
              <Save size={14} />
              <span>{isEditing ? 'SALVAR ALTERAÇÕES' : 'CONCLUIR CADASTRO'}</span>
            </PixelButton>
          </div>
        </form>
      </div>
    </div>
  );
};
