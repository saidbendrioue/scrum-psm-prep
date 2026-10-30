import type { Question } from '../models/question.model';
import { buildScore, isAnswerCorrect, scoreAttempt, toggleSelection } from './scoring';

function question(overrides: Partial<Question> = {}): Question {
  return {
    id: 'q1',
    category: 'Scrum Theory',
    cert: ['PSM I'],
    difficulty: 'easy',
    type: 'single',
    question: 'What is Scrum?',
    options: [
      { id: 'a', text: 'A framework' },
      { id: 'b', text: 'A methodology' },
      { id: 'c', text: 'A process' },
    ],
    correctOptionIds: ['a'],
    explanation: 'Scrum is a framework.',
    reference: 'Scrum Guide (2020)',
    ...overrides,
  };
}

describe('scoring', () => {
  it('accepts the same options in any order and ignores duplicates', () => {
    const multi = question({ type: 'multiple', correctOptionIds: ['a', 'c'] });
    expect(isAnswerCorrect(multi, ['c', 'a', 'a'])).toBe(true);
    expect(isAnswerCorrect(multi, ['a'])).toBe(false);
    expect(isAnswerCorrect(multi, ['a', 'b', 'c'])).toBe(false);
    expect(toggleSelection(multi, ['a', 'a'], 'a')).toEqual([]);
    expect(toggleSelection(multi, ['a', 'a'], 'c').sort()).toEqual(['a', 'c']);
    expect(toggleSelection(question(), ['b'], 'a')).toEqual(['a']);
  });

  it('passes at 85 percent and fails below, including blanks', () => {
    const questions = Array.from({ length: 20 }, (_, index) => question({ id: `q${index}` }));
    const passing: Record<string, string[]> = {};
    questions.forEach((item, index) => {
      passing[item.id] = [index < 17 ? 'a' : 'b'];
    });
    const passed = scoreAttempt(questions, passing);
    expect(passed.correctCount).toBe(17);
    expect(passed.passed).toBe(true);
    expect(passed.percent).toBe(85);

    passing[questions[16]?.id ?? 'q16'] = [];
    const failed = scoreAttempt(questions, passing);
    expect(failed.correctCount).toBe(16);
    expect(failed.unanswered).toBe(1);
    expect(failed.passed).toBe(false);
    expect(buildScore(0, 0, 0)).toEqual({ correctCount: 0, total: 0, percent: 0, passed: false, unanswered: 0 });
  });
});
