/**
 * Build-time checks for the English Club mini game.
 * Fail the preview/build early if a question or self-hosted illustration is broken.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const bank = readFileSync(join(root, 'src/data/questions.ts'), 'utf8');
const entries = [...bank.matchAll(/  createQuestion\(\{([\s\S]*?)\n  \}\),?/g)].map(m => m[1]);
const expectedCounts = {
  '20/10 Celebration': 12,
  'English Challenge': 18,
  'Inspiring Women': 12,
  'Picture Round': 12,
};
const expectedDifficulties = {
  '20/10 Celebration': { 'warm-up': 6, standard: 6 },
  'English Challenge': { 'warm-up': 6, standard: 6, challenge: 6 },
  'Inspiring Women': { 'warm-up': 6, standard: 6 },
  'Picture Round': { 'warm-up': 6, standard: 6 },
};

function assert(condition, message) {
  if (!condition) throw new Error('English Club question bank: ' + message);
}
function field(data, key) {
  const match = data.match(new RegExp('\\b' + key + ': "([^"]+)"'));
  return match?.[1];
}

assert(entries.length === 54, 'Expected exactly 54 valid questions, found ' + entries.length);
const ids = new Set();
const prompts = new Set();
const counts = Object.fromEntries(Object.keys(expectedCounts).map(k => [k, 0]));
const difficultyCounts = Object.fromEntries(Object.keys(expectedCounts).map(k => [k, {}]));
let pictureCount = 0;

for (const item of entries) {
  const id = field(item, 'id');
  const category = field(item, 'category');
  const difficulty = field(item, 'difficulty');
  const question = field(item, 'question');
  const options = [...item.matchAll(/      ([ABCD]): "((?:[^"\\]|\\.)*)",/g)];
  const answer = item.match(/correctAnswer: '([ABCD])'/)?.[1];
  const image = field(item, 'image');
  assert(id && !ids.has(id), 'Duplicate or missing ID: ' + id);
  ids.add(id);
  assert(question && !prompts.has(question), 'Duplicate or missing question: ' + id);
  prompts.add(question);
  assert(category in expectedCounts, 'Unknown category: ' + id);
  assert(difficulty in expectedDifficulties[category], 'Invalid difficulty: ' + id);
  assert(question.length <= 145, 'Question too long for projector: ' + id);
  assert(options.length === 4 && new Set(options.map(x => x[1])).size === 4, 'Must have A-D options: ' + id);
  assert(new Set(options.map(x => x[2].toLowerCase())).size === 4, 'Duplicate options: ' + id);
  assert(options.some(x => x[1] === answer), 'Correct answer missing: ' + id);
  assert(field(item, 'explanation'), 'Missing explanation: ' + id);
  counts[category]++;
  difficultyCounts[category][difficulty] = (difficultyCounts[category][difficulty] || 0) + 1;

  if (category === 'Picture Round') {
    pictureCount++;
    assert(image?.startsWith('/questions/english-club/') && image.endsWith('.svg'), 'Missing local picture: ' + id);
    const filepath = join(root, 'public', image.slice(1));
    assert(existsSync(filepath), 'Missing SVG file: ' + filepath);
    const svg = readFileSync(filepath, 'utf8');
    assert(svg.includes('<svg') && svg.includes('</svg>') && svg.includes('<title'), 'Invalid accessible SVG: ' + id);
  } else {
    assert(!image, 'Unexpected illustration outside picture round: ' + id);
  }
}
assert(JSON.stringify(counts) === JSON.stringify(expectedCounts), 'Category counts: ' + JSON.stringify(counts));
for (const [category, expected] of Object.entries(expectedDifficulties)) {
  for (const [level, number] of Object.entries(expected)) {
    assert(difficultyCounts[category][level] === number, category + ' / ' + level + ': wrong difficulty count');
  }
}
assert(pictureCount === 12, 'Expected 12 illustrated questions');

const plans = [...bank.matchAll(/\{ category: '([^']+)', difficulty: '([^']+)', count: (\d+) \}/g)];
assert(plans.length === 9, 'Round blueprint must have 9 slots');
assert(plans.reduce((n, x) => n + Number(x[3]), 0) === 10, 'Round must contain 10 questions');
for (const slot of plans) {
  assert(expectedDifficulties[slot[1]]?.[slot[2]] >= Number(slot[3]), 'Cannot satisfy round slot: ' + slot[1]);
}
console.log('English Club quiz bank validated: 54 unique questions, 10 balanced per round, 12 illustrated picture prompts.');
