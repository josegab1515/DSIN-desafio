import React, { useState, useEffect } from 'react';
import { soundService } from '../../services/soundService';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioToggle: React.FC = () => {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(soundService.isMuted());
  }, []);

  const handleToggle = () => {
    const newState = soundService.toggleMute();
    setMuted(newState);
    if (!newState) {
      soundService.playPowerUp();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="pixel-btn pixel-btn-secondary text-xs px-2 py-1.5 flex items-center gap-1.5"
      title={muted ? 'Ativar Efeitos Sonoros 8-Bit' : 'Silenciar Efeitos Sonoros'}
    >
      {muted ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} className="text-green-400" />}
      <span className="hidden sm:inline font-pixel text-[9px]">{muted ? 'SOM: OFF' : 'SOM: ON'}</span>
    </button>
  );
};
