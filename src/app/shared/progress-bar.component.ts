import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <div
        class="h-1.5 overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        [attr.aria-label]="label()"
        [attr.aria-valuemin]="0"
        [attr.aria-valuemax]="max()"
        [attr.aria-valuenow]="value()"
      >
        <div class="progress-fill h-full rounded-full transition-[width] duration-300" [style.width.%]="percent()"></div>
      </div>
      @if (showPassMark()) {
        <div
          class="pointer-events-none absolute top-1/2 h-3 w-px -translate-y-1/2 bg-accent"
          [style.left.%]="85"
          aria-hidden="true"
        ></div>
      }
    </div>
  `,
  styles: `
    .progress-fill {
      background: var(--color-ink);
      transition-timing-function: var(--ease-out);
    }
    :host-context(.dark) .progress-fill {
      background: #efe9de;
    }
  `,
})
export class ProgressBarComponent {
  readonly value = input(0);
  readonly max = input(1);
  readonly label = input('Progress');
  readonly showPassMark = input(false);
  protected readonly percent = computed(() => {
    const max = this.max();
    if (max <= 0) return 0;
    return Math.min(100, Math.max(0, (this.value() / max) * 100));
  });
}
