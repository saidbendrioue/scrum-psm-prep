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
  protected readonly config = signal<ExamConfig>(DEFAULT_EXAM_CONFIG);
  protected readonly available = computed(() => this.examStore.matchingCount(this.config()));
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

  protected applyPreset(count: number, minutes: number): void {
    this.form.patchValue({ count, minutes, difficulty: 'all', categories: [] });
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
    });
  }
}
