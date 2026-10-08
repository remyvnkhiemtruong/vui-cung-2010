/**
 * Fail build if October 20 trivia is malformed or any of 200 questions repeat.
 * The live game uses one randomized 200-question deck; the solo game tracks
 * consumed IDs across 10-question sessions.
 */
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';

const root=process.cwd();
function assert(ok,message){if(!ok)throw new Error('October 20 question bank: '+message);}
function transpile(source){
  return ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
}
function run(source,resolve){
  const module={exports:{}};
  runInNewContext(transpile(source),{module,exports:module.exports,require:resolve});
  return module.exports;
}
const modules={};
const variants=[
  ['extra-history','extraHistory',24],
  ['extra-women','extraWomen',38],
  ['extra-activities','extraActivities',72],
  ['extra-pictures','extraPictures',12],
];
for(const [basename,exportName,expected] of variants){
  const code=readFileSync(join(root,'src/data/'+basename+'.ts'),'utf8');
  const exported=run(code,()=>{throw new Error('Unexpected runtime import in '+basename)});
  assert(Array.isArray(exported[exportName]),'Missing '+exportName);
  assert(exported[exportName].length===expected,basename+' must contain '+expected+' questions');
  modules['./'+basename]=exported;
}
const code=readFileSync(join(root,'src/data/questions.ts'),'utf8');
const exported=run(code,name=>{
  assert(name in modules,'Unexpected import '+name);
  return modules[name];
});
const {questionBank,buildQuizRound,buildContinuousQuiz,buildUnseenSoloRound}=exported;
const categories={
  'October 20: Origins':36,
  'October 20: Activities':90,
  'Vietnamese Women':50,
  'October 20: Picture Quiz':24,
};
assert(questionBank.length===200,'Expected exactly 200 questions, got '+questionBank.length);
const ids=new Set(),prompts=new Set(),counts=Object.fromEntries(Object.keys(categories).map(k=>[k,0]));
let illustrated=0;
for(const q of questionBank){
  assert(q.id&&!ids.has(String(q.id)),'Duplicate question ID '+q.id);
  ids.add(String(q.id));
  assert(q.question&&typeof q.question==='string'&&q.question.length<=145,'Invalid projector prompt '+q.id);
  const normalized=q.question.toLowerCase().replace(/[^a-z0-9]/g,'');
  assert(!prompts.has(normalized),'Duplicate question meaning/wording '+q.id);
  prompts.add(normalized);
  assert(q.category in categories,'Unrecognized topic '+q.id);
  counts[q.category]++;
  assert(['warm-up','standard','challenge'].includes(q.difficulty),'Invalid difficulty '+q.id);
  assert(q.options.length===4,'Four options required '+q.id);
  const keys=q.options.map(x=>x.key),answers=q.options.map(x=>x.text.trim().toLowerCase());
  assert(new Set(keys).size===4 && new Set(answers).size===4,'Duplicate option '+q.id);
  assert(keys.includes(q.correctAnswer),'Correct option missing '+q.id);
  assert(q.explanation&&q.explanation.trim(),'Missing explanation '+q.id);
  assert(!/\b(?:grammar|prepositions?|idioms?|synonym|Marie Curie|Malala Yousafzai)\b/i.test(q.question),'Off-topic prompt '+q.id);
  if(q.category==='October 20: Picture Quiz'){
    illustrated++;
    assert(q.image?.startsWith('/questions/october20/')&&q.image.endsWith('.svg'),'Missing local illustration '+q.id);
    const path=join(root,'public',q.image.slice(1));
    assert(existsSync(path),'Missing image file '+path);
    const svg=readFileSync(path,'utf8');
    assert(svg.includes('<svg')&&svg.includes('<title'),'Invalid image '+q.id);
  }else assert(!q.image,'Unexpected picture on non-picture question '+q.id);
}
assert(JSON.stringify(counts)===JSON.stringify(categories),'Category counts: '+JSON.stringify(counts));
assert(illustrated===24,'Expected 24 illustrated questions');
const expectedMix={'October 20: Origins':3,'October 20: Activities':3,'Vietnamese Women':2,'October 20: Picture Quiz':2};
const expectedLevels={'warm-up':5,standard:4,challenge:1};
function validateAnswerKey(q){
  const original=questionBank.find(z=>z.id===q.id);
  assert(original,'Unknown id in shuffled quiz: '+q.id);
  const a=original.options.find(z=>z.key===original.correctAnswer)?.text;
  const b=q.options.find(z=>z.key===q.correctAnswer)?.text;
  assert(a===b,'Shuffling changed the correct answer: '+q.id);
}
for(let i=0;i<100;i++){
  const round=buildQuizRound(questionBank,10);
  const byCategory={},byDifficulty={};
  for(const q of round){byCategory[q.category]=(byCategory[q.category]||0)+1;byDifficulty[q.difficulty]=(byDifficulty[q.difficulty]||0)+1;validateAnswerKey(q);}
  assert(round.length===10 && new Set(round.map(x=>x.id)).size===10,'Duplicate in solo round');
  assert(Object.entries(expectedMix).every(([k,v])=>byCategory[k]===v),'Solo category mix wrong');
  assert(Object.entries(expectedLevels).every(([k,v])=>byDifficulty[k]===v),'Solo level mix wrong');
  assert(round[9].difficulty==='challenge','Solo final question must be a challenge');
}
// Multiple entire rooms: 200 distinct IDs, consistent shuffled answer keys.
let distinctFirst= new Set();
for(let i=0;i<40;i++){
  const room=buildContinuousQuiz(questionBank);
  assert(room.length===200,'Live room must have 200 questions');
  assert(new Set(room.map(q=>q.id)).size===200,'Live room repeated a question');
  room.forEach(validateAnswerKey);
  distinctFirst.add(String(room[0].id));
}
assert(distinctFirst.size>1,'Live room must randomize question order');
// Solo: twenty successive rounds must exhaust the bank before any repeat.
let seen=[],allIds=new Set();
for(let i=0;i<20;i++){
  const result=buildUnseenSoloRound(questionBank,seen,10);
  assert(result.questions.length===10,'Solo round length incorrect at cycle '+i);
  for(const q of result.questions){assert(!allIds.has(q.id),'Solo repeated a question before exhaustion '+q.id);allIds.add(q.id);}
  seen=result.seenIds;
}
assert(allIds.size===200,'Solo cycle did not cover 200 distinct questions');
const next=buildUnseenSoloRound(questionBank,seen,10);
assert(next.cycleComplete===true && next.questions.length===10,'Solo must restart a new cycle after exhaustion');
console.log('200 October 20 questions validated (36 history, 90 activities, 50 women, 24 picture).');
console.log('100 solo rounds, 40 full 200-question live decks and one 20-round no-repeat solo cycle passed.');
