import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="h-3 overflow-hidden rounded-full border-[3px] border-line bg-surface-2 shadow-[inset_0_2px_4px_color-mix(in_srgb,var(--color-nav)_8%,transparent)]"
      role="progressbar"
      [attr.aria-label]="label()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max()"
      [attr.aria-valuenow]="value()"
    >
      <div
        class="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
        [style.width.%]="percent()"
      ></div>
    </div>
  `,
})
export class ProgressBarComponent {
  readonly value = input(0);
  readonly max = input(1);
  readonly label = input('Progress');
  protected readonly percent = computed(() => {
    const max = this.max();
    if (max <= 0) return 0;
    return Math.min(100, Math.max(0, (this.value() / max) * 100));
  });
}
