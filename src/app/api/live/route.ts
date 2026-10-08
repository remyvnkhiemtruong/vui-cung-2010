import { questionBank, buildQuizRound } from '@/data/questions';
import { db } from '@/lib/live-db';
import { makeToken, hashToken, json, errorResponse } from '@/lib/live-security';
import { randomBytes } from 'node:crypto';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function roomCode() {const bytes=randomBytes(6);return Array.from(bytes,b=>ALPHABET[b%ALPHABET.length]).join('');}
export async function POST(request:Request) {
  try {
    // One click creates a room. No host password is required.
    // The capability token remains private and authorizes only this host's controls.
    const sql=db();
    const forwarded=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const clientSignature=hashToken(forwarded || 'unknown-visitor');
    const hostToken=makeToken();
    const questions=JSON.stringify(buildQuizRound(questionBank,10));
    for(let attempt=0;attempt<8;attempt++){
      const code=roomCode();
      try {
        const [created]=await sql`SELECT live_quiz_create_room(
          ${code},${hashToken(hostToken)},CAST(${questions} AS jsonb),
          ${clientSignature}) AS status`;
        if(created?.status==='rate_limited')
          return json({error:'Too many rooms created recently. Please try again later.'},429);
        if(created?.status==='created')
          return json({code,hostToken,joinPath:'/live/join/'+code,screenPath:'/live/screen/'+code},201);
        return json({error:'Could not create the room.'},503);
      }catch(err){
        if((err as {code?:string}).code==='23505')continue;
        throw err;
      }
    }
    return json({error:'Could not allocate a room. Try again.'},503);
  } catch(err) {return errorResponse(err);}
}
