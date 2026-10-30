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

export type PracticeAction = 'need-answer' | 'advanced' | 'summary' | 'idle';

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
    if (!session || !question) return 'idle';
    const selected = toggleSelection(question, session.selected, optionId);
    if (question.type === 'multiple') {
      this.sessionState.set({ ...session, selected });
      return 'idle';
    }
    return this.commit(session, question, selected);
  }

  chooseIndex(index: number): PracticeAction {
    const option = this.current()?.options[index];
    return option ? this.choose(option.id) : 'idle';
  }

  submit(): PracticeAction {
    const session = this.session();
    const question = this.current();
    if (!session || !question) return 'idle';
    return this.commit(session, question, session.selected);
  }

  toggleBookmark(): boolean {
    const question = this.current();
    return question ? this.progress.toggleBookmark(question.id) : false;
  }

  private commit(session: PracticeSession, question: Question, selected: readonly string[]): PracticeAction {
    if (selected.length === 0) return 'need-answer';
    const correct = isAnswerCorrect(question, selected);
    this.progress.recordAnswer(question, selected, session.mode);
    const answers = { ...session.answers, [question.id]: [...selected] };
    const answeredCount = session.answeredCount + 1;
    const correctCount = session.correctCount + (correct ? 1 : 0);
    if (session.index + 1 >= session.questionIds.length) {
      this.sessionState.set({ ...session, selected, answers, revealed: false, answeredCount, correctCount, phase: 'summary' });
      return 'summary';
    }
    this.sessionState.set({
      ...session,
      index: session.index + 1,
      selected: [],
      answers,
      revealed: false,
      answeredCount,
      correctCount,
    });
    return 'advanced';
  }
}
