import { Injectable, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PSM_MINUTES, PSM_QUESTION_COUNT } from '../constants';
import { createId } from '../format';
import { filterQuestions, shuffle } from '../filtering/filter-questions';
import type { Difficulty } from '../models/question.model';
import { toggleSelection } from '../scoring/scoring';
import { ProgressService } from '../services/progress.service';
import { QuestionService } from '../services/question.service';
import { TimerService } from '../services/timer.service';

export interface ExamConfig {
  count: number;
  minutes: number;
  difficulty: Difficulty | 'all';
  categories: readonly string[];
}

@Injectable({ providedIn: 'root' })
export class ExamStore {
  private readonly questions = inject(QuestionService);
  private readonly progress = inject(ProgressService);
  private readonly timer = inject(TimerService);
  private readonly router = inject(Router);
  private finishing = false;

  readonly exam = this.progress.activeExam;
  readonly remainingSeconds = this.timer.remainingSeconds;
  readonly currentQuestion = computed(() => {
    const exam = this.exam();
    if (!exam) return null;
    const id = exam.questionIds[exam.currentIndex];
    return id ? (this.questions.byId(id) ?? null) : null;
  });
  readonly selected = computed(() => {
    const exam = this.exam();
    const question = this.currentQuestion();
    if (!exam || !question) return [];
    return exam.answers[question.id] ?? [];
  });
  readonly answeredCount = computed(() => {
    const exam = this.exam();
    if (!exam) return 0;
    return exam.questionIds.filter((id) => (exam.answers[id]?.length ?? 0) > 0).length;
  });

  resume(): void {
    const exam = this.exam();
    if (!exam) {
      this.timer.stop();
      return;
    }
    const remaining = Math.max(0, Math.ceil((Date.parse(exam.deadlineAt) - Date.now()) / 1000));
    if (remaining <= 0) {
      this.finish('expired');
      return;
    }
    this.timer.start(remaining, () => this.finish('expired'));
  }

  resync(): void {
    this.timer.stop();
    if (this.exam()) this.resume();
  }

  matchingCount(config: ExamConfig): number {
    return this.pool(config).length;
  }

  start(config: ExamConfig): number {
    if (this.exam()) return 0;
    const pool = shuffle(this.pool(config));
    const count = Math.min(Math.max(1, config.count), pool.length);
    if (count === 0) return 0;
    const minutes = Math.min(180, Math.max(1, config.minutes));
    const now = Date.now();
    this.progress.startExam({
      id: createId('exam'),
      startedAt: new Date(now).toISOString(),
      finishedAt: null,
      durationSeconds: minutes * 60,
      deadlineAt: new Date(now + minutes * 60 * 1000).toISOString(),
      questionIds: pool.slice(0, count).map((question) => question.id),
      answers: {},
      currentIndex: 0,
      scorePercent: null,
      correctCount: null,
      passed: null,
      status: 'in-progress',
    });
    this.resume();
    return count;
  }

  chooseIndex(index: number): void {
    const option = this.currentQuestion()?.options[index];
    if (option) this.choose(option.id);
  }

  choose(optionId: string): void {
    const exam = this.exam();
    const question = this.currentQuestion();
    if (!exam || !question) return;
    const next = toggleSelection(question, exam.answers[question.id] ?? [], optionId);
    const moveOn = question.type !== 'multiple' && exam.currentIndex < exam.questionIds.length - 1;
    this.progress.patchActive((current) => ({
      ...current,
      answers: { ...current.answers, [question.id]: next },
      currentIndex: moveOn ? current.currentIndex + 1 : current.currentIndex,
    }));
  }

  jump(index: number): void {
    const exam = this.exam();
    if (!exam) return;
    const next = Math.min(Math.max(0, index), exam.questionIds.length - 1);
    this.progress.patchActive((current) => ({ ...current, currentIndex: next }));
  }

  toggleBookmark(): boolean {
    const question = this.currentQuestion();
    return question ? this.progress.toggleBookmark(question.id) : false;
  }

  abandon(): void {
    this.timer.stop();
    this.progress.abandonActive();
  }

  finish(status: 'completed' | 'expired' = 'completed'): void {
    if (this.finishing) return;
    const exam = this.exam();
    if (!exam) return;
    this.finishing = true;
    this.timer.stop();
    const id = this.progress.completeActive(status, this.questions.questions());
    this.finishing = false;
    if (id) void this.router.navigate(['/exam/results', id]);
  }

  private pool(config: ExamConfig) {
    return filterQuestions(this.questions.questions(), {
      search: '',
      categories: config.categories,
      difficulties: config.difficulty === 'all' ? [] : [config.difficulty],
      certs: ['PSM I'],
      types: [],
      questionIds: null,
    });
  }
}

export const DEFAULT_EXAM_CONFIG: ExamConfig = {
  count: PSM_QUESTION_COUNT,
  minutes: PSM_MINUTES,
  difficulty: 'all',
  categories: [],
};
