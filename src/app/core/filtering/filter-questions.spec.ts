import { EMPTY_FILTER, type Question } from '../models/question.model';
import { filterQuestions } from './filter-questions';

const questions: Question[] = [
  {
    id: 'q1',
    category: 'JVM',
    cert: ['Java'],
    difficulty: 'easy',
    type: 'truefalse',
    question: 'The heap is shared by application threads.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
    ],
    correctOptionIds: ['a'],
    explanation: 'Application threads share the heap.',
    reference: 'Java Virtual Machine Specification — Run-Time Data Areas',
  },
  {
    id: 'q2',
    category: 'Collections',
    cert: ['Java'],
    difficulty: 'hard',
    type: 'single',
    question: 'What backs a HashSet?',
    options: [
      { id: 'a', text: 'A HashMap' },
      { id: 'b', text: 'A TreeMap' },
    ],
    correctOptionIds: ['a'],
    explanation: 'HashSet stores its elements as keys in a HashMap.',
    reference: 'java.util.HashSet',
  },
];

describe('filterQuestions', () => {
  it('filters by category, difficulty, search, and an explicit id list', () => {
    expect(filterQuestions(questions, EMPTY_FILTER)).toHaveLength(2);
    expect(
      filterQuestions(questions, { ...EMPTY_FILTER, categories: ['JVM'] }).map((item) => item.id),
    ).toEqual(['q1']);
    expect(
      filterQuestions(questions, { ...EMPTY_FILTER, difficulties: ['hard'] }).map(
        (item) => item.id,
      ),
    ).toEqual(['q2']);
    expect(filterQuestions(questions, { ...EMPTY_FILTER, search: 'fifteen' })).toHaveLength(0);
    expect(
      filterQuestions(questions, { ...EMPTY_FILTER, search: 'shared by' }).map((item) => item.id),
    ).toEqual(['q1']);
    expect(filterQuestions(questions, { ...EMPTY_FILTER, questionIds: [] })).toHaveLength(0);
    expect(
      filterQuestions(questions, { ...EMPTY_FILTER, questionIds: ['q2'] }).map((item) => item.id),
    ).toEqual(['q2']);
    expect(filterQuestions(questions, { ...EMPTY_FILTER, certs: ['OCP'] })).toHaveLength(0);
  });
});
