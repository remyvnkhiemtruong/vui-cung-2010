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

test('Mrs question author and balanced IT developer credits on all game screens',()=>{
  const credits=fs.readFileSync('src/components/common/AuthorCredits.tsx','utf8');
  const metadata=fs.readFileSync('src/app/layout.tsx','utf8');
  const home=fs.readFileSync('src/components/game/HomeScreen.tsx','utf8');
  const page=fs.readFileSync('src/app/page.tsx','utf8');
  const live=fs.readFileSync('src/components/live/LiveClient.tsx','utf8');
  const css=fs.readFileSync('src/app/globals.css','utf8');
  assert(credits.includes('Mrs. Phan Thanh Thuy'));
  assert(!credits.includes('Ms. Phan Thanh Thuy'));
  assert(credits.includes('Truong Minh Khiem'));
  assert(credits.includes('Faculty of Information Technology'));
  assert(credits.includes('Informatics Teacher Education'));
  const completeRole='Student in Informatics Teacher Education and Information Technology, Faculty of Information Technology, Ho Chi Minh City University of Education';
  assert(credits.includes(completeRole),'Developer affiliation must not be abbreviated');
  assert(!credits.includes('IT Student')&&!credits.includes('HCMUE</span>'),'No abbreviations in the displayed role');
  assert(css.includes('white-space:normal;overflow-wrap:anywhere'),'Long role must wrap instead of clipping');
  assert(!css.includes('text-overflow:ellipsis;white-space:nowrap'),'Do not cut off full credits');
  assert(css.includes('@media(max-width:850px)'),'Compact narrow-screen footer should remain balanced');
  assert(credits.includes('English Teacher, Vo Van Kiet High School'));
  assert([...credits].every(c=>c.charCodeAt(0)<128),'Public credits should be unaccented ASCII');
  assert(metadata.includes('Mrs. Phan Thanh Thuy'));
  assert(credits.includes('QUESTION CONTENT')&&credits.includes('SYSTEM DEVELOPMENT'));
  assert(credits.includes('className="credit-ribbon"'));
  assert(!home.includes('<AuthorCredits'),'Do not interrupt the welcome card');
  assert(page.includes('<AuthorCredits />'));
  assert(live.includes('<AuthorCredits />'));
  assert(css.includes('grid-template-columns:repeat(2,minmax(0,1fr))'));
  assert(css.includes('.credit-ribbon-item--questions'));
  assert(css.includes('.credit-ribbon-item--system'));
  assert(css.includes('background:var(--credit-bg)'));
  assert(css.includes('.credit-ribbon-role{display:none}'));
});
test('music selector provides three original tracks and independent control',()=>{
  const engine=fs.readFileSync('src/utils/music.ts','utf8');
  const picker=fs.readFileSync('src/components/common/MusicPicker.tsx','utf8');
  const header=fs.readFileSync('src/components/common/Header.tsx','utf8');
  const home=fs.readFileSync('src/components/game/HomeScreen.tsx','utf8');
  const live=fs.readFileSync('src/components/live/LiveClient.tsx','utf8');
  assert(engine.includes("id: 'gentle-bloom'"));
  assert(engine.includes("id: 'heartfelt-thanks'"));
  assert(engine.includes("id: 'joyful-october'"));
  assert(engine.includes('window')&&engine.includes('AudioContext'));
  assert(!engine.includes('http://')&&!engine.includes('https://'),'Music must not rely on external recordings');
  assert(engine.includes('oct20_music_track_v1'));
  assert(engine.includes('oct20_music_volume_v1'));
  assert(engine.includes('storedVolume===null?NaN'),'Unconfigured volume should not be silently zero');
  assert(engine.includes('this.snapshot.playing?volume*0.55:0'));
  assert(!engine.includes('soundManager'),'Music must be independent of quiz sound effects');
  assert(picker.includes('createPortal('),'Music menu should escape overflowing full-screen cards');
  assert(picker.includes('backgroundMusic.toggle()'));
  assert(picker.includes('backgroundMusic.select(item.id)'));
  assert(picker.includes('backgroundMusic.setVolume('));
  assert(picker.includes('Play background music'));
  assert(header.includes('<MusicPicker />')&&home.includes('<MusicPicker />')&&live.includes('<MusicPicker />'));
  const css=fs.readFileSync('src/app/globals.css','utf8');
  assert(css.includes('.music-picker-panel'));
  assert(css.includes('.music-picker-backdrop'));
});

test('visible game content uses English and unaccented Romanized names',()=>{
  const fs = require('node:fs');
  const questionFile=fs.readFileSync('src/data/questions.ts','utf8');
  const visualFiles=[
    'src/components/game/HomeScreen.tsx',
    'src/components/game/QuestionCard.tsx',
    'src/components/game/GameHUD.tsx',
    'src/components/game/ResultScreen.tsx',
    'src/components/game/QuestionReviewList.tsx',
    'src/components/game/QuestionMedia.tsx',
    'src/components/live/LiveClient.tsx',
    'src/components/common/MusicPicker.tsx',
    'src/components/common/AuthorCredits.tsx',
    'src/app/layout.tsx',
    'src/app/api/live/[code]/join/route.ts',
  ];
  for(const file of visualFiles){
    const content=fs.readFileSync(file,'utf8');
    assert([...content].every(char=>char.codePointAt(0)<128),
      'Expected unaccented English UI copy in '+file);
  }
  assert([...questionFile].every(char=>char.codePointAt(0)<128));
  assert(questionFile.includes('Dong Loc Junction'));
  assert(questionFile.includes('Ly Chieu Hoang'));
  assert(questionFile.includes("Which final quality completes the tribute?"));
  assert(!questionFile.includes('Doi quan toc dai'));
  assert(!questionFile.includes('Bat khuat'));
  assert(questionFile.includes('Resourceful/Capable'));
  assert(!fs.readFileSync('src/components/common/MusicPicker.tsx','utf8').includes('Nhac nen'));
});
test('stage transitions are subtle, responsive and reduced-motion accessible',()=>{
  const css=fs.readFileSync('src/app/globals.css','utf8');
  const quiz=fs.readFileSync('src/components/game/QuestionCard.tsx','utf8');
  const player=fs.readFileSync('src/app/page.tsx','utf8');
  const live=fs.readFileSync('src/components/live/LiveClient.tsx','utf8');
  const timer=fs.readFileSync('src/components/game/CircularTimer.tsx','utf8');
  const hud=fs.readFileSync('src/components/game/GameHUD.tsx','utf8');
  const home=fs.readFileSync('src/components/game/HomeScreen.tsx','utf8');
  for(const effect of ['stageFloatIn','stageOptionReveal','stageScoreRise','stageTimerAlert',
    'stageReadyGlow','live-rank-podium','live-question-stage','home-start-button']){
    assert(css.includes(effect),'Motion style missing: '+effect);
  }
  assert(css.includes('@media (prefers-reduced-motion:reduce)'));
  assert(css.includes('animation:none !important'));
  assert(player.includes('key={currentQuestion.id}'),'New solo questions must animate once on entrance');
  assert(quiz.includes('option-stage'));
  assert(live.includes('live-option-btn')&&live.includes('live-response-progress'));
  assert(live.includes('live-timer-pill'));
  assert(live.includes('live-rank-row'));
  assert(live.includes('key={`${room.index}-${room.phase}`}'),'Live questions remount only at phase transitions');
  assert(hud.includes('<ScoreTicker value={score} showBonus'),'Score ticker must track actual computed score');
  assert(timer.includes('time-ring'));
  assert(home.includes('home-hero-reveal'));
});

test('Showtime V2 keeps scoring authoritative and new question handoff non-repeatable',()=>{
 const read=p=>fs.readFileSync(p,'utf8');
 const card=read('src/components/game/QuestionCard.tsx');
 const hud=read('src/components/game/GameHUD.tsx');
 const live=read('src/components/live/LiveClient.tsx');
 const ticker=read('src/components/common/ScoreTicker.tsx');
 const result=read('src/components/game/ResultScreen.tsx');
 const css=read('src/app/globals.css');
 const engine=read('src/utils/gameEngine.ts');
 const sql=read('db/live-quiz.sql');
 assert(card.includes("nextTimer.current=setTimeout(onNext,240)"));
 assert(card.includes("if(leavingRef.current||!isAnswered)return"));
 assert(card.includes("prefers-reduced-motion: reduce"));
 assert(card.includes("onClick={advance}"));
 assert(card.includes("disabled={leaving}"));
 assert(card.includes('answer-celebrate')&&card.includes('answer-incorrect'));
 assert(card.includes('correct-sparkles')&&card.includes('answer-points'));
 assert(hud.includes('<ScoreTicker value={score} showBonus'));
 assert(hud.includes("streak>=3?'COMBO'"));
 assert(hud.includes('game-progress-fill'));
 assert(ticker.includes('requestAnimationFrame')&&ticker.includes('cancelAnimationFrame'));
 assert(ticker.includes('prefers-reduced-motion: reduce'));
 assert(ticker.includes('aria-label'));
 assert(ticker.includes('value-prior'),'Delta is computed from real score, not arbitrary points');
 assert(live.includes('<ScoreTicker value={p.score}'));
 assert(live.includes('ScoreTicker value={room?.me?.score??0}'));
 assert(live.includes('live-option-selected')&&live.includes('live-option-correct'));
 assert(live.includes('setSelectedChoice(choice)'));
 assert(live.includes('setSelectedChoice(null)'));
 assert(live.includes('room.phase===\'reveal\''),'Correctness only becomes visible after MC reveal');
 assert(live.includes('ProjectionCelebration'));
 assert(live.includes('prefers-reduced-motion: reduce'));
 assert(result.includes('results-accuracy-fill'));
 assert(result.includes('ScoreTicker value={stats.score} animateOnMount'));
 assert(css.includes('@keyframes showtimeCounterBonus'));
 assert(css.includes('@keyframes showtimeQuestionExit'));
 assert(css.includes('@keyframes showtimeAnswerCorrect'));
 assert(css.includes('@keyframes showtimeCorrectChoice'));
 assert(css.includes('.live-option-btn.live-option-dim'));
 assert(css.includes('.score-ticker-bonus'));
 assert(css.includes('pointer-events:none'));
 assert(engine.includes('QUESTION_TIME_LIMIT = 30'));
 assert(sql.includes('seconds_per_question integer NOT NULL DEFAULT 30'));
});
