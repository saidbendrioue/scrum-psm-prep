import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

import type { Question } from '../core/models/question.model';
import { optionLetter } from '../core/scoring/scoring';
import { EmptyStateComponent } from './empty-state.component';

export type AnswerReviewFilter = 'wrong' | 'correct' | 'all';
export type OptionMark = 'yours-correct' | 'yours-wrong' | 'correct' | 'plain';

export interface AnswerReviewRow {
  number: number;
  questionId: string;
  question: Question | undefined;
  selectedIds: readonly string[];
  correct: boolean;
}

@Component({
  selector: 'app-answer-review',
  imports: [EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './answer-review.component.html',
})
export class AnswerReviewComponent {
  readonly rows = input.required<readonly AnswerReviewRow[]>();
  readonly activeChange = output<boolean>();

  protected readonly filter = signal<AnswerReviewFilter>('all');
  protected readonly activeNumber = signal<number | null>(null);
  protected readonly wrongCount = computed(() => this.rows().filter((row) => !row.correct).length);
  protected readonly correctCount = computed(() => this.rows().filter((row) => row.correct).length);
  protected readonly visible = computed(() => {
    const filter = this.filter();
    if (filter === 'wrong') return this.rows().filter((row) => !row.correct);
    if (filter === 'correct') return this.rows().filter((row) => row.correct);
    return this.rows();
  });
  protected readonly active = computed(() => this.rows().find((row) => row.number === this.activeNumber()) ?? null);
  protected readonly activeIndex = computed(() => this.rows().findIndex((row) => row.number === this.activeNumber()));

  protected select(filter: AnswerReviewFilter): void {
    this.filter.set(filter);
  }

  protected open(row: AnswerReviewRow): void {
    this.activeNumber.set(row.number);
    this.activeChange.emit(true);
    window.scrollTo({ top: 0 });
  }

  protected close(): void {
    this.activeNumber.set(null);
    this.activeChange.emit(false);
    window.scrollTo({ top: 0 });
  }

  protected step(delta: number): void {
    const next = this.rows()[this.activeIndex() + delta];
    if (!next) return;
    this.activeNumber.set(next.number);
    window.scrollTo({ top: 0 });
  }

  protected prompt(row: AnswerReviewRow): string {
    if (row.question?.type === 'multiple') return 'Select all that apply.';
    if (row.question?.type === 'truefalse') return 'True or false?';
    return 'Select one answer.';
  }

  protected letter(index: number): string {
    return optionLetter(index);
  }

  protected mark(row: AnswerReviewRow, optionId: string): OptionMark {
    const selected = row.selectedIds.includes(optionId);
    const correct = row.question?.correctOptionIds.includes(optionId) ?? false;
    if (selected && correct) return 'yours-correct';
    if (selected) return 'yours-wrong';
    if (correct) return 'correct';
    return 'plain';
  }

  protected optionClass(mark: OptionMark): string {
    const layout = 'flex w-full items-center gap-3 rounded-2xl border px-4 py-3';
    if (mark === 'yours-wrong') return `${layout} border-dashed border-bad bg-bad-bg text-bad`;
    if (mark === 'yours-correct' || mark === 'correct') return `${layout} border-accent bg-surface-2`;
    return `${layout} border-line bg-surface`;
  }

  protected markLabel(mark: OptionMark): string {
    if (mark === 'yours-wrong') return 'Your answer · wrong';
    if (mark === 'yours-correct') return 'Your answer · correct';
    if (mark === 'correct') return 'Correct answer';
    return '';
  }
}
