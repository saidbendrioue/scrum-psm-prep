import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { filterQuestions } from '../../core/filtering/filter-questions';
import { EMPTY_FILTER, type Difficulty, type Question, type QuestionFilter } from '../../core/models/question.model';
import { ProgressService } from '../../core/services/progress.service';
import { QuestionService } from '../../core/services/question.service';
import { ToastService } from '../../core/services/toast.service';
import { EmptyStateComponent } from '../../shared/empty-state.component';
import { LoadingBlockComponent } from '../../shared/loading-block.component';
import { QuestionFiltersComponent } from '../../shared/question-filters.component';

@Component({
  selector: 'app-browser',
  imports: [EmptyStateComponent, LoadingBlockComponent, QuestionFiltersComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.css',
})
export class BrowserComponent {
  protected readonly bank = inject(QuestionService);
  private readonly progress = inject(ProgressService);
  private readonly toast = inject(ToastService);
  protected readonly filters = signal<QuestionFilter>(EMPTY_FILTER);
  private readonly openAnswers = signal<ReadonlySet<string>>(new Set());
  protected readonly visible = computed(() => filterQuestions(this.bank.questions(), this.filters()));

  protected onFilters(filters: QuestionFilter): void {
    this.filters.set(filters);
  }

  protected questionLabel(id: string): string {
    const digits = /^q(\d+)$/i.exec(id)?.[1];
    return digits ? `Q${Number(digits)}` : id;
  }

  protected difficultyLabel(difficulty: Difficulty): string {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  }

  protected answerOpen(id: string): boolean {
    return this.openAnswers().has(id);
  }

  protected toggleAnswer(id: string): void {
    this.openAnswers.update((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  protected bookmarked(id: string): boolean {
    return this.progress.bookmarks().includes(id);
  }

  protected toggleBookmark(id: string): void {
    const added = this.progress.toggleBookmark(id);
    this.toast.show(added ? 'Question bookmarked.' : 'Bookmark removed.', 'info');
  }

  protected isCorrect(question: Question, optionId: string): boolean {
    return question.correctOptionIds.includes(optionId);
  }
}
