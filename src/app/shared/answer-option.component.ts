import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { optionLetter } from '../core/scoring/scoring';
import type { AnswerOption } from '../core/models/question.model';

export type OptionState = 'idle' | 'correct' | 'incorrect' | 'missed';

@Component({
  selector: 'app-answer-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      [class]="stateClass()"
      [attr.aria-checked]="checked()"
      [attr.aria-disabled]="disabled()"
      [attr.role]="multiple() ? 'checkbox' : 'radio'"
      (click)="onClick()"
    >
      <span [class]="badgeClass()">
        @if (multiple() && checked() && state() === 'idle') {
          <span aria-hidden="true">✓</span>
          <span class="sr-only">{{ letter() }}</span>
        } @else {
          {{ letter() }}
        }
      </span>
      <span class="min-w-0 flex-1 pt-0.5 leading-snug">{{ option().text }}</span>
    </button>
  `,
})
export class AnswerOptionComponent {
  readonly option = input.required<AnswerOption>();
  readonly index = input.required<number>();
  readonly checked = input(false);
  readonly state = input<OptionState>('idle');
  readonly multiple = input(false);
  readonly disabled = input(false);
  readonly picked = output<void>();

  protected letter(): string {
    return optionLetter(this.index());
  }

  protected stateClass(): string {
    const layout =
      'flex w-full cursor-pointer items-start gap-3 rounded-[10px] border px-4 py-3.5 text-left text-[15px] transition-[background-color,border-color,color,transform] duration-150';
    switch (this.state()) {
      case 'correct':
      case 'missed':
        return `${layout} border-good/35 bg-good-bg text-good`;
      case 'incorrect':
        return `${layout} border-bad/35 bg-bad-bg text-bad`;
      default:
        return this.checked()
          ? `${layout} border-accent/45 bg-accent/8 text-ink`
          : `${layout} border-line bg-surface text-ink hover:bg-surface-2`;
    }
  }

  protected badgeClass(): string {
    const shape = this.multiple() ? 'rounded-[6px]' : 'rounded-full';
    const base = `mt-0.5 grid h-7 w-7 shrink-0 place-items-center text-[12px] font-medium ${shape}`;
    switch (this.state()) {
      case 'correct':
      case 'missed':
        return `${base} border border-current bg-good text-good-bg`;
      case 'incorrect':
        return `${base} border border-current bg-bad text-bad-bg`;
      default:
        return this.checked()
          ? `${base} border border-accent bg-accent text-accent-ink`
          : `${base} border border-line text-muted`;
    }
  }

  protected onClick(): void {
    if (!this.disabled()) this.picked.emit();
  }
}
