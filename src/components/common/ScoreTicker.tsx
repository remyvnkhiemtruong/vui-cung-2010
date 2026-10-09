'use client';

import {useEffect,useRef,useState} from 'react';

interface ScoreTickerProps {
  value:number;
  className?:string;
  showBonus?:boolean;
  animateOnMount?:boolean;
}

/**
 * Visual-only score motion. Server/game engine totals stay authoritative.
 * Changes are announced by the surrounding score label, not rapid frames.
 */
export default function ScoreTicker({value,className='',showBonus=false,animateOnMount=false}:ScoreTickerProps){
  const [display,setDisplay]=useState(value);
  const [bonus,setBonus]=useState(0);
  const previous=useRef(value);
  const mounted=useRef(false);
  const animation=useRef<number|null>(null);
  const lastFrame=useRef(value);

  useEffect(()=>{
    const isFirst=!mounted.current;
    mounted.current=true;
    const prior=previous.current;
    previous.current=value;
    if(animation.current!==null)cancelAnimationFrame(animation.current);
    const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from=isFirst && animateOnMount ? 0 : lastFrame.current;
    const delta=!isFirst?value-prior:0;

    if(!Number.isFinite(value)||reduceMotion||value===from){
      lastFrame.current=value;
      setDisplay(value);
      setBonus(0);
      return;
    }
    if(delta>0&&showBonus)setBonus(delta);
    else setBonus(0);
    const duration=isFirst?900:Math.min(800,450+Math.abs(value-from)/15);
    const started=performance.now();
    const tick=(now:number)=>{
      const x=Math.min(1,Math.max(0,(now-started)/duration));
      const eased=1-Math.pow(1-x,3);
      const shown=Math.round(from+(value-from)*eased);
      lastFrame.current=shown;
      setDisplay(shown);
      if(x<1)animation.current=requestAnimationFrame(tick);
      else {animation.current=null;lastFrame.current=value;}
    };
    animation.current=requestAnimationFrame(tick);
    const clear=window.setTimeout(()=>setBonus(0),1250);
    return ()=>{if(animation.current!==null)cancelAnimationFrame(animation.current);window.clearTimeout(clear);};
  },[value,showBonus,animateOnMount]);

  return <span className={`score-ticker ${className}`} aria-label={`${value.toLocaleString('en-US')} points`}>
    <span aria-hidden="true" className="score-ticker-digits">{display.toLocaleString('en-US')}</span>
    {bonus>0&&<span aria-hidden="true" key={`${value}-${bonus}`} className="score-ticker-bonus">+{bonus.toLocaleString('en-US')}</span>}
  </span>;
}
