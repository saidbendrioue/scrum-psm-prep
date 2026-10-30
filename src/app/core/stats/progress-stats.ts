import { todayKey } from '../format';
import type { Question } from '../models/question.model';
import type { CategoryStat, ExamSnapshot, ProgressState, ProgressSummary, Streak, StoredAnswer } from '../models/progress.model';
import type { ReviewCard } from '../sm2/sm2';

export function nextStreak(streak: Streak, now = new Date()): Streak {
  const today = todayKey(now);
  if (streak.lastActiveDate === today) return streak;
  const yesterday = todayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
  const current = streak.lastActiveDate === yesterday ? streak.current + 1 : 1;
  return { current, best: Math.max(streak.best, current), lastActiveDate: today };
}

export function latestAnswers(answers: readonly StoredAnswer[]): Map<string, StoredAnswer> {
  const map = new Map<string, StoredAnswer>();
  for (const answer of answers) {
    const existing = map.get(answer.questionId);
    if (!existing || existing.answeredAt <= answer.answeredAt) map.set(answer.questionId, answer);
  }
  return map;
}

export function mistakeIds(state: ProgressState): string[] {
  return [...latestAnswers(state.answers).values()].filter((answer) => !answer.correct).map((answer) => answer.questionId);
}

export function dueIds(cards: Readonly<Record<string, ReviewCard>>, now = new Date()): string[] {
  const time = now.getTime();
  return Object.entries(cards)
    .filter(([, card]) => Date.parse(card.dueAt) <= time)
    .map(([id]) => id);
}

export function summarize(questions: readonly Question[], state: ProgressState, now = new Date()): ProgressSummary {
  const latest = latestAnswers(state.answers);
  const byCategory = new Map<string, CategoryStat>();
  for (const question of questions) {
    const current = byCategory.get(question.category) ?? {
      category: question.category,
      correct: 0,
      answered: 0,
      percent: 0,
    };
    const answer = latest.get(question.id);
    if (answer) {
      current.answered += 1;
      if (answer.correct) current.correct += 1;
    }
    byCategory.set(question.category, current);
  }
  const categories = [...byCategory.values()]
    .map((stat) => ({
      ...stat,
      percent: stat.answered === 0 ? 0 : Math.round((stat.correct / stat.answered) * 1000) / 10,
    }))
    .filter((stat) => stat.answered > 0)
    .sort((a, b) => a.category.localeCompare(b.category));
  const answered = latest.size;
  const correct = [...latest.values()].filter((answer) => answer.correct).length;
  const finished = state.exams.filter((exam) => exam.status === 'completed' || exam.status === 'expired');
  return {
    answered,
    correct,
    accuracy: answered === 0 ? 0 : Math.round((correct / answered) * 1000) / 10,
    bookmarks: state.bookmarks.length,
    mistakes: mistakeIds(state).length,
    due: dueIds(state.cards, now).length,
    examsTaken: finished.length,
    examsPassed: finished.filter((exam) => exam.passed).length,
    streak: state.streak,
    categories,
    recentExams: [...state.exams].reverse().slice(0, 6),
  };
}

export function finishedExams(exams: readonly ExamSnapshot[]): ExamSnapshot[] {
  return exams.filter((exam) => exam.status === 'completed' || exam.status === 'expired');
}
