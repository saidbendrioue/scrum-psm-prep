import type { ReviewCard } from '../sm2/sm2';
import {
  EMPTY_PROGRESS,
  type ExamSnapshot,
  type ExamStatus,
  type ProgressState,
  type StoredAnswer,
  type StudyMode,
  type ThemeName,
} from './progress.model';

const STUDY_MODES: readonly StudyMode[] = ['practice', 'review', 'exam'];
const EXAM_STATUSES: readonly ExamStatus[] = ['in-progress', 'completed', 'expired', 'abandoned'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isMode(value: unknown): value is StudyMode {
  return typeof value === 'string' && STUDY_MODES.some((mode) => mode === value);
}

function isExamStatus(value: unknown): value is ExamStatus {
  return typeof value === 'string' && EXAM_STATUSES.some((status) => status === value);
}

function parseAnswer(value: unknown): StoredAnswer | null {
  if (!isRecord(value) || typeof value['questionId'] !== 'string' || typeof value['correct'] !== 'boolean') {
    return null;
  }
  if (typeof value['answeredAt'] !== 'string' || !isMode(value['mode']) || !isStringArray(value['selectedOptionIds'])) {
    return null;
  }
  return {
    questionId: value['questionId'],
    selectedOptionIds: [...new Set(value['selectedOptionIds'])],
    correct: value['correct'],
    answeredAt: value['answeredAt'],
    mode: value['mode'],
  };
}

function parseAnswersMap(value: unknown): Record<string, string[]> | null {
  if (!isRecord(value)) return null;
  const answers: Record<string, string[]> = {};
  for (const [key, selected] of Object.entries(value)) {
    if (!isStringArray(selected)) return null;
    answers[key] = [...new Set(selected)];
  }
  return answers;
}

function parseExam(value: unknown): ExamSnapshot | null {
  if (!isRecord(value)) return null;
  if (typeof value['id'] !== 'string' || typeof value['startedAt'] !== 'string') return null;
  if (typeof value['durationSeconds'] !== 'number' || typeof value['deadlineAt'] !== 'string') return null;
  if (typeof value['currentIndex'] !== 'number' || !isExamStatus(value['status'])) return null;
  if (!isStringArray(value['questionIds'])) return null;
  const answers = parseAnswersMap(value['answers']);
  if (!answers) return null;
  const finishedAt = value['finishedAt'];
  const scorePercent = value['scorePercent'];
  const correctCount = value['correctCount'];
  const passed = value['passed'];
  if (finishedAt !== null && typeof finishedAt !== 'string') return null;
  if (scorePercent !== null && typeof scorePercent !== 'number') return null;
  if (correctCount !== null && typeof correctCount !== 'number') return null;
  if (passed !== null && typeof passed !== 'boolean') return null;
  return {
    id: value['id'],
    startedAt: value['startedAt'],
    finishedAt,
    durationSeconds: value['durationSeconds'],
    deadlineAt: value['deadlineAt'],
    questionIds: value['questionIds'],
    answers,
    currentIndex: Math.max(0, value['currentIndex']),
    scorePercent,
    correctCount,
    passed,
    status: value['status'],
  };
}

function parseCard(value: unknown): ReviewCard | null {
  if (!isRecord(value)) return null;
  if (typeof value['easeFactor'] !== 'number' || typeof value['intervalDays'] !== 'number') return null;
  if (typeof value['repetitions'] !== 'number' || typeof value['dueAt'] !== 'string') return null;
  const lastReviewedAt = value['lastReviewedAt'];
  if (lastReviewedAt !== null && typeof lastReviewedAt !== 'string') return null;
  return {
    easeFactor: value['easeFactor'],
    intervalDays: value['intervalDays'],
    repetitions: value['repetitions'],
    dueAt: value['dueAt'],
    lastReviewedAt,
  };
}

function keepOneActiveExam(exams: ExamSnapshot[]): ExamSnapshot[] {
  let seenActive = false;
  const reversed = [...exams].reverse().map((exam) => {
    if (exam.status !== 'in-progress') return exam;
    if (seenActive) {
      return { ...exam, status: 'abandoned' as const, finishedAt: exam.finishedAt ?? new Date().toISOString() };
    }
    seenActive = true;
    return exam;
  });
  return reversed.reverse();
}

export function sanitizeProgress(value: unknown): ProgressState | null {
  if (!isRecord(value) || value['version'] !== 1) return null;
  if (!Array.isArray(value['answers']) || !Array.isArray(value['exams']) || !isStringArray(value['bookmarks'])) {
    return null;
  }
  const answers = value['answers'].map(parseAnswer);
  const exams = value['exams'].map(parseExam);
  if (answers.some((item) => item === null) || exams.some((item) => item === null)) return null;
  if (!isRecord(value['cards']) || !isRecord(value['streak'])) return null;
  const cards: Record<string, ReviewCard> = {};
  for (const [key, card] of Object.entries(value['cards'])) {
    const parsed = parseCard(card);
    if (!parsed) return null;
    cards[key] = parsed;
  }
  const streak = value['streak'];
  if (typeof streak['current'] !== 'number' || typeof streak['best'] !== 'number') return null;
  const lastActiveDate = streak['lastActiveDate'];
  if (lastActiveDate !== null && typeof lastActiveDate !== 'string') return null;
  const theme: ThemeName = value['theme'] === 'dark' ? 'dark' : 'light';
  return {
    ...EMPTY_PROGRESS,
    answers: answers.filter((item): item is StoredAnswer => item !== null),
    exams: keepOneActiveExam(exams.filter((item): item is ExamSnapshot => item !== null)),
    bookmarks: [...new Set(value['bookmarks'])],
    cards,
    streak: { current: streak['current'], best: streak['best'], lastActiveDate },
    theme,
  };
}
