import type { ReviewCard } from '../sm2/sm2';

export type StudyMode = 'practice' | 'review' | 'exam';
export type ExamStatus = 'in-progress' | 'completed' | 'expired' | 'abandoned';
export type ThemeName = 'light' | 'dark';

export interface Streak {
  current: number;
  best: number;
  lastActiveDate: string | null;
}

export interface StoredAnswer {
  questionId: string;
  selectedOptionIds: string[];
  correct: boolean;
  answeredAt: string;
  mode: StudyMode;
}

export interface ExamSnapshot {
  id: string;
  startedAt: string;
  finishedAt: string | null;
  durationSeconds: number;
  deadlineAt: string;
  questionIds: string[];
  answers: Record<string, string[]>;
  currentIndex: number;
  scorePercent: number | null;
  correctCount: number | null;
  passed: boolean | null;
  status: ExamStatus;
}

export interface ProgressState {
  version: 1;
  answers: StoredAnswer[];
  exams: ExamSnapshot[];
  bookmarks: string[];
  cards: Record<string, ReviewCard>;
  streak: Streak;
  theme: ThemeName;
}

export const EMPTY_PROGRESS: ProgressState = {
  version: 1,
  answers: [],
  exams: [],
  bookmarks: [],
  cards: {},
  streak: { current: 0, best: 0, lastActiveDate: null },
  theme: 'light',
};

export interface CategoryStat {
  category: string;
  correct: number;
  answered: number;
  percent: number;
}

export interface ProgressSummary {
  answered: number;
  correct: number;
  accuracy: number;
  bookmarks: number;
  mistakes: number;
  due: number;
  examsTaken: number;
  examsPassed: number;
  streak: Streak;
  categories: CategoryStat[];
  recentExams: ExamSnapshot[];
}
