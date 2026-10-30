import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { filterQuestions } from '../../core/filtering/filter-questions';
import { EMPTY_FILTER, questionTypeLabel, type QuestionFilter } from '../../core/models/question.model';
import { QuestionService } from '../../core/services/question.service';
import { EmptyStateComponent } from '../../shared/empty-state.component';
import { LoadingBlockComponent } from '../../shared/loading-block.component';
import { QuestionFiltersComponent } from '../../shared/question-filters.component';

@Component({
  selector: 'app-browser',
  imports: [EmptyStateComponent, LoadingBlockComponent, QuestionFiltersComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './browser.component.html',
})
export class BrowserComponent {
  protected readonly bank = inject(QuestionService);
  protected readonly typeLabel = questionTypeLabel;
  protected readonly filters = signal<QuestionFilter>(EMPTY_FILTER);
  protected readonly visible = computed(() => filterQuestions(this.bank.questions(), this.filters()));

  protected onFilters(filters: QuestionFilter): void {
    this.filters.set(filters);
  }
}
