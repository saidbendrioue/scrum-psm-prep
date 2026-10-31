import { Injectable, computed, inject, signal } from '@angular/core';

import { shuffle } from '../filtering/filter-questions';
import type { Question } from '../models/question.model';
import { isAnswerCorrect, toggleSelection } from '../scoring/scoring';
import { ProgressService } from '../services/progress.service';
import { QuestionService } from '../services/question.service';

export interface PracticeSession {
  questionIds: readonly string[];
  index: number;
  selected: readonly string[];
  answers: Readonly<Record<string, readonly string[]>>;
  revealed: boolean;
  mode: 'practice' | 'review';
  correctCount: number;
  answeredCount: number;
  phase: 'question' | 'summary';
}

export type PracticeAction = 'need-answer' | 'need-check' | 'revealed' | 'advanced' | 'summary' | 'idle';

@Injectable({ providedIn: 'root' })
export class PracticeStore {
  private readonly questions = inject(QuestionService);
  private readonly progress = inject(ProgressService);
  private readonly sessionState = signal<PracticeSession | null>(null);

  readonly session = this.sessionState.asReadonly();
  readonly current = computed(() => {
    const session = this.session();
    if (!session || session.phase === 'summary') return null;
    const id = session.questionIds[session.index];
    return id ? (this.questions.byId(id) ?? null) : null;
  });

  start(questions: readonly Question[], mode: 'practice' | 'review'): boolean {
    const picked = shuffle(questions);
    if (picked.length === 0) {
      this.sessionState.set(null);
      return false;
    }
    this.sessionState.set({
      questionIds: picked.map((question) => question.id),
      index: 0,
      selected: [],
      answers: {},
      revealed: false,
      mode,
      correctCount: 0,
      answeredCount: 0,
      phase: 'question',
    });
    return true;
  }

  clear(): void {
    this.sessionState.set(null);
  }

  choose(optionId: string): PracticeAction {
    const session = this.session();
    const question = this.current();
    if (!session || !question || session.revealed) return 'idle';
    const selected = toggleSelection(question, session.selected, optionId);
    this.sessionState.set({ ...session, selected });
    return 'idle';
  }

  chooseIndex(index: number): PracticeAction {
    const option = this.current()?.options[index];
    return option ? this.choose(option.id) : 'idle';
  }

  /** Reveal feedback for the current selection without advancing. */
  check(): PracticeAction {
    const session = this.session();
    const question = this.current();
    if (!session || !question) return 'idle';
    if (session.revealed) return 'idle';
    if (session.selected.length === 0) return 'need-answer';

    const already = session.answers[question.id] !== undefined;
    const correct = isAnswerCorrect(question, session.selected);
    if (!already) this.progress.recordAnswer(question, session.selected, session.mode);

    this.sessionState.set({
      ...session,
      answers: { ...session.answers, [question.id]: [...session.selected] },
      revealed: true,
      answeredCount: already ? session.answeredCount : session.answeredCount + 1,
      correctCount: already ? session.correctCount : session.correctCount + (correct ? 1 : 0),
    });
    return 'revealed';
  }

  /** Move to the next question, or summary when finished. Requires a checked answer. */
  next(): PracticeAction {
    const session = this.session();
    if (!session) return 'idle';
    if (!session.revealed) return 'need-check';

    if (session.index + 1 >= session.questionIds.length) {
      this.sessionState.set({ ...session, phase: 'summary' });
      return 'summary';
    }

    const nextIndex = session.index + 1;
    const nextId = session.questionIds[nextIndex];
    const selected = nextId ? (session.answers[nextId] ?? []) : [];
    this.sessionState.set({
      ...session,
      index: nextIndex,
      selected: [...selected],
      revealed: selected.length > 0,
    });
    return 'advanced';
  }

  previous(): PracticeAction {
    const session = this.session();
    if (!session || session.index === 0) return 'idle';

    const prevIndex = session.index - 1;
    const prevId = session.questionIds[prevIndex];
    const selected = prevId ? (session.answers[prevId] ?? []) : [];
    this.sessionState.set({
      ...session,
      index: prevIndex,
      selected: [...selected],
      revealed: selected.length > 0,
    });
    return 'idle';
  }

  /** Enter: check first, then advance once feedback is visible. */
  submit(): PracticeAction {
    const session = this.session();
    if (!session) return 'idle';
    return session.revealed ? this.next() : this.check();
  }

  toggleBookmark(): boolean {
    const question = this.current();
    return question ? this.progress.toggleBookmark(question.id) : false;
  }
}
