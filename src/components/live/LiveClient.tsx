'use client';
import React,{useCallback,useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {QRCodeSVG} from 'qrcode.react';
import confetti from 'canvas-confetti';
import ScoreTicker from '@/components/common/ScoreTicker';
import AuthorCredits from '@/components/common/AuthorCredits';
import MusicPicker from '@/components/common/MusicPicker';
import {ArrowRight,CheckCircle2,Clock3,Copy,ExternalLink,Gamepad2,Medal,Monitor,Play,Radio,RotateCcw,Shield,Smartphone,Trophy,Users} from 'lucide-react';

type Phase='lobby'|'question'|'reveal'|'finished';
type Option={key:'A'|'B'|'C'|'D',text:string};
type LiveQuestion={id:string|number,question:string,category?:string,image?:string|null,options:Option[],correctAnswer?:string,explanation?:string,sourceUrl?:string};
type Rank={rank:number,name:string,score:number,streak:number};
type Snapshot={code:string,phase:Phase,index:number,total:number,question:LiveQuestion|null,seconds:number,remainingMs:number,playerCount:number,answeredCount:number,maxPlayers:number,leaderboard:Rank[],me?:{displayName:string,score:number,answered:boolean}|null};
type PlayerSession={id:string,token:string,name:string};
type HostSession={code:string,token:string};
const colors=['#e11d48','#2563eb','#c58c06','#059669'];
const OPTIONS=['A','B','C','D'] as const;

async function requestJson<T>(url:string, options?:RequestInit):Promise<T>{
  const r=await fetch(url,{cache:'no-store',...options,headers:{'Content-Type':'application/json',...options?.headers}});
  const data=await r.json().catch(()=>({error:'Unexpected server response.'}));
  if(!r.ok)throw new Error(data.error || 'Request failed.');
  return data as T;
}
function useRoom(code:string,player?:PlayerSession|null){
  const [room,setRoom]=useState<Snapshot|null>(null);
  const [issue,setIssue]=useState('');
  const [sampleAt,setSampleAt]=useState(Date.now());
  const [tick,setTick]=useState(Date.now());
  const refresh=useCallback(async()=>{
    if(!/^[A-Z0-9]{6}$/.test(code))return;
    try{
      const headers:Record<string,string>={};
      if(player){headers.Authorization='Bearer '+player.token;headers['X-Live-Player-Id']=player.id;}
      const next=await requestJson<Snapshot>('/api/live/'+code,{headers});
      setRoom(next);setSampleAt(Date.now());setIssue('');
    }catch(err){setIssue(err instanceof Error?err.message:'Cannot reach the live server.');}
  },[code,player?.id,player?.token]);
  useEffect(()=>{if(!/^[A-Z0-9]{6}$/.test(code))return;void refresh();const timer=setInterval(()=>void refresh(),2200);return()=>clearInterval(timer)},[code,refresh]);
  useEffect(()=>{const timer=setInterval(()=>setTick(Date.now()),160);return()=>clearInterval(timer)},[]);
  const ms=room?.phase==='question'?
    Math.max(0,room.remainingMs-(tick-sampleAt)):0;
  return {room,issue,refresh,remaining:Math.ceil(ms/1000),remainingMs:ms};
}
function Panel({children,className=''}:{children:React.ReactNode,className?:string}){
  return <div className={'live-panel rounded-2xl border border-rose-200 bg-white/95 p-3 sm:p-5 shadow-lg '+className}>{children}</div>;
}
function LiveLayout({title,subtitle,children}:{title:string,subtitle:string,children:React.ReactNode}){
  return <main className="live-stage relative flex h-dvh min-h-0 flex-col overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 text-slate-900">
    <header className="flex shrink-0 items-center justify-between gap-2 border-b border-rose-200 bg-white/80 px-3 py-2 sm:px-6">
      <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-widest text-rose-600">ENGLISH CLUB | OCTOBER 20</p>
      <h1 className="truncate text-base font-black text-rose-950 sm:text-2xl">{title}</h1>
      <p className="hidden text-xs text-slate-600 sm:block">{subtitle}</p></div>
      <div className="flex shrink-0 items-center gap-2">
        <MusicPicker />
        <Link href="/live" className="shrink-0 rounded-xl border border-rose-200 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50">LIVE HOME</Link>
      </div>
    </header>
    <div className="min-h-0 flex-1 overflow-hidden px-3 py-2 sm:px-5 sm:py-3">{children}</div>
    <footer className="live-credit-footer" aria-label="Website credits">
      <AuthorCredits />
    </footer>
  </main>;
}
function Button({children,onClick,disabled=false,variant='main'}:{children:React.ReactNode,onClick:()=>void,disabled?:boolean,variant?:'main'|'light'}){
  return <button type="button" disabled={disabled} onClick={onClick}
    className={(variant==='main'?'bg-rose-600 text-white hover:bg-rose-700':'border border-rose-300 bg-white text-rose-800 hover:bg-rose-50')+
      ' inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50'}>{children}</button>;
}
function QR({url}:{url:string}) {
  return <div className="rounded-2xl bg-white p-2 shadow-sm" aria-label="Scan QR to join the quiz"><QRCodeSVG value={url} size={172} marginSize={1} /></div>;
}
function Ranking({room,limit=10}:{room:Snapshot,limit?:number}){
  return <div className="min-h-0 flex-1 overflow-auto" aria-label="Live leaderboard">
    {room.leaderboard.length===0?<p className="py-4 text-center text-slate-500">No players yet.</p>:
    room.leaderboard.slice(0,limit).map(p=><div key={p.rank+':'+p.name} className={`live-rank-row ${p.rank<=3?'live-rank-podium':''} mb-1.5 flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50/80 px-3 py-2`}>
      <strong className={'w-7 text-center text-lg '+(p.rank<=3?'text-amber-600':'text-slate-500')}>{p.rank}</strong>
      <span className="min-w-0 flex-1 truncate text-sm font-bold">{p.name}</span>
      <strong className="text-sm tabular-nums text-rose-700"><ScoreTicker value={p.score} className="live-score" /></strong>
    </div>)}
  </div>;
}
/**
 * Server-confirmed responses for the current question; both MC and projector
 * receive the same count in their ~2.2-second room snapshots.
 */
function ResponseProgress({room,compact=false}:{room:Snapshot,compact?:boolean}){
  const total=room.playerCount;
  const answered=Math.max(0,Math.min(total,room.answeredCount??0));
  const pending=Math.max(0,total-answered);
  const complete=total>0 && pending===0;
  const percentage=total>0 ? Math.round(answered/total*100) : 0;
  return <div role="status"
    aria-label={`${answered} of ${total} students have answered the current question`}
    className={`live-response-progress ${complete?'is-complete':''} shrink-0 rounded-xl border ${complete?'border-emerald-200 bg-emerald-50':'border-rose-200 bg-rose-50'} ${compact?'px-3 py-2':'px-3 py-2 sm:px-4 sm:py-3'}`}>
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        {complete?<CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600"/>:<Users className="h-5 w-5 shrink-0 text-rose-600"/>}
        <span className={`truncate text-xs font-black sm:text-sm ${complete?'text-emerald-800':'text-rose-800'}`}>
          {complete?'ALL STUDENTS HAVE ANSWERED':'ANSWERS RECEIVED'}
        </span>
      </div>
      <strong className={`shrink-0 text-lg font-black tabular-nums sm:text-2xl ${complete?'text-emerald-700':'text-rose-700'}`}>
        <span className="answer-count-pop" key={answered}>{answered}</span><span className="text-slate-500">/{total}</span>
      </strong>
    </div>
    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white" aria-hidden="true">
      <div className={`h-full rounded-full transition-[width] duration-500 ${complete?'bg-emerald-500':'bg-rose-500'}`}
        style={{width:`${percentage}%`}}/>
    </div>
    {!compact&&<p className="mt-1 text-[11px] font-semibold text-slate-600">
      {complete?'Ready to reveal - only the MC can reveal the answer.':
        `${pending} ${pending===1?'student has':'students have'} not answered yet.`}
    </p>}
  </div>;
}

function CurrentQuestion({room,remaining,showOptions=false,onAnswer,locked=false,busy=false,selectedChoice=null}:{room:Snapshot,remaining:number,showOptions?:boolean,onAnswer?:(choice:Option['key'])=>void,locked?:boolean,busy?:boolean,selectedChoice?:Option['key']|null}){
  const q=room.question;
  if(!q)return <p className="text-center text-slate-600">Waiting for the next question...</p>;
  return <div className="live-question-stage flex min-h-0 flex-1 flex-col justify-center gap-2">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">QUESTION {room.index+1}/{room.total} | {q.category}</span>
      <span className={`live-timer-pill ${room.phase==='question'&&remaining<=5?'is-urgent':''} flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-lg font-black text-amber-900`}><Clock3 className="h-4 w-4"/>{room.phase==='question'?remaining+'s':'REVEALED'}</span>
    </div>
    <div className={'flex min-h-0 flex-1 flex-col items-center justify-center gap-3 '+(q.image?'sm:flex-row':'')}>
      {q.image&&<img src={q.image} alt={q.question} className="live-quiz-image max-h-[24dvh] w-full max-w-sm rounded-xl object-contain sm:w-2/5"/>}
      <h2 className="text-center text-lg font-black leading-tight sm:text-2xl lg:text-4xl">{q.question}</h2>
    </div>
    <div className="live-quiz-options grid shrink-0 grid-cols-2 gap-2">
      {q.options.map((o,i)=>{
        const isCorrect=room.phase==='reveal'&&q.correctAnswer===o.key;
        const dimOnReveal=room.phase==='reveal'&&!isCorrect;
        const chosen=selectedChoice===o.key&&room.phase==='question';
        return <button key={o.key} type="button" onClick={()=>onAnswer?.(o.key)}
          disabled={!showOptions||locked||busy||room.phase!=='question'||remaining===0}
          className={'live-option-btn flex min-h-[58px] items-center gap-2 rounded-xl border-2 px-3 py-2 text-left text-xs font-semibold text-white sm:min-h-[75px] sm:text-base '+(isCorrect?'live-option-correct ring-4 ring-emerald-300 shadow-xl ':'')+(dimOnReveal?'live-option-dim ':'')+(chosen?'live-option-selected ':'')+(showOptions&&!locked?'hover:brightness-110 ':'') }
          style={{backgroundColor:colors[i],borderColor:isCorrect?'#fff':colors[i]}}>
          <strong className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/25 text-base">{o.key}</strong>
          <span>{o.text}</span>
        </button>;
      })}
    </div>
    {room.phase==='reveal'&&<div className="live-answer-reveal rounded-xl bg-emerald-50 p-2 text-center text-xs text-emerald-900 sm:text-sm">
      <strong>Correct answer: {q.correctAnswer}</strong> | {q.explanation}
    </div>}
  </div>;
}

export function LiveHome(){
  const router=useRouter(),[code,setCode]=useState('');
  return <LiveLayout title="LIVE QUIZ" subtitle="Play together on your own phones">
    <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center gap-4">
      <div className="text-center"><Gamepad2 className="mx-auto mb-2 h-12 w-12 text-rose-600"/>
        <h2 className="text-2xl font-black sm:text-4xl">Vietnamese Women's Day</h2>
        <p className="mt-2 text-sm text-slate-600">12 teacher-authored questions | Up to 50 players | No repeats</p>
      </div>
      <Panel className="w-full max-w-xl">
        <label htmlFor="roomCode" className="text-xs font-bold text-rose-800">ENTER YOUR 6-CHARACTER ROOM CODE</label>
        <input id="roomCode" maxLength={6} value={code} onChange={e=>setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,''))}
          placeholder="ABC123" className="my-2 w-full rounded-xl border-2 border-rose-200 p-3 text-center text-2xl font-black tracking-widest focus:border-rose-500 focus:outline-none"/>
        <Button disabled={code.length!==6} onClick={()=>router.push('/live/join/'+code)}><Smartphone className="h-4 w-4"/> JOIN GAME</Button>
      </Panel>
      <Link href="/live/host" className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-sm font-black text-white shadow hover:bg-rose-700">
        <Play className="h-4 w-4"/> CREATE ROOM & INVITE STUDENTS
      </Link>
      <Link href="/" className="text-xs text-slate-500 underline">Return to the solo quiz</Link>
    </div>
  </LiveLayout>;
}

export function HostConsole(){
  const [session,setSession]=useState<HostSession|null>(null);
  const creatingRef=useRef(false);
  const [origin,setOrigin]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
  useEffect(()=>{
    setOrigin(window.location.origin);
    const raw=sessionStorage.getItem('live-quiz-host-teacher12-v1');
    if(raw){try{const previous=JSON.parse(raw) as HostSession;setSession(previous);return;}catch{sessionStorage.removeItem('live-quiz-host-teacher12-v1');}}
    if(creatingRef.current)return;
    creatingRef.current=true;
    void createRoom();
  // Creation is intentionally once on entry and can be retried manually on failure.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const {room,issue,refresh,remaining}=useRoom(session?.code??'------');
  const createRoom=async()=>{
    if(busy)return;
    setBusy(true);setMessage('');
    try{
      const data=await requestJson<{code:string,hostToken:string}>('/api/live',{
        method:'POST',body:JSON.stringify({})
      });
      const value={code:data.code,token:data.hostToken};
      sessionStorage.setItem('live-quiz-host-teacher12-v1',JSON.stringify(value));
      setSession(value);
    }catch(e){setMessage(e instanceof Error?e.message:'Could not create room.')}
    finally{setBusy(false)}
  };
  const newRoom=()=>{
    // Explicit new-room action: do not reuse the previous session.
    sessionStorage.removeItem('live-quiz-host-teacher12-v1');
    setSession(null);
    void createRoom();
  };
  const act=async(action:string)=>{
    if(!session)return;setBusy(true);setMessage('');
    try{await requestJson('/api/live/'+session.code+'/control',{method:'POST',headers:{Authorization:'Bearer '+session.token},body:JSON.stringify({action})});await refresh();}
    catch(e){setMessage(e instanceof Error?e.message:'Host action failed.')}finally{setBusy(false)}
  };
  const joinUrl=origin&&session?origin+'/live/join/'+session.code:'';
  return <LiveLayout title="HOST CONTROL" subtitle="Create and control the live game">
    {!session?<div className="mx-auto flex h-full max-w-md flex-col justify-center gap-3">
      <Panel>
        <Shield className="mb-2 h-8 w-8 text-rose-600"/>
        <h2 className="text-xl font-black">PREPARING YOUR ROOM</h2>
        <p className="my-3 text-sm text-slate-600">
          {busy ? 'Creating your private host controls and public invite QR...' : 'Room creation is ready.'}
        </p>
        {!busy&&<Button onClick={()=>void createRoom()}><RotateCcw className="h-4 w-4"/> TRY AGAIN</Button>}
        {message&&<p role="alert" className="mt-2 text-xs font-semibold text-rose-700">{message}</p>}
      </Panel>
    </div>:
      <div className="grid h-full min-h-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)]">
        <Panel className="flex min-h-0 flex-col gap-3 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold">ROOM <strong className="text-xl tracking-widest text-rose-700">{session.code}</strong></p>
            <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-extrabold uppercase">{room?.phase||'Connecting'}</span>
          </div>
          {room?.phase==='lobby'&&<div className="live-lobby-stage flex flex-1 flex-col items-center justify-center gap-2">
            {joinUrl&&<QR url={joinUrl}/>}
            <p className="text-center text-sm font-bold">Waiting for students: {room.playerCount}/50</p>
            <p className="max-w-full break-all text-center text-xs text-slate-500">{joinUrl}</p>
            {joinUrl&&<Button variant="light" onClick={()=>void navigator.clipboard.writeText(joinUrl).then(()=>setMessage('Invite link copied!')).catch(()=>setMessage('Please copy the invite link shown above.'))}>
              <Copy className="h-4 w-4"/> COPY INVITE LINK
            </Button>}
          </div>}
          {room&&(room.phase==='question'||room.phase==='reveal')&&<CurrentQuestion key={`${room.index}-${room.phase}`} room={room} remaining={remaining}/>}
          {room?.phase==='question'&&<ResponseProgress room={room}/>}
          {room?.phase==='finished'&&<div className="flex flex-1 flex-col items-center justify-center gap-2">
            <Trophy className="h-12 w-12 text-amber-500"/><h2 className="text-2xl font-black">GAME FINISHED</h2><p>Final ranking is available on the projector.</p>
          </div>}
          <div className="flex flex-wrap items-center justify-center gap-2 border-t border-rose-100 pt-3">
            {room?.phase==='lobby'&&<Button disabled={busy||room.playerCount===0} onClick={()=>void act('start')}>START GAME <ArrowRight className="h-4 w-4"/></Button>}
            {room?.phase==='question'&&<Button disabled={busy} onClick={()=>void act('reveal')}>REVEAL ANSWER</Button>}
            {room?.phase==='reveal'&&<Button disabled={busy} onClick={()=>void act('next')}>{room.index+1>=room.total?'FINISH GAME':'NEXT QUESTION'} <ArrowRight className="h-4 w-4"/></Button>}
            {(room?.phase==='question'||room?.phase==='reveal')&&<Button variant="light" disabled={busy} onClick={()=>{if(confirm('End this room now?'))void act('finish')}}>END EARLY</Button>}
            {session&&<Button variant="light" onClick={()=>window.open('/live/screen/'+session.code,'_blank','noopener,noreferrer')}><Monitor className="h-4 w-4"/> PROJECTOR</Button>}
            {room?.phase==='finished'&&<Button variant="light" onClick={newRoom}><RotateCcw className="h-4 w-4"/> NEW ROOM</Button>}
          </div>
        </Panel>
        <Panel className="flex min-h-0 flex-col gap-2 overflow-hidden">
          <h3 className="flex shrink-0 items-center gap-2 text-lg font-black"><Users className="h-5 w-5 text-rose-600"/> PLAYERS: {room?.playerCount??0}/50</h3>
          {room&&<Ranking room={room} limit={50}/>}
          <p className="shrink-0 text-xs text-slate-500">Scores update every ~2 seconds. Share only the QR or room code with players.</p>
          {(issue||message)&&<p role="alert" className="text-xs font-bold text-rose-700">{issue||message}</p>}
        </Panel>
      </div>}
  </LiveLayout>;
}

export function PlayerRoom({code}:{code:string}){
  const [name,setName]=useState(''),[session,setSession]=useState<PlayerSession|null>(null);
  const [busy,setBusy]=useState(false),[message,setMessage]=useState('');
  const [choiceIndex,setChoiceIndex]=useState(-1);
  const [selectedChoice,setSelectedChoice]=useState<Option['key']|null>(null);
  useEffect(()=>{try{const item=sessionStorage.getItem('live-quiz-player-'+code);if(item)setSession(JSON.parse(item) as PlayerSession)}catch{}},[code]);
  const {room,issue,refresh,remaining}=useRoom(code,session);
  useEffect(()=>{setChoiceIndex(-1);setSelectedChoice(null)},[room?.index]);
  const join=async()=>{
    setBusy(true);setMessage('');
    try{const p=await requestJson<PlayerSession>('/api/live/'+code+'/join',{method:'POST',body:JSON.stringify({name})});
      sessionStorage.setItem('live-quiz-player-'+code,JSON.stringify(p));setSession(p);await refresh();
    }catch(e){setMessage(e instanceof Error?e.message:'Unable to join.')}finally{setBusy(false)}
  };
  const answer=async(choice:Option['key'])=>{
    if(!session||!room||busy||choiceIndex===room.index)return;
    setBusy(true);setChoiceIndex(room.index);setSelectedChoice(choice);setMessage('');
    try{await requestJson('/api/live/'+code+'/answer',{method:'POST',headers:{Authorization:'Bearer '+session.token},
      body:JSON.stringify({playerId:session.id,choice,index:room.index})});await refresh();}
    catch(e){setChoiceIndex(-1);setSelectedChoice(null);setMessage(e instanceof Error?e.message:'Could not submit your answer.')}finally{setBusy(false)}
  };
  const locked=choiceIndex===room?.index||room?.me?.answered===true;
  return <LiveLayout title="PLAY LIVE" subtitle={'Room '+code+" | Vietnamese Women's Day"}>
    {!session?<div className="mx-auto flex h-full max-w-md flex-col justify-center">
      <Panel><Smartphone className="mb-2 h-9 w-9 text-rose-600"/>
        <h2 className="mb-1 text-2xl font-black">JOIN ROOM {code}</h2>
        <p className="mb-3 text-sm text-slate-600">Choose a nickname. 50 players max.</p>
        <input value={name} maxLength={30} onChange={e=>setName(e.target.value)}
          placeholder="Your display name" className="mb-3 w-full rounded-xl border-2 border-rose-200 p-3 text-base font-bold"
          onKeyDown={e=>{if(e.key==='Enter')void join()}}/>
        <Button disabled={busy||name.trim().length<2} onClick={()=>void join()}><Play className="h-4 w-4"/> JOIN GAME</Button>
        {(issue||message)&&<p role="alert" className="mt-2 text-xs font-bold text-rose-700">{issue||message}</p>}
      </Panel></div>:
      <div className="mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col gap-2">
        <div className="flex shrink-0 justify-between rounded-xl bg-white/90 px-3 py-2 text-xs sm:text-base">
          <strong className="truncate">{session.name}</strong><strong className="text-rose-700">Score: <ScoreTicker value={room?.me?.score??0} showBonus className="player-score" /></strong>
        </div>
        {room?.phase==='lobby'&&<Panel className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <Users className="live-waiting-icon h-12 w-12 text-rose-600"/><h2 className="text-2xl font-black">YOU'RE IN!</h2>
          <p>Waiting for the MC to start. {room.playerCount}/50 players joined.</p>
        </Panel>}
        {room?.phase==='question'&&<Panel className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <CurrentQuestion key={`${room.index}-${room.phase}`} room={room} remaining={remaining} showOptions onAnswer={answer} locked={locked} busy={busy} selectedChoice={selectedChoice}/>
          {locked&&<p className="mt-2 rounded-lg bg-emerald-50 p-2 text-center text-sm font-bold text-emerald-800"><CheckCircle2 className="mr-1 inline h-4 w-4"/> Answer locked - wait for the MC!</p>}
          {message&&<p role="alert" className="mt-1 text-center text-xs font-semibold text-rose-700">{message}</p>}
        </Panel>}
        {room?.phase==='reveal'&&<Panel className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
          <CurrentQuestion key={`${room.index}-${room.phase}`} room={room} remaining={0}/>
          <p className="text-center text-sm font-semibold text-slate-700">Your score: <ScoreTicker value={room.me?.score??0} showBonus /> | Waiting for the next question.</p>
        </Panel>}
        {room?.phase==='finished'&&<Panel className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden text-center">
          <Trophy className="mx-auto h-12 w-12 shrink-0 text-amber-500"/><h2 className="text-2xl font-black">GAME OVER!</h2>
          <p className="text-xl font-bold text-rose-700">You earned <ScoreTicker value={room.me?.score??0} animateOnMount /> points</p>
          <h3 className="text-sm font-black uppercase">Final Leaderboard</h3>
          <Ranking room={room}/>
        </Panel>}
        {!room&&<Panel className="flex flex-1 items-center justify-center">Connecting to room...</Panel>}
        {issue&&<p role="alert" className="shrink-0 text-center text-xs text-rose-700">{issue}</p>}
      </div>}
  </LiveLayout>;
}

function ProjectionCelebration({code}:{code:string}){
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    confetti({particleCount:55,spread:65,startVelocity:25,origin:{x:.2,y:.55},zIndex:60});
    confetti({particleCount:55,spread:65,startVelocity:25,origin:{x:.8,y:.55},zIndex:60});
  },[code]);
  return <div className="projection-finish-sparkle" aria-hidden="true" />;
}

export function Projection({code}:{code:string}){
  const [origin,setOrigin]=useState('');
  useEffect(()=>setOrigin(window.location.origin),[]);
  const {room,issue,remaining}=useRoom(code);
  const joinUrl=origin+'/live/join/'+code;
  return <LiveLayout title={'ROOM '+code} subtitle="LIVE PROJECTOR | English Club">
    <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_minmax(180px,32%)] gap-2 sm:gap-4">
      <Panel className="flex min-h-0 flex-col gap-2 overflow-hidden">
        {room?.phase==='lobby'&&<div className="flex flex-1 flex-col items-center justify-center gap-2">
          {origin&&<QR url={joinUrl}/>}
          <h2 className="text-center text-xl font-black sm:text-3xl">SCAN TO JOIN</h2>
          <p className="text-center text-sm">ROOM CODE: <strong className="text-2xl tracking-widest text-rose-700">{code}</strong></p>
          <p>{room.playerCount}/50 players ready</p>
        </div>}
        {(room?.phase==='question'||room?.phase==='reveal')&&<CurrentQuestion key={`${room.index}-${room.phase}`} room={room} remaining={remaining}/>}
        {room?.phase==='question'&&<ResponseProgress room={room} compact/>}
        {room?.phase==='finished'&&<div className="projection-finish flex flex-1 flex-col items-center justify-center text-center">
          <ProjectionCelebration code={code}/>
          <Medal className="h-16 w-16 text-amber-500"/><h2 className="text-2xl font-black sm:text-5xl">CONGRATULATIONS!</h2>
          <p className="mt-2 text-lg text-rose-700">Happy Vietnamese Women's Day!</p>
          {room.leaderboard[0]&&<h3 className="mt-6 text-2xl font-black"> {room.leaderboard[0].name}</h3>}
        </div>}
        {!room&&<p className="text-center text-slate-600">Connecting...</p>}
        {issue&&<p className="text-xs text-rose-700">{issue}</p>}
      </Panel>
      <Panel className="flex min-h-0 flex-col gap-2 overflow-hidden">
        <div className="flex shrink-0 items-center justify-between gap-1"><h3 className="text-sm font-black sm:text-xl"><Trophy className="mr-1 inline h-5 w-5 text-amber-600"/> TOP 10</h3><span className="text-xs font-bold text-rose-700">{room?.playerCount??0}/50</span></div>
        {room&&<Ranking room={room}/>}
        {origin&&room?.phase!=='finished'&&<div className="flex shrink-0 flex-col items-center gap-1 border-t border-rose-200 pt-2"><QRCodeSVG value={joinUrl} size={80}/><strong className="text-sm tracking-widest">{code}</strong></div>}
        <p className="text-center text-[10px] text-slate-400">Leaderboard refreshes automatically</p>
      </Panel>
    </div>
  </LiveLayout>;
}
