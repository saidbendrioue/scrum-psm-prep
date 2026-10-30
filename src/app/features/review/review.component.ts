import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import type { Question } from '../../core/models/question.model';
import { ProgressService } from '../../core/services/progress.service';
import { QuestionService } from '../../core/services/question.service';
import { dueIds, mistakeIds } from '../../core/stats/progress-stats';
import { EmptyStateComponent } from '../../shared/empty-state.component';
import { LoadingBlockComponent } from '../../shared/loading-block.component';

type ReviewTab = 'mistakes' | 'bookmarks' | 'due';

@Component({
  selector: 'app-review',
  imports: [RouterLink, EmptyStateComponent, LoadingBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './review.component.html',
})
export class ReviewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly bank = inject(QuestionService);
  protected readonly progress = inject(ProgressService);
  protected readonly tabs: readonly ReviewTab[] = ['mistakes', 'bookmarks', 'due'];
  protected readonly tab = signal<ReviewTab>('mistakes');
  protected readonly loading = computed(() => this.bank.status() === 'loading');
  protected readonly questions = computed(() =>
    this.ids()
      .map((id) => this.bank.byId(id))
      .filter((question): question is Question => question !== undefined),
  );

  constructor() {
    const requested = this.route.snapshot.queryParamMap.get('tab');
    if (requested === 'bookmarks' || requested === 'due' || requested === 'mistakes') this.tab.set(requested);
  }

  protected select(tab: ReviewTab): void {
    this.tab.set(tab);
  }

  protected label(tab: ReviewTab): string {
    if (tab === 'bookmarks') return 'Bookmarks';
    if (tab === 'due') return 'Due';
    return 'Mistakes';
  }

  private ids(): readonly string[] {
    const state = this.progress.state();
    if (this.tab() === 'bookmarks') return state.bookmarks;
    if (this.tab() === 'due') return dueIds(state.cards);
    return mistakeIds(state);
  }
}
