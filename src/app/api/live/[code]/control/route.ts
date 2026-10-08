import { db } from '@/lib/live-db';
import { hashToken,hostTokenFrom,isRoomCode,json,errorResponse } from '@/lib/live-security';
export const runtime='nodejs';export const dynamic='force-dynamic';
type Context={params:Promise<{code:string}>};
export async function POST(request:Request,{params}:Context) {
  try{
    const {code}=await params;
    if(!isRoomCode(code))return json({error:'Invalid room code.'},400);
    const token=hostTokenFrom(request);
    if(!token)return json({error:'Host token is missing.'},401);
    const body=await request.json().catch(()=>null),action=body?.action;
    if(!['start','reveal','next','finish'].includes(action))return json({error:'Invalid host action.'},400);
    const sql=db();
    const [row]=await sql`SELECT live_quiz_control(${code},${hashToken(token)},${action}) AS outcome`;
    const status=String(row?.outcome);
    if(status==='ok')return json({ok:true});
    if(status==='unauthorized')return json({error:'Host authorization failed.'},403);
    return json({error:status==='not_found'?'Room not found.':'Action is not allowed in the current phase.'},409);
  }catch(err){return errorResponse(err);}
}
