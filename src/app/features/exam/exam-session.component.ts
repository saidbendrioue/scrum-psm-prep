import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { ExamStore } from '../../core/stores/exam.store';
import { ProgressService } from '../../core/services/progress.service';
import { QuestionService } from '../../core/services/question.service';
import { ToastService } from '../../core/services/toast.service';
import { AnswerHotkeysDirective } from '../../shared/answer-hotkeys.directive';
import { EmptyStateComponent } from '../../shared/empty-state.component';
import { LoadingBlockComponent } from '../../shared/loading-block.component';
import { ProgressBarComponent } from '../../shared/progress-bar.component';
import { QuestionCardComponent } from '../../shared/question-card.component';
import { TimerDisplayComponent } from '../../shared/timer-display.component';

@Component({
  selector: 'app-exam-session',
  imports: [
    AnswerHotkeysDirective,
    EmptyStateComponent,
    LoadingBlockComponent,
    ProgressBarComponent,
    QuestionCardComponent,
    TimerDisplayComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './exam-session.component.html',
})
export class ExamSessionComponent {
  protected readonly examStore = inject(ExamStore);
  protected readonly progress = inject(ProgressService);
  protected readonly bank = inject(QuestionService);
  private readonly toast = inject(ToastService);
  protected readonly confirming = signal(false);

  constructor() {
    this.examStore.resume();
  }

  protected onConfirm(): void {
    const exam = this.examStore.exam();
    if (!exam) return;
    if (exam.currentIndex >= exam.questionIds.length - 1) this.confirming.set(true);
    else this.examStore.jump(exam.currentIndex + 1);
  }

  protected flag(): void {
    if (!this.examStore.currentQuestion()) return;
    const added = this.examStore.toggleBookmark();
    this.toast.show(added ? 'Question bookmarked.' : 'Bookmark removed.', 'info');
  }

  protected bookmarked(): boolean {
    const question = this.examStore.currentQuestion();
    return question ? this.progress.isBookmarked(question.id) : false;
  }

  protected chosen(questionId: string): boolean {
    const exam = this.examStore.exam();
    return (exam?.answers[questionId]?.length ?? 0) > 0;
  }

  protected unanswered(): number {
    const exam = this.examStore.exam();
    if (!exam) return 0;
    return exam.questionIds.length - this.examStore.answeredCount();
  }
}
