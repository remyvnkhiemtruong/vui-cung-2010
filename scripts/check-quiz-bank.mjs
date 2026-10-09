/**
 * Check that ONLY the 12 questions in the attached teacher's Word document are
 * available in either solo or live mode. Quiz option shuffling must preserve keys.
 */
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';

const root=process.cwd();
const assert=(ok,message)=>{if(!ok)throw new Error('Teacher DOCX question bank: '+message)};
const code=readFileSync(join(root,'src/data/questions.ts'),'utf8');
const module={exports:{}};
const compiled=ts.transpileModule(code,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
runInNewContext(compiled,{module,exports:module.exports,require:(name)=>{throw new Error('Unexpected question-bank dependency '+name)}});
const {questionBank,buildQuizRound,buildContinuousQuiz,buildUnseenSoloRound,QUESTIONS_PER_ROUND}=module.exports;

assert(QUESTIONS_PER_ROUND===12,'All 12 teacher-authored questions must play in a round');
assert(questionBank.length===12,'Expected exactly twelve questions, got '+questionBank.length);
const ids=new Set(questionBank.map(q=>String(q.id)));
const prompts=new Set(questionBank.map(q=>q.question.toLowerCase().replace(/[^a-z0-9]/g,'')));
assert(ids.size===12&&prompts.size===12,'Duplicate question ID or text');
assert(questionBank.every(q=>String(q.id).startsWith('teacher-20oct-')),'Unapproved question in the bank');
assert(questionBank.every(q=>q.options.length===4),'All 12 questions must have four options');
assert(questionBank.every(q=>q.options.some(o=>o.key===q.correctAnswer)),'Correct answer key missing');
const userFacingText=questionBank.flatMap(q=>[
 q.question,q.explanation||'',q.imageCredit||'',...q.options.map(o=>o.text)
]);
assert(userFacingText.every(t=>[...t].every(c=>c.charCodeAt(0)<=127)),
 'Every question, answer and explanation must use unaccented English/romanized names');
assert(!questionBank.some(q=>/Bat khuat|Trung hau|Cong - Dung|Doi quan toc dai|Nga ba Dong Loc/i.test(q.question)),
 'Historical phrases should be translated into English');

const correctText=q=>q.options.find(x=>x.key===q.correctAnswer).text;
const expected=[
'20/10/1930','10','Ly Chieu Hoang','Trung Trac',
'Industriousness - Beauty - Eloquence - Virtue','Domestic Violence','Housework',
'The wife / The girlfriend!','Resourceful/Capable','Nguyen Thi Dinh',
'Dang Thuy Tram','To honor female contributions, express gratitude, and promote gender equality'
];
for(let i=0;i<12;i++){
 assert(correctText(questionBank[i])===expected[i],'Answer differs from teacher DOCX at '+(i+1));
 assert(questionBank[i].options.every(o=>o.text&&o.text.trim()),'Blank option at '+(i+1));
 assert(questionBank[i].explanation&&questionBank[i].explanation.trim(),'Missing explanation at '+(i+1));
}
assert(questionBank.filter(q=>Boolean(q.image)).length===2,'Both image questions from Word must remain');
for (const q of questionBank.filter(q=>q.image)){
 assert(q.image.startsWith('/questions/teacher-docx/'),'Image source must match uploaded DOCX');
 const asset=join(root,'public',q.image.slice(1));
 assert(existsSync(asset),'Missing original photo asset: '+q.image);
 const bytes=readFileSync(asset);
 const expectedAssets={
   '/questions/teacher-docx/domestic-violence.webp':{
      size:2086,hash:'bf2294e1da705129ecade0806cebb9a15a9495eea1c1cdc53471871e32776108'
   },
   '/questions/teacher-docx/housework.webp':{
      size:4408,hash:'a91b55f6614150792f46a50893f572bcfb8d8f04d59601adf2f8edac5ae73971'
   }
 };
 const expected=expectedAssets[q.image];
 assert(expected,'Only the two photos cropped from the teacher DOCX are allowed: '+q.image);
 assert(bytes.length===expected.size,'Original photo byte length mismatch: '+q.image);
 assert(bytes.toString('ascii',0,4)==='RIFF' && bytes.toString('ascii',8,12)==='WEBP',
   'Image must be a valid WebP container: '+q.image);
 assert(bytes.readUInt32LE(4)===bytes.length-8,'Corrupt WebP RIFF length: '+q.image);
 assert(createHash('sha256').update(bytes).digest('hex')===expected.hash,
   'Original teacher DOCX photo data changed or was corrupted: '+q.image);
}
const tested=new Set();
for(let i=0;i<100;i++){
 const round=buildQuizRound(questionBank,12),room=buildContinuousQuiz(questionBank);
 assert(round.length===12&&new Set(round.map(q=>q.id)).size===12,'Solo duplicates');
 assert(room.length===12&&new Set(room.map(q=>q.id)).size===12,'Live room duplicates');
 for(const q of [...round,...room]){
  const original=questionBank.find(x=>x.id===q.id);
  assert(original&&correctText(q)===correctText(original),'Shuffled answer mapping incorrect: '+q.id);
 }
 tested.add(String(room[0].id));
}
assert(tested.size>1,'Room question order should vary');
const first=buildUnseenSoloRound(questionBank,[],12);
assert(first.seenIds.length===12,'First solo cycle should use all teacher questions');
const second=buildUnseenSoloRound(questionBank,first.seenIds,12);
assert(second.cycleComplete && second.questions.length===12,'Solo restarts only after all 12');
console.log('PASS: 12 DOCX-only questions, all original correct answers, 2 embedded photo assets.');
console.log('PASS: 100 randomized solo rounds, 100 unique live decks, no repeats within a room.');
