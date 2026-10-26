import React, { useState } from 'react';
import { RadioLog } from '../../types/dispatch';
import { soundService } from '../../services/soundService';
import { Radio, Send, Terminal, Volume2, Shield } from 'lucide-react';

interface RadioLogTerminalProps {
  logs: RadioLog[];
  onSendMessage: (msg: string) => void;
}

export const RadioLogTerminal: React.FC<RadioLogTerminalProps> = ({
  logs,
  onSendMessage
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    soundService.playRadioClick();
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="pixel-box bg-[#070a12] border-slate-800 p-3 space-y-2 font-mono">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Radio size={14} className="text-emerald-400 animate-pulse" />
          <span className="font-pixel text-[10px] text-emerald-400 font-bold">
            CANAL COPOM // RÁDIO TRANSMISSÃO CICC (MARÍLIA-SP)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>FREQ: 154.800 MHz [QAP]</span>
        </div>
      </div>

      {/* Scrolling Radio Chatter Feed */}
      <div className="space-y-1.5 max-h-36 overflow-y-auto text-[11px] pr-1 scrollbar-thin">
        {logs.map((log) => {
          let callsignColor = 'text-sky-400';
          let borderLeft = 'border-sky-500/40';

          if (log.tipo === 'despacho') {
            callsignColor = 'text-red-400 font-bold';
            borderLeft = 'border-red-500';
          } else if (log.tipo === 'alerta') {
            callsignColor = 'text-amber-400 font-bold';
            borderLeft = 'border-amber-500';
          } else if (log.tipo === 'predicao') {
            callsignColor = 'text-purple-400 font-bold';
            borderLeft = 'border-purple-500';
          }

          return (
            <div
              key={log.id}
              className={`p-1.5 bg-slate-950/80 border-l-2 ${borderLeft} flex items-start gap-2 leading-tight`}
            >
              <span className="text-[10px] text-slate-500 shrink-0">[{log.timestamp}]</span>
              <span className={`text-[10px] ${callsignColor} shrink-0`}>
                [{log.callsign}]:
              </span>
              <span className="text-slate-300">{log.mensagem}</span>
            </div>
          );
        })}
      </div>

      {/* PTT (Push to Talk) Transmission Input */}
      <form onSubmit={handleSend} className="flex items-center gap-2 pt-1 border-t border-slate-800">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Transmitir ordem na rede de rádio (Ex: 'Viatura GM-04, informe QTH')..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-emerald-300 placeholder:text-slate-500 font-mono focus:outline-none focus:border-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-pixel text-[9px] rounded flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(16,185,129,0.3)]"
        >
          <Send size={11} />
          <span>TRANSMITIR (PTT)</span>
        </button>
      </form>
    </div>
  );
};
