import { db } from '@/lib/live-db';
import { hashToken, isRoomCode, json, errorResponse,hostTokenFrom } from '@/lib/live-security';
export const runtime='nodejs';export const dynamic='force-dynamic';
type Context={params:Promise<{code:string}>};
export async function POST(request:Request,{params}:Context){
  // Capture server arrival time BEFORE waiting for the DB row lock.
  const arrivedAt=new Date().toISOString();
  try{
    const {code}=await params;
    if(!isRoomCode(code))return json({error:'Invalid room code.'},400);
    const token=hostTokenFrom(request);
    if(!token)return json({error:'Player token is missing.'},401);
    const body=await request.json().catch(()=>null);
    const id=body?.playerId,choice=body?.choice,index=body?.index;
    if(typeof id!=='string'||!/^[0-9a-f-]{36}$/i.test(id)||
      !['A','B','C','D'].includes(choice)||!Number.isInteger(index)||
      index<0||index>=10)return json({error:'Invalid answer submission.'},400);
    const sql=db();
    const [row]=await sql`SELECT live_quiz_submit(${code},CAST(${id} AS uuid),
      ${hashToken(token)},${index},${choice},CAST(${arrivedAt} AS timestamptz)) AS outcome`;
    const outcome=row?.outcome as {status?:string}|undefined;
    if(outcome?.status==='accepted')return json({status:'accepted'});
    if(outcome?.status==='unauthorized')return json({error:'Player session is invalid.'},401);
    if(outcome?.status==='not_found')return json({error:'Room not found.'},404);
    return json({error:outcome?.status==='already_answered'?'You have already answered this question.':
      outcome?.status==='expired'?'Time is up.':'This question is no longer active.'},409);
  }catch(err){return errorResponse(err);}
}
