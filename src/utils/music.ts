'use client';

/**
 * Three original, procedurally synthesized instrumental pieces for October 20.
 * There are no external audio streams, copyrighted recordings, or network calls.
 * AudioContext is created ONLY when the visitor explicitly presses Play.
 */
export type MusicId = 'gentle-bloom' | 'heartfelt-thanks' | 'joyful-october';
export type MusicSnapshot = {track: MusicId; playing: boolean; volume: number};

interface MusicTrack {
  id: MusicId;
  name: string;
  mood: string;
  bpm: number;
  wave: OscillatorType;
  melody: readonly number[]; // MIDI pitch; 0 denotes a musical rest
  bass: readonly number[]; // Roots, repeated in four-beat phrases
}

export const MUSIC_TRACKS: readonly MusicTrack[] = [
  {
    id: 'gentle-bloom', name: 'Gentle Bloom', mood: 'Soft floral waltz', bpm: 84,
    wave: 'sine',
    melody: [64,67,72,71,69,67,64,0,62,64,67,69,67,64,60,0,
             64,67,72,74,72,71,69,0,67,69,67,64,62,60,60,0],
    bass: [48,45,53,48,48,45,55,48]
  },
  {
    id: 'heartfelt-thanks', name: 'Heartfelt Thanks', mood: 'Warm, calm and graceful', bpm: 74,
    wave: 'triangle',
    melody: [60,64,67,64,62,65,69,0,64,67,72,69,67,64,62,0,
             60,64,69,72,71,69,67,0,65,64,62,64,67,64,60,0],
    bass: [48,53,45,55,48,45,53,48]
  },
  {
    id: 'joyful-october', name: 'Joyful October', mood: 'Bright and celebratory', bpm: 116,
    wave: 'triangle',
    melody: [72,76,79,76,74,76,79,0,77,81,79,76,74,72,74,0,
             76,79,84,81,79,76,74,0,72,74,76,79,77,74,72,0],
    bass: [48,55,53,55,48,45,53,48]
  }
];

const TRACK_STORAGE = 'oct20_music_track_v1';
const VOLUME_STORAGE = 'oct20_music_volume_v1';
const SERVER_SNAPSHOT: MusicSnapshot = {track:'gentle-bloom',playing:false,volume:0.26};
const validTrack = (input: string | null): input is MusicId =>
  MUSIC_TRACKS.some(item=>item.id===input);
const midiHz = (note: number): number => 440 * Math.pow(2,(note-69)/12);

class BackgroundMusic {
  private snapshot: MusicSnapshot = SERVER_SNAPSHOT;
  private listeners = new Set<()=>void>();
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private nextBeat = 0;
  private position = 0;

  constructor(){
    if(typeof window==='undefined')return;
    try{
      const id=localStorage.getItem(TRACK_STORAGE);
      const raw=Number(localStorage.getItem(VOLUME_STORAGE));
      const volume=Number.isFinite(raw)&&raw>=0&&raw<=1?raw:SERVER_SNAPSHOT.volume;
      this.snapshot={track:validTrack(id)?id:SERVER_SNAPSHOT.track,playing:false,volume};
    }catch{}
  }

  subscribe = (listener:()=>void):(()=>void)=>{
    this.listeners.add(listener);
    return ()=>{this.listeners.delete(listener)};
  };
  getSnapshot = ():MusicSnapshot=>this.snapshot;
  getServerSnapshot = ():MusicSnapshot=>SERVER_SNAPSHOT;
  private notify(){this.listeners.forEach(listener=>listener());}
  private update(changes:Partial<MusicSnapshot>){
    this.snapshot={...this.snapshot,...changes};
    this.notify();
  }

  private contextReady():AudioContext{
    if(!this.context){
      this.context=new AudioContext();
      this.master=this.context.createGain();
      this.master.gain.value=0;
      this.master.connect(this.context.destination);
    }
    return this.context;
  }

  private note(note:number,at:number,duration:number,kind:OscillatorType,amplitude:number){
    if(!this.context||!this.master||!note)return;
    const ctx=this.context;
    const osc=ctx.createOscillator();
    const envelope=ctx.createGain();
    const end=at+duration;
    osc.type=kind;
    osc.frequency.setValueAtTime(midiHz(note),at);
    envelope.gain.setValueAtTime(0.0001,at);
    envelope.gain.linearRampToValueAtTime(amplitude,at+Math.min(0.035,duration/5));
    envelope.gain.exponentialRampToValueAtTime(0.0001,end);
    osc.connect(envelope);
    envelope.connect(this.master);
    osc.onended=()=>{osc.disconnect();envelope.disconnect()};
    osc.start(at);
    osc.stop(end+0.01);
  }

  private schedule=()=>{
    const ctx=this.context;
    if(!ctx||!this.snapshot.playing)return;
    const track=MUSIC_TRACKS.find(t=>t.id===this.snapshot.track)!;
    const beatLength=60/track.bpm;
    // Schedule at most 0.65s into the future, so Pause/Track changes are responsive.
    while(this.nextBeat<ctx.currentTime+0.65){
      const i=this.position%track.melody.length;
      this.note(track.melody[i],this.nextBeat,beatLength*0.8,track.wave,0.18);
      if(i%4===0){
        const bass=track.bass[Math.floor(i/4)%track.bass.length];
        this.note(bass,this.nextBeat,beatLength*2.9,'sine',0.085);
      }
      this.position+=1;
      this.nextBeat+=beatLength;
    }
  };

  play=():boolean=>{
    if(typeof window==='undefined')return false;
    try{
      const ctx=this.contextReady();
      // Called synchronously in a real button click (browser autoplay policy).
      void ctx.resume().catch(()=>this.pause());
      this.position=0;
      this.nextBeat=ctx.currentTime+0.08;
      this.master!.gain.cancelScheduledValues(ctx.currentTime);
      this.master!.gain.setTargetAtTime(this.snapshot.volume*0.55,ctx.currentTime,0.04);
      if(this.timer!==null)clearInterval(this.timer);
      this.update({playing:true});
      this.schedule();
      this.timer=setInterval(this.schedule,110);
      return true;
    }catch{
      this.update({playing:false});
      return false;
    }
  };
  pause=()=>{
    if(this.timer!==null){clearInterval(this.timer);this.timer=null;}
    const ctx=this.context;
    if(ctx&&this.master){
      this.master.gain.cancelScheduledValues(ctx.currentTime);
      this.master.gain.setTargetAtTime(0,ctx.currentTime,0.03);
    }
    this.update({playing:false});
  };
  toggle=():boolean=>this.snapshot.playing?(this.pause(),false):this.play();
  select=(id:MusicId)=>{
    if(!MUSIC_TRACKS.some(t=>t.id===id))return;
    const wasPlaying=this.snapshot.playing;
    if(wasPlaying)this.pause();
    this.update({track:id});
    try{localStorage.setItem(TRACK_STORAGE,id)}catch{}
    if(wasPlaying)this.play();
  };
  setVolume=(value:number)=>{
    const volume=Math.max(0,Math.min(1,Number.isFinite(value)?value:0));
    this.update({volume});
    try{localStorage.setItem(VOLUME_STORAGE,String(volume))}catch{}
    if(this.context&&this.master){
      this.master.gain.setTargetAtTime(this.snapshot.playing?volume*0.55:0,this.context.currentTime,0.04);
    }
  };
}
export const backgroundMusic=new BackgroundMusic();
