import { Injectable, computed, inject, signal } from '@angular/core';

import { STORAGE_KEY } from '../constants';
import type { Question } from '../models/question.model';
import { EMPTY_PROGRESS, type ExamSnapshot, type ProgressState, type StudyMode, type ThemeName } from '../models/progress.model';
import { sanitizeProgress } from '../models/progress.schema';
import { buildScore, isAnswerCorrect, normalizeSelection, scoreAttempt } from '../scoring/scoring';
import { scheduleAfterAnswer } from '../sm2/sm2';
import { nextStreak } from '../stats/progress-stats';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly storage = inject(StorageService);
  private readonly stateSignal = signal<ProgressState>(this.read());
  readonly persistError = signal<string | null>(null);

  readonly state = this.stateSignal.asReadonly();
  readonly theme = computed(() => this.state().theme);
  readonly bookmarks = computed(() => this.state().bookmarks);
  readonly activeExam = computed(() => this.state().exams.find((exam) => exam.status === 'in-progress') ?? null);

  recordAnswer(question: Question, selected: readonly string[], mode: StudyMode): void {
    const now = new Date();
    const correct = isAnswerCorrect(question, selected);
    this.update((state) => ({
      ...state,
      answers: [
        ...state.answers,
        {
          questionId: question.id,
          selectedOptionIds: normalizeSelection(selected),
          correct,
          answeredAt: now.toISOString(),
          mode,
        },
      ],
      cards: scheduleAfterAnswer(state.cards, question.id, selected, correct, now),
      streak: nextStreak(state.streak, now),
    }));
  }

  toggleBookmark(questionId: string): boolean {
    let added = false;
    this.update((state) => {
      added = !state.bookmarks.includes(questionId);
      return {
        ...state,
        bookmarks: added ? [...state.bookmarks, questionId] : state.bookmarks.filter((id) => id !== questionId),
      };
    });
    return added;
  }

  isBookmarked(questionId: string): boolean {
    return this.bookmarks().includes(questionId);
  }

  setTheme(theme: ThemeName): void {
    this.update((state) => ({ ...state, theme }));
  }

  startExam(exam: ExamSnapshot): void {
    this.update((state) => ({
      ...state,
      exams: [...state.exams.filter((item) => item.status !== 'in-progress'), exam],
    }));
  }

  patchActive(patch: (exam: ExamSnapshot) => ExamSnapshot): void {
    this.update((state) => ({
      ...state,
      exams: state.exams.map((exam) => (exam.status === 'in-progress' ? patch(exam) : exam)),
    }));
  }

  abandonActive(): void {
    const finishedAt = new Date().toISOString();
    this.update((state) => ({
      ...state,
      exams: state.exams.map((exam) =>
        exam.status === 'in-progress' ? { ...exam, status: 'abandoned', finishedAt } : exam,
      ),
    }));
  }

  completeActive(status: 'completed' | 'expired', questions: readonly Question[]): string | null {
    const active = this.activeExam();
    if (!active) return null;
    const now = new Date();
    const byId = new Map(questions.map((question) => [question.id, question]));
    const examQuestions = active.questionIds
      .map((id) => byId.get(id))
      .filter((question): question is Question => question !== undefined);
    const scored = scoreAttempt(examQuestions, active.answers);
    const missing = active.questionIds.length - examQuestions.length;
    const result = buildScore(scored.correctCount, active.questionIds.length, scored.unanswered + missing);
    let cards = this.state().cards;
    const stored = examQuestions.map((question) => {
      const selected = active.answers[question.id] ?? [];
      const correct = isAnswerCorrect(question, selected);
      cards = scheduleAfterAnswer(cards, question.id, selected, correct, now);
      return {
        questionId: question.id,
        selectedOptionIds: normalizeSelection(selected),
        correct,
        answeredAt: now.toISOString(),
        mode: 'exam' as const,
      };
    });
    this.update((state) => ({
      ...state,
      answers: [...state.answers, ...stored],
      cards,
      streak: stored.length > 0 || active.questionIds.length > 0 ? nextStreak(state.streak, now) : state.streak,
      exams: state.exams.map((exam) =>
        exam.id === active.id
          ? {
              ...exam,
              status,
              finishedAt: now.toISOString(),
              scorePercent: result.percent,
              correctCount: result.correctCount,
              passed: result.passed,
            }
          : exam,
      ),
    }));
    return active.id;
  }

  exportJson(): string {
    return JSON.stringify(this.state(), null, 2);
  }

  importJson(raw: string): boolean {
    try {
      const parsed: unknown = JSON.parse(raw);
      const state = sanitizeProgress(parsed);
      if (!state) return false;
      this.stateSignal.set(state);
      this.persist(state);
      return true;
    } catch {
      return false;
    }
  }

  private update(recipe: (state: ProgressState) => ProgressState): void {
    const next = recipe(this.state());
    this.stateSignal.set(next);
    this.persist(next);
  }

  private persist(state: ProgressState): void {
    const saved = this.storage.set(STORAGE_KEY, state);
    this.persistError.set(saved ? null : 'Progress could not be saved in this browser.');
  }

  private read(): ProgressState {
    const parsed = sanitizeProgress(this.storage.get(STORAGE_KEY));
    return parsed ?? { ...EMPTY_PROGRESS, cards: {}, streak: { ...EMPTY_PROGRESS.streak } };
  }
}
