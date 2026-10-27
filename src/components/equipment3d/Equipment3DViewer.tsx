import React, { useState, useEffect, useRef } from 'react';
import { Equipment } from '../../types/equipment';
import { PixelBadge } from '../common/PixelBadge';
import { PixelIcon } from '../common/PixelIcon';
import {
  X,
  Eye,
  Camera,
  Sun,
  Moon,
  Flame,
  RotateCw,
  ExternalLink,
  MapPin,
  Radio,
  Sliders,
  Layers,
  ZoomIn,
  Video
} from 'lucide-react';

interface Equipment3DViewerProps {
  equipment: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const Equipment3DViewer: React.FC<Equipment3DViewerProps> = ({
  equipment,
  isOpen,
  onClose
}) => {
  if (!isOpen || !equipment) return null;

  const [activeMode, setActiveMode] = useState<'3d' | 'live_feed' | 'street_view'>('live_feed');
  const [visionMode, setVisionMode] = useState<'normal' | 'night_vision' | 'thermal'>('normal');
  const [streetViewType, setStreetViewType] = useState<'streetview_360' | 'satellite' | 'map'>('streetview_360');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isRotating, setIsRotating] = useState(true);

  // 3D Orbit Angles
  const [rotationY, setRotationY] = useState(25);
  const [rotationX, setRotationX] = useState(15);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Auto-spin 3D
  useEffect(() => {
    if (!isRotating || activeMode !== '3d') return;
    const interval = setInterval(() => {
      setRotationY((prev) => (prev + 1.2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isRotating, activeMode]);

  // Live timestamp for CCTV
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('pt-BR'));
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('pt-BR'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mouse drag handlers for 3D Orbit
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    setRotationY((prev) => prev + deltaX * 0.8);
    setRotationX((prev) => Math.max(-45, Math.min(45, prev - deltaY * 0.6)));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Google Street View Panorama Link
  const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${equipment.localizacao.lat},${equipment.localizacao.lng}`;

  return (
    <div className="fixed inset-0 z-[3500] flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="pixel-box w-full max-w-4xl my-4 bg-slate-950 border-2 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.5)] text-xs text-slate-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/40 bg-slate-900/90 px-4 py-3 -mx-4 -mt-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-950 border border-cyan-500 rounded">
              <PixelIcon type={equipment.tipo} size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-sm text-cyan-400 font-bold">
                  {equipment.tipo.replace('_', ' ').toUpperCase()} // VISUALIZADOR 3D & TELEMETRIA
                </span>
                <PixelBadge type="status" value={equipment.situacao} />
              </div>
              <p className="text-[11px] text-slate-300 font-mono">
                {equipment.marca} {equipment.modelo} • SÉRIE: {equipment.numeroSerie} • {equipment.localizacao.rua} ({equipment.localizacao.bairro})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveMode('live_feed')}
              className={`px-3 py-1.5 font-pixel text-[10px] rounded flex items-center gap-1.5 transition-all ${
                activeMode === 'live_feed'
                  ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Video size={13} />
              <span>TRANSMISSÃO AO VIVO (CCTV)</span>
            </button>

            <button
              onClick={() => setActiveMode('3d')}
              className={`px-3 py-1.5 font-pixel text-[10px] rounded flex items-center gap-1.5 transition-all ${
                activeMode === '3d'
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <RotateCw size={13} />
              <span>HOLOGRAMA 3D INTERATIVO</span>
            </button>

            <button
              onClick={() => setActiveMode('street_view')}
              className={`px-3 py-1.5 font-pixel text-[10px] rounded flex items-center gap-1.5 transition-all ${
                activeMode === 'street_view'
                  ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <MapPin size={13} />
              <span>LOCAL NA VIDA REAL (STREET VIEW)</span>
            </button>
          </div>

          {/* Sub-controls for Live Feed */}
          {activeMode === 'live_feed' && (
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 px-1">FILTRO ÓPTICO:</span>
              <button
                onClick={() => setVisionMode('normal')}
                className={`px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 ${
                  visionMode === 'normal'
                    ? 'bg-slate-800 text-sky-400 font-bold border border-sky-500/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun size={11} /> ☀️ DIURNO
              </button>
              <button
                onClick={() => setVisionMode('night_vision')}
                className={`px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 ${
                  visionMode === 'night_vision'
                    ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon size={11} /> 🌙 VISÃO NOTURNA (IR)
              </button>
              <button
                onClick={() => setVisionMode('thermal')}
                className={`px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 ${
                  visionMode === 'thermal'
                    ? 'bg-amber-950 text-amber-300 font-bold border border-amber-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Flame size={11} /> 🔥 TÉRMICO (FLIR)
              </button>
            </div>
          )}

          {/* Sub-controls for Street View */}
          {activeMode === 'street_view' && (
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 px-1">MODO REAL:</span>
              <button
                onClick={() => setStreetViewType('streetview_360')}
                className={`px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 transition-all ${
                  streetViewType === 'streetview_360'
                    ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🚗 360° DIRETO NA TELA
              </button>
              <button
                onClick={() => setStreetViewType('satellite')}
                className={`px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 transition-all ${
                  streetViewType === 'satellite'
                    ? 'bg-blue-950 text-blue-300 font-bold border border-blue-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🛰️ SATÉLITE HD
              </button>
              <button
                onClick={() => setStreetViewType('map')}
                className={`px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 transition-all ${
                  streetViewType === 'map'
                    ? 'bg-slate-800 text-sky-300 font-bold border border-sky-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🗺️ MAPA
              </button>
            </div>
          )}
        </div>

        {/* VIEW 1: LIVE FEED & EM FUNCIONAMENTO */}
        {activeMode === 'live_feed' && (
          <div className="relative w-full h-[460px] bg-black rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* Visual Shader Container */}
            <div
              className={`absolute inset-0 w-full h-full transition-all duration-300 flex items-center justify-center ${
                visionMode === 'night_vision'
                  ? 'brightness-125 contrast-150 hue-rotate-[90deg] saturate-200'
                  : visionMode === 'thermal'
                  ? 'invert contrast-200 hue-rotate-[180deg]'
                  : ''
              }`}
            >
              {/* Simulated Street Avenue Scene with Pixel Art Traffic */}
              <div className="relative w-full h-full bg-[#111827] flex flex-col justify-between overflow-hidden">
                {/* Background Sky / Skyline */}
                <div className={`h-1/3 w-full ${visionMode === 'night_vision' ? 'bg-[#052e16]' : 'bg-[#0f172a]'} relative border-b-2 border-slate-700`}>
                  {/* Distant building silhouettes */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-end gap-1 opacity-40">
                    <div className="w-16 h-28 bg-slate-800" />
                    <div className="w-12 h-36 bg-slate-700" />
                    <div className="w-20 h-20 bg-slate-800" />
                    <div className="w-14 h-32 bg-slate-700" />
                    <div className="w-24 h-44 bg-slate-800" />
                    <div className="w-16 h-24 bg-slate-700" />
                    <div className="w-20 h-36 bg-slate-800" />
                  </div>
                </div>

                {/* Road / Avenue Asphalt */}
                <div className="h-2/3 w-full bg-[#1e293b] relative flex flex-col justify-around py-4">
                  {/* Road lane dashes */}
                  <div className="w-full border-t-2 border-dashed border-amber-400 opacity-60" />
                  <div className="w-full border-t-2 border-dashed border-slate-500 opacity-50" />

                  {/* Simulated Moving Traffic Vehicles */}
                  <div className="relative w-full h-24 flex items-center justify-around px-8">
                    {/* Vehicle 1 */}
                    <div className="relative p-2 bg-slate-900 border-2 border-emerald-400 rounded shadow-lg animate-pulse">
                      <div className="font-pixel text-[9px] text-emerald-400 mb-0.5">
                        [LPR: BRA2E19] • 48 km/h
                      </div>
                      <div className="text-[8px] font-mono text-slate-300">VEÍCULO DE PASSEIO - NOMINAL</div>
                    </div>

                    {/* Vehicle 2 (Infracao) */}
                    <div className="relative p-2 bg-red-950/80 border-2 border-red-500 rounded shadow-lg">
                      <div className="font-pixel text-[9px] text-red-400 font-bold mb-0.5 animate-bounce">
                        ⚠️ [LPR: DXF9912] • 74 km/h [EXCESSO]
                      </div>
                      <div className="text-[8px] font-mono text-red-300">INFRAÇÃO GRAVE REGISTRADA</div>
                    </div>

                    {/* Vehicle 3 */}
                    <div className="relative p-2 bg-slate-900 border border-sky-400 rounded shadow-lg hidden sm:block">
                      <div className="font-pixel text-[9px] text-sky-400 mb-0.5">
                        [LPR: PMB8A44] • 50 km/h
                      </div>
                      <div className="text-[8px] font-mono text-slate-300">VIATURA POLICIAL TÁTICA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Night Vision Phosphor & Scanline Shader Overlay */}
            {visionMode === 'night_vision' && (
              <div className="absolute inset-0 pointer-events-none bg-emerald-950/30 mix-blend-overlay">
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-emerald-950/40 to-black/80" />
              </div>
            )}

            {/* CCTV HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between font-mono">
              {/* Top HUD */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="font-bold tracking-widest text-red-400 font-pixel text-[11px]">
                    REC ● 1080p 60FPS
                  </span>
                  <span className="text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    CAM: {equipment.numeroSerie}
                  </span>
                </div>

                <div className="text-right text-emerald-400 font-bold bg-slate-950/80 px-3 py-1 rounded border border-emerald-500/50">
                  {currentTime} BRT // AO VIVO
                </div>
              </div>

              {/* Center Crosshairs */}
              <div className="self-center flex flex-col items-center opacity-60">
                <div className="w-12 h-12 border-2 border-cyan-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                </div>
                <span className="font-pixel text-[8px] text-cyan-400 mt-1">IA PROMETHEUS RASTREAMENTO</span>
              </div>

              {/* Bottom HUD */}
              <div className="flex items-center justify-between text-[11px] bg-slate-950/80 p-2 rounded border border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">
                    VIA: <strong className="text-slate-100">{equipment.localizacao.rua}</strong>
                  </span>
                  <span className="text-slate-400">
                    GPS: <strong className="text-cyan-400">{equipment.localizacao.lat.toFixed(4)}, {equipment.localizacao.lng.toFixed(4)}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">ZOOM ÓPTICO:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 4, 8].map((z) => (
                      <button
                        key={z}
                        onClick={() => setZoomLevel(z)}
                        className={`pointer-events-auto px-1.5 py-0.5 rounded text-[10px] ${
                          zoomLevel === z ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {z}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: 3D INTERACTIVE HOLOGRAM */}
        {activeMode === '3d' && (
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="relative w-full h-[460px] bg-[#070b14] rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* 3D Grid Stage */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* 3D Holographic Rendering Container */}
            <div
              className="relative transition-transform duration-75 flex items-center justify-center"
              style={{
                transform: `perspective(800px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(1.6)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Rotating Equipment Pixel Sprite with 3D Depth Layers */}
              <div className="relative flex flex-col items-center">
                {/* Hologram Base Ring */}
                <div className="w-32 h-32 rounded-full border-2 border-cyan-400/40 border-dashed animate-spin -mb-16 opacity-60" style={{ transform: 'rotateX(75deg)' }} />

                {/* Center Sprite */}
                <div className="p-4 bg-slate-900/90 border-2 border-cyan-400 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                  <PixelIcon type={equipment.tipo} size={72} />
                </div>

                {/* Laser scan animation for radars */}
                {(equipment.tipo === 'radar_velocidade' || equipment.tipo === 'radar_semaforo') && (
                  <div className="w-48 h-1 bg-red-500/80 shadow-[0_0_15px_#ef4444] mt-2 animate-pulse" />
                )}
              </div>
            </div>

            {/* 3D Control Hints Overlay */}
            <div className="absolute bottom-3 left-3 bg-slate-950/80 p-2 rounded border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-3">
              <span>🖱️ Arraste com o mouse para girar em 360°</span>
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`px-2 py-0.5 rounded font-pixel text-[9px] ${isRotating ? 'bg-cyan-950 text-cyan-300 border border-cyan-500' : 'bg-slate-800 text-slate-400'}`}
              >
                {isRotating ? 'AUTO-ROTAÇÃO: ON' : 'AUTO-ROTAÇÃO: OFF'}
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: STREET VIEW REAL (VIDA REAL) - DIRETO NA APLICAÇÃO */}
        {activeMode === 'street_view' && (
          <div className="relative w-full h-[480px] bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex flex-col justify-between">
            {/* Top Bar Status & Coords */}
            <div className="p-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-pixel text-[10px] text-emerald-400 font-bold">
                  {streetViewType === 'streetview_360'
                    ? 'STREET VIEW 360° DIRETO NA TELA'
                    : streetViewType === 'satellite'
                    ? 'SATÉLITE ORTOFOTO EM ALTA RESOLUÇÃO'
                    : 'MAPA CARTOGRÁFICO URBANO'}
                </span>
                <span className="text-slate-400 hidden sm:inline">
                  • {equipment.localizacao.rua} ({equipment.localizacao.bairro})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[10px] hidden md:inline">
                  GPS: <strong className="text-emerald-400">{equipment.localizacao.lat.toFixed(5)}, {equipment.localizacao.lng.toFixed(5)}</strong>
                </span>
                <a
                  href={streetViewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[9px] rounded border border-slate-700 flex items-center gap-1 transition-colors"
                  title="Abrir em aba externa se preferir"
                >
                  <ExternalLink size={10} />
                  <span>Aba Externa</span>
                </a>
              </div>
            </div>

            {/* Real World Landmark / Intersection Reference Bar */}
            <div className="px-3 py-1.5 bg-slate-950/95 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-hud text-slate-300">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-amber-400 font-pixel text-[9px] px-1.5 py-0.5 bg-amber-950/80 border border-amber-500/50 rounded flex items-center gap-1">
                  🚦 PONTO REAL VERIFICADO
                </span>
                <span className="text-slate-200 font-semibold truncate">
                  {equipment.localizacao.referencia}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline whitespace-nowrap">
                ✓ Coordenadas Oficiais Marília/SP
              </span>
            </div>

            {/* Embedded Interactive Frame Direct in Program */}
            <div className="relative flex-1 w-full bg-black overflow-hidden">
              <iframe
                key={`${streetViewType}-${equipment.id}`}
                title="Direct Real World Street View"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="eager"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                src={
                  streetViewType === 'streetview_360'
                    ? `https://maps.google.com/maps?layer=c&cbll=${equipment.localizacao.lat},${equipment.localizacao.lng}&cbp=12,0,0,0,0&output=svembed`
                    : streetViewType === 'satellite'
                    ? `https://maps.google.com/maps?q=${equipment.localizacao.lat},${equipment.localizacao.lng}&t=k&z=19&output=embed`
                    : `https://maps.google.com/maps?q=${equipment.localizacao.lat},${equipment.localizacao.lng}&hl=pt-BR&z=17&output=embed`
                }
              />

              {/* Floating Interaction Guide Banner */}
              <div className="absolute bottom-2 left-2 right-2 pointer-events-none flex items-center justify-between text-[10px] font-mono text-slate-300 bg-slate-950/90 px-3 py-1.5 rounded border border-slate-800 backdrop-blur-sm shadow-lg">
                <span>
                  🖱️ <strong>Interação 100% Direta:</strong> Arraste dentro da tela para girar 360° em qualquer direção e clique nas setas de chão para andar pela rua.
                </span>
                <span className="text-emerald-400 font-pixel text-[9px] hidden sm:inline">
                  AO VIVO • SEM SAIR DO APP
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              Status de Rede: <strong className="text-emerald-400 font-mono">Conectado (4G IoT)</strong>
            </span>
            <span>
              Temperatura do Chip:{' '}
              <strong className="text-amber-400 font-mono">
                {equipment.telemetria?.temperaturaChipC || 38}°C
              </strong>
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs rounded border border-slate-700 transition-colors"
          >
            FECHAR VISUALIZADOR
          </button>
        </div>
      </div>
    </div>
  );
};
