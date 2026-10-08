import { questionBank, buildQuizRound } from '@/data/questions';
import { db } from '@/lib/live-db';
import { isHostPasscode, makeToken, hashToken, json, errorResponse } from '@/lib/live-security';
import { randomBytes } from 'node:crypto';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function roomCode() {const bytes=randomBytes(6);return Array.from(bytes,b=>ALPHABET[b%ALPHABET.length]).join('');}
export async function POST(request:Request) {
  try {
    const body=await request.json().catch(()=>null);
    if(!isHostPasscode(body?.passcode))return json({error:'Invalid host passcode.'},403);
    const sql=db();
    const hostToken=makeToken();
    const questions=JSON.stringify(buildQuizRound(questionBank,10));
    for(let attempt=0;attempt<8;attempt++){
      const code=roomCode();
      try {
        await sql`INSERT INTO live_quiz_rooms(code,host_token_hash,questions)
          VALUES (${code},${hashToken(hostToken)},CAST(${questions} AS jsonb))`;
        return json({code,hostToken,joinPath:'/live/join/'+code,screenPath:'/live/screen/'+code},201);
      }catch(err){
        if((err as {code?:string}).code==='23505')continue;
        throw err;
      }
    }
    return json({error:'Could not allocate a room. Try again.'},503);
  } catch(err) {return errorResponse(err);}
}
