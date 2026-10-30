import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

import {
  DIFFICULTIES,
  EMPTY_FILTER,
  QUESTION_TYPES,
  questionTypeLabel,
  type Difficulty,
  type QuestionFilter,
  type QuestionType,
} from '../core/models/question.model';

@Component({
  selector: 'app-question-filters',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './question-filters.component.html',
})
export class QuestionFiltersComponent {
  readonly categories = input.required<readonly string[]>();
  readonly showSearch = input(true);
  readonly showType = input(false);
  readonly value = input<QuestionFilter>(EMPTY_FILTER);
  readonly filtersChange = output<QuestionFilter>();

  private readonly formBuilder = inject(NonNullableFormBuilder);
  protected readonly difficulties = DIFFICULTIES;
  protected readonly types = QUESTION_TYPES;
  protected readonly typeLabel = questionTypeLabel;
  protected readonly form = this.formBuilder.group({
    search: '',
    categories: this.formBuilder.control<string[]>([]),
    difficulty: this.formBuilder.control<Difficulty | 'all'>('all'),
    type: this.formBuilder.control<QuestionType | 'all'>('all'),
  });

  constructor() {
    effect(() => {
      const value = this.value();
      const difficulty = value.difficulties.length === 1 ? value.difficulties[0] : 'all';
      const type = value.types.length === 1 ? value.types[0] : 'all';
      this.form.patchValue(
        {
          search: value.search,
          categories: [...value.categories],
          difficulty: difficulty ?? 'all',
          type: type ?? 'all',
        },
        { emitEvent: false },
      );
    });
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.emit());
  }

  private emit(): void {
    const value = this.form.getRawValue();
    this.filtersChange.emit({
      ...EMPTY_FILTER,
      search: value.search,
      categories: value.categories,
      difficulties: value.difficulty === 'all' ? [] : [value.difficulty],
      types: value.type === 'all' ? [] : [value.type],
    });
  }
}
