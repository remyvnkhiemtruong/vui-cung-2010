import { db } from '@/lib/live-db';
import { hashToken, isRoomCode, json, errorResponse, makeToken, newPlayerId, normalizeName } from '@/lib/live-security';
export const runtime='nodejs';export const dynamic='force-dynamic';
type Context={params:Promise<{code:string}>};
export async function POST(request:Request,{params}:Context){
  try{
    const {code}=await params;
    if(!isRoomCode(code))return json({error:'Invalid room code.'},400);
    const body=await request.json().catch(()=>null),name=normalizeName(body?.name);
    if(!name)return json({error:'Name must contain 2–30 characters.'},400);
    const id=newPlayerId(),token=makeToken(),sql=db();
    const [result]=await sql`SELECT live_quiz_join(${code},CAST(${id} AS uuid),${name},${hashToken(token)}) AS status`;
    const status=String(result.status);
    if(status==='joined')return json({id,token,name,code},201);
    const messages:Record<string,string>={
      not_found:'Room not found.',expired:'This room has expired.',
      closed:'The game has already started.',full:'The room has reached 50 players.',
      duplicate_name:'This nickname is already taken.'
    };
    return json({error:messages[status]||'Cannot join this room.'},status==='not_found'?404:409);
  }catch(err){return errorResponse(err);}
}
