import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import type { Question } from '../core/models/question.model';
import { isAnswerCorrect, optionLetter } from '../core/scoring/scoring';
import { AnswerOptionComponent, type OptionState } from './answer-option.component';

@Component({
  selector: 'app-question-card',
  imports: [AnswerOptionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './question-card.component.html',
})
export class QuestionCardComponent {
  readonly question = input.required<Question>();
  readonly selectedIds = input<readonly string[]>([]);
  readonly revealed = input(false);
  readonly positionLabel = input('');
  readonly showMeta = input(true);
  readonly choose = output<string>();

  protected readonly prompt = computed(() => {
    const question = this.question();
    if (question.type === 'multiple') return 'Select all that apply.';
    if (question.type === 'truefalse') return 'True or false?';
    return 'Select one answer.';
  });

  protected checked(optionId: string): boolean {
    return this.selectedIds().includes(optionId);
  }

  protected correctSelection(): boolean {
    return isAnswerCorrect(this.question(), this.selectedIds());
  }

  protected optionState(optionId: string): OptionState {
    if (!this.revealed()) return 'idle';
    const selected = this.checked(optionId);
    const correct = this.question().correctOptionIds.includes(optionId);
    if (selected && correct) return 'correct';
    if (selected && !correct) return 'incorrect';
    if (!selected && correct) return 'missed';
    return 'idle';
  }

  protected optionLetter(optionId: string): string {
    const index = this.question().options.findIndex((option) => option.id === optionId);
    return optionLetter(Math.max(0, index));
  }
}
