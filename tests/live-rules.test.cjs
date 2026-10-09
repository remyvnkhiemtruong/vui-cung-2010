const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');

const source=fs.readFileSync('src/lib/live-rules.ts','utf8');
const transpiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const moduleObj={exports:{}};
new Function('module','exports',transpiled)(moduleObj,moduleObj.exports);
const {LIVE_MAX_PLAYERS,LIVE_SECONDS,LIVE_ROUND_SIZE,liveScore,legalTransition}=moduleObj.exports;

test('50-player capacity, 12 questions, 30-second timer',()=>{
  assert.equal(LIVE_MAX_PLAYERS,50);
  assert.equal(LIVE_ROUND_SIZE,12);
  assert.equal(LIVE_SECONDS,30);
});
test('score is bounded and favors quick answers',()=>{
  assert.deepEqual(liveScore(false,30000,30,8),{points:0,newStreak:0});
  assert.deepEqual(liveScore(true,30000,30,0),{points:150,newStreak:1});
  assert.deepEqual(liveScore(true,0,25,1),{points:100,newStreak:2});
  assert.deepEqual(liveScore(true,15000,30,2),{points:145,newStreak:3});
  assert.equal(liveScore(true,70000,30,3).points,170);
  assert.equal(liveScore(true,-200,30,0).points,100);
});
test('50 simulated players over 12 rounds',()=>{
  const players=Array.from({length:50},(_,i)=>({name:'Player '+(i+1),points:0,streak:0}));
  for(let question=0;question<LIVE_ROUND_SIZE;question++){
    for(let i=0;i<players.length;i++){
      const correct=(i+question)%4!==0;
      const time=Math.max(0,30000-i*180-question*125);
      const score=liveScore(correct,time,30,players[i].streak);
      players[i].points+=score.points;
      players[i].streak=score.newStreak;
    }
  }
  const ranked=[...players].sort((a,b)=>b.points-a.points||a.name.localeCompare(b.name));
  assert.equal(players.length,50);
  assert.equal(ranked.length,50);
  assert(ranked[0].points>=ranked[49].points);
  assert(players.every(p=>p.points>=0 && p.points<=2040));
});
test('phase transitions prohibit skipping the reveal',()=>{
  assert.equal(legalTransition('lobby','start',-1),'question');
  assert.equal(legalTransition('question','reveal',0),'reveal');
  assert.equal(legalTransition('reveal','next',0),'question');
  assert.equal(legalTransition('reveal','next',9),'question');
  assert.equal(legalTransition('reveal','next',10),'question');
  assert.equal(legalTransition('reveal','next',11),'finished');
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
  assert(ui.includes('live-quiz-host-teacher12-v1'));
  assert(!ui.includes("sessionStorage.getItem('live-quiz-host')"));
  assert(!ui.includes('Host passcode'));
  assert(migration.includes("IF n >= 8 THEN RETURN 'rate_limited'"));
  assert(migration.includes('pg_advisory_xact_lock'));
});

test('MC and projector see server-confirmed response progress before reveal',()=>{
  const state=fs.readFileSync('src/app/api/live/[code]/route.ts','utf8');
  const ui=fs.readFileSync('src/components/live/LiveClient.tsx','utf8');
  assert(state.includes('SELECT count(*)::int AS answered_count FROM live_quiz_answers'));
  assert(state.includes('room_code=${code} AND question_index=${index}'));
  assert(state.includes('answeredCount,maxPlayers:50'));
  assert(state.includes("phase==='question'||phase==='reveal'"));
  assert(ui.includes("room?.phase==='question'&&<ResponseProgress room={room}/>"));
  assert(ui.includes("room?.phase==='question'&&<ResponseProgress room={room} compact/>"));
  assert(ui.includes("ALL STUDENTS HAVE ANSWERED"));
  assert(ui.includes("only the MC can reveal the answer"));
});

test('room persists all 12 teacher questions and validates question 12',()=>{
  const create=fs.readFileSync('src/app/api/live/route.ts','utf8');
  const submit=fs.readFileSync('src/app/api/live/[code]/answer/route.ts','utf8');
  const state=fs.readFileSync('src/app/api/live/[code]/route.ts','utf8');
  assert(create.includes('buildContinuousQuiz(questionBank)'));
  assert(submit.includes('index<0||index>=12'));
  assert(state.includes('questions -> question_index AS active_question'));
  assert(state.includes('jsonb_array_length(questions) AS total'));
  assert(!state.includes('SELECT code,phase,question_index,questions,'));
});

test('database and solo default use 30 seconds',()=>{
 const schema=fs.readFileSync('db/live-quiz.sql','utf8');
 const engine=fs.readFileSync('src/utils/gameEngine.ts','utf8');
 assert(schema.includes('seconds_per_question integer NOT NULL DEFAULT 30'));
 assert(engine.includes('export const QUESTION_TIME_LIMIT = 30'));
});

test('both unaccented author credits render at bottom across game modes',()=>{
  const credits=fs.readFileSync('src/components/common/AuthorCredits.tsx','utf8');
  const home=fs.readFileSync('src/components/game/HomeScreen.tsx','utf8');
  const page=fs.readFileSync('src/app/page.tsx','utf8');
  const live=fs.readFileSync('src/components/live/LiveClient.tsx','utf8');
  const css=fs.readFileSync('src/app/globals.css','utf8');
  const layout=fs.readFileSync('src/app/layout.tsx','utf8');
  assert(credits.includes('Ms. Phan Thanh Thuy'));
  assert(credits.includes('English Teacher - Vo Van Kiet High School'));
  assert(credits.includes('Truong Minh Khiem'));
  assert(credits.includes('Cohort 52 Student - Ho Chi Minh City University of Education'));
  assert(/^[\x00-\x7F]*$/.test(credits), 'Author credits must be entirely unaccented ASCII');
  assert(credits.includes('QUESTION CONTENT')&&credits.includes('SYSTEM DEVELOPMENT'));
  assert(!home.includes('<AuthorCredits'), 'No credit cards in the middle of HomeScreen');
  assert(!home.includes('Phan Thanh Thuy'), 'No author name beneath the home title');
  assert(page.includes("<AuthorCredits variant={screen === 'start' ? 'feature' : 'compact'} />"));
  assert(page.includes('className="app-footer app-credit-footer"'));
  assert(!page.includes("screen !== 'start' &&"), 'Footer must appear on the start screen too');
  assert(live.includes('className="live-credit-footer"')&&live.includes('<AuthorCredits variant="compact" />'));
  assert(css.includes('.app-credit-footer .author-credits--feature'));
  assert(layout.includes('Phan Thanh Thuy')&&layout.includes('Truong Minh Khiem'));
  assert(!layout.includes('Thùy')&&!layout.includes('Trương'));
});
