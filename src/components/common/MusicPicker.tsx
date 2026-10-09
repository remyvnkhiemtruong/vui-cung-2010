'use client';

import {useId,useState,useSyncExternalStore} from 'react';
import {Check,Music2,Pause,Play,Volume2,VolumeX} from 'lucide-react';
import {backgroundMusic,MUSIC_TRACKS} from '@/utils/music';

/** A compact music control. The browser requires a user gesture to begin audio. */
export default function MusicPicker(){
  const [open,setOpen]=useState(false);
  const [unsupported,setUnsupported]=useState(false);
  const menuId=useId();
  const {track,playing,volume}=useSyncExternalStore(
    backgroundMusic.subscribe,backgroundMusic.getSnapshot,backgroundMusic.getServerSnapshot
  );
  const selected=MUSIC_TRACKS.find(t=>t.id===track)!;
  const toggle=()=>{
    setUnsupported(false);
    const wasPlaying=backgroundMusic.getSnapshot().playing;
    const started=backgroundMusic.toggle();
    if(!wasPlaying&&!started)setUnsupported(true);
  };
  return <div className="music-picker relative">
    <button type="button"
      aria-label={`Background music: ${playing?'playing':'paused'}. ${selected.name}. Open music controls.`}
      aria-expanded={open} aria-controls={menuId}
      onClick={()=>setOpen(v=>!v)}
      className={`music-picker-trigger ${playing?'is-playing':''}`}
      title="Background music / Nhac nen">
      <Music2 aria-hidden="true" size={17}/>
      <span className="hidden sm:inline">MUSIC</span>
    </button>
    {open&&<div id={menuId} role="group" aria-label="Background music selector"
      className="music-picker-panel">
      <div className="music-picker-top">
        <div><strong>BACKGROUND MUSIC</strong><p>Original October 20 instrumentals</p></div>
        <button type="button" className="music-play-button" onClick={toggle}
          aria-label={playing?'Pause background music':'Play background music'}>
          {playing?<Pause size={17} fill="currentColor"/>:<Play size={17} fill="currentColor"/>}
          <span>{playing?'PAUSE':'PLAY'}</span>
        </button>
      </div>
      <fieldset className="music-tracks">
        <legend className="sr-only">Select music</legend>
        {MUSIC_TRACKS.map(item=><label key={item.id} className={`music-track ${track===item.id?'selected':''}`}>
          <input type="radio" name={menuId+'-tracks'} value={item.id}
            checked={track===item.id} onChange={()=>backgroundMusic.select(item.id)}/>
          <span className="music-track-text"><strong>{item.name}</strong><small>{item.mood}</small></span>
          {track===item.id&&<Check size={15} aria-hidden="true"/>}
        </label>)}
      </fieldset>
      <label className="music-volume">
        {volume===0?<VolumeX size={16} aria-hidden="true"/>:<Volume2 size={16} aria-hidden="true"/>}
        <span>VOLUME</span>
        <input type="range" min="0" max="100" step="5" value={Math.round(volume*100)}
          onChange={e=>backgroundMusic.setVolume(Number(e.target.value)/100)}
          aria-label="Background music volume"/>
        <output>{Math.round(volume*100)}%</output>
      </label>
      {unsupported&&<p role="alert" className="music-hint">Audio is unavailable in this browser.</p>}
      <p className="music-hint">Select a track, then press Play. Sound effects stay separate.</p>
    </div>}
  </div>;
}
