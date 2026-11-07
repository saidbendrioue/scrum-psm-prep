import { EMPTY_FILTER, type Question } from '../models/question.model';
import { filterQuestions, shuffleQuestionOptions, withShuffledOptions } from './filter-questions';

const questions: Question[] = [
  {
    id: 'q1',
    category: 'Daily Scrum',
    cert: ['PSM I'],
    difficulty: 'easy',
    type: 'truefalse',
    question: 'The Daily Scrum is limited to 15 minutes.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
    ],
    correctOptionIds: ['a'],
    explanation: 'It is a 15-minute event.',
    reference: 'Scrum Guide (2020) — Daily Scrum',
  },
  {
    id: 'q2',
    category: 'Product Owner',
    cert: ['PSM I'],
    difficulty: 'hard',
    type: 'single',
    question: 'Who may cancel a Sprint?',
    options: [
      { id: 'a', text: 'The Product Owner' },
      { id: 'b', text: 'The Scrum Master' },
    ],
    correctOptionIds: ['a'],
    explanation: 'Only the Product Owner can cancel a Sprint.',
    reference: 'Scrum Guide (2020) — The Sprint',
  },
];

describe('filterQuestions', () => {
  it('filters by category, difficulty, search, and an explicit id list', () => {
    expect(filterQuestions(questions, EMPTY_FILTER)).toHaveLength(2);
    expect(filterQuestions(questions, { ...EMPTY_FILTER, categories: ['Daily Scrum'] }).map((item) => item.id)).toEqual(['q1']);
    expect(filterQuestions(questions, { ...EMPTY_FILTER, difficulties: ['hard'] }).map((item) => item.id)).toEqual(['q2']);
    expect(filterQuestions(questions, { ...EMPTY_FILTER, search: 'fifteen' })).toHaveLength(0);
    expect(filterQuestions(questions, { ...EMPTY_FILTER, search: '15 minutes' }).map((item) => item.id)).toEqual(['q1']);
    expect(filterQuestions(questions, { ...EMPTY_FILTER, questionIds: [] })).toHaveLength(0);
    expect(filterQuestions(questions, { ...EMPTY_FILTER, questionIds: ['q2'] }).map((item) => item.id)).toEqual(['q2']);
    expect(filterQuestions(questions, { ...EMPTY_FILTER, certs: ['PSPO I'] })).toHaveLength(0);
  });
});

describe('withShuffledOptions', () => {
  it('reorders options while keeping correctOptionIds tied to option ids', () => {
    const source: Question = {
      ...questions[1]!,
      options: [
        { id: 'a', text: 'The Product Owner' },
        { id: 'b', text: 'The Scrum Master' },
        { id: 'c', text: 'The Developers' },
        { id: 'd', text: 'Stakeholders' },
      ],
      correctOptionIds: ['a'],
    };
    // Deterministic Fisher–Yates: random always 0 → each index swaps with 0.
    const shuffled = withShuffledOptions(source, () => 0);
    expect(shuffled.options.map((option) => option.id)).toEqual(['b', 'c', 'd', 'a']);
    expect(shuffled.correctOptionIds).toEqual(['a']);
    expect(shuffled.options.find((option) => option.id === 'a')?.text).toBe('The Product Owner');
  });

  it('shuffles every question in a bank', () => {
    const shuffled = shuffleQuestionOptions(questions, () => 0);
    expect(shuffled).toHaveLength(2);
    expect(shuffled[0]?.options.map((option) => option.id)).toEqual(['b', 'a']);
    expect(shuffled[1]?.options.map((option) => option.id)).toEqual(['b', 'a']);
  });
});
