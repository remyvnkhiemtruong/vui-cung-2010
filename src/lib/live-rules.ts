/** Server-compatible, framework-independent rules. */
export const LIVE_MAX_PLAYERS = 50;
export const LIVE_SECONDS = 25;
export const LIVE_ROUND_SIZE = 10;
export type Phase = 'lobby'|'question'|'reveal'|'finished';
export type Choice = 'A'|'B'|'C'|'D';
export function liveScore(correct:boolean,remainingMs:number,seconds=LIVE_SECONDS,streak=0) {
  if (!correct) return { points:0, newStreak:0 };
  const ms=Math.max(0,Math.min(remainingMs, seconds*1000));
  const newStreak=streak+1;
  return {points:100+Math.round((ms/(seconds*1000))*50)+(newStreak>=3?20:0),newStreak};
}
export function legalTransition(phase:Phase,action:string,index:number,total=LIVE_ROUND_SIZE) {
  if(action==='start')return phase==='lobby'?'question':null;
  if(action==='reveal')return phase==='question'?'reveal':null;
  if(action==='next')return phase==='reveal'?(index+1>=total?'finished':'question'):null;
  if(action==='finish')return phase==='question'||phase==='reveal'?'finished':null;
  return null;
}
