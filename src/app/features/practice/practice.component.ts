import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { filterQuestions } from '../../core/filtering/filter-questions';
import { EMPTY_FILTER, type Question, type QuestionFilter } from '../../core/models/question.model';
import { isAnswerCorrect } from '../../core/scoring/scoring';
import { PracticeStore } from '../../core/stores/practice.store';
import { ProgressService } from '../../core/services/progress.service';
import { QuestionService } from '../../core/services/question.service';
import { ToastService } from '../../core/services/toast.service';
import { dueIds, mistakeIds } from '../../core/stats/progress-stats';
import { AnswerReviewComponent, type AnswerReviewRow } from '../../shared/answer-review.component';
import { AnswerHotkeysDirective } from '../../shared/answer-hotkeys.directive';
import { LoadingBlockComponent } from '../../shared/loading-block.component';
import { ProgressBarComponent } from '../../shared/progress-bar.component';
import { QuestionCardComponent } from '../../shared/question-card.component';
import { QuestionFiltersComponent } from '../../shared/question-filters.component';

@Component({
  selector: 'app-practice',
  imports: [
    RouterLink,
    AnswerHotkeysDirective,
    LoadingBlockComponent,
    ProgressBarComponent,
    QuestionCardComponent,
    QuestionFiltersComponent,
    AnswerReviewComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './practice.component.html',
})
export class PracticeComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly bank = inject(QuestionService);
  protected readonly progress = inject(ProgressService);
  protected readonly store = inject(PracticeStore);
  protected readonly filters = signal<QuestionFilter>(EMPTY_FILTER);
  protected readonly reviewing = signal(false);
  protected readonly loading = computed(() => this.bank.status() === 'loading');
  protected readonly categories = this.bank.categories;
  protected readonly matching = computed(() => filterQuestions(this.bank.questions(), this.filters()));
  protected readonly reviewRows = computed((): AnswerReviewRow[] => {
    const session = this.store.session();
    if (!session || session.phase !== 'summary') return [];
    return session.questionIds.map((questionId, index) => {
      const question = this.bank.byId(questionId);
      const selectedIds = session.answers[questionId] ?? [];
      return {
        number: index + 1,
        questionId,
        question,
        selectedIds,
        correct: question ? isAnswerCorrect(question, selectedIds) : false,
      };
    });
  });
  private readonly setName = toSignal(this.route.queryParamMap.pipe(map((params) => params.get('set'))), {
    initialValue: this.route.snapshot.queryParamMap.get('set'),
  });
  private lastSet: string | null | undefined = undefined;

  constructor() {
    effect(() => {
      const status = this.bank.status();
      const set = this.setName();
      if (status !== 'ready' || set === this.lastSet) return;
      this.lastSet = set;
      untracked(() => this.applySet(set));
    });
  }

  protected onFilters(filters: QuestionFilter): void {
    this.filters.set(filters);
  }

  protected startPractice(): void {
    const started = this.store.start(this.matching(), 'practice');
    if (!started) this.toast.show('No questions match these filters.', 'info');
  }

  protected check(): void {
    if (this.store.check() !== 'need-answer') return;
    const multiple = this.store.current()?.type === 'multiple';
    this.toast.show(
      multiple ? 'Select at least one answer before checking.' : 'Select an answer before checking.',
      'info',
    );
  }

  protected next(): void {
    const result = this.store.next();
    if (result === 'need-check') this.toast.show('Check your answer before continuing.', 'info');
  }

  protected onConfirm(): void {
    const session = this.store.session();
    if (!session) return;
    if (session.revealed) this.next();
    else this.check();
  }

  protected bookmark(): void {
    if (!this.store.current()) return;
    const added = this.store.toggleBookmark();
    this.toast.show(added ? 'Question bookmarked.' : 'Bookmark removed.', 'info');
  }

  protected end(): void {
    this.store.clear();
    void this.router.navigate(['/practice']);
  }

  protected bookmarked(): boolean {
    const question = this.store.current();
    return question ? this.progress.isBookmarked(question.id) : false;
  }

  private applySet(set: string | null): void {
    if (!set) {
      this.store.clear();
      return;
    }
    const questions = this.idsFor(set)
      .map((id) => this.bank.byId(id))
      .filter((question): question is Question => question !== undefined);
    if (!this.store.start(questions, 'review')) this.toast.show('That review list is empty.', 'info');
  }

  private idsFor(set: string): readonly string[] {
    const state = this.progress.state();
    if (set === 'bookmarks') return state.bookmarks;
    if (set === 'due') return dueIds(state.cards);
    if (set === 'mistakes') return mistakeIds(state);
    return [];
  }
}
