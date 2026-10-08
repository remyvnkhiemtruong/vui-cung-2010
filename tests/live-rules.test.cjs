const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');

const source=fs.readFileSync('src/lib/live-rules.ts','utf8');
const transpiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const moduleObj={exports:{}};
new Function('module','exports',transpiled)(moduleObj,moduleObj.exports);
const {LIVE_MAX_PLAYERS,LIVE_SECONDS,LIVE_ROUND_SIZE,liveScore,legalTransition}=moduleObj.exports;

test('50-player capacity, 10 questions, 25-second timer',()=>{
  assert.equal(LIVE_MAX_PLAYERS,50);
  assert.equal(LIVE_ROUND_SIZE,10);
  assert.equal(LIVE_SECONDS,25);
});
test('score is bounded and favors quick answers',()=>{
  assert.deepEqual(liveScore(false,25000,25,8),{points:0,newStreak:0});
  assert.deepEqual(liveScore(true,25000,25,0),{points:150,newStreak:1});
  assert.deepEqual(liveScore(true,0,25,1),{points:100,newStreak:2});
  assert.deepEqual(liveScore(true,12500,25,2),{points:145,newStreak:3});
  assert.equal(liveScore(true,60000,25,3).points,170);
  assert.equal(liveScore(true,-200,25,0).points,100);
});
test('50 simulated players over ten rounds',()=>{
  const players=Array.from({length:50},(_,i)=>({name:'Player '+(i+1),points:0,streak:0}));
  for(let question=0;question<10;question++){
    for(let i=0;i<players.length;i++){
      const correct=(i+question)%4!==0;
      const time=Math.max(0,25000-i*180-question*125);
      const score=liveScore(correct,time,25,players[i].streak);
      players[i].points+=score.points;
      players[i].streak=score.newStreak;
    }
  }
  const ranked=[...players].sort((a,b)=>b.points-a.points||a.name.localeCompare(b.name));
  assert.equal(players.length,50);
  assert.equal(ranked.length,50);
  assert(ranked[0].points>=ranked[49].points);
  assert(players.every(p=>p.points>=0 && p.points<=1700));
});
test('phase transitions prohibit skipping the reveal',()=>{
  assert.equal(legalTransition('lobby','start',-1),'question');
  assert.equal(legalTransition('question','reveal',0),'reveal');
  assert.equal(legalTransition('reveal','next',0),'question');
  assert.equal(legalTransition('reveal','next',9),'finished');
  assert.equal(legalTransition('question','finish',0),'finished');
  assert.equal(legalTransition('lobby','next',-1),null);
  assert.equal(legalTransition('question','next',0),null);
  assert.equal(legalTransition('finished','start',9),null);
});
test('DB migration enforces atomic join and idempotent answers',()=>{
  const sql=fs.readFileSync('db/live-quiz.sql','utf8');
  assert(sql.includes('FOR UPDATE'));
  assert(sql.includes('IF n >= 50'));
  assert(sql.includes('PRIMARY KEY (room_code, player_id, question_index)'));
  assert(sql.includes('CREATE OR REPLACE FUNCTION live_quiz_submit'));
  assert(sql.includes('p_arrived_at'));
});
test('public API hides active question points and solutions',()=>{
  const file=fs.readFileSync('src/app/api/live/[code]/route.ts','utf8');
  assert(file.includes("phase==='reveal'||phase==='finished'"));
  assert(file.includes('p.score-COALESCE(a.earned_points,0)'));
  assert(file.includes("phase==='question'?Number(player.current_points||0):0"));
});

test('one-click create has no MC passcode and uses throttled DB function',()=>{
  const handler=fs.readFileSync('src/app/api/live/route.ts','utf8');
  const ui=fs.readFileSync('src/components/live/LiveClient.tsx','utf8');
  const migration=fs.readFileSync('db/live-quiz.sql','utf8');
  assert(!handler.includes('isHostPasscode'));
  assert(!handler.includes('body?.passcode'));
  assert(handler.includes('live_quiz_create_room'));
  assert(ui.includes('void createRoom()'));
  assert(!ui.includes('Host passcode'));
  assert(migration.includes("IF n >= 8 THEN RETURN 'rate_limited'"));
  assert(migration.includes('pg_advisory_xact_lock'));
});
