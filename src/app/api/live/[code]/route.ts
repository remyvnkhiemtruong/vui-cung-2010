import { db } from '@/lib/live-db';
import { isRoomCode, hashToken, hostTokenFrom, json, errorResponse } from '@/lib/live-security';
import { LIVE_SECONDS } from '@/lib/live-rules';
export const runtime='nodejs';
export const dynamic='force-dynamic';
type Context={params:Promise<{code:string}>};
export async function GET(request:Request,{params}:Context) {
  try {
    const {code}=await params;
    if(!isRoomCode(code))return json({error:'Invalid room code.'},400);
    const sql=db();
    const [room]=await sql`SELECT code,phase,question_index,questions,question_started_at,
      seconds_per_question,created_at FROM live_quiz_rooms WHERE code=${code}`;
    if(!room)return json({error:'Room not found.'},404);
    if(Date.now()-new Date(room.created_at).getTime()>24*60*60*1000)return json({error:'Room has expired.'},410);
    const players=await sql`SELECT display_name,score,streak,total_correct_ms,
      joined_at FROM live_quiz_players WHERE room_code=${code}
      ORDER BY score DESC,total_correct_ms ASC,joined_at ASC LIMIT 50`;
    const phase=String(room.phase);
    const round=room.questions as Array<Record<string,unknown>>;
    const index=Number(room.question_index);
    const raw=index>=0?round[index]:undefined;
    // Never transmit correct answers before host reveals them.
    const question=raw?{
      id:raw.id, question:raw.question, category:raw.category,
      type:raw.type, image:raw.image??null, options:raw.options,
      ...(phase==='reveal'||phase==='finished' ? {
        correctAnswer:raw.correctAnswer, explanation:raw.explanation,
        sourceUrl:raw.sourceUrl
      }: {})
    }:null;
    const seconds=Number(room.seconds_per_question||LIVE_SECONDS);
    const start=room.question_started_at ? new Date(room.question_started_at).getTime() : 0;
    const remainingMs=phase==='question' ? Math.max(0,Math.floor(start+seconds*1000-Date.now())) : 0;
    let me:null|{displayName:string;score:number;answered:boolean}=null;
    const token=hostTokenFrom(request), id=request.headers.get('x-live-player-id');
    if(token && id && /^[0-9a-f-]{36}$/i.test(id)){
      const [player]=await sql`SELECT p.display_name,p.score,
         EXISTS(SELECT 1 FROM live_quiz_answers a WHERE a.room_code=p.room_code
           AND a.player_id=p.id AND a.question_index=${index}) as answered
         FROM live_quiz_players p WHERE p.id=CAST(${id} AS uuid)
           AND p.room_code=${code} AND p.token_hash=${hashToken(token)}`;
      if(player) me={displayName:String(player.display_name),score:Number(player.score),answered:Boolean(player.answered)};
    }
    const leaderboard=players.map((p,i)=>({rank:i+1,name:p.display_name,
      score:Number(p.score),streak:Number(p.streak)}));
    return json({code,phase,index,total:round.length,question,seconds,
      remainingMs,serverTime:Date.now(),playerCount:players.length,
      maxPlayers:50,leaderboard,me});
  }catch(err){return errorResponse(err);}
}
