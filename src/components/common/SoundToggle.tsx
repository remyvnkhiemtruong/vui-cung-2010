'use client';

import React, { useSyncExternalStore } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import {
  soundManager,
  subscribeSoundMute,
  getSoundMuteSnapshot,
  getServerSoundMuteSnapshot,
} from '@/utils/sound';

interface SoundToggleProps {
  className?: string;
}

export default function SoundToggle({ className = '' }: SoundToggleProps) {
  const isMuted = useSyncExternalStore(
    subscribeSoundMute,
    getSoundMuteSnapshot,
    getServerSoundMuteSnapshot
  );

  const handleToggle = () => {
    soundManager.toggleMute();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isMuted ? 'Turn game sound on' : 'Turn game sound off'}
      title={isMuted ? 'Sound on' : 'Sound off'}
      className={`
        relative p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs focus:outline-hidden focus-visible:ring-4 focus-visible:ring-rose-500 focus-visible:ring-offset-2
        ${
          isMuted
            ? 'bg-slate-100 hover:bg-slate-200 text-slate-500 border-slate-200'
            : 'bg-white/95 hover:bg-rose-50 text-rose-600 border-rose-200 hover:border-rose-300'
        }
        ${className}
      `}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
      ) : (
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
      )}
    </button>
  );
}
