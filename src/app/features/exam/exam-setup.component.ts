import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { PSM_MINUTES, PSM_QUESTION_COUNT } from '../../core/constants';
import type { Difficulty } from '../../core/models/question.model';
import { DIFFICULTIES } from '../../core/models/question.model';
import { DEFAULT_EXAM_CONFIG, ExamStore, type ExamConfig } from '../../core/stores/exam.store';
import { ProgressService } from '../../core/services/progress.service';
import { QuestionService } from '../../core/services/question.service';
import { ToastService } from '../../core/services/toast.service';
import { summarize } from '../../core/stats/progress-stats';

@Component({
  selector: 'app-exam-setup',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './exam-setup.component.html',
})
export class ExamSetupComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  protected readonly examStore = inject(ExamStore);
  protected readonly progress = inject(ProgressService);
  protected readonly bank = inject(QuestionService);
  protected readonly difficulties = DIFFICULTIES;
  protected readonly submitted = signal(false);
  protected readonly preferFresh = signal(true);
  protected readonly config = signal<ExamConfig>(DEFAULT_EXAM_CONFIG);
  protected readonly available = computed(() => this.examStore.matchingCount(this.config()));
  protected readonly weakCategories = computed(() => {
    const summary = summarize(this.bank.questions(), this.progress.state());
    return summary.categories
      .filter((item) => item.answered >= 3 && item.percent < 85)
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 4)
      .map((item) => item.category);
  });
  protected readonly form = this.formBuilder.group({
    count: this.formBuilder.control(PSM_QUESTION_COUNT, [Validators.required, Validators.min(1), Validators.max(200)]),
    minutes: this.formBuilder.control(PSM_MINUTES, [Validators.required, Validators.min(1), Validators.max(180)]),
    difficulty: this.formBuilder.control<Difficulty | 'all'>('all'),
    categories: this.formBuilder.control<string[]>([]),
  });

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.syncConfig());
    this.syncConfig();
  }

  protected applyPreset(count: number, minutes: number, difficulty: Difficulty | 'all' = 'all'): void {
    this.form.patchValue({ count, minutes, difficulty, categories: [] });
    this.preferFresh.set(true);
  }

  protected applyWeakCategories(): void {
    const categories = this.weakCategories();
    if (categories.length === 0) {
      this.toast.show('Answer more practice questions first to reveal weak categories.', 'info');
      return;
    }
    this.form.patchValue({
      count: Math.min(40, this.examStore.matchingCount({
        count: 40,
        minutes: 30,
        difficulty: 'all',
        categories,
        preferFresh: true,
      }) || 40),
      minutes: 30,
      difficulty: 'all',
      categories,
    });
    this.preferFresh.set(true);
  }

  protected setPreferFresh(value: boolean): void {
    this.preferFresh.set(value);
    this.syncConfig();
  }

  protected discard(): void {
    this.examStore.abandon();
    this.toast.show('Exam discarded.', 'info');
  }

  protected start(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const available = this.available();
    if (available === 0) {
      this.toast.show('No questions match this exam setup.', 'info');
      return;
    }
    const count = this.examStore.start({
      count: value.count,
      minutes: value.minutes,
      difficulty: value.difficulty,
      categories: value.categories,
      preferFresh: this.preferFresh(),
    });
    if (count === 0) return;
    if (count < value.count) this.toast.show(`This setup has ${count} questions, so the exam uses ${count}.`, 'info');
    void this.router.navigate(['/exam/session']);
  }

  private syncConfig(): void {
    const value = this.form.getRawValue();
    this.config.set({
      count: value.count,
      minutes: value.minutes,
      difficulty: value.difficulty,
      categories: value.categories,
      preferFresh: this.preferFresh(),
    });
  }
}
